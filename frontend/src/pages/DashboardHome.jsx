import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getZodiacDetails } from '../utils/zodiacHelper';
import API from '../services/api';
import { Sparkles, Calendar, PlusCircle, Compass, History, User, FileText, ArrowRight } from 'lucide-react';
import { Skeleton } from '../components/UI/Skeleton';

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, saved: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Derive client zodiac details
  const zodiacInfo = getZodiacDetails(user?.birthDetails?.dob);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get('/recommendations');
        const history = res.data.history;
        setRecentActivity(history.slice(0, 3));
        setStats({
          total: history.length,
          saved: history.length // Mock saved as total for this simple setup
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Welcome Card Banner */}
      <div className="glass-premium p-6 md:p-8 rounded-3xl border border-indigo-500/15 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Glow backdrop */}
        <div className="absolute w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl top-[-20%] right-[10%]" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Celestial Dashboard
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Welcome back, <span className="text-gradient-cosmic">{user?.name}</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
            The transits today suggest alignment in your house of {zodiacInfo.planet === 'Sun' ? 'self' : 'wisdom'}. Review your recommendation dashboard below.
          </p>
        </div>

        <div className="glass px-5 py-3 rounded-2xl flex items-center gap-3 border border-indigo-500/20 shrink-0 relative z-10">
          <Compass className="w-8 h-8 text-indigo-400 animate-spin [animation-duration:15s]" />
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Your Ruling Sign</span>
            <span className="text-sm font-extrabold text-white">{zodiacInfo.sign}</span>
          </div>
        </div>
      </div>

      {/* 2. Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Recommendations */}
        <div className="glass p-5 rounded-2xl border border-slate-800/40 hover:border-indigo-500/25 transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Recommendations</span>
            <History className="w-5 h-5 text-indigo-400" />
          </div>
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <span className="text-2xl font-extrabold text-white">{stats.total}</span>
          )}
        </div>

        {/* Saved Reports */}
        <div className="glass p-5 rounded-2xl border border-slate-800/40 hover:border-indigo-500/25 transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Saved Reports</span>
            <FileText className="w-5 h-5 text-violet-400" />
          </div>
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <span className="text-2xl font-extrabold text-white">{stats.saved}</span>
          )}
        </div>

        {/* Zodiac Sign */}
        <div className="glass p-5 rounded-2xl border border-slate-800/40 hover:border-indigo-500/25 transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Zodiac Sign</span>
            <Compass className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-xl font-extrabold text-white">{zodiacInfo.sign}</span>
        </div>

        {/* Current Lucky Gemstone */}
        <div className="glass p-5 rounded-2xl border border-slate-800/40 hover:border-indigo-500/25 transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lucky Gemstone</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <span className="text-base font-extrabold text-gradient-gold block truncate">
            {zodiacInfo.gemstone}
          </span>
        </div>

      </div>

      {/* 3. Quick Actions and Recent Activity Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Recent Activity Logs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Recent Recommendations</h3>
            <Link to="/dashboard/history" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
              View all history <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="glass p-8 rounded-2xl border border-slate-800/40 text-center space-y-4">
              <p className="text-slate-500 text-sm">No gemstone recommendations generated yet.</p>
              <Link
                to="/dashboard/recommend"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
              >
                <PlusCircle className="w-4 h-4" />
                Get Recommendation
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <Link
                  key={activity._id}
                  to={`/dashboard/history?id=${activity._id}`}
                  className="glass p-4 rounded-xl border border-slate-800/40 hover:border-indigo-500/20 hover:bg-slate-900/10 flex justify-between items-center transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                      {activity.recommendedGemstone.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {activity.recommendedGemstone.name} Recommended
                      </h4>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        Generated on {formatDate(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 bg-slate-800/40 border border-slate-700/20 px-2 py-0.5 rounded-full">
                      Match: {activity.recommendedGemstone.confidenceScore}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Quick Actions Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Quick Actions</h3>
          <div className="glass p-5 rounded-2xl border border-slate-800/40 space-y-3">
            
            <Link
              to="/dashboard/recommend"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-md hover:shadow-[0_0_10px_rgba(99,102,241,0.2)]"
            >
              <PlusCircle className="w-5 h-5" />
              Get New Recommendation
            </Link>

            <Link
              to="/dashboard/history"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-semibold text-sm hover:bg-slate-800/20 transition-all"
            >
              <History className="w-5 h-5 text-indigo-400" />
              View Recommendation History
            </Link>

            <Link
              to="/dashboard/settings"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-semibold text-sm hover:bg-slate-800/20 transition-all"
            >
              <User className="w-5 h-5 text-violet-400" />
              Update Birth Details
            </Link>

          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardHome;
