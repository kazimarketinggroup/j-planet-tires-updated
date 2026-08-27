// Wrapper around the browser's built-in on-device Translator API (Chrome 138+ /
// Edge). Runs entirely on-device: instant after the one-time language-pack
// download, no quota, no API key, private. Unavailable on mobile, Safari,
// Firefox and older Chrome — callers fall back to another provider there.
//
// Spec: https://developer.chrome.com/docs/ai/translator-api
import { LANGUAGE_BY_CODE, type Lang } from './languages';

// Minimal typing for the experimental global. Kept local so we don't depend on
// lib updates.
interface TranslatorInstance {
  translate: (text: string) => Promise<string>;
}
interface TranslatorFactory {
  availability: (opts: { sourceLanguage: string; targetLanguage: string }) => Promise<string>;
  create: (opts: {
    sourceLanguage: string;
    targetLanguage: string;
    monitor?: (m: EventTarget) => void;
  }) => Promise<TranslatorInstance>;
}

const getFactory = (): TranslatorFactory | null => {
  if (typeof self === 'undefined') return null;
  const factory = (self as unknown as { Translator?: TranslatorFactory }).Translator;
  return factory ?? null;
};

export const isChromeTranslatorSupported = (): boolean => getFactory() !== null;

const bcp47 = (lang: Lang): string | null => LANGUAGE_BY_CODE[lang]?.bcp47 ?? null;

// One translator instance per target language, created lazily. `null` marks a
// language we've determined is unavailable so we don't retry creation.
const instances = new Map<Lang, Promise<TranslatorInstance | null>>();

const getTranslator = (lang: Lang): Promise<TranslatorInstance | null> => {
  const existing = instances.get(lang);
  if (existing) return existing;

  const promise = (async (): Promise<TranslatorInstance | null> => {
    const factory = getFactory();
    const target = bcp47(lang);
    if (!factory || !target) return null;
    try {
      const availability = await factory.availability({ sourceLanguage: 'en', targetLanguage: target });
      // 'unavailable' → this language pair can't be translated on-device.
      if (availability === 'unavailable') return null;
      // 'available' | 'downloadable' | 'downloading' → create() will download the
      // pack if needed and resolve once ready.
      return await factory.create({ sourceLanguage: 'en', targetLanguage: target });
    } catch {
      return null;
    }
  })();

  instances.set(lang, promise);
  return promise;
};

// Translate on-device. Resolves to null if the API/pair is unavailable or fails,
// so the caller can fall back to another provider.
export const chromeTranslate = async (text: string, lang: Lang): Promise<string | null> => {
  const trimmed = text.trim();
  if (!trimmed) return null;
  try {
    const translator = await getTranslator(lang);
    if (!translator) return null;
    const out = (await translator.translate(trimmed)).trim();
    return out || null;
  } catch {
    return null;
  }
};

// Kick off language-pack download / translator creation ahead of time so the
// first visible translation is instant. Safe to call when unsupported (no-op).
export const warmChromeTranslator = (lang: Lang): void => {
  if (bcp47(lang)) void getTranslator(lang);
};
