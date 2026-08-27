// Tire Finder: derives filter options from the live catalogue and filters/sorts tires.
// Everything is data-driven so dropdowns only ever offer values that return results.
import type { CatalogueTire } from './publicApi';
import { SEGMENT_LABELS, type TireSize } from '../../../admin/types/database';

export type FinderMode = 'size' | 'vehicle';

export interface SizeCriteria {
  width: string;
  aspect: string;
  rim: string;
  axle: string;
}

export interface VehicleCriteria {
  vehicleType: string;
  roadType: string;
  axle: string;
  keyPriority: string;
}

export interface FilterCriteria {
  plyRating: string;
  loadRange: string;
  msOnly: boolean;
  pmsfOnly: boolean;
  regroovableOnly: boolean;
}

export const emptySizeCriteria = (): SizeCriteria => ({ width: '', aspect: '', rim: '', axle: '' });
export const emptyVehicleCriteria = (): VehicleCriteria => ({
  vehicleType: '',
  roadType: '',
  axle: '',
  keyPriority: '',
});
export const emptyFilters = (): FilterCriteria => ({
  plyRating: '',
  loadRange: '',
  msOnly: false,
  pmsfOnly: false,
  regroovableOnly: false,
});

// ---- size string parsing -------------------------------------------------

export interface ParsedSize {
  width: string;
  aspect: string | null;
  rim: string;
}

// Parse "315/80R22.5", "11R22.5", "12.00R20", "LT265/70R17" -> width/aspect/rim tokens.
export const parseSize = (raw: string | null | undefined): ParsedSize | null => {
  if (!raw) return null;
  const m = raw.match(/(\d+(?:\.\d+)?)(?:\/(\d+(?:\.\d+)?))?\s*[R-]\s*(\d+(?:\.\d+)?)/i);
  if (!m) return null;
  return { width: m[1], aspect: m[2] ?? null, rim: m[3] };
};

const num = (s: string) => parseFloat(s);
const byNum = (a: string, b: string) => num(a) - num(b);

const uniqSortedNum = (values: string[]): string[] =>
  Array.from(new Set(values.filter(Boolean))).sort(byNum);

// CSV-import data is stored as text and can carry stray whitespace, thousand-
// separator commas, or a unit suffix (e.g. "8mm", "22,000", " 18 "). Extracts
// the first clean number; returns null (not 0) when there's nothing numeric to
// parse, so callers can tell "no data" apart from a real 0.
const parseNumericLoose = (raw: string | number | null | undefined): number | null => {
  if (raw === null || raw === undefined) return null;
  const s = String(raw).replace(/,/g, '').trim();
  const m = s.match(/-?\d+(\.\d+)?/);
  if (!m) return null;
  const n = parseFloat(m[0]);
  return Number.isNaN(n) ? null : n;
};

// Load index is commonly stored as a dual single/dual-mount figure, e.g.
// "100/114 N/S" — the higher (dual-mount) number is the meaningful "max load"
// value, so unlike parseNumericLoose this scans every embedded number (comma-
// and decimal-safe) and returns the largest, not just the first.
const maxNumericInString = (raw: string | null | undefined): number | null => {
  if (!raw) return null;
  const matches = String(raw).replace(/,/g, '').match(/\d+(\.\d+)?/g);
  if (!matches?.length) return null;
  return Math.max(...matches.map((m) => parseFloat(m)));
};

const uniqSortedStr = (values: string[]): string[] =>
  Array.from(new Set(values.map((v) => v.trim()).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );

// Ply ratings normalize to "<digits>PR" (see normalizePly below), but a plain
// alphabetical sort breaks once a single-digit value is present — e.g. "3PR"
// would sort after "24PR" as text even though 3 < 24. Sort by the numeric part.
const uniqSortedPly = (values: string[]): string[] =>
  Array.from(new Set(values.map((v) => v.trim()).filter(Boolean))).sort(
    (a, b) => (parseNumericLoose(a) ?? 0) - (parseNumericLoose(b) ?? 0),
  );

const stringValue = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text || null;
};

// ---- extra_specs / marking helpers ---------------------------------------

const extraByKey = (size: TireSize, re: RegExp): string | null => {
  const ex = size.extra_specs;
  if (!ex) return null;
  for (const [k, v] of Object.entries(ex)) {
    if (re.test(k) && v !== null && v !== undefined && String(v).trim() !== '') {
      return String(v).trim();
    }
  }
  return null;
};

