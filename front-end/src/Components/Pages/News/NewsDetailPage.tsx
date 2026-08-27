import { Link, useParams } from 'react-router-dom';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';
import NewsGallery from './NewsGallery';
import { getNewsArticle, getNewsImages, type NewsCategory } from './newsData';

const CONTAINER =
  'mx-auto max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl px-5 md:px-8 2xl:px-10 3xl:px-12';

const CATEGORY_KEYS: Record<NewsCategory, TranslationKey> = {
  Events: 'newsCat.events',
  'Product News': 'newsCat.product',
  'Company News': 'newsCat.company',
};

const NewsDetailPage = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const { t } = useLanguage();
  const article = getNewsArticle(newsId);

  if (!article) {
    return (
      <div className={`${CONTAINER} py-24 text-center font-sans`}>
        <h1 className="text-2xl font-semibold text-[#111111]">{t('newsPage.notFound')}</h1>
        <p className="mt-3 text-sm text-gray-500">{t('newsPage.notFoundDesc')}</p>
        <Link to="/news" className="mt-6 inline-block text-sm font-semibold text-[#1148c6] hover:text-[#0d39a0]">
          {t('newsPage.back')}
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#0a1b3d]">
        <div className="absolute inset-x-0 top-0 h-[5px] bg-[#1148c6]" />
        <div className="absolute inset-0">
          <img src={article.image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1b3d]/85 via-[#0a1b3d]/80 to-[#0a1b3d]" />
        </div>

        <div className={`relative z-10 ${CONTAINER} pb-14 pt-36 md:pb-16 md:pt-44 2xl:pt-52 2xl:pb-20`}>
          <FadeIn>
            <span className="inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white 2xl:text-xs">
              {t(CATEGORY_KEYS[article.category])}
            </span>

            <h1 className="mt-5 text-[28px] font-semibold leading-[1.18] text-white sm:text-[36px] md:text-[42px] 2xl:text-[50px]">
              {t(article.titleKey)}
            </h1>

            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-white/45 2xl:text-sm">
              {t(article.dateKey)}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="w-full bg-white">
        <div className={`${CONTAINER} py-14 md:py-20 2xl:py-24`}>
          <FadeIn>
            <NewsGallery images={getNewsImages(article)} title={t(article.titleKey)} />

            <p className="mt-8 text-base font-medium leading-relaxed text-[#111111] md:text-lg 2xl:mt-10">
              {t(article.descriptionKey)}
            </p>

            <div className="mt-6 space-y-5 text-sm leading-7 text-gray-600 md:text-[15px] 2xl:text-base 2xl:leading-8">
              {article.bodyKeys.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </div>
          </FadeIn>

          <div className="mt-12 border-t border-gray-200 pt-8 2xl:mt-16">
            <Link
              to="/news"
              className="inline-block text-sm font-semibold text-[#111111] hover:text-[#1148c6] 2xl:text-base"
            >
              {t('newsPage.back')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;
