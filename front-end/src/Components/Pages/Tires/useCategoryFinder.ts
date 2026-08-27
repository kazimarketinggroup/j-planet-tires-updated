// Category-locked Tire Finder state for one landing page (PCR or TBR).
//
// STEP 3 isolation: intentionally a separate code path from useTireFinder (the
// All Tires finder). It duplicates the small amount of cascade/prune wiring on
// purpose so the two can evolve independently; the heavy matching/cascading logic
// lives in the shared, category-agnostic helpers in tireFinderData.ts.
//
// Each instance owns its own state, so the PCR page, the TBR page and the main
// catalogue never share filters or results.
import { useEffect, useMemo, useState } from 'react';
import {
  emptySizeCriteria,
  emptyVehicleCriteria,
  type FinderMode,
  type FinderOptions,
  type SizeCriteria,
  type VehicleCriteria,
} from './tireFinder';
import {
  deriveSizeOptions,
  deriveVehicleOptions,
  fetchDropdownBase,
  matchSize,
  matchVehicle,
  type FinderBase,
  type FinderRows,
  type MatchResult,
} from './tireFinderData';
import { fetchCategoryFinderRows, type CategoryScope } from './categoryFinderData';
import { swrFetch } from '../../../lib/swrCache';

const EMPTY_BASE: FinderBase = {
  size: { widths: [], aspects: [], rims: [], axles: [] },
  vehicle: { vehicleTypes: [], roadTypes: [], axles: [], keyPriorities: [] },
};

const EMPTY_FINDER_OPTIONS: FinderOptions = {
  widths: [],
  aspects: [],
  rims: [],
  axles: [],
  vehicleTypes: [],
  roadTypes: [],
  keyPriorities: [],
  plyRatings: [],
  loadRanges: [],
  hasMs: false,
  hasPmsf: false,
  hasRegroovable: false,
};

export interface CategoryFinderState {
  mode: FinderMode;
  options: FinderOptions;
  size: SizeCriteria;
  vehicle: VehicleCriteria;
  match: MatchResult;
  ready: boolean;
  setMode: (mode: FinderMode) => void;
  setSize: (criteria: SizeCriteria) => void;
  setVehicle: (criteria: VehicleCriteria) => void;
  reset: () => void;
}

export const useCategoryFinder = (scope: CategoryScope): CategoryFinderState => {
  const cacheKey = `finderRows:${scope.segments.join('+')}`;
  const [rows, setRows] = useState<FinderRows>({ sizeRows: [], vehicleRows: [] });
  const [base, setBase] = useState<FinderBase>(EMPTY_BASE);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<FinderMode>('size');
  const [size, setSize] = useState(emptySizeCriteria());
  const [vehicle, setVehicle] = useState(emptyVehicleCriteria());

  // Mapping rows are fetched already scoped to this category (server-side).
  useEffect(() => {
    let active = true;
    setReady(false);
    swrFetch(cacheKey, () => fetchCategoryFinderRows(scope), (data) => {
      if (!active) return;
      setRows(data);
      setReady(true);
    }).catch((err) => {
      console.error(err);
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
    // scope is a literal defined per page; key on its segments.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  // Curated dropdown values are category-agnostic; cascading below narrows them
  // to what this category actually offers.
  useEffect(() => {
    swrFetch('finderBase', fetchDropdownBase, (data) => setBase(data)).catch((err) => console.error(err));
  }, []);

  // Cascading options, computed from THIS category's rows only — so a width or
  // rim that no tyre in this category comes in is never offered.
  const options: FinderOptions = useMemo(() => {
    if (mode === 'size') {
      const o = deriveSizeOptions(rows.sizeRows, size, base.size);
      return { ...EMPTY_FINDER_OPTIONS, widths: o.widths, aspects: o.aspects, rims: o.rims, axles: o.axles };
    }
    const o = deriveVehicleOptions(rows.vehicleRows, vehicle, base.vehicle);
    return {
      ...EMPTY_FINDER_OPTIONS,
      vehicleTypes: o.vehicleTypes,
      roadTypes: o.roadTypes,
      axles: o.axles,
      keyPriorities: o.keyPriorities,
    };
  }, [mode, rows, base, size, vehicle]);

  // Matching (incl. the relax-axle → relax-aspect → closest fallback) runs over
  // this category's rows only, so a fallback can never surface another category.
  const match = useMemo(
    () => (mode === 'size' ? matchSize(rows.sizeRows, size) : matchVehicle(rows.vehicleRows, vehicle)),
    [mode, rows, size, vehicle],
  );

  // Drop selections invalidated by cascading.
  useEffect(() => {
    if (mode !== 'size') return;
    setSize((prev) => {
      const next = { ...prev };
      if (next.aspect && !options.aspects.includes(next.aspect)) next.aspect = '';
      if (next.rim && !options.rims.includes(next.rim)) next.rim = '';
      if (next.axle && !options.axles.includes(next.axle)) next.axle = '';
      return next.aspect === prev.aspect && next.rim === prev.rim && next.axle === prev.axle ? prev : next;
    });
  }, [mode, options]);

  useEffect(() => {
    if (mode !== 'vehicle') return;
    setVehicle((prev) => {
      const next = { ...prev };
      if (next.roadType && !options.roadTypes.includes(next.roadType)) next.roadType = '';
      if (next.axle && !options.axles.includes(next.axle)) next.axle = '';
      if (next.keyPriority && !options.keyPriorities.includes(next.keyPriority)) next.keyPriority = '';
      return next.roadType === prev.roadType && next.axle === prev.axle && next.keyPriority === prev.keyPriority
        ? prev
        : next;
    });
  }, [mode, options]);

  const reset = () => {
    setSize(emptySizeCriteria());
    setVehicle(emptyVehicleCriteria());
  };

  return { mode, options, size, vehicle, match, ready, setMode, setSize, setVehicle, reset };
};
