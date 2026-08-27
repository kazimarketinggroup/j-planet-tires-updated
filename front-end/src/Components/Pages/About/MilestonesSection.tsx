// import { AppWindow, BarChart3, Blocks, Camera, Check, Cloud, Code, Cpu, Rocket } from 'lucide-react';
import { Check } from 'lucide-react';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';

// const MILESTONES: { labelKey: TranslationKey; descriptionKey: TranslationKey }[] = [
//   { labelKey: 'journey.m1.label', descriptionKey: 'journey.m1.description' },
//   { labelKey: 'journey.m2.label', descriptionKey: 'journey.m2.description' },
//   { labelKey: 'journey.m3.label', descriptionKey: 'journey.m3.description' },
//   { labelKey: 'journey.m4.label', descriptionKey: 'journey.m4.description' },
// ];

const EMISSION_POINT_KEYS: TranslationKey[] = ['journey.point1', 'journey.point2', 'journey.point3'];

// const LOGOS = [
//   { icon: AppWindow, label: 'Apply' },
//   { icon: Cpu, label: 'Techlify' },
//   { icon: Cloud, label: 'Cloudly' },
//   { icon: BarChart3, label: 'Marketly' },
//   { icon: Blocks, label: 'Blockly' },
//   { icon: Code, label: 'Software' },
//   { icon: Rocket, label: 'Startup' },
//   { icon: Camera, label: 'Camera' },
// ];

const MilestonesSection = () => {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-[#fafafa] font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 py-16 md:px-8 2xl:px-10 3xl:px-12 md:py-20">
        {/* <FadeIn className="text-center">
          <span className="inline-block rounded bg-[#e3ecd1] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#4b6a2f]">
            {t('journey.badge')}
          </span>
          <h2 className="mt-3 text-2xl font-semibold text-[#111111] md:text-3xl">{t('journey.title')}</h2>
        </FadeIn> */}
{/* 
        <div className="relative mx-auto mt-14 max-w-5xl 2xl:max-w-6xl">
          <div className="absolute left-[8%] right-[8%] top-[44px] hidden h-px bg-gray-300 sm:block" />
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((milestone, index) => (
              <FadeIn key={milestone.labelKey} delay={index * 0.08}>
                <div className="flex flex-col items-center px-4 text-center">
                  <p className="min-h-6 text-lg font-semibold leading-none text-[#1148c6] md:text-xl">
                    {t(milestone.labelKey)}
                  </p>
                  <span className="relative z-10 my-5 block h-4 w-4 rounded-full border-[3px] border-[#1148c6] bg-[#fafafa]" />
                  <p className="max-w-[240px] text-sm leading-relaxed text-gray-500 md:text-base">
                    {t(milestone.descriptionKey)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div> */}

        <div className="mt-16 rounded-3xl bg-[#5A9A3C]/20 px-6 py-10 md:px-12 md:py-14">
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch md:divide-x md:divide-[#b9c79e]">
            <FadeIn className="flex flex-col items-center justify-center text-center md:pr-10">
              <span className="inline-block rounded bg-white/70 px-3 py-1 mb-3 text-[10px] font-semibold uppercase tracking-wide text-[#3f6b2b]">
                {t('journey.sustainBadge')}
              </span>
              <p className="text-5xl font-bold tracking-tighter text-[#111111] md:text-6xl">
                35%&darr;
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#3f4a35] mx-auto">
                {t('journey.sustainStatDesc')}
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="md:pl-10">
              <h3 className="text-xl font-semibold text-[#111111] md:text-2xl">
                {t('journey.commitTitleLine1')} <br className="hidden sm:block" /> {t('journey.commitTitleLine2')}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#3f4a35]">
                {t('journey.commitDesc')}
              </p>

              <ul className="mt-5 space-y-2">
                {EMISSION_POINT_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-2.5 text-sm text-[#3f4a35]">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#4b6a2f]" strokeWidth={3} />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div className="mt-12 border-t border-[#b9c79e] pt-10 text-center">
            <FadeIn>
              <h3 className="text-xl font-semibold text-[#111111] md:text-2xl">
                {t('sustainability.tagline')}
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#3f4a35]">
                {t('journey.taglineDesc')}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* <div className="mt-16 text-center">
          <FadeIn>
            <h3 className="text-xl font-semibold text-[#111111] md:text-2xl">
              Trusted by leading UK fleet operators
            </h3>
          </FadeIn>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {LOGOS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-gray-400">
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default MilestonesSection;