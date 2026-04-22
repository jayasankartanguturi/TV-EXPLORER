import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-800 bg-black py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Film className="w-6 h-6 text-netflix-red" />
              <span className="text-xl font-bold bg-gradient-to-r from-netflix-red to-red-600 bg-clip-text text-transparent">
                TV Explorer
              </span>
            </Link>
            <p className="text-gray-500 text-sm mt-3 max-w-xs">
              Discover your next favorite TV show. Browse thousands of series with detailed info, ratings and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-x-16 gap-y-6">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Browse</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <Link to="/shows" className="hover:text-white transition-colors">All Shows</Link>
                <Link to="/search" className="hover:text-white transition-colors">Search</Link>
                <Link to="/favorites" className="hover:text-white transition-colors">My Favorites</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Genres</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <Link to="/shows?genre=Adventure" className="hover:text-white transition-colors">Adventure</Link>
                <Link to="/shows?genre=Comedy" className="hover:text-white transition-colors">Comedy</Link>
                <Link to="/shows?genre=Science-Fiction" className="hover:text-white transition-colors">Sci-Fi</Link>
                <Link to="/shows?genre=Drama" className="hover:text-white transition-colors">Drama</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Account</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <Link to="/profile" className="hover:text-white transition-colors">Profile</Link>
                <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TV Explorer. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/search" className="hover:text-white transition-colors">Help Center</Link>
          </div>
          <div className="flex gap-4 text-gray-500">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
