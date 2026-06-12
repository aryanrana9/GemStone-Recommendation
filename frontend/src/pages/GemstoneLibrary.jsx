import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Search, Gem, Moon, Eye, Award, Info, BookOpen } from 'lucide-react';
import { CardSkeleton } from '../components/UI/Skeleton';
import Modal from '../components/UI/Modal';
import { useToast } from '../context/ToastContext';

const GemstoneLibrary = () => {
  const { addToast } = useToast();
  const [gemstones, setGemstones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState('All');

  // Modal States
  const [selectedGem, setSelectedGem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchGemstones = async () => {
    try {
      setLoading(true);
      const res = await API.get('/gemstones');
      setGemstones(res.data.gemstones);
    } catch (error) {
      addToast('Failed to load gemstone library catalog.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGemstones();
  }, []);

  const planetsList = ['All', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  // Filter gemstones based on search and planet selection
  const filteredGems = gemstones.filter((gem) => {
    const matchesSearch = gem.name.toLowerCase().includes(search.toLowerCase()) ||
                          gem.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesPlanet = selectedPlanet === 'All' || 
                          gem.planetAssociation.toLowerCase() === selectedPlanet.toLowerCase();
    
    return matchesSearch && matchesPlanet;
  });

  const openGemDetails = (gem) => {
    setSelectedGem(gem);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Gemstone Library</h2>
          <p className="text-slate-400 text-xs mt-1">Explore astrological properties and care guidelines for premium crystals</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass p-4 rounded-2xl border border-slate-800/40 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search gemstones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-700/30 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Planet Filter Tags */}
        <div className="flex flex-wrap gap-1.5 items-center max-w-full overflow-x-auto">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-2 hidden sm:inline">Planet:</span>
          {planetsList.map((planet) => (
            <button
              key={planet}
              onClick={() => setSelectedPlanet(planet)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                selectedPlanet === planet
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-slate-800/30'
              }`}
            >
              {planet}
            </button>
          ))}
        </div>

      </div>

      {/* Gemstones Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <CardSkeleton key={n} />
          ))}
        </div>
      ) : filteredGems.length === 0 ? (
        <div className="glass p-12 rounded-3xl border border-slate-800/40 text-center text-slate-500">
          No gemstones matches your query.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGems.map((gem) => (
            <div
              key={gem._id}
              onClick={() => openGemDetails(gem)}
              className="glass rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:scale-[1.01] flex flex-col group cursor-pointer"
            >
              
              {/* Product Card Image container */}
              <div className="relative h-48 overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-800/35">
                <img
                  src={gem.image}
                  alt={gem.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-[10px] text-indigo-300 font-semibold uppercase">
                  {gem.planetAssociation}
                </div>
              </div>

              {/* Product Content body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors flex justify-between items-center">
                    {gem.name}
                    <Eye className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mt-1">
                    {gem.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-800/20 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Zodiac Matches:</span>
                  <span className="text-indigo-400 font-semibold truncate max-w-[120px]">
                    {gem.zodiacCompatibility.slice(0, 2).join(', ')}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Gemstone Details Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Gemstone Details">
        {selectedGem && (
          <div className="space-y-6">
            
            {/* Header section with image */}
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-indigo-500/20 shadow-lg">
                <img src={selectedGem.image} alt={selectedGem.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold text-gradient-cosmic">{selectedGem.name}</h4>
                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-1">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] text-indigo-400 font-semibold uppercase">
                    Planet: {selectedGem.planetAssociation}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] text-amber-400 font-semibold uppercase">
                    Metal: {selectedGem.recommendedMetal}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Description</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/30 p-4 rounded-xl border border-slate-800/40">
                {selectedGem.description}
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Metaphysical Benefits</span>
              <ul className="grid grid-cols-1 gap-2 text-xs text-slate-400">
                {selectedGem.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Care instructions and wearing guide split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800/20">
              
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  Wearing Guide
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Recommended to wear on your <strong className="text-slate-350">{selectedGem.recommendedFinger}</strong> on <strong className="text-slate-350">{selectedGem.recommendedDay}s</strong>.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Info className="w-4 h-4 text-violet-400" />
                  Care Instructions
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {selectedGem.careInstructions}
                </p>
              </div>

            </div>

          </div>
        )}
      </Modal>

    </div>
  );
};

export default GemstoneLibrary;
