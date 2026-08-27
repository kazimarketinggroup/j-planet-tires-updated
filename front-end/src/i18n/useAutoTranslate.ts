import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import { getCachedTranslation, translateText } from './autoTranslate';
import { glossaryLookup } from './cmsGlossary';
import type { Lang } from './languages';

// Resolve a CMS string synchronously if possible: hand-written glossary first
// (categories, common benefits — reliable, instant), then any cached API result.
const resolveKnown = (source: string, lang: string): string | null =>
  glossaryLookup(source, lang as never) ?? getCachedTranslation(source, lang as never);

// Auto-translate a single CMS string (English-only in the DB) to the active
// language. Returns the original English for English/untranslatable languages,
// and while a translation is still loading (so there's no flicker).
export const useAutoTranslate = (text: string | null | undefined): string => {
  const { lang } = useLanguage();
  const source = text ?? '';

  const [value, setValue] = useState<string>(() => resolveKnown(source, lang) ?? source);

  useEffect(() => {
    if (!source.trim()) {
      setValue(source);
      return;
    }
    const known = resolveKnown(source, lang);
    if (known !== null) {
      setValue(known);
      return;
    }
    let active = true;
    setValue(source); // show English until the translation arrives
    translateText(source, lang).then((translated) => {
      if (active) setValue(translated);
    });
    return () => {
      active = false;
    };
  }, [lang, source]);

  return value;
};

// Read a CMS field for the active language, preferring a pre-translated DB column
// (e.g. short_description_ar) and machine-translating the English base when no
// such column exists or it's empty. This is what makes fields translate for
// languages that have NO pre-translated columns (es/de/nl) as well as filling
// gaps for ar/ku/zh/sw. `base` is the field name, e.g. 'short_description'.
export const useLocalizedField = (
  row: object | null | undefined,
  base: string,
): string => {
  const { lang } = useLanguage();
  const r = (row ?? {}) as Record<string, unknown>;
  const english = ((r[base] as string | null | undefined) ?? '').toString();

  // A non-empty pre-translated column wins outright (already human/script quality).
  const columnValue =
    lang === 'en' ? english : ((r[`${base}_${lang}` as string] as string | null | undefined) ?? '').toString();
  const preTranslated = columnValue.trim() ? columnValue : null;

  return useTranslatedFallback(english, lang, preTranslated);
};

// Shared logic: if a pre-translated value is given, use it; else machine-translate
// the English source to `lang` (cached; English until it resolves).
const useTranslatedFallback = (
  english: string,
  lang: Lang,
  preTranslated: string | null,
): string => {
  const [value, setValue] = useState<string>(
    () => preTranslated ?? resolveKnown(english, lang) ?? english,
  );

  useEffect(() => {
    if (preTranslated) {
      setValue(preTranslated);
      return;
    }
    if (!english.trim() || lang === 'en') {
      setValue(english);
      return;
    }
    const known = resolveKnown(english, lang);
    if (known !== null) {
      setValue(known);
      return;
    }
    let active = true;
    setValue(english);
    translateText(english, lang).then((translated) => {
      if (active) setValue(translated);
    });
    return () => {
      active = false;
    };
  }, [english, lang, preTranslated]);

  return value;
};

// Auto-translate a list of CMS strings (e.g. benefit tags, feature bullets).
export const useAutoTranslateList = (items: (string | null | undefined)[]): string[] => {
  const { lang } = useLanguage();
  const key = items.join('');

  const [values, setValues] = useState<string[]>(() =>
    items.map((item) => {
      const source = item ?? '';
      return getCachedTranslation(source, lang) ?? source;
    }),
  );

  useEffect(() => {
    const sources = items.map((item) => item ?? '');
    let active = true;
    setValues(sources.map((source) => getCachedTranslation(source, lang) ?? source));
    Promise.all(
      sources.map((source) => (source.trim() ? translateText(source, lang) : Promise.resolve(source))),
    ).then((translated) => {
      if (active) setValues(translated);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, key]);

  return values;
};
