import { supabase } from '../../lib/supabase';
import {
  emptyBasic,
  editorFromResolved,
  localKey,
  resolvedFromEditor,
  FEATURE_POSITIONS,
  type EditorModel,
  type FeatureRow,
} from './editorTypes';
import {
  columnsFromDb,
  columnsToDbRows,
  dbToValues,
  deriveColumnsFromSizes,
  valuesToPayload,
  type ResolvedColumn,
} from './sizeSpec';
import type {
  FeaturePosition,
  TabType,
  Tire,
  TireFeature,
  TirePerformanceMetric,
  TirePositionLegend,
  TireSize,
  TireSizeColumn,
  TireTab,
  TireVehiclePosition,
} from '../../types/database';

export const defaultFeatures = (): FeatureRow[] =>
  FEATURE_POSITIONS.map((position) => ({
    _key: localKey(),
    icon_image_url: null,
    title: '',
    description: '',
    position,
  }));

const padFeatures = (rows: FeatureRow[]): FeatureRow[] => {
  const out = rows.slice(0, 4);
  while (out.length < 4) {
    out.push({
      _key: localKey(),
      icon_image_url: null,
      title: '',
      description: '',
      position: FEATURE_POSITIONS[out.length],
    });
  }
  return out;
};

export const emptyModel = (): EditorModel => ({
  basic: emptyBasic(),
  tabs: [{ tab: 'size_technical_data', is_active: true }],
  metrics: [],
  features: defaultFeatures(),
  sizeColumns: [],
  sizes: [],
  vehiclePositions: [],
  positionLegends: [],
});

export const loadEditorModel = async (id: string): Promise<EditorModel> => {
  const { data: tireData, error } = await supabase.from('tires').select('*').eq('id', id).single();
  if (error || !tireData) throw error ?? new Error('Tire not found');
  const tire = tireData as Tire;

  const [
    tabsRes,
    metricsRes,
    featuresRes,
    sizesRes,
    sizeColumnsRes,
    vehiclePositionsRes,
    positionLegendsRes,
  ] = await Promise.all([
    supabase.from('tire_tabs').select('*').eq('tire_id', id).order('display_order'),
    supabase.from('tire_performance_metrics').select('*').eq('tire_id', id).order('display_order'),
    supabase.from('tire_features').select('*').eq('tire_id', id).order('display_order'),
    supabase.from('tire_sizes').select('*').eq('tire_id', id).order('display_order'),
    supabase.from('tire_size_columns').select('*').eq('tire_id', id).order('display_order'),
    supabase.from('tire_vehicle_positions').select('*').eq('tire_id', id).order('display_order'),
    supabase.from('tire_position_legends').select('*').eq('tire_id', id).order('display_order'),
  ]);

  const sizeRows = (sizesRes.data as TireSize[] | null) ?? [];
  const columnRows = (sizeColumnsRes.data as TireSizeColumn[] | null) ?? [];
  // Prefer persisted columns; fall back to deriving them from existing size data.
  const columns: ResolvedColumn[] = columnRows.length
    ? columnsFromDb(columnRows)
    : deriveColumnsFromSizes(sizeRows);

  const tabRows = (tabsRes.data as TireTab[] | null) ?? [];
  const tabs = tabRows.map((t) => ({ tab: t.tab, is_active: t.is_active }));
  if (!tabs.some((t) => t.tab === 'size_technical_data')) {
    tabs.push({ tab: 'size_technical_data', is_active: true });
  }

  const metrics = ((metricsRes.data as TirePerformanceMetric[] | null) ?? []).map((m) => ({
    _key: localKey(),
    label: m.label,
    score: m.score,
    max_score: m.max_score,
  }));

  const features = padFeatures(
    ((featuresRes.data as TireFeature[] | null) ?? []).map((f) => ({
      _key: localKey(),
      icon_image_url: f.icon_image_url,
      title: f.title,
      description: f.description ?? '',
      position: (f.position as FeaturePosition) ?? 'top-left',
    })),
  );

  const sizes = sizeRows.map((s) => ({
    _key: localKey(),
    model_label: s.model_label ?? '',
    values: dbToValues(s, columns),
  }));

  const vehiclePositions = ((vehiclePositionsRes.data as TireVehiclePosition[] | null) ?? []).map((p) => ({
    _key: localKey(),
    icon_image_url: p.icon_image_url,
    vehicle_label: p.vehicle_label ?? '',
  }));

  const positionLegends = ((positionLegendsRes.data as TirePositionLegend[] | null) ?? []).map((l) => ({
    _key: localKey(),
    label: l.label,
    color: l.color,
  }));

  return {
    basic: {
      name: tire.name,
      slug: tire.slug,
      category_id: tire.category_id ?? '',
      subtitle: tire.subtitle ?? '',
      short_description: tire.short_description ?? '',
      description: tire.description ?? '',
      hero_image_url: tire.hero_image_url,
      card_image_url: tire.card_image_url,
      features_diagram_image_url: tire.features_diagram_image_url,
      product_description_image_url: tire.product_description_image_url,
      badges: tire.badges ?? [],
      benefits: tire.benefits ?? [],
      cta_label: tire.cta_label ?? 'REQUEST QUOTE / PRICING',
      cta_link: tire.cta_link ?? '',
      spec_sheet_url: tire.spec_sheet_url,
      is_published: tire.is_published,
    },
    tabs,
    metrics,
    features,
    sizeColumns: editorFromResolved(columns),
    sizes,
    vehiclePositions,
    positionLegends,
  };
};

