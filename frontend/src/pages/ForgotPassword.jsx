import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import API from '../services/api';
import { Sparkles, Mail, ArrowLeft, Send, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [simulationUrl, setSimulationUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/forgot-password', { email });
      setSimulationUrl(res.data.resetLink);
      addToast(res.data.message, 'success');
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to send reset link', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-cosmic-950">
      
      {/* Background Twinkling Stars */}
      <div className="stars-container">
        <div className="star star-fast w-0.5 h-0.5 top-[15%] left-[20%]" />
        <div className="star star-slow w-1 h-1 top-[25%] left-[75%]" />
        <div className="star star-fast w-0.5 h-0.5 top-[65%] left-[30%]" />
      </div>

      <div className="absolute w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl -top-10 -left-10" />
      <div className="absolute w-80 h-80 rounded-full bg-violet-600/10 blur-3xl -bottom-10 -right-10" />

      {/* Forgot Password Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link
          to="/login"
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Login
        </Link>

        <div className="glass-premium border border-slate-700/30 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Reset Your Password</h2>
            <p className="text-slate-400 text-xs mt-1">We will simulate sending recovery details</p>
          </div>

          {!simulationUrl ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 text-sm text-slate-200 placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-md transition-all duration-200 flex justify-center items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sending link...' : 'Send Recovery Simulation'}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-left text-slate-300">
                <p className="font-semibold text-indigo-300 mb-2">Simulated Email Output Sent!</p>
                <p>Since this is a demo sandbox environment, a simulation password reset link has been successfully generated for you.</p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs text-slate-500 font-semibold uppercase">Recovery Reset Action</span>
                <Link
                  to="/login"
                  onClick={() => addToast('Reset link simulation bypassed. Please login with original details or recreate user.', 'info')}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 border border-slate-700/50 hover:bg-slate-750 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-all"
                >
                  <LinkIcon className="w-4 h-4" />
                  Simulated Reset URL Action
                </Link>
              </div>

              <button
                onClick={() => setSimulationUrl('')}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Send to another email
              </button>
            </motion.div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-800/40 text-center">
            <p className="text-xs text-slate-400">
              Remember your password?{' '}
              <Link to="/login" className="text-indigo-400 hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
