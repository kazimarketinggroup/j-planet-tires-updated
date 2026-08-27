import tireBg from '../../../assets/home/stacked-new-black-tires-with-tread-patterns-2026-03-19-03-13-14-utc 1.png';
import Button from '../../Shared/Button';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';

const CtaBannerSection = () => {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-[#f7f7f7] font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 py-16 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 md:py-20 2xl:py-24 3xl:py-28">
        <div className="relative overflow-hidden rounded-3xl min-h-[320px] sm:min-h-[380px] 2xl:min-h-[440px] 3xl:min-h-[500px]">
          <div
            className="absolute inset-0 bg-top bg-cover sm:bg-center"
            style={{ backgroundImage: `url(${tireBg})` }}
          />
          <div className="absolute inset-0 bg-black/85" />

          <FadeIn className="relative z-10 mx-auto max-w-2xl px-6 py-16 text-center md:py-20 2xl:max-w-3xl 2xl:py-24 3xl:max-w-4xl 3xl:py-28">
            <h2 className="text-2xl font-semibold text-white md:text-3xl 2xl:text-5xl 3xl:text-6xl">
              {t('cta.title')}
            </h2>

            <p className="mt-4 text-sm font-light leading-relaxed text-white/70 md:text-base 2xl:mt-6 2xl:text-lg 3xl:text-xl">
              {t('cta.description')}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row 2xl:mt-10 2xl:gap-6">
              <Button to="/contact" className="w-full sm:w-auto 2xl:h-11 2xl:px-8 2xl:text-base 3xl:h-12 3xl:px-9 3xl:text-lg">
                {t('cta.enquire')}
              </Button>
              <Button to="/contact" variant="outline" className="w-full sm:w-auto 2xl:h-11 2xl:px-8 2xl:text-base 3xl:h-12 3xl:px-9 3xl:text-lg">
                {t('cta.partner')}
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CtaBannerSection;
