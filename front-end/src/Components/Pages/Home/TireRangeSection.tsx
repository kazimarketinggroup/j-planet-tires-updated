import { Link } from 'react-router-dom';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';
import pcrImage from '../../../assets/home/special1.png';
import tbrImage from '../../../assets/home/special2.png';
import otrImage from '../../../assets/home/special3.png';

interface RangeItem {
  image: string;
  to: string;
  tagKey: TranslationKey;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  // Colour of the small tag pill, tuned to each category's photo.
  tagClass: string;
}

const RANGE_ITEMS: RangeItem[] = [
  {
    image: pcrImage,
    to: '/tires/pcr-sub-tires',
    tagKey: 'range.pcr.tag',
    titleKey: 'range.pcr.title',
    descriptionKey: 'range.pcr.description',
    tagClass: 'bg-black/45 text-white/90',
  },
  {
    image: tbrImage,
    to: '/tires/tbr-tires',
    tagKey: 'range.tbr.tag',
    titleKey: 'range.tbr.title',
    descriptionKey: 'range.tbr.description',
    tagClass: 'bg-[#8a5a1a]/70 text-white',
  },
  {
    image: otrImage,
    to: '/tires/otr-tires',
    tagKey: 'range.otr.tag',
    titleKey: 'range.otr.title',
    descriptionKey: 'range.otr.description',
    tagClass: 'bg-[#2d5f2e]/70 text-[#d6e9b8]',
  },
];

const TireRangeSection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-[#f6f6f4] font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 py-12 md:px-8 2xl:px-10 3xl:px-12 md:py-16 2xl:py-20">
        {/* Heading row: badge + title left, View-all button right */}
        <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-md bg-[#e7e9f2] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#3a4a7a] 2xl:text-xs">
              {t('range.badge')}
            </span>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-[#111111] md:text-[32px] 2xl:text-4xl 3xl:text-5xl">
              {t('range.title1')}
              <br />
              {t('range.title2')}
            </h2>
          </div>

          <Link
            to="/tires"
            className="inline-flex w-fit items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#111111] shadow-sm transition-colors hover:border-[#1148c6] hover:text-[#1148c6] 2xl:text-sm"
          >
            {t('range.viewAll')}
          </Link>
        </FadeIn>

        {/* Category cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:mt-12 2xl:gap-7">
          {RANGE_ITEMS.map((item, index) => (
            <FadeIn key={item.titleKey} delay={index * 0.1}>
              <Link
                to={item.to}
                className="group relative block h-[300px] overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)] md:h-[340px] 2xl:h-[400px]"
              >
                {/* Background photo */}
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {/* Legibility gradient — darker toward the bottom where the text sits */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-6 2xl:p-8">
                  <span
                    className={`mb-auto inline-block w-fit rounded px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide backdrop-blur-sm 2xl:text-[10px] ${item.tagClass}`}
                  >
                    {t(item.tagKey)}
                  </span>

                  <h3 className="text-2xl font-bold text-white 2xl:text-3xl">{t(item.titleKey)}</h3>
                  <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-white/75 2xl:text-base">
                    {t(item.descriptionKey)}
                  </p>
                  <span className="mt-5 inline-block text-sm font-semibold text-white transition-colors group-hover:text-[#a6c637] 2xl:text-base">
                    {t('range.explore')}
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

export default TireRangeSection;
