// "Explore the [PCR/TBR] Range" grid for a category landing page.
//
// Mirrors the All Tires catalogue grid (Models / All Sizes toggle, Filter & Sort
// dropdown, search box, product cards) but operates ONLY on the tyres passed in,
// which are fetched already scoped to this page's category. Its state is local, so
// it never shares filters or results with the main catalogue or the other category.
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import FadeIn from '../../Shared/FadeIn';
import TireCard from './TireCard';
import SizeCard from './SizeCard';
import FilterSortPanel from './FilterSortPanel';
import { useLanguage } from '../../../i18n/LanguageContext';
import { applyFinder, deriveOptions, emptyFilters, emptySizeCriteria, emptyVehicleCriteria } from './tireFinder';
import { flattenSizes, sizeMatchesQuery, type CatalogueView, type SizeRow } from './sizeView';
import type { CatalogueTire } from './publicApi';

interface CategoryRangeSectionProps {
  title: string;
  tires: CatalogueTire[];
  loading: boolean;
  emptyText: string;
  // "Explore Our Other Range" promo tile, shown as the last cell of the models
  // grid when no search/filter is narrowing the results.
  promoImage?: string;
}

const INITIAL_VISIBLE = 9;

const CardSkeleton = () => (
  <div className="h-72 animate-pulse rounded-xl border border-gray-100 bg-gray-100" />
);

const CategoryRangeSection = ({
  title,
  tires,
  loading,
  emptyText,
  promoImage,
}: CategoryRangeSectionProps) => {
  const { t } = useLanguage();
  const [view, setView] = useState<CatalogueView>('models');
  const [filters, setFilters] = useState(emptyFilters());
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const isSizes = view === 'sizes';

  // Filter/sort options derived from THIS category's tyres only.
  const options = useMemo(() => deriveOptions(tires), [tires]);

  // Models list: the Filter & Sort panel + (in models view) the search box.
  const filteredTires = useMemo(
    () =>
      applyFinder(
        tires,
        'size',
        emptySizeCriteria(),
        emptyVehicleCriteria(),
        filters,
        isSizes ? '' : query,
      ),
    [tires, filters, query, isSizes],
  );

  // Sizes list: flatten the already-filtered models, then match the size query.
  const filteredSizes: SizeRow[] = useMemo(
    () => flattenSizes(filteredTires).filter((row) => sizeMatchesQuery(row, query)),
    [filteredTires, query],
  );

  const resultCount = isSizes ? filteredSizes.length : filteredTires.length;
  // True when a search or filter is narrowing the list (promo tile hides then).
  const hasNarrowedResults = query.trim() !== '' || filteredTires.length < tires.length;

  useEffect(() => {
    setVisible(INITIAL_VISIBLE);
  }, [view, query, filters, tires]);

  const clearAll = () => {
    setFilters(emptyFilters());
    setQuery('');
  };

  const changeView = (next: CatalogueView) => {
    setView(next);
    setQuery(''); // model search and size search target different text
  };

  return (
    <section id="range-products" className="w-full bg-[#f3f3f3]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px]">
        <FadeIn>
          <div className="mb-6 h-1 w-12 rounded-full bg-[#5a9f38]" />
          <h2 className="text-2xl font-bold tracking-tight text-[#111111] md:text-[32px]">{title}</h2>
        </FadeIn>

        {/* Models / All Sizes toggle */}
        <FadeIn delay={0.05} className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex w-fit shrink-0 rounded-lg bg-[#e9eaee] p-1">
            {(['models', 'sizes'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => changeView(v)}
                aria-pressed={view === v}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                  view === v ? 'bg-[#111111] text-white shadow-sm' : 'text-gray-500 hover:text-[#111111]'
                }`}
              >
                {v === 'models' ? t('catalogue.viewModels') : t('catalogue.viewSizes')}
              </button>
            ))}
          </div>

          {!loading && (
            <p className="text-sm text-gray-500">
              {t('catalogue.resultsCount').replace('{count}', String(resultCount))}
            </p>
          )}
        </FadeIn>

        {/* Search + Filter & Sort */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1148c6]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isSizes ? t('catalogue.searchSize') : t('catalogue.searchModel')}
              className="w-full rounded-md border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm font-medium text-gray-700 focus:border-[#1148c6] focus:outline-none"
            />
          </div>
          <FilterSortPanel
            options={options}
            filters={filters}
            resultCount={resultCount}
            onChange={setFilters}
            onClearAll={clearAll}
          />
        </div>

        {/* Results */}
        {loading ? (
          <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: INITIAL_VISIBLE }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : resultCount === 0 ? (
          <p className="py-16 text-center text-sm text-gray-500">
            {tires.length === 0 ? emptyText : t('catalogue.emptyNoMatch')}
          </p>
        ) : (
          <>
            <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {isSizes
                ? filteredSizes
                    .slice(0, visible)
                    .map((row, i) => (
                      <SizeCard key={row.size.id} row={row} delay={(i % INITIAL_VISIBLE) * 0.05} />
                    ))
                : filteredTires
                    .slice(0, visible)
                    .map((tire, i) => (
                      <TireCard key={tire.id} tire={tire} delay={(i % INITIAL_VISIBLE) * 0.05} />
                    ))}

              {/* Promo tile closes out the models grid when nothing is filtering. */}
              {promoImage && !isSizes && !hasNarrowedResults && visible >= resultCount && (
                <FadeIn delay={0.3} className="h-full">
                  <article className="group relative flex h-full min-h-[260px] overflow-hidden rounded-xl p-7 text-white shadow-sm">
                    <img
                      src={promoImage}
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

            {visible < resultCount && (
              <button
                type="button"
                onClick={() => setVisible((v) => v + INITIAL_VISIBLE)}
                className="mx-auto mt-10 block rounded-lg border border-[#222222] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#222222] transition-colors hover:border-[#1148c6] hover:bg-[#1148c6] hover:text-white"
              >
                {t('common.viewMore')}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryRangeSection;
