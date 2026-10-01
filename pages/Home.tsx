
import React from 'react';
import { 
  ArrowRight, Zap, Award, MoveDown, Shield, Compass, Briefcase, Flame, 
  CheckCircle2, Star, ShieldCheck, MapPin
} from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  setView: (view: ViewState) => void;
}

const TRUSTED_CLIENTS = [
  'CITAM',
  'Kadolta Resort',
  'Biblica',
  'NGOs'
];

const COMPLIANCE_PILLARS = [
  { title: 'DOSHS Compliant', subtitle: 'Workplace Safety & Evacuation' },
  { title: 'Certified EMT Medics', subtitle: 'On-Demand Medical Standby' },
  { title: 'Licensed Wilderness Guides', subtitle: 'Mountain & Forest Escorts' },
  { title: 'Full Public Liability', subtitle: 'Comprehensive Event Indemnity' }
];

const CORE_SERVICES = [
  { 
    icon: <Briefcase size={24} />, 
    title: 'Corporate Team Building', 
    desc: 'High-impact indoor & outdoor team facilitation designed for collaboration and trust.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000'
  },
  { 
    icon: <Shield size={24} />, 
    title: 'First Aid & Fire Safety', 
    desc: 'DOSHS-compliant staff training, live fire extinguisher drills, and CPR certification.',
    img: 'https://i.imgur.com/77asrRI.jpg'
  },
  { 
    icon: <Zap size={24} />, 
    title: 'Event Medical Standby', 
    desc: 'Professional EMT paramedical standby, trauma response, and ambulance coordination.',
    img: 'https://i.imgur.com/dXyQVwQ.jpeg'
  },
  { 
    icon: <Compass size={24} />, 
    title: 'School Adventure Clubs', 
    desc: 'Junior Adventurers and Senior Pioneers expeditions, bushcraft, and leadership camps.',
    img: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=1000'
  }
];

const FEATURED_DESTINATIONS = [
  { name: 'Naivasha Lakefront', desc: 'Resort grounds, Hell\'s Gate & scenic challenge zones' },
  { name: 'Sagana White Water', desc: 'River rapids, zip-lining & tactical problem-solving' },
  { name: 'Limuru & Tigoni', desc: 'Cool forest trails, tea plantations & retreat lodges' },
  { name: 'Your Facility / On-Site', desc: 'Turnkey mobile setup at your headquarters or campus' }
];

