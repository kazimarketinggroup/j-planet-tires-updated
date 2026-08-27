import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import { Search, UploadCloud, AlertCircle, Loader2, Check, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import { fetchTiresWithCategory } from '../lib/tiresApi';
import { TableSkeleton } from '../components/Skeleton';
import { SEGMENT_BADGE_CLASSES, SEGMENT_LABELS, type TireWithCategory } from '../types/database';
import { valuesToPayload } from './tire-editor/sizeSpec';
import { replaceSizeColumns } from './tire-editor/editorApi';
import { parseCsv, type CsvParseResult } from './tire-editor/sizeCsv';

const ImportPage = () => {
  const [tires, setTires] = useState<TireWithCategory[] | null>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<TireWithCategory | null>(null);
  const [parsed, setParsed] = useState<CsvParseResult | null>(null);
  const [fileName, setFileName] = useState('');
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchTiresWithCategory()
      .then(setTires)
      .catch(() => {
        toast.error('Failed to load tires');
        setTires([]);
      });
  }, []);

  const filtered = (tires ?? []).filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleFile = (file: File | undefined) => {
    if (!file || !selected) return;
    setFileName(file.name);
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const result = parseCsv(res.data, res.meta.fields ?? []);
        setParsed(result);
        if (!result.rows.length) toast.error('No rows found in CSV');
        else if (!result.columns.length) toast.error('No columns detected in CSV header');
      },
      error: () => toast.error('Failed to parse CSV'),
    });
  };

  const columns = parsed?.columns ?? [];
  const results = parsed?.rows ?? [];
  const errorCount = results.filter((r) => r.errors.length).length;

  const doImport = async () => {
    if (!selected || !parsed) return;
    setImporting(true);
    try {
      const rows = parsed.rows.map(
        (r, i) => valuesToPayload(r.row, columns, selected.id, i) as Record<string, unknown>,
      );
      // Importing replaces this tire's size rows rather than appending, so re-uploading a
      // corrected CSV (e.g. fixing a swapped/misread column) doesn't leave stale duplicates.
      const { error: deleteError } = await supabase
        .from('tire_sizes')
        .delete()
        .eq('tire_id', selected.id);
      if (deleteError) throw deleteError;
      const { error } = await supabase.from('tire_sizes').insert(rows);
      if (error) throw error;
      // Keep the tire's column definitions in sync with this import.
      await replaceSizeColumns(selected.id, columns);
      toast.success(`Imported ${rows.length} size rows`);
      setParsed(null);
      setFileName('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl min-w-0 space-y-6">
      {/* Step 1: choose tire */}
      <section className="min-w-0 rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-900">1. Select a tire</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose the tire to add size rows to, or{' '}
          <Link to="/admin/tires/new" className="font-medium text-blue-600 hover:text-blue-700">
            create a new one
          </Link>
          .
        </p>

        {selected ? (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50/50 p-3">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">{selected.name}</span>
              {selected.category && (
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${SEGMENT_BADGE_CLASSES[selected.category.segment]}`}>
                  {SEGMENT_LABELS[selected.category.segment]}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setParsed(null);
              }}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Change
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tires…"
                className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {!tires ? (
              <div className="mt-3">
                <TableSkeleton rows={4} cols={2} />
              </div>
            ) : (
              <ul className="mt-3 max-h-60 divide-y divide-gray-100 overflow-y-auto rounded-lg border border-gray-200">
                {filtered.length === 0 ? (
                  <li className="px-4 py-6 text-center text-sm text-gray-500">No tires found.</li>
                ) : (
                  filtered.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => setSelected(t)}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50"
                      >
                        <span className="text-sm font-medium text-gray-900">{t.name}</span>
                        {t.category && (
                          <span className={`rounded px-2 py-0.5 text-xs font-medium ${SEGMENT_BADGE_CLASSES[t.category.segment]}`}>
                            {SEGMENT_LABELS[t.category.segment]}
                          </span>
                        )}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* Step 2: upload + preview */}
      {selected && (
        <section className="min-w-0 rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">2. Upload CSV</h2>
          <p className="mt-1 text-sm text-gray-500">
            Columns are detected automatically from the header row. Known fields (Size, Load Index,
            Section Width, etc.) are stored as common columns; anything else becomes a custom column.
            A <span className="font-medium">Model</span> column groups rows under a sub-heading.
          </p>
          <p className="mt-1 text-sm text-amber-600">
            Importing replaces any size rows already saved for this tire — re-uploading a corrected
            CSV is safe and won&apos;t create duplicates.
          </p>

          {!parsed ? (
            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 py-12 text-gray-500 hover:border-blue-400 hover:text-blue-500">
              <UploadCloud className="h-8 w-8" />
              <span className="text-sm font-medium">Click to upload a CSV file</span>
              <input
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
          ) : (
            <div className="mt-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="min-w-0 break-words text-gray-600">
                  <span className="font-medium text-gray-900">{fileName}</span> — {results.length} rows
                </span>
                {errorCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errorCount} with warnings
                  </span>
                )}
              </div>

              <div className="max-h-80 max-w-full overflow-y-auto overflow-x-hidden rounded-lg border border-gray-200">
                <table className="w-full table-fixed text-left text-xs">
                  <thead className="sticky top-0 border-b border-gray-200 bg-gray-50 text-[11px] uppercase text-gray-500">
                    <tr>
                      <th className="w-[18%] px-2 py-2 font-semibold">Model</th>
                      {columns.map((c) => (
                        <th key={c.key} className="px-2 py-2 font-semibold">
                          <span className="flex flex-wrap items-center gap-1.5 break-words">
                            {c.label}
                            <span
                              className={`rounded px-1.5 py-0.5 text-[9px] font-semibold normal-case ${
                                c.isCommon
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-violet-100 text-violet-700'
                              }`}
                            >
                              {c.isCommon ? 'Common' : 'Custom'}
                            </span>
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {results.map((r) => (
                      <tr key={r.row._key} className={r.errors.length ? 'bg-red-50' : ''}>
                        <td className="break-words px-2 py-1.5 font-medium">{r.row.model_label || '—'}</td>
                        {columns.map((c) => (
                          <td key={c.key} className="break-words px-2 py-1.5">
                            {r.row.values[c.key] || ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setParsed(null);
                    setFileName('');
                  }}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Choose another file
                </button>
                <button
                  type="button"
                  onClick={doImport}
                  disabled={importing}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Import {results.length} Rows
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default ImportPage;
