
import React, { useState, useEffect, useMemo } from 'react';
import { 
  MessageCircle, User, Mail, Building2, Map, Truck, Home, Calendar as CalendarIcon, 
  AlertTriangle, Utensils, Zap, ShieldAlert, Award, FileText, Activity, Tent, 
  Camera, Mic2, Star, Heart, ShieldCheck, Flame, Users2, Mountain, School, 
  Pocket, HardHat, Info, Plus, CheckCircle2, Ruler, ChevronDown, ChevronUp, Printer
} from 'lucide-react';
import { CATEGORIES, Program } from './AdventureBuilder';
import { BookingContextData } from '../App';
import Logo from '../components/Logo';
import CustomCalendar from '../components/CustomCalendar';

const VENUE_TYPES = {
  none: { id: 'none', label: 'Venue Provided / Not Required', price: 0 },
  public: { id: 'public', label: 'Public Grounds / Parks', price: 15000 },
  private: { id: 'private', label: 'Private Training Grounds', price: 30000 },
  school: { id: 'school', label: 'School Grounds (Weekend)', price: 20000 },
  resort: { id: 'resort', label: 'Resorts / Hotels (Day Use)', price: 75000 }
};

const FLEET_SOLUTIONS = {
  none: { id: 'none', label: 'Self Drive', price: 0, capacity: 0 },
  prado: { id: 'prado', label: 'Land Rover / Prado (4x4)', price: 15000, capacity: 6 },
  van: { id: 'van', label: 'Tour Van', price: 20000, capacity: 14 },
  minibus: { id: 'minibus', label: 'Mini Bus (18-25 pax)', price: 30000, capacity: 25 },
  coaster: { id: 'coaster', label: 'Coaster (28-33 pax)', price: 40000, capacity: 33 },
  bus45: { id: 'bus45', label: 'Bus (37-45 pax)', price: 55000, capacity: 45 },
  bus55: { id: 'bus55', label: 'Bus (50-55 pax)', price: 80000, capacity: 55 }
};

const EVENT_TYPE_RISK = {
  corporate: { id: 'corporate', label: 'Corporate / Conference', multiplier: 1.0 },
  wedding: { id: 'wedding', label: 'Wedding', multiplier: 1.1 },
  sports: { id: 'sports', label: 'Sports Event', multiplier: 1.25 },
  concert: { id: 'concert', label: 'Concert / Festival', multiplier: 1.3 },
  rally: { id: 'rally', label: 'Political Rally', multiplier: 1.4 },
  marathon: { id: 'marathon', label: 'Marathon / Hike', multiplier: 1.4 },
  night: { id: 'night', label: 'Night Event (> 10pm)', multiplier: 1.2 }
};

