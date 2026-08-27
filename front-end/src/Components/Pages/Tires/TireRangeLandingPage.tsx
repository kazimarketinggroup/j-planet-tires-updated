import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import Head from '@/Components/Shared/Head';
import FadeIn from '@/Components/Shared/FadeIn';
import CtaBannerSection from '../Home/CtaBannerSection';
import TireFinderSection from './TireFinderSection';
import CategoryRangeSection from './CategoryRangeSection';
import { fetchCategoryTires } from './categoryFinderData';
import { useCategoryFinder } from './useCategoryFinder';
import AutoText from '../../../i18n/AutoText';
import type { Segment } from '../../../admin/types/database';
import { swrFetch } from '../../../lib/swrCache';
import { fetchPublishedTires, firstSize, type CatalogueTire } from './publicApi';
import { loadSpeedOf } from './tireFinder';
import { applyFinderMatch } from './useTireFinder';

interface RangeCopy {
  title: string;
  headTitle: string;
  headDescription: string;
  badge: string;
  subtitle: string;
  statsProductSub: string;
  originValue: string;
  originSub: string;
  introTitle: string;
  introParagraphs: string[];
  whyTitle: string;
  benefits: string[];
  rangeTitle: string;
  emptyText: string;
  viewAllLabel?: string;
  // Heading for the embedded Tire Finder, e.g. "PCR Tire Finder". Only needed
  // when showFinder is on.
  finderTitle?: string;
}

interface RangeImages {
  hero: string;
  feature: string;
  otherRange: string;
}

interface TireRangeLandingPageProps {
  segments: Segment[];
  copy: RangeCopy;
  images: RangeImages;
  maxCards?: number;
  // The "Explore Our Other Range" promo tile in the products grid. On by
  // default; TBR hides it since its grid is already full.
  showOtherRange?: boolean;
  // Render the products grid ABOVE the "Why Choose" band. Default keeps
  // Why-Choose first; PCR opts into range-first to match its design.
  rangeBeforeWhy?: boolean;
  // Swap the By-Size/By-Vehicle Tire Finder for the standalone category
  // find + sort explorer (PCR/TBR). Independent of the main /tires finder.
  useSizeExplorer?: boolean;
  // Show the search form above the range. Off for OTR, whose single product
  // makes a finder pointless.
  showFinder?: boolean;
}

const complianceItems = ['ECE R54 Certified', 'UKCA / E-Mark Approved', 'ISO 9001:2015', 'ISO 14001'];

