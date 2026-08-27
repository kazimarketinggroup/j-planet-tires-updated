import { useEffect, useMemo, useState } from 'react';
import { Check, Trash2, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../auth/AuthProvider';
import { TableSkeleton } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { deleteProfile, fetchProfiles, updateProfile } from '../lib/usersApi';
import { STATUS_BADGE_CLASSES, type Profile } from '../types/database';

type Filter = 'all' | 'pending' | 'approved';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Users' },
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
];

const UsersPage = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);

  const load = async () => {
    try {
      setProfiles(await fetchProfiles());
    } catch {
      toast.error('Failed to load users — run SUPABASE_SETUP.sql to enable user management');
      setProfiles([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const counts = useMemo(() => {
    const list = profiles ?? [];
    return {
      all: list.length,
      pending: list.filter((p) => p.status === 'pending').length,
      approved: list.filter((p) => p.status === 'approved').length,
    };
  }, [profiles]);

  const filtered = (profiles ?? []).filter((p) => filter === 'all' || p.status === filter);

  const setStatus = async (p: Profile, status: Profile['status']) => {
    setProfiles((prev) => (prev ? prev.map((x) => (x.id === p.id ? { ...x, status } : x)) : prev));
    try {
      await updateProfile(p.id, { status });
      toast.success(status === 'approved' ? 'User approved' : 'Moved to pending');
    } catch {
      toast.error('Update failed');
      load();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProfile(deleteTarget.id);
      toast.success('User removed');
      setProfiles((prev) => (prev ? prev.filter((x) => x.id !== deleteTarget.id) : prev));
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Every approved user has full admin access. New sign-ups stay pending until you approve them.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
              filter === f.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label} <span className="opacity-70">({counts[f.id]})</span>
          </button>
        ))}
      </div>

      {!profiles ? (
        <TableSkeleton rows={5} cols={3} />
      ) : filtered.length === 0 ? (
        <EmptyState title="No users" description="No users match this filter." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => {
                const isSelf = p.id === user?.id;
                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {p.email ?? '—'}
                      {isSelf && <span className="ml-2 text-xs text-gray-400">(you)</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_BADGE_CLASSES[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {p.status === 'pending' ? (
                          <button
                            type="button"
                            onClick={() => setStatus(p, 'approved')}
                            className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                          >
                            <Check className="h-3.5 w-3.5" /> Approve
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={isSelf}
                            onClick={() => setStatus(p, 'pending')}
                            className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                          >
                            <Undo2 className="h-3.5 w-3.5" /> Set Pending
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={isSelf}
                          onClick={() => setDeleteTarget(p)}
                          className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40 disabled:hover:bg-transparent"
                          title={isSelf ? 'You cannot delete yourself' : 'Delete'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove user"
        message={`Remove "${deleteTarget?.email}"? Their access will be revoked.`}
        confirmLabel="Remove"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default UsersPage;