const STRATEGIC_ADDONS = [
  { id: 'fa_cert_branded', label: 'Branded Certificates', price: 350, type: 'pp', category: 'safety_training' },
  { id: 'fa_manuals', label: 'Training Manuals', price: 750, type: 'pp', category: 'safety_training' },
  { id: 'fa_manikins', label: 'CPR Manikins & AED Sim', price: 15000, type: 'flat', category: 'safety_training' },
  { id: 'fa_amb_standby', label: 'Ambulance Standby (Day)', price: 30000, type: 'flat', category: 'safety_training' },
  { id: 'fa_refresher', label: 'Refresher (6 Months)', price: 20000, type: 'flat', category: 'safety_training' },
  { id: 'fs_live_practice', label: 'Extinguisher Live Practice', price: 15000, type: 'flat', category: 'safety_training' },
  { id: 'fs_truck_demo', label: 'Fire Truck (Demo & Water)', price: 85000, type: 'flat', category: 'safety_training' },
  { id: 'fs_evac_drill', label: 'Evacuation Drill Simulation', price: 25000, type: 'flat', category: 'safety_training' },
  { id: 'fs_compliance', label: 'Fire Compliance Report', price: 15000, type: 'flat', category: 'safety_training' },
  { id: 'med_extra', label: 'Additional Medic', price: 10000, type: 'flat', category: 'safety_training' },
  { id: 'med_tent', label: 'Medical Treatment Area', price: 12000, type: 'flat', category: 'safety_training' },
  { id: 'med_trauma_up', label: 'Oxygen & Trauma Kit Up', price: 6000, type: 'flat', category: 'safety_training' },
  { id: 'med_amb_bls', label: 'Ambulance (BLS)', price: 35000, type: 'flat', category: 'safety_training' },
  { id: 'med_amb_als', label: 'Ambulance (ALS Upgrade)', price: 90000, type: 'flat', category: 'safety_training' },
  { id: 'tb_extra_facil', label: 'Extra Professional Facil', price: 25000, type: 'flat', category: 'team_building' },
  { id: 'tb_props', label: 'Team Props & Games Kit', price: 15000, type: 'flat', category: 'team_building' },
  { id: 'tb_sound', label: 'Sound System & Mics', price: 20000, type: 'flat', category: 'team_building' },
  { id: 'tb_tshirts', label: 'Branded T-Shirts', price: 1200, type: 'pp', category: 'team_building' },
  { id: 'tb_photo_video', label: 'Photography & Video', price: 35000, type: 'flat', category: 'team_building' },
  { id: 'tb_mc_energizer', label: 'MC & Energizer Host', price: 30000, type: 'flat', category: 'team_building' },
  { id: 'ac_extra_student', label: 'Extra Student Surcharge', price: 3500, type: 'pp', category: 'school_clubs' },
  { id: 'ac_gear_rental', label: 'Camping Gear Rental', price: 2000, type: 'pp', category: 'school_clubs' },
  { id: 'ac_medic_amb', label: 'Medic & Amb per Activity', price: 35000, type: 'flat', category: 'school_clubs' },
  { id: 'ac_badges', label: 'Badges & Certificates', price: 500, type: 'pp', category: 'school_clubs' },
  { id: 'mc_extra_hr', label: 'Extra Hour Surcharge', price: 10000, type: 'flat', category: 'hosting' },
  { id: 'mc_script', label: 'Script Writing & Planning', price: 15000, type: 'flat', category: 'hosting' },
  { id: 'mc_engagement', label: 'Crowd Engagement Kit', price: 12000, type: 'flat', category: 'hosting' },
  { id: 'mc_tb_combo', label: 'Team Building MC Combo', price: 40000, type: 'flat', category: 'hosting' },
  { id: 'hi_snacks', label: 'Snacks & Hydration', price: 1000, type: 'pp', category: 'expeditions' },
  { id: 'hi_merch', label: 'Branded Hike Merch', price: 1800, type: 'pp', category: 'expeditions' },
  { id: 'hi_photo', label: 'Pro Photographer', price: 20000, type: 'flat', category: 'expeditions' },
  { id: 'log_long_dist', label: 'Equipment Trailer', price: 10000, type: 'flat', category: 'all' },
  { id: 'log_driver_allowance', label: 'Overnight Driver Allow', price: 3000, type: 'flat', category: 'all' }
];

