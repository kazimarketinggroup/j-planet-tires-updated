-- Stores contact enquiries and tire booking/quote requests.
--
-- These tables were the source of truth for the older Supabase submission flow.
-- Email delivery was only a notification; if an email failed, the enquiry stayed
-- safely recorded
-- here and visible to staff.
--
-- Run this in the Supabase Dashboard -> SQL Editor.

-- ----------------------------------------------------------------------------
-- 0. Staff check used by the read policies below.
--
-- Defined here rather than relying on SUPABASE_SETUP.sql, which was never run
-- against this project. Kept under a distinct name (is_staff) so it can't clash
-- with a differently-shaped is_approved() added later.
--
-- This project's live `profiles` table has only (id, role, created_at) — there is
-- no `status` column — so "staff" simply means: a profile row exists for the
-- signed-in user. Anonymous visitors have no row and therefore cannot read.
--
-- security definer + pinned search_path lets the policy read `profiles` without
-- granting the caller direct access to that table.
-- ----------------------------------------------------------------------------
create or replace function public.is_staff()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid()
  );
$$;

-- ----------------------------------------------------------------------------
-- 1. Contact form submissions
-- ----------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  enquiry_type  text,
  full_name     text not null,
  company       text,
  email         text not null,
  phone         text,
  country       text,
  message       text,
  consent_marketing boolean not null default false,
  -- Whether the notification emails went out (false = worth following up).
  email_sent    boolean not null default false,
  email_error   text
);

create index if not exists contact_submissions_created_idx
  on public.contact_submissions (created_at desc);

-- ----------------------------------------------------------------------------
-- 2. Tire booking / quote requests
-- ----------------------------------------------------------------------------
create table if not exists public.booking_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  tire_id       uuid references public.tires(id) on delete set null,
  tire_name     text,
  -- [{ size, quantity, size_id }] as submitted, so the request is readable even
  -- if the tire or its sizes are edited/removed later.
  items         jsonb not null default '[]'::jsonb,
  total_quantity int not null default 0,
  full_name     text not null,
  company       text,
  email         text not null,
  phone         text,
  country       text,
  role          text,
  notes         text,
  email_sent    boolean not null default false,
  email_error   text
);

create index if not exists booking_submissions_created_idx
  on public.booking_submissions (created_at desc);

-- ----------------------------------------------------------------------------
-- 3. RLS — anyone may SUBMIT, only approved staff may READ
--
-- Public insert is required because the forms are used by anonymous visitors.
-- Public SELECT is deliberately NOT granted: without this split, any visitor
-- could read every other customer's name, email and phone number.
-- ----------------------------------------------------------------------------
alter table public.contact_submissions enable row level security;
alter table public.booking_submissions enable row level security;

drop policy if exists "contact_submissions public insert" on public.contact_submissions;
drop policy if exists "contact_submissions staff read"    on public.contact_submissions;
drop policy if exists "booking_submissions public insert" on public.booking_submissions;
drop policy if exists "booking_submissions staff read"    on public.booking_submissions;

create policy "contact_submissions public insert" on public.contact_submissions
  for insert with check (true);
create policy "contact_submissions staff read" on public.contact_submissions
  for select using (public.is_staff());

create policy "booking_submissions public insert" on public.booking_submissions
  for insert with check (true);
create policy "booking_submissions staff read" on public.booking_submissions
  for select using (public.is_staff());
