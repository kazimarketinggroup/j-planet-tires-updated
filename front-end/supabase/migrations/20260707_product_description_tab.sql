-- Adds the "Product Description" tab (single image) to the tire CMS.
-- Run this in the Supabase Dashboard -> SQL Editor before using the new tab.

-- 1. Allow the new tab value on tire_tabs.tab / tire_categories.default_tabs.
alter type tab_type add value if not exists 'product_description' before 'size_technical_data';

-- 2. Image shown on the Product Description tab of the public detail page.
alter table public.tires
  add column if not exists product_description_image_url text;
