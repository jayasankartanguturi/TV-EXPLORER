import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { FaGithub, FaChrome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setIsLoading(false);

    // Store user in localStorage to simulate auth
    localStorage.setItem(
      'tv_explorer_user',
      JSON.stringify({
        name: formData.name || 'User',
        email: formData.email,
        joinedYear: new Date().getFullYear(),
      })
    );
    navigate('/');
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    localStorage.setItem(
      'tv_explorer_user',
      JSON.stringify({
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.com`,
        joinedYear: new Date().getFullYear(),
      })
    );
    navigate('/');
  };

  return (
    <AnimatedPage className="min-h-screen flex items-center justify-center relative overflow-hidden -mt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
            <Film className="w-10 h-10 text-netflix-red group-hover:scale-110 transition-transform" />
            <span className="text-3xl font-bold bg-gradient-to-r from-netflix-red to-red-500 bg-clip-text text-transparent">
              TV Explorer
            </span>
          </Link>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-gray-400 text-center text-sm mb-8">
            {isSignUp
              ? 'Join millions of viewers discovering great TV shows'
              : 'Sign in to access your favorites and personalized recommendations'}
          </p>

          {/* Social Login Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-all duration-200 border border-gray-700 hover:border-gray-500"
            >
              <FaChrome className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('GitHub')}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-all duration-200 border border-gray-700 hover:border-gray-500"
            >
              <FaGithub className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">or continue with email</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name (Sign Up only) */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-gray-800/50 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 transition-all border ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-netflix-red'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-gray-800/50 text-white rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 transition-all border ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-netflix-red'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full bg-gray-800/50 text-white rounded-lg py-3 pl-11 pr-12 focus:outline-none focus:ring-2 transition-all border ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-netflix-red'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Remember / Forgot */}
            {!isSignUp && (
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded bg-gray-800 border-gray-600 text-netflix-red focus:ring-netflix-red focus:ring-offset-0"
                  />
                  Remember me
                </label>
                <button type="button" className="text-netflix-red hover:text-red-400 transition-colors font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-netflix-red to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3.5 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Sign In / Sign Up */}
          <p className="text-center text-gray-400 text-sm mt-8">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
              }}
              className="text-netflix-red hover:text-red-400 font-semibold transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-gray-600 text-xs mt-6">
          By continuing, you agree to TV Explorer's{' '}
          <Link to="/terms" className="text-gray-400 hover:text-white transition-colors underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors underline">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </AnimatedPage>
  );
};

export default Login;
