
import { MessageSquare, Send, Minimize2, User, ShieldCheck, RotateCcw } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { chatWithConsultant } from '../services/geminiService';
import { ChatMessage } from '../types';

const MissionConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Jambo! I'm Kevin Muhoro. I'm currently on the Ngong Hills ridge, but I've got my radio on. How can I help you architect your mission?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithConsultant(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Signal lost. Check your connection or API configuration." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const restoreMessageToInput = (text: string) => {
    setInput(text);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 p-4 bg-brand-green text-brand-gold rounded-full shadow-2xl transition-all duration-500 flex items-center gap-3 border border-brand-gold/30 hover:scale-105 ${isOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <MessageSquare size={24} />
        <span className="text-xs font-bold uppercase tracking-widest pr-2 hidden sm:inline">Consultant Online</span>
      </button>

      <div className={`fixed bottom-6 left-6 z-50 w-full max-w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-green/10 flex flex-col transition-all duration-500 ease-in-out ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-brand-green p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 overflow-hidden border border-brand-gold/40 flex items-center justify-center">
                <img 
                  src="https://i.imgur.com/pADVOmg.jpeg" 
                  alt="Kevin Muhoro" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-brand-green rounded-full"></div>
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-1">
                Kevin Muhoro <ShieldCheck size={12} className="text-brand-gold" />
              </div>
              <div className="text-[10px] opacity-60 uppercase tracking-widest">Lead Strategist</div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors">
            <Minimize2 size={20} />
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex-grow h-80 overflow-y-auto p-4 space-y-4 bg-brand-cream/30"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.03%22/%3E%3C/svg%3E')" }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex group relative ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed relative ${msg.role === 'user' ? 'bg-brand-green text-white rounded-tr-none shadow-md' : 'bg-white border border-brand-green/5 text-gray-700 shadow-sm rounded-tl-none'}`}>
                {msg.text}
                <button 
                  onClick={() => restoreMessageToInput(msg.text)}
                  title="Restore to input"
                  className={`absolute -top-2 ${msg.role === 'user' ? '-left-6' : '-right-6'} p-1 bg-white rounded-full shadow-sm text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100`}
                >
                  <RotateCcw size={10} />
                </button>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-brand-green/5 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Radio in your request..."
            className="flex-grow bg-gray-50 border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-green"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-brand-green text-brand-gold p-2 rounded-lg disabled:opacity-50 transition-all active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default MissionConsultant;
