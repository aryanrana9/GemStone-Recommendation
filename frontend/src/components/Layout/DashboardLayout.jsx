import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from './Sidebar';
import { Menu, Sparkles, Sun, Moon, User as UserIcon, LogOut, ChevronDown, Home } from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-900 dark:text-slate-100 overflow-x-hidden">
      
      {/* Starry background */}
      <div className="stars-container">
        <div className="star star-fast w-0.5 h-0.5 top-[10%] left-[20%]" />
        <div className="star star-slow w-1 h-1 top-[30%] left-[80%]" />
        <div className="star star-fast w-0.5 h-0.5 top-[75%] left-[15%]" />
        <div className="star star-slow w-1 h-1 top-[85%] left-[70%]" />
      </div>

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 w-full h-16 glass border-b border-slate-700/20 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left Side: Brand Logo and Sidebar Hamburger Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-extrabold text-lg tracking-wider text-white hidden sm:inline">
              Astro<span className="text-indigo-400">Gem</span>
            </span>
            <span className="text-[10px] font-bold text-indigo-400 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              Portal
            </span>
          </Link>
        </div>

        {/* Center: Link to Landing Page */}
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40 border border-slate-200 dark:border-slate-700/20 transition-all shadow-sm"
          >
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>

        {/* Right Side: Theme button and Profile Dropdown */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Profile User Dropdown menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center overflow-hidden">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4 text-indigo-400" />
                )}
              </div>
              <span className="text-sm font-semibold text-slate-200 hidden md:inline">{user?.name}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden md:inline" />
            </button>

            {profileDropdownOpen && (
              <>
                {/* Backdrop Click close */}
                <div className="fixed inset-0 z-10" onClick={() => setProfileDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 glass border border-slate-700/30 rounded-xl shadow-2xl py-1 z-20 text-slate-300">
                  <div className="px-4 py-2 border-b border-slate-800/30 text-xs">
                    <p className="font-semibold text-white truncate">{user?.name}</p>
                    <p className="text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-slate-800/40 hover:text-white"
                  >
                    Profile Settings
                  </Link>
                  <Link
                    to="/dashboard/subscriptions"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-slate-800/40 hover:text-white"
                  >
                    Manage Plans
                  </Link>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-slate-800/40 text-rose-400 hover:text-rose-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </header>

      {/* Main Grid content: Sidebar + Outlet */}
      <div className="flex-1 flex relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />
        
        {/* Content Wrapper */}
        <main className="flex-1 md:pl-64 min-h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto relative z-10">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;
