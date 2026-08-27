-- ============================================================================
-- Consolidate every tire_categories row into exactly THREE canonical
-- categories, re-pointing all tires accordingly.
--
--   PCR/SUV            -> segment suv_ltr    (holds passenger + suv_ltr tires)
--   Truck & Bus Radial -> segment truck_bus
--   OTR/Construction   -> segment highway_otr
--
-- Run in the Supabase Dashboard -> SQL Editor.
--
-- HOW TO RUN SAFELY:
--   1. First run ONLY the "PART 0 — INSPECT" block below and read the output.
--      It changes nothing. Confirm the tire counts look right (≈ 5 / 23 / 1).
--   2. Then run "PART 1 — CONSOLIDATE". It is wrapped in a transaction and is
--      idempotent: running it twice is safe and produces the same 3 categories.
--
-- A tire's target category is decided by the SEGMENT of its CURRENT category.
-- Tires whose category_id is NULL have no segment and are LEFT UNTOUCHED
-- (PART 0 reports them so you can assign them in the CMS afterwards).
-- ============================================================================


-- ----------------------------------------------------------------------------
-- PART 0 — INSPECT (read-only). Run this alone first. Nothing is modified.
-- ----------------------------------------------------------------------------

-- Current categories and how many tires sit in each.
select c.id, c.name, c.slug, c.segment, count(t.id) as tire_count
from public.tire_categories c
left join public.tires t on t.category_id = c.id
group by c.id, c.name, c.slug, c.segment
order by c.segment, tire_count desc;

-- How many published/all tires fall under each SEGMENT (the target grouping).
select coalesce(c.segment::text, '(no category / NULL)') as segment,
       count(t.id) as tire_count
from public.tires t
left join public.tire_categories c on c.id = t.category_id
group by c.segment
order by segment;

-- Tires with NO category — these will NOT be moved by PART 1. Assign them later.
select t.id, t.name, t.slug
from public.tires t
where t.category_id is null
order by t.name;


-- ----------------------------------------------------------------------------
-- PART 1 — CONSOLIDATE. Run this after PART 0 looks correct.
-- ----------------------------------------------------------------------------
begin;

-- 1a. Ensure the three canonical categories exist. Matched by slug so re-running
--     updates the existing row instead of creating duplicates.
insert into public.tire_categories (name, slug, segment, default_tabs) values
  ('PCR/SUV',            'pcr-suv',           'suv_ltr',
     '{performance_indicator,product_features,size_technical_data}'),
  ('Truck & Bus Radial', 'truck-bus-radial',  'truck_bus',
     '{size_technical_data,recommended_position}'),
  ('OTR/Construction',   'otr-construction',  'highway_otr',
     '{size_technical_data,recommended_position}')
on conflict (slug) do update
  set name = excluded.name,
      segment = excluded.segment;

-- 1b. Re-point every tire onto the canonical category for ITS segment.
--     passenger + suv_ltr both collapse into PCR/SUV.
update public.tires t
set category_id = (select id from public.tire_categories where slug = 'pcr-suv')
from public.tire_categories old
where t.category_id = old.id
  and old.segment in ('passenger', 'suv_ltr')
  and old.slug <> 'pcr-suv';

update public.tires t
set category_id = (select id from public.tire_categories where slug = 'truck-bus-radial')
from public.tire_categories old
where t.category_id = old.id
  and old.segment = 'truck_bus'
  and old.slug <> 'truck-bus-radial';

update public.tires t
set category_id = (select id from public.tire_categories where slug = 'otr-construction')
from public.tire_categories old
where t.category_id = old.id
  and old.segment = 'highway_otr'
  and old.slug <> 'otr-construction';

-- 1c. Delete every category that is now empty and is not one of the three
--     canonical ones. (Any category still referenced by a tire is kept, so this
--     can never orphan a tire even if an unexpected segment value exists.)
delete from public.tire_categories c
where c.slug not in ('pcr-suv', 'truck-bus-radial', 'otr-construction')
  and not exists (select 1 from public.tires t where t.category_id = c.id);

-- 1d. Verify the end state before committing. Expect three rows.
select c.name, c.slug, c.segment, count(t.id) as tire_count
from public.tire_categories c
left join public.tires t on t.category_id = c.id
group by c.name, c.slug, c.segment
order by c.name;

commit;

-- After committing, the public catalogue and the PCR/TBR/OTR landing pages need
-- no code change: the grid groups by category name and the landing pages filter
-- by segment, both of which stay valid.
