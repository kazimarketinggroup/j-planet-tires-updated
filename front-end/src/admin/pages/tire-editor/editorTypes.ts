import type { FeaturePosition, TabType } from '../../types/database';
import { commonFieldByKey, type ResolvedColumn } from './sizeSpec';

// Local React key generator for repeatable rows.
export const localKey = () => Math.random().toString(36).slice(2, 10);

export interface BasicInfo {
  name: string;
  slug: string;
  category_id: string;
  subtitle: string;
  short_description: string;
  description: string;
  hero_image_url: string | null;
  card_image_url: string | null;
  features_diagram_image_url: string | null;
  product_description_image_url: string | null;
  badges: string[];
  benefits: string[];
  cta_label: string;
  cta_link: string;
  spec_sheet_url: string | null;
  is_published: boolean;
}

export interface TabConfigRow {
  tab: TabType;
  is_active: boolean;
}

export interface MetricRow {
  _key: string;
  label: string;
  score: number;
  max_score: number;
}

export interface FeatureRow {
  _key: string;
  icon_image_url: string | null;
  title: string;
  description: string;
  position: FeaturePosition;
}

export interface SizeRow {
  _key: string;
  model_label: string;
  values: Record<string, string>;
}

// A spec column as held in the editor (mirrors tire_size_columns, order = array position).
export interface EditorSizeColumn {
  _key: string;
  column_key: string;
  column_label: string;
  is_common: boolean;
}

export const emptySizeRow = (): SizeRow => ({
  _key: localKey(),
  model_label: '',
  values: {},
});

// Convert editor columns into the shared render/IO descriptor used by sizeSpec helpers.
export const resolvedFromEditor = (columns: EditorSizeColumn[]): ResolvedColumn[] =>
  columns.map((c) => ({
    key: c.column_key,
    label: c.column_label,
    isCommon: c.is_common,
    numeric: commonFieldByKey(c.column_key)?.numeric ?? false,
  }));

// Convert resolved columns (from DB / CSV) into editor columns.
export const editorFromResolved = (columns: ResolvedColumn[]): EditorSizeColumn[] =>
  columns.map((c) => ({
    _key: localKey(),
    column_key: c.key,
    column_label: c.label,
    is_common: c.isCommon,
  }));

export interface VehiclePositionRow {
  _key: string;
  icon_image_url: string | null;
  vehicle_label: string;
}

export interface PositionLegendRow {
  _key: string;
  label: string;
  color: string;
}

export interface EditorModel {
  basic: BasicInfo;
  tabs: TabConfigRow[];
  metrics: MetricRow[];
  features: FeatureRow[];
  sizeColumns: EditorSizeColumn[];
  sizes: SizeRow[];
  vehiclePositions: VehiclePositionRow[];
  positionLegends: PositionLegendRow[];
}

export const emptyBasic = (): BasicInfo => ({
  name: '',
  slug: '',
  category_id: '',
  subtitle: '',
  short_description: '',
  description: '',
  hero_image_url: null,
  card_image_url: null,
  features_diagram_image_url: null,
  product_description_image_url: null,
  badges: [],
  benefits: [],
  cta_label: 'REQUEST QUOTE / PRICING',
  cta_link: '',
  spec_sheet_url: null,
  is_published: false,
});

export const FEATURE_POSITIONS: FeaturePosition[] = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];
