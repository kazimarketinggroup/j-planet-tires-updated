import { useEffect, useState } from 'react';
import { ChevronDown, LoaderCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../../admin/lib/supabase';
import FadeIn from '../../Shared/FadeIn';
import type { CatalogueTire } from './publicApi';
import TireCard from './TireCard';

type FinderTab = 'size' | 'vehicle';

interface SizeCriteria {
  width: string;
  aspectRatio: string;
  rim: string;
  axle: string;
}

interface VehicleCriteria {
  vehicleType: string;
  roadType: string;
  axle: string;
  keyPriority: string;
}

interface DropdownOptionRow {
  field_name: string | null;
  option_value: string | null;
  option_label: string | null;
  display_order: number | null;
}

type DropdownOptionsMap = Record<string, string[]>;

interface SearchResultState {
  tires: CatalogueTire[];
  message: string | null;
  fallbackUsed: boolean;
}

const emptySizeCriteria = (): SizeCriteria => ({
  width: '',
  aspectRatio: '',
  rim: '',
  axle: '',
});

const emptyVehicleCriteria = (): VehicleCriteria => ({
  vehicleType: '',
  roadType: '',
  axle: '',
  keyPriority: '',
});

const normalizeOptionValue = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text || null;
};

const matchesAxle = (selectedAxle: string, storedAxle: string | null | undefined): boolean => {
  if (!selectedAxle) return true;
  if (!storedAxle) return false;
  const normalizedStored = storedAxle.trim();
  const normalizedSelected = selectedAxle.trim();
  if (normalizedStored === normalizedSelected) return true;
  if (normalizedStored === 'All-Position') return true;
  if (normalizedSelected === 'Steer' && /steer/i.test(normalizedStored)) return true;
  if (normalizedSelected === 'Trailer' && /trailer/i.test(normalizedStored)) return true;
  if (normalizedSelected === 'Drive' && /drive/i.test(normalizedStored)) return true;
  return false;
};

const buildTireFromRow = (row: Record<string, unknown>, note: string | null): CatalogueTire => {
  const benefits = Array.isArray(row.benefits) ? (row.benefits as string[]) : [];
  const shortDescription = note || (typeof row.short_description === 'string' ? row.short_description : null);
  const cardImage = typeof row.card_image_url === 'string' ? row.card_image_url : null;

  return {
    id: String(row.id ?? ''),
    name: String(row.name ?? ''),
    slug: String(row.slug ?? ''),
    card_image_url: cardImage,
    short_description: shortDescription,
    benefits: benefits.length ? benefits : note ? [note] : [],
    display_order: typeof row.display_order === 'number' ? row.display_order : null,
    category: row.category as CatalogueTire['category'],
    sizes: Array.isArray(row.sizes) ? (row.sizes as CatalogueTire['sizes']) : [],
    positions: Array.isArray(row.positions) ? (row.positions as CatalogueTire['positions']) : [],
  };
};

