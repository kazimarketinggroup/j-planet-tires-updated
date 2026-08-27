// Shared Tire Finder wiring: loads the finder mapping tables, computes cascading
// dropdown options, tracks the By-Size / By-Vehicle selection, and resolves the
// match to a set of tyre keys. Used by the main catalogue and the per-category
// landing pages so both behave identically.
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
  fetchFinderRows,
  matchSize,
  matchVehicle,
  type FinderBase,
  type FinderRows,
  type MatchResult,
} from './tireFinderData';
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

export interface TireFinderState {
  mode: FinderMode;
  options: FinderOptions;
  size: SizeCriteria;
  vehicle: VehicleCriteria;
  match: MatchResult;
  setMode: (mode: FinderMode) => void;
  setSize: (criteria: SizeCriteria) => void;
  setVehicle: (criteria: VehicleCriteria) => void;
  reset: () => void;
}

export const useTireFinder = (): TireFinderState => {
  const [finderRows, setFinderRows] = useState<FinderRows>({ sizeRows: [], vehicleRows: [] });
  const [finderBase, setFinderBase] = useState<FinderBase>(EMPTY_BASE);
  const [mode, setMode] = useState<FinderMode>('size');
  const [size, setSize] = useState(emptySizeCriteria());
  const [vehicle, setVehicle] = useState(emptyVehicleCriteria());

  useEffect(() => {
    swrFetch('finderBase', fetchDropdownBase, (data) => setFinderBase(data)).catch((err) =>
      console.error(err),
    );
    swrFetch('finderRows', fetchFinderRows, (data) => setFinderRows(data)).catch((err) =>
      console.error(err),
    );
  }, []);

  // Cascading options: each dropdown only offers values still valid given the
  // other fields already selected.
  const options: FinderOptions = useMemo(() => {
    if (mode === 'size') {
      const o = deriveSizeOptions(finderRows.sizeRows, size, finderBase.size);
      return { ...EMPTY_FINDER_OPTIONS, widths: o.widths, aspects: o.aspects, rims: o.rims, axles: o.axles };
    }
    const o = deriveVehicleOptions(finderRows.vehicleRows, vehicle, finderBase.vehicle);
    return {
      ...EMPTY_FINDER_OPTIONS,
      vehicleTypes: o.vehicleTypes,
      roadTypes: o.roadTypes,
      axles: o.axles,
      keyPriorities: o.keyPriorities,
    };
  }, [mode, finderRows, finderBase, size, vehicle]);

  const match = useMemo(
    () => (mode === 'size' ? matchSize(finderRows.sizeRows, size) : matchVehicle(finderRows.vehicleRows, vehicle)),
    [mode, finderRows, size, vehicle],
  );

  // Drop selections that cascading has just invalidated.
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

  return { mode, options, size, vehicle, match, setMode, setSize, setVehicle, reset };
};

// Filter a list of tyres to those matching the finder selection. When no
// selection is active, the list is returned unchanged. Because the input list is
// already the page's category (segment) scope, results can never leak in tyres
// from another category.
export const applyFinderMatch = <T extends { id: string; name: string }>(
  tires: T[],
  match: MatchResult,
): T[] => {
  if (!match.active) return tires;
  return tires.filter(
    (t) => match.keys.tireIds.has(t.id) || match.keys.codes.has(t.name.toLowerCase()),
  );
};
