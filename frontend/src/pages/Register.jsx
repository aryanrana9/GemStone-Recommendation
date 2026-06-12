import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, Mail, Lock, User, Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    tob: '',
    pob: '',
    gender: 'Male'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, dob, tob, pob, gender } = formData;

    if (!name || !email || !password || !dob || !tob || !pob) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password, {
      dob,
      tob,
      pob,
      gender
    });
    setLoading(false);

    if (result.success) {
      addToast('Account created successfully! Welcome to AstroGem.', 'success');
      navigate('/dashboard');
    } else {
      addToast(result.message, 'error');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-cosmic-950">
      
      {/* Background Twinkling Stars */}
      <div className="stars-container">
        <div className="star star-fast w-0.5 h-0.5 top-[10%] left-[30%]" />
        <div className="star star-slow w-1 h-1 top-[20%] left-[80%]" />
        <div className="star star-fast w-0.5 h-0.5 top-[60%] left-[15%]" />
        <div className="star star-slow w-1 h-1 top-[80%] left-[75%]" />
      </div>

      <div className="absolute w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl -top-20 -left-20" />
      <div className="absolute w-96 h-96 rounded-full bg-violet-600/10 blur-3xl -bottom-20 -right-20" />

      {/* Glass Registration Form Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10 my-8"
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
            <h2 className="text-2xl font-extrabold text-white">Create Your Cosmic Account</h2>
            <p className="text-slate-400 text-xs mt-1">Provide your birth coordinates for gemstone calculations</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 text-sm text-slate-200 placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

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
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 text-sm text-slate-200 placeholder-slate-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Password (min 6 characters)</label>
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 text-sm text-slate-200 placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            {/* Birth Details Title Banner */}
            <div className="pt-2 pb-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block border-b border-indigo-500/20 pb-1.5">
                Astrological Coordinates
              </span>
            </div>

            {/* Date and Time of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Date of Birth</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 text-sm text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Time of Birth</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Clock className="w-4 h-4" />
                  </span>
                  <input
                    type="time"
                    name="tob"
                    value={formData.tob}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 text-sm text-slate-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Place of Birth and Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Place of Birth</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="pob"
                    value={formData.pob}
                    onChange={handleChange}
                    placeholder="New Delhi, India"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 text-sm text-slate-200 placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 focus:border-indigo-500/80 text-sm text-slate-200 outline-none"
                >
                  <option value="Male" className="bg-slate-950 text-slate-200">Male</option>
                  <option value="Female" className="bg-slate-950 text-slate-200">Female</option>
                  <option value="Other" className="bg-slate-950 text-slate-200">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm tracking-wide shadow-md transition-all duration-200"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/40 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
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

export default Register;
