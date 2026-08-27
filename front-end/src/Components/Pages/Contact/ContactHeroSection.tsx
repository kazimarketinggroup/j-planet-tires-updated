import contactBg from '../../../assets/contact/passengerrow2 1.png';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';

const ContactHeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative w-full overflow-hidden bg-[#0a1b3d] font-sans">
      <div
        className="absolute inset-0 bg-cover bg-[position:80%_center]"
        style={{ backgroundImage: `url(${contactBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-screen-dvh max-w-6xl items-center justify-center px-5 py-28 md:justify-start md:px-8 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px]">
        <FadeIn className="mx-auto max-w-lg text-center md:mx-0 md:text-left">
          <span className="mb-5 inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            {t('contactPage.badge')}
          </span>

          <h1 className="text-[34px] font-semibold leading-[1.16] text-white sm:text-[40px] md:text-[46px] 2xl:text-[52px]">
            {t('contactPage.title')}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/65 md:mx-0 md:text-base">
            {t('contactPage.description')}
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactHeroSection;
