// Live data layer for the Tire Finder.
//
// Sources (all in Supabase):
//   tire_finder_dropdown_options — curated dropdown values per tab/field (the base
//                                  option lists; always the source of truth for what
//                                  can appear in a dropdown).
//   tire_finder_by_size          — one row per real catalogue size (matching + cascade).
//   tire_finder_by_vehicle       — one row per product/vehicle/priority fit.
//
// Dropdown values always come from tire_finder_dropdown_options, so the finder is
// never blocked even if the mapping tables are empty. When mapping rows ARE present,
// each dropdown is narrowed (cascaded) to only the values still valid given the other
// fields already chosen. Matching resolves products to the public `tires` table via
// tire_id (preferred) or product_code === tires.name (case-insensitive fallback).
import { supabase } from '../../../admin/lib/supabase';
import type { SizeCriteria, VehicleCriteria } from './tireFinder';

// ---- row shapes -----------------------------------------------------------

export interface SizeRow {
  product_code: string | null;
  width: string | null;
  aspect_ratio: string | null;
  rim: string | null;
  axle_position: string | null;
  full_tire_size: string | null;
  pattern_position: string | null;
  tire_id: string | null;
}

export interface VehicleRow {
  product_code: string | null;
  vehicle_type: string | null;
  road_type: string | null;
  axle_position: string | null;
  key_priority: string | null;
  key_benefit: string | null;
  tire_id: string | null;
}

export interface FinderRows {
  sizeRows: SizeRow[];
  vehicleRows: VehicleRow[];
}

// Base dropdown lists (curated), in the client's chosen display order.
export interface SizeBase {
  widths: string[];
  aspects: string[];
  rims: string[];
  axles: string[];
}
export interface VehicleBase {
  vehicleTypes: string[];
  roadTypes: string[];
  axles: string[];
  keyPriorities: string[];
}
export interface FinderBase {
  size: SizeBase;
  vehicle: VehicleBase;
}

// ---- constants ------------------------------------------------------------

// Imperial widths carry no aspect ratio; their aspect_ratio is stored as '—'.
// '31x10.5' is the flotation size (full sidewall string), also aspect-less.
const IMPERIAL_WIDTHS = new Set([
  '7.00', '7.50', '8', '8.25', '8.5', '9', '9.00', '9.5',
  '10', '10.00', '11', '11.00', '12', '12.00', '13', '31x10.5',
]);

const NO_ASPECT = '—';

const clean = (v: string | null | undefined): string => (v ?? '').trim();

export const isImperialWidth = (width: string): boolean => IMPERIAL_WIDTHS.has(clean(width));

// ---- axle containment -----------------------------------------------------

// A selected axle also matches combined stored values that contain it, e.g.
// selecting 'Trailer' matches 'Steer/Trailer'. A stored value of 'All-Position'
// only matches when the user selects 'All-Position' itself — it is a distinct
// axle position, not a wildcard. 'All Axles' (and empty) means "no axle constraint".
const axleAllowed = (selected: string, stored: string | null): boolean => {
  const s = clean(selected);
  if (!s || s === 'All Axles') return true;
  const st = clean(stored);
  if (!st) return false;
  if (st === s) return true;
  return st.split(/[/,]/).map(clean).includes(s);
};

// ---- fetch ----------------------------------------------------------------

const SIZE_COLS =
  'product_code, width, aspect_ratio, rim, axle_position, full_tire_size, pattern_position, tire_id';
const VEHICLE_COLS =
  'product_code, vehicle_type, road_type, axle_position, key_priority, key_benefit, tire_id';

export const fetchFinderRows = async (): Promise<FinderRows> => {
  const [sizeRes, vehicleRes] = await Promise.all([
    supabase.from('tire_finder_by_size').select(SIZE_COLS),
    supabase.from('tire_finder_by_vehicle').select(VEHICLE_COLS),
  ]);
  if (sizeRes.error) throw sizeRes.error;
  if (vehicleRes.error) throw vehicleRes.error;
  return {
    sizeRows: (sizeRes.data ?? []) as unknown as SizeRow[],
    vehicleRows: (vehicleRes.data ?? []) as unknown as VehicleRow[],
  };
};

interface DropdownRow {
  finder_tab: string | null;
  field_name: string | null;
  value: string | null;
  display_order: number | null;
}

const emptyBase = (): FinderBase => ({
  size: { widths: [], aspects: [], rims: [], axles: [] },
  vehicle: { vehicleTypes: [], roadTypes: [], axles: [], keyPriorities: [] },
});

