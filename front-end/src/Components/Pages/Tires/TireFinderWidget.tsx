import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LoaderCircle, Search } from 'lucide-react';
import { supabase } from '../../../admin/lib/supabase';

const IMPERIAL_WIDTHS = [
  '7.00',
  '7.50',
  '8',
  '8.25',
  '8.5',
  '9',
  '9.00',
  '9.5',
  '10',
  '10.00',
  '11',
  '11.00',
  '12',
  '12.00',
  '13',
  '31x10.5',
];

type FinderTab = 'by_size' | 'by_vehicle';

interface SizeRow {
  id: string;
  width: string | null;
  aspect_ratio: string | null;
  rim: string | null;
  axle_position: string | null;
  full_tire_size: string | null;
  product_code: string | null;
  pattern_position: string | null;
  tire_id: string | null;
}

interface VehicleRow {
  id: string;
  product_code: string | null;
  vehicle_type: string | null;
  road_type: string | null;
  axle_position: string | null;
  key_priority: string | null;
  key_benefit: string | null;
  tire_id: string | null;
}

interface DropdownOptionRow {
  id: string;
  field_name: string | null;
  value: string | null;
  display_order: number | null;
}

interface TireFinderResult {
  id: string;
  name: string;
  slug: string;
  card_image_url: string | null;
  short_description: string | null;
  badges: string[] | null;
  pattern_position: string | null;
  key_benefit: string | null;
}

interface SizeFilters {
  width: string;
  aspectRatio: string;
  rim: string;
  axle: string;
}

interface VehicleFilters {
  vehicleType: string;
  roadType: string;
  axle: string;
  keyPriority: string;
}

const emptySizeFilters = (): SizeFilters => ({ width: '', aspectRatio: '', rim: '', axle: '' });
const emptyVehicleFilters = (): VehicleFilters => ({ vehicleType: '', roadType: '', axle: '', keyPriority: '' });

const isImperialWidth = (width: string) => IMPERIAL_WIDTHS.includes(width);

const normalizeValue = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text || null;
};

