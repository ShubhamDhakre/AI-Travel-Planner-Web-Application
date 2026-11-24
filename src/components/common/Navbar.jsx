import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, User, LogOut, Heart, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-coral-500 font-semibold' : 'text-slate-600 hover:text-navy-900'
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-950 via-navy-800 to-turquoise-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-turquoise-300 animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-navy-950 font-sans">
                Trip<span className="text-coral-500">AI</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium -mt-1">
                Smart Itineraries
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/explore" className={navLinkClass}>
              Explore Destinations
            </NavLink>
            <NavLink to="/planner" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-coral-500 transition-colors">
              <Sparkles className="w-4 h-4 text-coral-500" />
              AI Planner
            </NavLink>
            <NavLink to="/my-trips" className={navLinkClass}>
              My Trips
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </div>

          {/* User Auth / Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-turquoise-500 to-navy-800 text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
                    {user?.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
                    {user?.name || 'My Account'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-scale-in z-50">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/my-trips"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy-900 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-slate-400" />
                      My Saved Trips
                    </Link>

                    <Link
                      to="/my-trips?tab=favorites"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy-900 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      Favorite Places
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth?mode=login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-navy-900 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-coral-500 hover:bg-coral-600 shadow-md shadow-coral-500/20 hover:shadow-lg hover:shadow-coral-500/30 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-slide-down">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Explore Destinations
          </Link>
          <Link
            to="/planner"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold text-coral-600 hover:bg-coral-50"
          >
            <Sparkles className="w-4 h-4" />
            AI Trip Planner
          </Link>
          <Link
            to="/my-trips"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            My Trips
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            About
          </Link>

          <div className="border-t border-slate-100 pt-3">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 py-1">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/auth?mode=login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/auth?mode=register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-coral-500 rounded-xl shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