const extraValuesByKey = (size: TireSize, re: RegExp): string[] => {
  const ex = size.extra_specs;
  if (!ex) return [];
  return Object.entries(ex)
    .filter(([key, value]) => re.test(key) && stringValue(value))
    .map(([, value]) => String(value).trim());
};

const NEGATIVE = new Set(['', 'no', 'n', '-', '–', 'false', '0', 'none', 'na', 'n/a']);
const isYes = (v: string | null): boolean => (v ? !NEGATIVE.has(v.toLowerCase()) : false);

// Word-boundary anchored so "ply" only matches as a standalone token (e.g.
// "ply_rating"), not as a substring of an unrelated key (e.g. "supply_notes").
const PLY_RE = /(^|[_\s-])ply([_\s-]|$)/i;
// Same anchoring — "load.?range" alone would also match inside an unrelated
// key like "payload_range" (contains "load_range" as a substring).
const LOAD_RANGE_RE = /(^|[_\s-])load.?range([_\s-]|$)/i;
const MS_RE = /(^|_)m.?s($|_)|mud.?snow/i;
const PMSF_RE = /pmsf|three_pmsf|3pmsf|severe.?snow/i;
const REGROOVE_RE = /regroov/i;
const SIZE_VALUE_RE = /(^|_)size($|_)|tire.?size|tyre.?size|fitment|dimension/i;
const RIM_VALUE_RE = /rim.?diameter|rim.?inch|inch/i;

// Normalize to a canonical "<digits>PR" form so the same ply rating stored as
// "24", "24 PR", or "24PR" in different products' extra_specs collapses to one
// dropdown option / match key. Non-numeric values (star ratings, design codes
// picked up by a loose key match) normalize to null and are excluded.
const normalizePly = (v: string | null): string | null => {
  if (!v) return null;
  const digits = v.match(/\d+/)?.[0];
  return digits ? `${digits}PR` : null;
};

// Normalize to a canonical uppercase form so "h" / "H " / "h" all collapse to
// the same dropdown option / match key.
const normalizeLoadRange = (v: string | null): string | null => (v ? v.trim().toUpperCase() : null);

// Some products store ply rating and load range combined in one field, e.g.
// "lr_pr": "H/16" (load range H, 16PR) or plain "24PR" (ply only — no load
// range recorded for that size row). Neither PLY_RE nor LOAD_RANGE_RE match
// the key name "lr_pr" (it contains neither "ply" nor "load"+"range"), so
// this needs its own key match + parser.
const LR_PR_RE = /(^|[_\s-])lr.?pr([_\s-]|$)/i;

const parseLrPr = (raw: string | null): { loadRange: string | null; ply: string | null } => {
  if (!raw) return { loadRange: null, ply: null };
  const combo = raw.trim().match(/^([A-Za-z])\s*\/\s*(\d+)$/);
  if (combo) return { loadRange: combo[1].toUpperCase(), ply: `${combo[2]}PR` };
  const plyOnly = raw.trim().match(/^(\d+)\s*PR$/i);
  if (plyOnly) return { loadRange: null, ply: `${plyOnly[1]}PR` };
  return { loadRange: null, ply: null };
};

const plyOf = (size: TireSize): string | null =>
  normalizePly(extraByKey(size, PLY_RE)) ?? parseLrPr(extraByKey(size, LR_PR_RE)).ply;

const loadRangeOf = (size: TireSize): string | null =>
  normalizeLoadRange(extraByKey(size, LOAD_RANGE_RE)) ?? parseLrPr(extraByKey(size, LR_PR_RE)).loadRange;
const SERVICE_INDEX_RE = /service.?index|service.?description|service.?desc|svc.?index/i;
const LOAD_SPEED_RE = /load.?index|load.?speed|speed.?rating|li.?sr|la.?sr|l.?s.?r/i;

const loadIndexNumberOf = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const max = maxNumericInString(value);
  if (max === null) return value.trim() || null; // no digits at all — show the raw text as-is
  return String(max);
};

export const loadSpeedOf = (size: TireSize | null | undefined): string | null => {
  if (!size) return null;
  const serviceIndex = extraByKey(size, SERVICE_INDEX_RE);
  if (serviceIndex) return serviceIndex;
  const direct = size.load_index?.trim();
  if (direct) return loadIndexNumberOf(direct);
  const loadSpeed = extraByKey(size, LOAD_SPEED_RE);
  return loadIndexNumberOf(loadSpeed);
};

