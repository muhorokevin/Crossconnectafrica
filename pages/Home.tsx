import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, MessageCircle, Star, Download, Users, HeartPulse,
  Mic2, Home as HomeIcon, Flame, CalendarDays, MapPin
} from 'lucide-react';
import { ViewState } from '../types';
import { CATEGORIES, Program } from '../data/programs';
import { BookingContextData } from '../App';
import { RATE_CARD_PDF_URL, COMPANY_PROFILE_PDF_URL } from './Calculator';

interface HomeProps {
  setView: (view: ViewState) => void;
  onNavigateToBooking?: (data: BookingContextData) => void;
}

const findProgram = (id: string): Program | undefined =>
  CATEGORIES.flatMap(c => c.programs).find(p => p.id === id);

// Prices from Rate Card 2026 v8 ("The least each service costs")
const SERVICES: { title: string; desc: string; from: string; img: string; programId?: string; view?: ViewState }[] = [
  { title: 'Team building', desc: 'Physical games that get everyone moving, laughing and working together, planned around what your team needs.', from: 'From KES 6,000', img: '/images/team-sack-race.jpg', programId: 'tb_corporate_fullday' },
  { title: 'First aid and fire safety training', desc: 'CPR, choking, bleeding, burns and live extinguisher practice, taught hands-on with Kenya Red Cross instructors.', from: 'From KES 23,400', img: '/images/first-aid-cpr.jpg', programId: 'first_aid' },
  { title: 'Event medics', desc: 'Trained medics, kits and an ambulance on standby for weddings, sports days, concerts and conferences.', from: 'From KES 13,100', img: '/images/event-marshal.jpg', programId: 'medic_standby' },
  { title: 'MC and event hosting', desc: 'Kevin hosts weddings, galas, company, church and school events in English and Swahili.', from: 'From KES 10,000', img: '/images/mc-kevin.jpg', programId: 'mc_service' },
  { title: 'Families at home', desc: 'Fire safety, first aid and fun for one household, at your home. One price for up to 6 people.', from: 'From KES 8,000', img: '/images/family-outing.jpg', programId: 'family_packages' },
  { title: 'Fire and emergency drills', desc: 'Planned evacuation drills with marshals, emergency services if needed, and a written report.', from: 'From KES 70,000', img: '/images/fire-training.jpg', programId: 'fire_drill' },
  { title: 'Site assessments', desc: 'We inspect your site, write up the gaps, and can test your staff before and after training.', from: 'From KES 8,500', img: '/images/equipment-safety-point.jpg', programId: 'readiness_assessment' },
  { title: 'Safety equipment', desc: 'Extinguishers, first aid kits, alarms and signs, supplied and fitted.', from: 'Packs from KES 5,000', img: '/images/equipment-extinguishers.jpg', view: ViewState.SHOP }
];

const QUICK_PICKS: { label: string; icon: React.ReactNode; programId: string }[] = [
  { label: 'Team building day', icon: <Users size={18} />, programId: 'tb_corporate_fullday' },
  { label: 'First aid training', icon: <HeartPulse size={18} />, programId: 'first_aid' },
  { label: 'Fire safety training', icon: <Flame size={18} />, programId: 'fire_safety_training' },
  { label: 'Medics for an event', icon: <HeartPulse size={18} />, programId: 'medic_standby' },
  { label: 'An MC for my event', icon: <Mic2 size={18} />, programId: 'mc_service' },
  { label: 'Safety for my family', icon: <HomeIcon size={18} />, programId: 'family_packages' }
];

// Company Profile 2026 v2, page 3
const STEPS = [
  { title: 'Assess', desc: 'We find out what you need and where the gaps are.' },
  { title: 'Equip', desc: 'We recommend the right equipment.' },
  { title: 'Train', desc: 'We teach the skills, hands-on.' },
  { title: 'Practise', desc: 'We run drills so the skills stick.' },
  { title: 'Connect', desc: 'We build teamwork through shared activities.' },
  { title: 'Improve', desc: 'We review what worked and suggest next steps.' }
];

const WHO_WE_SERVE = ['Corporates and businesses', 'NGOs', 'Schools and colleges', 'Churches and ministries', 'Chamas and community groups', 'Families', 'Event organisers'];

const STATEMENT = 'We get teams moving together, teach people what to do when an emergency happens, and stand by at your event when it counts, so everyone goes home safe.';
const STATEMENT_ACCENT = new Set(['goes', 'home', 'safe.']);

const WHATSAPP_URL = 'https://wa.me/254710974670?text=' + encodeURIComponent('Hello Cross Connect Africa, I would like to ask about booking.');