const Calculator: React.FC<{ initialData?: BookingContextData | null }> = ({ initialData }) => {
  const [clientInfo, setClientInfo] = useState({ company: '', contact: '', email: '' });
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(initialData?.program || null); 
  const [durationIdx, setDurationIdx] = useState(initialData?.durationIndex || 0);
  const [pax, setPax] = useState(initialData?.pax || 0);
  const [missionDate, setMissionDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [venueType, setVenueType] = useState<keyof typeof VENUE_TYPES>('none');
  const [fleetType, setFleetType] = useState<keyof typeof FLEET_SOLUTIONS>('none');
  const [offroadSurcharge, setOffroadSurcharge] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [eventType, setEventType] = useState<keyof typeof EVENT_TYPE_RISK>('corporate');
  const [chosenAddons, setChosenAddons] = useState<string[]>(initialData?.addons || []);

  const [quoteId] = useState(`CCA-Q-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`);

  const formatKES = (n: number) => `KES ${n.toLocaleString()}`;

  const results = useMemo(() => {
    const isHosting = selectedProgram?.category === 'hosting';
    
    if (!selectedProgram || (pax <= 0 && !isHosting && selectedProgram.priceType !== 'flat_rate')) {
      return { subtotal: 0, deposit: 0, missionBase: 0, logisticsBase: 0, addonsBase: 0, days: 0, venuePrice: 0, transportPrice: 0, mealsPrice: 0 };
    }

    const variant = selectedProgram.durations ? selectedProgram.durations[durationIdx] : { price: selectedProgram.basePrice, days: 1, isGroup: false };
    const days = Math.ceil(variant.days || 1);
    
    let missionBase = 0;
    if (variant.isGroup || selectedProgram.priceType === 'flat_rate') {
        missionBase = variant.price;
    } else {
        missionBase = variant.price * pax;
        if (selectedProgram.category === 'expeditions') {
            if (pax >= 50) missionBase *= 0.8;
            else if (pax >= 20) missionBase *= 0.9;
        }
    }

    if (selectedProgram.id === 'medic_standby') {
        missionBase *= EVENT_TYPE_RISK[eventType].multiplier;
    }

    const venuePrice = VENUE_TYPES[venueType].price * days;
    const fleet = FLEET_SOLUTIONS[fleetType];
    let transportPrice = 0;
    if (fleet.capacity > 0) {
        const vehicles = Math.ceil((pax > 0 ? pax : 1) / fleet.capacity);
        transportPrice = vehicles * fleet.price * days;
        if (offroadSurcharge) transportPrice *= 1.4;
    }
    const mealsPrice = selectedMeals.reduce((sum, id) => {
        const m = [
          { id: 'breakfast', price: 800 },
          { id: 'lunch', price: 1500 },
          { id: 'dinner', price: 2200 },
          { id: 'tea', price: 500 }
        ].find(x => x.id === id);
        return sum + (m?.price || 0) * (pax > 0 ? pax : 1) * days;
    }, 0);

    const logisticsBase = venuePrice + transportPrice + mealsPrice;

    const addonsBase = chosenAddons.reduce((sum, id) => {
        const a = STRATEGIC_ADDONS.find(x => x.id === id);
        if (!a) return sum;
        return sum + (a.type === 'pp' ? a.price * (pax > 0 ? pax : 1) : a.price);
    }, 0);

    const subtotal = missionBase + logisticsBase + addonsBase;

    return { 
        subtotal, 
        deposit: subtotal * 0.5, 
        missionBase,
        logisticsBase,
        addonsBase,
        days,
        venuePrice,
        transportPrice,
        mealsPrice
    };
  }, [selectedProgram, durationIdx, pax, venueType, fleetType, offroadSurcharge, selectedMeals, eventType, chosenAddons]);

  const toggleAddon = (id: string) => {
    setChosenAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleWhatsApp = () => {
    if (!selectedProgram) return;
    const formattedDate = new Date(missionDate).toLocaleDateString('en-KE', { dateStyle: 'long' });
    const activeAddonsText = chosenAddons
      .map(id => STRATEGIC_ADDONS.find(a => a.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const message = `*CROSS CONNECT AFRICA*
*STRATEGIC PROPOSAL REQUEST*
ID: ${quoteId}
MISSION: ${selectedProgram.title}
PAX: ${pax}
DEPLOYMENT: ${formattedDate}
ADD-ONS: ${activeAddonsText || 'None Selected'}
TOTAL INVESTMENT: ${formatKES(results.subtotal)}
--------------------------------
Organization: ${clientInfo.company || 'Not Specified'}
Contact: ${clientInfo.contact || 'Not Specified'}`;
    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredAddons = useMemo(() => {
    if (!selectedProgram) return STRATEGIC_ADDONS.filter(a => a.category === 'all');
    return STRATEGIC_ADDONS.filter(a => a.category === 'all' || a.category === selectedProgram.category);
  }, [selectedProgram]);

  return (
    <div className="min-h-screen bg-brand-cream pt-40 pb-32 px-6 md:px-12">
      
      {/* 1. PRINT-ONLY COMPONENT (High Fidelity PDF Design) */}
      <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-0 text-brand-green font-serif">
        <div className="max-w-[800px] mx-auto p-12 bg-white min-h-screen flex flex-col">
          {/* Letterhead */}
          <div className="flex justify-between items-start border-b-4 border-brand-green pb-8 mb-10">
            <div className="flex items-center gap-4">
              <Logo className="w-16 h-16" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight uppercase leading-none">Cross Connect</h1>
                <span className="text-brand-gold text-[10px] tracking-[0.4em] font-bold uppercase block">Africa</span>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold italic text-brand-gold mb-1">Strategic Mission Proposal</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Reference: {quoteId}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date: {new Date().toLocaleDateString('en-KE')}</p>
            </div>
          </div>

          {/* Client & Deployment Summary */}
          <div className="grid grid-cols-2 gap-12 mb-10">
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold border-b border-gray-100 pb-2">Mission Recipient</h3>
              <div className="space-y-1">
                <p className="text-lg font-bold italic">{clientInfo.company || 'Prospective Partner'}</p>
                <p className="text-sm">Attn: {clientInfo.contact || 'Lead Representative'}</p>
                <p className="text-sm opacity-60">{clientInfo.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold border-b border-gray-100 pb-2">Operational Scope</h3>
              <div className="space-y-1">
                <p className="text-sm"><span className="font-bold">Mission:</span> {selectedProgram?.title}</p>
                <p className="text-sm"><span className="font-bold">Scale:</span> {pax} Participants</p>
                <p className="text-sm"><span className="font-bold">Deployment:</span> {new Date(missionDate).toLocaleDateString('en-KE', { dateStyle: 'full' })}</p>
                <p className="text-sm"><span className="font-bold">Duration:</span> {results.days} Day(s)</p>
              </div>
            </div>
          </div>

          {/* Itemized Investment Table */}
          <div className="flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-sand text-[10px] font-bold uppercase tracking-widest">
                  <th className="py-4 px-4 border-b-2 border-brand-green">Description of Engagement</th>
                  <th className="py-4 px-4 border-b-2 border-brand-green text-right">Investment (KES)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* 01: Core Pillar */}
                <tr className="group">
                  <td className="py-4 px-4 border-b border-gray-100 font-bold italic">
                    01 Core Pillar: {selectedProgram?.title}
                    <p className="text-[9px] font-normal text-gray-500 uppercase tracking-wider not-italic mt-1">Service category: {selectedProgram?.category.replace('_', ' ')}</p>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-100 text-right font-bold">{formatKES(results.missionBase)}</td>
                </tr>
                {/* 02: Logistics */}
                {results.logisticsBase > 0 && (
                  <tr>
                    <td className="py-4 px-4 border-b border-gray-100 font-bold italic">
                      02 Field Logistics & Hospitality
                      <ul className="text-[9px] font-normal text-gray-500 uppercase tracking-wider not-italic mt-2 space-y-1">
                        {results.venuePrice > 0 && <li>• Venue: {VENUE_TYPES[venueType].label}</li>}
                        {results.transportPrice > 0 && <li>• Transport: {FLEET_SOLUTIONS[fleetType].label} {offroadSurcharge ? '(Off-road Enhanced)' : ''}</li>}
                        {results.mealsPrice > 0 && <li>• Catering: {selectedMeals.join(', ')}</li>}
                      </ul>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-100 text-right font-bold">{formatKES(results.logisticsBase)}</td>
                  </tr>
                )}
                {/* 03: Add-ons */}
                {results.addonsBase > 0 && (
                  <tr>
                    <td className="py-4 px-4 border-b border-gray-100 font-bold italic">
                      03 Strategic Enhancements
                      <ul className="text-[9px] font-normal text-gray-500 uppercase tracking-wider not-italic mt-2 space-y-1">
                        {chosenAddons.map(id => (
                          <li key={id}>• {STRATEGIC_ADDONS.find(a => a.id === id)?.label}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-100 text-right font-bold">{formatKES(results.addonsBase)}</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td className="py-8 px-4 text-right text-lg font-bold uppercase tracking-widest text-gray-400">Total Strategic Investment</td>
                  <td className="py-8 px-4 text-right text-2xl font-bold text-brand-green border-b-4 border-double border-brand-green">{formatKES(results.subtotal)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Terms & Commitment */}
          <div className="mt-12 bg-brand-sand p-8 grid grid-cols-2 gap-8 items-end">
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Commitment Structure</h3>
              <ul className="text-[10px] space-y-2 opacity-70 leading-relaxed font-sans">
                <li>• 50% Non-refundable deposit required for mission slot reservation.</li>
                <li>• Remaining 50% payable upon completion of mission.</li>
                <li>• Quote valid for 30 days from date of issue.</li>
                <li>• All deployments are subject to CCA safety protocols.</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-brand-green pb-2">
                <span className="text-[10px] font-bold uppercase">Authorized Signature</span>
                <img src="https://i.imgur.com/pADVOmg.jpeg" className="w-12 h-12 grayscale opacity-10 rounded-full mb-1" />
              </div>
              <div className="text-[10px] uppercase font-bold text-brand-green">
                Kevin Muhoro, Founder <br/>
                <span className="text-brand-gold">Cross Connect Africa</span>
              </div>
            </div>
          </div>

          {/* Footer Contact */}
          <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center text-[8px] font-bold uppercase tracking-[0.3em] text-gray-400">
            <span>missions@cca.africa • +254 710 974 670</span>
            <span>Valley View Office Park, Nairobi</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN WEB UI */}
      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-12 items-stretch print:hidden">
        
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-10 shadow-2xl border border-brand-green/5 space-y-16">
            
            {/* 01: IDENTITY */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif">01</div>
                  <h3 className="text-xl font-serif font-bold text-brand-green uppercase">Mission Identity</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Organization</label>
                     <input type="text" value={clientInfo.company} onChange={(e) => setClientInfo({...clientInfo, company: e.target.value})} placeholder="Group Name" className="w-full p-4 bg-gray-50 border-none text-sm font-bold" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Lead Contact</label>
                     <input type="text" value={clientInfo.contact} onChange={(e) => setClientInfo({...clientInfo, contact: e.target.value})} placeholder="Full Name" className="w-full p-4 bg-gray-50 border-none text-sm font-bold" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Email</label>
                     <input type="email" value={clientInfo.email} onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})} placeholder="missions@cca.africa" className="w-full p-4 bg-gray-50 border-none text-sm font-bold" />
                  </div>
               </div>
            </section>

            {/* 02: CORE PILLAR */}
            <section className="space-y-10">
               <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif">02</div>
                  <h3 className="text-xl font-serif font-bold text-brand-green uppercase">Pillar Selection</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Service Selection</label>
                        <select 
                           value={selectedProgram?.id || ''} 
                           onChange={(e) => {
                              const prog = CATEGORIES.flatMap(c => c.programs).find(p => p.id === e.target.value);
                              if (prog) { setSelectedProgram(prog); setDurationIdx(0); }
                           }}
                           className="w-full p-5 bg-gray-50 border-none text-[11px] font-bold uppercase tracking-widest"
                        >
                           <option value="">Choose your Mission...</option>
                           {CATEGORIES.map(cat => (
                              <optgroup key={cat.id} label={cat.title}>
                                 {cat.programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                              </optgroup>
                           ))}
                        </select>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Tier Configuration</label>
                        <select value={durationIdx} onChange={(e) => setDurationIdx(parseInt(e.target.value))} className="w-full p-5 bg-gray-50 border-none text-[11px] font-bold uppercase">
                           {selectedProgram?.durations?.map((d, i) => (
                              <option key={i} value={i}>{d.label} — {formatKES(d.price)} {d.isGroup ? 'Flat' : 'pp'}</option>
                           )) || <option>Selection Required</option>}
                        </select>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Deployment Date</label>
                        <CustomCalendar value={missionDate} onChange={setMissionDate} />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Participants (Pax)</label>
                        <input type="number" value={pax} onChange={(e) => setPax(Math.max(0, parseInt(e.target.value) || 0))} className="w-full p-3.5 bg-gray-50 border-none font-serif font-bold text-2xl" />
                     </div>
                  </div>
               </div>
            </section>

            {/* 03: LOGISTICS */}
            <section className="space-y-10">
               <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif">03</div>
                  <h3 className="text-xl font-serif font-bold text-brand-green uppercase">Field Logistics</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><Map size={14}/> Venue Coordination</label>
                     <select value={venueType} onChange={(e) => setVenueType(e.target.value as any)} className="w-full p-4 bg-gray-50 border-none text-xs font-bold uppercase text-brand-green font-bold">
                        {Object.values(VENUE_TYPES).map(v => <option key={v.id} value={v.id}>{v.label} ({v.price > 0 ? formatKES(v.price) : 'Provided'})</option>)}
                     </select>

                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2 pt-4"><Truck size={14}/> Mission Fleet</label>
                     <select value={fleetType} onChange={(e) => setFleetType(e.target.value as any)} className="w-full p-4 bg-gray-50 border-none text-xs font-bold uppercase text-brand-green font-bold">
                        {Object.values(FLEET_SOLUTIONS).map(f => <option key={f.id} value={f.id}>{f.label} ({f.capacity > 0 ? f.capacity + ' pax — ' + formatKES(f.price) : 'Self Drive'})</option>)}
                     </select>
                  </div>

                  <div className="space-y-6">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2 pt-4"><Utensils size={14}/> Field Catering</label>
                     <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'breakfast', label: 'Breakfast', price: 800 },
                          { id: 'lunch', label: 'Lunch', price: 1500 },
                          { id: 'dinner', label: 'Dinner', price: 2200 },
                          { id: 'tea', label: 'Tea & Snacks', price: 500 }
                        ].map(m => (
                           <button key={m.id} onClick={() => setSelectedMeals(prev => prev.includes(m.id) ? prev.filter(x => x !== m.id) : [...prev, m.id])} className={`p-5 border text-center transition-all ${selectedMeals.includes(m.id) ? 'bg-brand-green text-brand-gold border-brand-green' : 'bg-gray-50 border-transparent opacity-50'}`}>
                              <div className="text-[9px] font-bold uppercase tracking-widest">{m.label}</div>
                              <div className="text-[11px] font-bold mt-1">{formatKES(m.price)}</div>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* 04: ENHANCEMENTS */}
            <section className="space-y-10">
               <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif">04</div>
                  <h3 className="text-xl font-serif font-bold text-brand-green uppercase">Strategic Enhancements</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredAddons.map(addon => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-5 border text-left transition-all flex flex-col justify-between h-32 group ${
                        chosenAddons.includes(addon.id) 
                        ? 'bg-brand-green text-brand-gold border-brand-green ring-2 ring-brand-gold shadow-lg' 
                        : 'bg-white text-gray-400 border-gray-100 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">{addon.label}</span>
                           {chosenAddons.includes(addon.id) && <CheckCircle2 size={16} />}
                        </div>
                        <p className="text-[8px] opacity-70 uppercase tracking-[0.2em]">{addon.type === 'pp' ? 'Per Participant' : 'Flat Mission Rate'}</p>
                      </div>
                      <div className={`text-sm font-serif font-bold ${chosenAddons.includes(addon.id) ? 'text-white' : 'text-brand-green'}`}>
                        {formatKES(addon.price)}
                      </div>
                    </button>
                  ))}
               </div>
               
               {filteredAddons.length === 0 && (
                 <div className="p-12 text-center bg-gray-50 border border-dashed border-gray-200">
                    <p className="text-sm font-serif italic text-gray-400">"Select a pillar to view available strategic enhancements."</p>
                 </div>
               )}
            </section>
          </div>
        </div>

        {/* QUOTE STUB COLUMN */}
        <div className="lg:col-span-4 print:hidden">
           <div id="quote-doc" className="bg-white p-12 shadow-2xl paper-texture sticky top-32 border border-gray-100">
              <header className="border-b-[6px] border-brand-green pb-8 mb-10">
                 <div className="flex justify-between items-start mb-6">
                    <Logo className="w-14 h-14" />
                    <div className="text-right">
                       <div className="text-[8px] font-bold uppercase text-gray-400 tracking-widest">{quoteId}</div>
                       <div className="text-[9px] font-bold uppercase text-brand-gold tracking-[0.4em]">Strategy Record</div>
                    </div>
                 </div>
                 <h2 className="text-3xl font-serif font-bold text-brand-green italic truncate leading-none mb-2">{clientInfo.company || 'Prospective Partner'}</h2>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(missionDate).toLocaleDateString('en-KE')} — {pax} PAX</p>
              </header>

              <div className="space-y-6">
                 {results.missionBase > 0 && (
                   <div className="flex justify-between items-end border-b border-gray-50 pb-4 animate-reveal">
                      <div className="space-y-1">
                         <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">01 Mission Core</span>
                         <span className="text-[11px] font-serif font-bold italic text-brand-green">{selectedProgram?.title}</span>
                      </div>
                      <span className="text-sm font-bold text-brand-green">{formatKES(results.missionBase)}</span>
                   </div>
                 )}

                 {results.logisticsBase > 0 && (
                   <div className="flex justify-between items-end border-b border-gray-50 pb-4 animate-reveal">
                      <div className="space-y-1">
                         <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">02 Logistics & Hospitality</span>
                         <span className="text-[11px] font-serif font-bold italic text-brand-green">Venue, Transport, Field Meals</span>
                      </div>
                      <span className="text-sm font-bold text-brand-green">{formatKES(results.logisticsBase)}</span>
                   </div>
                 )}

                 {results.addonsBase > 0 && (
                   <div className="flex justify-between items-end border-b border-gray-50 pb-4 animate-reveal">
                      <div className="space-y-1">
                         <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">03 Itemized Selection</span>
                         <span className="text-[11px] font-serif font-bold italic text-brand-green">{chosenAddons.length} Enhancement(s)</span>
                      </div>
                      <span className="text-sm font-bold text-brand-green">{formatKES(results.addonsBase)}</span>
                   </div>
                 )}

                 <section className="bg-brand-green text-white p-8 mt-12 space-y-4 shadow-xl">
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.5em] block">Total Investment</span>
                    <div className="text-5xl font-serif font-bold text-brand-gold tracking-tighter leading-none">{formatKES(results.subtotal)}</div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                       <span className="text-[9px] uppercase font-bold tracking-[0.3em] opacity-60">Security Deposit (50%)</span>
                       <span className="text-xl font-serif font-bold text-brand-gold">{formatKES(results.deposit)}</span>
                    </div>
                 </section>

                 <div className="pt-8 flex flex-col gap-4">
                    <button 
                      onClick={handleWhatsApp} 
                      disabled={!selectedProgram || (pax === 0 && selectedProgram.priceType !== 'flat_rate' && selectedProgram.category !== 'hosting')}
                      className="w-full py-5 bg-[#25D366] text-white font-bold uppercase tracking-[0.5em] text-[10px] shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                       <MessageCircle size={20} /> Request Proposal
                    </button>
                    <button 
                      onClick={handlePrint} 
                      className="w-full py-4 border border-brand-green text-brand-green font-bold text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-green hover:text-white transition-colors"
                    >
                      <Printer size={16} /> Generate Strategy PDF
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
