import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Compass,
  Moon,
  Clock,
  FileText,
  Star,
  ChevronDown,
  ArrowRight,
  Shield,
  HelpCircle,
  Gem
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const [popularGems, setPopularGems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFeatureClick = (path) => {
    if (token) {
      navigate(path);
    } else {
      navigate('/login', { state: { redirectUrl: path } });
    }
  };

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    // Scroll to section helper if redirected from other pages
    if (location.state && location.state.scrollToSection) {
      const element = document.getElementById(location.state.scrollToSection);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Load gemstones catalog for popular section
  useEffect(() => {
    const fetchGemstones = async () => {
      try {
        const res = await API.get('/gemstones');
        // Show first 4 gemstones as popular showcase
        setPopularGems(res.data.gemstones.slice(0, 4));
      } catch (error) {
        console.error('Error fetching gemstones:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGemstones();
  }, []);

  const features = [
    {
      title: 'Personalized Recommendations',
      desc: 'Get gemstone matching based on birth charts, zodiac signs, and active planetary houses.',
      icon: Gem,
      path: '/dashboard/recommend'
    },
    {
      title: 'Horoscope Analysis',
      desc: 'Review custom daily, weekly, and monthly horoscopes to stay in sync with cosmic transits.',
      icon: Moon,
      path: '/dashboard/horoscope'
    },
    {
      title: 'Zodiac Profile Insights',
      desc: 'Explore your planetary ruling details, compatible signs, strengths, and lucky elements.',
      icon: Compass,
      path: '/dashboard/zodiac'
    },
    {
      title: 'Recommendation History',
      desc: 'Securely archive and access your generated gemstone reports any time from your dashboard.',
      icon: Clock,
      path: '/dashboard/history'
    },
    {
      title: 'Astrology Reports',
      desc: 'Download clean, beautifully structured print-ready reports summarizing your planetary profile.',
      icon: FileText,
      path: '/dashboard/history'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Creative Director',
      rating: 5,
      text: 'I started wearing the Yellow Sapphire recommended by AstroGem, and within weeks, my mental block disappeared and I landed my dream job! The dashboard calculations are incredibly detailed.'
    },
    {
      name: 'Vikram Mehta',
      role: 'Software Engineer',
      rating: 5,
      text: 'The zodiac analysis was spot-on. The platform predicted Saturn transits in my Capricorn house and recommended Blue Sapphire. I feel much more grounded and focused now.'
    },
    {
      name: 'Elena Rostova',
      role: 'Art Historian',
      rating: 5,
      text: 'A gorgeous app with premium aesthetics. The recommendation process was simple but thoroughly detailed. The gemstone library care instructions are very helpful.'
    }
  ];

  const faqs = [
    {
      q: 'How does AstroGem recommend gemstones?',
      a: 'We use a rule-based calculation engine that processes your birth details (date, time, location of birth) to determine your primary ruling planet, moon sign, and corresponding lucky stone, customized by your present career, health, or financial challenges.'
    },
    {
      q: 'Can I download my gemstone reports?',
      a: 'Yes! Once registered, all gemstone recommendations are saved to your account. You can open any recommendation history entry and use the print function to download a clean PDF report.'
    },
    {
      q: 'Are the recommendations suitable for all zodiac signs?',
      a: 'Absolutely. The calculations map planetary rulers for all 12 zodiac houses from Aries to Pisces, adjusting recommendations for secondary gemstone choices based on specific life goals.'
    },
    {
      q: 'What is the benefit of subscribing to the Premium Plan?',
      a: 'The premium subscription gives you access to full planetary house analyses, alternative gemstones recommendations (up to 3 stones), and comprehensive weekly/monthly horoscopes with deep astrological metrics.'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Twinkling Stars Effect */}
      <div className="stars-container">
        <div className="star star-fast w-0.5 h-0.5 top-[10%] left-[20%]" />
        <div className="star star-slow w-1 h-1 top-[25%] left-[80%]" />
        <div className="star star-fast w-0.5 h-0.5 top-[40%] left-[50%]" />
        <div className="star star-slow w-1.5 h-1.5 top-[60%] left-[15%]" />
        <div className="star star-fast w-0.5 h-0.5 top-[75%] left-[90%]" />
        <div className="star star-slow w-1 h-1 top-[85%] left-[40%]" />
      </div>

      <Navbar />

      {/* 1. Hero Section */}
      <section id="hero" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col md:grid md:grid-cols-2 md:items-center gap-10 md:gap-6 lg:gap-16 min-h-[80vh] md:min-h-[85vh] py-16 md:py-0 text-center md:text-left">
        
        {/* Left Side: Content Column */}
        <div className="flex flex-col items-center md:items-start justify-center space-y-6">

          {/* Big Cosmic Title Header */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Align Your Energy with the <br className="hidden lg:inline" />
            <span className="text-gradient-cosmic">Power of Celestial Gems</span>
          </motion.h1>

          {/* Subtitle description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            Unveil the cosmic influence of planets on your destiny. Discover personalized gemstone recommendations based on your birth details and life goals.
          </motion.p>

          {/* CTAs buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
          >
            <Link
              to="/dashboard/recommend"
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] justify-center w-full sm:w-auto"
            >
              Find Your Perfect Gemstone
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
            <Link
              to="/dashboard/zodiac"
              className="px-6 py-3.5 glass border border-slate-700/30 hover:border-slate-500 text-slate-200 hover:text-white font-bold text-sm rounded-2xl transition-all duration-300 hover:bg-slate-800/20 text-center w-full sm:w-auto"
            >
              Explore Zodiac Insights
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Orbital Animation Column */}
        <div className="flex items-center justify-center relative w-full overflow-visible">
          {/* Dynamic Stylized Planet Animation in Hero */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] flex items-center justify-center shrink-0">
            {/* Glowing central orb represent Sun */}
            <div className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-indigo-500 to-violet-700 rounded-full shadow-[0_0_50px_rgba(99,102,241,0.5)] border border-indigo-400/30 flex items-center justify-center">
              <Sparkles className="w-8 h-8 lg:w-10 lg:h-10 text-indigo-200 animate-spin [animation-duration:10s]" />
            </div>

            {/* Orbiting rings */}
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 border border-indigo-500/10 rounded-full border-dashed animate-spin [animation-duration:35s]" />
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 border border-violet-500/20 rounded-full animate-spin [animation-duration:50s]" />
            
            {/* Floating Gems Orbiting in CSS */}
            <div className="absolute w-full h-full animate-orbit">
              <div className="absolute top-10 left-10 w-8 h-8 sm:w-10 sm:h-10 glass border border-amber-500/30 rounded-xl flex items-center justify-center rotate-12 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div className="absolute bottom-10 right-10 w-10 h-10 sm:w-12 sm:h-12 glass border border-rose-500/30 rounded-xl flex items-center justify-center -rotate-12 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Features Section */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Complete Astrological Suite</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Explore advanced tools designed to help you analyze charts, connect with planetary crystals, and study transits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onClick={() => handleFeatureClick(feature.path)}
              className={`glass p-8 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 hover:translate-y-[-4px] flex flex-col gap-4 relative group cursor-pointer ${
                idx === 0 ? 'md:col-span-2 md:flex-row md:items-center' : ''
              }`}
            >
              <div className="p-4 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-600/20 group-hover:text-indigo-300 transition-colors shrink-0 flex items-center justify-center">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Popular Gemstones Showcase */}
      <section id="gemstones" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Cosmic Gemstone Library</h2>
            <p className="text-slate-400 max-w-lg text-sm">
              Discover standard stones representing major planets. Click a card to read planetary properties.
            </p>
          </div>
          <Link
            to="/dashboard/library"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors group"
          >
            Explore full library
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="animate-pulse glass p-6 rounded-2xl h-80 flex flex-col gap-4">
                <div className="bg-slate-800/50 rounded-xl h-44 w-full" />
                <div className="h-6 bg-slate-800/50 w-2/3" />
                <div className="h-4 bg-slate-800/50 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGems.map((gem) => (
              <div
                key={gem._id}
                className="glass rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:scale-[1.01] flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900 flex items-center justify-center border-b border-slate-800/30">
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-[10px] text-indigo-300 font-semibold uppercase">
                    {gem.planetAssociation}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{gem.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {gem.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/20 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Zodiac:</span>
                    <span className="text-indigo-400 font-semibold">{gem.zodiacCompatibility.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Horoscope Preview banner */}
      <section id="horoscope" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-premium p-8 md:p-12 rounded-3xl border border-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              Transit Update
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Daily Transit Horoscope Insights</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Planets are constantly moving. Access daily, weekly, and monthly zodiac forecasts updated by expert astrological rules. Login to view forecasts tailored for your sign.
            </p>
          </div>
          <Link
            to="/dashboard/horoscope"
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition-all duration-200"
          >
            Check Your Horoscope
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Beloved by Cosmic Seekers</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Read stories from people who harmonized their careers, relationships, and health energies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <div key={index} className="glass p-8 rounded-2xl flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300">
              <p className="text-sm text-slate-300 italic mb-6 leading-relaxed">"{test.text}"</p>
              <div className="flex items-center justify-between border-t border-slate-800/30 pt-4">
                <div>
                  <h4 className="text-sm font-bold text-white">{test.name}</h4>
                  <span className="text-xs text-slate-500">{test.role}</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 z-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Got questions about crystals and alignments? We have answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="glass rounded-2xl overflow-hidden border border-slate-800/40">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-white font-semibold hover:bg-slate-800/25 transition-colors"
                >
                  <span className="flex items-center gap-3 text-sm md:text-base">
                    <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="p-5 pt-0 text-slate-400 text-xs md:text-sm leading-relaxed border-t border-slate-800/20">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
