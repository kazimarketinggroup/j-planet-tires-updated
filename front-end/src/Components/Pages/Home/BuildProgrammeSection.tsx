import truckBg from '../../../assets/home/semi-truck-wheels-shined-and-ready-for-transport-2026-03-20-03-30-19-utc 2.png';
import Button from '../../Shared/Button';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';

const BuildProgrammeSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative w-full overflow-hidden bg-[#0a1b3d] font-sans">
      <div
        className="absolute inset-0 bg-top bg-cover sm:bg-center md:bg-[center_42%]"
        style={{ backgroundImage: `url(${truckBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />

      <div className="relative z-10 mx-auto flex min-h-[480px] max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] items-center px-5 py-16 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 md:py-24 2xl:min-h-[560px] 2xl:py-28 3xl:min-h-[620px] 3xl:py-32">
        <FadeIn className="max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
          <span className="mb-6 inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white 2xl:px-5 2xl:py-2 2xl:text-xs 3xl:text-sm">
            {t('programme.badge')}
          </span>

          <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl">
            {t('programme.title')}
          </h2>

          <p className="mt-6 text-base font-light leading-relaxed text-white/65 2xl:mt-8 2xl:text-lg 3xl:text-xl">
            {t('programme.description')}
          </p>

          <Button to="/contact" className="mt-8 2xl:mt-10 2xl:h-11 2xl:px-8 2xl:text-base 3xl:h-12 3xl:px-9 3xl:text-lg">
            {t('programme.cta')}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default BuildProgrammeSection;
