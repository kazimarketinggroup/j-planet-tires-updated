import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImageOff, Loader2, Plus } from 'lucide-react';
import Head from '../../Shared/Head';
import tiresBg from '../../../assets/tiresDetails/Jplanet_Catalogue_Page12_Image1 1.png';
import FadeIn from '../../Shared/FadeIn';
import RatingBar from './RatingBar';
import TireCard from './TireCard';
import DynamicSpecTable from './DynamicSpecTable';
import QuoteModal from './QuoteModal';
import RecommendedPositionTab from './RecommendedPositionTab';
import { fetchRelatedTires, fetchTireBySlug, type CatalogueTire, type TireDetail } from './publicApi';
import { swrFetch } from '../../../lib/swrCache';
import { columnsFromDb, deriveColumnsFromSizes } from '../../../admin/pages/tire-editor/sizeSpec';
import { type TabType, type TireSize } from '../../../admin/types/database';
import { useLanguage } from '../../../i18n/LanguageContext';
import { localizeBadges } from '../../../i18n/localizeField';
import AutoText from '../../../i18n/AutoText';
import { useLocalizedField } from '../../../i18n/useAutoTranslate';
import type { TranslationKey } from '../../../i18n/translations';

const CONTAINER =
  'mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 md:px-8 2xl:px-10 3xl:px-12';

const TAB_KEYS: Record<TabType, TranslationKey> = {
  performance_indicator: 'tab.performance_indicator',
  product_features: 'tab.product_features',
  product_description: 'tab.product_description',
  size_technical_data: 'tab.size_technical_data',
  recommended_position: 'tab.recommended_position',
};

