
import React from 'react';
import { Award, Heart, Shield, Users, Target, BookOpen, Quote } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-cream pt-24">
      
      {/* 1. Hero Section */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-green mb-6 leading-tight">Rooted in Faith, <br/><span className="italic text-brand-gold">Forged in the Wild</span></h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light font-serif italic">
                "Cross Connect Africa is more than an adventure company. We are a ministry of presence, dedicated to building character, leadership, and resilience through immersive wilderness experiences."
            </p>
        </div>
      </section>

      {/* 2. Founder Profile (Mentioned but without personal photo) */}
      <section className="bg-white py-24 px-6 relative overflow-hidden">
        {/* Decorative Leaf/Nature accent */}
        <div className="absolute -right-20 top-20 opacity-[0.02] rotate-45">
          <Target size={600} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                {/* Image Side - Landscape representing the mission environment */}
                <div className="w-full md:w-1/2 relative group">
                    <div className="absolute top-6 -left-6 w-full h-full border-2 border-brand-gold rounded-lg z-0 transition-all duration-500 group-hover:top-4 group-hover:-left-4"></div>
                    <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl aspect-[4/5] bg-brand-green">
                        <img 
                            src="https://images.unsplash.com/photo-1527605156685-f12b75f3c763?q=80&w=1970&auto=format&fit=crop" 
                            alt="The Rugged Peaks of Kenya" 
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" 
                        /> 
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-green p-8">
                          <p className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">Founder & Lead Facilitator</p>
                          <h3 className="text-white text-3xl font-serif font-bold">Kevin Muhoro</h3>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2">
                    <Quote size={48} className="text-brand-gold/20 mb-6" />
                    <h2 className="text-4xl font-serif font-bold text-brand-green mb-6 leading-tight">A Passion for <br/>Transformation</h2>
                    
                    <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                      <p>
                          "I believe that true leadership isn't learned in a classroom—it's forged in the fire of challenge and the quiet of nature."
                      </p>
                      <p>
                          As the Lead Facilitator of Cross Connect Africa, Kevin Muhoro has dedicated his life to mentoring youth and coaching corporate teams. His approach combines rigorous outdoor training with deep spiritual mentorship, rooted in the uncompromising landscape of the Kenyan wild.
                      </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-brand-green/5 p-3 rounded-full text-brand-green border border-brand-green/10"><Award size={20} /></div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">Professional Facilitator</h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Certified CPF</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-brand-green/5 p-3 rounded-full text-brand-green border border-brand-green/10"><Shield size={20} /></div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">Wilderness Responder</h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Safety First</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. Core Values - Cinematic Grid */}
      <section className="py-24 px-6 bg-brand-green text-white relative">
        <div className="max-w-7xl mx-auto text-center mb-20">
             <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">The Mission Creed</span>
             <h2 className="text-4xl md:text-5xl font-serif font-bold">Our Core Pillars</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-brand-green transition-all duration-500 group-hover:scale-110">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Integrity</h3>
                <p className="text-gray-400 leading-relaxed font-light">We operate with transparency and honesty, ensuring safety and trust are never compromised in the bush or the office.</p>
            </div>
            <div className="group text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-brand-green transition-all duration-500 group-hover:scale-110">
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Community</h3>
                <p className="text-gray-400 leading-relaxed font-light">Breaking down walls to foster genuine connection. We build bridges between people from all walks of life.</p>
            </div>
            <div className="group text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-brand-green transition-all duration-500 group-hover:scale-110">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Excellence</h3>
                <p className="text-gray-400 leading-relaxed font-light">From high-end gear to a deep-dive curriculum, we pursue the highest standards in African adventure ministry.</p>
            </div>
        </div>
      </section>

      {/* 4. Credentials Bar */}
      <section className="py-16 bg-white border-t border-gray-100">
         <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-between items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-3 font-serif font-bold text-brand-green text-xl"><Shield size={24}/> ACCREDITED</div>
             <div className="flex items-center gap-3 font-serif font-bold text-brand-green text-xl"><Award size={24}/> RED CROSS</div>
             <div className="flex items-center gap-3 font-serif font-bold text-brand-green text-xl"><Target size={24}/> ECO-KENYA</div>
             <div className="flex items-center gap-3 font-serif font-bold text-brand-green text-xl"><BookOpen size={24}/> MINISTRY</div>
         </div>
      </section>
    </div>
  );
};

export default About;
