import { Link } from 'react-router-dom';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import { NEWS_ARTICLES, getNewsThumbnail } from '../News/newsData';

const NewsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="w-full mt-10 bg-white font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 pb-16 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 md:pb-20 2xl:pb-24 3xl:pb-28">
        <h3 className="text-2xl font-semibold text-[#111111] md:text-3xl 2xl:text-4xl 3xl:text-5xl">
          {t('news.title')}
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:mt-12 2xl:gap-8 3xl:mt-14 3xl:gap-10">
          {NEWS_ARTICLES.map((item, index) => (
            <FadeIn key={item.slug} delay={index * 0.1}>
              <Link
                to="/news"
                className="group block h-full rounded-xl bg-white shadow-sm p-5 border transition-shadow hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)] 2xl:p-6 3xl:p-7"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={getNewsThumbnail(item)}
                    alt={t(item.titleKey)}
                    className="h-44 w-full object-cover 2xl:h-56 3xl:h-64"
                  />
                  <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2.5 py-1 text-xs font-semibold text-white 2xl:px-3 2xl:py-1.5 2xl:text-sm">
                    {t(item.dateKey)}
                  </span>
                </div>

                <div className="px-1 py-4 2xl:py-5">
                  <h4 className="text-base font-semibold text-[#111111] group-hover:text-[#1148c6] 2xl:text-lg 3xl:text-xl">
                    {t(item.titleKey)}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-sm font-light leading-relaxed text-gray-500 2xl:mt-3 2xl:text-base">
                    {t(item.descriptionKey)}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[#111111] group-hover:text-[#1148c6] 2xl:text-base">
                    {t('news.readMore')}
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
