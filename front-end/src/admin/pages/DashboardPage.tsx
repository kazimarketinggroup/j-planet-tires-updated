import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CircleGauge,
  CheckCircle2,
  FileEdit,
  Tags,
  Plus,
  ArrowUpRight,
  ImageOff,
  Check,
  Users,
  Download,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import { downloadBackup } from '../lib/backupApi';
import { fetchProfiles, updateProfile } from '../lib/usersApi';
import { CardSkeleton, Skeleton } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import {
  SEGMENT_BADGE_CLASSES,
  SEGMENT_LABELS,
  STATUS_BADGE_CLASSES,
  type Profile,
  type Segment,
} from '../types/database';

interface RecentTire {
  id: string;
  name: string;
  is_published: boolean;
  updated_at: string | null;
  card_image_url: string | null;
  category: { name: string; segment: Segment } | null;
}

interface Stats {
  total: number;
  published: number;
  draft: number;
  categories: number;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  accent,
  iconBg,
  children,
}: {
  icon: typeof CircleGauge;
  label: string;
  value: number;
  accent: string;
  iconBg: string;
  children?: React.ReactNode;
}) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className={`h-1 w-full ${accent}`} />
    <div className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">{value}</p>
      {children}
    </div>
  </div>
);

const DashboardPage = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentTire[] | null>(null);
  const [users, setUsers] = useState<Profile[] | null>(null);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await downloadBackup();
      toast.success('Backup downloaded');
    } catch {
      toast.error('Backup failed — please try again');
    } finally {
      setExporting(false);
    }
  };

  const approve = async (p: Profile) => {
    setUsers((prev) => (prev ? prev.map((x) => (x.id === p.id ? { ...x, status: 'approved' } : x)) : prev));
    try {
      await updateProfile(p.id, { status: 'approved' });
      toast.success('User approved');
    } catch {
      toast.error('Approve failed');
    }
  };

  useEffect(() => {
    // Best-effort users panel (requires profiles RLS from SUPABASE_SETUP.sql).
    fetchProfiles()
      .then(setUsers)
      .catch(() => setUsers([]));

    const load = async () => {
      const [totalRes, pubRes, catRes, recentRes] = await Promise.all([
        supabase.from('tires').select('*', { count: 'exact', head: true }),
        supabase.from('tires').select('*', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('tire_categories').select('*', { count: 'exact', head: true }),
        supabase
          .from('tires')
          .select('id, name, is_published, updated_at, card_image_url, category:tire_categories(name, segment)')
          .order('updated_at', { ascending: false })
          .limit(5),
      ]);

      if (totalRes.error || pubRes.error || catRes.error || recentRes.error) {
        toast.error('Failed to load dashboard data');
        setStats({ total: 0, published: 0, draft: 0, categories: 0 });
        setRecent([]);
        return;
      }

      const total = totalRes.count ?? 0;
      const published = pubRes.count ?? 0;
      setStats({ total, published, draft: total - published, categories: catRes.count ?? 0 });
      setRecent((recentRes.data as unknown as RecentTire[]) ?? []);
    };

    load();
  }, []);

  const publishedPct = stats && stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Overview</h1>
          <p className="mt-0.5 text-sm text-gray-500">Snapshot of your tire catalogue.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Export Backup
          </button>
          <Link
            to="/admin/categories"
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Tags className="h-4 w-4" /> Categories
          </Link>
          <Link
            to="/admin/tires/new"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> New Tire
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats ? (
          <>
            <StatCard icon={CircleGauge} label="Total Tires" value={stats.total} accent="bg-blue-500" iconBg="bg-blue-50 text-blue-600" />
            <StatCard
              icon={CheckCircle2}
              label="Published"
              value={stats.published}
              accent="bg-emerald-500"
              iconBg="bg-emerald-50 text-emerald-600"
            >
              <div className="mt-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${publishedPct}%` }} />
                </div>
                <p className="mt-1.5 text-xs text-gray-400">{publishedPct}% of catalogue live</p>
              </div>
            </StatCard>
            <StatCard icon={FileEdit} label="Drafts" value={stats.draft} accent="bg-amber-500" iconBg="bg-amber-50 text-amber-600" />
            <StatCard icon={Tags} label="Categories" value={stats.categories} accent="bg-violet-500" iconBg="bg-violet-50 text-violet-600" />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        )}
      </div>

      {/* Recent */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Recently Updated</h2>
          <Link
            to="/admin/tires"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {!recent ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={CircleGauge}
              title="No tires yet"
              description="Create your first tire to see it here."
              action={
                <Link
                  to="/admin/tires/new"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" /> New Tire
                </Link>
              }
            />
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recent.map((t) => (
              <li key={t.id} className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-gray-50">
                {t.card_image_url ? (
                  <img src={t.card_image_url} alt="" className="h-11 w-11 rounded-lg border border-gray-200 object-cover" />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-300">
                    <ImageOff className="h-4 w-4" />
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <Link to={`/admin/tires/${t.id}/edit`} className="block truncate text-sm font-medium text-gray-900 hover:text-blue-600">
                    {t.name}
                  </Link>
                  {t.category && (
                    <span className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${SEGMENT_BADGE_CLASSES[t.category.segment]}`}>
                      {SEGMENT_LABELS[t.category.segment]}
                    </span>
                  )}
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    t.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {t.is_published ? 'Published' : 'Draft'}
                </span>
                <span className="hidden w-24 text-right text-xs text-gray-400 sm:inline">
                  {t.updated_at ? new Date(t.updated_at).toLocaleDateString() : '—'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Team members */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Users className="h-4 w-4 text-gray-400" /> Team Members
          </h2>
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Manage <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {!users ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={Users}
              title="No users to show"
              description="Run SUPABASE_SETUP.sql so admins can list and approve users."
            />
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {users.slice(0, 6).map((u) => (
              <li key={u.id} className="flex items-center justify-between px-5 py-3">
                <span className="truncate text-sm font-medium text-gray-900">{u.email ?? '—'}</span>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_BADGE_CLASSES[u.status]}`}>
                    {u.status}
                  </span>
                  {u.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => approve(u)}
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      <Check className="h-3.5 w-3.5" /> Approve
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