// Load curated dropdown values (ordered by display_order). Returns empty lists on
// failure so the caller can fall back to deriving options from the mapping rows.
export const fetchDropdownBase = async (): Promise<FinderBase> => {
  const { data, error } = await supabase
    .from('tire_finder_dropdown_options')
    .select('finder_tab, field_name, value, display_order')
    .order('display_order', { ascending: true });
  if (error) throw error;

  const base = emptyBase();
  const push = (list: string[], value: string) => {
    if (value && !list.includes(value)) list.push(value);
  };
  for (const raw of (data ?? []) as DropdownRow[]) {
    const tab = clean(raw.finder_tab);
    const field = clean(raw.field_name);
    const value = clean(raw.value);
    if (!field || !value) continue;
    if (tab === 'by_size') {
      if (field === 'width') push(base.size.widths, value);
      else if (field === 'aspect_ratio') push(base.size.aspects, value);
      else if (field === 'rim') push(base.size.rims, value);
      else if (field === 'axle_position') push(base.size.axles, value);
    } else if (tab === 'by_vehicle') {
      if (field === 'vehicle_type') push(base.vehicle.vehicleTypes, value);
      else if (field === 'road_type') push(base.vehicle.roadTypes, value);
      else if (field === 'axle_position') push(base.vehicle.axles, value);
      else if (field === 'key_priority') push(base.vehicle.keyPriorities, value);
    }
  }
  return base;
};

// ---- sorting helpers (used only when deriving from rows, i.e. no curated base) --

const distinct = (values: (string | null)[]): string[] =>
  Array.from(new Set(values.map(clean).filter(Boolean)));

const leadingNum = (v: string): number => {
  const m = clean(v).match(/[\d.]+/);
  return m ? parseFloat(m[0]) : Number.NaN;
};

const sortWidths = (arr: string[]): string[] =>
  arr.slice().sort((a, b) => {
    const na = leadingNum(a);
    const nb = leadingNum(b);
    const ga = na < 100 ? 0 : 1;
    const gb = nb < 100 ? 0 : 1;
    if (ga !== gb) return ga - gb;
    if (na !== nb) return (na || 0) - (nb || 0);
    return a.localeCompare(b);
  });

const sortAspects = (arr: string[]): string[] =>
  arr.slice().sort((a, b) => {
    if (a === NO_ASPECT) return -1;
    if (b === NO_ASPECT) return 1;
    return (parseFloat(a) || 0) - (parseFloat(b) || 0);
  });

const sortRims = (arr: string[]): string[] =>
  arr.slice().sort((a, b) => {
    const na = leadingNum(a);
    const nb = leadingNum(b);
    if (na !== nb) return (na || 0) - (nb || 0);
    const la = /lt/i.test(a) ? 1 : 0;
    const lb = /lt/i.test(b) ? 1 : 0;
    if (la !== lb) return la - lb;
    return a.localeCompare(b);
  });

// Sort by a fixed canonical order (from the Dropdown Master List); unknowns append A→Z.
const orderer = (order: string[]) => (arr: string[]): string[] =>
  arr.slice().sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

const sortSizeAxles = orderer(['Steer', 'Drive', 'Trailer', 'All-Position', 'Steer/Trailer', 'Commercial Van']);
const sortVehicleAxles = orderer(['Steer', 'Drive', 'Trailer', 'All-Position']);
const sortVehicleTypes = orderer(['Passenger Car', 'Truck', 'Bus', 'Trailer', 'Mixer / Cement', 'Dump Truck', 'Tanker', 'Crane', 'Sanitation']);
const sortRoadTypes = orderer(['Highway', 'On / Off Road', 'Construction']);
const sortPriorities = orderer([
  'Fuel Efficiency', 'Long Mileage', 'Wet Traction', 'Snow / Winter',
  'Puncture Resistance', 'Retreadability', 'Low Rolling Resistance', 'Abrasion Resistance',
  'Dry Performance', 'Comfort & Low Noise',
]);

// ---- cascading options ----------------------------------------------------

// Candidate values for a field = the curated base list UNION any value actually
// present in the mapping rows (self-healing when the dropdown table is out of sync),
// sorted into the canonical master-list order. When mapping rows exist, the list is
// then narrowed (cascaded) to values still valid given the OTHER selected fields.
const optionsFor = <Row>(
  rows: Row[],
  baseList: string[],
  value: (r: Row) => string | null,
  passesOthers: (r: Row) => boolean,
  sorter: (a: string[]) => string[],
): string[] => {
  const candidates = sorter(distinct([...baseList, ...rows.map(value)]));
  if (!rows.length) return candidates; // mapping empty → cannot cascade, show all
  const valid = new Set(rows.filter(passesOthers).map((r) => clean(value(r))));
  return candidates.filter((v) => valid.has(v));
};

