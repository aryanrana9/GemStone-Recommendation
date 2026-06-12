import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      addToast('Welcome back to AstroGem!', 'success');
      const destination = location.state?.redirectUrl || '/dashboard';
      navigate(destination);
    } else {
      addToast(result.message, 'error');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-cosmic-950">
      
      {/* Background Twinkling Stars */}
      <div className="stars-container">
        <div className="star star-fast w-0.5 h-0.5 top-[15%] left-[25%]" />
        <div className="star star-slow w-1 h-1 top-[30%] left-[70%]" />
        <div className="star star-fast w-0.5 h-0.5 top-[70%] left-[20%]" />
        <div className="star star-slow w-1 h-1 top-[80%] left-[80%]" />
      </div>

      {/* Floating Gradient Aura */}
      <div className="absolute w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl -top-10 -left-10" />
      <div className="absolute w-80 h-80 rounded-full bg-violet-600/10 blur-3xl -bottom-10 -right-10" />

      {/* Form Glass Card container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        <div className="glass-premium border border-slate-700/30 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Log In to AstroGem</h2>
            <p className="text-slate-400 text-xs mt-1">Unlock your planetary alignments and gemstones</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Password</label>
                <Link to="/forgot-password" className="text-xs text-indigo-400 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-indigo-600/50 disabled:to-violet-600/50 text-white font-bold text-sm tracking-wide shadow-md transition-all duration-200 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] flex justify-center items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/40 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-400 hover:underline font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
