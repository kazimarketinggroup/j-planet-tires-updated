// Per-size detail page (/tires/:tireId/:sizeKey). Reuses the parent tire fetch —
// fetchTireBySlug already returns every size row plus the tire's column
// definitions, so one size needs no extra query.
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ImageOff, Loader2 } from 'lucide-react';
import Head from '../../Shared/Head';
import FadeIn from '../../Shared/FadeIn';
import { fetchTireBySlug, type TireDetail } from './publicApi';
import { swrFetch } from '../../../lib/swrCache';
import { cellValue, columnsFromDb, deriveColumnsFromSizes } from '../../../admin/pages/tire-editor/sizeSpec';
import QuoteModal from './QuoteModal';
import { erpNo, findSizeByKey, partNo, sizeKey } from './sizeSlug';
import { useLanguage } from '../../../i18n/LanguageContext';
import AutoText from '../../../i18n/AutoText';
import { useLocalizedField } from '../../../i18n/useAutoTranslate';

const CONTAINER =
  'mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 md:px-8 2xl:px-10 3xl:px-12';

const CARD = 'rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8';

const TireSizeDetailPage = () => {
  const { t } = useLanguage();
  const { tireId, sizeKey: sizeParam } = useParams<{ tireId: string; sizeKey: string }>();
  const [tire, setTire] = useState<TireDetail | null | undefined>(undefined);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    let active = true;
    if (!tireId) return;
    setTire(undefined);
    swrFetch(`tire:${tireId}`, () => fetchTireBySlug(tireId), (data) => {
      if (active) setTire(data);
    }).catch(() => active && setTire(null));
    return () => {
      active = false;
    };
  }, [tireId]);

  const size = useMemo(
    () => (tire && sizeParam ? findSizeByKey(tire.sizes, sizeParam) : undefined),
    [tire, sizeParam],
  );

  // Same column resolution the parent's spec table uses, so labels match exactly.
  const columns = useMemo(() => {
    if (!tire) return [];
    return tire.size_columns.length
      ? columnsFromDb(tire.size_columns)
      : deriveColumnsFromSizes(tire.sizes);
  }, [tire]);

  // Only rows that have a value — a spec grid full of dashes reads worse than a
  // shorter one. `size` is shown as the headline, so it is dropped here.
  const specRows = useMemo(() => {
    if (!size) return [];
    return columns
      .filter((col) => col.key !== 'size')
      .map((col) => ({ key: col.key, label: col.label, value: cellValue(size, col) }))
      .filter((row) => row.value !== '');
  }, [columns, size]);

  // Sibling sizes for the strip at the bottom; rows with no usable key get no page.
  const siblings = useMemo(() => (tire ? tire.sizes.filter((s) => sizeKey(s)) : []), [tire]);

  // Pre-translated DB column when present, else machine-translated at runtime
  // (covers es/de/nl). Must run before the early returns below to keep hook order
  // stable. Rendered raw (no AutoText) so already-translated text isn't re-sent.
  const shortDescription = useLocalizedField(tire, 'short_description');

  const tireName = tire?.name ?? '';
  const sizeLabel = size?.size ?? '';
  const pageTitle = size ? `${tireName} — ${sizeLabel} | J.Planet Tire` : 'Tire Size | J.Planet Tire';
  const pageDescription = size
    ? `Full technical specification for the ${tireName} in size ${sizeLabel}, including load index, dimensions and fitment data.`
    : 'J.Planet Tire size specifications.';

  if (tire === undefined) {
    return (
      <>
        <Head title={pageTitle} description={pageDescription} />
        <div className="flex min-h-[60vh] items-center justify-center text-gray-400">
          <Loader2 className="h-7 w-7 animate-spin" />
        </div>
      </>
    );
  }

  if (!tire || !size) {
    return (
      <>
        <Head title={pageTitle} description={pageDescription} />
        <div className={`${CONTAINER} py-24 text-center font-sans`}>
          <h1 className="text-2xl font-semibold text-[#111111]">{t('detail.notFoundTitle')}</h1>
          <p className="mt-3 text-sm text-gray-500">{t('detail.notFoundDescription')}</p>
          <Link
            to={tire ? `/tires/${tireId}` : '/tires'}
            className="mt-6 inline-block text-sm font-semibold text-[#1148c6] hover:text-[#0d39a0]"
          >
            {t('detail.notFoundBack')}
          </Link>
        </div>
      </>
    );
  }

  const cardImage = tire.card_image_url || tire.hero_image_url;
  const erp = erpNo(size);
  const part = partNo(size);
  const activeKey = sizeKey(size);

  return (
    <>
      <Head title={pageTitle} description={pageDescription} />
      <div className="min-h-screen bg-gray-50 pb-16 pt-28 font-sans md:pt-32">
        <div className={CONTAINER}>
          {/* Breadcrumb back to the parent tire */}
          <Link
            to={`/tires/${tireId}`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-[#111111]"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>
              {t('sizePage.backTo')} <AutoText>{tire.name}</AutoText>
            </span>
          </Link>

          {/* Hero: image left, identity right */}
          <FadeIn className={`${CARD} mt-4`}>
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,260px)_1fr] md:gap-10">
              <div className="flex h-48 items-center justify-center rounded-xl bg-gray-50 md:h-56">
                {cardImage ? (
                  <img src={cardImage} alt={tire.name} className="h-full w-full object-contain p-3" />
                ) : (
                  <ImageOff className="h-10 w-10 text-gray-300" />
                )}
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
                  <AutoText>{tire.name}</AutoText>
                </h1>

                <p className="mt-1 text-4xl font-black leading-tight text-[#1148c6] md:text-5xl">
                  {sizeLabel || '—'}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {erp && (
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      ERP {erp}
                    </span>
                  )}
                  {part && (
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                      Part {part}
                    </span>
                  )}
                  {tire.category?.name && (
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      <AutoText>{tire.category.name}</AutoText>
                    </span>
                  )}
                  {size.model_label && (
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                      <AutoText>{size.model_label}</AutoText>
                    </span>
                  )}
                </div>

                {shortDescription && (
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
                    {shortDescription}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="mt-5 inline-block rounded-lg bg-[#1148c6] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0d39a0]"
                >
                  {tire.cta_label || t('detail.defaultCta')}
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Full specification */}
          <FadeIn className={`${CARD} mt-5`}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#111111]">
              {t('sizePage.specTitle')}
            </h2>

            {specRows.length === 0 ? (
              <p className="mt-4 text-sm text-gray-500">{t('detail.noSize')}</p>
            ) : (
              <dl className="mt-4 grid grid-cols-1 gap-x-10 md:grid-cols-2">
                {specRows.map((row) => (
                  <div
                    key={row.key}
                    className="flex items-baseline justify-between gap-4 border-b border-gray-100 py-3 last:border-0"
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      <AutoText>{row.label}</AutoText>
                    </dt>
                    <dd className="text-right text-sm font-semibold text-gray-900">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-5 space-y-1 text-xs text-gray-400">
              <li>{t('detail.disclaimer1')}</li>
              <li>{t('detail.disclaimer2')}</li>
            </ul>
          </FadeIn>

          {/* Sibling sizes */}
          {siblings.length > 1 && (
            <FadeIn className="mt-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#111111]">
                {t('sizePage.otherSizes')}
              </h2>

              <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {siblings.map((s) => {
                  const key = sizeKey(s);
                  const isActive = key === activeKey;
                  return (
                    <Link
                      key={s.id}
                      to={`/tires/${tireId}/${key}`}
                      aria-current={isActive ? 'page' : undefined}
                      className={`shrink-0 rounded-xl border px-4 py-3 text-center transition-colors ${
                        isActive
                          ? 'border-[#1148c6] bg-blue-50 text-[#1148c6]'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <p className="text-sm font-bold">{s.size || '—'}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{erpNo(s) || s.load_index || '—'}</p>
                    </Link>
                  );
                })}
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {quoteOpen && (
        <QuoteModal tire={tire} onClose={() => setQuoteOpen(false)} initialSizeId={size.id} />
      )}
    </>
  );
};

export default TireSizeDetailPage;
