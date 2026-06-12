import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getZodiacDetails } from '../utils/zodiacHelper';
import API from '../services/api';
import { Moon, Calendar, Info, RefreshCw, Sun } from 'lucide-react';
import { Skeleton } from '../components/UI/Skeleton';
import { useToast } from '../context/ToastContext';

const Horoscope = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const signsList = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  // Default sign to user zodiac or Aries
  const defaultSign = user?.birthDetails?.dob ? getZodiacDetails(user.birthDetails.dob).sign : 'Aries';

  const [selectedSign, setSelectedSign] = useState(defaultSign);
  const [activeTab, setActiveTab] = useState('daily'); // daily, weekly, monthly
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHoroscope = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/horoscope/${selectedSign}`);
      setHoroscope(res.data.horoscope);
    } catch (error) {
      addToast(`Failed to load forecast for ${selectedSign}.`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoroscope();
  }, [selectedSign]);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Zodiac Horoscope</h2>
          <p className="text-slate-400 text-xs mt-1">Check daily, weekly, or monthly transit alignments</p>
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

      {/* Tab controls */}
      <div className="flex border-b border-slate-800/40 gap-4 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('daily')}
          className={`py-3 px-2 border-b-2 transition-colors ${
            activeTab === 'daily'
              ? 'border-indigo-500 text-indigo-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
        >
          Daily View
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`py-3 px-2 border-b-2 transition-colors ${
            activeTab === 'weekly'
              ? 'border-indigo-500 text-indigo-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
        >
          Weekly View
        </button>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`py-3 px-2 border-b-2 transition-colors ${
            activeTab === 'monthly'
              ? 'border-indigo-500 text-indigo-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
        >
          Monthly View
        </button>
      </div>

      {/* Forecast Content container */}
      {loading ? (
        <div className="glass p-8 rounded-3xl border border-slate-800/40 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : horoscope ? (
        <div className="glass p-6 md:p-8 rounded-3xl border border-slate-800/40 space-y-6 relative overflow-hidden">
          {/* Glowing neon sphere background decoration */}
          <div className="absolute w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -top-20 -right-20" />
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl shrink-0">
              <Sun className="w-5 h-5 animate-spin [animation-duration:30s]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gradient-cosmic">{selectedSign} Forecast</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">
                Cycle: {activeTab} &bull; Updated on {new Date(horoscope.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-slate-900/35 border border-slate-800/35 text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            {activeTab === 'daily' && horoscope.daily}
            {activeTab === 'weekly' && horoscope.weekly}
            {activeTab === 'monthly' && horoscope.monthly}
          </div>

          <div className="flex gap-2 items-center text-[10px] text-slate-500">
            <Info className="w-3.5 h-3.5" />
            Horoscope logs are updated daily. Plan your gemstone wearing actions based on transit recommendations.
          </div>

        </div>
      ) : (
        <div className="glass p-12 rounded-3xl border border-slate-800/40 text-center text-slate-500">
          Forecast data not available.
        </div>
      )}

    </div>
  );
};

export default Horoscope;
