import React from 'react';
import {
  Heart, Shield, Users, Target, ExternalLink,
  Compass, ShieldCheck, ArrowRight, Mountain,
  PhoneCall, Sparkles, Check, Award, School, Briefcase, Zap
} from 'lucide-react';
import { ViewState } from '../types';

interface AboutProps {
  setView?: (view: ViewState) => void;
}

const VALUES = [
  { name: 'Faith', desc: 'Serving in a way that honours Christ.', icon: <Heart size={20} className="text-brand-gold" /> },
  { name: 'Safety', desc: 'Respecting life through practical preparation.', icon: <Shield size={20} className="text-brand-gold" /> },
  { name: 'Integrity', desc: 'Working honestly and transparently.', icon: <ShieldCheck size={20} className="text-brand-gold" /> },
  { name: 'Connection', desc: 'Building unity and teamwork.', icon: <Users size={20} className="text-brand-gold" /> },
  { name: 'Excellence', desc: 'Thoughtful, well-run execution.', icon: <Award size={20} className="text-brand-gold" /> },
  { name: 'Growth', desc: 'Developing resilience and character.', icon: <Mountain size={20} className="text-brand-gold" /> }
];

const SECTORS_SERVED = [
  { sector: 'Corporates & NGOs', desc: 'Workplace first aid, fire safety, assessments, drills & team building.', icon: <Briefcase size={18} /> },
  { sector: 'Schools & Youth', desc: 'Safety education, evacuation drills, adventure clubs, hikes & camps.', icon: <School size={18} /> },
  { sector: 'Churches & Communities', desc: 'Team building, fellowship experiences, chamas & outreach programmes.', icon: <Heart size={18} /> },
  { sector: 'Event Organisers', desc: 'Medical standby teams, ambulance coordination & crowd safety planning.', icon: <Zap size={18} /> }
];

const QUALITY_COMMITMENTS = [
  'Activities planned around identified risks and group needs.',
  'Certified trainers, EMTs, proper equipment & emergency protocols.',
  'Clear scope, pricing & deliverables agreed before every engagement.'
];

