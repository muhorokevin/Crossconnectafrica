
import React, { useState, useEffect, useMemo } from 'react';
import { GeneratedItinerary, ItineraryItem } from '../types';
import { generateAdventureItinerary } from '../services/geminiService';
import { 
  Loader2, CheckCircle2, ShieldAlert, Users, Mountain, Compass, ArrowRight, Flame, School, 
  Zap, Briefcase, ChevronRight, ShieldCheck, Anchor, Mic2, Edit3, Save, User, Mail, Building2, 
  Trash2, Home, Truck, Heart, Coffee, Star, Info, Calendar as CalendarIcon, Target, Camera, Music, 
  ShieldX, Backpack, BriefcaseBusiness, Award, Sparkles, Radio, Church, Video
} from 'lucide-react';
import { BookingContextData } from '../App';

export interface Program {
  id: string;
  title: string;
  quoteTitle: string; 
  audience: string;
  description: string;
  outcomes: string;
  image: string;
  basePrice: number; 
  priceType: 'per_person' | 'flat_rate'; 
  inclusions: string[]; 
  participantsBring: string[];
  ccaProvides: string[];
  icon?: React.ReactNode;
  durations?: { label: string; price: number; days: number; isGroup?: boolean }[];
}

export interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  programs: Program[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'safety',
    title: 'Training & Safety',
    icon: <ShieldCheck size={20} />,
    programs: [
      {
        id: 'first_aid',
        title: 'First Aid Training',
        icon: <Heart size={16} />,
        quoteTitle: 'First Aid Mastery',
        audience: 'Schools, Churches, Corporates',
        description: 'Practical, hands-on training covering emergency response, CPR, burns, and fractures. Faith-sensitive care included.',
        outcomes: 'Certification, Life-saving Confidence.',
        image: 'https://images.unsplash.com/photo-1516574187841-69301976e499?q=80&w=1000',
        basePrice: 4000,
        priceType: 'per_person',
        durations: [
          { label: '½ Day - Student', price: 2500, days: 0.5 },
          { label: '½ Day - Corporate', price: 4000, days: 0.5 },
          { label: '½ Day - Group (10–15)', price: 45000, days: 0.5, isGroup: true },
          { label: '½ Day - Group (16–30)', price: 85000, days: 0.5, isGroup: true },
          { label: '½ Day - Group (31–50)', price: 125000, days: 0.5, isGroup: true },
          { label: 'Full Day - Student', price: 3500, days: 1 },
          { label: 'Full Day - Corporate', price: 5000, days: 1 },
          { label: 'Full Day - Group (10–15)', price: 70000, days: 1, isGroup: true },
          { label: 'Full Day - Group (16–30)', price: 135000, days: 1, isGroup: true },
          { label: 'Full Day - Group (31–50)', price: 195000, days: 1, isGroup: true }
        ],
        inclusions: ['Certified trainer', 'Training materials', 'Practical demonstrations', 'Participation certificate'],
        participantsBring: ['Notebook & pen', 'Closed shoes', 'Water bottle'],
        ccaProvides: ['Professional facilitators', 'Safety equipment', 'Certification']
      },
      {
        id: 'fire_safety',
        title: 'Fire Safety & Evacuation',
        icon: <Flame size={16} />,
        quoteTitle: 'Fire Safety Intensive',
        audience: 'Workplaces, Schools, Churches',
        description: 'Prevention, extinguisher use, and live drills. Essential for institutional compliance.',
        outcomes: 'Marshal Certification, Compliance.',
        image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1000',
        basePrice: 4500,
        priceType: 'per_person',
        durations: [
          { label: 'Awareness - Student', price: 3000, days: 0.5 },
          { label: 'Awareness - Corporate', price: 4500, days: 0.5 },
          { label: 'Group (10–20 pax)', price: 80000, days: 0.5, isGroup: true },
          { label: 'Group (21–40 pax)', price: 150000, days: 0.5, isGroup: true },
          { label: 'Group (41–70 pax)', price: 220000, days: 0.5, isGroup: true }
        ],
        inclusions: ['Live Drills', 'Written fire plan templates', 'Certification'],
        participantsBring: ['Safety footwear', 'Note taking kit'],
        ccaProvides: ['Drill equipment', 'Fire Marshal badges', 'Compliance audit']
      },
      {
        id: 'combined_safety',
        title: 'Combined Safety Package',
        icon: <ShieldCheck size={16} />,
        quoteTitle: 'Total Institutional Safety',
        audience: 'Institutions',
        description: 'Highly recommended first aid and fire safety combined 1-day package.',
        outcomes: 'Multi-Certification, Strategic Preparedness.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000',
        basePrice: 8000,
        priceType: 'per_person',
        durations: [
          { label: 'Combined - Student', price: 5500, days: 1 },
          { label: 'Combined - Corporate', price: 8000, days: 1 },
          { label: 'Group (15–25 pax)', price: 160000, days: 1, isGroup: true },
          { label: 'Group (26–40 pax)', price: 260000, days: 1, isGroup: true },
          { label: 'Group (41–70 pax)', price: 360000, days: 1, isGroup: true }
        ],
        inclusions: ['All certifications', 'Evacuation drills', 'Leadership roles training'],
        participantsBring: ['ID for travel & certification', 'Personal medication'],
        ccaProvides: ['Full setup & breakdown', 'Safety management', 'Detailed follow-up']
      }
    ]
  },
  {
    id: 'teambuilding',
    title: 'Team Building',
    icon: <Users size={20} />,
    programs: [
      {
        id: 'tb_schools',
        title: 'School Team Building',
        icon: <School size={16} />,
        quoteTitle: 'Youth Grit Program',
        audience: 'Primary & Secondary Students',
        description: 'Full day of confidence building, problem solving, and trust exercises.',
        outcomes: 'Unity, Character, Peer Leadership.',
        image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1000',
        basePrice: 2800,
        priceType: 'per_person',
        durations: [
          { label: 'Per Student', price: 2800, days: 1 },
          { label: 'Group (30–50 stds)', price: 140000, days: 1, isGroup: true },
          { label: 'Group (51–80 stds)', price: 220000, days: 1, isGroup: true },
          { label: 'Group (81–120 stds)', price: 320000, days: 1, isGroup: true }
        ],
        inclusions: ['Facilitation', 'Equipment setup', 'Structured learning outcomes'],
        participantsBring: ['Outdoor gear', 'Water bottle'],
        ccaProvides: ['Professional facilitators', 'Program design', 'Clear reporting']
      },
      {
        id: 'tb_youth',
        title: 'Youth & Teens',
        icon: <Target size={16} />,
        quoteTitle: 'Mentorship Challenges',
        audience: 'Teens & Young Adults',
        description: 'Identity, character, discipline, and rites-of-passage mentorship.',
        outcomes: 'Identity, Discipline, Faith Reflection.',
        image: 'https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=1000',
        basePrice: 3500,
        priceType: 'per_person',
        durations: [
          { label: 'Per Person', price: 3500, days: 1 },
          { label: 'Group (20–30 pax)', price: 95000, days: 1, isGroup: true },
          { label: 'Group (31–50 pax)', price: 155000, days: 1, isGroup: true }
        ],
        inclusions: ['Mentorship modules', 'Spiritual reflection', 'Outdoor games'],
        participantsBring: ['Warm clothing', 'Personal toiletries', 'Open heart'],
        ccaProvides: ['Mentors', 'Survival gear', 'Safety staff']
      },
      {
        id: 'tb_boys',
        title: 'Boys-to-Men Mentorship',
        icon: <Award size={16} />,
        quoteTitle: 'Rites of Passage',
        audience: 'Young Men',
        description: '1-day intensive identity and character building challenges.',
        outcomes: 'Maturity, Responsibility, Peer Brotherhood.',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000',
        basePrice: 4500,
        priceType: 'per_person',
        durations: [
          { label: 'Per Person', price: 4500, days: 1 },
          { label: 'Group (15–25 pax)', price: 110000, days: 1, isGroup: true },
          { label: 'Group (26–40 pax)', price: 170000, days: 1, isGroup: true }
        ],
        inclusions: ['Intensive curriculum', 'Facilitation', 'Post-program debrief'],
        participantsBring: ['Notebook & pen', 'Rugged outdoor wear'],
        ccaProvides: ['Lead mentor', 'Ceremonial items', 'Workbook']
      },
      {
        id: 'tb_corporate',
        title: 'Corporate / Chama',
        icon: <BriefcaseBusiness size={16} />,
        quoteTitle: 'Strategy & Leadership Lab',
        audience: 'Executives & Investment Groups',
        description: 'Strategic labs, leadership simulations, and low-ropes challenges.',
        outcomes: 'Strategy, Problem Solving, Debrief Reports.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000',
        basePrice: 6500,
        priceType: 'per_person',
        durations: [
          { label: 'Per Person', price: 6500, days: 1 },
          { label: 'Group (10–15 pax)', price: 90000, days: 1, isGroup: true },
          { label: 'Group (16–25 pax)', price: 150000, days: 1, isGroup: true },
          { label: 'Group (26–40 pax)', price: 230000, days: 1, isGroup: true }
        ],
        inclusions: ['Lead strategist', 'Simulations', 'Comprehensive debrief report'],
        participantsBring: ['Comfortable outdoor wear', 'Notebook & pen'],
        ccaProvides: ['Logistics', 'Equipment', 'Safety management']
      }
    ]
  },
  {
    id: 'camps',
    title: 'Camps',
    icon: <Home size={20} />,
    programs: [
      {
        id: 'camp_youth',
        title: 'Youth / Church Camps',
        icon: <CalendarIcon size={16} />,
        quoteTitle: 'Spiritual Wilderness Camp',
        audience: 'Kids & Teens',
        description: 'Multi-day immersive experiences focusing on resilience and faith.',
        outcomes: 'Independence, Skills, Faith.',
        image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1000',
        basePrice: 7000,
        priceType: 'per_person',
        durations: [
          { label: 'Per Person (2–3 Days)', price: 7000, days: 2.5 },
          { label: 'Group (30–50 pax)', price: 210000, days: 2.5, isGroup: true },
          { label: 'Group (51–80 pax)', price: 320000, days: 2.5, isGroup: true }
        ],
        inclusions: ['Facilitators', 'Activities & devotions', 'Safety staff'],
        participantsBring: ['Personal gear', 'Toiletries', 'Sleeping bag'],
        ccaProvides: ['Camping equipment', 'Security', 'Program design']
      },
      {
        id: 'camp_corporate',
        title: 'Corporate / Leadership',
        icon: <Briefcase size={16} />,
        quoteTitle: 'Executive Mission Retreat',
        audience: 'Management Teams',
        description: 'Intensive strategic retreats in varying wilderness environments.',
        outcomes: 'Vision, Unity, Synergy.',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000',
        basePrice: 12000,
        priceType: 'per_person',
        durations: [
          { label: 'Per Person', price: 12000, days: 3 },
          { label: 'Group (10–15 pax)', price: 170000, days: 3, isGroup: true },
          { label: 'Group (16–25 pax)', price: 290000, days: 3, isGroup: true }
        ],
        inclusions: ['Advanced facilitation', 'Impact reports', 'Logistics coordination'],
        participantsBring: ['Corporate casual', 'Personal items'],
        ccaProvides: ['Safety management', 'Lead consultant', 'Security']
      }
    ]
  },
  {
    id: 'expeditions',
    title: 'Expeditions',
    icon: <Mountain size={20} />,
    programs: [
      {
        id: 'hike_day',
        title: 'Day Hikes',
        icon: <Compass size={16} />,
        quoteTitle: 'Standard Summit Hike',
        audience: 'Groups & Individuals',
        description: 'Guided treks through iconic ridges like Ngong or Longonot.',
        outcomes: 'Fitness, Achievement.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000',
        basePrice: 4500,
        priceType: 'per_person',
        durations: [
          { label: 'Student Rate', price: 3000, days: 1 },
          { label: 'Adult Rate', price: 4500, days: 1 },
          { label: 'Group (15–25 pax)', price: 85000, days: 1, isGroup: true },
          { label: 'Group (26–40 pax)', price: 140000, days: 1, isGroup: true }
        ],
        inclusions: ['Guides', 'Medical standby', 'Permits', 'Water & energy cake'],
        participantsBring: ['Hiking boots', 'Backpack', 'Sunscreen'],
        ccaProvides: ['Transport', 'Safety equipment']
      },
      {
        id: 'exp_overnight',
        title: 'Overnight Expedition',
        icon: <Anchor size={16} />,
        quoteTitle: 'Wilderness Immersion',
        audience: 'Adventure Seekers',
        description: '2-day immersion mission in the Kenyan wilderness.',
        outcomes: 'Endurance, Reflection.',
        image: 'https://images.unsplash.com/photo-1506929113679-b62fd3ef0965?q=80&w=1000',
        basePrice: 9500,
        priceType: 'per_person',
        durations: [
          { label: 'Per Person (2 Days)', price: 9500, days: 2 },
          { label: 'Group (10–15 pax)', price: 140000, days: 2, isGroup: true },
          { label: 'Group (16–25 pax)', price: 220000, days: 2, isGroup: true }
        ],
        inclusions: ['Field stay', 'Guides', 'Safety staff'],
        participantsBring: ['Camping gear', 'ID'],
        ccaProvides: ['Transfers', 'Equipment']
      }
    ]
  },
  {
    id: 'mc_services',
    title: 'Professional Hosting',
    icon: <Mic2 size={20} />,
    programs: [
      {
        id: 'mc_corporate',
        title: 'Corporate & Institutional MC',
        icon: <BriefcaseBusiness size={16} />,
        quoteTitle: 'Executive Moderation',
        audience: 'Corporates, NGOs, Institutions',
        description: 'Elite moderation for AGMs, product launches, and high-stakes award ceremonies. Precise hour-based curation.',
        outcomes: 'Flawless Flow, Brand Integrity, Executive Polish.',
        image: 'https://images.unsplash.com/photo-1475721027785-f74dea327912?q=80&w=1000',
        basePrice: 45000,
        priceType: 'flat_rate',
        durations: [
          { label: 'Standard Block (3-4 hrs)', price: 55000, days: 0.5 },
          { label: 'Premium Session (6-7 hrs)', price: 95000, days: 1 },
          { label: 'Summit Hosting (10-12 hrs)', price: 145000, days: 1 },
          { label: 'Executive Tier (14 hrs+)', price: 170000, days: 1 }
        ],
        inclusions: ['Pre-event scripting sync', 'Professional moderation', 'Stage management coordination'],
        participantsBring: ['Event program', 'Preferred script briefs'],
        ccaProvides: ['Lead Consultant MC', 'Technical script oversight']
      },
      {
        id: 'mc_wedding',
        title: 'Wedding & Gala Excellence',
        icon: <Sparkles size={16} />,
        quoteTitle: 'Premium Social Hosting',
        audience: 'Weddings & High-End Private Galas',
        description: 'Elevated moderation for life’s most significant social milestones. Merging grace, humor, and dignity.',
        outcomes: 'Atmospheric Joy, Seamless Timeline, Guest Engagement.',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000',
        basePrice: 65000,
        priceType: 'flat_rate',
        durations: [
          { label: 'Evening Reception (4 hrs)', price: 65000, days: 0.5 },
          { label: 'Full Traditional (7-9 hrs)', price: 110000, days: 1 },
          { label: 'Luxury Full Day (12 hrs+)', price: 155000, days: 1 }
        ],
        inclusions: ['Consultation session', 'Crowd engagement', 'Program management'],
        participantsBring: ['Final event timeline', 'Speech list'],
        ccaProvides: ['Elite Social MC', 'Event flow oversight']
      },
      {
        id: 'mc_community',
        title: 'Community & Church Leadership',
        icon: <Church size={16} />,
        quoteTitle: 'Ministry & Fellowship MC',
        audience: 'Church Events, Youth Rallies, Fellowships',
        description: 'Faith-rooted moderation focusing on spiritual depth and community synergy.',
        outcomes: 'Congregational Unity, Spiritual Alignment, Smooth Transitions.',
        image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000',
        basePrice: 40000,
        priceType: 'flat_rate',
        durations: [
          { label: 'Fellowship Block (3 hrs)', price: 40000, days: 0.5 },
          { label: 'Rally/Conference (6 hrs)', price: 75000, days: 1 },
          { label: 'Full Weekend Hosting', price: 130000, days: 2 }
        ],
        inclusions: ['Spiritual application', 'Interactive fellowship', 'Session timing'],
        participantsBring: ['Ministry theme', 'Order of service'],
        ccaProvides: ['Mentorship-focused MC', 'Fellowship facilitation']
      },
      {
        id: 'mc_media',
        title: 'Media & Broadcast Hosting',
        icon: <Video size={16} />,
        quoteTitle: 'On-Air Presence',
        audience: 'Digital Launches, Virtual Summits, Media Sets',
        description: 'Specialized hosting for hybrid environments. Mastering camera presence and audience telemetry.',
        outcomes: 'Digital Engagement, Professional Broadcast Flow, Brand Impact.',
        image: 'https://images.unsplash.com/photo-1593106410288-caf65eca7c9d?q=80&w=1000',
        basePrice: 50000,
        priceType: 'flat_rate',
        durations: [
          { label: 'Streaming Block (2-3 hrs)', price: 50000, days: 0.5 },
          { label: 'Digital Summit (5-7 hrs)', price: 90000, days: 1 },
          { label: 'Broadcast Residency (Full Day)', price: 160000, days: 1 }
        ],
        inclusions: ['Teleprompter support', 'Digital engagement strategy', 'Studio-ready polish'],
        participantsBring: ['Tech requirements', 'Digital script'],
        ccaProvides: ['Broadcast Specialist MC', 'Engagement analytics']
      }
    ]
  }
];