const sizeCandidates = (size: TireSize): string[] =>
  [
    size.size,
    size.model_label,
    size.pattern,
    size.inch ? `R${size.inch}` : null,
    ...extraValuesByKey(size, SIZE_VALUE_RE),
    ...extraValuesByKey(size, RIM_VALUE_RE).map((v) => `R${v}`),
  ]
    .map(stringValue)
    .filter((value): value is string => Boolean(value));

const parseSizeRow = (size: TireSize): ParsedSize | null => {
  for (const candidate of sizeCandidates(size)) {
    const parsed = parseSize(candidate);
    if (parsed) return parsed;
  }
  if (size.inch) return { width: '', aspect: null, rim: String(size.inch) };
  return null;
};

// ---- axle / vehicle helpers ----------------------------------------------

export const AXLE_OPTIONS = ['Steer', 'Drive', 'Trailer', 'All-Position'] as const;

const normAxle = (pos: string | null | undefined): string | null => {
  if (!pos) return null;
  const s = pos.toLowerCase();
  if (s.includes('all')) return 'All-Position';
  if (s.includes('steer') || s.includes('front')) return 'Steer';
  if (s.includes('drive')) return 'Drive';
  if (s.includes('trail') || s.includes('rear')) return 'Trailer';
  return null;
};

const tireAxles = (tire: CatalogueTire): string[] => {
  const set = new Set<string>();
  for (const p of tire.positions) {
    const a = normAxle(p.position);
    if (a) set.add(a);
  }
  for (const value of [
    tire.name,
    tire.short_description,
    tire.category?.name,
    ...(tire.benefits ?? []),
  ]) {
    const a = normAxle(value);
    if (a) set.add(a);
  }
  return Array.from(set);
};

// ---- derived option lists ------------------------------------------------

export interface FinderOptions {
  widths: string[];
  aspects: string[];
  rims: string[];
  axles: string[];
  vehicleTypes: string[];
  roadTypes: string[];
  keyPriorities: string[];
  plyRatings: string[];
  loadRanges: string[];
  hasMs: boolean;
  hasPmsf: boolean;
  hasRegroovable: boolean;
}

export const deriveOptions = (tires: CatalogueTire[]): FinderOptions => {
  const widths: string[] = [];
  const aspects: string[] = [];
  const rims: string[] = [];
  const axles = new Set<string>();
  const vehicleTypes: string[] = [];
  const roadTypes: string[] = [];
  const keyPriorities: string[] = [];
  const plyRatings: string[] = [];
  const loadRanges: string[] = [];
  let hasMs = false;
  let hasPmsf = false;
  let hasRegroovable = false;

  for (const t of tires) {
    for (const s of t.sizes) {
      const parsed = parseSizeRow(s);
      if (parsed) {
        if (parsed.width) widths.push(parsed.width);
        if (parsed.aspect) aspects.push(parsed.aspect);
        rims.push(parsed.rim);
      }
      const ply = plyOf(s);
      if (ply) plyRatings.push(ply);
      const lr = loadRangeOf(s);
      if (lr) loadRanges.push(lr);
      if (isYes(extraByKey(s, MS_RE))) hasMs = true;
      if (isYes(extraByKey(s, PMSF_RE))) hasPmsf = true;
      if (isYes(extraByKey(s, REGROOVE_RE))) hasRegroovable = true;
    }
    for (const a of tireAxles(t)) axles.add(a);
    for (const p of t.positions) if (p.vehicle_type) vehicleTypes.push(p.vehicle_type);
    if (t.category?.name) roadTypes.push(t.category.name);
    if (t.category?.segment) vehicleTypes.push(SEGMENT_LABELS[t.category.segment]);
    for (const b of t.benefits ?? []) keyPriorities.push(b);
  }

  return {
    widths: uniqSortedNum(widths),
    aspects: uniqSortedNum(aspects),
    rims: uniqSortedNum(rims),
    axles: AXLE_OPTIONS.filter((a) => axles.has(a)),
    vehicleTypes: uniqSortedStr(vehicleTypes),
    roadTypes: uniqSortedStr(roadTypes),
    keyPriorities: uniqSortedStr(keyPriorities),
    plyRatings: uniqSortedPly(plyRatings),
    loadRanges: uniqSortedStr(loadRanges),
    hasMs,
    hasPmsf,
    hasRegroovable,
  };
};

// ---- filtering -----------------------------------------------------------

