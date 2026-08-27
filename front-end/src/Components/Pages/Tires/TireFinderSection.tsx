import { ChevronDown, RotateCcw, Search } from 'lucide-react';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type {
  FinderMode,
  FinderOptions,
  SizeCriteria,
  VehicleCriteria,
} from './tireFinder';

interface TireFinderSectionProps {
  mode: FinderMode;
  options: FinderOptions;
  size: SizeCriteria;
  vehicle: VehicleCriteria;
  onMode: (mode: FinderMode) => void;
  onSize: (criteria: SizeCriteria) => void;
  onVehicle: (criteria: VehicleCriteria) => void;
  onFind: () => void;
  onClear: () => void;
  // Optional heading override (e.g. "PCR Tire Finder" on a category page).
  title?: string;
  // When false, drop the negative top margin used to overlap the /tires hero.
  overlap?: boolean;
}

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown = ({ label, anyLabel, value, options, onChange }: DropdownProps & { anyLabel: string }) => (
  <div className="relative">
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={options.length === 0}
      className="w-full appearance-none rounded-md border border-gray-200 bg-[#f7f7f9] px-3.5 py-2.5 pr-9 text-sm font-medium text-gray-700 focus:border-[#1148c6] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
    >
      <option value="">{anyLabel} {label}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
      strokeWidth={2.5}
    />
  </div>
);

const TireFinderSection = ({
  mode,
  options,
  size,
  vehicle,
  onMode,
  onSize,
  onVehicle,
  onFind,
  onClear,
  title,
  overlap = true,
}: TireFinderSectionProps) => {
  const { t } = useLanguage();
  const toggleBtn = (m: FinderMode, text: string) => (
    <button
      type="button"
      onClick={() => onMode(m)}
      className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
        mode === m ? 'bg-[#111111] text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700'
      }`}
    >
      {text}
    </button>
  );

  return (
    <section className={`relative z-20 w-full ${overlap ? '-mt-16 md:-mt-20' : ''}`}>
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 md:px-8 2xl:px-10 3xl:px-12">
        <FadeIn>
          <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-[#111111] md:text-xl">{title ?? t('finder.title')}</h2>
                <p className="text-sm text-gray-500">
                  {mode === 'size' ? t('finder.subtitle.size') : t('finder.subtitle.vehicle')}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {toggleBtn('size', t('finder.bySize'))}
                {toggleBtn('vehicle', t('finder.byVehicle'))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto_auto]">
              {mode === 'size' ? (
                <>
                  <Dropdown
                    label={t('finder.width')}
                    anyLabel={t('finder.any')}
                    value={size.width}
                    options={options.widths}
                    onChange={(v) => onSize({ ...size, width: v })}
                  />
                  <Dropdown
                    label={t('finder.aspect')}
                    anyLabel={t('finder.any')}
                    value={size.aspect}
                    options={options.aspects}
                    onChange={(v) => onSize({ ...size, aspect: v })}
                  />
                  <Dropdown
                    label={t('finder.rim')}
                    anyLabel={t('finder.any')}
                    value={size.rim}
                    options={options.rims}
                    onChange={(v) => onSize({ ...size, rim: v })}
                  />
                  <Dropdown
                    label={t('finder.axle')}
                    anyLabel={t('finder.any')}
                    value={size.axle}
                    options={options.axles}
                    onChange={(v) => onSize({ ...size, axle: v })}
                  />
                </>
              ) : (
                <>
                  <Dropdown
                    label={t('finder.vehicleType')}
                    anyLabel={t('finder.any')}
                    value={vehicle.vehicleType}
                    options={options.vehicleTypes}
                    onChange={(v) => onVehicle({ ...vehicle, vehicleType: v })}
                  />
                  <Dropdown
                    label={t('finder.roadType')}
                    anyLabel={t('finder.any')}
                    value={vehicle.roadType}
                    options={options.roadTypes}
                    onChange={(v) => onVehicle({ ...vehicle, roadType: v })}
                  />
                  <Dropdown
                    label={t('finder.axle')}
                    anyLabel={t('finder.any')}
                    value={vehicle.axle}
                    options={options.axles}
                    onChange={(v) => onVehicle({ ...vehicle, axle: v })}
                  />
                  <Dropdown
                    label={t('finder.keyPriority')}
                    anyLabel={t('finder.any')}
                    value={vehicle.keyPriority}
                    options={options.keyPriorities}
                    onChange={(v) => onVehicle({ ...vehicle, keyPriority: v })}
                  />
                </>
              )}

              <button
                type="button"
                onClick={onFind}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1148c6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d39a0]"
              >
                <Search className="h-4 w-4" />
                {t('finder.find')}
              </button>
              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
                {t('finder.reset')}
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TireFinderSection;
