import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-cosmic-950/70 backdrop-blur-sm"
          />

          {/* Modal content body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="glass-premium border border-slate-700/30 p-6 rounded-2xl shadow-2xl relative w-full max-w-lg z-10 text-slate-100 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-700/30">
              <h3 className="text-xl font-bold font-sans text-gradient-cosmic">{title}</h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-100 transition-colors p-1 rounded-lg hover:bg-slate-800/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2 text-sm text-slate-300 space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