const matchesSize = (tire: CatalogueTire, c: SizeCriteria): boolean => {
  if (c.axle && !tireAxles(tire).includes(c.axle)) return false;
  if (!c.width && !c.aspect && !c.rim) return true;
  return tire.sizes.some((s) => matchesSizeRow(s, c));
};

const matchesSizeRow = (size: TireSize, c: SizeCriteria): boolean => {
  if (!c.width && !c.aspect && !c.rim) return true;
  const p = parseSizeRow(size);
  if (!p) return false;
  if (c.width && p.width !== c.width) return false;
  if (c.aspect && p.aspect !== c.aspect) return false;
  if (c.rim && p.rim !== c.rim) return false;
  return true;
};

const matchesFilterRow = (size: TireSize, f: FilterCriteria): boolean => {
  if (f.plyRating && plyOf(size) !== f.plyRating) return false;
  if (f.loadRange && loadRangeOf(size) !== f.loadRange) return false;
  if (f.msOnly && !isYes(extraByKey(size, MS_RE))) return false;
  if (f.pmsfOnly && !isYes(extraByKey(size, PMSF_RE))) return false;
  if (f.regroovableOnly && !isYes(extraByKey(size, REGROOVE_RE))) return false;
  return true;
};

const matchingSizes = (
  tire: CatalogueTire,
  mode: FinderMode,
  size: SizeCriteria,
  filters: FilterCriteria,
): TireSize[] =>
  tire.sizes
    .filter((s) => (mode === 'size' ? matchesSizeRow(s, size) : true))
    .filter((s) => matchesFilterRow(s, filters))
    .sort((a, b) => a.display_order - b.display_order);

const searchableText = (tire: CatalogueTire, sizes: TireSize[]): string =>
  [
    tire.name,
    tire.short_description,
    tire.category?.name,
    ...(tire.benefits ?? []),
    ...tire.positions.flatMap((p) => [p.vehicle_type, p.position]),
    ...sizes.flatMap((s) => [
      s.model_label,
      s.size,
      loadSpeedOf(s),
      s.pattern,
      s.rim_width_range,
      s.max_psi,
      s.inch,
      s.tread_depth_mm,
      ...Object.values(s.extra_specs ?? {}),
    ]),
  ]
    .filter((v) => v !== null && v !== undefined && String(v).trim() !== '')
    .join(' ')
    .toLowerCase();

const matchesVehicle = (tire: CatalogueTire, c: VehicleCriteria): boolean => {
  if (
    c.vehicleType &&
    !tire.positions.some((p) => p.vehicle_type === c.vehicleType) &&
    (!tire.category?.segment || SEGMENT_LABELS[tire.category.segment] !== c.vehicleType)
  ) {
    return false;
  }
  if (c.roadType && tire.category?.name !== c.roadType) return false;
  if (c.axle && !tireAxles(tire).includes(c.axle)) return false;
  if (c.keyPriority && !(tire.benefits ?? []).includes(c.keyPriority)) return false;
  return true;
};

export const applyFinder = (
  tires: CatalogueTire[],
  mode: FinderMode,
  size: SizeCriteria,
  vehicle: VehicleCriteria,
  filters: FilterCriteria,
  query: string,
): CatalogueTire[] => {
  const q = query.trim().toLowerCase();
  const result = tires.reduce<CatalogueTire[]>((acc, t) => {
    if (mode === 'size' ? !matchesSize(t, size) : !matchesVehicle(t, vehicle)) return acc;

    const sizes = matchingSizes(t, mode, size, filters);
    if (sizes.length === 0) return acc;
    if (q && !searchableText(t, sizes).includes(q)) return acc;

    acc.push({ ...t, sizes });
    return acc;
  }, []);

  // No client-side re-sort — `tires` already arrives ordered by the catalogue's
  // own display_order (see fetchPublishedTires), which filtering preserves.
  return result;
};

export const hasActiveCriteria = (
  mode: FinderMode,
  size: SizeCriteria,
  vehicle: VehicleCriteria,
  filters: FilterCriteria,
  query: string,
): boolean => {
  const finderActive =
    mode === 'size'
      ? Boolean(size.width || size.aspect || size.rim || size.axle)
      : Boolean(vehicle.vehicleType || vehicle.roadType || vehicle.axle || vehicle.keyPriority);
  const filtersActive =
    Boolean(filters.plyRating || filters.loadRange) ||
    filters.msOnly ||
    filters.pmsfOnly ||
    filters.regroovableOnly;
  return finderActive || filtersActive || Boolean(query.trim());
};
