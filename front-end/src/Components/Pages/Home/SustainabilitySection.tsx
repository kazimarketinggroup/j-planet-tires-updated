import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';

const SustainabilitySection = () => {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-white font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 py-16 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 md:py-20 2xl:py-24 3xl:py-28">
        <FadeIn className="mx-auto max-w-3xl text-center 2xl:max-w-4xl">
          <h2 className="text-2xl font-semibold leading-snug text-[#111111] md:text-3xl 2xl:text-4xl 3xl:text-5xl">
            {t('sustainability.title')}
          </h2>

          <p className="mt-4 text-xl font-semibold text-[#1148c6] md:text-2xl 2xl:mt-6 2xl:text-3xl 3xl:text-4xl">
            {t('sustainability.tagline')}
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-gray-500 2xl:max-w-3xl 2xl:mt-6 2xl:text-lg 3xl:text-xl">
            {t('sustainability.description')}
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default SustainabilitySection;
