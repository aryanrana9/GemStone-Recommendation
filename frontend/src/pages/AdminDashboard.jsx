import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useToast } from '../context/ToastContext';
import { ShieldCheck, BarChart3, Users, Gem, Moon, Plus, Edit3, Trash2, Save, HelpCircle } from 'lucide-react';
import { Skeleton, TableSkeleton } from '../components/UI/Skeleton';
import Modal from '../components/UI/Modal';

const AdminDashboard = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, users, gemstones, horoscope

  // Analytics Metrics
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  // Users Management
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  // Gemstones Management
  const [gemstones, setGemstones] = useState([]);
  const [gemstonesLoading, setGemstonesLoading] = useState(true);
  
  // Gemstone Edit Modals
  const [gemModalOpen, setGemModalOpen] = useState(false);
  const [editingGem, setEditingGem] = useState(null); // null = Add Gemstone, object = Edit Gemstone
  const [gemForm, setGemForm] = useState({
    name: '',
    image: '',
    description: '',
    benefits: '',
    zodiacCompatibility: '',
    planetAssociation: '',
    wearingMethod: '',
    recommendedMetal: '',
    recommendedFinger: '',
    recommendedDay: '',
    careInstructions: ''
  });

  // Horoscope Management
  const [horoscopes, setHoroscopes] = useState([]);
  const [selectedHoroscopeSign, setSelectedHoroscopeSign] = useState('Aries');
  const [horoscopeForm, setHoroscopeForm] = useState({ daily: '', weekly: '', monthly: '' });
  const [horoscopeLoading, setHoroscopeLoading] = useState(false);

  const signsList = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  // Fetch functions
  const fetchAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      const res = await API.get('/admin/analytics');
      setAnalytics(res.data.analytics);
    } catch (error) {
      console.error('Failed to load admin analytics:', error.message);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const res = await API.get('/admin/users');
      setUsers(res.data.users);
    } catch (error) {
      console.error('Failed to load user accounts list:', error.message);
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchGemstones = async () => {
    try {
      setGemstonesLoading(true);
      const res = await API.get('/gemstones');
      setGemstones(res.data.gemstones);
    } catch (error) {
      console.error('Failed to load gemstones list:', error.message);
    } finally {
      setGemstonesLoading(false);
    }
  };

  const fetchHoroscopeData = async () => {
    try {
      setHoroscopeLoading(true);
      const res = await API.get(`/horoscope/${selectedHoroscopeSign}`);
      setHoroscopeForm({
        daily: res.data.horoscope.daily,
        weekly: res.data.horoscope.weekly,
        monthly: res.data.horoscope.monthly
      });
    } catch (error) {
      // Clear forms if not found
      setHoroscopeForm({ daily: '', weekly: '', monthly: '' });
    } finally {
      setHoroscopeLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'analytics') fetchAnalytics();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'gemstones') fetchGemstones();
    if (activeTab === 'horoscope') fetchHoroscopeData();
  }, [activeTab, selectedHoroscopeSign]);

  // User deletion
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user profile? This cannot be undone.')) {
      return;
    }
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      addToast('User deleted successfully.', 'success');
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to delete user.', 'error');
    }
  };

  // Gemstone Modal opens
  const handleOpenGemModal = (gem = null) => {
    if (gem) {
      setEditingGem(gem);
      setGemForm({
        name: gem.name,
        image: gem.image,
        description: gem.description,
        benefits: gem.benefits ? gem.benefits.join(', ') : '',
        zodiacCompatibility: gem.zodiacCompatibility ? gem.zodiacCompatibility.join(', ') : '',
        planetAssociation: gem.planetAssociation,
        wearingMethod: gem.wearingMethod,
        recommendedMetal: gem.recommendedMetal,
        recommendedFinger: gem.recommendedFinger,
        recommendedDay: gem.recommendedDay,
        careInstructions: gem.careInstructions || ''
      });
    } else {
      setEditingGem(null);
      setGemForm({
        name: '',
        image: '',
        description: '',
        benefits: '',
        zodiacCompatibility: '',
        planetAssociation: 'Sun',
        wearingMethod: '',
        recommendedMetal: 'Gold',
        recommendedFinger: 'Ring Finger',
        recommendedDay: 'Sunday',
        careInstructions: ''
      });
    }
    setGemModalOpen(true);
  };

  // Gemstone Form submit handler
  const handleGemFormSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...gemForm,
      benefits: gemForm.benefits.split(',').map(b => b.trim()).filter(b => b),
      zodiacCompatibility: gemForm.zodiacCompatibility.split(',').map(z => z.trim()).filter(z => z)
    };

    try {
      if (editingGem) {
        // Edit update API
        const res = await API.put(`/admin/gemstones/${editingGem._id}`, formattedData);
        setGemstones(gemstones.map(g => g._id === editingGem._id ? res.data.gemstone : g));
        addToast('Gemstone updated successfully!', 'success');
      } else {
        // Add create API
        const res = await API.post('/admin/gemstones', formattedData);
        setGemstones([...gemstones, res.data.gemstone]);
        addToast('Gemstone created successfully!', 'success');
      }
      setGemModalOpen(false);
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to save gemstone configurations.', 'error');
    }
  };

  // Gemstone Delete
  const handleDeleteGemstone = async (id) => {
    if (!window.confirm('Delete this gemstone?')) return;
    try {
      await API.delete(`/admin/gemstones/${id}`);
      setGemstones(gemstones.filter(g => g._id !== id));
      addToast('Gemstone deleted successfully.', 'success');
    } catch (error) {
      addToast('Failed to delete gemstone.', 'error');
    }
  };

  // Horoscope Submit handler
  const handleHoroscopeSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/admin/horoscope/${selectedHoroscopeSign}`, horoscopeForm);
      addToast(`Horoscope forecast for ${selectedHoroscopeSign} updated!`, 'success');
    } catch (error) {
      addToast('Failed to update horoscope details.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Title Bar */}
      <div className="flex justify-between items-center border-b border-slate-800/40 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-violet-400" />
            Admin Dashboard Control
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">Control gemstone definitions, modify user lists, and edit weekly/daily transits</p>
        </div>
      </div>

      {/* Admin Tab buttons */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/40 pb-1 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'analytics' ? 'border-violet-500 text-violet-400' : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'users' ? 'border-violet-500 text-violet-400' : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
        >
          <Users className="w-4 h-4" />
          User Management
        </button>
        <button
          onClick={() => setActiveTab('gemstones')}
          className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'gemstones' ? 'border-violet-500 text-violet-400' : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
        >
          <Gem className="w-4 h-4" />
          Gemstones CRUD
        </button>
        <button
          onClick={() => setActiveTab('horoscope')}
          className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'horoscope' ? 'border-violet-500 text-violet-400' : 'border-transparent text-slate-500 hover:text-slate-350'
          }`}
        >
          <Moon className="w-4 h-4" />
          Horoscope Seeder
        </button>
      </div>

      {/* Tab 1: Analytics Dashboard metrics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {analyticsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(n => <Skeleton key={n} className="h-24 w-full rounded-2xl" />)}
            </div>
          ) : analytics ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass p-5 rounded-2xl border border-slate-800/40">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Registered Users</span>
                <p className="text-3xl font-extrabold text-white mt-2">{analytics.totalUsers}</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-slate-800/40">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Recommendations</span>
                <p className="text-3xl font-extrabold text-white mt-2">{analytics.totalRecommendations}</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-slate-800/40">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Most Picked Crystal</span>
                <p className="text-xl font-extrabold text-gradient-gold mt-2 truncate">{analytics.mostRecommendedGemstone}</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-slate-800/40">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Search Users</span>
                <p className="text-3xl font-extrabold text-white mt-2">{analytics.totalActiveUsers}</p>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Tab 2: User Account lists */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {usersLoading ? (
            <TableSkeleton />
          ) : users.length === 0 ? (
            <div className="glass p-8 rounded-2xl border border-slate-800/40 text-slate-500 text-center">No users found</div>
          ) : (
            <div className="glass border border-slate-800/40 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse text-slate-350">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800/40 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Birth Date</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/20">
                  {users.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-800/10">
                      <td className="p-4 font-semibold text-slate-200">{item.name}</td>
                      <td className="p-4">{item.email}</td>
                      <td className="p-4 uppercase font-bold text-[10px] text-indigo-400">{item.role}</td>
                      <td className="p-4 text-slate-500">{item.birthDetails?.dob || 'N/A'}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(item._id)}
                          disabled={item.role === 'admin'}
                          className="p-1.5 rounded-lg bg-rose-950/20 text-rose-400 hover:text-rose-300 disabled:opacity-30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Gemstones CRUD control */}
      {activeTab === 'gemstones' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleOpenGemModal(null)}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add New Gemstone
            </button>
          </div>

          {gemstonesLoading ? (
            <TableSkeleton />
          ) : gemstones.length === 0 ? (
            <div className="glass p-8 rounded-2xl border border-slate-800/40 text-slate-500 text-center">No gemstones in database.</div>
          ) : (
            <div className="glass border border-slate-800/40 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse text-slate-350">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800/40 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Gemstone</th>
                    <th className="p-4">Planet</th>
                    <th className="p-4">Zodiac Compatibilities</th>
                    <th className="p-4">Metal</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/20">
                  {gemstones.map((gem) => (
                    <tr key={gem._id} className="hover:bg-slate-800/10">
                      <td className="p-4 font-semibold text-slate-200 flex items-center gap-2">
                        <div className="w-8 h-8 rounded overflow-hidden shrink-0 border border-slate-800">
                          <img src={gem.image} alt={gem.name} className="w-full h-full object-cover" />
                        </div>
                        {gem.name}
                      </td>
                      <td className="p-4 font-bold text-indigo-400">{gem.planetAssociation}</td>
                      <td className="p-4 truncate max-w-[150px]">{gem.zodiacCompatibility.join(', ')}</td>
                      <td className="p-4">{gem.recommendedMetal}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenGemModal(gem)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteGemstone(gem._id)}
                            className="p-1.5 rounded-lg bg-rose-950/20 text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Horoscope Updater */}
      {activeTab === 'horoscope' && (
        <div className="glass p-6 md:p-8 rounded-3xl border border-slate-800/40 max-w-2xl mx-auto space-y-6">
          <div className="flex justify-between items-center border-b border-slate-850 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              <Moon className="w-5 h-5 text-indigo-400" />
              Manage Transits Forecast
            </h3>
            <select
              value={selectedHoroscopeSign}
              onChange={(e) => setSelectedHoroscopeSign(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-xs text-slate-200 outline-none font-bold"
            >
              {signsList.map((sign) => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
          </div>

          {horoscopeLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : (
            <form onSubmit={handleHoroscopeSubmit} className="space-y-5 text-xs text-slate-350">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Daily Forecast Text</label>
                <textarea
                  value={horoscopeForm.daily}
                  onChange={(e) => setHoroscopeForm({ ...horoscopeForm, daily: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Weekly Forecast Text</label>
                <textarea
                  value={horoscopeForm.weekly}
                  onChange={(e) => setHoroscopeForm({ ...horoscopeForm, weekly: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Monthly Forecast Text</label>
                <textarea
                  value={horoscopeForm.monthly}
                  onChange={(e) => setHoroscopeForm({ ...horoscopeForm, monthly: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-wide flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Horoscope Updates
              </button>
            </form>
          )}
        </div>
      )}

      {/* Gemstone Create/Edit Modal */}
      <Modal
        isOpen={gemModalOpen}
        onClose={() => setGemModalOpen(false)}
        title={editingGem ? `Edit Gemstone: ${editingGem.name}` : 'Create New Gemstone'}
      >
        <form onSubmit={handleGemFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Name</label>
            <input
              type="text"
              value={gemForm.name}
              onChange={(e) => setGemForm({ ...gemForm, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Image URL</label>
            <input
              type="text"
              value={gemForm.image}
              onChange={(e) => setGemForm({ ...gemForm, image: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Description</label>
            <textarea
              value={gemForm.description}
              onChange={(e) => setGemForm({ ...gemForm, description: e.target.value })}
              rows="2"
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Metaphysical Benefits (comma separated)</label>
            <input
              type="text"
              value={gemForm.benefits}
              onChange={(e) => setGemForm({ ...gemForm, benefits: e.target.value })}
              placeholder="Leadership boost, Mental stability, Courage..."
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Ruling Planet</label>
            <select
              value={gemForm.planetAssociation}
              onChange={(e) => setGemForm({ ...gemForm, planetAssociation: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
            >
              {planetsList.slice(1).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Zodiac Compatibility (comma separated)</label>
            <input
              type="text"
              value={gemForm.zodiacCompatibility}
              onChange={(e) => setGemForm({ ...gemForm, zodiacCompatibility: e.target.value })}
              placeholder="Leo, Aries, Scorpio..."
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Recommended Metal</label>
            <input
              type="text"
              value={gemForm.recommendedMetal}
              onChange={(e) => setGemForm({ ...gemForm, recommendedMetal: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Wearing Finger</label>
            <input
              type="text"
              value={gemForm.recommendedFinger}
              onChange={(e) => setGemForm({ ...gemForm, recommendedFinger: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Wearing Day</label>
            <input
              type="text"
              value={gemForm.recommendedDay}
              onChange={(e) => setGemForm({ ...gemForm, recommendedDay: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Wearing Method & Chant Mantra</label>
            <textarea
              value={gemForm.wearingMethod}
              onChange={(e) => setGemForm({ ...gemForm, wearingMethod: e.target.value })}
              rows="2"
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-slate-400 font-bold uppercase text-[9px]">Care Instructions</label>
            <input
              type="text"
              value={gemForm.careInstructions}
              onChange={(e) => setGemForm({ ...gemForm, careInstructions: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700/30 text-slate-200 outline-none"
            />
          </div>

          <div className="sm:col-span-2 pt-2 border-t border-slate-800/40">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition-colors"
            >
              {editingGem ? 'Save Gemstone Changes' : 'Create Gemstone'}
            </button>
          </div>

        </form>
      </Modal>

    </div>
  );
};

export default AdminDashboard;
