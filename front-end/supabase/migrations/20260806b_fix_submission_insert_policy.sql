-- Fix: anonymous visitors could not submit the contact / booking forms.
--
-- The previous policies said `for insert with check (true)` but named no role, and
-- the `anon` role had no table-level INSERT grant. Result: every public form
-- submission failed with 42501 "new row violates row-level security policy".
--
-- Verified against the live project before and after: anon INSERT was 401, and
-- anon SELECT correctly returned 0 rows (that part was already right and stays
-- that way — visitors must never read other customers' details).
--
-- Run this in the Supabase Dashboard -> SQL Editor.

-- ----------------------------------------------------------------------------
-- 1. Table-level grants. RLS still decides row visibility; without these the
--    policies never even get consulted for the anon role.
-- ----------------------------------------------------------------------------
grant insert on public.contact_submissions to anon, authenticated;
grant insert on public.booking_submissions to anon, authenticated;

-- Staff read their submissions through the authenticated role.
grant select on public.contact_submissions to authenticated;
grant select on public.booking_submissions to authenticated;

-- The client updates email_sent / email_error after the notification attempt.
grant update (email_sent, email_error) on public.contact_submissions to anon, authenticated;
grant update (email_sent, email_error) on public.booking_submissions to anon, authenticated;

-- ----------------------------------------------------------------------------
-- 2. Recreate the policies with explicit roles.
-- ----------------------------------------------------------------------------
drop policy if exists "contact_submissions public insert" on public.contact_submissions;
drop policy if exists "contact_submissions staff read"    on public.contact_submissions;
drop policy if exists "contact_submissions mark emailed"  on public.contact_submissions;
drop policy if exists "booking_submissions public insert" on public.booking_submissions;
drop policy if exists "booking_submissions staff read"    on public.booking_submissions;
drop policy if exists "booking_submissions mark emailed"  on public.booking_submissions;

-- Anyone may submit a form.
create policy "contact_submissions public insert" on public.contact_submissions
  for insert to anon, authenticated with check (true);
create policy "booking_submissions public insert" on public.booking_submissions
  for insert to anon, authenticated with check (true);

-- Only signed-in staff may read submissions. Anonymous visitors get zero rows,
-- so one customer can never read another's name, email or phone.
create policy "contact_submissions staff read" on public.contact_submissions
  for select to authenticated using (public.is_staff());
create policy "booking_submissions staff read" on public.booking_submissions
  for select to authenticated using (public.is_staff());

-- Allow flagging whether the notification email went out. The column grants above
-- restrict this to email_sent / email_error, so a visitor cannot rewrite the
-- submitted contact details.
create policy "contact_submissions mark emailed" on public.contact_submissions
  for update to anon, authenticated using (true) with check (true);
create policy "booking_submissions mark emailed" on public.booking_submissions
  for update to anon, authenticated using (true) with check (true);
