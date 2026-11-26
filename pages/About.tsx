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
  { name: 'Faith', desc: 'We serve in a way that honours Christ.', icon: <Heart size={20} className="text-brand-gold" /> },
  { name: 'Safety', desc: 'We plan every activity with safety first.', icon: <Shield size={20} className="text-brand-gold" /> },
  { name: 'Integrity', desc: 'We are honest in how we work and charge.', icon: <ShieldCheck size={20} className="text-brand-gold" /> },
  { name: 'Connection', desc: 'We bring people together.', icon: <Users size={20} className="text-brand-gold" /> },
  { name: 'Excellence', desc: 'We prepare well and do the job properly.', icon: <Award size={20} className="text-brand-gold" /> },
  { name: 'Growth', desc: 'We help people learn and grow.', icon: <Mountain size={20} className="text-brand-gold" /> }
];

// Company Profile 2026 v2, page 8
const SECTORS_SERVED = [
  { sector: 'Corporates and businesses', desc: 'Workplace first aid, fire safety, equipment, assessments, drills and team development.', icon: <Briefcase size={18} /> },
  { sector: 'NGOs and development organisations', desc: 'Safety training, team development and outdoor programmes.', icon: <Target size={18} /> },
  { sector: 'Families and households', desc: 'Fire safety, first aid and CPR, and fun games at home, at a flat family price.', icon: <Heart size={18} /> },
  { sector: 'Schools and colleges', desc: 'Fire safety and first aid training for students and staff, evacuation drills and safety equipment.', icon: <School size={18} /> },
  { sector: 'Churches and ministries', desc: 'Team building, youth development, outdoor activities, fellowship and safety equipment.', icon: <Users size={18} /> },
  { sector: 'Chamas and community groups', desc: 'Practical safety education, teamwork and outdoor experiences.', icon: <Compass size={18} /> },
  { sector: 'Event organisers', desc: 'MC and hosting, emergency planning and medical standby.', icon: <Zap size={18} /> }
];

const QUALITY_COMMITMENTS = [
  'We check the risks before every activity.',
  'We use the right equipment and keep a first aider on hand.',
  'We agree in writing what we will deliver before each job.',
  'We give you feedback and recommendations afterwards.',
  'We are honest about our qualifications, certificates and insurance.'
];

const About: React.FC<AboutProps> = ({ setView }) => {
  return (
    <div className="min-h-screen bg-brand-cream pt-24 md:pt-28 pb-20 text-brand-green">

      {/* 1. HERO / WHO WE ARE */}
      <section className="px-6 mb-14 md:mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full mb-5">
            <Sparkles size={14} className="text-brand-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-green">
              Cross Connect Africa • Nairobi, Kenya
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-green mb-5 leading-[1.1] tracking-tight">
            Connecting People. <br />
            <span className="italic text-brand-gold">Building Resilience. Saving Lives.</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-serif italic max-w-2xl mx-auto mb-8">
            Cross Connect Africa is a Kenyan company based in Nairobi. We run team-building days, teach first aid and fire safety, supply safety equipment, and provide MCs and medics for events. Book one service or combine several into one day, planned around your group, your goals and your budget.
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
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold block">Our Purpose</span>
                  <h2 className="text-2xl font-serif font-bold text-brand-green">Our Mission</h2>
                </div>
              </div>
              <p className="text-gray-700 text-base leading-relaxed font-serif italic">
                “To give people the skills and equipment to stay safe, and time together that helps them work better as a team.”
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
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold block">Our Vision</span>
                  <h2 className="text-2xl font-serif font-bold text-white">Safer, connected communities</h2>
                </div>
              </div>
              <p className="text-brand-cream/90 text-base leading-relaxed font-serif italic mb-4">
                “Safer workplaces, schools, churches and homes across Kenya, where people know what to do in an emergency and work well together.”
              </p>
              <p className="text-sm text-brand-cream/80 leading-relaxed mb-4">
                We are a Christian company, and we work with clients of every faith and background. Where a group wants it, we include prayer, fellowship and mentoring.
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
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.35em] block mb-1">What Anchors Us</span>
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
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.35em] block mb-1">Who We Work With</span>
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
                    <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs mb-0.5">Founder & Lead Facilitator</p>
                    <h3 className="text-white text-2xl font-serif font-bold">Kevin Muhoro</h3>
                  </div>
                  <a
                    href="https://kevin-muhoro-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-gold text-brand-green px-3.5 py-2 rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-1.5 shrink-0 font-bold text-xs uppercase tracking-wider"
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
                Kevin started Cross Connect Africa to help people be ready for emergencies and to help teams work better together. He plans and leads our sessions, and hosts weddings, galas, company, church and school events in English and Swahili.
              </p>

              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-brand-cream/60 rounded-xl border border-brand-green/10">
                  <h4 className="font-bold text-sm text-brand-green">Education</h4>
                  <p className="text-sm text-gray-600 mt-1">Physics degree, The Catholic University of Eastern Africa</p>
                </div>
                <div className="p-4 bg-brand-cream/60 rounded-xl border border-brand-green/10">
                  <h4 className="font-bold text-sm text-brand-green">Ministry</h4>
                  <p className="text-sm text-gray-600 mt-1">Head of Department for youth ministry, CITAM Parklands</p>
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
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.35em] block mb-1">Track Record & Standards</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Our promise to you</h2>
            </div>
            <p className="text-sm text-brand-cream/80 max-w-md">
              Recent work: a full staff team-building day for 250 people at CITAM Kadolta, Nairobi, on 5 September 2026. Organisations we work with include CITAM (Kadolta and Parklands), Kadolta Resort, Biblica, NGOs, schools and corporate teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
