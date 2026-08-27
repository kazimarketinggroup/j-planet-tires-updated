-- ============================================================================
-- J.Planet Tire CMS — Supabase setup  (ALL-ADMIN model)
-- Run this in Supabase Studio -> SQL Editor (once). Safe to re-run.
-- Every approved user is a full admin. New sign-ups start as 'pending'.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Storage bucket for tire assets  (fixes "Bucket not found" on upload)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('tire-assets', 'tire-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "tire-assets read"   on storage.objects;
drop policy if exists "tire-assets insert" on storage.objects;
drop policy if exists "tire-assets update" on storage.objects;
drop policy if exists "tire-assets delete" on storage.objects;

create policy "tire-assets read"   on storage.objects for select
  using (bucket_id = 'tire-assets');
create policy "tire-assets insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'tire-assets');
create policy "tire-assets update" on storage.objects for update to authenticated
  using (bucket_id = 'tire-assets');
create policy "tire-assets delete" on storage.objects for delete to authenticated
  using (bucket_id = 'tire-assets');

-- ----------------------------------------------------------------------------
-- 2. Profiles: add email + status; make EVERY existing user an approved admin
-- ----------------------------------------------------------------------------
alter table public.profiles add column if not exists email      text;
alter table public.profiles add column if not exists status     text not null default 'pending';
alter table public.profiles add column if not exists created_at timestamptz default now();

-- Approve + admin every existing profile, and fill missing emails.
update public.profiles p
set role = 'admin', status = 'approved',
    email = coalesce(p.email, u.email)
from auth.users u
where u.id = p.id;

-- Create profiles for any auth users that don't have one yet (as approved admins).
insert into public.profiles (id, email, role, status)
select u.id, u.email, 'admin', 'approved'
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- 3. Auto-create a PENDING admin profile when someone signs up
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, role, status)
  values (new.id, new.email, 'admin', 'pending')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 4. RLS for profiles  (approved users can read/manage all users)
-- ----------------------------------------------------------------------------
create or replace function public.is_approved()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and status = 'approved'
  );
$$;

alter table public.profiles enable row level security;

drop policy if exists "profiles read"        on public.profiles;
drop policy if exists "profiles self insert"  on public.profiles;
drop policy if exists "profiles staff update" on public.profiles;
drop policy if exists "profiles staff delete" on public.profiles;

create policy "profiles read" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_approved());
create policy "profiles self insert" on public.profiles for insert to authenticated
  with check (id = auth.uid());
create policy "profiles staff update" on public.profiles for update to authenticated
  using (public.is_approved()) with check (public.is_approved());
create policy "profiles staff delete" on public.profiles for delete to authenticated
  using (public.is_approved());

-- ----------------------------------------------------------------------------
-- 5. RLS for catalogue tables: public can READ, approved users can WRITE
-- ----------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'tires','tire_categories','tire_tabs','tire_performance_metrics',
    'tire_features','tire_sizes','tire_size_columns','tire_recommended_positions'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "%s public read" on public.%I', t, t);
    execute format('drop policy if exists "%s staff write" on public.%I', t, t);
    execute format('create policy "%s public read" on public.%I for select using (true)', t, t);
    execute format(
      'create policy "%s staff write" on public.%I for all to authenticated using (public.is_approved()) with check (public.is_approved())',
      t, t);
  end loop;
end $$;

-- ----------------------------------------------------------------------------
-- 6. Seed sample categories (only if the table is empty). Replace later in the UI.
-- ----------------------------------------------------------------------------
insert into public.tire_categories (name, slug, segment, default_tabs)
select 'SUV / LTR (Sample)', 'suv-ltr-sample', 'suv_ltr',
       '{performance_indicator,product_features,size_technical_data}'
where not exists (select 1 from public.tire_categories where slug = 'suv-ltr-sample');

insert into public.tire_categories (name, slug, segment, default_tabs)
select 'Truck / Bus (Sample)', 'truck-bus-sample', 'truck_bus',
       '{size_technical_data,recommended_position}'
where not exists (select 1 from public.tire_categories where slug = 'truck-bus-sample');

insert into public.tire_categories (name, slug, segment, default_tabs)
select 'Passenger (Sample)', 'passenger-sample', 'passenger',
       '{performance_indicator,product_features,size_technical_data}'
where not exists (select 1 from public.tire_categories where slug = 'passenger-sample');

insert into public.tire_categories (name, slug, segment, default_tabs)
select 'Highway / OTR (Sample)', 'highway-otr-sample', 'highway_otr',
       '{size_technical_data,recommended_position}'
where not exists (select 1 from public.tire_categories where slug = 'highway-otr-sample');
