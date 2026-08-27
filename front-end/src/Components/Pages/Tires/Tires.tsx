import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import Head from '@/Components/Shared/Head';
import TireCatalogueGridSection from './TireCatalogueGridSection';
import TireFinderSection from './TireFinderSection';
import TiresHeroSection from './TiresHeroSection';
import CtaBannerSection from '../Home/CtaBannerSection';
import { fetchPublishedTires, type CatalogueTire } from './publicApi';
import {
  flattenSizes,
  sizeMatchesQuery,
  sizeRowMatchesCriteria,
  type CatalogueView,
  type SizeRow,
} from './sizeView';
import { hasSizeCriteria } from './tireFinderData';
import { swrFetch } from '../../../lib/swrCache';
import {
  applyFinder,
  deriveOptions,
  emptyFilters,
  emptySizeCriteria,
  emptyVehicleCriteria,
  type FinderMode,
  type FinderOptions,
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
} from './tireFinderData';
import type { Segment } from '../../../admin/types/database';

type RangeParam = 'pcr' | 'tbr' | 'otr';

const RANGE_SEGMENTS: Record<RangeParam, Segment[]> = {
  pcr: ['passenger', 'suv_ltr'],
  tbr: ['truck_bus'],
  otr: ['highway_otr'],
};

const isRangeParam = (value: string | null): value is RangeParam =>
  value === 'pcr' || value === 'tbr' || value === 'otr';

// All Sizes is the default view; only ?view=models switches to the model list.
const isModelsView = (value: string | null): boolean => value === 'models';

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

