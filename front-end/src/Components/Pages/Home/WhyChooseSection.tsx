import carIcon from '../../../assets/home/icons/car 1.png';
import managementIcon from '../../../assets/home/icons/management 1.png';
import tireIcon from '../../../assets/home/icons/tire (1) 1.png';
import touchIcon from '../../../assets/home/icons/tire 1.png';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';

const REASONS: { icon: string; titleKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  { icon: carIcon, titleKey: 'why.r1.title', descriptionKey: 'why.r1.description' },
  { icon: touchIcon, titleKey: 'why.r2.title', descriptionKey: 'why.r2.description' },
  { icon: managementIcon, titleKey: 'why.r3.title', descriptionKey: 'why.r3.description' },
  { icon: tireIcon, titleKey: 'why.r4.title', descriptionKey: 'why.r4.description' },
];

const WhyChooseSection = () => {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-white font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 py-16 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 md:py-20 2xl:py-24 3xl:py-28">
        <FadeIn>
          <span className="inline-block rounded bg-[#e3ecd1] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#4b6a2f] 2xl:px-4 2xl:py-1.5 2xl:text-xs 3xl:text-sm">
            {t('why.badge')}
          </span>

          <h2 className="mt-3 text-2xl font-semibold text-[#111111] md:text-3xl lg:text-4xl 2xl:mt-4 2xl:text-5xl 3xl:text-6xl">
            {t('why.title')}
          </h2>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:mt-14 2xl:gap-8 3xl:mt-16 3xl:gap-10">
          {REASONS.map((reason, index) => (
            <FadeIn key={reason.titleKey} delay={index * 0.1}>
              <div className="h-full rounded-3xl border border-white/30 bg-white/80 p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(15,23,42,0.5)] 2xl:p-8 3xl:p-10">
                <img src={reason.icon} alt="" className="h-7 w-7 object-contain 2xl:h-9 2xl:w-9 3xl:h-10 3xl:w-10" />
                <h3 className="mt-4 text-base font-semibold text-[#111111] 2xl:mt-5 2xl:text-xl 3xl:text-2xl">{t(reason.titleKey)}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-gray-500 2xl:mt-3 2xl:text-base 3xl:text-lg">
                  {t(reason.descriptionKey)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
