-- ============================================================================
-- J.Planet Tire CMS — Migration: per-tire dynamic Size/Technical Data columns
-- Run this in Supabase Studio -> SQL Editor (once). Safe to re-run.
--
-- Adds `tire_size_columns`: stores, per tire, exactly which spec columns exist
-- and in what order. Populated automatically during CSV import (and editable in
-- the CMS Tire Editor). Common columns (column_key matches a real tire_sizes
-- field) write to that field; custom columns write to tire_sizes.extra_specs.
-- ============================================================================

create table if not exists public.tire_size_columns (
  id            uuid primary key default gen_random_uuid(),
  tire_id       uuid not null references public.tires(id) on delete cascade,
  column_key    text not null,
  column_label  text not null,
  is_common     boolean not null default false,
  display_order int  not null default 0,
  unique (tire_id, column_key)
);

create index if not exists tire_size_columns_tire_order_idx
  on public.tire_size_columns (tire_id, display_order);

-- ----------------------------------------------------------------------------
-- RLS: public can READ, approved users can WRITE (same as other catalogue tables)
-- ----------------------------------------------------------------------------
alter table public.tire_size_columns enable row level security;

drop policy if exists "tire_size_columns public read" on public.tire_size_columns;
drop policy if exists "tire_size_columns staff write" on public.tire_size_columns;

create policy "tire_size_columns public read" on public.tire_size_columns
  for select using (true);
create policy "tire_size_columns staff write" on public.tire_size_columns
  for all to authenticated using (public.is_approved()) with check (public.is_approved());
