import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, MessageCircle, Send, Star, Clock, 
  ShieldCheck, CheckCircle2, Calendar, Users, ExternalLink 
} from 'lucide-react';

const VENUES = [
  'Nairobi & Environs (Karura, Karen, Ngong Hills)',
  'Naivasha Lakefront & Hell\'s Gate',
  'Sagana White Water & Rapids Adventure',
  'Limuru & Tigoni Tea Country',
  'Lukenya & Machakos Hills',
  'Mt. Kenya / Aberdares Region',
  'Client Headquarters / On-site Grounds',
  'Other / Recommend Venue'
];

const TOPICS = [
  'Corporate Team Building (Nairobi / Destination)',
  'First Aid Training (DOSHS Certified)',
  'Fire Safety & Evacuation Drills',
  'Event Medical Standby & EMT Support',
  'School Adventure Clubs & Youth Camps',
  'Mountain Hiking & Expeditions',
  'MC & Corporate Event Hosting',
  'General Inquiry / Partnerships'
];

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: TOPICS[0],
    venue: VENUES[0],
    pax: '',
    date: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    const formattedDate = form.date 
      ? new Date(form.date).toLocaleDateString('en-KE', { dateStyle: 'long' })
      : 'Date to be discussed';

    const whatsappMessage = `*CROSS CONNECT AFRICA — BOOKING & INQUIRY*
---------------------------------------
*Lead:* ${form.name}
*Organization:* ${form.company || 'Private/Individual'}
*Phone/WhatsApp:* ${form.phone || 'Provided on chat'}
*Email:* ${form.email || 'N/A'}
---------------------------------------
*Mission/Service:* ${form.subject}
*Preferred Venue:* ${form.venue}
*Estimated Scale:* ${form.pax ? `${form.pax} Participants` : 'To be confirmed'}
*Target Date:* ${formattedDate}
---------------------------------------
*Requirements / Message:*
${form.message || 'Kindly share package options, itinerary and official quote.'}`;

    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header with Local SEO Credibility */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-green">
              Official Kenya Desk • Valley View Office Park, Nairobi
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-green mb-4 tracking-tight">
            Connect with Our <span className="text-brand-gold italic">Facilitators.</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-serif italic text-base md:text-lg leading-relaxed">
            Planning a corporate team building retreat, statutory DOSHS safety drill, event medical standby, or school adventure camp? We architect solutions tailored to your team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Details, Google Reviews & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-brand-green text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl border border-brand-gold/20">
              <div className="absolute top-0 right-0 p-32 bg-brand-gold rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              
              <div className="relative z-10">
                <span className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.5em] block mb-2">Direct Contact</span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8">Nairobi Headquarters</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0 border border-white/10">
                      <Phone size={20} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-lg leading-tight">+254 710 974 670</p>
                      <p className="text-white/60 text-xs mt-0.5">Mon–Sat, 7:00 AM – 7:00 PM EAT</p>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                        Emergency Standby Medics: 24/7 on call
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0 border border-white/10">
                      <Mail size={20} className="text-brand-gold" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm sm:text-base break-words">crossconnectmissions@protonmail.com</p>
                      <p className="text-white/60 text-xs mt-0.5">Fast corporate RFP turnaround</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0 border border-white/10">
                      <MapPin size={20} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-base">Valley View Office Park</p>
                      <p className="text-white/70 text-xs leading-relaxed">
                        B1 Office 1, City Park Drive, Parklands<br/>
                        P.O. Box 18923-00100 Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response SLA Badge */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                  <Clock size={16} className="text-brand-gold shrink-0" />
                  <span className="text-xs text-white/80">Average response time: <strong>under 15 minutes</strong></span>
                </div>
              </div>
            </div>

            {/* Google Verified Review & Credibility Card */}
            <div className="p-6 bg-white rounded-3xl border border-brand-green/10 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base">
                    G
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-green">Google Business Reviews</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#d97706" className="text-brand-gold" />
                      ))}
                      <span className="text-xs font-bold text-brand-green ml-1">4.9 / 5.0</span>
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                  Verified Ratings
                </span>
              </div>
              <p className="text-xs text-gray-600 font-serif italic leading-relaxed mb-3">
                "Top-rated corporate team building facilitators and certified workplace safety training specialists in Nairobi and across Kenya."
              </p>
              <div className="text-[10px] text-gray-400 font-sans flex items-center justify-between pt-2 border-t border-gray-100">
                <span>Based on 42+ corporate & institutional reviews</span>
                <span className="text-brand-gold font-bold">100% Recommended</span>
              </div>
            </div>

            {/* Interactive Google Map Embed of Office Location */}
            <div className="rounded-3xl overflow-hidden border border-brand-green/15 shadow-md bg-white">
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-green flex items-center gap-2">
                  <MapPin size={14} className="text-brand-gold" /> Valley View Office Park, Nairobi
                </span>
                <a 
                  href="https://maps.google.com/?q=Valley+View+Office+Park+Nairobi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-brand-gold uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  Open in Maps <ExternalLink size={10} />
                </a>
              </div>
              <div className="w-full h-56 bg-gray-100">
                <iframe
                  title="Cross Connect Africa Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8471181652414!2d36.81881727496557!3d-1.2642199987236528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1737be7e3845%3A0xe54dbe059db62f01!2sValley%20View%20Office%20Park!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Right Column: Comprehensive Mission / Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-brand-green/10">
            <div className="border-b border-gray-100 pb-5 mb-8">
              <span className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.5em] block mb-1">Interactive Inquiry</span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-green">
                Request a Proposal or Consultation
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Fill in your mission parameters below to initiate an instant customized proposal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-green uppercase mb-2 tracking-wider">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-green focus:bg-white transition-colors outline-none text-xs font-medium"
                    placeholder="e.g. Christine Mutua"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-green uppercase mb-2 tracking-wider">
                    Organization / School / Group
                  </label>
                  <input 
                    type="text" 
                    value={form.company}
                    onChange={(e) => setForm({...form, company: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-green focus:bg-white transition-colors outline-none text-xs font-medium"
                    placeholder="e.g. Standard Chartered Bank / Strathmore"
                  />
                </div>
              </div>

              {/* Row 2: Phone/WhatsApp & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-green uppercase mb-2 tracking-wider">
                    WhatsApp / Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-green focus:bg-white transition-colors outline-none text-xs font-medium"
                    placeholder="e.g. 0722 000 000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-green uppercase mb-2 tracking-wider">
                    Work / Personal Email
                  </label>
                  <input 
                    type="email" 
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-green focus:bg-white transition-colors outline-none text-xs font-medium"
                    placeholder="christine@company.co.ke"
                  />
                </div>
              </div>

              {/* Row 3: Service Topic & Preferred Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-green uppercase mb-2 tracking-wider">
                    Service Required *
                  </label>
                  <select 
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-green focus:bg-white transition-colors outline-none text-xs font-medium"
                  >
                    {TOPICS.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-green uppercase mb-2 tracking-wider">
                    Preferred Venue / Region
                  </label>
                  <select 
                    value={form.venue}
                    onChange={(e) => setForm({...form, venue: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-green focus:bg-white transition-colors outline-none text-xs font-medium"
                  >
                    {VENUES.map((v, idx) => (
                      <option key={idx} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Scale (Pax) & Target Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-green uppercase mb-2 tracking-wider flex items-center gap-1.5">
                    <Users size={12} className="text-brand-gold" /> Estimated Participant Count (Pax)
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    value={form.pax}
                    onChange={(e) => setForm({...form, pax: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-green focus:bg-white transition-colors outline-none text-xs font-medium"
                    placeholder="e.g. 45"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-green uppercase mb-2 tracking-wider flex items-center gap-1.5">
                    <Calendar size={12} className="text-brand-gold" /> Target Event / Deployment Date
                  </label>
                  <input 
                    type="date" 
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-green focus:bg-white transition-colors outline-none text-xs font-medium"
                  />
                </div>
              </div>

              {/* Message / Special Needs */}
              <div>
                <label className="block text-[10px] font-bold text-brand-green uppercase mb-2 tracking-wider">
                  Specific Objectives or Requirements
                </label>
                <textarea 
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-green focus:bg-white transition-colors h-28 resize-none outline-none text-xs font-medium"
                  placeholder="Tell us about your team's goals, specific training needs, or catering & transport requirements..."
                />
              </div>

              {/* Compliance note */}
              <div className="p-4 bg-brand-cream/80 border border-brand-green/10 rounded-xl flex items-center gap-3 text-[11px] text-gray-600">
                <ShieldCheck size={18} className="text-brand-gold shrink-0" />
                <span>All corporate and institutional programs come with certified trainers, DOSHS-compliant drills, and event indemnity options.</span>
              </div>
              
              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button 
                  type="submit" 
                  className="flex-1 py-4 bg-[#25D366] text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98]"
                >
                  <MessageCircle size={18} /> Submit via WhatsApp Direct
                </button>
              </div>

              <p className="text-[10px] text-gray-400 text-center">
                Submitting opens a pre-filled direct WhatsApp discussion with our lead facilitators in Nairobi.
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