const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop" 
            alt="Majestic Mountain Peak" 
            className="w-full h-full object-cover brightness-[0.32] animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green/30 via-transparent to-brand-green/90"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-16">
          <div className="inline-flex items-center gap-2 border border-brand-gold/40 rounded-full px-5 py-2 mb-6 backdrop-blur-md">
            <Award size={13} className="text-brand-gold shrink-0" />
            <span className="text-white text-[9px] font-bold uppercase tracking-[0.3em]">Character Forged Since 2023 • Nairobi, Kenya</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-white font-bold mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Rugged <br/>
            <span className="text-brand-gold italic font-light">Refinement.</span>
          </h1>
          
          <p className="text-gray-300 text-sm sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-serif italic opacity-90">
            "Kenya's trusted partner for corporate team building, certified DOSHS first aid & fire safety training, event medical standby, and youth adventure camps."
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setView(ViewState.ADVENTURE_BUILDER)}
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-brand-gold text-brand-green font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px] kinetic-btn flex items-center justify-center gap-3 group"
            >
              Explore Programs <Zap size={15} className="group-hover:rotate-12 transition-transform" />
            </button>
            <button 
              onClick={() => setView(ViewState.CALCULATOR)}
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-transparent border border-white/40 text-white font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px] hover:bg-white hover:text-brand-green transition-all backdrop-blur-sm flex items-center justify-center gap-3 group"
            >
              Instant Proforma Quote <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hidden md:block">
          <MoveDown size={28} className="animate-bounce" />
        </div>
      </section>

      {/* 2. TRUST STRIP & STATUTORY ASSURANCE */}
      <section className="bg-brand-green py-6 border-b border-brand-gold/20 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-brand-gold shrink-0">
              Trusted Across Kenya:
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-xs text-brand-cream/80 font-medium">
              {TRUSTED_CLIENTS.map((name, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand-gold"></span>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL NARRATIVE & STATUTORY ASSURANCE */}
      <section className="py-20 md:py-28 px-6 bg-brand-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Anchor */}
            <div className="lg:col-span-5 relative group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1973&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  alt="Wilderness Mentorship"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.3em] block mb-1">Our Standard</span>
                  <p className="text-xl font-serif font-bold italic">Grit, Discipline & Grace.</p>
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.5em] block">
                The Foundation
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green tracking-tight leading-tight">
                Empowering Teams Through <br/>
                <span className="italic font-light text-brand-gold">Purpose & Preparedness.</span>
              </h2>
              <div className="w-16 h-1 bg-brand-gold/40"></div>
              
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-serif italic">
                "We unite experiential leadership development, accredited workplace safety drills, clinical paramedic standby, and youth mentorship to transform groups into cohesive, resilient teams."
              </p>

              {/* 4 Clean Assurance Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {COMPLIANCE_PILLARS.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-brand-green/10 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-brand-green">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 font-sans mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-8 border-t border-brand-green/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-brand-green">DOSHS</div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Safety Standards</div>
                </div>
                <div className="h-8 w-px bg-brand-green/10"></div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-brand-green">EMT</div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Emergency Readiness</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES (STREAMLINED 4-CARD GRID) */}
      <section className="py-20 md:py-24 bg-white border-y border-brand-green/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Core Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green tracking-tight">
              Featured <span className="text-brand-gold italic">Services.</span>
            </h2>
            <p className="text-gray-500 text-xs md:text-sm font-serif italic mt-3">
              Curated experiences designed to meet statutory compliance, team unity, and emergency resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_SERVICES.map((srv, idx) => (
              <div 
                key={idx} 
                className="group bg-brand-cream border border-brand-green/10 rounded-3xl overflow-hidden hover:border-brand-gold/60 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={srv.img} 
                    alt={srv.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 text-brand-gold">
                    {srv.icon}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-brand-green mb-2">{srv.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">{srv.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-brand-green/10">
                    <button 
                      onClick={() => setView(ViewState.ADVENTURE_BUILDER)}
                      className="text-[9px] font-bold uppercase tracking-widest text-brand-green hover:text-brand-gold flex items-center gap-1.5 transition-colors"
                    >
                      View Details <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCATIONS & VENUE FLEXIBILITY */}
      <section className="py-16 md:py-20 bg-brand-cream border-b border-brand-green/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.4em] block mb-1">Flexibility</span>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-brand-green">
                Where We <span className="text-brand-gold italic">Facilitate.</span>
              </h3>
            </div>
            <p className="text-gray-500 text-xs font-serif italic max-w-sm">
              We deploy our facilitators, gear, and medical teams anywhere in Kenya or straight to your campus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_DESTINATIONS.map((dest, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-brand-green/10 hover:border-brand-gold/40 transition-colors">
                <div className="flex items-center gap-2 text-brand-gold mb-2">
                  <MapPin size={14} />
                  <h4 className="text-sm font-serif font-bold text-brand-green">{dest.name}</h4>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{dest.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOCUSED CLIENT TESTIMONIAL & CALL TO ACTION */}
      <section className="py-20 md:py-28 relative flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.25]" 
            alt="Summit Landscape" 
          />
          <div className="absolute inset-0 bg-brand-green/70 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1 text-brand-gold mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="#d97706" />
            ))}
          </div>
          
          <blockquote className="text-base sm:text-xl text-white font-serif italic leading-relaxed mb-6">
            "The balance between high-energy physical challenges, reflective leadership debriefs, and safety vigilance was world-class. Our team is still talking about it."
          </blockquote>
          
          <p className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-10">
            Faith Mwangi • Head of People & Culture, Nairobi
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setView(ViewState.CALCULATOR)}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-brand-gold text-brand-green font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px] kinetic-btn shadow-lg"
            >
              Get Instant Quote
            </button>
            <button 
              onClick={() => setView(ViewState.CONTACT)}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-transparent border border-white/40 text-white font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px] hover:bg-white hover:text-brand-green transition-all"
            >
              Contact Facilitators
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