const fetchMatchingTires = async (
  tab: FinderTab,
  sizeCriteria: SizeCriteria,
  vehicleCriteria: VehicleCriteria,
): Promise<SearchResultState> => {
  if (tab === 'size') {
    let baseQuery = supabase.from('tire_finder_by_size').select('product_code, pattern_position, axle_position');
    if (sizeCriteria.width) {
      baseQuery = baseQuery.eq('width', sizeCriteria.width);
    }
    if (sizeCriteria.aspectRatio) {
      baseQuery = baseQuery.eq('aspect_ratio', sizeCriteria.aspectRatio);
    }
    if (sizeCriteria.rim) {
      baseQuery = baseQuery.eq('rim', sizeCriteria.rim);
    }

    const { data: sizeRows, error: sizeError } = await baseQuery;
    if (sizeError) throw sizeError;

    const rows = (sizeRows ?? []) as Array<{
      product_code: string | null;
      pattern_position: string | null;
      axle_position: string | null;
    }>;
    const matchedRows = rows.filter((row) => {
      if (!sizeCriteria.axle) return true;
      return matchesAxle(sizeCriteria.axle, row.axle_position);
    });

    const uniqueRows = Array.from(
      new Map(
        matchedRows
          .filter((row) => row.product_code)
          .map((row) => [String(row.product_code), row.pattern_position]),
      ).entries(),
    );

    if (!uniqueRows.length && sizeCriteria.axle) {
      let relaxedQuery = supabase.from('tire_finder_by_size').select('product_code, pattern_position, axle_position');
      if (sizeCriteria.width) {
        relaxedQuery = relaxedQuery.eq('width', sizeCriteria.width);
      }
      if (sizeCriteria.aspectRatio) {
        relaxedQuery = relaxedQuery.eq('aspect_ratio', sizeCriteria.aspectRatio);
      }
      if (sizeCriteria.rim) {
        relaxedQuery = relaxedQuery.eq('rim', sizeCriteria.rim);
      }
      const { data: relaxedRows, error: relaxedError } = await relaxedQuery;
      if (relaxedError) throw relaxedError;
      const relaxedData = (relaxedRows ?? []) as Array<{ product_code: string | null; pattern_position: string | null }>;
      const relaxedUniqueRows = Array.from(
        new Map(
          relaxedData
            .filter((row) => row.product_code)
            .map((row) => [String(row.product_code), row.pattern_position]),
        ).entries(),
      );
      if (!relaxedUniqueRows.length) {
        return { tires: [], message: 'No exact match found', fallbackUsed: false };
      }
      const productCodes = relaxedUniqueRows.map(([code]) => code);
      const { data: tireData, error: tireError } = await supabase
        .from('tires')
        .select(
          'id,name,slug,card_image_url,short_description,benefits,display_order,category:tire_categories(id,name,segment),sizes:tire_sizes(*),positions:tire_recommended_positions(vehicle_type,position)',
        )
        .in('name', productCodes)
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      if (tireError) throw tireError;
      const tires = ((tireData ?? []) as Record<string, unknown>[]).map((row) =>
        buildTireFromRow(row, relaxedUniqueRows.find(([code]) => code === String(row.name))?.[1] ?? null),
      );
      return { tires, message: 'No exact match for selected axle position — showing closest results', fallbackUsed: true };
    }

    if (!uniqueRows.length) {
      return { tires: [], message: 'No exact match found', fallbackUsed: false };
    }

    const productCodes = uniqueRows.map(([code]) => code);
    const { data: tireData, error: tireError } = await supabase
      .from('tires')
      .select(
        'id,name,slug,card_image_url,short_description,benefits,display_order,category:tire_categories(id,name,segment),sizes:tire_sizes(*),positions:tire_recommended_positions(vehicle_type,position)',
      )
      .in('name', productCodes)
      .eq('is_published', true)
      .order('display_order', { ascending: true });
    if (tireError) throw tireError;
    const tires = ((tireData ?? []) as Record<string, unknown>[]).map((row) =>
      buildTireFromRow(row, uniqueRows.find(([code]) => code === String(row.name))?.[1] ?? null),
    );
    return { tires, message: null, fallbackUsed: false };
  }

  let baseQuery = supabase.from('tire_finder_by_vehicle').select('product_code');
  if (vehicleCriteria.vehicleType) {
    baseQuery = baseQuery.eq('vehicle_type', vehicleCriteria.vehicleType);
  }
  if (vehicleCriteria.roadType) {
    baseQuery = baseQuery.eq('road_type', vehicleCriteria.roadType);
  }
  if (vehicleCriteria.axle) {
    baseQuery = baseQuery.eq('axle_position', vehicleCriteria.axle);
  }
  if (vehicleCriteria.keyPriority) {
    baseQuery = baseQuery.eq('key_priority', vehicleCriteria.keyPriority);
  }

  const { data: vehicleRows, error: vehicleError } = await baseQuery;
  if (vehicleError) throw vehicleError;

  const rows = (vehicleRows ?? []) as Array<{ product_code: string | null }>;
  const productCodes = Array.from(new Set(rows.map((row) => row.product_code).filter(Boolean) as string[]));

  if (!productCodes.length && vehicleCriteria.axle) {
    let relaxedQuery = supabase.from('tire_finder_by_vehicle').select('product_code');
    if (vehicleCriteria.vehicleType) {
      relaxedQuery = relaxedQuery.eq('vehicle_type', vehicleCriteria.vehicleType);
    }
    if (vehicleCriteria.roadType) {
      relaxedQuery = relaxedQuery.eq('road_type', vehicleCriteria.roadType);
    }
    if (vehicleCriteria.keyPriority) {
      relaxedQuery = relaxedQuery.eq('key_priority', vehicleCriteria.keyPriority);
    }
    const { data: relaxedRows, error: relaxedError } = await relaxedQuery;
    if (relaxedError) throw relaxedError;
    const relaxedProductCodes = Array.from(
      new Set((relaxedRows ?? []).map((row: { product_code: string | null }) => row.product_code).filter(Boolean) as string[]),
    );
    if (!relaxedProductCodes.length) {
      return { tires: [], message: 'No exact match found', fallbackUsed: false };
    }
    const { data: tireData, error: tireError } = await supabase
      .from('tires')
      .select(
        'id,name,slug,card_image_url,short_description,benefits,display_order,category:tire_categories(id,name,segment),sizes:tire_sizes(*),positions:tire_recommended_positions(vehicle_type,position)',
      )
      .in('name', relaxedProductCodes)
      .eq('is_published', true)
      .order('display_order', { ascending: true });
    if (tireError) throw tireError;
    const tires = ((tireData ?? []) as Record<string, unknown>[]).map((row) => buildTireFromRow(row, null));
    return { tires, message: 'No exact match for selected axle position — showing closest results', fallbackUsed: true };
  }

  if (!productCodes.length) {
    return { tires: [], message: 'No exact match found', fallbackUsed: false };
  }

  const { data: tireData, error: tireError } = await supabase
    .from('tires')
    .select(
      'id,name,slug,card_image_url,short_description,benefits,display_order,category:tire_categories(id,name,segment),sizes:tire_sizes(*),positions:tire_recommended_positions(vehicle_type,position)',
    )
    .in('name', productCodes)
    .eq('is_published', true)
    .order('display_order', { ascending: true });
  if (tireError) throw tireError;
  const tires = ((tireData ?? []) as Record<string, unknown>[]).map((row) => buildTireFromRow(row, null));
  return { tires, message: null, fallbackUsed: false };
};

