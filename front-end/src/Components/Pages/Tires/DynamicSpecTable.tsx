import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cellValue, type ResolvedColumn } from '../../../admin/pages/tire-editor/sizeSpec';
import type { TireSize } from '../../../admin/types/database';
import AutoText from '../../../i18n/AutoText';
import { sizeKey } from './sizeSlug';

interface Props {
  groupName: string;
  columns: ResolvedColumn[];
  rows: TireSize[];
  /** Parent tire slug. When set, each row links to its own size detail page. */
  tireSlug?: string;
  /** Tooltip/aria label for the per-row link (translated by the caller). */
  viewLabel?: string;
}

const DASH = '–';

// Renders one tire's size group as a responsive table whose columns adapt to whatever
// tire_size_columns exist for that tire (common fields read real columns; custom read
// extra_specs). Missing cell values render as a dash.
const DynamicSpecTable = ({ groupName, columns, rows, tireSlug, viewLabel }: Props) => {
  const navigate = useNavigate();
  if (!columns.length) return null;

  // Only rows with a usable URL key get a link — the rest render an empty cell so
  // the columns stay aligned.
  const linkFor = (row: TireSize): string | null => {
    if (!tireSlug) return null;
    const key = sizeKey(row);
    return key ? `/tires/${tireSlug}/${key}` : null;
  };

  // Whole-row click. A <tr> cannot wrap its cells in an <a> (invalid markup that
  // also breaks table-fixed layout), so navigation is programmatic; the arrow
  // link in the last cell remains the keyboard/assistive-tech affordance.
  // Text selection and modifier-clicks are left alone so the row still behaves
  // like a table when someone is copying values out of it.
  const handleRowClick = (row: TireSize) => (event: React.MouseEvent<HTMLTableRowElement>) => {
    const to = linkFor(row);
    if (!to) return;
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if ((event.target as HTMLElement).closest('a,button')) return;
    if (window.getSelection()?.toString()) return;
    navigate(to);
  };

  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wide text-[#111111]"><AutoText>{groupName}</AutoText></h4>

      {/* Mobile cards */}
      <div className="mt-3 space-y-3 md:hidden">
        {rows.map((row) => (
          <article
            key={row.id}
            onClick={() => {
              const to = linkFor(row);
              if (to) navigate(to);
            }}
            className={`rounded-lg border border-gray-200 bg-white p-4 ${
              linkFor(row) ? 'cursor-pointer active:bg-blue-50/60' : ''
            }`}
          >
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              {columns.map((col) => (
                <div key={col.key} className="min-w-0">
                  <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    <AutoText>{col.label}</AutoText>
                  </dt>
                  <dd className="mt-0.5 break-words font-semibold text-[#111111]">
                    {cellValue(row, col) || DASH}
                  </dd>
                </div>
              ))}
            </dl>

            {/* The whole card navigates, so this is a cue rather than a second
                link — nesting one inside the clickable card would fire twice. */}
            {linkFor(row) && (
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1148c6]">
                {viewLabel}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            )}
          </article>
        ))}
      </div>

      {/* Desktop table */}
      <div className="mt-2 hidden overflow-hidden rounded-lg border border-gray-200 bg-white md:block">
        <table className="w-full table-fixed text-left text-[8px] leading-tight lg:text-[9px] xl:text-[10px]">
          <thead>
            <tr className="border-b border-gray-200 text-gray-400">
              {columns.map((col) => (
                <th key={col.key} className="break-words px-1.5 py-2 font-semibold lg:px-2">
                  <AutoText>{col.label}</AutoText>
                </th>
              ))}
              {tireSlug && <th className="w-24 pl-3 pr-2 py-2 lg:w-28" />}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={handleRowClick(row)}
                className={`group border-b border-gray-100 text-[#111111] last:border-0 ${
                  linkFor(row) ? 'cursor-pointer hover:bg-blue-50/60' : ''
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="break-words px-1.5 py-2 align-top font-medium lg:px-2"
                  >
                    {cellValue(row, col) || DASH}
                  </td>
                ))}
                {tireSlug && (
                  <td className="whitespace-nowrap pl-3 pr-2 py-2 align-top text-right">
                    {linkFor(row) && (
                      <Link
                        to={linkFor(row)!}
                        aria-label={`${viewLabel ?? 'View'}${row.size ? ` — ${row.size}` : ''}`}
                        className="inline-flex items-center gap-0.5 rounded font-semibold text-[#1148c6] transition-colors hover:text-[#0d39a0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1148c6]"
                      >
                        {viewLabel ?? 'View'}
                        <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                      </Link>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicSpecTable;
