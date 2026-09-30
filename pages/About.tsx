
import React from 'react';
import { 
  Award, Heart, Shield, Users, Target, BookOpen, Quote, ExternalLink,
  Compass, ShieldCheck, CheckCircle2, ArrowRight, Mountain, Activity,
  PhoneCall, FileCheck, Sparkles, Building2
} from 'lucide-react';
import { ViewState } from '../types';

interface AboutProps {
  setView?: (view: ViewState) => void;
}

const IMPACT_METRICS = [
  { value: '5,000+', label: 'Participants Facilitated', sub: 'Across Corporate, NGO & Community Cohorts' },
  { value: '120+', label: 'Successful Missions', sub: 'Indoor Retreats & Wilderness Deployments' },
  { value: '100%', label: 'Safety Track Record', sub: 'Zero Major Incidents with EMT Protocol' },
  { value: '40+', label: 'Expedition Routes', sub: 'Mount Kenya, Aberdares, Rift Valley & Coastal Trails' }
];

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Contextual Diagnostics',
    description: 'We consult with your leadership to diagnose specific organizational frictions—whether siloed departments, leadership burnout, communication gaps, or post-restructuring tension.',
    icon: <Target size={24} />
  },
  {
    step: '02',
    title: 'Immersive Wild Challenge',
    description: 'Participants are placed in unfamiliar, dynamic outdoor simulations that strip away titles, require authentic vulnerability, and foster rapid team problem-solving.',
    icon: <Mountain size={24} />
  },
  {
    step: '03',
    title: 'Facilitated Behavioral Debrief',
    description: 'Every exercise is immediately analyzed using experiential learning models. Facilitators connect simulated field behaviors directly to real workplace dynamics and decisions.',
    icon: <Activity size={24} />
  },
  {
    step: '04',
    title: 'Actionable Workplace Pacts',
    description: 'Teams synthesize their breakthroughs into practical operational commitments, measurable empathy habits, and renewed accountability for Monday morning.',
    icon: <CheckCircle2 size={24} />
  }
];

const CORE_VALUES = [
  {
    title: 'Integrity',
    desc: 'Uncompromising transparency, authentic vulnerability, and radical honesty in both remote alpine valleys and executive conference suites.',
    icon: <Heart size={28} />
  },
  {
    title: 'Community',
    desc: 'Breaking down defensive silos to foster genuine fellowship, mutual respect, and enduring relational trust across all organizational ranks.',
    icon: <Users size={28} />
  },
  {
    title: 'Excellence',
    desc: 'Upholding field-grade standards, accredited medical trauma protocols, and high-impact experiential debrief pedagogy on every mission.',
    icon: <Award size={28} />
  },
  {
    title: 'Stewardship',
    desc: 'Strict adherence to Leave-No-Trace principles, environmental conservation, and deep reverence for the communities and wild trails we traverse.',
    icon: <Compass size={28} />
  }
];

const COMPLIANCE_LIST = [
  {
    title: 'DOSHS Workplace Safety Compliance',
    desc: 'Directorate of Occupational Safety & Health Services standards for training and physical deployments.'
  },
  {
    title: 'Red Cross Certified EMT & First Aid',
    desc: 'Wilderness First Responder protocols with fully stocked trauma response gear on every mission.'
  },
  {
    title: 'Certified Professional Facilitators (CPF)',
    desc: 'Trained in adult learning methodologies, team dynamics, behavioral debriefing, and conflict mediation.'
  },
  {
    title: 'Licensed Eco-Guiding & KWS Protocols',
    desc: 'Strict environmental compliance, licensed mountain escorts, and formal forestry conservancy permits.'
  }
];

