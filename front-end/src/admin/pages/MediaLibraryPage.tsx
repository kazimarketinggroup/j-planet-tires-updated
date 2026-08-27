import { useEffect, useState, type DragEvent } from 'react';
import { Search, UploadCloud, X, Copy, Trash2, Loader2, ImageOff } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, TIRE_ASSETS_BUCKET } from '../lib/supabase';
import { slugify } from '../lib/slugify';
import EmptyState from '../components/EmptyState';
import { Skeleton } from '../components/Skeleton';
import ConfirmDialog from '../components/ConfirmDialog';

interface MediaItem {
  path: string;
  name: string;
  url: string;
}

const publicUrl = (path: string) =>
  supabase.storage.from(TIRE_ASSETS_BUCKET).getPublicUrl(path).data.publicUrl;

const MediaLibraryPage = () => {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<MediaItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);

  const load = async () => {
    try {
      const { data: rootEntries, error } = await supabase.storage
        .from(TIRE_ASSETS_BUCKET)
        .list('', { limit: 1000, sortBy: { column: 'created_at', order: 'desc' } });
      if (error) throw error;

      const collected: MediaItem[] = [];
      for (const entry of rootEntries ?? []) {
        if (entry.id === null) {
          // folder — list one level deep
          const { data: sub } = await supabase.storage
            .from(TIRE_ASSETS_BUCKET)
            .list(entry.name, { limit: 1000, sortBy: { column: 'created_at', order: 'desc' } });
          for (const f of sub ?? []) {
            if (f.id !== null) {
              const path = `${entry.name}/${f.name}`;
              collected.push({ path, name: f.name, url: publicUrl(path) });
            }
          }
        } else {
          collected.push({ path: entry.name, name: entry.name, url: publicUrl(entry.name) });
        }
      }
      setItems(collected);
    } catch {
      toast.error('Failed to load media');
      setItems([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!list.length) {
      toast.error('Only image files are supported');
      return;
    }
    setUploading(true);
    try {
      for (const file of list) {
        const ext = file.name.split('.').pop() ?? 'png';
        const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'image';
        const path = `library/${Date.now()}-${base}.${ext}`;
        const { error } = await supabase.storage.from(TIRE_ASSETS_BUCKET).upload(path, file);
        if (error) throw error;
      }
      toast.success(`Uploaded ${list.length} file(s)`);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(
      () => toast.success('URL copied'),
      () => toast.error('Copy failed'),
    );
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const { error } = await supabase.storage.from(TIRE_ASSETS_BUCKET).remove([deleteTarget.path]);
      if (error) throw error;
      toast.success('Image deleted');
      setItems((prev) => (prev ? prev.filter((i) => i.path !== deleteTarget.path) : prev));
      setPreview(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleteTarget(null);
    }
  };

  const filtered = (items ?? []).filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search filenames…"
            className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
          Upload
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          />
        </label>
      </div>

      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-6 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500"
      >
        <UploadCloud className="h-6 w-6" />
        Drag &amp; drop images here, or click to browse
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />
      </label>

      {!items ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={ImageOff}
          title="No images"
          description="Upload images to build your media library."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filtered.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => setPreview(item)}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition-shadow hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden bg-gray-50">
                <img src={item.url} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <p className="truncate px-2 py-1.5 text-xs text-gray-600">{item.name}</p>
            </button>
          ))}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="truncate text-sm font-semibold text-gray-900">{preview.name}</h2>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <img src={preview.url} alt={preview.name} className="mx-auto max-h-80 object-contain" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input
                  readOnly
                  value={preview.url}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => copyUrl(preview.url)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Copy className="h-4 w-4" /> Copy
                </button>
              </div>
            </div>
            <div className="flex justify-end border-t border-gray-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setDeleteTarget(preview)}
                className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete image"
        message={`Delete "${deleteTarget?.name}"? Any tire still referencing this URL will show a broken image.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default MediaLibraryPage;