const TireRangeLandingPage = ({
  segments,
  copy,
  images,
  maxCards = 6,
  showOtherRange = true,
  rangeBeforeWhy = false,
  useSizeExplorer = false,
  showFinder = true,
}: TireRangeLandingPageProps) => {
  const [tires, setTires] = useState<CatalogueTire[] | null>(null);

  // Category scope for this page — fixed, never user-selectable.
  const scope = useMemo(() => ({ segments }), [segments]);
  const scopeKey = segments.join('+');

  // Category pages fetch ONLY their own tyres (server-side filtered). The main
  // catalogue keeps its own unscoped fetch — the two paths stay independent.
  useEffect(() => {
    const load = useSizeExplorer
      ? { key: `tires:${scopeKey}`, fn: () => fetchCategoryTires(scope) }
      : { key: 'tires', fn: fetchPublishedTires };
    swrFetch(load.key, load.fn, (data) => setTires(data)).catch(() => {
      toast.error(`Could not load ${copy.title}`);
      setTires([]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copy.title, scopeKey, useSizeExplorer]);

  const segmentSet = useMemo(() => new Set<Segment>(segments), [segments]);
  // Defensive second pass: the scoped fetch already returns only this category,
  // so this is a no-op there; it still guards the unscoped OTR path.
  const rangeTires = useMemo(
    () => (tires ?? []).filter((tire) => tire.category?.segment && segmentSet.has(tire.category.segment)),
    [tires, segmentSet],
  );

  // Category-locked finder (PCR/TBR): its own state, its own server-scoped rows.
  // Pages without a finder (OTR) simply never surface it.
  const categoryFinder = useCategoryFinder(scope);
  const finderActive = showFinder && categoryFinder.match.active;
  const matchedTires = useMemo(
    () => applyFinderMatch(rangeTires, categoryFinder.match),
    [rangeTires, categoryFinder.match],
  );
  // What the range grid shows: the finder's matches when a search is active,
  // otherwise the whole (already category-scoped) range.
  const categoryGridTires = finderActive ? matchedTires : rangeTires;

  const totalSizes = useMemo(
    () => rangeTires.reduce((count, tire) => count + tire.sizes.length, 0),
    [rangeTires],
  );
  const visibleTires = categoryGridTires.slice(0, maxCards);

  const scrollToRange = () =>
    document.getElementById('range-products')?.scrollIntoView({ behavior: 'smooth' });

  // The "Explore Our Other Range" promo shares the products grid. When the last
  // row has empty columns, let the promo stretch across them so the row fills
  // instead of leaving a gap (most visible on the OTR page's single product).
  const freeColsLg = (3 - (visibleTires.length % 3)) % 3; // 0..2 empty lg columns
  const promoLgSpan = freeColsLg === 2 ? 'lg:col-span-2' : 'lg:col-span-1';
  const promoSmSpan = visibleTires.length % 2 === 1 ? 'sm:col-span-2' : 'sm:col-span-1';
  const promoSpanClass = `${promoSmSpan} ${promoLgSpan}`;

  return (
    <main className="bg-[#f3f3f3] font-sans text-[#151515]">
      <Head title={`${copy.title} | J.Planet Tire`} description={copy.headDescription} />

      <section className="relative min-h-[560px] overflow-hidden pt-36 text-white md:min-h-[620px]">
        <img src={images.hero} alt="" className="absolute inset-0 h-full w-full scale-105 object-cover" />
        {/* Light flat wash dims the whole photo a touch */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Left-weighted gradient keeps the heading legible over any image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        {/* Deepen the base so the green stats bar overlapping the hero reads cleanly */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[420px] max-w-6xl items-center px-5 md:px-8 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px]">
          <FadeIn className="max-w-xl pb-16">
            <span className="inline-flex items-center rounded-full border border-[#a6c637]/40 bg-[#6e9d2f]/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-sm backdrop-blur-sm">
              {copy.badge}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl 2xl:text-6xl">{copy.title}</h1>
            <p className="mt-5 max-w-md text-sm font-light leading-7 text-white/80 2xl:text-base">{copy.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#range-products"
                className="inline-flex min-w-40 items-center justify-center rounded-md bg-[#1148c6] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#1148c6]/25 transition-all hover:-translate-y-0.5 hover:bg-[#0d39a0]"
              >
                Find your tires
              </a>
              <a
                href="#why-range"
                className="inline-flex min-w-40 items-center justify-center rounded-md border border-white/35 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
              >
                Explore the range
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-20 max-w-6xl px-5 md:px-8 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px]">
        <FadeIn className="grid overflow-hidden rounded-2xl bg-gradient-to-r from-[#5a9f38] to-[#4c8f2f] text-white shadow-[0_20px_50px_rgba(29,60,18,0.28)] ring-1 ring-white/10 md:grid-cols-3">
          {[
            {
              value: tires ? rangeTires.length : '-',
              label: rangeTires.length === 1 ? 'Product' : 'Products',
              sub: copy.statsProductSub,
            },
            { value: tires ? totalSizes : '-', label: totalSizes === 1 ? 'Size' : 'Sizes', sub: 'Available' },
            { value: copy.originValue, label: '', sub: copy.originSub },
          ].map((stat, index) => (
            <div
              key={`${stat.value}-${stat.label}-${stat.sub}`}
              className={`px-6 py-8 text-center md:py-9 ${index > 0 ? 'border-t border-white/20 md:border-l md:border-t-0' : ''}`}
            >
              <p className="text-3xl font-bold leading-none tracking-tight md:text-[40px]">{stat.value}</p>
              {stat.label && <p className="mt-1.5 text-lg font-bold leading-none md:text-xl">{stat.label}</p>}
              <p className="mt-2.5 text-[11px] font-medium uppercase tracking-wide text-white/70">{stat.sub}</p>
            </div>
          ))}
        </FadeIn>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px]">
          <FadeIn className="max-w-5xl">
            <div className="mb-6 h-1 w-12 rounded-full bg-[#5a9f38]" />
            <h2 className="text-2xl font-bold tracking-tight md:text-[32px]">{copy.introTitle}</h2>
            <div className="mt-8 space-y-6 text-sm font-light leading-7 text-gray-500 2xl:text-base">
              {copy.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* By Size / By Vehicle search form, driven by the category-locked finder
          (server-scoped rows, isolated state). Hidden on OTR. */}
      {showFinder && (
        <div className="mt-10 md:mt-14">
          <TireFinderSection
            overlap={false}
            title={copy.finderTitle}
            mode={categoryFinder.mode}
            options={categoryFinder.options}
            size={categoryFinder.size}
            vehicle={categoryFinder.vehicle}
            onMode={categoryFinder.setMode}
            onSize={categoryFinder.setSize}
            onVehicle={categoryFinder.setVehicle}
            onFind={scrollToRange}
            onClear={categoryFinder.reset}
          />
        </div>
      )}

      {/* The "Why Choose" band and the products grid sit in a flex column so
          their visual order can flip. Default: Why first. PCR (rangeBeforeWhy)
          puts the products grid first to match its design. */}
      <div className="flex flex-col">
      <section
        id="why-range"
        className={`relative overflow-hidden py-24 text-white md:py-28 ${rangeBeforeWhy ? 'order-2' : 'order-1'}`}
      >
        <img src={images.feature} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px]">
          <FadeIn className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight md:text-[32px] 2xl:text-4xl">{copy.whyTitle}</h2>
            <ul className="mt-10 space-y-3.5">
              {copy.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm font-medium leading-6 text-white/90 backdrop-blur-sm 2xl:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8cc63f]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* PCR/TBR: full range grid with Models/All Sizes + Filter & Sort, operating
          only on this category's tyres (and narrowed further by its finder). */}
      {useSizeExplorer ? (
        <div className={rangeBeforeWhy ? 'order-1' : 'order-2'}>
          <CategoryRangeSection
            title={copy.rangeTitle}
            tires={categoryGridTires}
            loading={!tires || !categoryFinder.ready}
            emptyText={copy.emptyText}
            promoImage={showOtherRange ? images.otherRange : undefined}
          />
        </div>
      ) : (
      <section
        id="range-products"
        className={`mx-auto w-full max-w-6xl px-5 py-20 md:px-8 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px] ${
          rangeBeforeWhy ? 'order-1' : 'order-2'
        }`}
      >
        <FadeIn>
          <div className="mb-6 h-1 w-12 rounded-full bg-[#5a9f38]" />
          <h2 className="text-2xl font-bold tracking-tight md:text-[32px]">{copy.rangeTitle}</h2>
        </FadeIn>

        {!tires ? (
          <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: Math.min(maxCards, 6) }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-2xl border border-gray-100 bg-white shadow-sm" />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {visibleTires.map((tire, index) => {
                const first = firstSize(tire);
                const keyBenefit = tire.benefits?.[0] ?? 'Reliable performance';

                return (
                  <FadeIn key={tire.id} delay={index * 0.06} className="h-full">
                    <article className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-bold tracking-tight text-[#202020]">{tire.name}</h3>
                        <span className="shrink-0 rounded-full bg-[#eef5e3] px-2.5 py-1 text-right text-[10px] font-semibold uppercase tracking-wide text-[#5a8a2c]">
                          <AutoText>{tire.category?.name}</AutoText>
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm font-light leading-6 text-gray-600">
                        <AutoText>{tire.short_description || keyBenefit}</AutoText>
                      </p>
                      <div className="mt-5 flex flex-1 items-end justify-between gap-5 border-t border-gray-100 pt-5">
                        <dl className="space-y-4">
                          <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Full Size</dt>
                            <dd className="mt-1 text-sm font-semibold text-[#222222]">{tire.sizes.length}</dd>
                          </div>
                          <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Load/Speed</dt>
                            <dd className="mt-1 text-sm font-semibold text-[#222222]">{loadSpeedOf(first) ?? '-'}</dd>
                          </div>
                          <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Key Benefit</dt>
                            <dd className="mt-1 max-w-[170px] text-sm font-semibold text-[#222222]">{keyBenefit}</dd>
                          </div>
                        </dl>
                        {tire.card_image_url ? (
                          <img
                            src={tire.card_image_url}
                            alt={tire.name}
                            className="h-44 w-32 object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-44 w-32 items-center justify-center rounded-lg bg-gray-100 px-4 text-center text-xs font-semibold uppercase text-gray-400">
                            J.Planet Tire
                          </div>
                        )}
                      </div>
                      <Link
                        to={`/tires/${tire.slug}`}
                        className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#1148c6] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#0d39a0]"
                      >
                        View more specs & sizes
                      </Link>
                    </article>
                  </FadeIn>
                );
              })}

              {showOtherRange && !finderActive && (
                <FadeIn delay={0.3} className={`h-full ${promoSpanClass}`}>
                  <article className="group relative flex h-full min-h-[260px] overflow-hidden rounded-2xl p-7 text-white shadow-sm">
                    <img
                      src={images.otherRange}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/55 to-black/10" />
                    <div className="relative mt-auto">
                      <h3 className="text-2xl font-bold leading-tight tracking-tight">Explore Our Other Range</h3>
                      <p className="mt-4 max-w-xs text-sm font-light leading-6 text-white/82">
                        From passenger comfort to heavy-duty haulage, discover every category we manufacture.
                      </p>
                      <Link
                        to="/tires"
                        className="mt-7 inline-flex rounded-lg bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#111111] shadow-sm transition-colors hover:bg-[#e8eefc]"
                      >
                        View All Tires
                      </Link>
                    </div>
                  </article>
                </FadeIn>
              )}
            </div>

            {rangeTires.length === 0 && (
              <p className="mt-10 text-center text-sm font-semibold text-gray-500">{copy.emptyText}</p>
            )}

            {/* Active finder search that matched nothing in this category. */}
            {finderActive && matchedTires.length === 0 && rangeTires.length > 0 && (
              <div className="mt-10 flex flex-col items-center gap-4 text-center">
                <p className="text-sm font-semibold text-gray-500">
                  No tyres in this range match that selection.
                </p>
                <button
                  type="button"
                  onClick={categoryFinder.reset}
                  className="inline-flex rounded-lg border border-[#222222] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#222222] transition-colors hover:border-[#1148c6] hover:bg-[#1148c6] hover:text-white"
                >
                  Clear search
                </button>
              </div>
            )}

            {copy.viewAllLabel && !finderActive && rangeTires.length > maxCards && (
              <div className="mt-12 text-center">
                <Link
                  to="/tires"
                  className="inline-flex rounded-lg border border-[#222222] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#222222] transition-colors hover:border-[#1148c6] hover:bg-[#1148c6] hover:text-white"
                >
                  {copy.viewAllLabel}
                </Link>
              </div>
            )}
          </>
        )}
      </section>
      )}
      </div>

      <section className="bg-[#f7f7f7] py-20">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px]">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight md:text-[32px]">Accreditations &amp; Compliance</h2>
            <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {complianceItems.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-gray-100 bg-white px-5 py-5 text-sm font-semibold text-[#222222] shadow-sm transition-shadow hover:shadow-md"
                >
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Shared CTA banner — same one used on Home, About and the Tires catalogue */}
      <CtaBannerSection />
    </main>
  );
};

export default TireRangeLandingPage;
