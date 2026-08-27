// Client-side machine translation for CMS content that only exists in English
// (tire names, descriptions, benefits, features).
//
// Providers, in order:
//   1. Chrome built-in Translator API — on-device, instant, no quota (Chrome/
//      Edge desktop 138+). Best when available.
//   2. MyMemory (https://mymemory.translated.net) — free cloud API, no key, but
//      has a daily quota. Fallback where the on-device API is unavailable
//      (mobile, Safari, Firefox) or has no pack for the language (Kurdish).
//
// Results are cached in localStorage (keyed by target language + source text) so
// each unique string is translated at most once per browser, plus an in-memory
// map for the current session. On any failure the original English is returned
// so the UI never breaks.
import { LANGUAGE_BY_CODE, type Lang } from './languages';
import { chromeTranslate } from './chromeTranslator';

const STORAGE_PREFIX = 'jp_at:';
const ENDPOINT = 'https://api.mymemory.translated.net/get';

const memoryCache = new Map<string, string>();
const inFlight = new Map<string, Promise<string>>();

// MyMemory target code for a language, or null if it needs no translation
// (English, or a language with its own dictionary).
const targetCode = (lang: Lang): string | null => LANGUAGE_BY_CODE[lang]?.mmCode ?? null;

const cacheKey = (mm: string, text: string) => `${STORAGE_PREFIX}${mm}:${text}`;

// Any of these substrings means the API returned an error message (quota,
// length, etc.) rather than a real translation — never cache or show it.
const isErrorResponse = (s: string): boolean =>
  /MYMEMORY WARNING|QUOTA|USED ALL AVAILABLE|QUERY LENGTH LIMIT|MAX ALLOWED QUERY|INVALID/i.test(s);

const readCache = (mm: string, text: string): string | null => {
  const key = cacheKey(mm, text);
  if (memoryCache.has(key)) return memoryCache.get(key)!;
  try {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      // Discard any error string cached by an older build.
      if (isErrorResponse(stored)) {
        localStorage.removeItem(key);
        return null;
      }
      memoryCache.set(key, stored);
      return stored;
    }
  } catch {
    // localStorage unavailable — fall through to network.
  }
  return null;
};

const writeCache = (mm: string, text: string, translated: string) => {
  const key = cacheKey(mm, text);
  memoryCache.set(key, translated);
  try {
    localStorage.setItem(key, translated);
  } catch {
    // Ignore quota / availability errors; in-memory cache still applies.
  }
};

// Synchronously return a cached translation for `lang` if we already have it.
// Returns the original text for languages that need no translation.
export const getCachedTranslation = (text: string, lang: Lang): string | null => {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const mm = targetCode(lang);
  if (!mm) return text;
  return readCache(mm, trimmed);
};

// MyMemory rejects queries over 500 chars. Keep a safe margin.
const MM_MAX_LEN = 480;

// Translate one short plain-text segment via MyMemory. Returns null on any
// failure (so the caller keeps the original).
const mmTranslateSegment = async (segment: string, mm: string): Promise<string | null> => {
  const q = segment.trim();
  if (!q || q.length > MM_MAX_LEN) return null;
  try {
    const url = `${ENDPOINT}?q=${encodeURIComponent(q)}&langpair=en|${mm}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      responseStatus?: number | string;
      responseData?: { translatedText?: string };
    };
    const out = data.responseData?.translatedText?.trim();
    const status = Number(data.responseStatus);
    if (!out || isErrorResponse(out)) return null;
    if (!Number.isNaN(status) && status !== 200) return null;
    return out;
  } catch {
    return null;
  }
};

// Split plain text into <=MM_MAX_LEN chunks at sentence / clause boundaries so
// long descriptions can be translated piecewise without tripping the API limit.
const chunkText = (text: string): string[] => {
  if (text.length <= MM_MAX_LEN) return [text];
  const parts = text.split(/(?<=[.!?؟。！])\s+/);
  const chunks: string[] = [];
  let cur = '';
  for (const p of parts) {
    if ((cur + ' ' + p).trim().length > MM_MAX_LEN) {
      if (cur) chunks.push(cur.trim());
      cur = p.length > MM_MAX_LEN ? p.slice(0, MM_MAX_LEN) : p;
    } else {
      cur = (cur ? cur + ' ' : '') + p;
    }
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks;
};

// Translate plain text of any length via MyMemory by chunking. Returns null if
// any chunk fails (partial translation would look broken).
const mmTranslatePlain = async (text: string, mm: string): Promise<string | null> => {
  const chunks = chunkText(text);
  const out: string[] = [];
  for (const chunk of chunks) {
    const t = await mmTranslateSegment(chunk, mm);
    if (t === null) return null;
    out.push(t);
  }
  return out.join(' ');
};

const looksLikeHtml = (s: string): boolean => /<[a-z][\s\S]*>/i.test(s);

// Translate an HTML string by translating only its visible text nodes, leaving
// tags/structure intact. Falls back to null if nothing could be translated.
const translateHtml = async (html: string, lang: Lang, mm: string): Promise<string | null> => {
  if (typeof document === 'undefined') return null;
  const container = document.createElement('div');
  container.innerHTML = html;

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    if (node.textContent && node.textContent.trim()) textNodes.push(node as Text);
    node = walker.nextNode();
  }
  if (!textNodes.length) return null;

  let anyTranslated = false;
  for (const tn of textNodes) {
    const original = tn.textContent ?? '';
    const trimmed = original.trim();
    if (!trimmed) continue;
    // Chrome on-device first (handles any length), then MyMemory chunked.
    const onDevice = await chromeTranslate(trimmed, lang);
    const translated = onDevice ?? (await mmTranslatePlain(trimmed, mm));
    if (translated) {
      // Preserve any leading/trailing whitespace around the node's text.
      tn.textContent = original.replace(trimmed, translated);
      anyTranslated = true;
    }
  }
  return anyTranslated ? container.innerHTML : null;
};

// Translate a single English string to `lang`. Resolves to the original text on
// any error, or immediately if the language needs no translation. Handles HTML
// (translates text nodes, keeps tags) and long text (chunked).
export const translateText = async (text: string, lang: Lang): Promise<string> => {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const mm = targetCode(lang);
  if (!mm) return text;

  const cached = readCache(mm, trimmed);
  if (cached !== null) return cached;

  const flightKey = cacheKey(mm, trimmed);
  const existing = inFlight.get(flightKey);
  if (existing) return existing;

  const request = (async () => {
    try {
      // HTML content: translate text nodes only, preserve markup.
      if (looksLikeHtml(trimmed)) {
        const html = await translateHtml(trimmed, lang, mm);
        if (html) {
          writeCache(mm, trimmed, html);
          return html;
        }
        return text;
      }

      // Plain text: on-device first (any length), else MyMemory chunked.
      const onDevice = await chromeTranslate(trimmed, lang);
      if (onDevice) {
        writeCache(mm, trimmed, onDevice);
        return onDevice;
      }
      const cloud = await mmTranslatePlain(trimmed, mm);
      if (cloud) {
        writeCache(mm, trimmed, cloud);
        return cloud;
      }
      return text;
    } catch {
      return text; // network / parsing failure — show original English
    } finally {
      inFlight.delete(flightKey);
    }
  })();

  inFlight.set(flightKey, request);
  return request;
};
