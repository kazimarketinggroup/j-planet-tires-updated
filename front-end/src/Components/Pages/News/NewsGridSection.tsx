import { useState } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';
import { NEWS_ARTICLES, getNewsThumbnail, type NewsCategory } from './newsData';

const CATEGORIES: Array<'All' | NewsCategory> = ['All', 'Events', 'Product News', 'Company News'];

const CATEGORY_KEYS: Record<'All' | NewsCategory, TranslationKey> = {
  All: 'newsCat.all',
  Events: 'newsCat.events',
  'Product News': 'newsCat.product',
  'Company News': 'newsCat.company',
};

const PAGE_SIZE = 3;

const NewsGridSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'All' | NewsCategory>('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE * 2);

  const filteredItems =
    activeCategory === 'All' ? NEWS_ARTICLES : NEWS_ARTICLES.filter((item) => item.category === activeCategory);
  const visibleItems = filteredItems.slice(0, visibleCount);

  const handleCategoryChange = (category: 'All' | NewsCategory) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE * 2);
  };

  return (
    <section className="w-full bg-[#f6f6f4] font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 py-12 md:px-8 2xl:px-10 3xl:px-12 md:py-16">
        <FadeIn className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-[#111111] md:text-3xl">{t('news.title')}</h2>

          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`rounded px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  activeCategory === category
                    ? 'bg-[#1148c6] text-white'
                    : 'bg-[#f1f1f1] text-gray-500 hover:bg-gray-200'
                }`}
              >
                {t(CATEGORY_KEYS[category])}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {visibleItems.map((item, index) => (
            <FadeIn key={item.slug} delay={(index % PAGE_SIZE) * 0.1}>
              <article className="h-full overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
                <Link to={`/news/${item.slug}`} className="block">
                  <div className="relative aspect-[651/341] overflow-hidden bg-gray-200">
                    <img
                      src={getNewsThumbnail(item)}
                      alt={t(item.titleKey)}
                      className="h-full w-full object-cover"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
                      {t(item.dateKey)}
                    </span>
                  </div>
                </Link>

                <div className="p-5">
                  <Link to={`/news/${item.slug}`}>
                    <h4 className="text-base font-semibold leading-snug text-[#111111] transition-colors hover:text-[#1148c6]">
                      {t(item.titleKey)}
                    </h4>
                  </Link>
                  <p className="mt-2 line-clamp-3 text-sm font-light leading-relaxed text-gray-500">
                    {t(item.descriptionKey)}
                  </p>
                  <Link
                    to={`/news/${item.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-[#111111] hover:text-[#1148c6]"
                  >
                    {t('news.readMore')}
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {visibleCount < filteredItems.length && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="mx-auto mt-10 block text-sm font-semibold text-[#111111] hover:text-[#1148c6]"
          >
            {t('common.viewMore')}
          </button>
        )}
      </div>
    </section>
  );
};

export default NewsGridSection;
