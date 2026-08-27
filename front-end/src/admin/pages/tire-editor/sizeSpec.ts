// Dynamic, per-tire Size/Technical Data column logic.
//
// Columns are no longer fixed per category segment. They are derived from whatever
// CSV was imported for a tire (or edited manually) and persisted in `tire_size_columns`.
// A column is either "common" (column_key matches a real tire_sizes field) or "custom"
// (value lives in tire_sizes.extra_specs[column_key]).
import type { TireSize, TireSizeColumn } from '../../types/database';

// Real tire_sizes columns that a CSV header can map onto.
export type CommonFieldKey =
  | 'size'
  | 'inch'
  | 'load_index'
  | 'pattern'
  | 'max_psi'
  | 'rim_width_range'
  | 'section_width_mm'
  | 'overall_diameter_mm'
  | 'tread_depth_mm';

interface CommonFieldDef {
  key: CommonFieldKey;
  label: string;
  numeric: boolean;
  // Pre-normalized (normalizeForMatch) header forms that resolve to this field.
  aliases: string[];
}

// The 9 known common fields. `label` is the canonical display text; `aliases` cover the
// header variants we fuzzy-match against (case/units/punctuation already stripped).
export const COMMON_FIELDS: CommonFieldDef[] = [
  { key: 'size', label: 'Size', numeric: false, aliases: ['size', 'tiresize', 'tyresize'] },
  { key: 'inch', label: 'Inch', numeric: true, aliases: ['inch', 'riminch', 'rimdiameter', 'rimdiameterinch'] },
  {
    key: 'load_index',
    label: 'Load Index',
    numeric: false,
    aliases: ['loadindex', 'li', 'lisr', 'lasr', 'lsr', 'lispeedrating', 'loadindexspeedrating'],
  },
  { key: 'pattern', label: 'Pattern', numeric: false, aliases: ['pattern'] },
  { key: 'max_psi', label: 'Max Psi', numeric: true, aliases: ['maxpsi', 'psi', 'maximumpsi'] },
  {
    key: 'rim_width_range',
    label: 'Rim Width Range',
    numeric: false,
    aliases: ['rimwidthrange', 'rimwidth', 'recommendedrim', 'recommendedrimwidth'],
  },
  {
    key: 'section_width_mm',
    label: 'Section Width mm',
    numeric: true,
    aliases: ['sectionwidthmm', 'sectionwidth', 'sectionwidthinmm'],
  },
  {
    key: 'overall_diameter_mm',
    label: 'Overall Diameter mm',
    numeric: true,
    aliases: ['overalldiametermm', 'overalldiameter', 'overalldiam', 'overalldia', 'diametermm'],
  },
  {
    key: 'tread_depth_mm',
    label: 'Tread Depth mm',
    numeric: true,
    aliases: ['treaddepthmm', 'treaddepth'],
  },
];

const COMMON_FIELD_KEYS = new Set<string>(COMMON_FIELDS.map((f) => f.key));

export const commonFieldByKey = (key: string): CommonFieldDef | undefined =>
  COMMON_FIELDS.find((f) => f.key === key);

// Header variants that mean "this is the grouping/model column" (kept special — not a column).
const MODEL_ALIASES = ['model', 'modellabel', 'group', 'modelgroup', 'modelname'];

// Normalize a header for fuzzy matching: lowercase, tyre->tire, drop punctuation.
// Unit hints inside parentheses (mm/inch/32) are kept rather than discarded — dropping
// them made "Overall Diameter (inch)" and "Overall Diameter (mm)" normalize identically
// and collide, so the wrong one would silently win the common-field slot.
export const normalizeForMatch = (s: string): string =>
  s
    .toLowerCase()
    .replace(/tyre/g, 'tire')
    .replace(/[^a-z0-9]+/g, '');

// Generate a snake_case key from an arbitrary header, e.g. "UTQG Wear" -> "utqg_wear".
export const toSnakeKey = (s: string): string =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

const humanizeKey = (key: string): string =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const isModelHeader = (header: string): boolean =>
  MODEL_ALIASES.includes(normalizeForMatch(header));

export const matchCommonField = (header: string): CommonFieldDef | undefined => {
  const n = normalizeForMatch(header);
  return COMMON_FIELDS.find((f) => f.aliases.includes(n));
};

// A render/IO descriptor for one column, shared by importer, editor and public table.
export interface ResolvedColumn {
  key: string; // column_key — real field name when isCommon, else generated snake_case
  label: string; // display label
  isCommon: boolean;
  numeric: boolean;
}

// Resolve a CSV header row into ordered columns + the detected model/group header (if any).
// Every non-empty header (other than the one detected as the model/group column) always
// produces exactly one column — never silently dropped. If a header's matched/generated key
// is already taken (e.g. a CSV has both "Rim Width" and "Rim Width Range"), it falls back to
// a disambiguated custom key instead of being skipped, so no column is ever lost.
export const resolveCsvHeaders = (
  headers: string[],
): { columns: ResolvedColumn[]; modelHeader?: string } => {
  const columns: ResolvedColumn[] = [];
  const seen = new Set<string>();
  let modelHeader: string | undefined;

  const uniqueKey = (base: string): string => {
    let key = base;
    let i = 2;
    while (seen.has(key)) key = `${base}_${i++}`;
    return key;
  };

  for (const raw of headers) {
    const header = (raw ?? '').trim();
    if (!header) continue;
    if (!modelHeader && isModelHeader(header)) {
      modelHeader = raw;
      continue;
    }

    const common = matchCommonField(header);
    let col: ResolvedColumn;
    if (common && !seen.has(common.key)) {
      col = { key: common.key, label: header, isCommon: true, numeric: common.numeric };
    } else {
      col = { key: uniqueKey(toSnakeKey(header) || 'column'), label: header, isCommon: false, numeric: false };
    }
    seen.add(col.key);
    columns.push(col);
  }

  return { columns, modelHeader };
};

