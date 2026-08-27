// Public (storefront) data access for the Tires catalogue + detail pages.
// Reads published CMS data straight from Supabase.
import { supabase } from '../../../admin/lib/supabase';
import type {
  Segment,
  Tire,
  TireCategory,
  TireFeature,
  TirePerformanceMetric,
  TireSize,
  TireSizeColumn,
  TireTab,
} from '../../../admin/types/database';

export interface CatalogueTire {
  id: string;
  name: string;
  slug: string;
  card_image_url: string | null;
  short_description: string | null;
  benefits: string[] | null;
  display_order: number | null;
  category: { id: string; name: string; segment: Segment } | null;
  sizes: TireSize[];
  positions: { vehicle_type: string; position: string | null }[];
  // Pre-translated columns (see translate-tires script). Optional; fall back to
  // the English field when absent.
  name_ar?: string | null;
  name_ku?: string | null;
  name_zh?: string | null;
  name_sw?: string | null;
  short_description_ar?: string | null;
  short_description_ku?: string | null;
  short_description_zh?: string | null;
  short_description_sw?: string | null;
}

// Sizes are trimmed to the columns the catalogue actually reads (card specs,
// filter options, search) — tire_sizes(*) embedded ~285 rows with every column
// and made this the slowest query on the site (~230 KB); this cut is ~6x smaller.
const CATALOGUE_SIZES =
  'sizes:tire_sizes(id,size,model_label,pattern,load_index,inch,max_psi,rim_width_range,tread_depth_mm,display_order,extra_specs)';

const CATALOGUE_SELECT =
  'id,name,slug,card_image_url,short_description,benefits,display_order,' +
  'name_ar,name_ku,name_zh,name_sw,' +
  'short_description_ar,short_description_ku,short_description_zh,short_description_sw,' +
  `category:tire_categories(id,name,segment),${CATALOGUE_SIZES},` +
  'positions:tire_recommended_positions(vehicle_type,position)';

export const fetchPublishedTires = async (): Promise<CatalogueTire[]> => {
  const { data, error } = await supabase
    .from('tires')
    .select(CATALOGUE_SELECT)
    .eq('is_published', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data as unknown as CatalogueTire[]) ?? [];
};

export interface TireDetail extends Tire {
  category: TireCategory | null;
  tabs: TireTab[];
  metrics: TirePerformanceMetric[];
  features: TireFeature[];
  sizes: TireSize[];
  size_columns: TireSizeColumn[];
}

export const fetchTireBySlug = async (slug: string): Promise<TireDetail | null> => {
  const { data, error } = await supabase
    .from('tires')
    .select(
      '*, category:tire_categories(*), tabs:tire_tabs(*), metrics:tire_performance_metrics(*), ' +
        'features:tire_features(*), sizes:tire_sizes(*), size_columns:tire_size_columns(*)',
    )
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  const tire = data as unknown as TireDetail;
  const byOrder = <T extends { display_order: number }>(rows: T[] = []) =>
    [...rows].sort((a, b) => a.display_order - b.display_order);

  return {
    ...tire,
    tabs: byOrder(tire.tabs).filter((t) => t.is_active),
    metrics: byOrder(tire.metrics),
    features: byOrder(tire.features),
    sizes: byOrder(tire.sizes),
    size_columns: byOrder(tire.size_columns),
  };
};

export const fetchRelatedTires = async (
  categoryId: string,
  excludeId: string,
  limit = 3,
): Promise<CatalogueTire[]> => {
  const { data, error } = await supabase
    .from('tires')
    .select(CATALOGUE_SELECT)
    .eq('is_published', true)
    .eq('category_id', categoryId)
    .neq('id', excludeId)
    .limit(limit);
  if (error) throw error;
  return (data as unknown as CatalogueTire[]) ?? [];
};

// First size variant (lowest display_order) for compact card display.
export const firstSize = (tire: CatalogueTire) =>
  [...tire.sizes].sort((a, b) => a.display_order - b.display_order)[0] ?? null;
