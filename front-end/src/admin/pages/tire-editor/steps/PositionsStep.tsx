import { Plus, Trash2 } from 'lucide-react';
import SortableList from '../../../components/SortableList';
import { cellInputClass, inputClass } from '../../../components/formClasses';
import ImageUpload from '../../../components/ImageUpload';
import EmptyState from '../../../components/EmptyState';
import { localKey, type PositionLegendRow, type VehiclePositionRow } from '../editorTypes';

interface Props {
  vehiclePositions: VehiclePositionRow[];
  positionLegends: PositionLegendRow[];
  onVehiclePositionsChange: (positions: VehiclePositionRow[]) => void;
  onPositionLegendsChange: (legends: PositionLegendRow[]) => void;
}

const PositionsStep = ({
  vehiclePositions,
  positionLegends,
  onVehiclePositionsChange,
  onPositionLegendsChange,
}: Props) => {
  const updateVehiclePosition = (key: string, patch: Partial<VehiclePositionRow>) =>
    onVehiclePositionsChange(
      vehiclePositions.map((p) => (p._key === key ? { ...p, ...patch } : p)),
    );

  const addVehiclePosition = () =>
    onVehiclePositionsChange([
      ...vehiclePositions,
      { _key: localKey(), icon_image_url: null, vehicle_label: '' },
    ]);

  const removeVehiclePosition = (key: string) =>
    onVehiclePositionsChange(vehiclePositions.filter((p) => p._key !== key));

  const updateLegend = (key: string, patch: Partial<PositionLegendRow>) =>
    onPositionLegendsChange(
      positionLegends.map((l) => (l._key === key ? { ...l, ...patch } : l)),
    );

  const addLegend = () =>
    onPositionLegendsChange([
      ...positionLegends,
      { _key: localKey(), label: '', color: '#1148c6' },
    ]);

  const removeLegend = (key: string) =>
    onPositionLegendsChange(positionLegends.filter((l) => l._key !== key));

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Vehicle Icons</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Upload icons with status dots already included in the image. The Status Legend below is for
              reference text only and is not linked to specific icons.
            </p>
          </div>
          <button
            type="button"
            onClick={addVehiclePosition}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Card
          </button>
        </div>

        {vehiclePositions.length === 0 ? (
          <EmptyState title="No vehicle icons yet" description="Add the first pre-made vehicle icon." />
        ) : (
          <SortableList
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
            items={vehiclePositions}
            getId={(p) => p._key}
            onReorder={onVehiclePositionsChange}
            renderItem={(p, handle) => {
              const order = vehiclePositions.findIndex((row) => row._key === p._key) + 1;
              return (
                <article className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {handle}
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Display order {order}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVehiclePosition(p._key)}
                      className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <ImageUpload
                      folder="positions"
                      label="Icon image"
                      value={p.icon_image_url}
                      onChange={(url) => updateVehiclePosition(p._key, { icon_image_url: url })}
                    />
                    <div className="flex-1 space-y-3">
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-gray-700">
                          Vehicle label
                        </span>
                        <input
                          className={inputClass}
                          placeholder="Optional caption"
                          value={p.vehicle_label}
                          onChange={(e) =>
                            updateVehiclePosition(p._key, { vehicle_label: e.target.value })
                          }
                        />
                      </label>
                      {p.icon_image_url && (
                        <div>
                          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Thumbnail
                          </span>
                          <img
                            src={p.icon_image_url}
                            alt={p.vehicle_label || 'Vehicle icon preview'}
                            className="h-16 w-24 rounded border border-gray-200 object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            }}
          />
        )}
      </section>

      <section className="space-y-4 border-t border-gray-200 pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Status Legend</h2>
            <p className="mt-1 text-sm text-gray-500">Reference labels shown beside the vehicle icons.</p>
          </div>
          <button
            type="button"
            onClick={addLegend}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Row
          </button>
        </div>

        {positionLegends.length === 0 ? (
          <EmptyState title="No legend rows yet" description="Add a label and color for the legend." />
        ) : (
          <SortableList
            className="space-y-3"
            items={positionLegends}
            getId={(l) => l._key}
            onReorder={onPositionLegendsChange}
            renderItem={(legend, handle) => {
              const order = positionLegends.findIndex((row) => row._key === legend._key) + 1;
              return (
                <div className="grid gap-3 rounded-lg border border-gray-200 bg-white p-3 md:grid-cols-[auto_1fr_auto_auto_auto] md:items-center">
                  <div className="flex items-center gap-2">
                    {handle}
                    <span className="w-16 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Order {order}
                    </span>
                  </div>
                  <input
                    className={cellInputClass}
                    placeholder="Legend label"
                    value={legend.label}
                    onChange={(e) => updateLegend(legend._key, { label: e.target.value })}
                  />
                  <input
                    type="color"
                    className="h-10 w-12 cursor-pointer rounded border border-gray-300 bg-white p-1"
                    value={legend.color}
                    onChange={(e) => updateLegend(legend._key, { color: e.target.value })}
                    aria-label="Legend color"
                  />
                  <div className="flex min-w-40 items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: legend.color }}
                      aria-hidden="true"
                    />
                    <span>{legend.label || 'Label preview'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLegend(legend._key)}
                    className="justify-self-start rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 md:justify-self-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            }}
          />
        )}
      </section>
    </div>
  );
};

export default PositionsStep;