// Map persisted tire_size_columns rows into render columns, ordered by display_order.
export const columnsFromDb = (rows: TireSizeColumn[]): ResolvedColumn[] =>
  [...rows]
    .sort((a, b) => a.display_order - b.display_order)
    .map((r) => ({
      key: r.column_key,
      label: r.column_label,
      isCommon: r.is_common || Boolean(commonFieldByKey(r.column_key)),
      numeric: commonFieldByKey(r.column_key)?.numeric ?? false,
    }));

// Render-time fallback for tires that have no tire_size_columns yet: derive columns from
// whichever real fields are populated + the union of extra_specs keys across rows.
export const deriveColumnsFromSizes = (sizes: TireSize[]): ResolvedColumn[] => {
  const columns: ResolvedColumn[] = [];

  for (const field of COMMON_FIELDS) {
    if (sizes.some((s) => s[field.key] !== null && s[field.key] !== undefined && s[field.key] !== '')) {
      columns.push({ key: field.key, label: field.label, isCommon: true, numeric: field.numeric });
    }
  }

  const seenExtra = new Set<string>();
  for (const s of sizes) {
    for (const key of Object.keys(s.extra_specs ?? {})) {
      if (COMMON_FIELD_KEYS.has(key) || seenExtra.has(key)) continue;
      seenExtra.add(key);
      columns.push({ key, label: humanizeKey(key), isCommon: false, numeric: false });
    }
  }

  return columns;
};

// Read a single cell value for a column (real field or extra_specs). '' when missing.
// For a common numeric field, a row's raw value may not have parsed as a number (e.g. a
// "11/32" fraction in a column meant to hold a decimal mm value) — valuesToPayload keeps
// that original text in extra_specs under the same key so it still displays here instead
// of silently showing as missing.
const findExtraValue = (size: TireSize, candidates: string[]): string => {
  const extra = size.extra_specs ?? {};
  for (const key of candidates) {
    const value = extra[key];
    if (value !== null && value !== undefined && value !== '') return String(value);
  }
  return '';
};

export const cellValue = (size: TireSize, col: ResolvedColumn): string => {
  const commonField = commonFieldByKey(col.key);
  const isCommonKey = Boolean(commonField) || col.isCommon;

  const directValue = isCommonKey
    ? (size as unknown as Record<string, unknown>)[col.key]
    : size.extra_specs?.[col.key];
  if (directValue !== null && directValue !== undefined && directValue !== '') return String(directValue);

  const candidates = new Set<string>();
  if (col.key) candidates.add(col.key);
  candidates.add(toSnakeKey(col.key));
  candidates.add(toSnakeKey(col.label));
  if (isCommonKey) {
    for (const alias of commonField?.aliases ?? []) candidates.add(alias);
    candidates.add(col.key.replace(/_/g, ''));
  }

  const fallback = findExtraValue(size, Array.from(candidates));
  if (fallback) return fallback;

  if (isCommonKey) {
    const directExtra = size.extra_specs?.[col.key];
    if (directExtra !== null && directExtra !== undefined && directExtra !== '') return String(directExtra);
  }
  return '';
};

// Build the editor `values` map (keyed by column_key) from a DB tire_sizes row.
export const dbToValues = (size: TireSize, columns: ResolvedColumn[]): Record<string, string> =>
  Object.fromEntries(columns.map((c) => [c.key, cellValue(size, c)]));

// Build a tire_sizes insert payload from an editor row + its resolved columns.
export const valuesToPayload = (
  row: { model_label: string; values: Record<string, string> },
  columns: ResolvedColumn[],
  tireId: string,
  displayOrder: number,
): Omit<TireSize, 'id'> => {
  const payload: Record<string, unknown> = {
    tire_id: tireId,
    model_label: row.model_label || null,
    display_order: displayOrder,
    size: null,
    inch: null,
    load_index: null,
    pattern: null,
    max_psi: null,
    rim_width_range: null,
    section_width_mm: null,
    overall_diameter_mm: null,
    tread_depth_mm: null,
  };
  const extra: Record<string, string | number> = {};

  for (const col of columns) {
    const rawValue = row.values[col.key];
    const raw = (rawValue ?? '').trim();
    if (col.isCommon) {
      if (raw === '') {
        payload[col.key] = null;
      } else if (col.numeric) {
        const n = Number(raw);
        if (Number.isNaN(n)) {
          // Doesn't parse as a number (e.g. a "11/32" fraction) — keep the real column
          // null but preserve the original text so it still shows up instead of "–".
          payload[col.key] = null;
          extra[col.key] = raw;
        } else {
          payload[col.key] = n;
        }
      } else {
        payload[col.key] = raw;
      }
    } else if (raw !== '') {
      extra[col.key] = raw;
    }
  }

  payload.extra_specs = Object.keys(extra).length ? extra : null;
  return payload as unknown as Omit<TireSize, 'id'>;
};

// Build tire_size_columns insert rows from resolved columns (display_order = position).
export const columnsToDbRows = (
  columns: ResolvedColumn[],
  tireId: string,
): Omit<TireSizeColumn, 'id'>[] =>
  columns.map((c, i) => ({
    tire_id: tireId,
    column_key: c.key,
    column_label: c.label,
    is_common: c.isCommon,
    display_order: i,
  }));
