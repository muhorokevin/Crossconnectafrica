import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, CheckCircle2, ChevronRight, Clock } from 'lucide-react';

interface QuickOption {
  id: string;
  title: string;
  subtitle: string;
  message: string;
}

const QUICK_OPTIONS: QuickOption[] = [
  {
    id: 'tb',
    title: 'Corporate Team Building',
    subtitle: 'Nairobi, Naivasha, Sagana & custom grounds',
    message: 'Hello Cross Connect Africa! I would like to request a quote and proposal for Corporate Team Building.'
  },
  {
    id: 'safety',
    title: 'First Aid & Fire Safety (DOSHS)',
    subtitle: 'Workplace certified training & evacuation drills',
    message: 'Hello Cross Connect Africa! We would like to book DOSHS-compliant First Aid & Fire Safety training for our team.'
  },
  {
    id: 'medic',
    title: 'Event Medical Standby',
    subtitle: 'Certified EMTs, ambulance & trauma kits',
    message: 'Hello Cross Connect Africa! We need professional Event Medical Standby services for an upcoming event.'
  },
  {
    id: 'school',
    title: 'School Adventure Clubs',
    subtitle: 'Youth outdoor leadership & survival camps',
    message: 'Hello Cross Connect Africa! I am inquiring about School Adventure Club programs and youth expeditions.'
  },
  {
    id: 'hike',
    title: 'Guided Mountain Expeditions',
    subtitle: 'Private corporate & group mountain hikes',
    message: 'Hello Cross Connect Africa! We are planning a guided group mountain hike/expedition and need logistical support.'
  },
  {
    id: 'mc',
    title: 'MC & Corporate Event Hosting',
    subtitle: 'Dynamic moderation & energizers',
    message: 'Hello Cross Connect Africa! I would like to book an MC / Event Host for our corporate function.'
  }
];

const WhatsAppQuickChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSelectOption = (option: QuickOption) => {
    const url = `https://wa.me/254710974670?text=${encodeURIComponent(option.message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = `https://wa.me/254710974670?text=${encodeURIComponent(customMsg.trim())}`;
    window.open(url, '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Pill on Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center print:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3.5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
        >
          {/* Animated pulse ring */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
          </span>

          <MessageCircle size={22} className="shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
            WhatsApp Quick Chat
          </span>
        </button>
      </div>

      {/* Floating Modal Drawer */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] bg-white rounded-2xl shadow-[0_25px_60px_rgba(2,44,34,0.25)] border border-brand-green/15 overflow-hidden animate-fade-in-up print:hidden flex flex-col max-h-[85vh]"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-brand-green text-white p-4 sm:p-5 relative">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Cross Connect Africa</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Online • Instant Kenyan Desk</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 text-[11px] text-gray-200 leading-relaxed bg-black/20 p-2.5 rounded-lg flex items-center gap-2">
              <Clock size={13} className="text-brand-gold shrink-0" />
              <span>Typical response time: <strong>under 5 minutes</strong> during business hours.</span>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="p-3 sm:p-4 overflow-y-auto max-h-[320px] space-y-2 custom-scrollbar bg-[#FDFBF7]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 px-1">
              Select what you need:
            </p>
            {QUICK_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-emerald-50/70 border border-gray-100 hover:border-[#25D366]/40 transition-all flex items-center justify-between group shadow-sm hover:shadow"
              >
                <div className="pr-2">
                  <span className="text-xs font-bold text-brand-green group-hover:text-emerald-800 block">
                    {opt.title}
                  </span>
                  <span className="text-[10px] text-gray-500 font-sans block mt-0.5">
                    {opt.subtitle}
                  </span>
                </div>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>

          {/* Custom Message Input */}
          <form onSubmit={handleCustomSend} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Or type a custom message..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#25D366] text-gray-800"
            />
            <button
              type="submit"
              disabled={!customMsg.trim()}
              className="p-2.5 bg-[#25D366] text-white rounded-xl hover:bg-[#20bd5a] disabled:opacity-40 transition-all shrink-0 shadow-sm"
              aria-label="Send WhatsApp Message"
            >
              <Send size={15} />
            </button>
          </form>

          {/* Footer note */}
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 text-center">
            <span className="text-[10px] text-gray-400 font-medium inline-flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-brand-gold" />
              Official Kenya Desk: +254 710 974 670
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppQuickChat;
