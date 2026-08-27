import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { inputClass, labelClass } from '../components/formClasses';
import EmptyState from '../components/EmptyState';
import { TableSkeleton } from '../components/Skeleton';
import ConfirmDialog from '../components/ConfirmDialog';
import { slugify } from '../lib/slugify';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
  type CategoryInput,
} from '../lib/categoriesApi';
import {
  ALL_TABS,
  SEGMENT_BADGE_CLASSES,
  SEGMENT_LABELS,
  TAB_LABELS,
  type Segment,
  type TabType,
  type TireCategory,
} from '../types/database';

const SEGMENTS = Object.keys(SEGMENT_LABELS) as Segment[];

const emptyForm = (): CategoryInput => ({
  name: '',
  slug: '',
  segment: 'suv_ltr',
  default_tabs: ['size_technical_data'],
});

const CategoriesPage = () => {
  const [categories, setCategories] = useState<TireCategory[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TireCategory | null>(null);
  const [form, setForm] = useState<CategoryInput>(emptyForm());
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TireCategory | null>(null);

  const load = async () => {
    try {
      setCategories(await fetchCategories());
    } catch {
      toast.error('Failed to load categories');
      setCategories([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setSlugTouched(false);
    setModalOpen(true);
  };

  const openEdit = (c: TireCategory) => {
    setEditing(c);
    setForm({ name: c.name, slug: c.slug, segment: c.segment, default_tabs: c.default_tabs ?? [] });
    setSlugTouched(true);
    setModalOpen(true);
  };

  const toggleTab = (tab: TabType) => {
    setForm((f) => ({
      ...f,
      default_tabs: f.default_tabs.includes(tab)
        ? f.default_tabs.filter((t) => t !== tab)
        : [...f.default_tabs, tab],
    }));
  };

  const save = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      toast.error('Name and slug are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateCategory(editing.id, form);
        toast.success('Category updated');
      } else {
        await createCategory(form);
        toast.success('Category created');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCategory(deleteTarget.id);
      toast.success('Category deleted');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Manage tire categories and their default tab layout.</p>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      {!categories ? (
        <TableSkeleton rows={5} cols={4} />
      ) : categories.length === 0 ? (
        <EmptyState title="No categories yet" description="Create your first category to organise tires." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Slug</th>
                <th className="px-4 py-3 font-semibold">Segment</th>
                <th className="px-4 py-3 font-semibold">Default Tabs</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.slug}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${SEGMENT_BADGE_CLASSES[c.segment]}`}>
                      {SEGMENT_LABELS[c.segment]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(c.default_tabs ?? []).map((t) => (
                        <span key={t} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {TAB_LABELS[t]}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(c)}
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(c)}
                        className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">
                {editing ? 'Edit Category' : 'New Category'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="cat-name">
                    Name
                  </label>
                  <input
                    id="cat-name"
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setForm((f) => ({
                        ...f,
                        name,
                        ...(slugTouched ? {} : { slug: slugify(name) }),
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="cat-slug">
                    Slug
                  </label>
                  <input
                    id="cat-slug"
                    className={inputClass}
                    value={form.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                    }}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="cat-segment">
                  Segment
                </label>
                <select
                  id="cat-segment"
                  className={inputClass}
                  value={form.segment}
                  onChange={(e) => setForm((f) => ({ ...f, segment: e.target.value as Segment }))}
                >
                  {SEGMENTS.map((s) => (
                    <option key={s} value={s}>
                      {SEGMENT_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className={labelClass}>Default Tabs</span>
                <div className="space-y-2">
                  {ALL_TABS.map((tab) => (
                    <label key={tab} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={form.default_tabs.includes(tab)}
                        onChange={() => toggleTab(tab)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      {TAB_LABELS[tab]}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete category"
        message={`Delete "${deleteTarget?.name}"? This is blocked if any tires still use it.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default CategoriesPage;
