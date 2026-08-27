-- ============================================================================
-- J.Planet Tire CMS — Migration: Spec Sheet PDF
-- Run this in Supabase Studio -> SQL Editor (once). Safe to re-run.
--
-- Adds `tires.spec_sheet_url`, a link to an uploaded PDF spec sheet. When set,
-- the public detail page shows a "Download Spec Sheet" button next to the
-- existing CTA button; when empty, that button is hidden.
-- ============================================================================

alter table public.tires add column if not exists spec_sheet_url text;
