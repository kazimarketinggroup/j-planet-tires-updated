import { Plus, Trash2, Copy, Upload, Columns3, X } from 'lucide-react';
import { toast } from 'sonner';
import { cellInputClass } from '../../../components/formClasses';
import EmptyState from '../../../components/EmptyState';
import { emptySizeRow, localKey, type EditorSizeColumn, type SizeRow } from '../editorTypes';
import { matchCommonField, toSnakeKey } from '../sizeSpec';

interface Props {
  columns: EditorSizeColumn[];
  sizes: SizeRow[];
  onColumnsChange: (columns: EditorSizeColumn[]) => void;
  onChange: (sizes: SizeRow[]) => void;
  onOpenCsv: () => void;
}

const SizesStep = ({ columns, sizes, onColumnsChange, onChange, onOpenCsv }: Props) => {
  const updateValue = (key: string, colKey: string, value: string) =>
    onChange(
      sizes.map((r) => (r._key === key ? { ...r, values: { ...r.values, [colKey]: value } } : r)),
    );

  const updateModel = (key: string, value: string) =>
    onChange(sizes.map((r) => (r._key === key ? { ...r, model_label: value } : r)));

  const addRow = () => onChange([...sizes, emptySizeRow()]);

  const duplicateRow = (key: string) => {
    const idx = sizes.findIndex((r) => r._key === key);
    if (idx === -1) return;
    const copy: SizeRow = { ...sizes[idx], _key: localKey(), values: { ...sizes[idx].values } };
    onChange([...sizes.slice(0, idx + 1), copy, ...sizes.slice(idx + 1)]);
  };

  const removeRow = (key: string) => onChange(sizes.filter((r) => r._key !== key));

  const addColumn = () => {
    const label = window.prompt('Column name (e.g. "UTQG Wear")')?.trim();
    if (!label) return;
    const common = matchCommonField(label);
    const columnKey = common ? common.key : toSnakeKey(label);
    if (!columnKey) {
      toast.error('Invalid column name');
      return;
    }
    if (columns.some((c) => c.column_key === columnKey)) {
      toast.error('A column with that key already exists');
      return;
    }
    onColumnsChange([
      ...columns,
      { _key: localKey(), column_key: columnKey, column_label: label, is_common: Boolean(common) },
    ]);
  };

  const removeColumn = (columnKey: string) =>
    onColumnsChange(columns.filter((c) => c.column_key !== columnKey));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          Columns are defined per tire (from the imported CSV or added manually). Use Model to group
          rows under a sub-heading.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addColumn}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Columns3 className="h-4 w-4" /> Add Column
          </button>
          <button
            type="button"
            onClick={onOpenCsv}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" /> Bulk Import CSV
          </button>
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Row
          </button>
        </div>
      </div>

      {columns.length === 0 ? (
        <EmptyState
          title="No columns yet"
          description="Import a CSV or use “Add Column” to define this tire's spec columns."
        />
      ) : sizes.length === 0 ? (
        <EmptyState title="No size rows yet" description="Add a row or import a CSV to populate the table." />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="text-left text-xs">
            <thead className="border-b border-gray-200 bg-gray-50 text-[11px] uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-2 py-2 font-semibold">Model</th>
                {columns.map((c) => (
                  <th key={c.column_key} className="whitespace-nowrap px-2 py-2 font-semibold">
                    <span className="flex items-center gap-1">
                      {c.column_label}
                      {!c.is_common && (
                        <span className="rounded bg-violet-100 px-1 py-0.5 text-[8px] font-semibold normal-case text-violet-700">
                          custom
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeColumn(c.column_key)}
                        className="rounded p-0.5 text-gray-300 hover:bg-red-50 hover:text-red-600"
                        title="Remove column"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  </th>
                ))}
                <th className="px-2 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizes.map((row) => (
                <tr key={row._key}>
                  <td className="px-2 py-1.5">
                    <input
                      className={`${cellInputClass} min-w-[120px] font-medium`}
                      value={row.model_label}
                      onChange={(e) => updateModel(row._key, e.target.value)}
                      placeholder="Group"
                    />
                  </td>
                  {columns.map((c) => (
                    <td key={c.column_key} className="px-2 py-1.5">
                      <input
                        type="text"
                        className={cellInputClass}
                        value={row.values[c.column_key] ?? ''}
                        onChange={(e) => updateValue(row._key, c.column_key, e.target.value)}
                      />
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-2 py-1.5">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => duplicateRow(row._key)}
                        className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        title="Duplicate row"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeRow(row._key)}
                        className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                        title="Delete row"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SizesStep;