const About: React.FC<AboutProps> = ({ setView }) => {
  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={14} className="text-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-green">
              Our Ethos & Heritage
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-brand-green mb-6 leading-[1.1]">
            Rooted in Purpose, <br/>
            <span className="italic text-brand-gold">Forged in the Wild</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light font-serif italic max-w-3xl mx-auto mb-8">
            "Cross Connect Africa is Kenya’s premier experiential team facilitation and outdoor leadership consultancy. We are dedicated to transforming corporate culture, deepening fellowship, and equipping organizations with resilient safety readiness through the power of wilderness immersion."
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-brand-green">
            <span className="px-3 py-1.5 bg-white border border-brand-green/15 shadow-sm">100% Certified Safety Record</span>
            <span className="px-3 py-1.5 bg-white border border-brand-green/15 shadow-sm">DOSHS & EMT Compliant</span>
            <span className="px-3 py-1.5 bg-white border border-brand-green/15 shadow-sm">5,000+ Participants Facilitated</span>
            <span className="px-3 py-1.5 bg-white border border-brand-green/15 shadow-sm">Pan-African Outdoor Expertise</span>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision Statements */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] block mb-2">
            Purpose & Direction
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-green">
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 text-sm mt-2 font-serif italic">
            "The twin compass points guiding our deployments across every trail, retreat, and boardroom."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white p-8 md:p-12 border-2 border-brand-green/10 shadow-xl relative overflow-hidden group hover:border-brand-green/30 transition-all flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-brand-sand/60 rounded-bl-full -mr-10 -mt-10 pointer-events-none transition-transform group-hover:scale-110"></div>
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 bg-brand-green text-brand-gold flex items-center justify-center font-bold shadow-md">
                  <Target size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold block">
                    Institutional Mandate
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-brand-green">Our Mission</h3>
                </div>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed font-serif italic mb-6">
                "To transform teams, cultivate resilient character, and build enduring community through purpose-driven wilderness immersion, psychological safety, and experiential leadership facilitation."
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-sand px-3 py-1 text-brand-green">
                • Experiential Team Building
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-sand px-3 py-1 text-brand-green">
                • Psychological Safety
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-sand px-3 py-1 text-brand-green">
                • Emergency & Safety Readiness
              </span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-brand-green text-white p-8 md:p-12 shadow-xl border-t-4 border-brand-gold relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none transition-transform group-hover:scale-110"></div>
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 bg-brand-gold text-brand-green flex items-center justify-center font-bold shadow-md">
                  <Compass size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold block">
                    Continental Horizon
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">Our Vision</h3>
                </div>
              </div>
              <p className="text-brand-cream/90 text-base md:text-lg leading-relaxed font-serif italic mb-6">
                "To be Africa's foremost experiential leadership and outdoor development institute—igniting high-trust, cohesive teams that create lasting positive impact across organizations, communities, and future generations."
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-3 py-1 text-brand-gold">
                • Pan-African Reach
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-3 py-1 text-brand-gold">
                • High-Trust Culture
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-3 py-1 text-brand-gold">
                • Generational Impact
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Impact Metrics Banner */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="bg-brand-green text-white p-8 md:p-12 shadow-2xl border-t-4 border-brand-gold">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {IMPACT_METRICS.map((metric, i) => (
              <div key={i} className={`text-center ${i > 0 ? 'pt-6 md:pt-0 md:pl-6' : ''}`}>
                <div className="text-3xl md:text-5xl font-serif font-bold text-brand-gold mb-2 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-white mb-1">
                  {metric.label}
                </div>
                <p className="text-[11px] text-gray-300 font-light leading-snug">
                  {metric.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Founder Profile */}
      <section className="bg-white py-24 px-6 relative overflow-hidden border-y border-gray-100">
        {/* Subtle geometric background watermark */}
        <div className="absolute -right-20 top-20 opacity-[0.03] rotate-45 pointer-events-none">
          <Target size={600} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            
            {/* Image Side - Facilitator Photo */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute top-6 -left-6 w-full h-full border-2 border-brand-gold rounded-none z-0 transition-all duration-500 group-hover:top-4 group-hover:-left-4"></div>
              <div className="relative z-10 overflow-hidden shadow-2xl aspect-[4/5] bg-brand-green">
                <img 
                  src="https://i.imgur.com/pADVOmg.jpeg" 
                  alt="Kevin Muhoro - Lead Facilitator" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                /> 
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-green via-brand-green/80 to-transparent p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <div>
                    <p className="text-brand-gold font-bold uppercase tracking-[0.25em] text-[10px] mb-1">Founder & Lead Facilitator</p>
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">Kevin Muhoro</h3>
                    <p className="text-white/70 text-xs font-light mt-0.5">Experiential Leadership Specialist & Outdoor Strategist</p>
                  </div>
                  <a 
                    href="https://kevin-muhoro-portfolio.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-brand-gold text-brand-green px-4 py-2.5 shadow-xl hover:scale-105 transition-all duration-300 group/link flex items-center gap-2 shrink-0"
                    title="View Strategic Portfolio"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">View Portfolio</span>
                    <ExternalLink size={14} className="group-hover/link:rotate-12 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2">
              <Quote size={48} className="text-brand-gold/30 mb-4" />
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] block mb-2">Leadership Vision</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-green mb-6 leading-tight">
                "True leadership is forged in the fire of challenge and the quiet of nature."
              </h2>
              
              <div className="space-y-5 text-gray-600 leading-relaxed text-base">
                <p>
                  As the visionary founder and Lead Facilitator of Cross Connect Africa, <strong>Kevin Muhoro</strong> brings over a decade of hands-on expertise orchestrating high-stakes corporate team breakthroughs, accredited safety drills, high-altitude expeditions, and youth empowerment summits across East Africa.
                </p>
                <p>
                  Recognizing that traditional corporate seminars rarely break down persistent interdepartmental silos, Kevin developed Cross Connect Africa’s proprietary experiential curriculum: combining physical outdoor simulation, psychological safety frameworks, and deep behavioral debriefs that translate straight into operational productivity.
                </p>
                <p>
                  Whether guiding an executive board through the moorlands of Mount Kenya, training industrial teams on live fire suppression and DOSHS first aid, or hosting high-energy corporate galas, his facilitation delivers palpable, measurable human transformation.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3.5">
                  <div className="bg-brand-green/5 p-3 rounded-none text-brand-green border border-brand-green/10">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Certified Professional Facilitator</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Experiential Adult Learning</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="bg-brand-green/5 p-3 rounded-none text-brand-green border border-brand-green/10">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Wilderness First Responder</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">EMT & Trauma Certified</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Methodology / The Experiential Cycle */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-3 block">
            Our Proven Framework
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green mb-4">
            The Experiential Learning Cycle
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We don't merely run games. Every exercise is anchored in a continuous four-stage behavioral transformation model engineered for long-term organizational retention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODOLOGY_STEPS.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 border border-gray-200 shadow-sm relative group hover:border-brand-gold transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-3xl font-serif font-bold text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                    {step.step}
                  </span>
                  <div className="text-brand-green p-2 bg-brand-sand">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-green mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                Phase {idx + 1} Protocol
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-24 px-6 bg-brand-green text-white relative">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            Guiding Principles
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto font-light">
            Every route we chart, exercise we deploy, and conversation we facilitate is anchored by four foundational values.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_VALUES.map((val, index) => (
            <div key={index} className="group p-8 bg-white/5 border border-white/10 hover:border-brand-gold/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-green transition-all duration-300">
                  {val.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold block mb-1">
                  Value 0{index + 1}
                </span>
                <h3 className="text-2xl font-serif font-bold mb-3 tracking-wide text-white group-hover:text-brand-gold transition-colors">
                  {val.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed font-light">{val.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[9px] font-bold uppercase tracking-wider text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                # {val.title.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Accreditations & Compliance Framework */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">
              Statutory Readiness
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-green">
              Accreditations & Field Compliance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPLIANCE_LIST.map((item, index) => (
              <div key={index} className="p-6 bg-brand-sand/50 border border-brand-green/10">
                <div className="flex items-center gap-2 mb-3 text-brand-green">
                  <FileCheck size={18} className="text-brand-gold shrink-0" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-brand-green">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Partner & Badge strip */}
          <div className="mt-14 pt-8 border-t border-gray-200 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-serif font-bold text-brand-green text-sm tracking-wider">
              <ShieldCheck size={20} className="text-brand-gold" /> DOSHS COMPLIANT
            </div>
            <div className="flex items-center gap-2 font-serif font-bold text-brand-green text-sm tracking-wider">
              <Award size={20} className="text-brand-gold" /> RED CROSS EMT
            </div>
            <div className="flex items-center gap-2 font-serif font-bold text-brand-green text-sm tracking-wider">
              <Compass size={20} className="text-brand-gold" /> ECO-KENYA GUIDING
            </div>
            <div className="flex items-center gap-2 font-serif font-bold text-brand-green text-sm tracking-wider">
              <Building2 size={20} className="text-brand-gold" /> CORPORATE LICENSED
            </div>
          </div>
        </div>
      </section>

      {/* 7. Strategic CTA Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-brand-sand p-10 md:p-14 border border-brand-gold/30 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-3 block">
              Initiate Your Deployment
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-green mb-4">
              Ready to Strengthen Your Team’s Core?
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-8">
              Whether you need a full-day corporate team building retreat, certified workplace safety training, or an unforgettable wilderness expedition, our directors are prepared to architect your mission.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {setView && (
                <button
                  onClick={() => setView(ViewState.CALCULATOR)}
                  className="w-full sm:w-auto px-7 py-4 bg-brand-green text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-green transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Calculate Mission Investment</span>
                  <ArrowRight size={16} />
                </button>
              )}

              {setView && (
                <button
                  onClick={() => setView(ViewState.GALLERY)}
                  className="w-full sm:w-auto px-7 py-4 bg-white text-brand-green border border-brand-green/20 font-bold text-xs uppercase tracking-widest hover:bg-brand-sand transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Mission Gallery</span>
                </button>
              )}

              <a
                href="https://wa.me/254716164223?text=Hello%20Cross%20Connect%20Africa,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20facilitation%20mission."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

