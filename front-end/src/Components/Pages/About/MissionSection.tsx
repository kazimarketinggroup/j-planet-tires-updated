import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';

const PARAGRAPH_KEYS: TranslationKey[] = ['mission.p1', 'mission.p2'];

const MissionSection = () => {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-white font-sans">
      <div className="mx-auto max-w-5xl 2xl:max-w-5xl px-5 py-16 text-center md:px-8 2xl:px-10 3xl:px-12 md:py-20">
        <FadeIn>
          <span className="inline-block rounded bg-[#e3ecd1] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#4b6a2f]">
            {t('mission.badge')}
          </span>

          <h2 className="mt-4 text-2xl font-semibold leading-snug text-[#111111] md:text-3xl lg:text-4xl 2xl:text-5xl">
            {t('mission.titleLine1')} <br className="hidden sm:block" /> {t('mission.titleLine2')}
          </h2>

          <div className="mt-6 space-y-4">
            {PARAGRAPH_KEYS.map((key) => (
              <p key={key} className="text-base font-light leading-relaxed text-gray-500 md:text-base">
                {t(key)}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default MissionSection;
