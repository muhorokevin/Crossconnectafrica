
import React from 'react';
import { ArrowRight, Zap, Award, MoveDown, Shield, Compass, Briefcase, Flame } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  setView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop" 
            alt="Majestic Mountain Peak" 
            className="w-full h-full object-cover brightness-[0.35] animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green/20 via-transparent to-brand-green/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 md:px-6 max-w-7xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 md:gap-3 border border-brand-gold/40 rounded-full px-5 md:px-8 py-2 md:py-3 mb-6 md:mb-8 backdrop-blur-md animate-fade-in-up">
            <Award size={14} className="text-brand-gold shrink-0" />
            <span className="text-white text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.5em]">Character Forged Since 2023</span>
          </div>
          
          <h1 className="text-4xl md:text-8xl font-serif text-white font-bold mb-6 md:mb-8 leading-tight tracking-tighter drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Rugged <br/>
            <span className="text-brand-gold italic font-light">Refinement.</span>
          </h1>
          
          <p className="text-gray-300 text-base md:text-xl mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-serif italic opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            "Nairobi's elite destination for character mentorship, institutional safety, and high-stakes corporate adventure."
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={() => setView(ViewState.ADVENTURE_BUILDER)}
              className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-brand-gold text-brand-green font-bold uppercase tracking-[0.2em] md:tracking-[0.5em] text-[9px] md:text-[10px] kinetic-btn flex items-center justify-center gap-3 md:gap-4 group"
            >
              Architect Mission <Zap size={16} className="group-hover:rotate-12 transition-transform" />
            </button>
            <button 
              onClick={() => setView(ViewState.CALCULATOR)}
              className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-transparent border border-white/40 text-white font-bold uppercase tracking-[0.2em] md:tracking-[0.5em] text-[9px] md:text-[10px] hover:bg-white hover:text-brand-green transition-all backdrop-blur-sm flex items-center justify-center gap-3 md:gap-4 group"
            >
              Get Proposal <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
            <MoveDown size={32} />
        </div>
      </section>

      {/* 2. THE EDITORIAL MANIFESTO */}
      <section className="py-20 md:py-32 px-6 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
             <div className="lg:col-span-5 relative group order-2 lg:order-1">
                <div className="absolute -inset-4 md:-inset-8 border border-brand-green/5 translate-x-6 md:translate-x-12 translate-y-6 md:translate-y-12 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 duration-700"></div>
                <img 
                    src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1973&auto=format&fit=crop" 
                    className="relative z-10 w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-[0_50px_100px_rgba(0,0,0,0.1)]"
                    alt="Wilderness Mentorship Silhouette"
                />
                <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-brand-green text-brand-gold p-6 md:p-8 z-20 shadow-2xl">
                   <div className="text-brand-gold text-[8px] md:text-[9px] font-bold uppercase tracking-[0.5em] mb-2">Our Creed</div>
                   <span className="text-xl md:text-3xl font-serif font-bold italic tracking-tighter">Grit & Grace.</span>
                </div>
             </div>
             <div className="lg:col-span-7 space-y-8 md:space-y-10 order-1 lg:order-2">
                <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.7em] block">The Foundation</span>
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-brand-green leading-tight tracking-tighter">
                   Forging <br/><span className="italic font-light text-brand-gold">Excellence.</span>
                </h2>
                <div className="w-16 md:w-20 h-1.5 bg-brand-gold/30"></div>
                <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-serif italic max-w-3xl">
                   "We don't teach leadership in boardrooms. We forge it at 12,000 feet. Our missions combine elite facilitation with the uncompromising challenge of the African wild."
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                   <div className="group">
                      <div className="text-4xl md:text-5xl font-serif font-bold text-brand-green tracking-tighter group-hover:text-brand-gold transition-colors">100%</div>
                      <div className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-2">Safety Protocol</div>
                   </div>
                   <div className="group">
                      <div className="text-4xl md:text-5xl font-serif font-bold text-brand-green tracking-tighter group-hover:text-brand-gold transition-colors">2+</div>
                      <div className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-2">Years Experience</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. THE ECOSYSTEM BENTO */}
      <section className="py-20 md:py-24 bg-brand-sand border-y border-brand-green/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
             <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.6em] mb-4 block">Service Ecosystem</span>
             <h2 className="text-3xl md:text-6xl font-serif font-bold text-brand-green tracking-tighter leading-none italic">Four Pillars of <br/><span className="not-italic">Transformation.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-green/5">
            {[
              { icon: <Shield size={28} />, title: 'Safety', desc: 'Certified First Aid & Fire Compliance.', img: 'https://images.unsplash.com/photo-1603398938378-e54eab446ddd?q=80&w=1000' },
              { icon: <Briefcase size={28} />, title: 'Corporate', desc: 'Strategic Retreats & Executive Labs.', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000' },
              { icon: <Compass size={28} />, title: 'Youth', desc: 'Mentorship & Character Camps.', img: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=1000' },
              { icon: <Flame size={28} />, title: 'Adventure', desc: 'Alpine Expeditions & Coastal Peaks.', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000' },
            ].map((pillar, i) => (
              <div key={i} className="group relative overflow-hidden aspect-[4/6] bg-brand-green">
                 <img src={pillar.img} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] opacity-60 group-hover:opacity-100" alt={pillar.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/20 to-transparent"></div>
                 <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 translate-y-6 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="text-brand-gold mb-4 md:mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{pillar.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 md:mb-4 tracking-tighter italic">{pillar.title}</h3>
                    <p className="text-gray-300 text-sm md:text-base font-serif italic mb-6 md:mb-8 opacity-0 group-hover:opacity-100 transition-opacity delay-200">{pillar.desc}</p>
                    <button 
                      onClick={() => setView(ViewState.ADVENTURE_BUILDER)} 
                      className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.5em] text-brand-gold flex items-center gap-2 md:gap-3 group/btn w-fit"
                    >
                      Architect Mission <ArrowRight size={12} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE CALL TO ACTION */}
      <section className="py-32 md:py-48 relative flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover brightness-[0.2]" alt="Summit Landscape" />
            <div className="absolute inset-0 bg-brand-green/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 px-6 max-w-6xl">
            <h2 className="text-4xl md:text-8xl font-serif text-white font-bold mb-8 md:mb-12 leading-none tracking-tighter italic">Legacy <br/><span className="not-italic text-brand-gold">Awaits.</span></h2>
            <p className="text-lg md:text-2xl text-gray-300 mb-12 md:mb-16 font-serif italic max-w-4xl mx-auto opacity-80 leading-relaxed">
              "Exceptional character requires exceptional experiences. Let us architect your next transformational mission."
            </p>
            <button 
              onClick={() => setView(ViewState.CALCULATOR)}
              className="w-full sm:w-auto px-10 md:px-16 py-6 md:py-8 bg-brand-gold text-brand-green font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[10px] kinetic-btn shadow-[0_40px_100px_rgba(217,119,6,0.3)]"
            >
              Start Your Investment
            </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
