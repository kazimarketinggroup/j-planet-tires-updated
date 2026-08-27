// Flattens the catalogue's tyre → sizes tree into one row per size, for the
// "All Sizes" catalogue view. Each row carries a back-reference to its parent
// tyre so the card can show the model badge and link to the size detail page.
import type { CatalogueTire } from './publicApi';
import type { TireSize } from '../../../admin/types/database';
import type { TranslationKey } from '../../../i18n/translations';
import { parseSize, type SizeCriteria } from './tireFinder';

// Catalogue browse mode: whole tyre models, or every individual size.
export type CatalogueView = 'models' | 'sizes';

export interface SizeRow {
  size: TireSize;
  tire: CatalogueTire;
}

// One row per size across every tyre, preserving catalogue order (tyres are
// pre-sorted by display_order; sizes are ordered within each tyre).
export const flattenSizes = (tires: CatalogueTire[]): SizeRow[] => {
  const rows: SizeRow[] = [];
  for (const tire of tires) {
    const sizes = [...tire.sizes].sort((a, b) => a.display_order - b.display_order);
    for (const size of sizes) rows.push({ size, tire });
  }
  return rows;
};

// Read a spec value from a size, checking the real column first and then
// extra_specs (where CMS-defined columns like "Max Load" live). Returns '' when
// absent so the card can fall back to a dash.
export const sizeSpec = (size: TireSize, key: string): string => {
  const direct = (size as unknown as Record<string, unknown>)[key];
  if (direct !== null && direct !== undefined && direct !== '') return String(direct);
  const extra = size.extra_specs ?? {};
  // Match the exact key, then a few common label variants seen in imported CSVs.
  for (const k of Object.keys(extra)) {
    if (k.toLowerCase().replace(/[^a-z0-9]/g, '') === key.toLowerCase().replace(/[^a-z0-9]/g, '')) {
      const v = extra[k];
      if (v !== null && v !== undefined && v !== '') return String(v);
    }
  }
  return '';
};

// "Max Load" lives in extra_specs under any of several label spellings. Return
// the first non-empty match, preferring lbs.
export const maxLoadOf = (size: TireSize): string => {
  const extra = size.extra_specs ?? {};
  const entries = Object.entries(extra);
  const candidates = entries.filter(([k]) => /max\.?\s*load/i.test(k));
  // Prefer an lbs column, else the first max-load column found.
  const lbs = candidates.find(([k]) => /lbs/i.test(k));
  const chosen = lbs ?? candidates[0];
  if (!chosen) return '';
  const v = chosen[1];
  return v === null || v === undefined ? '' : String(v);
};

export interface SpecPair {
  label: string;
  value: string;
}

// Turn an extra_specs key into a readable label: "max_load_lbs" -> "Max Load Lbs".
const humanize = (key: string): string =>
  key.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase());

// Known real columns rendered first (in this order) when populated. `label` uses
// an i18n key so the four headline specs stay translated; the rest are humanized.
const REAL_FIELDS: { key: keyof TireSize; labelKey?: TranslationKey }[] = [
  { key: 'inch', labelKey: 'sizeCard.inch' },
  { key: 'load_index', labelKey: 'sizeCard.loadSpeed' },
  { key: 'max_psi', labelKey: 'sizeCard.maxPsi' },
  { key: 'section_width_mm' },
  { key: 'overall_diameter_mm' },
  { key: 'tread_depth_mm' },
  { key: 'rim_width_range' },
];

const REAL_FIELD_FALLBACK_LABEL: Partial<Record<keyof TireSize, string>> = {
  section_width_mm: 'Section Width (mm)',
  overall_diameter_mm: 'Overall Diameter (mm)',
  tread_depth_mm: 'Tread Depth (mm)',
  rim_width_range: 'Rim Width',
};

// Max spec rows to render on a card, so a data-rich size can't create a giant,
// out-of-line card in the grid.
const MAX_SPECS = 6;

// Every populated spec for a size, ready to render: the headline real columns
// first, then any CMS-defined extra_specs. Max Load is inserted right after the
// numeric headline specs since it is a headline field stored in extra_specs.
// `t` is the i18n lookup so headline labels stay translated.
export const sizeSpecList = (size: TireSize, t: (key: TranslationKey) => string): SpecPair[] => {
  const pairs: SpecPair[] = [];
  const seenExtraKeys = new Set<string>();

  const pushReal = (field: (typeof REAL_FIELDS)[number]) => {
    const raw = (size as unknown as Record<string, unknown>)[field.key as string];
    if (raw === null || raw === undefined || raw === '') return;
    const label = field.labelKey ? t(field.labelKey) : REAL_FIELD_FALLBACK_LABEL[field.key] ?? humanize(String(field.key));
    pairs.push({ label, value: String(raw) });
  };

  // Inch, LI & SR, Max Psi first.
  pushReal(REAL_FIELDS[0]);
  pushReal(REAL_FIELDS[1]);
  pushReal(REAL_FIELDS[2]);

  // Max Load (from extra_specs) sits with the headline group.
  const maxLoad = maxLoadOf(size);
  if (maxLoad) {
    pairs.push({ label: t('sizeCard.maxLoad'), value: maxLoad });
    for (const k of Object.keys(size.extra_specs ?? {})) {
      if (/max\.?\s*load/i.test(k)) seenExtraKeys.add(k);
    }
  }

  // Remaining real columns (dimensions, rim width).
  for (let i = 3; i < REAL_FIELDS.length; i++) pushReal(REAL_FIELDS[i]);

  // Any other CMS-defined columns not already shown.
  for (const [k, v] of Object.entries(size.extra_specs ?? {})) {
    if (seenExtraKeys.has(k)) continue;
    if (v === null || v === undefined || v === '') continue;
    pairs.push({ label: humanize(k), value: String(v) });
  }

  return pairs.slice(0, MAX_SPECS);
};

// Case-insensitive substring match of the query against a size's searchable
// text (size string + parent model name + pattern).
export const sizeMatchesQuery = (row: SizeRow, query: string): boolean => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [row.size.size, row.tire.name, row.size.pattern, row.size.model_label]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
};

const norm = (s: string | null | undefined): string => (s ?? '').trim();
// Compare two numeric-ish tokens so "22.5" === "22.50" and "070" === "70".
const numEq = (a: string, b: string): boolean => {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (Number.isNaN(x) || Number.isNaN(y)) return a.toLowerCase() === b.toLowerCase();
  return x === y;
};

// Does a single size row match the finder's By-Size selection? The finder narrows
// to whole tyres, so the All-Sizes view must additionally keep only the size rows
// whose own width/aspect/rim equal what was picked — otherwise a matched tyre's
// other sizes leak in. Only width/aspect/rim are checked here (axle isn't part of
// the size string); an empty criterion is treated as "any".
export const sizeRowMatchesCriteria = (size: TireSize, c: SizeCriteria): boolean => {
  const parsed = parseSize(size.size);
  if (!parsed) return false; // can't verify — exclude rather than show a wrong size
  if (norm(c.width) && !numEq(parsed.width, c.width)) return false;
  if (norm(c.aspect) && !numEq(parsed.aspect ?? '', c.aspect)) return false;
  if (norm(c.rim) && !numEq(parsed.rim, c.rim)) return false;
  return true;
};
