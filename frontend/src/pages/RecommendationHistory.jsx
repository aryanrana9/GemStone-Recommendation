import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import API from '../services/api';
import { Search, Calendar, ChevronRight, Trash2, Printer, Gem, Sparkles, Compass, Shield, Award, Clock } from 'lucide-react';
import { TableSkeleton } from '../components/UI/Skeleton';
import Modal from '../components/UI/Modal';

const RecommendationHistory = () => {
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Detailed Modal states
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Parse query URL parameters
  const queryParams = new URLSearchParams(location.search);
  const targetId = queryParams.get('id');

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const params = {};
      if (dateRange.start) params.startDate = dateRange.start;
      if (dateRange.end) params.endDate = dateRange.end;
      if (searchQuery) params.search = searchQuery;

      const res = await API.get('/recommendations', { params });
      setHistory(res.data.history);

      // If URL queries a specific ID, trigger its detail view on load
      if (targetId && res.data.history.length > 0) {
        const matchingReport = res.data.history.find(item => item._id === targetId);
        if (matchingReport) {
          setSelectedReport(matchingReport);
          setModalOpen(true);
        }
      }
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to retrieve history logs.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHistory();
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setDateRange({ start: '', end: '' });
    navigate('/dashboard/history');
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Avoid triggering open modal click
    if (!window.confirm('Are you sure you want to delete this recommendation report?')) {
      return;
    }

    try {
      await API.delete(`/recommendations/${id}`);
      setHistory(history.filter(item => item._id !== id));
      addToast('Report deleted successfully.', 'success');
      if (modalOpen && selectedReport?._id === id) {
        setModalOpen(false);
      }
    } catch (error) {
      addToast('Failed to delete report.', 'error');
    }
  };

  const openReportDetails = (report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Recommendation History</h2>
          <p className="text-slate-400 text-xs mt-1">Review all your previous astrological gemstone calculations</p>
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <form onSubmit={handleSearchSubmit} className="glass p-5 rounded-2xl border border-slate-800/40 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Keyword Search */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Keyword Search</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Gemstone or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-700/30 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">From Date</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <Calendar className="w-4 h-4" />
            </span>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-700/30 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">To Date</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <Calendar className="w-4 h-4" />
            </span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-700/30 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Search Action buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-3 py-2 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            Reset
          </button>
        </div>

      </form>

      {/* History table list */}
      {loading ? (
        <TableSkeleton />
      ) : history.length === 0 ? (
        <div className="glass p-12 rounded-2xl border border-slate-800/40 text-center text-slate-500">
          No matching recommendation records found.
        </div>
      ) : (
        <div className="glass rounded-2xl border border-slate-800/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-300">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800/40 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Zodiac Sign</th>
                  <th className="p-4">Recommended Stone</th>
                  <th className="p-4">Planet</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/20 text-xs">
                {history.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => openReportDetails(item)}
                    className="hover:bg-slate-800/20 cursor-pointer transition-colors group"
                  >
                    <td className="p-4 font-semibold text-slate-200">{item.inputs.fullName}</td>
                    <td className="p-4">{item.zodiacSign}</td>
                    <td className="p-4 text-indigo-400 font-semibold">{item.recommendedGemstone.name}</td>
                    <td className="p-4">{item.recommendedGemstone.planetAssociation}</td>
                    <td className="p-4 text-slate-500">{formatDate(item.createdAt)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openReportDetails(item);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Open Details"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(item._id, e)}
                          className="p-1.5 rounded-lg bg-rose-950/20 text-rose-400 hover:text-rose-300 hover:bg-rose-900/30 transition-colors"
                          title="Delete Report"
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
        </div>
      )}

      {/* Detailed Report Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Celestial Analysis Report">
        {selectedReport && (
          <div className="space-y-6">
            
            {/* Modal action buttons */}
            <div className="flex justify-end gap-2 border-b border-slate-700/20 pb-4">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
            </div>

            {/* Applicant details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800/40 text-[11px] text-slate-400">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500">Name</span>
                <p className="font-semibold text-slate-200">{selectedReport.inputs.fullName}</p>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500">Zodiac Sign</span>
                <p className="font-semibold text-slate-200">{selectedReport.zodiacSign}</p>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500">Birth Details</span>
                <p className="font-semibold text-slate-200">{selectedReport.inputs.dob} ({selectedReport.inputs.tob})</p>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500">Confidence Match</span>
                <p className="font-semibold text-amber-400">{selectedReport.recommendedGemstone.confidenceScore}%</p>
              </div>
            </div>

            {/* Gemstone Recommendation Header */}
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-indigo-500/20">
                <img
                  src={selectedReport.recommendedGemstone.image}
                  alt={selectedReport.recommendedGemstone.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-gradient-cosmic">{selectedReport.recommendedGemstone.name}</h4>
                <p className="text-xs text-slate-400">Primary planet association: <strong className="text-slate-300">{selectedReport.recommendedGemstone.planetAssociation}</strong></p>
              </div>
            </div>

            {/* Astro parameters */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900/20 border border-slate-800/30 rounded-xl">
                <span className="text-[9px] uppercase text-slate-500 block mb-0.5">Day to Wear</span>
                <span className="font-bold text-slate-300">{selectedReport.recommendedGemstone.recommendedDay}</span>
              </div>
              <div className="p-3 bg-slate-900/20 border border-slate-800/30 rounded-xl">
                <span className="text-[9px] uppercase text-slate-500 block mb-0.5">Fitting Metal</span>
                <span className="font-bold text-slate-300">{selectedReport.recommendedGemstone.recommendedMetal}</span>
              </div>
              <div className="p-3 bg-slate-900/20 border border-slate-800/30 rounded-xl">
                <span className="text-[9px] uppercase text-slate-500 block mb-0.5">Wearing Finger</span>
                <span className="font-bold text-slate-300">{selectedReport.recommendedGemstone.recommendedFinger}</span>
              </div>
            </div>

            {/* Description & Benefits */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Influence Description</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/20 p-3.5 rounded-xl border border-slate-800/30">
                {selectedReport.recommendedGemstone.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Wearing Ritual</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-violet-950/10 p-3.5 rounded-xl border border-violet-500/10">
                {selectedReport.recommendedGemstone.wearingMethod}
              </p>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
};

export default RecommendationHistory;
