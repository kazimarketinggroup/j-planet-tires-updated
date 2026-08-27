import heroBg from '../../../assets/home/heroBg.png';
import heroVideo from '../../../assets/home/heroVideo.mov';
import Button from '../../Shared/Button';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';

const STATS: { valueKey: TranslationKey; labelKey: TranslationKey }[] = [
  { valueKey: 'hero.stat1.value', labelKey: 'hero.stat1.label' },
  { valueKey: 'hero.stat2.value', labelKey: 'hero.stat2.label' },
  { valueKey: 'hero.stat3.value', labelKey: 'hero.stat3.label' },
  { valueKey: 'hero.stat4.value', labelKey: 'hero.stat4.label' },
];

const ACCREDITATION_KEYS: TranslationKey[] = [
  'accreditation.ece',
  'accreditation.ukca',
  'accreditation.iso9001',
  'accreditation.iso14001',
];

const UpdatedHeroSection = () => {
  const { t } = useLanguage();
  return (
    <>
      <section className="min-h-screen-dvh relative w-full overflow-visible bg-[#0a1b3d] font-sans">
        <video
          className="absolute inset-0 h-full w-full object-cover object-top sm:object-center md:object-[center_42%]"
          src={heroVideo}
          poster={heroBg}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70" />

        <div className="relative z-10 mx-auto flex min-h-screen-dvh max-w-6xl items-center justify-center px-5 py-28 md:justify-start md:px-8 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px] 4xl:px-16">
          <FadeIn className="mx-auto mt-10 max-w-2xl text-center sm:mt-16 md:mx-0 md:mt-24 md:text-left 2xl:max-w-3xl 3xl:max-w-4xl">
            <span className="mb-5 inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white 2xl:px-5 2xl:py-2 2xl:text-xs 3xl:text-sm">
              {t('hero.badge')}
            </span>

            <h1 className="text-[34px] font-semibold leading-[1.16] text-white sm:text-[44px] md:text-[50px] 2xl:text-[58px] 3xl:text-[68px] 4xl:text-[78px]">
              {t('hero.titleLine1')} <br className="hidden sm:block" /> {t('hero.titleLine2')}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65 md:mx-0 2xl:max-w-2xl 2xl:text-lg 3xl:max-w-3xl 3xl:text-xl">
              {t('hero.description')}
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5 md:justify-start 2xl:mt-8 2xl:gap-6">
              <Button to="/tires" className="w-full sm:w-56 2xl:h-11 2xl:w-60 2xl:text-base 3xl:h-12 3xl:w-64 3xl:text-lg">
                {t('hero.cta')}
              </Button>
              {/* <Button to="/tires" variant="outline" className="btn-glossy w-full sm:w-56">
                Explore the range
              </Button> */}
            </div>
          </FadeIn>
        </div>

        {/* stats moved below so it can overlap the hero and next section */}
      </section>

      {/* Overlapping stats bar */}
      <div className="relative z-20 mx-auto -mt-4 max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-4 sm:-mt-6 md:-mt-14 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16">
        <FadeIn delay={0.15}>
          <div className="overflow-hidden rounded-2xl bg-[#0C3FB2] shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/25">
              {STATS.map((stat) => (
                <div key={stat.labelKey} className="px-4 py-4 text-center md:px-6 md:py-6 2xl:px-8 2xl:py-8 3xl:px-10 3xl:py-10">
                  <p className="text-2xl font-semibold leading-none text-white md:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl">
                    {t(stat.valueKey)}
                  </p>
                  <p className="mx-auto mt-2 max-w-[220px] text-xs font-light leading-snug text-white/85 md:text-sm 2xl:max-w-[260px] 2xl:mt-3 2xl:text-base 3xl:max-w-[300px] 3xl:text-lg">
                    {t(stat.labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <section className="px-5 pb-12 font-sans pt-10 py-10 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 md:pb-14 2xl:pt-14 2xl:pb-16 3xl:pt-16 3xl:pb-20">
        <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px]">
          <h2 className="text-center text-2xl font-semibold text-[#111111] md:text-3xl 2xl:text-4xl 3xl:text-5xl">
            {t('hero.accreditationsTitle')}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:mt-12 2xl:gap-6 3xl:mt-14 3xl:gap-8">
            {ACCREDITATION_KEYS.map((key, index) => (
              <FadeIn key={key} delay={index * 0.08}>
                <div className="rounded-md bg-[#F5F5F5] px-5 py-5 text-center text-base font-semibold text-[#1a1a1a] shadow-sm 2xl:px-6 2xl:py-7 2xl:text-lg 3xl:px-8 3xl:py-8 3xl:text-xl">
                  {t(key)}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdatedHeroSection;