const aspectSatisfied = (row: SizeRow, c: SizeCriteria): boolean => {
  if (isImperialWidth(c.width)) return clean(row.aspect_ratio) === NO_ASPECT;
  if (!clean(c.aspect)) return true;
  return clean(row.aspect_ratio) === clean(c.aspect);
};

export const deriveSizeOptions = (rows: SizeRow[], c: SizeCriteria, base: SizeBase): SizeBase => {
  const passes = (row: SizeRow, field: 'width' | 'aspect' | 'rim' | 'axle'): boolean =>
    (field === 'width' || !clean(c.width) || clean(row.width) === clean(c.width)) &&
    (field === 'aspect' || aspectSatisfied(row, c)) &&
    (field === 'rim' || !clean(c.rim) || clean(row.rim) === clean(c.rim)) &&
    (field === 'axle' || !clean(c.axle) || axleAllowed(c.axle, row.axle_position));

  // Imperial widths have no profile — lock the aspect field to '—'.
  const aspects = isImperialWidth(c.width)
    ? [NO_ASPECT]
    : optionsFor(rows, base.aspects, (r) => r.aspect_ratio, (r) => passes(r, 'aspect'), sortAspects);

  return {
    widths: optionsFor(rows, base.widths, (r) => r.width, (r) => passes(r, 'width'), sortWidths),
    aspects,
    rims: optionsFor(rows, base.rims, (r) => r.rim, (r) => passes(r, 'rim'), sortRims),
    axles: optionsFor(rows, base.axles, (r) => r.axle_position, (r) => passes(r, 'axle'), sortSizeAxles),
  };
};

export const deriveVehicleOptions = (
  rows: VehicleRow[],
  c: VehicleCriteria,
  base: VehicleBase,
): VehicleBase => {
  const passes = (row: VehicleRow, field: 'type' | 'road' | 'axle' | 'priority'): boolean =>
    (field === 'type' || !clean(c.vehicleType) || clean(row.vehicle_type) === clean(c.vehicleType)) &&
    (field === 'road' || !clean(c.roadType) || clean(row.road_type) === clean(c.roadType)) &&
    (field === 'axle' || !clean(c.axle) || axleAllowed(c.axle, row.axle_position)) &&
    (field === 'priority' || !clean(c.keyPriority) || clean(row.key_priority) === clean(c.keyPriority));

  return {
    vehicleTypes: optionsFor(rows, base.vehicleTypes, (r) => r.vehicle_type, (r) => passes(r, 'type'), sortVehicleTypes),
    roadTypes: optionsFor(rows, base.roadTypes, (r) => r.road_type, (r) => passes(r, 'road'), sortRoadTypes),
    axles: optionsFor(rows, base.axles, (r) => r.axle_position, (r) => passes(r, 'axle'), sortVehicleAxles),
    keyPriorities: optionsFor(rows, base.keyPriorities, (r) => r.key_priority, (r) => passes(r, 'priority'), sortPriorities),
  };
};

// ---- matching -------------------------------------------------------------

export interface MatchKeys {
  tireIds: Set<string>;
  // product codes, lower-cased (tires.name join is case-insensitive)
  codes: Set<string>;
}

export interface MatchResult {
  active: boolean;
  keys: MatchKeys;
  fallbackUsed: boolean;
  message: string | null;
}

const emptyKeys = (): MatchKeys => ({ tireIds: new Set(), codes: new Set() });

const keysFrom = (rows: { tire_id: string | null; product_code: string | null }[]): MatchKeys => ({
  tireIds: new Set(rows.map((r) => clean(r.tire_id)).filter(Boolean)),
  codes: new Set(rows.map((r) => clean(r.product_code).toLowerCase()).filter(Boolean)),
});

const sizeRowMatches = (
  row: SizeRow,
  c: SizeCriteria,
  relax: { axle?: boolean; aspect?: boolean } = {},
): boolean => {
  if (clean(c.width) && clean(row.width) !== clean(c.width)) return false; // never relax width
  if (clean(c.rim) && clean(row.rim) !== clean(c.rim)) return false; // never relax rim
  if (!relax.aspect && !aspectSatisfied(row, c)) return false;
  if (!relax.axle && clean(c.axle) && !axleAllowed(c.axle, row.axle_position)) return false;
  return true;
};

