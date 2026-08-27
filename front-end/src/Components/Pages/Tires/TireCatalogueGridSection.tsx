import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import TireCard from './TireCard';
import SizeCard from './SizeCard';
import FilterSortPanel from './FilterSortPanel';
import { useLanguage } from '../../../i18n/LanguageContext';
import AutoText from '../../../i18n/AutoText';
import type { CatalogueTire } from './publicApi';
import type { CatalogueView, SizeRow } from './sizeView';
import type { FilterCriteria, FinderOptions } from './tireFinder';

const INITIAL_VISIBLE_COUNT = 9;

interface CategoryTab {
  id: string;
  name: string;
  count: number;
}

interface TireCatalogueGridSectionProps {
  view: CatalogueView;
  onViewChange: (view: CatalogueView) => void;
  tires: CatalogueTire[] | null; // null = loading
  sizeRows: SizeRow[] | null; // null = loading; used when view === 'sizes'
  totalCount: number;
  options: FinderOptions;
  filters: FilterCriteria;
  query: string;
  categoryTabs: CategoryTab[];
  activeCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
  onFilters: (filters: FilterCriteria) => void;
  onQuery: (query: string) => void;
  onClearAll: () => void;
}

const CardSkeleton = () => (
  <div className="h-72 animate-pulse rounded-xl border border-gray-100 bg-gray-100" />
);

const TireCatalogueGridSection = ({
  view,
  onViewChange,
  tires,
  sizeRows,
  totalCount,
  options,
  filters,
  query,
  categoryTabs,
  activeCategoryId,
  onCategoryChange,
  onFilters,
  onQuery,
  onClearAll,
}: TireCatalogueGridSectionProps) => {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const isSizes = view === 'sizes';
  // The list actually rendered, plus its loading flag, depends on the view.
  const resultCount = isSizes ? sizeRows?.length ?? 0 : tires?.length ?? 0;
  const loading = isSizes ? sizeRows === null : tires === null;

  // Reset paging when the result set or the view changes.
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [tires, sizeRows, view]);

  return (
    <section id="tire-catalogue" className="w-full bg-white font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 pt-8 pb-16 md:px-8 2xl:px-10 3xl:px-12 md:pt-10 md:pb-20">
        {/* Models / All Sizes toggle + category tabs */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="inline-flex shrink-0 rounded-lg bg-[#f1f2f5] p-1">
            {(['sizes', 'models'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onViewChange(v)}
                aria-pressed={view === v}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                  view === v ? 'bg-[#111111] text-white shadow-sm' : 'text-gray-500 hover:text-[#111111]'
                }`}
              >
                {v === 'models' ? t('catalogue.viewModels') : t('catalogue.viewSizes')}
              </button>
            ))}
          </div>

          {categoryTabs.length > 0 && (
            <div className="flex flex-wrap gap-2.5 md:justify-end">
            <button
              type="button"
              onClick={() => onCategoryChange('')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategoryId === ''
                  ? 'bg-[#1148c6] text-white'
                  : 'bg-[#eef1f8] text-gray-600 hover:bg-[#e2e7f4]'
              }`}
            >
              {t('catalogue.allTires')} ({totalCount})
            </button>
            {categoryTabs.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategoryId === cat.id
                    ? 'bg-[#1148c6] text-white'
                    : 'bg-[#eef1f8] text-gray-600 hover:bg-[#e2e7f4]'
                }`}
              >
                <AutoText>{cat.name}</AutoText> ({cat.count})
              </button>
            ))}
            </div>
          )}
        </div>

        {/* Result count */}
        {!loading && (
          <p className="mb-4 text-sm text-gray-500">
            {t('catalogue.resultsCount').replace('{count}', String(resultCount))}
          </p>
        )}

        {/* Search + Filter & Sort */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1148c6]" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder={isSizes ? t('catalogue.searchSize') : t('catalogue.searchModel')}
              className="w-full rounded-md border border-gray-200 bg-[#f7f7f9] py-2.5 pl-9 pr-9 text-sm font-medium text-gray-700 focus:border-[#1148c6] focus:outline-none"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1148c6]" />
          </div>
          <FilterSortPanel
            options={options}
            filters={filters}
            resultCount={resultCount}
            onChange={onFilters}
            onClearAll={onClearAll}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: INITIAL_VISIBLE_COUNT }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {resultCount === 0 ? (
              <p className="py-16 text-center text-sm text-gray-500">
                {totalCount === 0 ? t('catalogue.emptyNone') : t('catalogue.emptyNoMatch')}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {isSizes
                  ? (sizeRows ?? []).slice(0, visibleCount).map((row, index) => (
                      <SizeCard
                        key={row.size.id}
                        row={row}
                        delay={(index % INITIAL_VISIBLE_COUNT) * 0.06}
                      />
                    ))
                  : (tires ?? []).slice(0, visibleCount).map((tire, index) => (
                      <TireCard key={tire.id} tire={tire} delay={(index % INITIAL_VISIBLE_COUNT) * 0.06} />
                    ))}
              </div>
            )}

            {visibleCount < resultCount && (
              <button
                type="button"
                onClick={() => setVisibleCount(resultCount)}
                className="mx-auto mt-10 block text-sm font-semibold text-[#111111] hover:text-[#1148c6]"
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

export default TireCatalogueGridSection;