// Words light up one by one as the statement scrolls through the screen
const FillStatement: React.FC = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = STATEMENT.split(' ');
  const [lit, setLit] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setLit(words.length); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      setLit(Math.round(p * words.length));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <p ref={ref} className="font-display font-semibold text-[1.75rem] leading-[1.25] sm:text-4xl md:text-5xl md:leading-[1.18] tracking-tight">
      {words.map((w, i) => (
        <span key={i} className={`fill-word ${STATEMENT_ACCENT.has(w) ? 'accent' : ''} ${i < lit ? 'on' : ''}`}>{w} </span>
      ))}
    </p>
  );
};

const Home: React.FC<HomeProps> = ({ setView, onNavigateToBooking }) => {
  const openProgram = (programId?: string) => {
    const program = programId ? findProgram(programId) : undefined;
    if (program && onNavigateToBooking) onNavigateToBooking({ program });
    else setView(ViewState.CALCULATOR);
  };
  const openService = (s: typeof SERVICES[number]) => (s.view ? setView(s.view) : openProgram(s.programId));

  return (
    <div className="w-full bg-brand-cream">
      {/* HERO: inset photo frame, headline bottom-left, quick quote card bottom-right */}
      <section className="p-2 sm:p-3">
        <div className="relative min-h-[100svh] sm:min-h-[calc(100svh-24px)] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-brand-ink flex flex-col justify-end">
          <img
            src="/images/hero-crowd.jpg"
            alt="A cheering group at a Cross Connect Africa team day"
            className="settle absolute inset-0 w-full h-full object-cover object-[50%_35%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/55 to-brand-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/70 via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-32 pb-6 sm:pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="rise eyebrow text-brand-amber" style={{ animationDelay: '.1s' }}>Nairobi · Anywhere in Kenya</p>
              <h1 className="rise font-display font-bold text-white text-[clamp(2.5rem,4.7vw,4.6rem)] leading-[0.98] mt-5" style={{ animationDelay: '.2s', textShadow: '0 16px 38px rgba(0,0,0,.3)' }}>
                Connecting people.<br />
                Building resilience.<br />
                <span className="text-brand-amber">Saving lives.</span>
              </h1>
              <p className="rise text-white/80 text-lg max-w-xl mt-6 leading-relaxed" style={{ animationDelay: '.35s' }}>
                Team-building days, first aid and fire safety training, safety equipment, MCs and event medics. One team, one call.
              </p>
              <div className="rise flex flex-col sm:flex-row gap-3 mt-8" style={{ animationDelay: '.45s' }}>
                <button onClick={() => setView(ViewState.CALCULATOR)} className="group inline-flex items-center justify-between sm:justify-center gap-3 h-14 pl-7 pr-2 rounded-full bg-brand-amber text-brand-ink font-semibold text-base hover:bg-white transition-colors">
                  Get your price
                  <span className="w-10 h-10 rounded-full bg-brand-ink text-brand-amber flex items-center justify-center transition-transform group-hover:rotate-45"><ArrowUpRight size={18} /></span>
                </button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/25 text-white font-semibold text-base hover:bg-white/20 transition-colors">
                  <MessageCircle size={18} /> WhatsApp us
                </a>
              </div>
            </div>

            {/* Quick start */}
            <div className="rise lg:col-span-4 lg:justify-self-end w-full lg:max-w-sm" style={{ animationDelay: '.6s' }}>
              <div className="rounded-[28px] bg-white/10 backdrop-blur-xl ring-1 ring-white/20 p-4 sm:p-5">
                <p className="text-white font-semibold px-1">What are you planning?</p>
                <p className="text-white/60 text-sm px-1 mt-0.5">Pick one and see your price in a minute.</p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {QUICK_PICKS.map(q => (
                    <button
                      key={q.label}
                      onClick={() => openProgram(q.programId)}
                      className="group flex items-center gap-2.5 text-left p-3 rounded-2xl bg-white/90 hover:bg-white text-brand-ink transition-colors"
                    >
                      <span className="w-8 h-8 shrink-0 rounded-full bg-brand-green text-brand-amber flex items-center justify-center">{q.icon}</span>
                      <span className="text-[13.5px] font-semibold leading-tight">{q.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-white/60">
              <span>Trusted by CITAM, Kadolta Resort, Biblica, NGOs, schools and corporate teams</span>
              <span className="hidden md:inline">·</span>
              <span>Free travel within 50 km of Nairobi</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 md:py-20">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {[
            ['250', 'people at one staff team day, CITAM Kadolta, September 2026'],
            ['8', 'services from one team, booked separately or together'],
            ['50 km', 'around Nairobi with travel included in the price'],
            ['50%', 'deposit confirms your date, balance on completion']
          ].map(([n, l]) => (
            <div key={n} className="reveal border-t border-brand-green/15 pt-5">
              <dt className="font-display font-bold text-brand-green text-5xl md:text-6xl tracking-tight">{n}</dt>
              <dd className="text-[15px] text-brand-green/65 mt-3 max-w-[16rem] leading-snug">{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* STATEMENT */}
      <section className="px-2 sm:px-3">
        <div className="rounded-[28px] sm:rounded-[36px] bg-brand-ink py-24 md:py-36">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <p className="eyebrow text-brand-amber mb-8">Why we exist</p>
            <FillStatement />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl reveal">
            <p className="eyebrow text-brand-gold">What we do</p>
            <h2 className="font-display font-bold text-brand-green text-4xl md:text-6xl leading-[1.02] mt-4">Book one service, or combine a few into one day.</h2>
          </div>
          <a href={RATE_CARD_PDF_URL} download className="reveal inline-flex items-center gap-2 h-12 px-5 rounded-full ring-1 ring-brand-green/20 text-brand-green font-semibold hover:bg-brand-green hover:text-white transition-colors shrink-0 self-start md:self-auto">
            <Download size={17} /> 2026 rate card
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:auto-rows-[260px]">
          {SERVICES.map((s, i) => {
            const big = i === 0;
            const wide = i === 1;
            return (
              <button
                key={s.title}
                onClick={() => openService(s)}
                className={`reveal group relative text-left rounded-[28px] overflow-hidden bg-brand-green min-h-[300px] lg:min-h-0 ${big ? 'lg:col-span-2 lg:row-span-2' : ''} ${wide ? 'lg:col-span-2' : ''}`}
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              >
                <img src={s.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/40 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 text-brand-ink text-[13px] font-semibold">{s.from}</span>
                <span className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-white flex items-center justify-center transition-all group-hover:bg-brand-amber group-hover:text-brand-ink group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className={`font-display font-bold text-white leading-tight ${big ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>{s.title}</h3>
                  <p className={`text-white/75 mt-2 leading-relaxed ${big ? 'text-base max-w-md' : 'text-[14.5px] line-clamp-2'}`}>{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-brand-amber">
                    {s.view ? 'Browse equipment' : 'See your price'} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="px-2 sm:px-3">
        <div className="rounded-[28px] sm:rounded-[36px] bg-brand-green text-white py-20 md:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
              <div className="lg:col-span-6 reveal">
                <p className="eyebrow text-brand-amber">How we work</p>
                <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.02] mt-4">Six steps, every job.</h2>
              </div>
              <p className="lg:col-span-5 lg:col-start-8 self-end text-white/70 text-lg leading-relaxed reveal">
                From a one-off training to a year-long contract, we follow the same path from first assessment to steady improvement.
              </p>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border-t border-white/15">
              {STEPS.map((s, i) => (
                <li key={s.title} className="reveal py-7 lg:pr-6 border-b lg:border-b-0 border-white/10 sm:odd:pr-6" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="text-[13px] font-semibold text-brand-amber tabular-nums">0{i + 1}</span>
                  <h3 className="font-display font-bold text-2xl mt-3">{s.title}</h3>
                  <p className="text-white/65 mt-2 leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7 reveal relative rounded-[32px] overflow-hidden aspect-[4/3] lg:aspect-[5/4]">
          <img src="/images/group-photo.jpg" alt="Group photo after a 250-person staff team day" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute left-4 bottom-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur text-brand-ink text-sm font-semibold">
            <MapPin size={15} className="text-brand-gold" /> CITAM Kadolta, Nairobi · 5 Sep 2026
          </div>
        </div>
        <div className="lg:col-span-5 reveal">
          <p className="eyebrow text-brand-gold">Recent work</p>
          <h2 className="font-display font-bold text-brand-green text-4xl md:text-5xl leading-[1.04] mt-4">A staff team day for 250 people.</h2>
          <p className="text-lg text-brand-green/70 leading-relaxed mt-5">
            Five colour teams, a crew of seven, and games built around the company's five values, followed by free time at the venue.
          </p>
          <figure className="mt-8 p-6 md:p-7 rounded-[28px] bg-white shadow-soft">
            <div className="flex gap-1 text-brand-gold mb-4" aria-label="5 stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <blockquote className="text-brand-green text-lg leading-relaxed">
              “The balance between high-energy physical challenges, reflective leadership debriefs, and safety vigilance was world-class. Our team is still talking about it.”
            </blockquote>
            <figcaption className="text-sm text-brand-green/60 mt-4"><span className="font-semibold text-brand-green">Collins Moses</span>, Silax Data Kenya</figcaption>
          </figure>
        </div>
      </section>

      {/* PHOTO MARQUEE */}
      <section className="pb-20 md:pb-28 overflow-hidden" aria-label="Photos from our events">
        <div className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]">
          {[...Array(2)].flatMap((_, k) =>
            ['/images/big-group-rope-bridge.jpg', '/images/team-water-relay.jpg', '/images/warmup-crowd.jpg', '/images/kadolta-team-fun.jpg', '/images/team-archery.jpg', '/images/marshal-radio.jpg', '/images/mc-wedding.jpg', '/images/kadolta-team-016.jpg', '/images/team-relay.jpg', '/images/hike-mist.jpg', '/images/kevin-leading.jpg', '/images/catering-buffet.jpg'].map((src, i) => (
              <div key={`${k}-${i}`} className="w-60 sm:w-72 aspect-[4/5] rounded-[24px] overflow-hidden bg-brand-sand shrink-0" aria-hidden={k === 1}>
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))
          )}
        </div>
        <div className="mt-8 text-center">
          <button onClick={() => setView(ViewState.GALLERY)} className="inline-flex items-center gap-2 h-12 px-6 rounded-full ring-1 ring-brand-green/20 text-brand-green font-semibold hover:bg-brand-green hover:text-white transition-colors">
            Open the gallery <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* WHO WE SERVE + FAITH */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="reveal">
          <p className="eyebrow text-brand-gold">Who we work with</p>
          <h2 className="font-display font-bold text-brand-green text-3xl md:text-5xl leading-[1.05] mt-4">We come to your office, school, church or venue.</h2>
          <ul className="flex flex-wrap gap-2 mt-8">
            {WHO_WE_SERVE.map(w => (
              <li key={w} className="px-4 py-2.5 rounded-full bg-white shadow-soft text-brand-green text-[15px] font-medium">{w}</li>
            ))}
          </ul>
        </div>
        <div className="reveal rounded-[32px] bg-brand-sand p-8 md:p-10 self-end">
          <p className="text-brand-green/80 text-lg leading-relaxed">
            We are a Christian company, and we work with clients of every faith and background. For church and Christian groups, we can add prayer, a short devotion or a Bible reflection to your day.
          </p>
          <p className="font-display font-semibold text-brand-green text-xl mt-6 leading-snug">“Whatever you do, work at it with all your heart, as working for the Lord.”</p>
          <p className="text-sm text-brand-green/55 mt-2">Colossians 3:23</p>
        </div>
      </section>

      {/* NEXT EVENT */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-20">
        <div className="reveal rounded-[32px] bg-white shadow-soft p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6">
          <span className="w-16 h-16 shrink-0 rounded-[20px] bg-brand-amber text-brand-ink flex flex-col items-center justify-center leading-none">
            <span className="text-[11px] font-bold tracking-widest">DEC</span>
            <span className="font-display font-bold text-2xl">19</span>
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-brand-gold flex items-center gap-1.5"><CalendarDays size={15} /> Next community event</p>
            <h3 className="font-display font-bold text-brand-green text-2xl md:text-3xl mt-1">End-Year Gala Dinner</h3>
            <p className="text-brand-green/65 mt-1">Saturday 19 December 2026 · KES 3,500 per person · Christian and alcohol-free</p>
          </div>
          <button onClick={() => setView(ViewState.EVENTS)} className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-brand-green text-white font-semibold shrink-0 hover:bg-brand-ink">
            See events <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="px-2 sm:px-3 pb-3">
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-brand-ink">
          <img src="/images/team-group-outdoor.jpg" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/70 to-brand-ink/40" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-36 text-center text-white">
            <h2 className="reveal font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[1]">Let's plan your day.</h2>
            <p className="reveal text-white/75 text-lg mt-6 max-w-xl mx-auto">See your price in a minute, then send it to us on WhatsApp. We reply with a written quote.</p>
            <div className="reveal flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <button onClick={() => setView(ViewState.CALCULATOR)} className="group inline-flex items-center justify-between sm:justify-center gap-3 h-14 pl-7 pr-2 rounded-full bg-brand-amber text-brand-ink font-semibold text-base hover:bg-white transition-colors">
                Get your price
                <span className="w-10 h-10 rounded-full bg-brand-ink text-brand-amber flex items-center justify-center transition-transform group-hover:rotate-45"><ArrowUpRight size={18} /></span>
              </button>
              <a href={COMPANY_PROFILE_PDF_URL} download className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/25 text-white font-semibold text-base hover:bg-white/20 transition-colors">
                <Download size={18} /> Company profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
