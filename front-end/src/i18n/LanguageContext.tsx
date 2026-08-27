import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type TranslationKey } from './translations';
import { LANGUAGE_BY_CODE, LANGUAGES, isLang, type Lang } from './languages';
import { warmChromeTranslator } from './chromeTranslator';
import { getCachedTranslation, translateText } from './autoTranslate';

// Languages that have a hand-written UI dictionary. For any other language the UI
// strings are machine-translated at runtime (getCachedTranslation / translateText).
const DICTIONARY_LANGS = new Set<Lang>(['en', 'ar', 'ku', 'zh', 'sw']);

// All English UI strings, translated once per language and cached by the machine
// translator. Used to pre-warm dictionary-less languages so t() has cached hits.
const EN_UI_VALUES: string[] = Array.from(
  new Set(Object.values(translations.en).filter((v): v is string => typeof v === 'string' && v.trim() !== '')),
);

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const STORAGE_KEY = 'jplanet_lang';

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : 'en';
  });

  // Bumped whenever a batch of machine translations finishes, so t() re-reads the
  // now-populated cache and the UI re-renders in the target language.
  const [translationTick, setTranslationTick] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    const config = LANGUAGE_BY_CODE[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = config?.dir ?? 'ltr';
    // Start the on-device translator language-pack download early so the first
    // CMS translation is instant (no-op where the API is unsupported).
    warmChromeTranslator(lang);
  }, [lang]);

  // For languages with no hand-written dictionary (es/de/nl), machine-translate
  // every UI string once and cache it, then re-render so t() picks up the results.
  useEffect(() => {
    if (DICTIONARY_LANGS.has(lang)) return;
    let active = true;
    const pending = EN_UI_VALUES.filter((text) => getCachedTranslation(text, lang) === null);
    if (pending.length === 0) return;

    // Translate in small batches so the UI fills in progressively rather than
    // waiting for all ~350 strings, and so we don't fire hundreds of requests at
    // once. translateText de-dupes in-flight work and caches every result.
    const BATCH = 20;
    (async () => {
      for (let i = 0; i < pending.length && active; i += BATCH) {
        const batch = pending.slice(i, i + BATCH);
        await Promise.all(batch.map((text) => translateText(text, lang)));
        if (active) setTranslationTick((n) => n + 1);
      }
    })();

    return () => {
      active = false;
    };
  }, [lang]);

  // UI string lookup. Hand-written dictionaries (en/ar/ku/zh/sw) are preferred —
  // reliable and instant. For dictionary-less languages, fall back to a cached
  // machine translation of the English string; until that arrives, show English.
  const t = useCallback(
    (key: TranslationKey): string => {
      const dictionary = translations[lang]?.[key];
      if (dictionary !== undefined) return dictionary;
      const english = translations.en[key];
      if (english === undefined) return key;
      if (!DICTIONARY_LANGS.has(lang)) {
        return getCachedTranslation(english, lang) ?? english;
      }
      return english;
    },
    // translationTick invalidates t() as machine translations stream into cache.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, translationTick],
  );

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

// eslint-disable-next-line react-refresh/only-export-components
export { LANGUAGES };
