import { Link } from 'react-router-dom';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import { useAutoTranslate, useLocalizedField } from '../../../i18n/useAutoTranslate';
import { firstSize, type CatalogueTire } from './publicApi';
import { loadSpeedOf } from './tireFinder';

interface TireCardProps {
  tire: CatalogueTire;
  delay?: number;
}

const TireCard = ({ tire, delay = 0 }: TireCardProps) => {
  const { t } = useLanguage();
  const keyBenefit = tire.benefits?.[0];
  const rawSize = firstSize(tire);
  const sizeCount = tire.sizes.length;
  // Category & benefit have no DB translation columns — machine-translate them
  // (glossary first, then MyMemory/Chrome cache) at runtime.
  const categoryName = useAutoTranslate(tire.category?.name);
  const translatedKeyBenefit = useAutoTranslate(keyBenefit);

  // Short description: pre-translated DB column when present, else machine-
  // translated at runtime (covers es/de/nl and any missing column).
  const localizedShort = useLocalizedField(tire, 'short_description');
  const description =
    localizedShort ||
    translatedKeyBenefit ||
    (tire.category ? t('card.designedFor').replace('{name}', categoryName) : t('card.fallbackExplore'));
  const primarySpec =
    rawSize?.size || rawSize?.model_label || rawSize?.pattern || tire.category?.name || tire.name;
  const secondarySpec = loadSpeedOf(rawSize);
  const size = rawSize
    ? { ...rawSize, size: primarySpec, load_index: secondarySpec }
    : ({ size: primarySpec, load_index: secondarySpec } as ReturnType<typeof firstSize>);

  return (
    <FadeIn delay={delay} className="h-full">
      <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-[#111111]">{tire.name}</h3>
            {tire.category && (
              <span className="shrink-0 text-xs font-semibold text-[#4b6a2f]">{categoryName}</span>
            )}
          </div>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">{description}</p>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between gap-4">
              <dl className="flex-1 space-y-2.5">
                <div>
                  <dt className="text-xs text-gray-400">{t('card.sizes')}</dt>
                  <dd className="text-sm font-semibold text-[#111111]">
                    {sizeCount} {sizeCount === 1 ? t('card.sizeSingular') : t('card.sizePlural')}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">{t('card.loadSpeed')}</dt>
                  <dd className="text-sm font-semibold text-[#111111]">{size?.load_index ?? '—'}</dd>
                </div>
                {keyBenefit && (
                  <div>
                    <dt className="text-xs text-gray-400">{t('card.keyBenefit')}</dt>
                    <dd className="text-sm font-semibold text-[#111111]">{translatedKeyBenefit}</dd>
                  </div>
                )}
              </dl>

              {tire.card_image_url ? (
                <img
                  src={tire.card_image_url}
                  alt={tire.name}
                  className="h-36 w-28 shrink-0 object-contain"
                />
              ) : (
                <span className="flex h-36 w-28 shrink-0 items-center justify-center rounded-lg bg-[#f7f7f7] px-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {tire.category?.name || tire.name}
                </span>
              )}
            </div>
          </div>
        </div>

        <Link
          to={`/tires/${tire.slug}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded bg-[#1148c6] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#0d39a0]"
        >
          {t('card.viewMore')}
        </Link>
      </div>
    </FadeIn>
  );
};

export default TireCard;
