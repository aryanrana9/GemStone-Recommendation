import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getZodiacDetails } from '../utils/zodiacHelper';
import { Compass, Sparkles, AlertTriangle, ShieldCheck, Heart, Info, Star } from 'lucide-react';

const ZodiacProfile = () => {
  const { user } = useAuth();
  
  const signsList = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const defaultSign = user?.birthDetails?.dob ? getZodiacDetails(user.birthDetails.dob).sign : 'Aries';
  const [selectedSign, setSelectedSign] = useState(defaultSign);

  // Get matching properties
  const zodiacData = getZodiacDetails(null); // Fallback dummy to trigger custom calculations
  
  // Custom lookup based on selected sign
  // Let's use the helper to recalculate for selectedSign
  // We can simulate dob string to yield the target sign by setting matching dates:
  const getDobForSign = (sign) => {
    const dates = {
      Aries: '2026-03-25', Taurus: '2026-04-25', Gemini: '2026-05-25',
      Cancer: '2026-06-25', Leo: '2026-07-25', Virgo: '2026-08-25',
      Libra: '2026-09-25', Scorpio: '2026-10-25', Sagittarius: '2026-11-25',
      Capricorn: '2026-12-25', Aquarius: '2026-01-25', Pisces: '2026-02-25'
    };
    return dates[sign];
  };

  const activeZodiac = getZodiacDetails(getDobForSign(selectedSign));

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Zodiac Profile</h2>
          <p className="text-slate-400 text-xs mt-1">Explore your ruling signs, personality parameters, and compatibility factors</p>
        </div>

        {/* Dropdown sign selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Select Sign:</span>
          <select
            value={selectedSign}
            onChange={(e) => setSelectedSign(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold"
          >
            {signsList.map((sign) => (
              <option key={sign} value={sign} className="bg-slate-950 text-slate-200">{sign}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main card grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Sign Title, ruling elements, description */}
        <div className="glass p-6 rounded-3xl border border-slate-800/40 text-center flex flex-col gap-5 items-center relative overflow-hidden">
          <div className="absolute w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl top-[-10%]" />
          
          <div className="w-20 h-20 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Compass className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white">{activeZodiac.sign}</h3>
            <span className="text-xs text-slate-500 uppercase tracking-widest block font-semibold">
              Ruling Planet: {activeZodiac.planet}
            </span>
          </div>

          <p className="text-xs text-slate-350 leading-relaxed text-justify pt-3 border-t border-slate-800/40">
            {activeZodiac.description}
          </p>
        </div>

        {/* Right Columns: Core parameters grid */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass p-4 rounded-xl border border-slate-800/40">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-0.5">Lucky Gemstone</span>
              <p className="text-xs font-bold text-gradient-gold truncate">{activeZodiac.gemstone}</p>
            </div>
            <div className="glass p-4 rounded-xl border border-slate-800/40">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-0.5">Lucky Colors</span>
              <p className="text-xs font-bold text-slate-250 truncate">{activeZodiac.color}</p>
            </div>
            <div className="glass p-4 rounded-xl border border-slate-800/40">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-0.5">Lucky Numbers</span>
              <p className="text-xs font-bold text-slate-250 truncate">{activeZodiac.number}</p>
            </div>
            <div className="glass p-4 rounded-xl border border-slate-800/40">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-0.5">Compatible Signs</span>
              <p className="text-xs font-bold text-slate-250 truncate">{activeZodiac.compatible}</p>
            </div>
          </div>

          {/* Strengths & Weaknesses Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strengths card */}
            <div className="glass p-6 rounded-2xl border border-slate-800/40 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Strengths
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeZodiac.strengths}
              </p>
            </div>

            {/* Weaknesses card */}
            <div className="glass p-6 rounded-2xl border border-slate-800/40 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Weaknesses
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeZodiac.weaknesses}
              </p>
            </div>

          </div>

          {/* Personality description */}
          <div className="glass p-6 rounded-2xl border border-slate-800/40 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Star className="w-4 h-4 text-indigo-400" />
              Personality Traits Summary
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeZodiac.traits.split(',').map((trait, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full"
                >
                  {trait.trim()}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 flex items-center gap-1.5 pt-3">
              <Info className="w-3.5 h-3.5" />
              Zodiac characteristics are derived from traditional solar chart tables. Gemstone recommendation matches these traits.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ZodiacProfile;
