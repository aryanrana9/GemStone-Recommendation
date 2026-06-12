import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { HelpCircle, Mail, Phone, Clock, FileText, Send } from 'lucide-react';

const HelpSupport = () => {
  const { addToast } = useToast();
  const [ticket, setTicket] = useState({ subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticket.subject || !ticket.message) {
      addToast('Please fill in both fields', 'error');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setTicket({ subject: '', message: '' });
      setSubmitting(false);
      addToast('Support ticket submitted successfully! We will email you back.', 'success');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div>
        <h2 className="text-2xl font-extrabold text-white">Help & Support</h2>
        <p className="text-slate-400 text-xs mt-0.5">Submit helpdesk requests or review FAQs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Info parameter cards */}
        <div className="md:col-span-1 space-y-4">
          <div className="glass p-5 rounded-2xl border border-slate-800/40 text-xs text-slate-350 space-y-4">
            <h3 className="font-bold text-white text-sm">Direct Contact</h3>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Support Email</span>
                <span>support@astrogem.com</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-violet-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Helpline Phone</span>
                <span>+1 (800) Astro-Gem</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Response Time</span>
                <span>Within 24 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form submit ticket */}
        <div className="md:col-span-2">
          <div className="glass p-6 rounded-3xl border border-slate-800/40 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <FileText className="w-5 h-5 text-indigo-400" />
              Submit Help Ticket
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-300">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-350 uppercase">Subject</label>
                <input
                  type="text"
                  value={ticket.subject}
                  onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                  placeholder="e.g., Gemstone wear guidelines, billing..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-350 uppercase">Message Body</label>
                <textarea
                  value={ticket.message}
                  onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                  rows="4"
                  placeholder="Describe your issue..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold tracking-wide flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Sending ticket...' : 'Submit Support Ticket'}
              </button>

            </form>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HelpSupport;
