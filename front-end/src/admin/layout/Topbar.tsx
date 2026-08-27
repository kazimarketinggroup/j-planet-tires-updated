import { useEffect, useRef, useState } from 'react';
import { Menu, Search, ChevronDown, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';

interface TopbarProps {
  title: string;
  onToggleSidebar: () => void;
}

const Topbar = ({ title, onToggleSidebar }: TopbarProps) => {
  const { user, role, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const initial = user?.email?.charAt(0).toUpperCase() ?? 'U';

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 md:px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-base font-semibold text-gray-900 md:text-lg">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-40 rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-56"
          />
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-md p-1 pr-2 hover:bg-gray-100"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {initial}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{user?.email}</span>
                </p>
                {role && (
                  <span className="mt-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-600">
                    {role}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={signOut}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
