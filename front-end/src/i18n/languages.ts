// Central config for the site's languages. English & Arabic have hand-written
// dictionaries (translations.ts); the rest are machine-translated from English
// on demand via MyMemory (see autoTranslate.ts), so they cover the whole site
// without a hand-maintained dictionary.
export type Lang = 'en' | 'ar' | 'ku' | 'zh' | 'sw' | 'es' | 'de' | 'nl';

export interface LanguageConfig {
  code: Lang;
  label: string; // shown in the language dropdown
  flag: string; // ISO country code for the flag image (flagcdn)
  dir: 'ltr' | 'rtl';
  // MyMemory target code used to auto-translate English UI strings. Null for
  // languages that already have a hand-written dictionary (en, ar).
  mmCode: string | null;
  // BCP-47 code for the browser's built-in Translator API (Chrome 138+). Null
  // when the language needs no translation or Chrome has no language pack for it
  // (e.g. Kurdish) — those fall back to MyMemory.
  bcp47: string | null;
}

export const LANGUAGES: LanguageConfig[] = [
  // English needs no translation. Arabic has a hand-written UI dictionary, but
  // still carries an mmCode so CMS content (tire names, etc.) can be machine-
  // translated — the UI dictionary is always preferred over machine output in t().
  { code: 'en', label: 'English', flag: 'GB', dir: 'ltr', mmCode: null, bcp47: null },
  { code: 'ar', label: 'Arabic', flag: 'IQ', dir: 'rtl', mmCode: 'ar', bcp47: 'ar' },
  // Kurmanji Kurdish in Latin script reads left-to-right (RTL is only for
  // Sorani / Arabic-script Kurdish, which this site doesn't use).
  { code: 'ku', label: 'Kurdish', flag: 'IQ', dir: 'ltr', mmCode: 'ku', bcp47: null },
  { code: 'zh', label: 'Chinese', flag: 'CN', dir: 'ltr', mmCode: 'zh-CN', bcp47: 'zh-Hans' },
  { code: 'sw', label: 'Kiswahili', flag: 'KE', dir: 'ltr', mmCode: 'sw', bcp47: 'sw' },
  // Spanish, German and Dutch have no hand-written UI dictionary — both their UI
  // chrome and CMS content are machine-translated from English (Chrome on-device
  // Translator API first, MyMemory cloud as fallback).
  { code: 'es', label: 'Spanish', flag: 'ES', dir: 'ltr', mmCode: 'es', bcp47: 'es' },
  { code: 'de', label: 'German', flag: 'DE', dir: 'ltr', mmCode: 'de', bcp47: 'de' },
  { code: 'nl', label: 'Dutch', flag: 'NL', dir: 'ltr', mmCode: 'nl', bcp47: 'nl' },
];

export const LANGUAGE_BY_CODE: Record<Lang, LanguageConfig> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l]),
) as Record<Lang, LanguageConfig>;

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && LANGUAGES.some((l) => l.code === value);
