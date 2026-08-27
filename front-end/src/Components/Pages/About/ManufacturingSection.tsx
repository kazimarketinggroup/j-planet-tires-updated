import manufacturingBg from '../../../assets/about/semi-truck-wheels-shined-and-ready-for-transport-2026-03-20-03-30-19-utc 2.png';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';

const ManufacturingSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative w-full overflow-hidden bg-[#05070b] font-sans">
      <div
        className="absolute inset-0 bg-cover bg-[position:75%_center]"
        style={{ backgroundImage: `url(${manufacturingBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-[420px] max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] items-center px-5 py-16 md:px-8 2xl:px-10 3xl:px-12 md:py-24">
        <FadeIn className="max-w-xl">
          <span className="mb-6 inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            {t('manufacturing.badge')}
          </span>

          <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl lg:text-4xl 2xl:text-5xl">
            {t('manufacturing.title')}
          </h2>

          <p className="mt-6 text-base font-light leading-relaxed text-white/65">
            {t('manufacturing.p1')}
          </p>

          <p className="mt-4 text-base font-light leading-relaxed text-white/65">
            {t('manufacturing.p2')}
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default ManufacturingSection;
