-- Tire Finder data for the two passenger-car tires CP672 & CP661.
-- Run this in the Supabase Dashboard -> SQL Editor.
-- Safe to re-run: existing CP672/CP661 finder rows and the new dropdown
-- values are deleted before being re-inserted.

-- 1. New curated dropdown values (metric passenger widths/aspects/rims,
--    the "Passenger Car" vehicle type and the two new key priorities).
delete from public.tire_finder_dropdown_options
where (finder_tab = 'by_size' and field_name = 'width' and value in ('175','185','195','205'))
   or (finder_tab = 'by_size' and field_name = 'aspect_ratio' and value in ('40','45'))
   or (finder_tab = 'by_size' and field_name = 'rim' and value in ('13','14','19'))
   or (finder_tab = 'by_vehicle' and field_name = 'vehicle_type' and value = 'Passenger Car')
   or (finder_tab = 'by_vehicle' and field_name = 'key_priority' and value in ('Dry Performance','Comfort & Low Noise'));

insert into public.tire_finder_dropdown_options (finder_tab, field_name, value, display_order) values
  ('by_size', 'width', '175', 26),
  ('by_size', 'width', '185', 27),
  ('by_size', 'width', '195', 28),
  ('by_size', 'width', '205', 29),
  ('by_size', 'aspect_ratio', '40', 10),
  ('by_size', 'aspect_ratio', '45', 11),
  ('by_size', 'rim', '13', 12),
  ('by_size', 'rim', '14', 13),
  ('by_size', 'rim', '19', 14),
  ('by_vehicle', 'vehicle_type', 'Passenger Car', 0),
  ('by_vehicle', 'key_priority', 'Dry Performance', 9),
  ('by_vehicle', 'key_priority', 'Comfort & Low Noise', 10);

-- 2. By Size mapping rows — one per real catalogue size (from tire_sizes).
delete from public.tire_finder_by_size where product_code in ('CP672', 'CP661');

insert into public.tire_finder_by_size
  (product_code, width, aspect_ratio, rim, axle_position, full_tire_size, pattern_position, tire_id)
values
  ('CP672','245','40','19','All-Position','245/40R19','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','235','55','19','All-Position','235/55R19','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','225','45','18','All-Position','225/45R18','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','225','50','18','All-Position','225/50R18','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','235','55','18','All-Position','235/55R18','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','225','55','18','All-Position','225/55R18','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','225','60','18','All-Position','225/60R18','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','215','45','17','All-Position','215/45R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','205','45','17','All-Position','205/45R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','215','50','17','All-Position','215/50R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','235','55','17','All-Position','235/55R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','225','55','17','All-Position','225/55R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','215','55','17','All-Position','215/55R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','235','60','17','All-Position','235/60R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','225','60','17','All-Position','225/60R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','235','65','17','All-Position','235/65R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','225','65','17','All-Position','225/65R17','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','195','50','16','All-Position','195/50R16','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','205','55','16','All-Position','205/55R16','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','235','60','16','All-Position','235/60R16','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','225','60','16','All-Position','225/60R16','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','215','60','16','All-Position','215/60R16','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','205','60','16','All-Position','205/60R16','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','215','65','16','All-Position','215/65R16','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','205','65','16','All-Position','205/65R16','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','195','55','15','All-Position','195/55R15','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','195','60','15','All-Position','195/60R15','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','215','65','15','All-Position','215/65R15','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','205','65','15','All-Position','205/65R15','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','195','65','15','All-Position','195/65R15','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','185','65','15','All-Position','185/65R15','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','185','65','14','All-Position','185/65R14','Passenger Car Radial','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP661','205','70','15','All-Position','205/70R15','Passenger Car Radial','1ade6bb0-aaba-4efb-aad2-13af86d28327'),
  ('CP661','195','70','14','All-Position','195/70R14','Passenger Car Radial','1ade6bb0-aaba-4efb-aad2-13af86d28327'),
  ('CP661','185','70','14','All-Position','185/70R14','Passenger Car Radial','1ade6bb0-aaba-4efb-aad2-13af86d28327'),
  ('CP661','175','70','14','All-Position','175/70R14','Passenger Car Radial','1ade6bb0-aaba-4efb-aad2-13af86d28327');

-- 3. By Vehicle mapping rows.
delete from public.tire_finder_by_vehicle where product_code in ('CP672', 'CP661');

insert into public.tire_finder_by_vehicle
  (product_code, vehicle_type, road_type, axle_position, key_priority, key_benefit, tire_id)
values
  ('CP672','Passenger Car','Highway','All-Position','Dry Performance','Dry performance & low noise','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','Passenger Car','Highway','All-Position','Comfort & Low Noise','Dry performance & low noise','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP672','Passenger Car','Highway','All-Position','Long Mileage','Dry performance & low noise','9dcea7d7-7ec4-494e-b619-b92e675d40d7'),
  ('CP661','Passenger Car','Highway','All-Position','Wet Traction','Wet performance & fuel economy','1ade6bb0-aaba-4efb-aad2-13af86d28327'),
  ('CP661','Passenger Car','Highway','All-Position','Fuel Efficiency','Wet performance & fuel economy','1ade6bb0-aaba-4efb-aad2-13af86d28327');
