import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const TITLES: { match: (path: string) => boolean; title: string }[] = [
  { match: (p) => p === '/admin', title: 'Dashboard' },
  { match: (p) => p.startsWith('/admin/tires/new'), title: 'New Tire' },
  { match: (p) => /^\/admin\/tires\/[^/]+\/edit/.test(p), title: 'Edit Tire' },
  { match: (p) => p.startsWith('/admin/tires'), title: 'Tires' },
  { match: (p) => p.startsWith('/admin/categories'), title: 'Categories' },
  { match: (p) => p.startsWith('/admin/import'), title: 'Bulk Import' },
  { match: (p) => p.startsWith('/admin/media'), title: 'Media Library' },
  { match: (p) => p.startsWith('/admin/users'), title: 'Users' },
];

const getTitle = (pathname: string) =>
  TITLES.find((t) => t.match(pathname))?.title ?? 'Admin';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} />

      <div className={`flex min-h-screen flex-col transition-[padding] duration-200 ${collapsed ? 'pl-16' : 'pl-16 lg:pl-64'}`}>
        <Topbar title={getTitle(pathname)} onToggleSidebar={() => setCollapsed((v) => !v)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
