import { useEffect, useRef, useState } from 'react';
import { ListFilter, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { FilterCriteria, FinderOptions } from './tireFinder';

interface FilterSortPanelProps {
  options: FinderOptions;
  filters: FilterCriteria;
  resultCount: number;
  onChange: (filters: FilterCriteria) => void;
  onClearAll: () => void;
}

const Radio = ({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-gray-600">
    <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-[#1148c6]" />
    {label}
  </label>
);

const Check = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-gray-600">
    <input type="checkbox" checked={checked} onChange={onChange} className="accent-[#1148c6]" />
    {label}
  </label>
);

const Heading = ({ children }: { children: string }) => (
  <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-gray-400 first:mt-0">
    {children}
  </p>
);

const FilterSortPanel = ({
  options,
  filters,
  resultCount,
  onChange,
  onClearAll,
}: FilterSortPanelProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const set = (patch: Partial<FilterCriteria>) => onChange({ ...filters, ...patch });

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-md border border-[#cddca9] bg-[#e3ecd1] px-3.5 py-2 text-sm font-semibold text-[#4b6a2f] transition-colors hover:bg-[#d8e4c1]"
      >
        <ListFilter className="h-4 w-4" />
        {t('filter.button')}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
          {options.plyRatings.length > 0 && (
            <>
              <Heading>{t('filter.ply')}</Heading>
              <Radio
                name="ply"
                label={t('filter.all')}
                checked={!filters.plyRating}
                onChange={() => set({ plyRating: '' })}
              />
              {options.plyRatings.map((p) => (
                <Radio
                  key={p}
                  name="ply"
                  label={p}
                  checked={filters.plyRating === p}
                  onChange={() => set({ plyRating: p })}
                />
              ))}
            </>
          )}

          {options.loadRanges.length > 0 && (
            <>
              <Heading>{t('filter.loadRange')}</Heading>
              <Radio
                name="loadrange"
                label={t('filter.all')}
                checked={!filters.loadRange}
                onChange={() => set({ loadRange: '' })}
              />
              {options.loadRanges.map((l) => (
                <Radio
                  key={l}
                  name="loadrange"
                  label={l}
                  checked={filters.loadRange === l}
                  onChange={() => set({ loadRange: l })}
                />
              ))}
            </>
          )}

          {(options.hasMs || options.hasPmsf || options.hasRegroovable) && (
            <>
              <Heading>{t('filter.markings')}</Heading>
              {options.hasMs && (
                <Check
                  label={t('filter.ms')}
                  checked={filters.msOnly}
                  onChange={() => set({ msOnly: !filters.msOnly })}
                />
              )}
              {options.hasPmsf && (
                <Check
                  label={t('filter.pmsf')}
                  checked={filters.pmsfOnly}
                  onChange={() => set({ pmsfOnly: !filters.pmsfOnly })}
                />
              )}
              {options.hasRegroovable && (
                <Check
                  label={t('filter.regroovable')}
                  checked={filters.regroovableOnly}
                  onChange={() => set({ regroovableOnly: !filters.regroovableOnly })}
                />
              )}
            </>
          )}

          <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-400">
            {t('filter.showing').replace('{count}', String(resultCount))}
          </div>
          <button
            type="button"
            onClick={onClearAll}
            className="mt-3 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            {t('filter.clearAll')}
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSortPanel;
