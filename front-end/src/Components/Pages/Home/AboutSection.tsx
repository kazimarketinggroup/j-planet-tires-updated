import aboutBg from '../../../assets/home/aerial-view-of-cargo-trailer-truck-with-copy-space-2026-03-17-20-07-12-utc 1.png';
import Button from '../../Shared/Button';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative w-full overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-top bg-cover sm:bg-center md:bg-[center_42%]"
        style={{ backgroundImage: `url(${aboutBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/15" />

      <div className="relative z-10 mx-auto flex min-h-[360px] max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] items-center px-5 py-12 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 md:py-20 2xl:min-h-[440px] 2xl:py-24 3xl:min-h-[500px] 3xl:py-28">
        <FadeIn className="max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
          <span className="mb-6 inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white 2xl:px-5 2xl:py-2 2xl:text-xs 3xl:text-sm">
            {t('about.badge')}
          </span>

          <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl">
            {t('about.title')}
          </h2>

          <p className="mt-6 text-base font-light leading-relaxed text-white/65 2xl:mt-8 2xl:text-lg 3xl:text-xl">
            {t('about.p1')}
          </p>

          <p className="mt-4 text-base font-light leading-relaxed text-white/65 2xl:text-lg 3xl:text-xl">
            {t('about.p2')}
          </p>

          <Button to="/about" className="mt-8 2xl:mt-10 2xl:h-11 2xl:px-8 2xl:text-base 3xl:h-12 3xl:px-9 3xl:text-lg">
            {t('about.cta')}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
