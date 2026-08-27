import type { Lang } from './languages';

// Resolve a pre-translated CMS field from its per-language columns.
//
// The translate-tires script stores translations in suffixed columns, e.g.
//   name, name_ar, name_ku, name_zh, name_sw
// This returns the value for `lang` (English uses the base column), falling back
// to the base English value when a translation is missing/empty.
// Accepts any object (typed interfaces included) — read fields through an
// index cast so callers don't need a string index signature on their type.
type AnyRow = Record<string, unknown>;

export const localizeField = (
  row: object | null | undefined,
  base: string,
  lang: Lang,
): string | null => {
  if (!row) return null;
  const r = row as AnyRow;
  const english = (r[base] as string | null | undefined) ?? null;
  if (lang === 'en') return english;
  const translated = r[`${base}_${lang}`] as string | null | undefined;
  const value = translated?.trim();
  return value ? translated! : english;
};

// Resolve the localized `badges` array. Translations are stored as a JSON-encoded
// array string in badge_label_<lang> (populated by translate-tires.js); English
// (or any missing/short translation) falls back to the base `badges` array.
export const localizeBadges = (row: object | null | undefined, lang: Lang): string[] => {
  const r = row as AnyRow | null | undefined;
  const base = (r?.badges as string[] | null | undefined) ?? [];
  if (!r || lang === 'en') return base;
  const raw = r[`badge_label_${lang}`] as string | null | undefined;
  if (!raw?.trim()) return base;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) return parsed.map(String);
  } catch {
    // Malformed JSON — fall back to English badges.
  }
  return base;
};