const formatKES = (v: number) => `KES ${v.toLocaleString()}`;

const AdventureBuilder: React.FC<{ onNavigateToBooking: (data: BookingContextData) => void }> = ({ onNavigateToBooking }) => {
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[1]);
  const [selectedProgram, setSelectedProgram] = useState<Program>(CATEGORIES[1].programs[0]);
  const [durationIdx, setDurationIdx] = useState(0);
  const [formData, setFormData] = useState({ groupSize: 25, focus: 'Character & Synergy' });
  const [clientInfo, setClientInfo] = useState({ company: '', contact: '', email: '' });
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  useEffect(() => { 
    setDurationIdx(0); 
    setItinerary(null); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedProgram]);

  const currentRate = useMemo(() => {
    return selectedProgram.durations?.[durationIdx]?.price || selectedProgram.basePrice;
  }, [selectedProgram, durationIdx]);

  const isGroupRate = useMemo(() => {
    return selectedProgram.priceType === 'flat_rate' || selectedProgram.durations?.[durationIdx]?.isGroup || false;
  }, [selectedProgram, durationIdx]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);
    try {
      const days = selectedProgram.durations ? selectedProgram.durations[durationIdx].days : 1;
      const result = await generateAdventureItinerary(
        days, formData.groupSize, activeCategory.title,
        selectedProgram.title, selectedProgram.audience, formData.focus, []
      );
      setItinerary(result);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const updateItineraryItem = (id: string, field: keyof ItineraryItem, value: string) => {
    if (!itinerary) return;
    setItinerary({
      ...itinerary,
      items: itinerary.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-12 text-center animate-fade-in-up">
           <span className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.8em] mb-3 block">Strategy Architect</span>
           <h1 className="text-3xl md:text-5xl font-serif text-brand-green font-bold tracking-tighter leading-tight mb-4 italic">Design Your <br/><span className="not-italic text-brand-gold">Mission.</span></h1>
           <p className="text-gray-500 max-w-xl mx-auto font-serif italic text-sm leading-relaxed opacity-80">
             "Refine your objective, define your scale, and let our Lead Strategist curate a professional field log for the 2026/27 season."
           </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
             <div className="bg-white p-8 rounded-none shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-brand-green/5 space-y-10">
                
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
                         <input type="email" value={clientInfo.email} onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})} placeholder="crossconnectmisiions@protonmail.com" className="w-full p-3 bg-gray-50 border-none text-[10px] font-bold focus:ring-1 focus:ring-brand-green" />
                      </div>
                   </div>
                </section>

                <section className="space-y-8">
                   <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <div className="w-8 h-8 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif text-xs">02</div>
                      <h3 className="text-sm font-serif font-bold text-brand-green uppercase tracking-wider">Strategy Parameters</h3>
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
                         <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.6em] block">Mission Objective</label>
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
                           onChange={(e) => setFormData({...formData, groupSize: parseInt(e.target.value) || 1})}
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
                      <div className="space-y-4 pt-4 border-t border-gray-100">
                         <label className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.7em] block">Mission Covers</label>
                         <ul className="grid grid-cols-1 gap-2">
                            {selectedProgram.inclusions.map((inc, i) => (
                               <li key={i} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                                  <CheckCircle2 size={12} className="text-brand-gold shrink-0" /> {inc}
                               </li>
                            ))}
                         </ul>
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
                         <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Est. Investment</div>
                         <div className="text-xl font-serif font-bold text-brand-green">
                           {formatKES(isGroupRate ? currentRate : currentRate * formData.groupSize)}
                         </div>
                      </div>
                   </header>

                   <div className="flex-grow space-y-6 relative z-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {itinerary.items.map((item) => (
                         <div key={item.id} className="group/item border-b border-gray-50 pb-6 last:border-0 relative">
                            <button 
                               onClick={() => setEditingItemId(editingItemId === item.id ? null : item.id)}
                               className="absolute -right-1 top-0 p-1.5 text-brand-gold opacity-0 group-hover/item:opacity-100 transition-opacity"
                            >
                               {editingItemId === item.id ? <Save size={12}/> : <Edit3 size={12}/>}
                            </button>
                            
                            <div className="flex gap-4">
                               <div className="flex-shrink-0 pt-1">
                                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold">{item.time}</span>
                               </div>
                               <div className="flex-grow space-y-1">
                                  <h4 className="text-base font-serif font-bold text-brand-green italic leading-tight">{item.activity}</h4>
                                  <p className="text-[10px] text-gray-500 font-serif italic leading-relaxed">{item.description}</p>
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
                      <div className="flex items-center justify-center gap-2 text-brand-gold opacity-40">
                         <ShieldCheck size={10} />
                         <span className="text-[7px] text-center uppercase tracking-[0.3em]">Operational Readiness Log V.6.3</span>
                      </div>
                   </footer>
                </div>
             )}

             {loading && (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-white rounded-none shadow-2xl border border-brand-green/5 text-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
                   <div className="relative mb-6">
                      <div className="w-32 h-32 border-2 border-brand-gold/10 border-t-brand-gold rounded-full animate-spin"></div>
                      <Compass className="absolute inset-0 m-auto text-brand-green animate-pulse" size={40} />
                   </div>
                   <h3 className="text-2xl font-serif text-brand-green font-bold mb-3 italic tracking-tight">Syncing Field Archives...</h3>
                   <p className="text-gray-400 max-w-xs italic font-serif text-base leading-relaxed opacity-70">
                     "Our Lead Strategist is curating your custom mission itinerary."
                   </p>
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