const closestByRim = (rows: SizeRow[], c: SizeCriteria): SizeRow[] => {
  const w = clean(c.width);
  if (!w) return [];
  const same = rows.filter((r) => clean(r.width) === w);
  const target = leadingNum(c.rim);
  const ranked = same
    .map((r) => ({ r, d: Number.isNaN(target) ? 0 : Math.abs((leadingNum(clean(r.rim)) || 0) - target) }))
    .sort((a, b) => a.d - b.d);
  const seen = new Set<string>();
  const out: SizeRow[] = [];
  for (const { r } of ranked) {
    const code = clean(r.product_code);
    if (!code || seen.has(code)) continue;
    seen.add(code);
    out.push(r);
    if (out.length >= 5) break;
  }
  return out;
};

export const hasSizeCriteria = (c: SizeCriteria): boolean =>
  Boolean(clean(c.width) || clean(c.aspect) || clean(c.rim) || clean(c.axle));

// By Size: exact → relax axle → also relax aspect → closest sizes (same width, nearest rim).
export const matchSize = (rows: SizeRow[], c: SizeCriteria): MatchResult => {
  if (!hasSizeCriteria(c)) return { active: false, keys: emptyKeys(), fallbackUsed: false, message: null };

  let matched = rows.filter((r) => sizeRowMatches(r, c));
  if (matched.length) return { active: true, keys: keysFrom(matched), fallbackUsed: false, message: null };

  if (clean(c.axle)) {
    matched = rows.filter((r) => sizeRowMatches(r, c, { axle: true }));
    if (matched.length)
      return {
        active: true,
        keys: keysFrom(matched),
        fallbackUsed: true,
        message: 'No exact match for that axle position — showing the closest results.',
      };
  }

  if (!isImperialWidth(c.width)) {
    matched = rows.filter((r) => sizeRowMatches(r, c, { axle: true, aspect: true }));
    if (matched.length)
      return {
        active: true,
        keys: keysFrom(matched),
        fallbackUsed: true,
        message: 'No exact match — showing the closest sizes.',
      };
  }

  const closest = closestByRim(rows, c);
  if (closest.length)
    return {
      active: true,
      keys: keysFrom(closest),
      fallbackUsed: true,
      message: 'No exact match — here are the closest sizes.',
    };

  return { active: true, keys: emptyKeys(), fallbackUsed: false, message: null };
};

const vehicleRowMatches = (
  row: VehicleRow,
  c: VehicleCriteria,
  relax: { axle?: boolean; priority?: boolean } = {},
): boolean => {
  if (clean(c.vehicleType) && clean(row.vehicle_type) !== clean(c.vehicleType)) return false;
  if (clean(c.roadType) && clean(row.road_type) !== clean(c.roadType)) return false;
  if (!relax.axle && clean(c.axle) && !axleAllowed(c.axle, row.axle_position)) return false;
  if (!relax.priority && clean(c.keyPriority) && clean(row.key_priority) !== clean(c.keyPriority)) return false;
  return true;
};

export const hasVehicleCriteria = (c: VehicleCriteria): boolean =>
  Boolean(clean(c.vehicleType) || clean(c.roadType) || clean(c.axle) || clean(c.keyPriority));

// By Vehicle: exact → relax axle → relax key priority.
export const matchVehicle = (rows: VehicleRow[], c: VehicleCriteria): MatchResult => {
  if (!hasVehicleCriteria(c)) return { active: false, keys: emptyKeys(), fallbackUsed: false, message: null };

  let matched = rows.filter((r) => vehicleRowMatches(r, c));
  if (matched.length) return { active: true, keys: keysFrom(matched), fallbackUsed: false, message: null };

  if (clean(c.axle)) {
    matched = rows.filter((r) => vehicleRowMatches(r, c, { axle: true }));
    if (matched.length)
      return {
        active: true,
        keys: keysFrom(matched),
        fallbackUsed: true,
        message: 'No exact match for that axle position — showing the closest results.',
      };
  }

  if (clean(c.keyPriority)) {
    matched = rows.filter((r) => vehicleRowMatches(r, c, { axle: true, priority: true }));
    if (matched.length)
      return {
        active: true,
        keys: keysFrom(matched),
        fallbackUsed: true,
        message: 'No exact match — showing the closest results.',
      };
  }

  return { active: true, keys: emptyKeys(), fallbackUsed: false, message: null };
};
