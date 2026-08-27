import FadeIn from "../../Shared/FadeIn";
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';

const ACCREDITATION_KEYS: TranslationKey[] = [
  'accreditation.ece',
  'accreditation.ukca',
  'accreditation.iso9001',
  'accreditation.iso14001',
];

const SubSection = () => {
    const { t } = useLanguage();
    return (
        <div>
            <section className="px-5 pb-12 pt-10 font-sans md:px-8 2xl:px-10 3xl:px-12 md:pb-14">
        <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px]">
          <h2 className="text-center text-2xl font-semibold text-[#111111]">
            {t('hero.accreditationsTitle')}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACCREDITATION_KEYS.map((key, index) => (
              <FadeIn key={key} delay={index * 0.08}>
                <div className="rounded-md bg-[#F5F5F5] px-5 py-5 text-center text-base font-semibold text-[#1a1a1a] shadow-sm">
                  {t(key)}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default SubSection;