const buildAccordions = (t: (key: TranslationKey) => string) =>
  [
    {
      titleKey: 'acc1.title' as TranslationKey,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-[#111111]">{t('acc1.coverageTitle')}</h4>
            <p className="mt-2 text-sm leading-7 text-gray-600">{t('acc1.coverageBody')}</p>
          </div>

          <p className="text-sm leading-7 text-gray-600">
            <span className="font-semibold text-[#111111]">{t('acc1.warningLabel')}</span> {t('acc1.warningBody')}
          </p>

          <div>
            <h4 className="text-sm font-bold text-[#111111]">{t('acc1.claimsTitle')}</h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-600">
              <li>{t('acc1.claim1')}</li>
              <li>{t('acc1.claim2')}</li>
              <li>{t('acc1.claim3')}</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      titleKey: 'acc2.title' as TranslationKey,
      content: (
        <div className="space-y-6">
          <p className="text-sm leading-7 text-gray-600">{t('acc2.intro')}</p>

          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-600">
            <li>{t('acc2.item1')}</li>
            <li>{t('acc2.item2')}</li>
            <li>{t('acc2.item3')}</li>
            <li>{t('acc2.item4')}</li>
            <li>{t('acc2.item5')}</li>
          </ul>
        </div>
      ),
    },
  ] as const;

const DetailInfoAccordion = () => {
  const { t } = useLanguage();
  const accordions = buildAccordions(t);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (titleKey: string) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(titleKey)) next.delete(titleKey);
      else next.add(titleKey);
      return next;
    });
  };

  return (
    <section className="w-full bg-[#f3f3f3]">
      <div className={`${CONTAINER} py-10 md:py-12`}>
        <div className="mx-auto max-w-6xl space-y-3">
          {accordions.map((item) => {
            const open = openItems.has(item.titleKey);
            return (
              <div key={item.titleKey}>
                <button
                  type="button"
                  onClick={() => toggle(item.titleKey)}
                  aria-expanded={open}
                  className="flex h-10 w-full items-center justify-between rounded bg-[#1148c6] px-4 text-left text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0d39a0] md:h-9 md:px-5"
                >
                  <span>{t(item.titleKey)}</span>
                  <Plus className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                </button>

                {open && (
                  <div className="px-4 pb-7 pt-5 md:px-5 md:pb-8 md:pt-6">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TireDetailPage = () => {
  const { t, lang } = useLanguage();
  const { tireId } = useParams<{ tireId: string }>(); // slug
  const [tire, setTire] = useState<TireDetail | null | undefined>(undefined);
  const [related, setRelated] = useState<CatalogueTire[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('size_technical_data');
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    let active = true;
    if (!tireId) return;
    setTire(undefined);
    // Session-cached: a tire viewed before renders instantly while a background
    // refresh keeps the data current.
    swrFetch(`tire:${tireId}`, () => fetchTireBySlug(tireId), (data) => {
      if (!active) return;
      setTire(data);
      if (data?.tabs.length) setActiveTab(data.tabs[0].tab);
      if (data?.category_id) {
        swrFetch(
          `related:${data.category_id}:${data.id}`,
          () => fetchRelatedTires(data.category_id!, data.id),
          (r) => active && setRelated(r),
        ).catch(() => undefined);
      }
    }).catch(() => active && setTire(null));
    return () => {
      active = false;
    };
  }, [tireId]);

  const columns = useMemo(() => {
    if (!tire) return [];
    return tire.size_columns.length
      ? columnsFromDb(tire.size_columns)
      : deriveColumnsFromSizes(tire.sizes);
  }, [tire]);

  const sizeGroups = useMemo(() => {
    if (!tire) return [];
    const map = new Map<string, TireSize[]>();
    for (const s of tire.sizes) {
      const key = s.model_label || tire.name;
      const arr = map.get(key) ?? [];
      arr.push(s);
      map.set(key, arr);
    }
    const groups = Array.from(map, ([name, rows]) => ({ name, rows }));
    return groups.length === 1 ? [{ name: tire.name, rows: groups[0].rows }] : groups;
  }, [tire]);

  // Prefer the pre-translated DB columns (populated by the translate-tires
  // script for ar/ku/zh/sw); otherwise machine-translate the English at runtime,
  // which is what makes es/de/nl — and any missing column — actually translate.
  const subtitle = useLocalizedField(tire, 'subtitle');
  const description = useLocalizedField(tire, 'description'); // HTML — translateText keeps tags
  const shortDescription = useLocalizedField(tire, 'short_description');
  const localizedBadges = localizeBadges(tire, lang);
  // ar/ku/zh/sw carry a curated badge_label_<lang> column; those are already
  // translated. es/de/nl/en have none, so their (English) badges are machine-
  // translated at render via AutoText.
  const badgesPreTranslated =
    lang !== 'en' && Boolean((tire as unknown as Record<string, unknown> | null | undefined)?.[`badge_label_${lang}`]);
  const pageTitle = tire ? `${tire.name} | J.Planet Tire` : 'Tire Details | J.Planet Tire';
  const pageDescription = tire
    ? `Explore ${tire.name} by J.Planet Tire, including sizes, specifications, fitment guidance, and trade support for fleets and distributors.`
    : 'Explore J.Planet Tire tire details, specifications, and fitment guidance for fleets and distributors.';

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

  if (!tire) {
    return (
      <>
        <Head title={pageTitle} description={pageDescription} />
        <div className={`${CONTAINER} py-24 text-center font-sans`}>
          <h1 className="text-2xl font-semibold text-[#111111]">{t('detail.notFoundTitle')}</h1>
          <p className="mt-3 text-sm text-gray-500">{t('detail.notFoundDescription')}</p>
          <Link to="/tires" className="mt-6 inline-block text-sm font-semibold text-[#1148c6] hover:text-[#0d39a0]">
            {t('detail.notFoundBack')}
          </Link>
        </div>
      </>
    );
  }

  // Spec card uses the same card image shown on the catalogue page (fallback to hero).
  const cardImage = tire.card_image_url || tire.hero_image_url;
  const ctaLabel = tire.cta_label || t('detail.defaultCta');

  return (
    <>
      <Head title={pageTitle} description={pageDescription} />
      <div className="font-sans">
      {/* Hero */}
     <section className="relative min-h-screen-dvh flex h-[430px] w-full items-start overflow-hidden bg-[#0a1b3d] md:h-[500px] lg:h-[540px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${tire.hero_image_url || tiresBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        <div className={`relative z-10 w-full ${CONTAINER} pb-28 pt-40 md:pb-36 md:pt-48`}>
          <FadeIn className="mx-auto max-w-lg text-center md:mx-0 md:text-left">
            <div className="mb-5 flex flex-wrap justify-center gap-2 md:justify-start">
              {(localizedBadges.length > 0
                ? localizedBadges
                : [tire.category?.name ?? 'Tire']
              ).map((badge, i) => (
                <span
                  key={`${badge}-${i}`}
                  className="inline-block rounded border border-[#a6c637]/50 bg-[#2d5f2e]/45 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                >
                  {badgesPreTranslated ? badge : <AutoText>{badge}</AutoText>}
                </span>
              ))}
            </div>
            <h1 className="text-[34px] font-semibold leading-[1.16] text-white sm:text-[40px] md:text-[46px] 2xl:text-[52px]">
              {tire.name}
            </h1>
            {tire.subtitle && (
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65 md:mx-0 md:text-base">{subtitle}</p>
            )}
          </FadeIn>
        </div>
      </section>

  {/* Spec card */}
      <section className="relative z-20 -mt-12 w-full overflow-visible pb-10 md:-mt-32 md:pb-14 lg:-mt-36">
        <div className="absolute inset-x-0 bottom-0 top-12 bg-[#efefef] md:top-32 lg:top-36" />
        <div className={`relative ${CONTAINER}`}>
          <FadeIn>
            <div className="mx-auto grid min-h-[400px] max-w-5xl grid-cols-1 overflow-hidden rounded-xl bg-white shadow-xl md:min-h-[270px] md:grid-cols-[40%_60%] lg:min-h-[290px] 2xl:min-h-[310px]">
              {/* Image - Start side */}
              <div className="flex h-[230px] items-center justify-center bg-white p-5 md:h-full md:min-h-[270px] md:p-5 lg:min-h-[290px] lg:p-6 2xl:min-h-[310px]">
                {cardImage ? (
                  <img
                    src={cardImage}
                    alt={tire.name}
                    className="max-h-[220px] max-w-[285px] object-contain md:max-h-[275px] md:max-w-[335px] lg:max-h-[300px] lg:max-w-[360px] 2xl:max-h-[320px] 2xl:max-w-[390px]"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-gray-300">
                    <ImageOff className="h-10 w-10" />
                  </span>
                )}
              </div>

              {/* Content - End side */}
              <div className="flex min-h-[160px] flex-col justify-center border-t border-gray-200 p-5 md:min-h-[270px] md:border-s md:border-t-0 md:p-6 md:ps-10 lg:min-h-[290px] lg:p-7 lg:ps-11 2xl:min-h-[310px]">
                <div>
                  <div>
                    <h2 className="text-xl font-black leading-tight text-[#111111] md:text-[22px]">
                      {tire.name}
                    </h2>
                    {tire.subtitle && (
                      <p className="mt-1 text-sm font-semibold text-gray-500">{subtitle}</p>
                    )}
                  </div>

                  {tire.description ? (
                    <div
                      className="mt-4 space-y-2.5 text-[13px] leading-6 text-[#222222] [&_a]:text-[#1148c6] [&_li]:ml-4 [&_li]:list-disc [&_p]:m-0 [&_strong]:text-[#111111]"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  ) : (
                    tire.short_description && (
                      <p className="mt-4 text-[13px] leading-6 text-[#222222]">{shortDescription}</p>
                    )
                  )}

                  {tire.benefits && tire.benefits.length > 0 && (
                    <>
                      <p className="mt-5 text-lg font-black text-[#111111]">{t('detail.benefits')}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tire.benefits.map((benefit) => (
                          <span
                            key={benefit}
                            className="rounded bg-[#e3ecd1] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#111111]"
                          >
                            <AutoText>{benefit}</AutoText>
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setQuoteOpen(true)}
                    className="inline-flex h-10 items-center justify-center rounded bg-[#1148c6] px-6 text-center text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#0d39a0]"
                  >
                    <AutoText>{ctaLabel}</AutoText>
                  </button>
                  {tire.spec_sheet_url && (
                    <a
                      href={tire.spec_sheet_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded border border-gray-300 px-6 text-xs font-black uppercase tracking-wide text-[#111111] transition-colors hover:border-gray-400"
                    >
                      {t('detail.downloadSpec')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tabs */}
      <section className="w-full bg-white">
        <div className={`${CONTAINER} py-16 md:py-20`}>
          <div className="grid grid-cols-2 gap-2 border-b border-gray-200 sm:flex sm:gap-6">
            {tire.tabs.map((tab) => (
              <button
                key={tab.tab}
                type="button"
                onClick={() => setActiveTab(tab.tab)}
                className={`-mb-px min-h-12 border-b-2 px-1 pb-3 text-[10px] font-semibold uppercase leading-snug transition-colors sm:min-h-0 sm:whitespace-nowrap sm:px-0 sm:text-xs ${
                  activeTab === tab.tab
                    ? 'border-[#1148c6] text-[#1148c6]'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {t(TAB_KEYS[tab.tab])}
              </button>
            ))}
          </div>

          <div
            className={`mt-8 rounded-2xl bg-[#f7f7f7] p-4 ${
              activeTab === 'size_technical_data' ? 'md:p-2 lg:p-3' : 'md:p-10'
            }`}
          >
            {/* Performance */}
            {activeTab === 'performance_indicator' && (
              <div className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2">
                {tire.metrics.length === 0 ? (
                  <p className="text-sm text-gray-500">{t('detail.noPerformance')}</p>
                ) : (
                  tire.metrics.map((m) => (
                    <RatingBar key={m.id} label={m.label} value={m.score} max={m.max_score} />
                  ))
                )}
              </div>
            )}

            {/* Product features */}
            {activeTab === 'product_features' && (
              <div className="space-y-8">
                {tire.features_diagram_image_url && (
                  <div className="flex justify-center">
                    <img
                      src={tire.features_diagram_image_url}
                      alt={`${tire.name} features`}
                      className="w-full max-w-2xl object-contain"
                    />
                  </div>
                )}
                {tire.features.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {tire.features.map((f) => (
                      <div key={f.id} className="flex gap-3 rounded-lg bg-white p-4">
                        {f.icon_image_url && (
                          <img src={f.icon_image_url} alt="" className="h-8 w-8 shrink-0 object-contain" />
                        )}
                        <div>
                          <h4 className="text-sm font-semibold text-[#111111]"><AutoText>{f.title}</AutoText></h4>
                          {f.description && (
                            <p className="mt-1 text-xs leading-relaxed text-gray-500"><AutoText>{f.description}</AutoText></p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Product description */}
            {activeTab === 'product_description' &&
              (tire.product_description_image_url ? (
                <div className="flex justify-center">
                  <img
                    src={tire.product_description_image_url}
                    alt={`${tire.name} product description`}
                    className="w-full max-w-3xl object-contain"
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500">{t('detail.noDescription')}</p>
              ))}

            {/* Size / technical data */}
            {activeTab === 'size_technical_data' && (
              <div className="space-y-8">
                {sizeGroups.length === 0 || columns.length === 0 ? (
                  <p className="text-sm text-gray-500">{t('detail.noSize')}</p>
                ) : (
                  sizeGroups.map((group) => (
                    <DynamicSpecTable
                      key={group.name}
                      groupName={group.name}
                      columns={columns}
                      rows={group.rows}
                      tireSlug={tireId}
                      viewLabel={t('sizePage.viewDetails')}
                    />
                  ))
                )}

                <ul className="space-y-1 text-xs text-gray-400">
                  <li>{t('detail.disclaimer1')}</li>
                  <li>{t('detail.disclaimer2')}</li>
                </ul>
              </div>
            )}

            {/* Recommended positions */}
            {activeTab === 'recommended_position' && (
              <RecommendedPositionTab tireId={tire.id} />
            )}
          </div>
        </div>
      </section>

      <DetailInfoAccordion />

      {quoteOpen && <QuoteModal tire={tire} onClose={() => setQuoteOpen(false)} />}

      {/* Related */}
      {related.length > 0 && (
        <section className="w-full bg-[#f7f7f7]">
          <div className={`${CONTAINER} py-16 md:py-20`}>
            <h3 className="text-center text-xl font-semibold text-[#111111] md:text-2xl">
              {t('detail.otherOptions').replace('{category}', tire.category?.name ?? 'Tire')}
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, index) => (
                <TireCard key={r.id} tire={r} delay={index * 0.08} />
              ))}
            </div>
            <Link
              to="/tires"
              className="mx-auto mt-10 block text-center text-sm font-semibold text-[#111111] hover:text-[#1148c6]"
            >
              {t('common.viewMore')}
            </Link>
          </div>
        </section>
      )}
    </div>
    </>
  );
};

export default TireDetailPage;
