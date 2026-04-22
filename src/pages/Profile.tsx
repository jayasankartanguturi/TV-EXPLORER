import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, Heart, Clock, LogOut, ChevronRight, Shield, Bell, Monitor, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

interface UserData {
  name: string;
  email: string;
  joinedYear: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotifToast, setShowNotifToast] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('tv_explorer_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('tv_explorer_user');
    navigate('/login');
  };

  const showToast = (msg: string) => {
    setShowNotifToast(msg);
    setTimeout(() => setShowNotifToast(''), 2500);
  };

  // If not logged in, redirect to login
  if (!user) {
    return (
      <AnimatedPage className="pt-24 px-6 md:px-12 pb-10 max-w-screen-lg mx-auto min-h-screen text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-12 rounded-xl"
        >
          <User className="w-20 h-20 text-gray-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">You're not signed in</h1>
          <p className="text-gray-400 mb-8">Sign in to access your profile, favorites, and personalized recommendations.</p>
          <Link to="/login">
            <button className="bg-gradient-to-r from-netflix-red to-red-600 text-white px-10 py-3 rounded-lg font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-900/30">
              Sign In
            </button>
          </Link>
        </motion.div>
      </AnimatedPage>
    );
  }

  const menuItems = [
    {
      icon: Heart,
      title: 'My Favorites',
      desc: 'View your liked shows',
      color: 'bg-red-500/20 text-red-500',
      action: () => navigate('/favorites'),
    },
    {
      icon: Clock,
      title: 'Watch History',
      desc: 'Shows you\'ve watched recently',
      color: 'bg-blue-500/20 text-blue-500',
      action: () => showToast('Watch history coming soon!'),
    },
    {
      icon: Bell,
      title: 'Notifications',
      desc: 'Manage your alert preferences',
      color: 'bg-yellow-500/20 text-yellow-500',
      action: () => showToast('Notifications preferences saved!'),
    },
    {
      icon: Monitor,
      title: 'Display Settings',
      desc: 'Customize your viewing experience',
      color: 'bg-green-500/20 text-green-500',
      action: () => setShowSettingsModal(true),
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      desc: 'Password and account security',
      color: 'bg-purple-500/20 text-purple-500',
      action: () => showToast('Privacy settings updated!'),
    },
    {
      icon: Settings,
      title: 'Account Settings',
      desc: 'Manage your profile details',
      color: 'bg-gray-500/20 text-gray-300',
      action: () => setShowSettingsModal(true),
    },
  ];

  return (
    <AnimatedPage className="pt-24 px-6 md:px-12 pb-10 max-w-screen-lg mx-auto min-h-screen text-white relative">
      {/* Toast notification */}
      <AnimatePresence>
      {showNotifToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl font-medium"
        >
          ✓ {showNotifToast}
        </motion.div>
      )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
      {showSettingsModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" 
          onClick={() => setShowSettingsModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Display Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg py-2.5 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg py-2.5 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Language</label>
                <select className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg py-2.5 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-netflix-red">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  showToast('Settings saved successfully!');
                }}
                className="flex-1 bg-netflix-red hover:bg-red-700 text-white py-2.5 rounded-lg font-bold transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-lg font-bold transition-colors border border-gray-700"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass p-8 rounded-xl"
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-600 bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center group-hover:border-netflix-red transition-colors">
              <User className="w-16 h-16 text-white" />
            </div>
            <button
              onClick={() => showToast('Avatar upload coming soon!')}
              className="absolute bottom-1 right-1 bg-netflix-red p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <Edit3 className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
              <span className="px-3 py-1 bg-netflix-red rounded-full text-xs font-medium">Premium Member</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium">Joined {user.joinedYear}</span>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={item.action}
              className="bg-gray-900/50 p-5 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer flex items-center gap-4 border border-gray-800 hover:border-gray-600 text-left w-full group"
            >
              <div className={`p-3 rounded-lg ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>

        {/* Sign Out */}
        <div className="mt-8 border-t border-gray-800 pt-6">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group mx-auto md:mx-0"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign out of your account</span>
          </button>
        </div>
      </motion.div>
    </AnimatedPage>
  );
};

export default Profile;
