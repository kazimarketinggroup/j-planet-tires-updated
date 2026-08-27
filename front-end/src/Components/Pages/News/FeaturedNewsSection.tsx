import { Link } from 'react-router-dom';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import { NEWS_ARTICLES } from './newsData';

const FeaturedNewsSection = () => {
  const { t } = useLanguage();
  const featured = NEWS_ARTICLES[0];
  return (
    <section className="relative z-20 -mt-14 w-full md:-mt-20">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 md:px-8 2xl:px-10 3xl:px-12">
        <FadeIn>
          <Link
            to={`/news/${featured.slug}`}
            className="group grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] md:grid-cols-2"
          >
            <div className="relative aspect-[651/341]">
              <img
                src={featured.image}
                alt={t(featured.titleKey)}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <span className="absolute right-3 top-3 rounded bg-black/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                {t('newsPage.featured')}
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
              <p className="text-xs font-medium text-gray-400">{t(featured.dateKey)} &middot; {t('newsCat.events')}</p>
              <h3 className="mt-2 text-xl font-semibold leading-snug text-[#111111] transition-colors group-hover:text-[#1148c6] md:text-2xl">
                {t(featured.titleKey)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {t(featured.descriptionKey)}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-[#111111] transition-colors group-hover:text-[#1148c6]">
                {t('news.readMore')}
              </span>
            </div>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;
