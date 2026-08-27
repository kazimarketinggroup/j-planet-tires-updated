import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { getCountries } from 'react-phone-number-input';
import { useLanguage } from '../../i18n/LanguageContext';

interface CountrySelectProps {
  name?: string;
  placeholder?: string;
  size?: 'default' | 'compact';
  className?: string;
}

interface CountryOption {
  iso: string;
  label: string;
}

// Standalone country picker: a searchable dropdown of every country with its
// flag. Country names are localized with the browser's Intl.DisplayNames (English
// or Arabic per the active site language). The selected ISO code is submitted via
// a hidden field (`name`).
const CountrySelect = ({
  name = 'country',
  placeholder,
  size = 'default',
  className = '',
}: CountrySelectProps) => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CountryOption | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const options = useMemo<CountryOption[]>(() => {
    const display = new Intl.DisplayNames([lang], { type: 'region' });
    return getCountries()
      .map((iso) => ({ iso, label: display.of(iso) ?? iso }))
      .sort((a, b) => a.label.localeCompare(b.label, lang));
  }, [lang]);

  // Keep the selected label in the current language when the toggle changes.
  useEffect(() => {
    setSelected((prev) => (prev ? options.find((o) => o.iso === prev.iso) ?? prev : prev));
  }, [options]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q) || o.iso.toLowerCase().includes(q));
  }, [options, search]);

  const compact = size === 'compact';
  const trigger = compact
    ? 'h-9 rounded border border-gray-300 bg-[#f2f3f8] px-3 text-xs font-medium text-gray-700'
    : 'rounded-md border border-gray-200/80 bg-[#f4f6fb] px-4 py-3 text-sm text-[#111111]';

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-2 outline-none transition-colors focus:border-[#1148c6] focus:bg-white ${trigger}`}
      >
        {selected ? (
          <img
            src={`https://flagcdn.com/${selected.iso.toLowerCase()}.svg`}
            alt=""
            className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/5"
          />
        ) : null}
        <span className={`flex-1 truncate text-left ${selected ? '' : 'text-gray-400'}`}>
          {selected ? selected.label : placeholder ?? 'Select country'}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>

      <input type="hidden" name={name} value={selected?.iso ?? ''} />

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="relative border-b border-gray-100 p-2">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country…"
              className="w-full rounded-md border border-gray-200 bg-[#f7f7f9] py-2 pl-9 pr-3 text-sm text-gray-700 focus:border-[#1148c6] focus:outline-none"
            />
          </div>
          <ul className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400">No matches</li>
            ) : (
              filtered.map((o) => (
                <li key={o.iso}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(o);
                      setOpen(false);
                      setSearch('');
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                      o.iso === selected?.iso ? 'bg-blue-50/60 font-semibold text-[#1148c6]' : 'text-gray-700'
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/${o.iso.toLowerCase()}.svg`}
                      alt=""
                      loading="lazy"
                      className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/5"
                    />
                    <span className="min-w-0 flex-1 truncate">{o.label}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
