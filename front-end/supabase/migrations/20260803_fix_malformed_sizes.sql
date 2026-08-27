-- Fix the two malformed tire_sizes.size strings that don't parse as a standard
-- W/AspRRim tyre size, so they show up in size search and get valid detail pages.
--
--   JP505D:  "315/7022.50"  -> "315/70R22.5"   (missing the R)
--   JP500D:  "315/80/R22.5" -> "315/80R22.5"   (extra slash before R)
--
-- Run in the Supabase Dashboard -> SQL Editor. Targeted by id so nothing else is
-- touched; safe to re-run (a second run simply matches nothing).

begin;

update public.tire_sizes
set size = '315/70R22.5'
where id = '6956be50-dacc-4a96-9632-78c9bbf04372' and size = '315/7022.50';

update public.tire_sizes
set size = '315/80R22.5'
where id = '2c339154-f8dd-4a5c-a440-732642a73c65' and size = '315/80/R22.5';

-- Verify: expect the two corrected rows.
select id, size from public.tire_sizes
where id in ('6956be50-dacc-4a96-9632-78c9bbf04372', '2c339154-f8dd-4a5c-a440-732642a73c65');

commit;
