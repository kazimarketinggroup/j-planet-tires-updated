import { Link } from 'react-router-dom';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TranslationKey } from '../../../i18n/translations';

// Small flag image by ISO code (flagcdn) — renders consistently everywhere.
const Flag = ({ iso, className = '' }: { iso: string; className?: string }) => (
  <img
    src={`https://flagcdn.com/${iso.toLowerCase()}.svg`}
    alt=""
    loading="lazy"
    className={`h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/5 ${className}`}
  />
);

interface HubRow {
  iso: string;
  nameKey: TranslationKey;
  isHq?: boolean;
}

const HUB_ROWS: HubRow[] = [
  { iso: 'IQ', nameKey: 'operate.me.iraq', isHq: true },
  { iso: 'AE', nameKey: 'operate.me.dubai' },
  { iso: 'JO', nameKey: 'operate.me.jordan' },
];

interface RegionCard {
  iso: string;
  regionKey: TranslationKey;
  countryKey: TranslationKey;
  noteKey: TranslationKey;
}

const REGION_CARDS: RegionCard[] = [
  { iso: 'GB', regionKey: 'operate.europe.region', countryKey: 'operate.europe.country', noteKey: 'operate.europe.note' },
  { iso: 'KE', regionKey: 'operate.africa.region', countryKey: 'operate.africa.country', noteKey: 'operate.africa.note' },
  { iso: 'CN', regionKey: 'operate.asia.region', countryKey: 'operate.asia.country', noteKey: 'operate.asia.note' },
];

const WhereWeOperateSection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-[#eef3ea] font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 py-12 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 md:py-14 2xl:py-16">
        <FadeIn>
          <span className="inline-block rounded bg-[#e3ecd1] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#4b6a2f] 2xl:px-4 2xl:py-1.5 2xl:text-xs">
            {t('operate.badge')}
          </span>

          <h2 className="mt-3 text-2xl font-semibold text-[#111111] md:text-3xl 2xl:text-4xl">
            {t('operate.title')}
          </h2>
        </FadeIn>

        <div className="mt-6 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 2xl:mt-8 2xl:gap-5">
          {/* Middle East hub card */}
          <FadeIn className="h-full">
            <div className="flex h-full flex-col rounded-2xl bg-[#dce6d4] p-5 2xl:p-6">
              <h3 className="text-xl font-bold text-[#111111] 2xl:text-2xl">{t('operate.me.region')}</h3>
              <p className="mt-1.5 text-sm font-medium text-[#3f4a35]">{t('operate.me.note')}</p>

              <div className="mt-4 space-y-2.5">
                {HUB_ROWS.map((row) => (
                  <div key={row.nameKey} className="flex items-center justify-between gap-3 rounded-lg bg-white/40 px-3 py-2">
                    <span className="flex items-center gap-2.5 text-sm font-bold text-[#111111]">
                      <Flag iso={row.iso} />
                      {t(row.nameKey)}
                    </span>
                    {row.isHq ? (
                      <span className="rounded bg-[#1148c6] px-3 py-1 text-xs font-semibold text-white">
                        {t('operate.hq')}
                      </span>
                    ) : (
                      <span className="rounded border border-[#c3d1b6] bg-white/70 px-3 py-1 text-xs font-semibold text-[#3f4a35]">
                        {t('operate.branch')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Regional cards stack */}
          <div className="flex flex-col gap-4 2xl:gap-5">
            {REGION_CARDS.map((card, index) => (
              <FadeIn key={card.regionKey} delay={index * 0.1} className="h-full">
                <div className="rounded-2xl bg-[#dce6d4] p-4 2xl:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-[#111111] 2xl:text-xl">{t(card.regionKey)}</h3>
                    <span className="flex items-center gap-2 text-sm font-bold text-[#111111]">
                      <Flag iso={card.iso} />
                      {t(card.countryKey)}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <p className="text-[13px] font-medium text-[#3f4a35]">{t(card.noteKey)}</p>
                    <span className="shrink-0 rounded border border-[#c3d1b6] bg-white/70 px-3 py-1 text-xs font-semibold text-[#3f4a35]">
                      {t('operate.branch')}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn>
          <Link
            to="/contact"
            className="mt-5 inline-block text-sm font-semibold text-[#3f4a35] transition-colors hover:text-[#1148c6]"
          >
            {t('operate.fullDetails')}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};

export default WhereWeOperateSection;