const TireFinderPanel = () => {
  const [tab, setTab] = useState<FinderTab>('size');
  const [sizeCriteria, setSizeCriteria] = useState<SizeCriteria>(emptySizeCriteria());
  const [vehicleCriteria, setVehicleCriteria] = useState<VehicleCriteria>(emptyVehicleCriteria());
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptionsMap>({});
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<CatalogueTire[] | null>(null);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      setIsLoadingOptions(true);
      try {
        const { data, error } = await supabase
          .from('tire_finder_dropdown_options')
          .select('field_name, option_value, option_label, display_order')
          .eq('finder_tab', tab)
          .order('display_order', { ascending: true });
        if (error) throw error;

        const grouped = (data ?? []).reduce<DropdownOptionsMap>((acc, row: DropdownOptionRow) => {
          const fieldName = normalizeOptionValue(row.field_name);
          const optionValue = normalizeOptionValue(row.option_value ?? row.option_label);
          if (!fieldName || !optionValue) return acc;
          if (!acc[fieldName]) acc[fieldName] = [];
          if (!acc[fieldName].includes(optionValue)) acc[fieldName].push(optionValue);
          return acc;
        }, {});

        setDropdownOptions(grouped);
      } catch (error) {
        console.error(error);
        setDropdownOptions({});
        toast.error('Could not load finder dropdown values.');
      } finally {
        setIsLoadingOptions(false);
      }
    };

    void loadOptions();
  }, [tab]);

  const handleFind = async () => {
    setIsSearching(true);
    setHasSearched(true);
    setSearchResults(null);
    setSearchMessage(null);
    try {
      const result = await fetchMatchingTires(tab, sizeCriteria, vehicleCriteria);
      setSearchResults(result.tires);
      setSearchMessage(result.message);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setSearchMessage('We could not load matching tires right now.');
      toast.error('Finder request failed.');
    } finally {
      setIsSearching(false);
    }
  };

  const resetFilters = () => {
    setSizeCriteria(emptySizeCriteria());
    setVehicleCriteria(emptyVehicleCriteria());
    setSearchResults(null);
    setSearchMessage(null);
    setHasSearched(false);
  };

  const renderDropdown = (label: string, fieldName: string, value: string, options: string[], onChange: (value: string) => void) => {
    const placeholderLabel = fieldName === 'key_priority' ? 'Any' : `Any ${label}`;

    return (
      <div className="relative">
        <select
          aria-label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={isLoadingOptions}
          className="w-full appearance-none rounded-md border border-gray-200 bg-[#f7f7f9] px-3.5 py-2.5 pr-9 text-sm font-medium text-gray-700 focus:border-[#1148c6] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">{placeholderLabel}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" strokeWidth={2.5} />
      </div>
    );
  };

  return (
    <section className="w-full bg-[#f7f7f9] py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px]">
        <FadeIn>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-[#111111] md:text-xl">Tire Finder</h2>
                <p className="text-sm text-gray-500">
                  Search the tire catalogue directly from Supabase and browse matching models in seconds.
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setTab('size')}
                  className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                    tab === 'size' ? 'bg-[#111111] text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  By Size
                </button>
                <button
                  type="button"
                  onClick={() => setTab('vehicle')}
                  className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                    tab === 'vehicle' ? 'bg-[#111111] text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  By Vehicle
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto_auto]">
              {tab === 'size' ? (
                <>
                  {renderDropdown('Width', 'width', sizeCriteria.width, dropdownOptions.width ?? [], (value) => setSizeCriteria({ ...sizeCriteria, width: value }))}
                  {renderDropdown('Aspect Ratio', 'aspect_ratio', sizeCriteria.aspectRatio, dropdownOptions.aspect_ratio ?? [], (value) => setSizeCriteria({ ...sizeCriteria, aspectRatio: value }))}
                  {renderDropdown('Rim', 'rim', sizeCriteria.rim, dropdownOptions.rim ?? [], (value) => setSizeCriteria({ ...sizeCriteria, rim: value }))}
                  {renderDropdown('Axle Position', 'axle_position', sizeCriteria.axle, dropdownOptions.axle_position ?? [], (value) => setSizeCriteria({ ...sizeCriteria, axle: value }))}
                </>
              ) : (
                <>
                  {renderDropdown('Vehicle Type', 'vehicle_type', vehicleCriteria.vehicleType, dropdownOptions.vehicle_type ?? [], (value) => setVehicleCriteria({ ...vehicleCriteria, vehicleType: value }))}
                  {renderDropdown('Road Type', 'road_type', vehicleCriteria.roadType, dropdownOptions.road_type ?? [], (value) => setVehicleCriteria({ ...vehicleCriteria, roadType: value }))}
                  {renderDropdown('Axle Position', 'axle_position', vehicleCriteria.axle, dropdownOptions.axle_position ?? [], (value) => setVehicleCriteria({ ...vehicleCriteria, axle: value }))}
                  {renderDropdown('Key Priority', 'key_priority', vehicleCriteria.keyPriority, dropdownOptions.key_priority ?? [], (value) => setVehicleCriteria({ ...vehicleCriteria, keyPriority: value }))}
                </>
              )}

              <button
                type="button"
                onClick={handleFind}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1148c6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d39a0]"
              >
                {isSearching ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Find Tires
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="mt-8">
          {!hasSearched ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center text-sm text-gray-500 shadow-sm">
              Select filters above to find matching tires.
            </div>
          ) : isSearching ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-72 animate-pulse rounded-xl border border-gray-100 bg-gray-100" />
              ))}
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <>
              {searchMessage ? <p className="mb-4 text-sm text-amber-700">{searchMessage}</p> : null}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {searchResults.map((tire, index) => (
                  <TireCard key={tire.id || `${tire.name}-${index}`} tire={tire} delay={index * 0.04} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center text-sm text-gray-500 shadow-sm">
              {searchMessage || 'No exact match found'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TireFinderPanel;
