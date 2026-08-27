import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CircleGauge,
  Tags,
  Upload,
  Images,
  Users,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Tires', to: '/admin/tires', icon: CircleGauge },
  { label: 'Categories', to: '/admin/categories', icon: Tags },
  { label: 'Bulk Import', to: '/admin/import', icon: Upload },
  { label: 'Media Library', to: '/admin/media', icon: Images },
  { label: 'Users', to: '/admin/users', icon: Users },
];

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const { signOut } = useAuth();
  const navItems = NAV_ITEMS;

  const labelClass = `truncate text-sm font-medium ${collapsed ? 'hidden' : 'hidden lg:inline'}`;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-gray-200 bg-white transition-[width] duration-200 ${
        collapsed ? 'w-16' : 'w-16 lg:w-64'
      }`}
    >
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
          JP
        </span>
        <span className={`text-sm font-semibold text-gray-900 ${collapsed ? 'hidden' : 'hidden lg:inline'}`}>
          Tire CMS
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {navItems.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={label}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              } ${collapsed ? 'justify-center' : 'justify-center lg:justify-start'}`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className={labelClass}>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-2">
        <button
          type="button"
          onClick={signOut}
          title="Logout"
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 ${
            collapsed ? 'justify-center' : 'justify-center lg:justify-start'
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className={labelClass}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
