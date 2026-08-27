import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LANGUAGE_BY_CODE, LANGUAGES } from '../../i18n/languages';

const Flag = ({ iso }: { iso: string }) => (
  <img
    src={`https://flagcdn.com/${iso.toLowerCase()}.svg`}
    alt=""
    loading="lazy"
    className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/10"
  />
);

// Navbar language selector: a dropdown of the site's languages (flag + label).
// Selecting a language switches all content site-wide via LanguageContext.
const LanguageDropdown = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGE_BY_CODE[lang];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-white/35 2xl:text-xs"
      >
        <Flag iso={current.flag} />
        <span>{current.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2.5} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-xl"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  l.code === lang ? 'bg-[#1148c6] font-semibold text-white hover:bg-[#1148c6]' : 'text-gray-700'
                }`}
              >
                <Flag iso={l.flag} />
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
