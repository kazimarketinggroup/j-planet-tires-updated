import { Check } from 'lucide-react';
import aboutHeroBg from '../../../assets/about/truck-tractor-unit-prime-mover-traction-unit-in-2026-03-24-11-06-29-utc 1.png';
import Button from '../../Shared/Button';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';

const HIGHLIGHTS: { titleKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  { titleKey: 'aboutPage.h1.title', descriptionKey: 'aboutPage.h1.description' },
  { titleKey: 'aboutPage.h2.title', descriptionKey: 'aboutPage.h2.description' },
  { titleKey: 'aboutPage.h3.title', descriptionKey: 'aboutPage.h3.description' },
];

const AboutHeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative w-full overflow-visible bg-[#0a1b3d] font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-[center_42%]"
        style={{ backgroundImage: `url(${aboutHeroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85" />

      <div className="relative z-10 mx-auto flex min-h-screen-dvh max-w-6xl items-center justify-center px-5 py-36 md:justify-start md:px-8 md:py-44 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px]">
        <FadeIn className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <span className="mb-8 inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            {t('aboutPage.badge')}
          </span>

          <h1 className="text-[34px] font-semibold leading-[1.16] text-white sm:text-[44px] md:text-[50px] 2xl:text-[58px]">
            {t('aboutPage.titleLine1')} <br className="hidden sm:block" /> {t('aboutPage.titleLine2')}
          </h1>

          <ul className="mx-auto mt-6 max-w-xl space-y-3 sm:max-w-2xl md:mx-0 lg:max-w-3xl">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item.titleKey}
                className="flex items-start gap-2.5 text-left text-[15px] leading-relaxed text-white/65"
              >
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[#a6c637]" strokeWidth={3} />
                <span>
                  <span className="text-white">{t(item.titleKey)}</span> - {t(item.descriptionKey)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 md:justify-start">
            <Button to="/tires">{t('hero.cta')}</Button>
            {/* <Button to="/tires" variant="outline">
              Explore the range
            </Button> */}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutHeroSection;