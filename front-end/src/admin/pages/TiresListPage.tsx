import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import {
  Plus,
  Search,
  Pencil,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  CircleGauge,
} from 'lucide-react';
import { toast } from 'sonner';
import Switch from '../components/Switch';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import { TableSkeleton } from '../components/Skeleton';
import {
  SEGMENT_BADGE_CLASSES,
  SEGMENT_LABELS,
  type Segment,
  type TireWithCategory,
} from '../types/database';
import {
  deleteTire,
  duplicateTire,
  fetchTiresWithCategory,
  setTirePublished,
} from '../lib/tiresApi';

const columnHelper = createColumnHelper<TireWithCategory>();

const TiresListPage = () => {
  const navigate = useNavigate();
  const [tires, setTires] = useState<TireWithCategory[] | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [deleteTarget, setDeleteTarget] = useState<TireWithCategory | null>(null);

  const load = async () => {
    try {
      setTires(await fetchTiresWithCategory());
    } catch {
      toast.error('Failed to load tires');
      setTires([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const segments = useMemo(() => {
    const set = new Set<Segment>();
    (tires ?? []).forEach((t) => t.category && set.add(t.category.segment));
    return Array.from(set);
  }, [tires]);

  const handleToggle = async (tire: TireWithCategory) => {
    const next = !tire.is_published;
    setTires((prev) =>
      prev ? prev.map((t) => (t.id === tire.id ? { ...t, is_published: next } : t)) : prev,
    );
    try {
      await setTirePublished(tire.id, next);
      toast.success(next ? 'Published' : 'Moved to draft');
    } catch {
      toast.error('Update failed');
      setTires((prev) =>
        prev ? prev.map((t) => (t.id === tire.id ? { ...t, is_published: !next } : t)) : prev,
      );
    }
  };

  const handleDuplicate = async (tire: TireWithCategory) => {
    try {
      const newId = await duplicateTire(tire.id);
      toast.success('Tire duplicated');
      navigate(`/admin/tires/${newId}/edit`);
    } catch {
      toast.error('Duplicate failed');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteTire(deleteTarget.id);
      toast.success('Tire deleted');
      setTires((prev) => (prev ? prev.filter((t) => t.id !== deleteTarget.id) : prev));
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleteTarget(null);
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('card_image_url', {
        header: '',
        enableColumnFilter: false,
        cell: (info) => {
          const url = info.getValue();
          return url ? (
            <img src={url} alt="" className="h-10 w-10 rounded-md border border-gray-200 object-cover" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-300">
              <ImageOff className="h-4 w-4" />
            </span>
          );
        },
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <Link
            to={`/admin/tires/${info.row.original.id}/edit`}
            className="font-medium text-gray-900 hover:text-blue-600"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor((row) => row.category?.segment ?? '', {
        id: 'segment',
        header: 'Category',
        filterFn: (row, _id, value) => !value || row.original.category?.segment === value,
        cell: (info) => {
          const cat = info.row.original.category;
          if (!cat) return <span className="text-xs text-gray-400">—</span>;
          return (
            <span className={`rounded px-2 py-0.5 text-xs font-medium ${SEGMENT_BADGE_CLASSES[cat.segment]}`}>
              {cat.name}
            </span>
          );
        },
      }),
      columnHelper.accessor('is_published', {
        header: 'Published',
        enableColumnFilter: false,
        cell: (info) => (
          <Switch checked={info.getValue()} onChange={() => handleToggle(info.row.original)} />
        ),
      }),
      columnHelper.accessor('updated_at', {
        header: 'Last Updated',
        enableColumnFilter: false,
        cell: (info) => {
          const v = info.getValue();
          return <span className="text-sm text-gray-500">{v ? new Date(v).toLocaleDateString() : '—'}</span>;
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: (info) => {
          const tire = info.row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <Link
                to={`/admin/tires/${tire.id}/edit`}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => handleDuplicate(tire)}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                title="Duplicate"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(tire)}
                className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        },
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const table = useReactTable({
    data: tires ?? [],
    columns,
    state: { globalFilter, columnFilters },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: (row, _columnId, value) =>
      row.original.name.toLowerCase().includes(String(value).toLowerCase()),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const segmentFilter = (columnFilters.find((f) => f.id === 'segment')?.value as string) ?? '';

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search by name…"
              className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={segmentFilter}
            onChange={(e) =>
              table.getColumn('segment')?.setFilterValue(e.target.value || undefined)
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All categories</option>
            {segments.map((s) => (
              <option key={s} value={s}>
                {SEGMENT_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        <Link
          to="/admin/tires/new"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add New Tire
        </Link>
      </div>

      {!tires ? (
        <TableSkeleton rows={8} cols={6} />
      ) : tires.length === 0 ? (
        <EmptyState
          icon={CircleGauge}
          title="No tires yet"
          description="Add your first tire to start building the catalogue."
          action={
            <Link
              to="/admin/tires/new"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add New Tire
            </Link>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <th key={header.id} className="px-4 py-3 font-semibold">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {table.getRowModel().rows.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-gray-500">No tires match your filters.</p>
          )}

          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <p className="text-sm text-gray-500">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-md border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-md border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete tire"
        message={`Delete "${deleteTarget?.name}"? This removes the tire and all its tabs, sizes, and specs. This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default TiresListPage;
