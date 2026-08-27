import { useState } from 'react';
import Papa from 'papaparse';
import { X, UploadCloud, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { parseCsv, type CsvParseResult } from './sizeCsv';
import type { SizeRow } from './editorTypes';
import type { ResolvedColumn } from './sizeSpec';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (rows: SizeRow[], columns: ResolvedColumn[]) => void;
}

const SizeCsvImportModal = ({ open, onClose, onConfirm }: Props) => {
  const [parsed, setParsed] = useState<CsvParseResult | null>(null);
  const [fileName, setFileName] = useState('');

  if (!open) return null;

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const result = parseCsv(res.data, res.meta.fields ?? []);
        setParsed(result);
        if (!result.rows.length) toast.error('No data rows found in CSV');
        else if (!result.columns.length) toast.error('No columns detected in CSV header');
      },
      error: () => toast.error('Failed to parse CSV'),
    });
  };

  const columns = parsed?.columns ?? [];
  const results = parsed?.rows ?? [];
  const errorCount = results.filter((r) => r.errors.length).length;

  const reset = () => {
    setParsed(null);
    setFileName('');
  };

  const close = () => {
    reset();
    onClose();
  };

  const confirm = () => {
    if (!parsed) return;
    onConfirm(parsed.rows.map((r) => r.row), parsed.columns);
    toast.success(`Imported ${parsed.rows.length} rows`);
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[85vh] w-full max-w-4xl min-w-0 flex-col rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">Bulk Import Sizes via CSV</h2>
          <button type="button" onClick={close} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-5">
          {!parsed ? (
            <div>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 py-12 text-gray-500 hover:border-blue-400 hover:text-blue-500">
                <UploadCloud className="h-8 w-8" />
                <span className="text-sm font-medium">Click to upload a CSV file</span>
                <span className="text-xs text-gray-400">Columns are detected automatically from the header</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </label>
              <p className="mt-4 text-xs text-gray-500">
                Known fields (Size, Load Index, Section Width, etc.) become common columns; anything
                else becomes a custom column. Importing replaces this tire's column set.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="min-w-0 break-words text-gray-600">
                  <span className="font-medium text-gray-900">{fileName}</span> — {results.length} rows
                </span>
                {errorCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errorCount} row(s) with warnings
                  </span>
                )}
              </div>

              <div className="max-w-full overflow-x-hidden rounded-lg border border-gray-200">
                <table className="w-full table-fixed text-left text-xs">
                  <thead className="border-b border-gray-200 bg-gray-50 text-[11px] uppercase text-gray-500">
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

              {errorCount > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-amber-700">
                  {results
                    .map((r, i) => ({ r, i }))
                    .filter(({ r }) => r.errors.length)
                    .slice(0, 8)
                    .map(({ r, i }) => (
                      <li key={r.row._key}>
                        Row {i + 1}: {r.errors.join(', ')}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-5 py-4">
          <button
            type="button"
            onClick={close}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          {parsed && (
            <button
              type="button"
              onClick={confirm}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Import {results.length} Rows
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SizeCsvImportModal;
