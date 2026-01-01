
import React, { useState, useEffect, useMemo } from 'react';
import { GeneratedItinerary, ItineraryItem } from '../types';
import { generateAdventureItinerary } from '../services/geminiService';
import { 
  Loader2, CheckCircle2, Users, Mountain, Compass, ArrowRight, Flame, School, 
  Zap, Briefcase, ChevronRight, ShieldCheck, Heart, ShieldX, Backpack, 
  Mic2, Edit3, Save, User, Mail, Building2, RotateCcw, Target, Award, Users2, Star, ShieldPlus
} from 'lucide-react';
import { BookingContextData } from '../App';

export interface Program {
  id: string;
  category: string;
  title: string;
  quoteTitle: string; 
  audience: string;
  description: string;
  outcomes: string;
  image: string;
  basePrice: number; 
  priceType: 'per_person' | 'flat_rate' | 'tier_based'; 
  inclusions: string[]; 
  participantsBring: string[];
  ccaProvides: string[];
  icon?: React.ReactNode;
  durations?: { 
    label: string; 
    price: number; 
    days: number; 
    isGroup?: boolean; 
    thresholdMin?: number; 
    thresholdMax?: number; 
  }[];
}

export interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  programs: Program[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'team_building',
    title: 'Team Building',
    icon: <Users2 size={20} />,
    programs: [
      {
        id: 'tb_corporate',
        category: 'team_building',
        title: 'Corporates & NGOs',
        icon: <Briefcase size={16} />,
        quoteTitle: 'Corporate Strategy Mission',
        audience: 'Executive Teams, NGO Staff, Departments',
        description: 'Elite engagement. Professional behavioral debrief included.',
        outcomes: 'Strategy Alignment, Trust, High Performance.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000',
        basePrice: 3500,
        priceType: 'tier_based',
        durations: [
          { label: 'Full Day (< 40 pax)', price: 3500, days: 1, thresholdMin: 0, thresholdMax: 39 },
          { label: 'Half Day (< 40 pax)', price: 2200, days: 0.5, thresholdMin: 0, thresholdMax: 39 },
          { label: 'Full Day Group (40–100 pax)', price: 120000, days: 1, isGroup: true, thresholdMin: 40, thresholdMax: 100 },
          { label: 'Half Day Group (40–100 pax)', price: 75000, days: 0.5, isGroup: true, thresholdMin: 40, thresholdMax: 100 }
        ],
        inclusions: ['Facilitation', 'Strategic debrief', 'Prop logistics'],
        participantsBring: ['Active wear', 'Notebook'],
        ccaProvides: ['Lead strategist', 'Field gear']
      },
      {
        id: 'tb_chama',
        category: 'team_building',
        title: 'Chamas & Community',
        icon: <Users size={16} />,
        quoteTitle: 'Community Fellowship Day',
        audience: 'Investment Groups, Ministries, Chamas',
        description: 'Relationship focused. Breaking walls through shared experience.',
        outcomes: 'Cohesion, Fellowship, Shared Values.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000',
        basePrice: 2500,
        priceType: 'tier_based',
        durations: [
          { label: 'Full Day (< 40 pax)', price: 2500, days: 1, thresholdMin: 0, thresholdMax: 39 },
          { label: 'Half Day (< 40 pax)', price: 1500, days: 0.5, thresholdMin: 0, thresholdMax: 39 },
          { label: 'Full Day Group (40–100 pax)', price: 90000, days: 1, isGroup: true, thresholdMin: 40, thresholdMax: 100 },
          { label: 'Half Day Group (40–100 pax)', price: 55000, days: 0.5, isGroup: true, thresholdMin: 40, thresholdMax: 100 }
        ],
        inclusions: ['Facilitation', 'Game gear'],
        participantsBring: ['Casual wear'],
        ccaProvides: ['Facilitators', 'Refreshments coordination']
      },
      {
        id: 'tb_youth',
        category: 'team_building',
        title: 'Youth & Teens',
        icon: <Zap size={16} />,
        quoteTitle: 'Youth Empowerment Day',
        audience: 'Universities, Schools, Youth Groups',
        description: 'Character-focused modules for young leaders.',
        outcomes: 'Resilience, Peer Leadership, Character Forge.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000',
        basePrice: 1800,
        priceType: 'tier_based',
        durations: [
          { label: 'Full Day (< 40 pax)', price: 1800, days: 1, thresholdMin: 0, thresholdMax: 39 },
          { label: 'Half Day (< 40 pax)', price: 1200, days: 0.5, thresholdMin: 0, thresholdMax: 39 },
          { label: 'Full Day Group (40–100 pax)', price: 65000, days: 1, isGroup: true, thresholdMin: 40, thresholdMax: 100 },
          { label: 'Half Day Group (40–100 pax)', price: 40000, days: 0.5, isGroup: true, thresholdMin: 40, thresholdMax: 100 }
        ],
        inclusions: ['Mentorship', 'Group activities'],
        participantsBring: ['Sporty shoes'],
        ccaProvides: ['Mentors', 'Safety team']
      },
      {
        id: 'tb_children',
        category: 'team_building',
        title: 'Children (Schools)',
        icon: <Target size={16} />,
        quoteTitle: 'Junior Adventure Day',
        audience: 'Primary Schools, Clubs',
        description: 'Safety-first fun and foundational character building.',
        outcomes: 'Early Teamwork, Nature Appreciation.',
        image: 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?q=80&w=1000',
        basePrice: 1500,
        priceType: 'tier_based',
        durations: [
          { label: 'Full Day (< 40 pax)', price: 1500, days: 1, thresholdMin: 0, thresholdMax: 39 },
          { label: 'Half Day (< 40 pax)', price: 1000, days: 0.5, thresholdMin: 0, thresholdMax: 39 },
          { label: 'Full Day Group (40–100 pax)', price: 55000, days: 1, isGroup: true, thresholdMin: 40, thresholdMax: 100 },
          { label: 'Half Day Group (40–100 pax)', price: 35000, days: 0.5, isGroup: true, thresholdMin: 40, thresholdMax: 100 }
        ],
        inclusions: ['Child facilitation', 'Themed props'],
        participantsBring: ['Extra T-shirt', 'Sun hat'],
        ccaProvides: ['Child safety officers', 'Fun gear']
      }
    ]
  },
  {
    id: 'safety_training',
    title: 'Safety & Training',
    icon: <ShieldCheck size={20} />,
    programs: [
      {
        id: 'first_aid',
        category: 'safety_training',
        title: 'First Aid Training',
        icon: <Heart size={16} />,
        quoteTitle: 'Professional First Aid Certification',
        audience: 'Corporates, NGOs, Schools, Chamas',
        description: 'Comprehensive medical training for safety compliance.',
        outcomes: 'Certification, Confidence, Lifesaving Readiness.',
        image: 'https://i.imgur.com/77asrRI.jpg',
        basePrice: 2800,
        priceType: 'tier_based',
        durations: [
          { label: 'Full Day (< 30 pax)', price: 2800, days: 1, thresholdMin: 0, thresholdMax: 29 },
          { label: 'Half Day (< 30 pax)', price: 1800, days: 0.5, thresholdMin: 0, thresholdMax: 29 },
          { label: 'Full Day Group (30–60 pax)', price: 75000, days: 1, isGroup: true, thresholdMin: 30, thresholdMax: 60 },
          { label: 'Half Day Group (30–60 pax)', price: 45000, days: 0.5, isGroup: true, thresholdMin: 30, thresholdMax: 60 }
        ],
        inclusions: ['Certified training', 'Assessment'],
        participantsBring: ['Comfortable clothing'],
        ccaProvides: ['Manikins', 'Training materials']
      },
      {
        id: 'fire_safety',
        category: 'safety_training',
        title: 'Fire Safety & Evacuation',
        icon: <Flame size={16} />,
        quoteTitle: 'Fire Safety Certification',
        audience: 'Factories, Property Managers, Schools',
        description: 'Live practice and compliance drills for high-safety zones.',
        outcomes: 'Compliance, Risk Mitigation, Response Readiness.',
        image: 'https://i.imgur.com/frE2TUN.jpg',
        basePrice: 3200,
        priceType: 'tier_based',
        durations: [
          { label: 'Full Day (< 30 pax)', price: 3200, days: 1, thresholdMin: 0, thresholdMax: 29 },
          { label: 'Half Day (< 30 pax)', price: 2000, days: 0.5, thresholdMin: 0, thresholdMax: 29 },
          { label: 'Full Day Group (30–60 pax)', price: 85000, days: 1, isGroup: true, thresholdMin: 30, thresholdMax: 60 },
          { label: 'Half Day Group (30–60 pax)', price: 50000, days: 0.5, isGroup: true, thresholdMin: 30, thresholdMax: 60 }
        ],
        inclusions: ['Practical drills', 'Report generation'],
        participantsBring: ['Outdoor wear'],
        ccaProvides: ['Extinguishers', 'Evacuation plan templates']
      },
      {
        id: 'medic_standby',
        category: 'safety_training',
        title: 'Medic Standby',
        icon: <ShieldPlus size={16} />,
        quoteTitle: 'Event Medical Support',
        audience: 'Weddings, Sports, Rallies, Concerts',
        description: 'Professional medical coverage with BLS/ALS options.',
        outcomes: 'Peace of Mind, Rapid Response, Liability Reduction.',
        image: 'https://i.imgur.com/dXyQVwQ.jpeg',
        basePrice: 75000,
        priceType: 'flat_rate',
        durations: [
          { label: 'Full Day (12–24 hrs)', price: 75000, days: 1 },
          { label: '8–12 hours', price: 50000, days: 0.5 },
          { label: '6–7 hours', price: 40000, days: 0.3 },
          { label: '3–5 hours', price: 30000, days: 0.2 }
        ],
        inclusions: ['Licensed medic', 'Standard trauma kit'],
        participantsBring: ['N/A'],
        ccaProvides: ['Medic', 'First aid station']
      }
    ]
  },
  {
    id: 'school_clubs',
    title: 'Adventure Club',
    icon: <School size={20} />,
    programs: [
      {
        id: 'club_basic',
        category: 'school_clubs',
        title: 'Basic Club Package',
        icon: <Target size={16} />,
        quoteTitle: 'School Adventure Club (Basic)',
        audience: 'Primary/High Schools',
        description: '30–40 students. 2 termly day adventures.',
        outcomes: 'Team Spirit, Basic Survival Skills.',
        image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1000',
        basePrice: 120000,
        priceType: 'flat_rate',
        durations: [{ label: 'Annual (30-40 students)', price: 120000, days: 365 }],
        inclusions: ['Coordination', 'Facilitation'],
        participantsBring: ['Water bottle'],
        ccaProvides: ['Guides', 'Logistics']
      },
      {
        id: 'club_standard',
        category: 'school_clubs',
        title: 'Standard Club Package',
        icon: <Award size={16} />,
        quoteTitle: 'School Adventure Club (Standard)',
        audience: 'Schools (50–70 students)',
        description: 'Monthly activities + 1 overnight camp.',
        outcomes: 'Leadership Development, Independence.',
        image: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=1000',
        basePrice: 220000,
        priceType: 'flat_rate',
        durations: [{ label: 'Annual (50-70 students)', price: 220000, days: 365 }],
        inclusions: ['Monthly missions', 'Camp logistics'],
        participantsBring: ['Camping kit'],
        ccaProvides: ['Professional facilitators', 'Safety officers']
      }
    ]
  },
  {
    id: 'expeditions',
    title: 'Hikes & Expeditions',
    icon: <Mountain size={20} />,
    programs: [
      {
        id: 'hike_easy',
        category: 'expeditions',
        title: 'Easy / Nearby Hikes',
        icon: <Compass size={16} />,
        quoteTitle: 'Guided Day Hike (Easy)',
        audience: 'Individuals & Community Groups',
        description: 'From nearby easy trails to remote alpine peaks.',
        outcomes: 'Physical Grit, Mental Clarity, Fellowship.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000',
        basePrice: 2200,
        priceType: 'per_person',
        durations: [
          { label: 'Easy / Nearby', price: 2200, days: 1 },
          { label: 'Moderate', price: 3000, days: 1 }
        ],
        inclusions: ['Guide fees', 'Safety protocols'],
        participantsBring: ['Hiking boots', 'Water bottle'],
        ccaProvides: ['Navigation', 'Emergency first aid']
      },
      {
        id: 'hike_remote',
        category: 'expeditions',
        title: 'Remote / Premium Hikes',
        icon: <Star size={16} />,
        quoteTitle: 'Alpine Expedition',
        audience: 'Experienced Hikers, Adventure Seekers',
        description: 'Multi-day remote peak navigation.',
        outcomes: 'High-Altitude Grit, Mastery.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
        basePrice: 15000,
        priceType: 'per_person',
        durations: [
          { label: 'Challenging', price: 3500, days: 1 },
          { label: 'Remote / Premium', price: 15000, days: 3 }
        ],
        inclusions: ['Full board', 'Guides', 'Logistics'],
        participantsBring: ['Sleeping gear', 'Alpine kit'],
        ccaProvides: ['Expedition lead', 'Full camp setup']
      }
    ]
  },
  {
    id: 'hosting',
    title: 'MC & Hosting',
    icon: <Mic2 size={20} />,
    programs: [
      {
        id: 'mc_standard',
        category: 'hosting',
        title: 'Professional MC Service',
        icon: <Mic2 size={16} />,
        quoteTitle: 'Professional Event Hosting',
        audience: 'Weddings, Corporates, Galas',
        description: 'High-energy hosting with script-writing services.',
        outcomes: 'Flow, Engagement, Impact.',
        image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=1000',
        basePrice: 150000,
        priceType: 'flat_rate',
        durations: [
          { label: 'Full Day Hosting', price: 150000, days: 1, isGroup: true },
          { label: '6–8 hours', price: 100000, days: 0.7, isGroup: true },
          { label: '3–5 hours', price: 80000, days: 0.4, isGroup: true }
        ],
        inclusions: ['MC duties', 'Planning session'],
        participantsBring: ['N/A'],
        ccaProvides: ['Bilingual MC', 'Engagement kit']
      }
    ]
  }
];

