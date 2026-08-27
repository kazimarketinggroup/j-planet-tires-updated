// Hand-written types mirroring the existing Supabase schema.
// These describe table rows as returned by the Supabase client.

export type Segment = 'suv_ltr' | 'truck_bus' | 'passenger' | 'highway_otr';

export type TabType =
  | 'performance_indicator'
  | 'product_features'
  | 'product_description'
  | 'size_technical_data'
  | 'recommended_position';

export type ProfileRole = 'admin' | 'editor';
export type ProfileStatus = 'pending' | 'approved';

export interface Profile {
  id: string;
  email: string | null;
  role: ProfileRole;
  status: ProfileStatus;
  created_at?: string;
}

export const STATUS_BADGE_CLASSES: Record<ProfileStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
};

export const ROLE_BADGE_CLASSES: Record<ProfileRole, string> = {
  admin: 'bg-blue-100 text-blue-700',
  editor: 'bg-gray-100 text-gray-600',
};

export interface TireCategory {
  id: string;
  name: string;
  slug: string;
  segment: Segment;
  default_tabs: TabType[];
}

export interface Tire {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  subtitle: string | null;
  short_description: string | null;
  description: string | null;
  // Pre-translated columns populated by the translate-tires script. Missing
  // values fall back to the English field at display time.
  name_ar?: string | null;
  name_ku?: string | null;
  name_zh?: string | null;
  name_sw?: string | null;
  subtitle_ar?: string | null;
  subtitle_ku?: string | null;
  subtitle_zh?: string | null;
  subtitle_sw?: string | null;
  short_description_ar?: string | null;
  short_description_ku?: string | null;
  short_description_zh?: string | null;
  short_description_sw?: string | null;
  description_ar?: string | null;
  description_ku?: string | null;
  description_zh?: string | null;
  description_sw?: string | null;
  // Translated badges — JSON-encoded array string of the `badges` array, one
  // column per language (populated by translate-tires.js).
  badge_label_ar?: string | null;
  badge_label_ku?: string | null;
  badge_label_zh?: string | null;
  badge_label_sw?: string | null;
  hero_image_url: string | null;
  card_image_url: string | null;
  features_diagram_image_url: string | null;
  product_description_image_url: string | null;
  badges: string[] | null;
  benefits: string[] | null;
  cta_label: string | null;
  cta_link: string | null;
  spec_sheet_url: string | null;
  is_published: boolean;
  display_order: number | null;
  created_at?: string;
  updated_at?: string;
}

// A tire row joined with its category (used in list/dashboard views).
export interface TireWithCategory extends Tire {
  category: TireCategory | null;
}

export interface TireTab {
  id: string;
  tire_id: string;
  tab: TabType;
  display_order: number;
  is_active: boolean;
}

export interface TirePerformanceMetric {
  id: string;
  tire_id: string;
  label: string;
  score: number;
  max_score: number;
  display_order: number;
}

export type FeaturePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface TireFeature {
  id: string;
  tire_id: string;
  icon_image_url: string | null;
  title: string;
  description: string | null;
  position: FeaturePosition | string | null;
  display_order: number;
}

export interface TireSize {
  id: string;
  tire_id: string;
  model_label: string | null;
  size: string | null;
  inch: number | null;
  load_index: string | null;
  pattern: string | null;
  max_psi: number | null;
  rim_width_range: string | null;
  section_width_mm: number | null;
  overall_diameter_mm: number | null;
  tread_depth_mm: number | null;
  display_order: number;
  extra_specs: Record<string, string | number | null> | null;
}

// Per-tire spec column definition (which columns exist, in what order).
// Populated during CSV import; editable in the CMS Tire Editor.
export interface TireSizeColumn {
  id: string;
  tire_id: string;
  column_key: string;
  column_label: string;
  is_common: boolean;
  display_order: number;
}

export interface TireRecommendedPosition {
  id: string;
  tire_id: string;
  vehicle_type: string;
  position: string | null;
  icon_image_url: string | null;
  display_order: number;
}

export interface TireVehiclePosition {
  id: string;
  tire_id: string;
  icon_image_url: string | null;
  vehicle_label: string | null;
  display_order: number;
}

export interface TirePositionLegend {
  id: string;
  tire_id: string;
  label: string;
  color: string;
  display_order: number;
}

// ---- UI helpers ----------------------------------------------------------

export const TAB_LABELS: Record<TabType, string> = {
  performance_indicator: 'Key Performance Indicator',
  product_features: 'Product Features',
  product_description: 'Product Description',
  size_technical_data: 'Size/Technical Data',
  recommended_position: 'Recommended Vehicle Type & Position',
};

export const ALL_TABS: TabType[] = [
  'performance_indicator',
  'product_features',
  'product_description',
  'size_technical_data',
  'recommended_position',
];

export const SEGMENT_LABELS: Record<Segment, string> = {
  suv_ltr: 'SUV / LTR',
  truck_bus: 'Truck / Bus',
  passenger: 'Passenger',
  highway_otr: 'Highway / OTR',
};

// Accent classes per segment for category badges.
export const SEGMENT_BADGE_CLASSES: Record<Segment, string> = {
  suv_ltr: 'bg-emerald-100 text-emerald-700',
  truck_bus: 'bg-blue-100 text-blue-700',
  passenger: 'bg-violet-100 text-violet-700',
  highway_otr: 'bg-amber-100 text-amber-700',
};
