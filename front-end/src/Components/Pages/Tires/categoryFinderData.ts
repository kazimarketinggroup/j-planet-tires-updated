// Category-scoped data layer for the per-category Tire Finders (PCR, TBR).
//
// STEP 3 isolation: this module is deliberately SEPARATE from the All Tires
// finder's fetchFinderRows(). Nothing here calls into it and it calls nothing
// here, so changing one can never silently change the other.
//
// STEP 2 server-side scoping: every query below applies the category constraint
// in the database via a PostgREST inner join, so the browser never receives another
// category's rows. The finder mapping tables carry no category column of their own;
// they join to tires -> tire_categories, and tire_id is populated on 100% of rows
// (verified: 237/237 size rows, 60/60 vehicle rows).
//
// The constraint is keyed on tire_categories.segment — a fixed DB enum — rather
// than `name`/`slug`, which an admin can rename in the CMS at any time.
import { supabase } from '../../../admin/lib/supabase';
import type { Segment } from '../../../admin/types/database';
import type { CatalogueTire } from './publicApi';
import type { FinderRows, SizeRow, VehicleRow } from './tireFinderData';

// Columns mirror the All Tires finder's projection, plus the joined category used
// only to enforce the filter (PostgREST requires the embedded resource in select
// for it to be filterable).
const SIZE_COLS =
  'product_code, width, aspect_ratio, rim, axle_position, full_tire_size, pattern_position, tire_id,' +
  'tires!inner(category:tire_categories!inner(segment))';
const VEHICLE_COLS =
  'product_code, vehicle_type, road_type, axle_position, key_priority, key_benefit, tire_id,' +
  'tires!inner(category:tire_categories!inner(segment))';

// A page's fixed category. Not user-selectable — it is baked into the page.
export interface CategoryScope {
  segments: Segment[];
}

// PostgREST filter value for one-or-many segments.
const segmentFilter = (segments: Segment[]): { op: 'eq' | 'in'; value: string } =>
  segments.length === 1
    ? { op: 'eq', value: segments[0] }
    : { op: 'in', value: `(${segments.join(',')})` };

// Fetch the finder mapping rows for ONE category, filtered server-side.
export const fetchCategoryFinderRows = async (scope: CategoryScope): Promise<FinderRows> => {
  const { op, value } = segmentFilter(scope.segments);
  const col = 'tires.category.segment';

  const sizeQuery = supabase.from('tire_finder_by_size').select(SIZE_COLS);
  const vehicleQuery = supabase.from('tire_finder_by_vehicle').select(VEHICLE_COLS);

  const [sizeRes, vehicleRes] = await Promise.all([
    op === 'eq' ? sizeQuery.eq(col, value) : sizeQuery.filter(col, 'in', value),
    op === 'eq' ? vehicleQuery.eq(col, value) : vehicleQuery.filter(col, 'in', value),
  ]);

  if (sizeRes.error) throw sizeRes.error;
  if (vehicleRes.error) throw vehicleRes.error;

  return {
    sizeRows: (sizeRes.data ?? []) as unknown as SizeRow[],
    vehicleRows: (vehicleRes.data ?? []) as unknown as VehicleRow[],
  };
};

// Catalogue projection for the range grid — same shape the All Tires grid uses so
// the cards render identically, but scoped to this page's category server-side.
const CATALOGUE_SIZES =
  'sizes:tire_sizes(id,tire_id,size,model_label,pattern,load_index,inch,max_psi,rim_width_range,' +
  'section_width_mm,overall_diameter_mm,tread_depth_mm,display_order,extra_specs)';

const CATALOGUE_SELECT =
  'id,name,slug,card_image_url,short_description,benefits,display_order,' +
  'name_ar,name_ku,name_zh,name_sw,' +
  'short_description_ar,short_description_ku,short_description_zh,short_description_sw,' +
  `category:tire_categories!inner(id,name,segment),${CATALOGUE_SIZES},` +
  'positions:tire_recommended_positions(vehicle_type,position)';

// Published tyres for ONE category, filtered server-side (never over-fetches the
// whole catalogue and discards client-side).
export const fetchCategoryTires = async (scope: CategoryScope): Promise<CatalogueTire[]> => {
  const { op, value } = segmentFilter(scope.segments);
  const col = 'category.segment';

  let query = supabase
    .from('tires')
    .select(CATALOGUE_SELECT)
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  query = op === 'eq' ? query.eq(col, value) : query.filter(col, 'in', value);

  const { data, error } = await query;
  if (error) throw error;
  return (data as unknown as CatalogueTire[]) ?? [];
};
