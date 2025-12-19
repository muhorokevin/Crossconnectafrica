
import React, { useState, useEffect, useMemo } from 'react';
import { Printer, MessageCircle, Target, ShieldCheck, CheckSquare, Square, User, Mail, Building2, Map, Truck, Home, Clock, Info, CheckCircle2, Calendar as CalendarIcon, AlertCircle, AlertTriangle } from 'lucide-react';
import { CATEGORIES, Program } from './AdventureBuilder';
import { BookingContextData } from '../App';
import Logo from '../components/Logo';
import CustomCalendar from '../components/CustomCalendar';

const VENUE_GROUNDS = {
  client: { id: 'client', label: 'Client Provided Site', price: 0 },
  standard: { id: 'standard', label: 'Standard Field Grounds', price: 15000 },
  premium: { id: 'premium', label: 'Premium Private Estate', price: 45000 },
  wilderness: { id: 'wilderness', label: 'Wilderness Conservancy', price: 25000 }
};

const FLEET_SOLUTIONS = {
  none: { id: 'none', label: 'Self Drive', price: 0, capacity: 0 },
  van: { id: 'van', label: '14-seater van', price: 18000, capacity: 14 },
  bus25: { id: 'bus25', label: '25-seater bus', price: 28000, capacity: 25 },
  bus33: { id: 'bus33', label: '33-seater bus', price: 35000, capacity: 33 },
  cruiser: { id: 'cruiser', label: '4×4 Land Cruiser', price: 38000, capacity: 7 }
};

const ACCOMMODATION_LEVELS = {
  none: { id: 'none', label: 'Day Program Only', price: 0 },
  budget: { id: 'budget', label: 'Budget Camps (pp)', price: 3000 },
  mid: { id: 'mid', label: 'Mid-range Lodges (pp)', price: 7500 },
  premium: { id: 'premium', label: 'Premium Resorts (pp)', price: 15000 }
};

const ADDONS = [
  { id: 'meals', label: 'Student Field Lunch', price: 900, type: 'pp', desc: 'High-energy student field nutrition.' },
  { id: 'report', label: 'Corporate Impact Report', price: 25000, type: 'flat', desc: 'Behavioral analytics & strategy brief.' },
  { id: 'medical', label: 'Dedicated Medical Standby', price: 15000, type: 'flat', desc: 'Certified wilderness medic per day.' },
  { id: 'mc_script', label: 'Event Scripting & Design', price: 15000, type: 'flat', desc: 'Custom program flow and speech design.' },
  { id: 'workbook', label: 'Mentorship Workbook', price: 600, type: 'pp', desc: 'High-grade printed character curriculum.' },
  { id: 'mc_games', label: 'Crowd Games & Facilitation', price: 10000, type: 'flat', desc: 'Interactive engagement blocks during hosting.' },
  { id: 'mc_tb', label: 'TB Integration Module', price: 25000, type: 'flat', desc: 'Strategic team-building merged into event hosting.' }
];