const About: React.FC<AboutProps> = ({ setView }) => {
  return (
    <div className="min-h-screen bg-brand-cream pt-24 md:pt-28 pb-20 text-brand-green">

      {/* 1. HERO / WHO WE ARE */}
      <section className="px-6 mb-14 md:mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full mb-5">
            <Sparkles size={14} className="text-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-green">
              Cross Connect Africa • Nairobi, Kenya
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-green mb-5 leading-[1.1] tracking-tight">
            Connecting People. <br />
            <span className="italic text-brand-gold">Building Resilience. Saving Lives.</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-serif italic max-w-2xl mx-auto mb-8">
            Cross Connect Africa delivers workplace safety training, fire & emergency drills, event medical standby, safety equipment, and team-building programmes across Kenya.
          </p>

          <div className="pt-5 border-t border-brand-green/15 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-gray-600 font-medium">
            <span>Founded <strong>2023</strong></span>
            <span aria-hidden="true" className="text-gray-300">·</span>
            <span><strong>Valley View Office Park, Nairobi</strong></span>
            <span aria-hidden="true" className="text-gray-300">·</span>
            <span>Serving <strong>All of Kenya</strong></span>
            <span aria-hidden="true" className="text-gray-300">·</span>
            <span><strong>+254 710 974 670</strong></span>
          </div>
        </div>
      </section>

      {/* 2. MISSION, VISION & FAITH FOUNDATION */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 md:p-9 border border-brand-green/10 shadow-md rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-green text-brand-gold flex items-center justify-center rounded-xl">
                  <Target size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold block">Our Purpose</span>
                  <h2 className="text-2xl font-serif font-bold text-brand-green">Our Mission</h2>
                </div>
              </div>
              <p className="text-gray-700 text-base leading-relaxed font-serif italic">
                “To equip people and organisations with practical skills, resources and experiences that strengthen safety, preparedness, teamwork and community.”
              </p>
            </div>
          </div>

          <div className="bg-brand-green text-white p-7 md:p-9 shadow-md border-t-4 border-brand-gold rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-gold text-brand-green flex items-center justify-center rounded-xl">
                  <Compass size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold block">Our Vision</span>
                  <h2 className="text-2xl font-serif font-bold text-white">Christ-Centred Service</h2>
                </div>
              </div>
              <p className="text-brand-cream/90 text-base leading-relaxed font-serif italic mb-4">
                “To build safer, more resilient and better-connected communities through Christ-centred service, practical preparedness and purposeful adventure.”
              </p>
            </div>
            <p className="text-xs text-brand-gold/90 font-serif italic pt-3 border-t border-white/10">
              “Whatever you do, work at it with all your heart, as working for the Lord…” — Colossians 3:23
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES & WHO WE SERVE */}
      <section className="max-w-6xl mx-auto px-6 mb-16 space-y-12">
        <div>
          <div className="text-center mb-8">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.35em] block mb-1">What Anchors Us</span>
            <h2 className="text-3xl font-serif font-bold text-brand-green">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-brand-green/10 flex items-start gap-3.5 shadow-xs">
                <div className="w-10 h-10 bg-brand-green/5 rounded-xl flex items-center justify-center shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-brand-green">{v.name}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-8">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.35em] block mb-1">Who We Work With</span>
            <h2 className="text-3xl font-serif font-bold text-brand-green">Sectors We Serve</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTORS_SERVED.map((item, idx) => (
              <div key={idx} className="p-5 bg-white rounded-2xl border border-brand-green/10 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/15 text-brand-green flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-base text-brand-green mb-1">{item.sector}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOUNDER PROFILE: KEVIN MUHORO */}
      <section className="bg-white py-16 px-6 border-y border-brand-green/10 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">

            <div className="w-full md:w-5/12 relative group">
              <div className="relative overflow-hidden shadow-xl aspect-[4/5] bg-brand-green rounded-3xl border border-brand-gold/30">
                <img
                  src="https://i.imgur.com/02SKGgD.jpg"
                  alt="Kevin Muhoro - Founder & Lead Facilitator"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-green via-brand-green/80 to-transparent p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                  <div>
                    <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px] mb-0.5">Founder & Lead Facilitator</p>
                    <h3 className="text-white text-2xl font-serif font-bold">Kevin Muhoro</h3>
                  </div>
                  <a
                    href="https://kevin-muhoro-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-gold text-brand-green px-3.5 py-2 rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-1.5 shrink-0 font-bold text-[10px] uppercase tracking-wider"
                  >
                    <span>Portfolio</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-7/12 space-y-5">
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] block">
                Leadership
              </span>
              <h2 className="text-3xl font-serif font-bold text-brand-green leading-tight">
                Meet the Founder
              </h2>

              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Kevin leads Cross Connect Africa with a focus on practical workplace preparedness, purposeful outdoor experiences, and character development. Grounded in Christian faith, he serves teams, schools, churches, and organisations across Kenya.
              </p>

              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-brand-cream/60 rounded-xl border border-brand-green/10">
                  <h4 className="font-bold text-xs text-brand-green uppercase tracking-wider">Education</h4>
                  <p className="text-xs text-gray-600 mt-1">BSc Physics — Catholic University of Eastern Africa (CUEA)</p>
                </div>
                <div className="p-4 bg-brand-cream/60 rounded-xl border border-brand-green/10">
                  <h4 className="font-bold text-xs text-brand-green uppercase tracking-wider">Leadership</h4>
                  <p className="text-xs text-gray-600 mt-1">Founder & Lead Facilitator, Cross Connect Africa</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TRACK RECORD & SAFETY COMMITMENT */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="bg-brand-green text-white p-8 md:p-10 rounded-3xl border border-brand-gold/30 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.35em] block mb-1">Track Record & Standards</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Trusted Execution Across Kenya</h2>
            </div>
            <p className="text-xs text-brand-cream/80 max-w-md">
              Trusted by CITAM Kadolta, Kadolta Resort, Biblica, NGOs, schools, and corporate teams of up to 250+ participants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {QUALITY_COMMITMENTS.map((comm, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Check size={16} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="text-xs text-gray-200 leading-relaxed">{comm}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-brand-sand p-8 md:p-10 rounded-3xl border border-brand-gold/30 shadow-md space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-green">
            Ready to Plan Your Session?
          </h2>
          <p className="text-sm text-gray-700 max-w-xl mx-auto font-serif italic">
            Book safety training, assessments, drills, event medics, or team building in minutes.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            {setView && (
              <button
                onClick={() => setView(ViewState.CALCULATOR)}
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-green text-brand-gold font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-brand-gold hover:text-brand-green transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Instant Quote Calculator</span>
                <ArrowRight size={14} />
              </button>
            )}

            <a
              href="https://wa.me/254710974670?text=Hello%20Cross%20Connect%20Africa,%20we%20reviewed%20your%20programmes%20and%20would%20like%20to%20discuss%20an%20engagement."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <PhoneCall size={14} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
