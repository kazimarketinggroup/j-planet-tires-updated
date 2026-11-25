// Shared news articles used by the home news section, the news grid, and the
// news detail page. Text lives in the i18n dictionaries (title/description/body
// keys) so it switches with the language toggle; this module holds the
// structural data (slug, image, date, category) plus the keys to look up.
import newsAutomechanika from '../../../assets/news/Rectangle 13.png';
import newsLatinExpo from '../../../assets/news/newNews.png';
import newsRtxHero from '../../../assets/news/Overlay+Shadow.png';
import newsRtxStand from '../../../assets/news/Rectangle 1111.png';
import newsRtx1 from '../../../assets/news/J.Planet Tire at Latin Tyre & Auto Parts Expo.png';
import newsRtx2 from '../../../assets/news/J.Planet Tire at Latin Tyre & Auto Parts Expo (1).png';
import newsRtx3 from '../../../assets/news/J.Planet Tire at Latin Tyre & Auto Parts Expo (2).png';
import newsAutomechanikaConnect from '../../../assets/news/WhatsApp Image 2026-11-25 at 22.26.41.jpeg';
import newsAutomechanikaConnect2 from '../../../assets/news/WhatsApp Image 2026-11-25 at 22.26.51.jpeg';
import newsAutomechanikaConnect3 from '../../../assets/news/WhatsApp Image 2026-11-25 at 22.27.04.jpeg';
import newsAutomechanikaVideo from '../../../assets/news/linkedin-video-1197kbps.mp4';
import type { TranslationKey } from '../../../i18n/translations';

export type NewsCategory = 'Events' | 'Product News' | 'Company News';

export interface NewsArticle {
  slug: string;
  /** Detail-page hero and first slide of the gallery. */
  image: string;
  /** Optional autoplay video shown as the first detail-page slide. */
  video?: string;
  /**
   * Card image for the grid/home listings. Defaults to `image`; set it when the
   * hero is a wide crop that loses too much in the card's 651x341 box.
   */
  thumbnail?: string;
  /**
   * Extra photos shown alongside `image` in the detail-page slider. Omit for
   * articles that only have the single hero shot.
   */
  gallery?: string[];
  category: NewsCategory;
  dateKey: TranslationKey;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  bodyKeys: TranslationKey[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'connecting-at-automechanika-dubai-2026',
    image: newsAutomechanikaConnect,
    video: newsAutomechanikaVideo,
    gallery: [newsAutomechanikaConnect2, newsAutomechanikaConnect3],
    category: 'Events',
    dateKey: 'news.n4.date',
    titleKey: 'news.n4.title',
    descriptionKey: 'news.n4.description',
    bodyKeys: ['news.n4.body1', 'news.n4.body2'],
  },
  {
    slug: 'road-transport-expo-2026',
    image: newsRtxHero,
    thumbnail: newsRtxStand,
    gallery: [newsRtx1, newsRtx2, newsRtx3],
    category: 'Events',
    dateKey: 'news.n3.date',
    titleKey: 'news.n3.title',
    descriptionKey: 'news.n3.description',
    bodyKeys: ['news.n3.body1', 'news.n3.body2', 'news.n3.body3'],
  },
  {
    slug: 'latin-tyre-auto-parts-expo',
    image: newsLatinExpo,
    category: 'Events',
    dateKey: 'news.n2.date',
    titleKey: 'news.n2.title',
    descriptionKey: 'news.n2.description',
    bodyKeys: ['news.n2.body1', 'news.n2.body2'],
  },
  {
    slug: 'automechanika-dubai-2026',
    image: newsAutomechanika,
    category: 'Events',
    dateKey: 'news.n1.date',
    titleKey: 'news.n1.title',
    descriptionKey: 'news.n1.description',
    bodyKeys: ['news.n1.body1', 'news.n1.body2'],
  },
];

export const getNewsArticle = (slug: string | undefined): NewsArticle | undefined =>
  NEWS_ARTICLES.find((article) => article.slug === slug);

/** Every photo for an article, hero first, for the detail-page slider. */
export const getNewsImages = (article: NewsArticle): string[] => [article.image, ...(article.gallery ?? [])];

/** Listing-card image, falling back to the hero when no dedicated crop exists. */
export const getNewsThumbnail = (article: NewsArticle): string => article.thumbnail ?? article.image;
