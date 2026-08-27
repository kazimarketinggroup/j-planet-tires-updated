import { Plus, Trash2 } from 'lucide-react';
import SortableList from '../../../components/SortableList';
import { cellInputClass } from '../../../components/formClasses';
import EmptyState from '../../../components/EmptyState';
import { localKey, type MetricRow } from '../editorTypes';

interface Props {
  metrics: MetricRow[];
  onChange: (metrics: MetricRow[]) => void;
}

const PerformanceStep = ({ metrics, onChange }: Props) => {
  const update = (key: string, patch: Partial<MetricRow>) =>
    onChange(metrics.map((m) => (m._key === key ? { ...m, ...patch } : m)));

  const add = () =>
    onChange([...metrics, { _key: localKey(), label: '', score: 3, max_score: 5 }]);

  const remove = (key: string) => onChange(metrics.filter((m) => m._key !== key));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Add rated metrics shown as horizontal bars.</p>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> Add Metric
        </button>
      </div>

      {metrics.length === 0 ? (
        <EmptyState title="No metrics yet" description="Add your first performance metric." />
      ) : (
        <SortableList
          className="space-y-3"
          items={metrics}
          getId={(m) => m._key}
          onReorder={onChange}
          renderItem={(m, handle) => {
            const pct = m.max_score > 0 ? Math.min(100, (m.score / m.max_score) * 100) : 0;
            return (
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                {handle}
                <input
                  className={`${cellInputClass} flex-1`}
                  placeholder="Label (e.g. Dry Grip)"
                  value={m.label}
                  onChange={(e) => update(m._key, { label: e.target.value })}
                />
                <input
                  type="number"
                  min={0}
                  max={m.max_score}
                  step={0.5}
                  className={`${cellInputClass} w-20`}
                  value={m.score}
                  onChange={(e) => update(m._key, { score: Number(e.target.value) })}
                />
                <span className="text-xs text-gray-400">/</span>
                <input
                  type="number"
                  min={1}
                  step={0.5}
                  className={`${cellInputClass} w-16`}
                  value={m.max_score}
                  onChange={(e) => update(m._key, { max_score: Number(e.target.value) || 5 })}
                />
                <div className="hidden h-2 w-40 overflow-hidden rounded-full bg-gray-100 sm:block">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
                </div>
                <button
                  type="button"
                  onClick={() => remove(m._key)}
                  className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default PerformanceStep;
