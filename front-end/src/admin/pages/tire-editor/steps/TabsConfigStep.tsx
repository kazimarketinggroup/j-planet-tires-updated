import SortableList from '../../../components/SortableList';
import { ALL_TABS, TAB_LABELS, type TabType } from '../../../types/database';
import type { TabConfigRow } from '../editorTypes';

interface Props {
  tabs: TabConfigRow[];
  onChange: (tabs: TabConfigRow[]) => void;
}

const MANDATORY: TabType = 'size_technical_data';

const TabsConfigStep = ({ tabs, onChange }: Props) => {
  const isActive = (tab: TabType) => tabs.find((t) => t.tab === tab)?.is_active ?? false;

  const toggle = (tab: TabType) => {
    if (tab === MANDATORY) return;
    const exists = tabs.some((t) => t.tab === tab);
    if (!exists) {
      onChange([...tabs, { tab, is_active: true }]);
      return;
    }
    onChange(tabs.map((t) => (t.tab === tab ? { ...t, is_active: !t.is_active } : t)));
  };

  const activeTabs = tabs.filter((t) => t.is_active);
  const inactiveTabs = tabs.filter((t) => !t.is_active);

  const handleReorder = (reordered: TabConfigRow[]) => {
    onChange([...reordered, ...inactiveTabs]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">Available Tabs</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose which tabs appear on the public detail page. Size/Technical Data is always shown.
        </p>
        <div className="mt-4 space-y-2">
          {ALL_TABS.map((tab) => {
            const mandatory = tab === MANDATORY;
            const checked = mandatory || isActive(tab);
            return (
              <label
                key={tab}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  checked ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200'
                } ${mandatory ? 'opacity-80' : 'cursor-pointer'}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={mandatory}
                  onChange={() => toggle(tab)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-800">{TAB_LABELS[tab]}</span>
                {mandatory && (
                  <span className="ml-auto rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                    Required
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900">Tab Order</h3>
        <p className="mt-1 text-sm text-gray-500">Drag to set the order tabs appear on the public page.</p>
        <SortableList
          className="mt-4 space-y-2"
          items={activeTabs}
          getId={(t) => t.tab}
          onReorder={handleReorder}
          renderItem={(t, handle) => (
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
              {handle}
              <span className="text-sm font-medium text-gray-800">{TAB_LABELS[t.tab]}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default TabsConfigStep;