const formatKES = (v: number) => `KES ${v.toLocaleString()}`;

const AdventureBuilder: React.FC<{ onNavigateToBooking: (data: BookingContextData) => void }> = ({ onNavigateToBooking }) => {
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [selectedProgram, setSelectedProgram] = useState<Program>(CATEGORIES[0].programs[0]);
  const [durationIdx, setDurationIdx] = useState(0);
  const [formData, setFormData] = useState({ groupSize: 0, focus: 'Team Resilience' });
  const [clientInfo, setClientInfo] = useState({ company: '', contact: '', email: '' });
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [originalItinerary, setOriginalItinerary] = useState<GeneratedItinerary | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  useEffect(() => { 
    setDurationIdx(0); 
    setItinerary(null); 
    setOriginalItinerary(null);
  }, [selectedProgram]);

  const currentRate = useMemo(() => {
    return selectedProgram.durations?.[durationIdx]?.price || selectedProgram.basePrice;
  }, [selectedProgram, durationIdx]);

  const isGroupRate = useMemo(() => {
    return selectedProgram.priceType === 'flat_rate' || selectedProgram.durations?.[durationIdx]?.isGroup || false;
  }, [selectedProgram, durationIdx]);

  const estimatedInvestment = useMemo(() => {
    if (formData.groupSize <= 0 && !isGroupRate) {
       return 0;
    }
    if (isGroupRate) return currentRate;
    
    // Hiking Discounts (Special Logic for Builder Preview)
    let total = currentRate * formData.groupSize;
    if (selectedProgram.category === 'expeditions') {
        if (formData.groupSize >= 50) total *= 0.8;
        else if (formData.groupSize >= 20) total *= 0.9;
    }
    
    return total;
  }, [formData.groupSize, isGroupRate, currentRate, selectedProgram]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);
    setOriginalItinerary(null);
    try {
      const days = selectedProgram.durations ? selectedProgram.durations[durationIdx].days : 1;
      const result = await generateAdventureItinerary(
        days, formData.groupSize, activeCategory.title,
        selectedProgram.title, selectedProgram.audience, formData.focus, []
      );
      setItinerary(result);
      setOriginalItinerary(JSON.parse(JSON.stringify(result))); 
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const updateItineraryItem = (id: string, field: keyof ItineraryItem, value: string) => {
    if (!itinerary) return;
    setItinerary({
      ...itinerary,
      items: itinerary.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const restoreItineraryItem = (id: string) => {
    if (!originalItinerary || !itinerary) return;
    const originalItem = originalItinerary.items.find(item => item.id === id);
    if (originalItem) {
      setItinerary({
        ...itinerary,
        items: itinerary.items.map(item => item.id === id ? { ...originalItem } : item)
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-12 text-center animate-fade-in-up">
           <span className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.8em] mb-3 block">Mission Strategy</span>
           <h1 className="text-3xl md:text-5xl font-serif text-brand-green font-bold tracking-tighter leading-tight mb-4 italic">Architect Your <br/><span className="not-italic text-brand-gold">Mission.</span></h1>
           <p className="text-gray-500 max-w-xl mx-auto font-serif italic text-sm opacity-80">
             "Choose your pillar, define your scale, and let us generate a high-impact field log for your evaluation."
           </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
             <div className="bg-white p-8 rounded-none shadow-xl border border-brand-green/5 space-y-10">
                <section className="space-y-6">
                   <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <div className="w-8 h-8 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif text-xs">01</div>
                      <h3 className="text-sm font-serif font-bold text-brand-green uppercase tracking-wider">Mission Lead</h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                         <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><Building2 size={10}/> Organization</label>
                         <input type="text" value={clientInfo.company} onChange={(e) => setClientInfo({...clientInfo, company: e.target.value})} placeholder="Group Name" className="w-full p-3 bg-gray-50 border-none text-[10px] font-bold focus:ring-1 focus:ring-brand-green" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><User size={10}/> Contact</label>
                         <input type="text" value={clientInfo.contact} onChange={(e) => setClientInfo({...clientInfo, contact: e.target.value})} placeholder="Lead Name" className="w-full p-3 bg-gray-50 border-none text-[10px] font-bold focus:ring-1 focus:ring-brand-green" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><Mail size={10}/> Email</label>
                         <input type="email" value={clientInfo.email} onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})} placeholder="email@address.com" className="w-full p-3 bg-gray-50 border-none text-[10px] font-bold focus:ring-1 focus:ring-brand-green" />
                      </div>
                   </div>
                </section>

                <section className="space-y-8">
                   <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <div className="w-8 h-8 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif text-xs">02</div>
                      <h3 className="text-sm font-serif font-bold text-brand-green uppercase tracking-wider">Parameters</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.6em] block">Service Pillar</label>
                         <div className="grid grid-cols-2 gap-2">
                            {CATEGORIES.map(cat => (
                               <button
                                 key={cat.id}
                                 onClick={() => { setActiveCategory(cat); setSelectedProgram(cat.programs[0]); }}
                                 className={`p-3 rounded-none border transition-all text-left text-[8px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                                   activeCategory.id === cat.id 
                                   ? 'bg-brand-green text-brand-gold border-brand-green shadow-xl' 
                                   : 'bg-gray-50 text-gray-400 border-transparent hover:border-brand-gold/30'
                                 }`}
                               >
                                  {cat.icon} {cat.title}
                               </button>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-4">
                         <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.6em] block">Selection</label>
                         <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                            {activeCategory.programs.map(prog => (
                               <button
                                 key={prog.id}
                                 onClick={() => setSelectedProgram(prog)}
                                 className={`w-full text-left p-3 rounded-none border transition-all flex items-center justify-between ${
                                   selectedProgram.id === prog.id 
                                   ? 'bg-brand-sand border-brand-green shadow-sm' 
                                   : 'bg-gray-50 border-transparent hover:border-brand-gold/20'
                                 }`}
                               >
                                  <div className="flex items-center gap-3">
                                     <div className={`p-1.5 rounded-none ${selectedProgram.id === prog.id ? 'bg-brand-green text-brand-gold' : 'bg-white text-gray-300'}`}>
                                       {prog.icon}
                                     </div>
                                     <span className="font-bold text-[8px] uppercase tracking-wider text-brand-green">{prog.title}</span>
                                  </div>
                                  <ChevronRight size={12} className="text-brand-gold" />
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-4">
                        <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.6em] block">Variant Configuration</label>
                        <select 
                           value={durationIdx} 
                           onChange={(e) => setDurationIdx(parseInt(e.target.value))}
                           className="w-full p-4 bg-gray-50 border-none rounded-none text-[9px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-brand-green shadow-sm"
                        >
                           {selectedProgram.durations?.map((d, i) => (
                              <option key={i} value={i}>{d.label} — {formatKES(d.price)} {selectedProgram.priceType === 'flat_rate' || d.isGroup ? 'Flat' : 'pp'}</option>
                           ))}
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.6em] block">Participant Scale</label>
                        <input 
                           type="number" 
                           value={formData.groupSize} 
                           onChange={(e) => setFormData({...formData, groupSize: Math.max(0, parseInt(e.target.value) || 0)})}
                           className="w-full p-3.5 bg-gray-50 border-none rounded-none text-xl font-serif font-bold text-brand-green focus:ring-1 focus:ring-brand-green" 
                        />
                      </div>
                   </div>
                </section>

                <button 
                   onClick={handleGenerate}
                   disabled={loading}
                   className="w-full py-6 bg-brand-green text-brand-gold rounded-none font-bold uppercase tracking-[0.7em] text-[9px] shadow-[0_20px_50px_rgba(2,44,34,0.15)] kinetic-btn flex items-center justify-center gap-4 disabled:opacity-50"
                >
                   {loading ? <Loader2 size={16} className="animate-spin"/> : <Zap size={16}/>}
                   {loading ? 'ARCHITECTING FIELD LOG...' : 'GENERATE CUSTOM FIELD LOG'}
                </button>
             </div>
          </div>

          <div className="lg:col-span-5">
             {!itinerary && !loading && (
                <div className="bg-white rounded-none shadow-2xl overflow-hidden animate-fade-in-up">
                   <div className="h-[320px] relative overflow-hidden group">
                      <img 
                        src={selectedProgram.image} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s]" 
                        alt={selectedProgram.title} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/10 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                         <div className="bg-brand-gold text-brand-green text-[7px] font-bold uppercase tracking-[0.6em] px-3 py-1.5 w-fit mb-2 shadow-xl">Strategy Profile</div>
                         <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tighter leading-none italic mb-1">{selectedProgram.title}</h2>
                         <p className="text-white/60 text-sm font-serif italic">Designed for {selectedProgram.audience.toLowerCase()}.</p>
                      </div>
                   </div>
                   <div className="p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-3">
                            <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.7em] block">Participants Bring</label>
                            <ul className="space-y-1.5">
                               {selectedProgram.participantsBring.map((item, i) => (
                                  <li key={i} className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-gray-500">
                                     <Backpack size={10} className="text-brand-gold" /> {item}
                                  </li>
                               ))}
                            </ul>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.7em] block">CCA Provides</label>
                            <ul className="space-y-1.5">
                               {selectedProgram.ccaProvides.map((item, i) => (
                                  <li key={i} className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-widest text-gray-500">
                                     <ShieldCheck size={10} className="text-brand-gold" /> {item}
                                  </li>
                               ))}
                            </ul>
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {itinerary && !loading && (
                <div className="bg-white p-8 md:p-10 shadow-2xl border border-gray-100 paper-texture animate-fade-in-up relative overflow-hidden flex flex-col min-h-[600px]">
                   <header className="border-b-4 border-brand-green pb-6 mb-8 flex flex-col justify-between items-start gap-4 relative z-10">
                      <div className="space-y-2">
                         <span className="text-brand-gold text-[8px] font-bold uppercase tracking-[0.8em]">Interactive Field Record</span>
                         <h2 className="text-3xl font-serif font-bold text-brand-green tracking-tighter italic leading-none">{itinerary.title}</h2>
                         <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Theme: {itinerary.theme}</p>
                      </div>
                      <div className="bg-brand-sand/50 p-4 border border-brand-green/10 w-full flex justify-between items-center">
                         <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Est. Base Invest</div>
                         <div className="text-xl font-serif font-bold text-brand-green">
                           {formatKES(estimatedInvestment)}
                         </div>
                      </div>
                   </header>

                   <div className="flex-grow space-y-6 relative z-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {itinerary.items.map((item) => (
                         <div key={item.id} className="group/item border-b border-gray-50 pb-6 last:border-0 relative">
                            <div className="absolute -right-1 top-0 flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                               {editingItemId === item.id && (
                                  <button onClick={() => restoreItineraryItem(item.id)} className="p-1.5 text-brand-gold hover:scale-110"><RotateCcw size={12}/></button>
                               )}
                               <button onClick={() => setEditingItemId(editingItemId === item.id ? null : item.id)} className="p-1.5 text-brand-gold hover:scale-110">
                                  {editingItemId === item.id ? <Save size={12}/> : <Edit3 size={12}/>}
                               </button>
                            </div>
                            <div className="flex gap-4">
                               <div className="flex-shrink-0 pt-1"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold">{item.time}</span></div>
                               <div className="flex-grow space-y-1">
                                  {editingItemId === item.id ? (
                                    <input className="w-full bg-brand-sand/30 border-none p-1 text-sm font-serif font-bold italic" value={item.activity} onChange={(e) => updateItineraryItem(item.id, 'activity', e.target.value)} />
                                  ) : (
                                    <h4 className="text-base font-serif font-bold text-brand-green italic leading-tight">{item.activity}</h4>
                                  )}
                                  {editingItemId === item.id ? (
                                    <textarea className="w-full bg-brand-sand/10 border-none p-1 text-[10px] text-gray-500 font-serif italic h-20" value={item.description} onChange={(e) => updateItineraryItem(item.id, 'description', e.target.value)} />
                                  ) : (
                                    <p className="text-[10px] text-gray-500 font-serif italic leading-relaxed">{item.description}</p>
                                  )}
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>

                   <footer className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4 relative z-10">
                      <button 
                        onClick={() => onNavigateToBooking({ 
                            program: selectedProgram, 
                            days: selectedProgram.durations ? selectedProgram.durations[durationIdx].days : 1, 
                            pax: formData.groupSize, 
                            categoryTitle: activeCategory.title, 
                            itinerary, 
                            durationIndex: durationIdx 
                        })}
                        className="w-full py-5 bg-brand-green text-brand-gold font-bold uppercase tracking-[0.6em] text-[8px] shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3"
                      >
                         Secure Proposal <ArrowRight size={14} />
                      </button>
                   </footer>
                </div>
             )}

             {loading && (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-white rounded-none shadow-2xl border border-brand-green/5 text-center relative overflow-hidden">
                   <div className="relative mb-6">
                      <div className="w-32 h-32 border-2 border-brand-gold/10 border-t-brand-gold rounded-full animate-spin"></div>
                      <Compass className="absolute inset-0 m-auto text-brand-green animate-pulse" size={40} />
                   </div>
                   <h3 className="text-2xl font-serif text-brand-green font-bold mb-3 italic tracking-tight">Syncing Field Archives...</h3>
                </div>
             )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d97706; opacity: 0.2; }
      `}</style>
    </div>
  );
};

export default AdventureBuilder;
