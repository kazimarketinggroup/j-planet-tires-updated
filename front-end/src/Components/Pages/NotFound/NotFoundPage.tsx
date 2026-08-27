import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';
import tiresBg from '../../../assets/tires/Screenshot 2026-06-20 181440 1.png';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';

const QUICK_LINKS: { labelKey: TranslationKey; to: string }[] = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.tires', to: '/tires' },
  { labelKey: 'nav.news', to: '/news' },
  { labelKey: 'nav.contact', to: '/contact' },
];

const CONTAINER =
  'mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 md:px-8 2xl:px-10 3xl:px-12';

const NotFoundPage = () => {
  const { t } = useLanguage();
  return (
    <main className="relative flex min-h-screen-dvh w-full flex-col overflow-hidden bg-[#0a1b3d] font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${tiresBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <section className={`relative z-10 flex flex-1 items-center py-16 sm:py-20 md:py-24 ${CONTAINER}`}>
        <FadeIn className="mx-auto w-full max-w-2xl text-center 2xl:max-w-3xl md:mx-0 md:text-left">
          <p
            aria-hidden="true"
            className="select-none text-[92px] font-black leading-none tracking-tight text-white/10 sm:text-[140px] md:text-[160px] 2xl:text-[190px]"
          >
            404
          </p>

          <span className="-mt-6 inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white sm:-mt-10 md:-mt-14">
            {t('nf.badge')}
          </span>

          <h1 className="mt-5 text-[28px] font-semibold leading-[1.15] text-white sm:text-[36px] md:mt-6 md:text-[46px] 2xl:text-[52px]">
            {t('nf.title')}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base md:mx-0">
            {t('nf.description')}
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start md:gap-4">
            <Link
              to="/tires"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded bg-[#1148c6] px-6 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#0d39a0] sm:w-auto md:h-12 md:px-7 md:text-sm"
            >
              <Search className="h-4 w-4 shrink-0" />
              {t('nf.browse')}
            </Link>
            <Link
              to="/"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded border border-white/30 px-6 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-[#111132] sm:w-auto md:h-12 md:px-7 md:text-sm"
            >
              <Home className="h-4 w-4 shrink-0" />
              {t('nf.home')}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            {t('nf.back')}
          </button>

          <div className="mt-8 border-t border-white/15 pt-5 sm:mt-10 sm:pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
              {t('nf.explore')}
            </p>
            <nav
              aria-label="Quick links"
              className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start"
            >
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>
        </FadeIn>
      </section>
    </main>
  );
};

export default NotFoundPage;
