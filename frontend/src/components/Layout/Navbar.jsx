import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Sun, Moon, Menu, X, LogIn, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, token } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToSection: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass border-b border-slate-700/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Sparkles className="w-6 h-6 text-indigo-400 group-hover:text-amber-400 transition-colors duration-300" />
              <span className="font-extrabold text-xl tracking-wider text-white">
                Astro<span className="text-indigo-400">Gem</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => handleNavClick('hero')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors duration-200">
              Home
            </button>
            <button onClick={() => handleNavClick('features')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors duration-200">
              Features
            </button>
            <button onClick={() => handleNavClick('gemstones')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors duration-200">
              Gemstones
            </button>
            <button onClick={() => handleNavClick('horoscope')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors duration-200">
              Horoscope
            </button>
            <button onClick={() => handleNavClick('about')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors duration-200">
              About Us
            </button>
            <button onClick={() => handleNavClick('contact')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors duration-200">
              Contact
            </button>
          </div>

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>

            {token ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-indigo-500/30 hover:border-indigo-400 text-slate-200 hover:text-white transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all shadow-[0_4px_14px_rgba(0,0,0,0.4)]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-slate-700/20 px-4 py-3 space-y-3 pb-4">
          <button onClick={() => handleNavClick('hero')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/40">
            Home
          </button>
          <button onClick={() => handleNavClick('features')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/40">
            Features
          </button>
          <button onClick={() => handleNavClick('gemstones')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/40">
            Gemstones
          </button>
          <button onClick={() => handleNavClick('horoscope')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/40">
            Horoscope
          </button>
          <button onClick={() => handleNavClick('about')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/40">
            About Us
          </button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/40">
            Contact
          </button>
          <div className="pt-2 border-t border-slate-700/25 flex flex-col gap-2">
            {token ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold border border-indigo-500/30 text-slate-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
