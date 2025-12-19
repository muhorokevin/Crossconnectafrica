
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    const whatsappMessage = `*WEB INQUIRY*
Name: ${form.name}
Subject: ${form.subject || 'General Inquiry'}
-----------------------
${form.message}`;

    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-12">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-green mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Have questions about our programs, expeditions, or corporate packages? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="bg-brand-green text-white p-10 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="absolute top-0 right-0 p-32 bg-brand-gold rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg"><Phone size={24} className="text-brand-gold" /></div>
                        <div>
                            <p className="font-bold text-lg">+254 710 974 670</p>
                            <p className="text-white/60 text-sm">Mon-Fri, 8am-5pm</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg"><Mail size={24} className="text-brand-gold" /></div>
                        <div>
                            <p className="font-bold text-lg">crossconnectmisiions@protonmail.com</p>
                            <p className="text-white/60 text-sm">Response within 24 hours</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg"><MapPin size={24} className="text-brand-gold" /></div>
                        <div>
                            <p className="font-bold text-lg">Valley View Office Park</p>
                            <p className="text-white/60 text-sm">B1 Office 1<br/>P.O. Box 18923-00100 Nairobi</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-12">
                <p className="text-white/80 italic text-sm">"Iron sharpens iron, so one person sharpens another." - Proverbs 27:17</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-serif font-bold text-brand-green mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Your Name</label>
                    <input 
                        type="text" 
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green transition-colors"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Subject</label>
                    <select 
                        value={form.subject}
                        onChange={(e) => setForm({...form, subject: e.target.value})}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green transition-colors"
                    >
                        <option value="">Select a Topic</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Corporate Booking">Corporate Booking</option>
                        <option value="School Program">School Program</option>
                        <option value="Safety Training">Safety Training (First Aid/Fire)</option>
                        <option value="Expedition/Hike">Expedition/Hike</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
                    <textarea 
                        value={form.message}
                        onChange={(e) => setForm({...form, message: e.target.value})}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green transition-colors h-32 resize-none"
                        placeholder="How can we help you?"
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="w-full py-4 bg-brand-green text-white font-bold uppercase tracking-widest rounded-lg hover:bg-brand-green/90 transition-all flex items-center justify-center gap-2"
                >
                    <Send size={18} /> Send via WhatsApp
                </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
