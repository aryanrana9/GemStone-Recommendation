import React from 'react';
import { Sparkles, Mail, MapPin, Globe, Twitter, Github, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass border-t border-slate-700/20 pt-16 pb-8 text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="font-extrabold text-lg tracking-wider text-white">
                Astro<span className="text-indigo-400">Gem</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Discover celestial alignments and gemstone energies tailored specifically to your destiny. Align your energy with the universe.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-lg bg-slate-800/40 hover:bg-indigo-600/20 hover:text-indigo-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800/40 hover:bg-indigo-600/20 hover:text-indigo-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800/40 hover:bg-indigo-600/20 hover:text-indigo-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#gemstones" className="hover:text-white transition-colors">Gemstones</a>
              </li>
              <li>
                <a href="#horoscope" className="hover:text-white transition-colors">Horoscope</a>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>support@astrogem.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Cosmic Way, Space Center 404</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>www.astrogem.com</span>
              </li>
            </ul>
          </div>

          {/* Legal / Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-700/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} AstroGem. All rights reserved.</span>
          <span className="mt-2 md:mt-0 flex gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
