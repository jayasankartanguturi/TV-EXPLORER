import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, User, Film, LogIn, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check login status on every route change
  useEffect(() => {
    const user = localStorage.getItem('tv_explorer_user');
    setIsLoggedIn(!!user);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/shows' },
    { name: 'Adventure', path: '/shows?genre=Adventure' },
    { name: 'Comedy', path: '/shows?genre=Comedy' },
    { name: 'Sci-Fi', path: '/shows?genre=Science-Fiction' },
  ];

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between',
          isScrolled ? 'glass shadow-lg' : 'bg-transparent'
        )}
      >
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Film className="w-8 h-8 text-netflix-red group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold bg-gradient-to-r from-netflix-red to-red-600 bg-clip-text text-transparent">
              TV Explorer
            </span>
          </Link>
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-white',
                    isActive ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="h-1 bg-netflix-red mt-1 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-gray-300">
          <Link to="/search" className="hover:text-white transition-colors">
            <Search className="w-5 h-5 cursor-pointer" />
          </Link>
          <Link to="/favorites" className="hover:text-white transition-colors relative">
            <Heart className="w-5 h-5 cursor-pointer" />
          </Link>

          {isLoggedIn ? (
            <Link to="/profile" className="cursor-pointer hover:scale-105 transition-transform overflow-hidden rounded-md border border-gray-600">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 bg-netflix-red hover:bg-red-700 text-white px-4 py-1.5 rounded-md font-medium text-sm transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 w-full z-40 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'text-lg font-medium py-2 transition-colors',
                    location.pathname + location.search === link.path
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-700" />
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 bg-netflix-red text-white px-4 py-2.5 rounded-md font-bold text-center justify-center"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