const Tires = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rangeParam = searchParams.get('range');
  const categoryParam = searchParams.get('category') ?? '';
  const activeRange = isRangeParam(rangeParam) ? rangeParam : null;
  const view: CatalogueView = isModelsView(searchParams.get('view')) ? 'models' : 'sizes';
  const [tires, setTires] = useState<CatalogueTire[] | null>(null);
  const [finderRows, setFinderRows] = useState<FinderRows>({ sizeRows: [], vehicleRows: [] });
  const [finderBase, setFinderBase] = useState<FinderBase>(EMPTY_BASE);
  const [mode, setMode] = useState<FinderMode>('size');
  const [size, setSize] = useState(emptySizeCriteria());
  const [vehicle, setVehicle] = useState(emptyVehicleCriteria());
  const [filters, setFilters] = useState(emptyFilters());
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string>(''); // '' = All Tires

  // Catalogue + finder data load through a session cache: repeat visits render
  // instantly from the cached copy while a background refresh keeps it current.
  useEffect(() => {
    swrFetch('tires', fetchPublishedTires, (data) => setTires(data)).catch(() => {
      toast.error('Could not load tires');
      setTires([]);
    });
  }, []);

  useEffect(() => {
    swrFetch('finderBase', fetchDropdownBase, (data) => setFinderBase(data)).catch((err) =>
      console.error(err),
    );
    swrFetch('finderRows', fetchFinderRows, (data) => setFinderRows(data)).catch((err) =>
      console.error(err),
    );
  }, []);

  // Options for the grid's Filter/Sort panel (ply/load range/markings) come from
  // the CMS catalogue data, unchanged.
  const cmsOptions = useMemo(() => deriveOptions(tires ?? []), [tires]);

  const rangeFilteredTires = useMemo(() => {
    if (!tires) return null;
    if (!activeRange) return tires;
    const segments = RANGE_SEGMENTS[activeRange];
    return tires.filter((t) => t.category?.segment && segments.includes(t.category.segment));
  }, [tires, activeRange]);

  // Category tabs with per-category counts (order follows first appearance in the
  // catalogue, which is already sorted by display_order). In "sizes" view the
  // count is the number of size variants in the category, not the model count.
  const categoryTabs = useMemo(() => {
    const list = rangeFilteredTires ?? [];
    const byId = new Map<string, { id: string; name: string; count: number }>();
    for (const t of list) {
      if (!t.category) continue;
      const increment = view === 'sizes' ? t.sizes.length : 1;
      const existing = byId.get(t.category.id);
      if (existing) existing.count += increment;
      else byId.set(t.category.id, { id: t.category.id, name: t.category.name, count: increment });
    }
    return Array.from(byId.values());
  }, [rangeFilteredTires, view]);

  // Total count shown on the "All Tires" tab — models or sizes depending on view.
  const totalCount = useMemo(() => {
    const list = rangeFilteredTires ?? [];
    return view === 'sizes' ? list.reduce((sum, t) => sum + t.sizes.length, 0) : list.length;
  }, [rangeFilteredTires, view]);

  // Cascading finder options: each dropdown only offers values still valid given
  // the other fields already selected.
  const finderOptions: FinderOptions = useMemo(() => {
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

  // Exact match from the mapping tables → key sets used to filter the catalogue grid.
  const finderMatch = useMemo(
    () => (mode === 'size' ? matchSize(finderRows.sizeRows, size) : matchVehicle(finderRows.vehicleRows, vehicle)),
    [mode, finderRows, size, vehicle],
  );

  // Surface the closest-match fallback note without changing the layout.
  useEffect(() => {
    if (finderMatch.active && finderMatch.fallbackUsed && finderMatch.message) {
      toast.message(finderMatch.message);
    }
  }, [finderMatch]);

  // Drop finder selections that cascading has just invalidated (e.g. a rim that no
  // longer exists for the newly-picked width). The option lists used here are
  // independent of the field being pruned, so this can't loop.
  useEffect(() => {
    if (mode !== 'size') return;
    setSize((prev) => {
      const next = { ...prev };
      if (next.aspect && !finderOptions.aspects.includes(next.aspect)) next.aspect = '';
      if (next.rim && !finderOptions.rims.includes(next.rim)) next.rim = '';
      if (next.axle && !finderOptions.axles.includes(next.axle)) next.axle = '';
      return next.aspect === prev.aspect && next.rim === prev.rim && next.axle === prev.axle ? prev : next;
    });
  }, [mode, finderOptions]);

  useEffect(() => {
    if (mode !== 'vehicle') return;
    setVehicle((prev) => {
      const next = { ...prev };
      if (next.roadType && !finderOptions.roadTypes.includes(next.roadType)) next.roadType = '';
      if (next.axle && !finderOptions.axles.includes(next.axle)) next.axle = '';
      if (next.keyPriority && !finderOptions.keyPriorities.includes(next.keyPriority)) next.keyPriority = '';
      return next.roadType === prev.roadType && next.axle === prev.axle && next.keyPriority === prev.keyPriority
        ? prev
        : next;
    });
  }, [mode, finderOptions]);

  // Tyres narrowed by finder match + category tab + Filter/Sort panel. The grid
  // search box (`query`) is applied only in models view here; in sizes view the
  // query targets size strings instead (see filteredSizes below).
  const categoryFilteredTires = useMemo(() => {
    if (!rangeFilteredTires) return null;
    let base = finderMatch.active
      ? rangeFilteredTires.filter(
          (t) => finderMatch.keys.tireIds.has(t.id) || finderMatch.keys.codes.has(t.name.toLowerCase()),
        )
      : rangeFilteredTires;
    if (categoryId) base = base.filter((t) => t.category?.id === categoryId);
    return base;
  }, [rangeFilteredTires, finderMatch, categoryId]);

  const filtered = useMemo(() => {
    if (!categoryFilteredTires) return null;
    // In sizes view the model-name search is not applied to the model list.
    const modelQuery = view === 'sizes' ? '' : query;
    return applyFinder(
      categoryFilteredTires,
      'size',
      emptySizeCriteria(),
      emptyVehicleCriteria(),
      filters,
      modelQuery,
    );
  }, [categoryFilteredTires, filters, query, view]);

  // Flattened, query-filtered size rows for the "All Sizes" view. When the By-Size
  // finder is active, also drop size rows that don't match the selected
  // width/aspect/rim — the finder narrows to whole tyres, but here we show one
  // card per size, so a matched tyre's other sizes must be excluded.
  const filteredSizes: SizeRow[] | null = useMemo(() => {
    if (!filtered) return null;
    // Skip the strict per-size filter on a fallback match ("closest results"),
    // where the exact size doesn't exist and relaxing would filter everything out.
    const applySizeCriteria =
      mode === 'size' && finderMatch.active && !finderMatch.fallbackUsed && hasSizeCriteria(size);
    return flattenSizes(filtered).filter(
      (row) =>
        sizeMatchesQuery(row, query) &&
        (!applySizeCriteria || sizeRowMatchesCriteria(row.size, size)),
    );
  }, [filtered, query, mode, finderMatch.active, finderMatch.fallbackUsed, size]);

  const clearAll = () => {
    setSize(emptySizeCriteria());
    setVehicle(emptyVehicleCriteria());
    setFilters(emptyFilters());
    setQuery('');
    setCategoryId('');
    setSearchParams({});
  };

  useEffect(() => {
    if (!categoryParam || !categoryTabs.some((cat) => cat.id === categoryParam)) {
      setCategoryId('');
      return;
    }
    setCategoryId(categoryParam);
  }, [categoryParam, categoryTabs]);

  const handleCategoryChange = (nextCategoryId: string) => {
    setCategoryId(nextCategoryId);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (nextCategoryId) next.set('category', nextCategoryId);
      else next.delete('category');
      return next;
    });
  };

  const handleViewChange = (nextView: CatalogueView) => {
    setQuery(''); // model search and size search are different — reset on switch
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      // Sizes is the default (clean URL); only Models needs an explicit param.
      if (nextView === 'models') next.set('view', 'models');
      else next.delete('view');
      return next;
    });
  };

  const scrollToCatalogue = () =>
    document.getElementById('tire-catalogue')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div>
      <Head
        title="Tires | J.Planet Tire PCR & TBR Catalogue"
        description="Browse J.Planet Tire's PCR and TBR tire catalogue for fleets, distributors, and trade partners across Europe, the Middle East, Africa, and Asia."
      />
      <TiresHeroSection />
      <TireFinderSection
        mode={mode}
        options={finderOptions}
        size={size}
        vehicle={vehicle}
        onMode={setMode}
        onSize={setSize}
        onVehicle={setVehicle}
        onFind={scrollToCatalogue}
        onClear={clearAll}
      />
      <TireCatalogueGridSection
        view={view}
        onViewChange={handleViewChange}
        tires={filtered}
        sizeRows={filteredSizes}
        totalCount={totalCount}
        options={cmsOptions}
        filters={filters}
        query={query}
        categoryTabs={categoryTabs}
        activeCategoryId={categoryId}
        onCategoryChange={handleCategoryChange}
        onFilters={setFilters}
        onQuery={setQuery}
        onClearAll={clearAll}
      />
      <CtaBannerSection />
    </div>
  );
};

export default Tires;