const Calculator: React.FC<{ initialData?: BookingContextData | null }> = ({ initialData }) => {
  const [clientInfo, setClientInfo] = useState({ company: '', contact: '', email: '' });
  const [pricingMode, setPricingMode] = useState<'pp' | 'group'>('pp');
  const [selectedProgram, setSelectedProgram] = useState<Program>(CATEGORIES[1].programs[0]); 
  const [durationIdx, setDurationIdx] = useState(0);
  const [pax, setPax] = useState(0);
  const [missionDate, setMissionDate] = useState(new Date().toISOString().split('T')[0]);
  const [venue, setVenue] = useState<keyof typeof VENUE_GROUNDS>('client');
  const [accommodation, setAccommodation] = useState<keyof typeof ACCOMMODATION_LEVELS>('none');
  const [transport, setTransport] = useState<keyof typeof FLEET_SOLUTIONS>('none');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quoteId] = useState(`CCA-Q-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`);

  useEffect(() => {
    if (initialData) {
      if (initialData.program) {
        setSelectedProgram(initialData.program);
        if (initialData.program.priceType === 'flat_rate') setPricingMode('group');
      }
      if (initialData.pax !== undefined) setPax(initialData.pax);
      if (initialData.durationIndex !== undefined) {
        setDurationIdx(initialData.durationIndex);
        const variant = initialData.program?.durations?.[initialData.durationIndex];
        if (variant?.isGroup) setPricingMode('group');
      }
    }
  }, [initialData]);

  useEffect(() => {
    const variant = selectedProgram.durations?.[durationIdx];
    // If variant is explicitly a group bracket, force group mode
    if (variant?.isGroup) {
      setPricingMode('group');
    } else if (pricingMode === 'group' && pax < 50 && selectedProgram.priceType !== 'flat_rate') {
      // Manual "Group Rate" only works for 50+ participants
      setPricingMode('pp');
    }
  }, [pax, durationIdx, selectedProgram]);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const results = useMemo(() => {
    const variant = selectedProgram.durations ? selectedProgram.durations[durationIdx] : { price: selectedProgram.basePrice, days: 1, isGroup: false, label: '' };
    const days = Math.ceil(variant.days || 1);
    
    if (pax <= 0) {
      return { 
        subtotal: 0, deposit: 0, opsFee: 0, days, baseTotal: 0, 
        unitRate: variant.price, venueCost: 0, transportCost: 0, 
        accommodationCost: 0, addonsTotal: 0, isGroup: false, vehicleCount: 0,
        marginError: null, selectedAddonsList: []
      };
    }

    // Logic: If group mode is selected but no specific variant bracket exists, 
    // find the minimum unit cost for the activity from available variants to use as the base.
    const minUnitCost = selectedProgram.durations?.reduce((min, d) => 
      !d.isGroup && d.price < min ? d.price : min, selectedProgram.basePrice) || selectedProgram.basePrice;

    // Margin Validation for specific Group Brackets (e.g., "Group 10-15")
    let marginError: string | null = null;
    if (variant.isGroup && variant.label.includes('(')) {
      const match = variant.label.match(/(\d+)[–|-](\d+)/);
      if (match) {
        const min = parseInt(match[1]);
        const max = parseInt(match[2]);
        if (pax < min || pax > max) {
          marginError = `Selected group bracket requires ${min}–${max} participants. Current: ${pax}.`;
        }
      }
    }

    // Flat Rate Eligibility:
    // 1. Program is inherently flat (e.g., MC)
    // 2. Variant is explicitly marked as a group bracket
    // 3. Manual "Group Rate" is selected (Strictly for 50+ participants)
    const isActuallyGroup = (
      selectedProgram.priceType === 'flat_rate' || 
      variant.isGroup || 
      (pricingMode === 'group' && pax >= 50)
    );

    // Calculation:
    // - If it's a defined flat rate (variant.isGroup or flat_rate), use variant price as a fixed sum.
    // - If it's a forced "Group Rate" without a bracket, use pax * minUnitCost.
    // - Otherwise, standard pax * variant.price.
    let baseTotal = 0;
    if (selectedProgram.priceType === 'flat_rate' || variant.isGroup) {
      baseTotal = variant.price;
    } else if (pricingMode === 'group' && pax >= 50) {
      baseTotal = pax * minUnitCost;
    } else {
      baseTotal = pax * variant.price;
    }

    const venueCost = VENUE_GROUNDS[venue].price * days;
    
    // Transport Scaling: Logic for multiple vehicles based on capacity
    const fleet = FLEET_SOLUTIONS[transport];
    let transportCost = 0;
    let vehicleCount = 0;
    if (fleet.capacity > 0) {
      vehicleCount = Math.ceil(pax / fleet.capacity);
      transportCost = vehicleCount * fleet.price * days;
    }
    
    const accommodationCost = ACCOMMODATION_LEVELS[accommodation].price * pax * Math.max(0, days - 0.5); 
    
    let groundHandling = 0;
    if (pax > 0 && pax <= 15) groundHandling = 6000;
    else if (pax <= 30) groundHandling = 10000;
    else if (pax <= 60) groundHandling = 18000;
    else groundHandling = 25000;

    const adminFees = 5000;

    const addonsData = ADDONS.filter(a => selectedAddons.includes(a.id));
    const addonsTotal = addonsData.reduce((sum, a) => {
      return sum + (a.type === 'pp' ? a.price * pax : a.price);
    }, 0);

    const subtotalNoBuffer = baseTotal + venueCost + transportCost + accommodationCost + groundHandling + adminFees + addonsTotal;
    const contingency = subtotalNoBuffer * 0.04; 
    const finalTotal = subtotalNoBuffer + contingency;

    return { 
      subtotal: finalTotal, 
      deposit: finalTotal * 0.5, 
      opsFee: groundHandling + adminFees + contingency, 
      days, 
      baseTotal, 
      unitRate: variant.price, 
      minUnitCost,
      venueCost, 
      transportCost, 
      accommodationCost, 
      addonsTotal,
      isGroup: isActuallyGroup,
      vehicleCount,
      marginError,
      selectedAddonsList: addonsData
    };
  }, [selectedProgram, durationIdx, pax, venue, accommodation, transport, selectedAddons, pricingMode]);

  const formatKES = (n: number) => `KES ${n.toLocaleString()}`;

  const handleWhatsApp = () => {
    if (results.marginError) {
      alert(results.marginError);
      return;
    }
    const formattedDate = new Date(missionDate).toLocaleDateString('en-KE', { dateStyle: 'long' });
    const addonText = results.selectedAddonsList.map(a => `- ${a.label} (${a.type === 'pp' ? formatKES(a.price) + ' pp' : formatKES(a.price) + ' flat'})`).join('\n');
    const fleetText = transport !== 'none' ? `${results.vehicleCount}x ${FLEET_SOLUTIONS[transport].label} (KES ${FLEET_SOLUTIONS[transport].price}/unit per day)` : 'Self Drive';

    const message = `*CROSS CONNECT AFRICA*
*OFFICIAL MISSION QUOTE*
--------------------------------
QUOTE ID: ${quoteId}
DATE: ${new Date().toLocaleDateString('en-KE', { dateStyle: 'medium' })}
--------------------------------
*CLIENT INFO*
ORG: ${clientInfo.company || 'N/A'}
LEAD: ${clientInfo.contact || 'N/A'}
--------------------------------
*MISSION PARAMETERS*
MISSION: ${selectedProgram.title}
PAX: ${pax}
DEPLOYMENT: ${formattedDate}
--------------------------------
*FLEET LOGISTICS*
MODE: ${fleetText}
UNITS: ${results.vehicleCount}
--------------------------------
*STAY & GROUNDS*
VENUE: ${VENUE_GROUNDS[venue].label} (${formatKES(VENUE_GROUNDS[venue].price)})
STAY: ${ACCOMMODATION_LEVELS[accommodation].label} (${formatKES(ACCOMMODATION_LEVELS[accommodation].price)} pp)
--------------------------------
*ADD-ONS SELECTED*
${addonText || 'None'}
--------------------------------
*INVESTMENT BREAKDOWN*
Base: ${formatKES(results.baseTotal)}
Add-ons: ${formatKES(results.addonsTotal)}
Logistics & Ops: ${formatKES(results.venueCost + results.transportCost + results.accommodationCost + results.opsFee)}
--------------------------------
*TOTAL: ${formatKES(results.subtotal)}*
*DEPOSIT: ${formatKES(results.deposit)}*
--------------------------------
_Character Forged in the Wild_`;

    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:grid lg:grid-cols-10 gap-12 items-stretch">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-10 print:hidden">
          <div className="bg-white p-12 shadow-[0_40px_100px_rgba(0,0,0,0.04)] space-y-16 border border-brand-green/5">
            <section className="space-y-10">
               <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                  <div className="w-10 h-10 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif">01</div>
                  <h3 className="text-xl font-serif font-bold text-brand-green tracking-tight uppercase">Identity</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><Building2 size={12}/> Company/Chama</label>
                     <input type="text" value={clientInfo.company} onChange={(e) => setClientInfo({...clientInfo, company: e.target.value})} placeholder="Group Name" className="w-full p-4 bg-gray-50 border-none text-sm font-bold focus:ring-1 focus:ring-brand-green" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><User size={12}/> Lead</label>
                     <input type="text" value={clientInfo.contact} onChange={(e) => setClientInfo({...clientInfo, contact: e.target.value})} placeholder="Contact Name" className="w-full p-4 bg-gray-50 border-none text-sm font-bold focus:ring-1 focus:ring-brand-green" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><Mail size={12}/> Email</label>
                     <input type="email" value={clientInfo.email} onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})} placeholder="missions@cca.africa" className="w-full p-4 bg-gray-50 border-none text-sm font-bold focus:ring-1 focus:ring-brand-green" />
                  </div>
               </div>
            </section>

            <section className="space-y-10">
               <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                  <div className="w-10 h-10 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif">02</div>
                  <h3 className="text-xl font-serif font-bold text-brand-green tracking-tight uppercase">Mission Parameters</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Service Choice</label>
                        <select 
                           value={selectedProgram.id} 
                           onChange={(e) => {
                              const prog = CATEGORIES.flatMap(c => c.programs).find(p => p.id === e.target.value);
                              if (prog) {
                                setSelectedProgram(prog);
                                setDurationIdx(0);
                                if (prog.priceType === 'flat_rate') setPricingMode('group');
                              }
                           }}
                           className="w-full p-5 bg-gray-50 border-none text-[11px] font-bold uppercase tracking-widest"
                        >
                           {CATEGORIES.map(cat => (
                              <optgroup key={cat.id} label={cat.title}>
                                 {cat.programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                              </optgroup>
                           ))}
                        </select>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Pricing Mode</label>
                        <div className="flex bg-gray-100 p-1">
                           <button onClick={() => setPricingMode('pp')} disabled={selectedProgram.priceType === 'flat_rate' || selectedProgram.durations?.[durationIdx]?.isGroup} className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${pricingMode === 'pp' ? 'bg-brand-green text-brand-gold shadow-sm' : 'text-gray-400 opacity-50'}`}>Participant</button>
                           <button onClick={() => setPricingMode('group')} disabled={pax < 50 && selectedProgram.priceType !== 'flat_rate' && !selectedProgram.durations?.[durationIdx]?.isGroup} className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${pricingMode === 'group' ? 'bg-brand-green text-brand-gold shadow-sm' : 'text-gray-400 opacity-50'}`}>Group Rate (50+)</button>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><Clock size={12}/> Mission Variant</label>
                        <select value={durationIdx} onChange={(e) => setDurationIdx(parseInt(e.target.value))} className="w-full p-5 bg-gray-50 border-none text-[11px] font-bold uppercase">
                           {selectedProgram.durations?.map((d, i) => (
                              <option key={i} value={i}>{d.label} — {formatKES(d.price)} {selectedProgram.priceType === 'flat_rate' || d.isGroup ? 'Flat' : 'pp'}</option>
                           ))}
                        </select>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><CalendarIcon size={12}/> Deployment Date</label>
                            <CustomCalendar value={missionDate} onChange={setMissionDate} />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Participants</label>
                            <input type="number" value={pax} onChange={(e) => setPax(Math.max(0, parseInt(e.target.value) || 0))} className="w-full p-3.5 bg-gray-50 border-none font-serif font-bold text-2xl text-brand-green" />
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <section className="space-y-10">
               <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                  <div className="w-10 h-10 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif">03</div>
                  <h3 className="text-xl font-serif font-bold text-brand-green tracking-tight uppercase">Fleet & Logistics</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><Map size={12}/> Site Basis</label>
                     <select value={venue} onChange={(e) => setVenue(e.target.value as any)} className="w-full p-4 bg-gray-50 border-none text-[10px] font-bold uppercase">
                        {Object.values(VENUE_GROUNDS).map(v => (
                           <option key={v.id} value={v.id}>{v.label} {v.price > 0 ? `(${formatKES(v.price)})` : '(Free)'}</option>
                        ))}
                     </select>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><Truck size={12}/> Mobility Solution</label>
                     <select value={transport} onChange={(e) => setTransport(e.target.value as any)} className="w-full p-4 bg-gray-50 border-none text-[10px] font-bold uppercase">
                        {Object.values(FLEET_SOLUTIONS).map(f => (
                           <option key={f.id} value={f.id}>{f.label} {f.price > 0 ? `(${formatKES(f.price)}/unit)` : '(Self)'}</option>
                        ))}
                     </select>
                     {results.vehicleCount > 0 && <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest mt-1">Scale: {results.vehicleCount} Units Required.</p>}
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-2"><Home size={12}/> Stay Tiers</label>
                     <select value={accommodation} onChange={(e) => setAccommodation(e.target.value as any)} className="w-full p-4 bg-gray-50 border-none text-[10px] font-bold uppercase">
                        {Object.values(ACCOMMODATION_LEVELS).map(acc => (
                           <option key={acc.id} value={acc.id}>{acc.label} {acc.price > 0 ? `(${formatKES(acc.price)} pp)` : '(None)'}</option>
                        ))}
                     </select>
                  </div>
               </div>
            </section>

            <section className="space-y-10">
               <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                  <div className="w-10 h-10 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif">04</div>
                  <h3 className="text-xl font-serif font-bold text-brand-green tracking-tight uppercase">Operational Add-ons</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ADDONS.map(addon => (
                     <button key={addon.id} onClick={() => toggleAddon(addon.id)} className={`p-6 text-left border-2 transition-all flex flex-col justify-between h-44 ${selectedAddons.includes(addon.id) ? 'bg-brand-sand border-brand-green' : 'bg-gray-50 border-transparent hover:border-brand-gold/20'}`}>
                        <div className="space-y-2">
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">{addon.label}</span>
                              {selectedAddons.includes(addon.id) ? <CheckSquare size={16} className="text-brand-gold" /> : <Square size={16} className="text-gray-200" />}
                           </div>
                           <p className="text-[9px] text-gray-400 italic leading-snug">"{addon.desc}"</p>
                        </div>
                        <div className="text-xs font-bold text-brand-green">{formatKES(addon.price)} {addon.type === 'pp' ? 'pp' : 'Flat'}</div>
                     </button>
                  ))}
               </div>
            </section>
          </div>
        </div>

        {/* Right Column: Tall Quote Doc */}
        <div className="lg:col-span-4 w-full flex flex-col">
          <div id="quote-doc" className="bg-white p-12 md:p-14 shadow-2xl paper-texture flex flex-col border border-gray-100 lg:sticky lg:top-40 min-h-[100vh] lg:min-h-[1200px] print:shadow-none print:p-16 print:border-none">
             
             <div className="flex-grow space-y-10">
                <header className="border-b-[6px] border-brand-green pb-8 relative z-10">
                    <div className="flex justify-between items-start mb-6">
                       <Logo className="w-14 h-14" />
                       <div className="text-right">
                          <div className="text-[8px] font-bold uppercase text-gray-400 tracking-widest">{quoteId}</div>
                          <div className="text-[9px] font-bold uppercase text-brand-gold tracking-[0.3em]">Institutional Record</div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between items-end">
                          <span className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.6em] block">Mission Assessment For</span>
                          <span className="text-[9px] font-bold text-brand-green uppercase tracking-widest">{new Date(missionDate).toLocaleDateString('en-KE', { dateStyle: 'medium' })}</span>
                       </div>
                       <h3 className="text-3xl font-serif font-bold text-brand-green tracking-tighter italic leading-none truncate">{clientInfo.company || 'Prospective Partner'}</h3>
                       <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{clientInfo.contact || 'N/A'}</div>
                    </div>
                </header>

                {results.marginError && (
                    <div className="bg-red-50 border border-red-100 p-4 flex gap-3 animate-pulse">
                        <AlertTriangle className="text-red-500 shrink-0" size={16} />
                        <p className="text-[10px] font-bold text-red-700 uppercase tracking-tight leading-normal">{results.marginError}</p>
                    </div>
                )}

                <section className="relative z-10">
                    <table className="w-full text-left text-[11px] font-serif border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 text-[8px] uppercase tracking-widest text-gray-400 font-bold">
                            <th className="py-2 pr-4">Description</th>
                            <th className="py-2 pr-4 text-center">Unit Basis</th>
                            <th className="py-2 text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-brand-green italic">
                        <tr>
                            <td className="py-4 pr-4">{selectedProgram.title}</td>
                            <td className="py-4 pr-4 text-center text-[8px] uppercase tracking-widest">
                                {results.isGroup ? 'GROUP' : `${formatKES(results.unitRate)} PP`}
                            </td>
                            <td className="py-4 text-right font-bold">{formatKES(results.baseTotal)}</td>
                        </tr>
                        {results.venueCost > 0 && (
                            <tr>
                                <td className="py-4 pr-4">Site: {VENUE_GROUNDS[venue].label}</td>
                                <td className="py-4 pr-4 text-center text-[8px] uppercase tracking-widest">{formatKES(VENUE_GROUNDS[venue].price)}/DAY</td>
                                <td className="py-4 text-right font-bold">{formatKES(results.venueCost)}</td>
                            </tr>
                        )}
                        {results.transportCost > 0 && (
                            <tr>
                                <td className="py-4 pr-4">Fleet: {results.vehicleCount}x {FLEET_SOLUTIONS[transport].label}</td>
                                <td className="py-4 pr-4 text-center text-[8px] uppercase tracking-widest">{formatKES(FLEET_SOLUTIONS[transport].price)}/UNIT</td>
                                <td className="py-4 text-right font-bold">{formatKES(results.transportCost)}</td>
                            </tr>
                        )}
                        {results.accommodationCost > 0 && (
                            <tr>
                                <td className="py-4 pr-4">Stay: {ACCOMMODATION_LEVELS[accommodation].label}</td>
                                <td className="py-4 pr-4 text-center text-[8px] uppercase tracking-widest">{formatKES(ACCOMMODATION_LEVELS[accommodation].price)} PP</td>
                                <td className="py-4 text-right font-bold">{formatKES(results.accommodationCost)}</td>
                            </tr>
                        )}
                        
                        {/* RESTORED AND ENHANCED ADD-ONS VISIBILITY */}
                        {results.selectedAddonsList.map(addon => (
                            <tr key={addon.id} className="bg-brand-sand/30 border-l-4 border-brand-gold">
                                <td className="py-4 px-4 text-brand-gold font-bold italic">ADD-ON: {addon.label}</td>
                                <td className="py-4 pr-4 text-center text-[8px] uppercase tracking-widest">
                                    {addon.type === 'pp' ? `${formatKES(addon.price)} PP` : 'FLAT'}
                                </td>
                                <td className="py-4 text-right font-bold text-brand-gold">
                                    {formatKES(addon.type === 'pp' ? addon.price * pax : addon.price)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </section>

                <section className="bg-brand-green/5 p-6 border-l-4 border-brand-green relative z-10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase text-brand-green tracking-widest">Ground Handling & Institutional Buffer</span>
                        <span className="text-[10px] font-bold text-brand-green">{formatKES(results.opsFee)}</span>
                    </div>
                    <p className="text-[8px] text-gray-400 uppercase tracking-widest font-bold leading-normal">
                        Includes certified site recon, 24/7 medical standby, and 4% institutional buffer.
                    </p>
                </section>
             </div>

             <div className="space-y-8 mt-10">
                <section className="bg-brand-green text-white p-8 space-y-4 relative z-10 shadow-xl">
                    <div>
                        <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.6em] block mb-2">Total Mission Investment</span>
                        <div className="text-5xl font-serif font-bold text-brand-gold tracking-tighter leading-none">{formatKES(results.subtotal)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                        <div>
                            <span className="text-[8px] opacity-60 uppercase font-bold tracking-widest block mb-1">50% Commitment</span>
                            <span className="text-xl font-serif font-bold text-brand-gold">{formatKES(results.deposit)}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[8px] opacity-60 uppercase font-bold tracking-widest block mb-1">Final Balance</span>
                            <span className="text-xl font-serif font-bold">{formatKES(results.deposit)}</span>
                        </div>
                    </div>
                </section>

                <footer className="pt-8 border-t border-gray-100 flex flex-col gap-6 relative z-10 print:hidden">
                    <div className="flex items-center justify-between text-brand-gold opacity-60">
                        <div className="flex items-center gap-2"><ShieldCheck size={14}/> <span className="text-[8px] font-bold uppercase tracking-widest">Verified Mission Log V6.3</span></div>
                        <span className="text-[8px] font-bold uppercase tracking-widest">CCA/2026/PROPOSAL</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => window.print()} className="w-full py-4 border-2 border-brand-green text-brand-green font-bold text-[9px] uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all"><Printer size={16} className="inline mr-2" /> EXPORT PDF</button>
                        <button 
                            onClick={handleWhatsApp} 
                            disabled={!!results.marginError}
                            className={`w-full py-4 bg-[#25D366] text-white font-bold text-[9px] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 ${!!results.marginError ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                        >
                            <MessageCircle size={16} /> FINALIZE MISSION
                        </button>
                    </div>
                </footer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
