import { inputClass, labelClass } from '../../../components/formClasses';
import ImageUpload from '../../../components/ImageUpload';
import { FEATURE_POSITIONS, type FeatureRow } from '../editorTypes';
import type { FeaturePosition } from '../../../types/database';

interface Props {
  diagramUrl: string | null;
  onDiagramChange: (url: string | null) => void;
  features: FeatureRow[];
  onChange: (features: FeatureRow[]) => void;
}

const POSITION_CLASSES: Record<FeaturePosition, string> = {
  'top-left': 'left-2 top-2',
  'top-right': 'right-2 top-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2',
};

const FeaturesStep = ({ diagramUrl, onDiagramChange, features, onChange }: Props) => {
  const update = (key: string, patch: Partial<FeatureRow>) =>
    onChange(features.map((f) => (f._key === key ? { ...f, ...patch } : f)));

  return (
    <div className="space-y-8">
      <div>
        <ImageUpload
          label="Base Diagram Image"
          folder="diagram"
          value={diagramUrl}
          onChange={onDiagramChange}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900">Feature Callouts</h3>
        <p className="mt-1 text-sm text-gray-500">Configure the four callouts shown around the diagram.</p>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {features.map((f, i) => (
            <div key={f._key} className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Feature {i + 1}
              </p>
              <div className="flex gap-4">
                <ImageUpload
                  folder="feature-icons"
                  value={f.icon_image_url}
                  onChange={(url) => update(f._key, { icon_image_url: url })}
                />
                <div className="flex-1 space-y-3">
                  <input
                    className={inputClass}
                    placeholder="Title"
                    value={f.title}
                    onChange={(e) => update(f._key, { title: e.target.value })}
                  />
                  <textarea
                    rows={2}
                    className={inputClass}
                    placeholder="Description"
                    value={f.description}
                    onChange={(e) => update(f._key, { description: e.target.value })}
                  />
                  <select
                    className={inputClass}
                    value={f.position}
                    onChange={(e) => update(f._key, { position: e.target.value as FeaturePosition })}
                  >
                    {FEATURE_POSITIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <span className={labelClass}>Layout Preview</span>
        <div className="relative mx-auto aspect-video w-full max-w-2xl overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {diagramUrl && (
            <img src={diagramUrl} alt="diagram" className="h-full w-full object-contain opacity-80" />
          )}
          {features.map((f) => (
            <div
              key={f._key}
              className={`absolute flex max-w-[40%] items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-[11px] font-medium text-gray-700 shadow ${
                POSITION_CLASSES[f.position]
              }`}
            >
              {f.icon_image_url && <img src={f.icon_image_url} alt="" className="h-4 w-4 object-contain" />}
              <span className="truncate">{f.title || 'Untitled'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesStep;
