import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API from '../services/api';
import { Sparkles, Calendar, Clock, MapPin, User, Compass, Gem, Shield, Heart, Award, ArrowLeft, RefreshCw, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GemstoneRecommendation = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1); // 1 = Form, 2 = Generating, 3 = Result
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    dob: '',
    tob: '',
    pob: '',
    occupation: '',
    relationshipStatus: 'Single',
    careerGoals: '',
    financialGoals: '',
    healthConcerns: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Prepopulate form data if user birth details exist
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || '',
        dob: user.birthDetails?.dob || '',
        tob: user.birthDetails?.tob || '',
        pob: user.birthDetails?.pob || '',
        gender: user.birthDetails?.gender || 'Male'
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, dob, tob, pob, gender } = formData;

    if (!fullName || !dob || !tob || !pob) {
      addToast('Please fill in all birth details', 'error');
      return;
    }

    setStep(2);
    setLoading(true);
    
    // Simulate celestial alignment check animation delay
    setTimeout(async () => {
      try {
        const res = await API.post('/recommendations', formData);
        setResult(res.data.recommendation);
        setStep(3);
        addToast('Cosmic alignments calculated successfully!', 'success');
      } catch (error) {
        setStep(1);
        addToast(error.response?.data?.message || 'Calculation failed. Try again.', 'error');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Astrology Form Input Step */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Astrological Calculator</h2>
              <p className="text-slate-400 text-sm">
                Enter your exact birth parameters and intentions to align your energy with gemstone frequencies.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-3xl border border-slate-800/40 space-y-6">
              
              {/* Section: Personal Birth Coordinates */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider border-b border-indigo-500/20 pb-2">
                  Birth Coordinates
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Full Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Date of Birth</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                        <Calendar className="w-4 h-4" />
                      </span>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Time of Birth */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Time of Birth</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                        <Clock className="w-4 h-4" />
                      </span>
                      <input
                        type="time"
                        name="tob"
                        value={formData.tob}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Place of Birth */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Place of Birth</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        name="pob"
                        value={formData.pob}
                        onChange={handleChange}
                        placeholder="City, Country"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                        required
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Section: Intentions and Goals */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-violet-400 uppercase tracking-wider border-b border-indigo-500/20 pb-2">
                  Intentions & Life Goals
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Occupation */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Engineer, Business, Artist"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                    />
                  </div>

                  {/* Relationship Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Relationship Status</label>
                    <select
                      name="relationshipStatus"
                      value={formData.relationshipStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                    >
                      <option value="Single">Single</option>
                      <option value="In Relationship">In Relationship</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>

                </div>

                {/* Textareas for Goals */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Career Goals</label>
                    <textarea
                      name="careerGoals"
                      value={formData.careerGoals}
                      onChange={handleChange}
                      rows="2"
                      placeholder="e.g. Seeking growth, leadership roles, transitioning careers..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Financial Goals</label>
                    <textarea
                      name="financialGoals"
                      value={formData.financialGoals}
                      onChange={handleChange}
                      rows="2"
                      placeholder="e.g. Attracting wealth, stability, investment returns..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 uppercase">Health Concerns</label>
                    <textarea
                      name="healthConcerns"
                      value={formData.healthConcerns}
                      onChange={handleChange}
                      rows="2"
                      placeholder="e.g. Managing anxiety, physical vitality, sleep balance..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none"
                    />
                  </div>
                </div>

              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all"
              >
                Calculate Celestial Alignments
              </button>

            </form>
          </motion.div>
        )}

        {/* 2. Generating Step (Spinning Loader) */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[50vh] flex flex-col justify-center items-center gap-6 text-center"
          >
            <div className="relative">
              <Compass className="w-16 h-16 text-indigo-500 animate-spin [animation-duration:3s]" />
              <Sparkles className="w-6 h-6 text-amber-400 absolute top-[-5px] right-[-5px] animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Aligning Astrological Houses...</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Reading zodiac tables, analyzing planetary positions, and calculating confidence indexes.
              </p>
            </div>
          </motion.div>
        )}

        {/* 3. Calculations Result Screen */}
        {step === 3 && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8 max-w-5xl mx-auto"
          >
            
            {/* Action Bar */}
            <div className="flex justify-between items-center no-print">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Calculate New Alignments
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/60 hover:bg-slate-800 text-xs text-slate-300 font-semibold"
                >
                  <Printer className="w-4 h-4" />
                  Print / Download PDF
                </button>
              </div>
            </div>

            {/* Core Recommendation Card Block */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start print-area">
              
              {/* Left Column: Gemstone Image and Basic Astrological Stats */}
              <div className="glass p-6 rounded-3xl border border-indigo-500/20 text-center flex flex-col gap-6 items-center">
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                  <img
                    src={result.recommendedGemstone.image}
                    alt={result.recommendedGemstone.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/90 text-[9px] text-amber-400 font-bold tracking-wide border border-amber-500/20">
                    MATCH {result.recommendedGemstone.confidenceScore}%
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-gradient-cosmic">{result.recommendedGemstone.name}</h3>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    Ruling Planet: {result.recommendedGemstone.planetAssociation}
                  </span>
                </div>

                {/* Stat badges list */}
                <div className="grid grid-cols-2 gap-3 w-full text-left pt-4 border-t border-slate-800/40">
                  <div className="p-2.5 bg-slate-900/40 border border-slate-800/40 rounded-xl">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Zodiac House</span>
                    <p className="text-xs font-bold text-slate-200 truncate">{result.zodiacSign}</p>
                  </div>
                  <div className="p-2.5 bg-slate-900/40 border border-slate-800/40 rounded-xl">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Wearing Day</span>
                    <p className="text-xs font-bold text-slate-200 truncate">{result.recommendedGemstone.recommendedDay}</p>
                  </div>
                  <div className="p-2.5 bg-slate-900/40 border border-slate-800/40 rounded-xl">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Fitting Metal</span>
                    <p className="text-xs font-bold text-slate-200 truncate">{result.recommendedGemstone.recommendedMetal}</p>
                  </div>
                  <div className="p-2.5 bg-slate-900/40 border border-slate-800/40 rounded-xl">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Fitting Finger</span>
                    <p className="text-xs font-bold text-slate-200 truncate">{result.recommendedGemstone.recommendedFinger}</p>
                  </div>
                </div>

              </div>

              {/* Right Column: Detailed Benefits and Wearing Methodology */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Description & Benefits card */}
                <div className="glass p-6 rounded-3xl border border-slate-800/40 space-y-4">
                  <h4 className="font-extrabold text-lg text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-indigo-400" />
                    Planetary Influence & Properties
                  </h4>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {result.recommendedGemstone.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide block">Key Benefits</span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400">
                      {result.recommendedGemstone.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Wearing Ritual Card */}
                <div className="glass p-6 rounded-3xl border border-slate-800/40 space-y-4">
                  <h4 className="font-extrabold text-lg text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    Consecration & Wearing Instructions
                  </h4>
                  <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/15 text-xs md:text-sm text-slate-300 leading-relaxed">
                    <p className="font-bold text-violet-300 mb-1">Ritual Procedure:</p>
                    {result.recommendedGemstone.wearingMethod}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-start gap-1">
                    <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    Ensure gemstones are cleaned regularly and energized during positive moon transits for optimum celestial output.
                  </div>
                </div>

              </div>

            </div>

            {/* Alternatives section */}
            <div className="space-y-4 mt-8 no-print">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Gem className="w-5 h-5 text-indigo-400" />
                Alternative Harmonizing Gemstones
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {result.alternativeGemstones.map((alt, i) => (
                  <div key={i} className="glass p-4 rounded-2xl border border-slate-800/40 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                      <img src={alt.image} alt={alt.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{alt.name}</h4>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Planet: {alt.planetAssociation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GemstoneRecommendation;
