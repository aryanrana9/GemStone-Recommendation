import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Sparkles,
  History,
  Moon,
  Compass,
  BookOpen,
  FileText,
  CreditCard,
  Settings,
  LifeBuoy,
  LogOut,
  ShieldAlert
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Gemstone Recommendation', path: '/dashboard/recommend', icon: Sparkles },
    { name: 'Recommendation History', path: '/dashboard/history', icon: History },
    { name: 'Horoscope', path: '/dashboard/horoscope', icon: Moon },
    { name: 'Zodiac Profile', path: '/dashboard/zodiac', icon: Compass },
    { name: 'Gemstone Library', path: '/dashboard/library', icon: BookOpen },
    { name: 'Saved Reports', path: '/dashboard/history?tab=saved', icon: FileText },
    { name: 'Subscription Plans', path: '/dashboard/subscriptions', icon: CreditCard },
    { name: 'Profile Settings', path: '/dashboard/settings', icon: Settings },
    { name: 'Help & Support', path: '/dashboard/support', icon: LifeBuoy },
  ];

  return (
    <aside
      className={`fixed top-16 bottom-0 left-0 z-30 w-64 glass border-r border-slate-700/20 backdrop-blur-md transform transition-transform duration-300 md:translate-x-0 flex flex-col justify-between ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Menu scroll area */}
      <div className="flex-1 py-4 overflow-y-auto px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            onClick={() => toggleSidebar && toggleSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`
            }
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-105" />
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Admin Panel and Logout bottom options */}
      <div className="p-3 border-t border-slate-700/25 space-y-1">
        {user && user.role === 'admin' && (
          <NavLink
            to="/admin"
            onClick={() => toggleSidebar && toggleSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-violet-600/20 text-violet-400 border border-violet-500/20'
                  : 'text-violet-400 hover:text-violet-300 hover:bg-violet-950/20'
              }`
            }
          >
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            Admin Panel
          </NavLink>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