const ensureSlugUnique = async (slug: string, id: string | null) => {
  let query = supabase.from('tires').select('id').eq('slug', slug);
  if (id) query = query.neq('id', id);
  const { data, error } = await query;
  if (error) throw error;
  if (data && data.length) throw new Error('Slug already in use — choose a different slug');
};

const replaceChildRows = async (
  table:
    | 'tire_tabs'
    | 'tire_performance_metrics'
    | 'tire_features'
    | 'tire_sizes'
    | 'tire_size_columns'
    | 'tire_recommended_positions'
    | 'tire_vehicle_positions'
    | 'tire_position_legends',
  tireId: string,
  rows: Record<string, unknown>[],
) => {
  await supabase.from(table).delete().eq('tire_id', tireId);
  if (rows.length) {
    const { error } = await supabase.from(table).insert(rows);
    if (error) throw error;
  }
};

// Replace a tire's persisted spec columns with the given resolved set (delete + reinsert),
// keeping tire_size_columns in sync with the latest CSV import / editor save.
export const replaceSizeColumns = async (
  tireId: string,
  columns: ResolvedColumn[],
): Promise<void> => {
  await replaceChildRows(
    'tire_size_columns',
    tireId,
    columnsToDbRows(columns, tireId) as unknown as Record<string, unknown>[],
  );
};

export const saveTire = async (model: EditorModel, id: string | null): Promise<string> => {
  const { basic } = model;
  if (!basic.name.trim()) throw new Error('Name is required');
  if (!basic.slug.trim()) throw new Error('Slug is required');
  if (!basic.category_id) throw new Error('Category is required');

  await ensureSlugUnique(basic.slug, id);

  const tirePayload = {
    name: basic.name.trim(),
    slug: basic.slug.trim(),
    category_id: basic.category_id,
    subtitle: basic.subtitle || null,
    short_description: basic.short_description || null,
    description: basic.description || null,
    hero_image_url: basic.hero_image_url,
    card_image_url: basic.card_image_url,
    features_diagram_image_url: basic.features_diagram_image_url,
    product_description_image_url: basic.product_description_image_url,
    badges: basic.badges,
    benefits: basic.benefits,
    cta_label: basic.cta_label || null,
    cta_link: basic.cta_link || null,
    spec_sheet_url: basic.spec_sheet_url,
    is_published: basic.is_published,
  };

  let tireId = id;
  if (id) {
    const { error } = await supabase.from('tires').update(tirePayload).eq('id', id);
    if (error) throw error;
  } else {
    const { data, error } = await supabase
      .from('tires')
      .insert({ ...tirePayload, display_order: 0 })
      .select('id')
      .single();
    if (error || !data) throw error ?? new Error('Failed to create tire');
    tireId = (data as { id: string }).id;
  }

  const finalId = tireId as string;
  const activeTabs = model.tabs.filter((t) => t.is_active);
  const isTabActive = (tab: TabType) => activeTabs.some((t) => t.tab === tab);

  // Tabs (only active rows, ordered).
  await replaceChildRows(
    'tire_tabs',
    finalId,
    activeTabs.map((t, i) => ({
      tire_id: finalId,
      tab: t.tab,
      display_order: i,
      is_active: true,
    })),
  );

  // Performance metrics.
  await replaceChildRows(
    'tire_performance_metrics',
    finalId,
    isTabActive('performance_indicator')
      ? model.metrics
          .filter((m) => m.label.trim())
          .map((m, i) => ({
            tire_id: finalId,
            label: m.label.trim(),
            score: m.score,
            max_score: m.max_score,
            display_order: i,
          }))
      : [],
  );

  // Product features.
  await replaceChildRows(
    'tire_features',
    finalId,
    isTabActive('product_features')
      ? model.features
          .filter((f) => f.title.trim() || f.icon_image_url)
          .map((f, i) => ({
            tire_id: finalId,
            icon_image_url: f.icon_image_url,
            title: f.title.trim(),
            description: f.description || null,
            position: f.position,
            display_order: i,
          }))
      : [],
  );

  // Sizes + their dynamic column definitions (always saved, kept in sync).
  const columns = resolvedFromEditor(model.sizeColumns);
  await replaceChildRows(
    'tire_sizes',
    finalId,
    model.sizes.map((row, i) => valuesToPayload(row, columns, finalId, i) as Record<string, unknown>),
  );
  await replaceSizeColumns(finalId, columns);

  // Recommended vehicle icons.
  await replaceChildRows(
    'tire_vehicle_positions',
    finalId,
    isTabActive('recommended_position')
      ? model.vehiclePositions
          .filter((p) => p.icon_image_url || p.vehicle_label.trim())
          .map((p, i) => ({
            tire_id: finalId,
            icon_image_url: p.icon_image_url,
            vehicle_label: p.vehicle_label.trim() || null,
            display_order: i,
          }))
      : [],
  );

  // Recommended position legend.
  await replaceChildRows(
    'tire_position_legends',
    finalId,
    isTabActive('recommended_position')
      ? model.positionLegends
          .filter((l) => l.label.trim())
          .map((l, i) => ({
            tire_id: finalId,
            label: l.label.trim(),
            color: l.color || '#000000',
            display_order: i,
          }))
      : [],
  );

  return finalId;
};
