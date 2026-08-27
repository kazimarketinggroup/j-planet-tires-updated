import Button from '../../Shared/Button';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';

const AUDIENCES: { titleKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  { titleKey: 'workWith.a1.title', descriptionKey: 'workWith.a1.description' },
  { titleKey: 'workWith.a2.title', descriptionKey: 'workWith.a2.description' },
];

const WorkWithSection = () => {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-white font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 pb-16 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 md:pb-20 2xl:pb-24 3xl:pb-28">
        <FadeIn>
          <span className="inline-block rounded bg-[#e3ecd1] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#4b6a2f] 2xl:px-4 2xl:py-1.5 2xl:text-xs 3xl:text-sm">
            {t('workWith.badge')}
          </span>

          <h2 className="mt-3 text-2xl font-semibold leading-snug text-[#111111] md:text-3xl lg:text-4xl 2xl:mt-4 2xl:text-5xl 3xl:text-6xl">
            {t('workWith.titleLine1')} <br /> {t('workWith.titleLine2')}
          </h2>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-6xl 2xl:max-w-7xl 2xl:mt-14 2xl:gap-8 3xl:mt-16 3xl:gap-10">
          {AUDIENCES.map((audience, index) => (
            <FadeIn key={audience.titleKey} delay={index * 0.1}>
              <div className="h-full rounded-3xl border border-white/30 bg-white/80 p-6 md:p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(15,23,42,0.5)] 2xl:p-10 3xl:p-12">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#111111] 2xl:text-base 3xl:text-lg">
                  {t(audience.titleKey)}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 2xl:mt-4 2xl:text-base 3xl:text-lg">
                  {t(audience.descriptionKey)}
                </p>
                <Button to="/contact" className="mt-6 2xl:mt-8 2xl:h-11 2xl:px-8 2xl:text-base 3xl:h-12 3xl:px-9 3xl:text-lg">
                  {t('workWith.cta')}
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkWithSection;
