import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';

const CONTAINER =
  'mx-auto max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl px-5 md:px-8 2xl:px-10 3xl:px-12';

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}

const LegalPageLayout = ({ eyebrow, title, updated, intro, children }: LegalPageLayoutProps) => {
  const { t } = useLanguage();
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#0a1b3d]">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_0%,#12294f_0%,#0a1b3d_55%)]" />
        <div className="absolute inset-x-0 top-0 h-[5px] bg-[#1148c6]" />

        <div className={`relative z-10 ${CONTAINER} pb-14 pt-36 md:pb-16 md:pt-44 2xl:pt-52 2xl:pb-20`}>
          <FadeIn>
            <span className="inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white 2xl:text-xs">
              {eyebrow}
            </span>

            <h1 className="mt-5 text-[30px] font-semibold leading-[1.15] text-white sm:text-[38px] md:text-[46px] 2xl:text-[54px]">
              {title}
            </h1>

            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-white/45 2xl:text-sm">
              {updated}
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-base 2xl:max-w-3xl 2xl:text-lg 2xl:leading-8">
              {intro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="w-full bg-white">
        <div className={`${CONTAINER} py-14 md:py-20 2xl:py-24`}>
          <FadeIn>
            <div className="space-y-10 2xl:space-y-12">{children}</div>
          </FadeIn>

          <div className="mt-14 border-t border-gray-200 pt-8 2xl:mt-20">
            <p className="text-sm text-gray-500 2xl:text-base">
              {t('legal.questions')}{' '}
              <a
                href="mailto:info@jplanettire.co.uk"
                className="font-semibold text-[#1148c6] hover:text-[#0d39a0]"
              >
                info@jplanettire.co.uk
              </a>{' '}
              {t('legal.ukOr')}{' '}
              <a
                href="mailto:info@jplanettire.net"
                className="font-semibold text-[#1148c6] hover:text-[#0d39a0]"
              >
                info@jplanettire.net
              </a>{' '}
              {t('legal.uae')}
            </p>
            <Link
              to="/"
              className="mt-4 inline-block text-sm font-semibold text-[#111111] hover:text-[#1148c6] 2xl:text-base"
            >
              {t('legal.backHome')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// ---- reusable building blocks for legal copy ----

interface SectionProps {
  n?: number;
  title: string;
  children: ReactNode;
}

// A numbered legal section with a heading and body content.
export const LegalSection = ({ n, title, children }: SectionProps) => (
  <section className="scroll-mt-28">
    <h2 className="flex items-baseline gap-3 text-lg font-bold text-[#111111] md:text-xl 2xl:text-2xl">
      {n !== undefined && (
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#eef2fb] text-sm font-bold text-[#1148c6] 2xl:h-8 2xl:w-8 2xl:text-base">
          {n}
        </span>
      )}
      <span>{title}</span>
    </h2>
    <div className="mt-3 space-y-3 text-sm leading-7 text-gray-600 md:text-[15px] 2xl:text-base 2xl:leading-8 [&_a]:font-semibold [&_a]:text-[#1148c6] [&_a:hover]:text-[#0d39a0] [&_strong]:font-semibold [&_strong]:text-[#111111]">
      {children}
    </div>
  </section>
);

// Bulleted list styled consistently for legal copy.
export const LegalList = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-1 list-disc space-y-2 pl-5 marker:text-[#1148c6]">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export default LegalPageLayout;
