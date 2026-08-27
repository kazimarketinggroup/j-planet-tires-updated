import { Link } from 'react-router-dom';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import { sizeSpecList } from './sizeView';
import { sizeKey } from './sizeSlug';
import type { SizeRow } from './sizeView';

interface SizeCardProps {
  row: SizeRow;
  delay?: number;
}

const DASH = '—';

// One card per individual size (the "All Sizes" catalogue view). Shows whichever
// specs the size actually has and links to that size's detail page.
const SizeCard = ({ row, delay = 0 }: SizeCardProps) => {
  const { t } = useLanguage();
  const { size, tire } = row;

  const key = sizeKey(size);
  const to = key ? `/tires/${tire.slug}/${key}` : `/tires/${tire.slug}`;

  // Only populated specs, headline fields first (see sizeSpecList).
  const specs = sizeSpecList(size, t);

  return (
    <FadeIn delay={delay} className="h-full">
      <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-[#111111]">{size.size || DASH}</h3>
            {/* Tyre model name in the corner (e.g. CP661, Roadian HTX) */}
            <span className="shrink-0 text-right text-xs font-semibold text-[#4b6a2f]">{tire.name}</span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <dl className="flex-1 space-y-3">
              {specs.length === 0 ? (
                <p className="text-sm text-gray-400">{DASH}</p>
              ) : (
                specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-xs text-gray-400">{spec.label}</dt>
                    <dd className="text-sm font-semibold text-[#111111]">{spec.value || DASH}</dd>
                  </div>
                ))
              )}
            </dl>

            {tire.card_image_url ? (
              <img
                src={tire.card_image_url}
                alt={tire.name}
                className="h-36 w-28 shrink-0 object-contain"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="flex h-36 w-28 shrink-0 items-center justify-center rounded-lg bg-[#f7f7f7] px-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
                {tire.name}
              </span>
            )}
          </div>
        </div>

        <Link
          to={to}
          className="mt-5 inline-flex w-full items-center justify-center rounded bg-[#1148c6] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#0d39a0]"
        >
          {t('sizeCard.requestQuote')}
        </Link>
      </div>
    </FadeIn>
  );
};

export default SizeCard;