const TireFinder = () => {
  const [activeTab, setActiveTab] = useState<FinderTab>('by_size');
  const [sizeFilters, setSizeFilters] = useState<SizeFilters>(emptySizeFilters());
  const [vehicleFilters, setVehicleFilters] = useState<VehicleFilters>(emptyVehicleFilters());
  const [dropdowns, setDropdowns] = useState<Record<string, string[]>>({});
  const [results, setResults] = useState<TireFinderResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const loadDropdowns = async () => {
      const { data, error } = await supabase
        .from('tire_finder_dropdown_options')
        .select('field_name, value, display_order')
        .eq('finder_tab', activeTab)
        .order('display_order', { ascending: true });

      if (error) {
        console.error(error);
        setDropdowns({});
        return;
      }

      const grouped: Record<string, string[]> = {};
      const rows = (data ?? []) as DropdownOptionRow[];
      for (const row of rows) {
        const fieldName = normalizeValue(row.field_name);
        const value = normalizeValue(row.value);
        if (!fieldName || !value) continue;
        if (!grouped[fieldName]) grouped[fieldName] = [];
        if (!grouped[fieldName].includes(value)) grouped[fieldName].push(value);
      }

      setDropdowns(grouped);
    };

    void loadDropdowns();
  }, [activeTab]);

  const sizeAspectDisabled = Boolean(sizeFilters.width && isImperialWidth(sizeFilters.width));

  const handleTabChange = (tab: FinderTab) => {
    setActiveTab(tab);
    setResults([]);
    setHasSearched(false);
    setFallbackUsed(false);
    setMessage('');
  };

  const handleSizeChange = (field: keyof SizeFilters, value: string) => {
    const next = { ...sizeFilters, [field]: value };
    if (field === 'width') {
      if (isImperialWidth(value)) {
        next.aspectRatio = '';
      }
    }
    if (field === 'aspectRatio' && isImperialWidth(sizeFilters.width)) {
      next.aspectRatio = '';
    }
    setSizeFilters(next);
    setResults([]);
    setHasSearched(false);
    setFallbackUsed(false);
    setMessage('');
  };

  const handleVehicleChange = (field: keyof VehicleFilters, value: string) => {
    setVehicleFilters({ ...vehicleFilters, [field]: value });
    setResults([]);
    setHasSearched(false);
    setFallbackUsed(false);
    setMessage('');
  };

  const buildSizeQuery = async () => {
    const { width, rim, aspectRatio, axle } = sizeFilters;
    if (!width || !rim) {
      setResults([]);
      setHasSearched(true);
      setFallbackUsed(false);
      setMessage('Please select both width and rim to find tires.');
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setFallbackUsed(false);
    setMessage('');
    setResults([]);

    const imperial = isImperialWidth(width);
    let query = supabase.from('tire_finder_by_size').select('product_code, pattern_position, axle_position');

    query = query.eq('width', width).eq('rim', rim);
    if (!imperial) {
      query = query.eq('aspect_ratio', aspectRatio || '');
    }

    const axleMatch = (axleValue: string | null) => {
      if (!axleValue) return null;
      switch (axleValue) {
        case 'All Axles':
          return null;
        case 'All-Position':
          return ['All-Position'];
        case 'Steer':
          return ['Steer', 'Steer/Trailer', 'All-Position'];
        case 'Trailer':
          return ['Trailer', 'Steer/Trailer', 'All-Position'];
        case 'Drive':
          return ['Drive', 'All-Position'];
        case 'Steer/Trailer':
          return ['Steer/Trailer', 'Steer', 'Trailer', 'All-Position'];
        default:
          return [axleValue];
      }
    };

    const allowedAxles = axleMatch(axle);
    const baseQuery = allowedAxles ? query.in('axle_position', allowedAxles) : query;

    const { data, error } = await baseQuery;
    if (error) {
      setLoading(false);
      setMessage('Unable to load tire results right now.');
      console.error(error);
      return;
    }

    const rows = (data ?? []) as SizeRow[];
    const uniqueProductCodes = Array.from(new Set(rows.map((row) => row.product_code).filter(Boolean) as string[]));

    if (!uniqueProductCodes.length && axle) {
      const relaxedQuery = supabase
        .from('tire_finder_by_size')
        .select('product_code, pattern_position, axle_position')
        .eq('width', width)
        .eq('rim', rim);
      const { data: relaxedData, error: relaxedError } = await relaxedQuery;
      if (!relaxedError) {
        const relaxedRows = (relaxedData ?? []) as SizeRow[];
        const relaxedCodes = Array.from(new Set(relaxedRows.map((row) => row.product_code).filter(Boolean) as string[]));
        if (relaxedCodes.length) {
          setFallbackUsed(true);
          setMessage('No exact match — showing closest results');
          await loadByProductCodes(relaxedCodes, rows[0]?.pattern_position ?? null);
          setLoading(false);
          return;
        }
      }
    }

    if (!uniqueProductCodes.length && !imperial && aspectRatio) {
      const relaxedQuery = supabase
        .from('tire_finder_by_size')
        .select('product_code, pattern_position, axle_position')
        .eq('width', width)
        .eq('rim', rim);
      const { data: relaxedData, error: relaxedError } = await relaxedQuery;
      if (!relaxedError) {
        const relaxedRows = (relaxedData ?? []) as SizeRow[];
        const relaxedCodes = Array.from(new Set(relaxedRows.map((row) => row.product_code).filter(Boolean) as string[]));
        if (relaxedCodes.length) {
          setFallbackUsed(true);
          setMessage('No exact match — showing closest results');
          await loadByProductCodes(relaxedCodes, rows[0]?.pattern_position ?? null);
          setLoading(false);
          return;
        }
      }
    }

    await loadByProductCodes(uniqueProductCodes, rows[0]?.pattern_position ?? null);
    setLoading(false);
  };

  const loadByProductCodes = async (productCodes: string[], fallbackPattern: string | null) => {
    if (!productCodes.length) {
      setResults([]);
      setMessage('No tires found for this combination. Try adjusting your filters.');
      return;
    }

    const { data, error } = await supabase
      .from('tires')
      .select('id, name, slug, card_image_url, short_description, badges')
      .in('name', productCodes)
      .eq('is_published', true);

    if (error) {
      console.error(error);
      setResults([]);
      setMessage('Unable to load tire results right now.');
      return;
    }

    const rows = (data ?? []) as Array<{
      id: string;
      name: string;
      slug: string;
      card_image_url: string | null;
      short_description: string | null;
      badges: string[] | null;
    }>;

    const mapped = rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      card_image_url: row.card_image_url,
      short_description: row.short_description,
      badges: row.badges,
      pattern_position: fallbackPattern,
      key_benefit: null,
    }));

    setResults(mapped);
    if (!mapped.length) {
      setMessage('No tires found for this combination. Try adjusting your filters.');
    }
  };

  const buildVehicleQuery = async () => {
    const { vehicleType, roadType, axle, keyPriority } = vehicleFilters;
    if (!vehicleType || !roadType) {
      setResults([]);
      setHasSearched(true);
      setFallbackUsed(false);
      setMessage('Please select both vehicle type and road type to find tires.');
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setFallbackUsed(false);
    setMessage('');
    setResults([]);

    let query = supabase.from('tire_finder_by_vehicle').select('product_code, key_benefit, key_priority, axle_position');
    query = query.eq('vehicle_type', vehicleType).eq('road_type', roadType).eq('axle_position', axle || '');
    if (keyPriority && keyPriority !== 'any') {
      query = query.eq('key_priority', keyPriority);
    }

    const { data, error } = await query;
    if (error) {
      setLoading(false);
      setMessage('Unable to load tire results right now.');
      console.error(error);
      return;
    }

    const rows = (data ?? []) as VehicleRow[];
    const productCodes = Array.from(new Set(rows.map((row) => row.product_code).filter(Boolean) as string[]));

    if (!productCodes.length && keyPriority && keyPriority !== 'any') {
      const relaxedQuery = supabase
        .from('tire_finder_by_vehicle')
        .select('product_code, key_benefit, key_priority, axle_position')
        .eq('vehicle_type', vehicleType)
        .eq('road_type', roadType)
        .eq('axle_position', axle || '');
      const { data: relaxedData, error: relaxedError } = await relaxedQuery;
      if (!relaxedError) {
        const relaxedRows = (relaxedData ?? []) as VehicleRow[];
        const relaxedCodes = Array.from(new Set(relaxedRows.map((row) => row.product_code).filter(Boolean) as string[]));
        if (relaxedCodes.length) {
          setFallbackUsed(true);
          setMessage('No exact match — showing closest results');
          await loadVehicleResults(relaxedCodes, relaxedRows);
          setLoading(false);
          return;
        }
      }
    }

    if (!productCodes.length && axle) {
      const relaxedQuery = supabase
        .from('tire_finder_by_vehicle')
        .select('product_code, key_benefit, key_priority, axle_position')
        .eq('vehicle_type', vehicleType)
        .eq('road_type', roadType);
      const { data: relaxedData, error: relaxedError } = await relaxedQuery;
      if (!relaxedError) {
        const relaxedRows = (relaxedData ?? []) as VehicleRow[];
        const relaxedCodes = Array.from(new Set(relaxedRows.map((row) => row.product_code).filter(Boolean) as string[]));
        if (relaxedCodes.length) {
          setFallbackUsed(true);
          setMessage('No exact match — showing closest results');
          await loadVehicleResults(relaxedCodes, relaxedRows);
          setLoading(false);
          return;
        }
      }
    }

    await loadVehicleResults(productCodes, rows);
    setLoading(false);
  };

  const loadVehicleResults = async (productCodes: string[], rows: VehicleRow[]) => {
    if (!productCodes.length) {
      setResults([]);
      setMessage('No tires found for this combination. Try adjusting your filters.');
      return;
    }

    const { data, error } = await supabase
      .from('tires')
      .select('id, name, slug, card_image_url, short_description, badges')
      .in('name', productCodes)
      .eq('is_published', true);

    if (error) {
      console.error(error);
      setResults([]);
      setMessage('Unable to load tire results right now.');
      return;
    }

    const tireRows = (data ?? []) as Array<{
      id: string;
      name: string;
      slug: string;
      card_image_url: string | null;
      short_description: string | null;
      badges: string[] | null;
    }>;

    const byProductCode = new Map(rows.map((row) => [row.product_code, row]));

    const mapped = tireRows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      card_image_url: row.card_image_url,
      short_description: row.short_description,
      badges: row.badges,
      pattern_position: null,
      key_benefit: byProductCode.get(row.name)?.key_benefit ?? null,
    }));

    setResults(mapped);
    if (!mapped.length) {
      setMessage('No tires found for this combination. Try adjusting your filters.');
    }
  };

  const dropdown = (label: string, fieldName: string, value: string, options: string[], onChange: (value: string) => void, disabled = false) => (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-[#1148c6] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        >
          <option value="">{fieldName === 'key_priority' ? 'Any Priority' : `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>
    </label>
  );

  const fieldOptions = useMemo(() => ({
    width: dropdowns.width ?? [],
    aspectRatio: dropdowns.aspect_ratio ?? [],
    rim: dropdowns.rim ?? [],
    axle: dropdowns.axle_position ?? [],
    vehicleType: dropdowns.vehicle_type ?? [],
    roadType: dropdowns.road_type ?? [],
    keyPriority: dropdowns.key_priority ?? [],
  }), [dropdowns]);

  return (
    <section className="w-full bg-[#f7f7f9] py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#111111]">Tire Finder</h2>
              <p className="mt-1 text-sm text-gray-500">Find matching tires from the Supabase tire finder tables.</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleTabChange('by_size')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === 'by_size' ? 'bg-[#111111] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                By Size
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('by_vehicle')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === 'by_vehicle' ? 'bg-[#111111] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                By Vehicle
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {activeTab === 'by_size' ? (
              <>
                {dropdown('Width', 'width', sizeFilters.width, fieldOptions.width, (value) => handleSizeChange('width', value))}
                {dropdown('Aspect Ratio', 'aspect_ratio', sizeFilters.aspectRatio, fieldOptions.aspectRatio, (value) => handleSizeChange('aspectRatio', value), sizeAspectDisabled)}
                {dropdown('Rim', 'rim', sizeFilters.rim, fieldOptions.rim, (value) => handleSizeChange('rim', value))}
                {dropdown('Axle Position', 'axle_position', sizeFilters.axle, fieldOptions.axle, (value) => handleSizeChange('axle', value))}
              </>
            ) : (
              <>
                {dropdown('Vehicle Type', 'vehicle_type', vehicleFilters.vehicleType, fieldOptions.vehicleType, (value) => handleVehicleChange('vehicleType', value))}
                {dropdown('Road Type', 'road_type', vehicleFilters.roadType, fieldOptions.roadType, (value) => handleVehicleChange('roadType', value))}
                {dropdown('Axle Position', 'axle_position', vehicleFilters.axle, fieldOptions.axle, (value) => handleVehicleChange('axle', value))}
                {dropdown('Key Priority', 'key_priority', vehicleFilters.keyPriority, fieldOptions.keyPriority, (value) => handleVehicleChange('keyPriority', value))}
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
            <button
              type="button"
              onClick={activeTab === 'by_size' ? buildSizeQuery : buildVehicleQuery}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1148c6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d39a0]"
            >
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Find Tires
            </button>
          </div>

          <div className="mt-8">
            {!hasSearched ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-[#fafafa] px-6 py-16 text-center text-sm text-gray-500">
                Select your tire size or vehicle type above to find matching tires.
              </div>
            ) : loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-72 animate-pulse rounded-2xl border border-gray-200 bg-gray-100" />
                ))}
              </div>
            ) : results.length > 0 ? (
              <>
                {fallbackUsed ? <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">{message}</div> : null}
                <div className="mb-4 text-sm font-medium text-gray-600">{results.length} tire(s) found</div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((tire) => (
                    <div key={tire.id} className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="flex-1">
                        {tire.card_image_url ? (
                          <img src={tire.card_image_url} alt={tire.name} className="mx-auto h-36 w-full max-w-[180px] object-contain" />
                        ) : (
                          <div className="flex h-36 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-400">
                            {tire.name}
                          </div>
                        )}
                        <h3 className="mt-4 text-lg font-semibold text-[#111111]">{tire.name}</h3>
                        <p className="mt-2 text-sm text-gray-500">{tire.pattern_position || tire.key_benefit || tire.short_description || 'Matching tire'}</p>
                        {tire.badges && tire.badges.length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {tire.badges.map((badge) => (
                              <span key={badge} className="rounded-full bg-[#e8f1d7] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#4b6a2f]">
                                {badge}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <Link
                        to={`/tires/${tire.slug}`}
                        className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#1148c6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d39a0]"
                      >
                        View More Specs & Sizes
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center text-sm text-gray-500">
                {message || 'No tires found for this combination. Try adjusting your filters.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TireFinder;
