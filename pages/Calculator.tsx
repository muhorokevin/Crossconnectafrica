import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageCircle, User, Mail, Building2, Phone, MapPin, Truck, Utensils, Map as MapIcon,
  ShieldCheck, CheckCircle2, Printer, Download, FileText, Check, Copy, Eye, X,
  Users, Clock, Minus, Plus, ChevronDown, ChevronUp, Info, Calendar, ArrowLeft, ArrowRight
} from 'lucide-react';
import { CATEGORIES, Program, Category, GroupType } from '../data/programs';
import { BookingContextData } from '../App';
import Logo from '../components/Logo';
import CustomCalendar from '../components/CustomCalendar';

// Current documents (Rate Card 2026 v8, Company Profile 2026 v2)
export const RATE_CARD_PDF_URL = '/docs/Cross_Connect_Africa_Rate_Card_2026.pdf';
export const COMPANY_PROFILE_PDF_URL = '/docs/Cross_Connect_Africa_Company_Profile_2026.pdf';

// Official details printed on proforma quotes
export const OFFICIAL_PROFORMA_REMITTANCE = {
  companyName: 'Cross Connect Africa Ltd',
  location: 'Valley View Office Park, B1 Office 1, Nairobi',
  postal: 'P.O. Box 18923-00100, Nairobi, Kenya',
  email: 'crossconnectmissions@protonmail.com',
  phone: '+254 710 974 670',
  bank: 'Absa Bank Kenya Plc',
  paybill: '303030',
  accountNumber: '2043432128',
  mpesaNumber: '+254710974670',
  kraPin: 'P052198744M'
};

// ============================================================
// RATE CARD 2026 v8: TRAVEL OUTSIDE NAIROBI (page 2)
// Free within 50 km. Beyond that: fuel at KES 25 per km of the return
// trip, per vehicle (one vehicle carries up to 4 crew). Overnight stays
// (venue over 300 km away, or an event over more than one day) are
// KES 5,000 per crew member per night.
// ============================================================
const FUEL_PER_KM = 25;
const FREE_RADIUS_KM = 50;
const OVERNIGHT_FROM_KM = 300;
const NIGHT_RATE = 5000;
const CREW_PER_VEHICLE = 4;

const TOWNS = [
  { id: 'nairobi', label: 'Nairobi or within 50 km', km: 0 },
  { id: 'machakos', label: 'Machakos', km: 65 },
  { id: 'naivasha', label: 'Naivasha', km: 90 },
  { id: 'embu', label: 'Embu', km: 130 },
  { id: 'narok', label: 'Narok', km: 145 },
  { id: 'nyeri', label: 'Nyeri', km: 150 },
  { id: 'nakuru', label: 'Nakuru', km: 160 },
  { id: 'nanyuki', label: 'Nanyuki', km: 200 },
  { id: 'meru', label: 'Meru', km: 225 },
  { id: 'kericho', label: 'Kericho', km: 255 },
  { id: 'eldoret', label: 'Eldoret', km: 310 },
  { id: 'kisumu', label: 'Kisumu', km: 345 },
  { id: 'mombasa', label: 'Mombasa', km: 485 },
  { id: 'other', label: 'Somewhere else (enter the distance)', km: 0 }
] as const;
type TownId = typeof TOWNS[number]['id'];

// Event medics risk levels (page 17)
const MEDIC_RISK_TIERS = {
  low: { id: 'low', title: 'Low risk', examples: 'Meetings, conferences, church services, weddings', multiplier: 1.0, paxPerMedic: 150, ambulanceFrom: 300 },
  medium: { id: 'medium', title: 'Medium risk', examples: 'School sports, concerts, festivals, team building', multiplier: 1.15, paxPerMedic: 100, ambulanceFrom: 200 },
  high: { id: 'high', title: 'High risk', examples: 'Marathons, hikes, motorsport, large crowds, rough terrain', multiplier: 1.35, paxPerMedic: 60, ambulanceFrom: 100 }
};
type MedicRisk = keyof typeof MEDIC_RISK_TIERS;

// Assessments by site size, for the 10% full-chain bundle (page 7)
const ASSESSMENT_SITES = {
  none: { id: 'none', label: 'Training only', site: 0, pre: 0, post: 0 },
  small: { id: 'small', label: 'Small site (up to 500 m² or one building)', site: 23000, pre: 8500, post: 15500 },
  medium: { id: 'medium', label: 'Medium site (up to 2,000 m²)', site: 34000, pre: 13000, post: 22000 },
  large: { id: 'large', label: 'Large site (up to 5,000 m²)', site: 50000, pre: 16500, post: 29500 },
  multi: { id: 'multi', label: 'Multi-site or over 5,000 m² (from)', site: 75000, pre: 24500, post: 44500 }
};
type AssessmentSite = keyof typeof ASSESSMENT_SITES;

// Optional extras (pages 5, 6, 10 and 11)
const ADDONS = [
  { id: 'tb_extra_fac', label: 'Extra professional facilitator', price: 12000, type: 'flat', category: 'team_building' },
  { id: 'tb_photo_video', label: 'Photography and video', price: 18000, type: 'flat', category: 'team_building' },
  { id: 'tb_mc_host', label: 'MC and energizer host', price: 15000, type: 'flat', category: 'team_building' },
  { id: 'tb_tshirts', label: 'Branded T-shirts', price: 700, type: 'pp', category: 'team_building' },

  { id: 'drill_amb', label: 'Ambulance on standby, up to 8 hrs (estimate)', price: 22000, type: 'flat', category: 'fire_drill_only' },
  { id: 'drill_fire_eng', label: 'Fire engine on standby (estimate)', price: 38500, type: 'flat', category: 'fire_drill_only' },
  { id: 'drill_police', label: 'Police liaison and traffic marshals (estimate)', price: 5500, type: 'flat', category: 'fire_drill_only' },

  { id: 'fam_home_pack', label: 'Home Safety Pack (extinguisher, fire blanket, smoke alarm, first aid kit)', price: 7000, type: 'flat', category: 'families' },

  { id: 'hi_hydration_pack', label: 'Trail snacks and electrolyte pack', price: 500, type: 'pp', category: 'expeditions' },
  { id: 'hi_photographer', label: 'Trail photographer', price: 10000, type: 'flat', category: 'expeditions' },
  { id: 'ac_badges', label: 'Adventure club badges and awards', price: 250, type: 'pp', category: 'school_clubs' }
] as const;

// Things we can arrange for you, passed on at cost (planning estimates)
const VENUE_TYPES = {
  none: { label: 'You have a venue', price: 0 },
  public: { label: 'Public grounds or park', price: 5000 },
  school: { label: 'School grounds (weekend)', price: 10000 },
  private: { label: 'Private grounds or campsite', price: 15000 },
  resort: { label: 'Resort or hotel grounds', price: 35000 }
};
const FLEET = {
  none: { label: 'You arrange transport', price: 0, capacity: 0 },
  prado: { label: '4x4, 6 seats', price: 10000, capacity: 6 },
  van: { label: 'Tour van, 14 seats', price: 12000, capacity: 14 },
  minibus: { label: 'Minibus, 25 seats', price: 18000, capacity: 25 },
  coaster: { label: 'Coaster, 33 seats', price: 25000, capacity: 33 },
  bus45: { label: 'Bus, 45 seats', price: 35000, capacity: 45 },
  bus55: { label: 'Coach, 55 seats', price: 45000, capacity: 55 }
};
const MEALS = [
  { id: 'breakfast', label: 'Breakfast', price: 400 },
  { id: 'tea', label: 'Tea and snacks', price: 250 },
  { id: 'lunch', label: 'Lunch', price: 800 },
  { id: 'dinner', label: 'Dinner', price: 1200 }
];

// Public address system by group size (page 5)
const getPaPrice = (pax: number) => {
  if (pax <= 100) return { price: 10000, tier: 'up to 100 people' };
  if (pax <= 200) return { price: 15000, tier: '101 to 200 people' };
  if (pax <= 300) return { price: 20000, tier: '201 to 300 people' };
  return { price: 30000, tier: '301 to 500 people' };
};

const formatKES = (n: number) => `KES ${Math.round(n).toLocaleString('en-KE')}`;

interface Line {
  label: string;
  detail?: string;
  amount: number;
  group: 'service' | 'extras' | 'travel' | 'arranged' | 'discount';
}

// ------------------------------------------------------------
// Small UI pieces
// ------------------------------------------------------------
const StepHeader: React.FC<{ n: number; total: number; title: string; hint?: string }> = ({ n, total, title, hint }) => (
  <div className="mb-7">
    <p className="text-[13px] font-semibold text-brand-gold tracking-wide">Step {n} of {total}</p>
    <h2 className="font-display font-bold text-brand-green text-3xl sm:text-4xl leading-[1.05] mt-2">{title}</h2>
    {hint && <p className="text-[15px] text-brand-green/60 mt-2 max-w-xl leading-relaxed">{hint}</p>}
  </div>
);

const FieldLabel: React.FC<{ children: React.ReactNode; htmlFor?: string }> = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-[15px] font-semibold text-brand-green mb-2.5">{children}</label>
);

const Choice: React.FC<{ selected: boolean; onClick: () => void; title: string; sub?: string; icon?: React.ReactNode; aside?: string }> = ({ selected, onClick, title, sub, icon, aside }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-3.5 ${
      selected ? 'bg-brand-green text-white shadow-lift' : 'bg-white ring-1 ring-brand-green/10 hover:ring-brand-green/35 text-brand-green'
    }`}
  >
    {icon && (
      <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${selected ? 'bg-white/10 text-brand-amber' : 'bg-brand-sand text-brand-green'}`}>{icon}</span>
    )}
    <span className="flex-1 min-w-0">
      <span className="block text-[15px] font-semibold leading-snug">{title}</span>
      {sub && <span className={`block text-sm mt-0.5 leading-snug ${selected ? 'text-white/70' : 'text-brand-green/55'}`}>{sub}</span>}
    </span>
    {aside && <span className={`shrink-0 text-sm font-semibold tabular-nums ${selected ? 'text-brand-amber' : 'text-brand-green'}`}>{aside}</span>}
    <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${selected ? 'bg-brand-amber text-brand-ink' : 'ring-2 ring-brand-green/15'}`}>
      {selected && <Check size={14} strokeWidth={3} />}
    </span>
  </button>
);

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; title: string; sub?: string }> = ({ checked, onChange, title, sub }) => (
  <label className={`flex items-start gap-3.5 cursor-pointer p-4 rounded-2xl transition-all ${checked ? 'bg-brand-green/[0.05] ring-2 ring-brand-green' : 'bg-white ring-1 ring-brand-green/10 hover:ring-brand-green/35'}`}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
    <span className={`mt-0.5 shrink-0 w-11 h-6 rounded-full relative transition-colors ${checked ? 'bg-brand-green' : 'bg-brand-green/20'} peer-focus-visible:ring-2 peer-focus-visible:ring-brand-gold peer-focus-visible:ring-offset-2`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </span>
    <span>
      <span className="block text-[15px] font-semibold text-brand-green leading-snug">{title}</span>
      {sub && <span className="block text-sm text-brand-green/55 mt-0.5 leading-snug">{sub}</span>}
    </span>
  </label>
);

const Stepper: React.FC<{ value: number; onChange: (v: number) => void; min?: number; max?: number; id?: string; suffix?: string }> = ({ value, onChange, min = 1, max = 5000, id, suffix }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <div className="inline-flex items-center rounded-full bg-white ring-1 ring-brand-green/15 p-1">
      <button type="button" aria-label="Decrease" onClick={() => onChange(Math.max(min, value - 1))} className="w-11 h-11 rounded-full flex items-center justify-center text-brand-green hover:bg-brand-sand">
        <Minus size={18} />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Math.min(max, Math.max(min, parseInt(e.target.value) || min)))}
        className="w-20 h-11 text-center bg-transparent font-display font-bold text-xl text-brand-green focus:outline-none tabular-nums"
      />
      <button type="button" aria-label="Increase" onClick={() => onChange(Math.min(max, value + 1))} className="w-11 h-11 rounded-full flex items-center justify-center text-brand-green hover:bg-brand-sand">
        <Plus size={18} />
      </button>
    </div>
    {suffix && <span className="text-sm text-brand-green/55 ml-1">{suffix}</span>}
  </div>
);

const inputClass = 'w-full h-[52px] px-4 rounded-2xl bg-white ring-1 ring-brand-green/15 text-[15px] text-brand-green placeholder:text-brand-green/35 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-shadow';
const selectClass = `${inputClass} appearance-none pr-10`;

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <div className="relative">
    <select {...props} className={selectClass} />
    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-green/40 pointer-events-none" />
  </div>
);

// Lowest price for a service, shown on its card
const fromPrice = (p: Program): number => {
  switch (p.priceType) {
    case 'team_building_v6':
      return p.teamBuildingRates ? Math.min(...Object.values(p.teamBuildingRates).map(r => r.minFee)) : p.basePrice;
    case 'two_part': {
      const d = p.durations?.[0];
      return Math.max(p.minSessionFee || 0, (d?.programFee ?? p.programFee ?? 0) + (d?.perPersonFee ?? p.perPersonFee ?? 0) * 10);
    }
    default:
      return p.durations?.length ? Math.min(...p.durations.map(d => d.price)) : p.basePrice;
  }
};

// Plain-language one-liners for each category, shown on the service tiles
const CATEGORY_BLURB: Record<string, string> = {
  team_building: 'Games and challenges for staff, churches and groups',
  safety_training: 'First aid, fire safety, drills, assessments and medics',
  families: 'Safety and fun for one household, at your home',
  school_clubs: 'Clubs and outdoor programmes for students',
  expeditions: 'Guided hikes and outdoor trips',
  hosting: 'An MC for your wedding, gala or company event'
};

type StepId = 'service' | 'details' | 'location' | 'extras' | 'contact' | 'review';


// ============================================================
// QUOTE PAGE
// ============================================================
const Calculator: React.FC<{ initialData?: BookingContextData | null }> = ({ initialData }) => {
  const [clientInfo, setClientInfo] = useState({
    leadContact: initialData?.clientInfo?.contact || '',
    leadEmail: initialData?.clientInfo?.email || '',
    leadPhone: initialData?.clientInfo?.phone || '',
    organization: initialData?.clientInfo?.company || '',
    needEtims: initialData?.clientInfo?.needEtims || false,
    companyName: initialData?.clientInfo?.companyName || initialData?.clientInfo?.company || '',
    kraPin: initialData?.clientInfo?.kraPin || ''
  });
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<Category>(() => {
    if (initialData?.program) {
      const found = CATEGORIES.find(c => c.programs.some(p => p.id === initialData.program?.id));
      if (found) return found;
    }
    return CATEGORIES[0];
  });
  const [selectedProgram, setSelectedProgram] = useState<Program>(initialData?.program || CATEGORIES[0].programs[0]);
  const [durationIdx, setDurationIdx] = useState(initialData?.durationIndex || 0);
  const [pax, setPax] = useState(initialData?.pax || 30);
  const [eventDate, setEventDate] = useState('');

  // Team building
  const [groupType, setGroupType] = useState<GroupType>('corporate');
  const [includePaSystem, setIncludePaSystem] = useState(false);

  // Training
  const [assessmentSite, setAssessmentSite] = useState<AssessmentSite>('none');
  const [isYearlyRefresher, setIsYearlyRefresher] = useState(false);

  // Event medics
  const [medicRisk, setMedicRisk] = useState<MedicRisk>('low');
  const [medicHours, setMedicHours] = useState(4);
  const [manualMedics, setManualMedics] = useState<number | null>(null);
  const [includeAmbulance, setIncludeAmbulance] = useState(false);
  const [includeMedicalPlan, setIncludeMedicalPlan] = useState(false);

  // MC
  const [mcExtraHours, setMcExtraHours] = useState(0);

  // Travel
  const [town, setTown] = useState<TownId>('nairobi');
  const [customKm, setCustomKm] = useState(100);
  const [crewOverride, setCrewOverride] = useState<number | null>(null);
  const [clientCoversTravel, setClientCoversTravel] = useState(false);

  // Things we arrange (at cost)
  const [showArranged, setShowArranged] = useState(false);
  const [venueType, setVenueType] = useState<keyof typeof VENUE_TYPES>('none');
  const [fleetType, setFleetType] = useState<keyof typeof FLEET>('none');
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  const [chosenAddons, setChosenAddons] = useState<string[]>(initialData?.addons || []);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Wizard position. Coming from a service card, the service is already chosen, so start at the details.
  const [stepId, setStepId] = useState<StepId>(initialData?.program ? 'details' : 'service');
  const [furthest, setFurthest] = useState(initialData?.program ? 1 : 0);
  const [showSheet, setShowSheet] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [quoteId] = useState(`CCA-Q-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`);

  const variant = selectedProgram.durations?.[durationIdx];
  const pt = selectedProgram.priceType;
  const isSelfContained = !!selectedProgram.selfContained;
  const usesHeadcount = pt === 'team_building_v6' || pt === 'two_part' || pt === 'per_person' || pt === 'family';

  // Reset service-specific options when the service changes
  useEffect(() => {
    setMcExtraHours(0);
    setAssessmentSite('none');
    setIsYearlyRefresher(false);
    setCrewOverride(null);
    setChosenAddons(prev => prev.filter(id => {
      const a = ADDONS.find(x => x.id === id);
      return a && (a.category === selectedProgram.category || (selectedProgram.id === 'fire_drill' && a.category === 'fire_drill_only'));
    }));
  }, [selectedProgram.id, durationIdx]);

  // Families default to a household size
  useEffect(() => {
    if (pt === 'family' && pax > 20) setPax(4);
  }, [pt]);

  const recommendedMedics = Math.max(1, Math.ceil(Math.max(1, pax) / MEDIC_RISK_TIERS[medicRisk].paxPerMedic));
  const medicsCount = manualMedics ?? recommendedMedics;

  const defaultCrew = useMemo(() => {
    if (pt === 'team_building_v6') return Math.max(1, Math.ceil(pax / 30)); // one facilitator per 30 people
    if (pt === 'medic_v6') return medicsCount;
    if (selectedProgram.crewByOption?.[durationIdx]) return selectedProgram.crewByOption[durationIdx];
    return 1;
  }, [pt, pax, medicsCount, selectedProgram, durationIdx]);
  const crew = crewOverride ?? defaultCrew;

  const townObj = TOWNS.find(t => t.id === town)!;
  const distanceKm = town === 'other' ? customKm : townObj.km;

  // ==========================================================
  // PRICE ENGINE (Rate Card 2026 v8)
  // ==========================================================
  const quote = useMemo(() => {
    const lines: Line[] = [];
    const people = Math.max(1, pax);
    const days = Math.max(1, Math.ceil(variant?.days || 1));
    let minFeeApplied = false;

    // 1. Service fee
    if (pt === 'team_building_v6' && selectedProgram.teamBuildingRates) {
      const cfg = selectedProgram.teamBuildingRates[groupType];
      const gross = people * cfg.perHead;
      const pct = people >= 200 ? 20 : people >= 100 ? 15 : people >= 50 ? 10 : people >= 30 ? 5 : 0;
      const net = gross * (1 - pct / 100);
      if (net < cfg.minFee) {
        minFeeApplied = true;
        lines.push({ label: `${selectedProgram.title}, minimum session fee`, detail: `${cfg.label}. ${people} people × ${formatKES(cfg.perHead)} = ${formatKES(gross)}, less than the minimum`, amount: cfg.minFee, group: 'service' });
      } else {
        lines.push({ label: selectedProgram.title, detail: `${people} people × ${formatKES(cfg.perHead)} (${cfg.label})`, amount: gross, group: 'service' });
        if (pct) lines.push({ label: `Volume rate, ${pct}% off`, amount: -gross * pct / 100, group: 'discount' });
      }
      if (includePaSystem) {
        const pa = getPaPrice(people);
        lines.push({ label: 'Public address system with technician', detail: pa.tier, amount: pa.price, group: 'extras' });
      }
    } else if (pt === 'two_part') {
      const progFee = variant?.programFee ?? selectedProgram.programFee ?? 0;
      const perPerson = variant?.perPersonFee ?? selectedProgram.perPersonFee ?? 0;
      const raw = progFee + perPerson * people;
      const course = Math.max(selectedProgram.minSessionFee || 0, raw);
      if (course > raw) {
        minFeeApplied = true;
        lines.push({ label: `${selectedProgram.title}, minimum fee`, detail: `${people} people`, amount: course, group: 'service' });
      } else {
        lines.push({ label: `${selectedProgram.title}: programme fee`, amount: progFee, group: 'service' });
        lines.push({ label: `${people} ${selectedProgram.category === 'school_clubs' ? 'students' : 'people'} × ${formatKES(perPerson)}`, detail: 'Manuals, practice materials and certificates', amount: perPerson * people, group: 'service' });
      }
      if (selectedProgram.supportsFullChainBundle && assessmentSite !== 'none') {
        const s = ASSESSMENT_SITES[assessmentSite];
        lines.push({ label: 'Site assessment', detail: s.label, amount: s.site, group: 'service' });
        lines.push({ label: 'Pre-training assessment', amount: s.pre, group: 'service' });
        lines.push({ label: 'Post-training assessment', amount: s.post, group: 'service' });
        lines.push({ label: 'Bundle saving, 10% off the four', amount: -(course + s.site + s.pre + s.post) * 0.1, group: 'discount' });
      } else if (selectedProgram.supportsRefresher && isYearlyRefresher) {
        lines.push({ label: 'Yearly refresher, 15% off the course fee', amount: -course * 0.15, group: 'discount' });
      }
    } else if (pt === 'medic_v6') {
      const hours = Math.max(4, medicHours);
      const tier = MEDIC_RISK_TIERS[medicRisk];
      const rate = Math.round(2400 * tier.multiplier);
      lines.push({ label: 'Medics on standby', detail: `${medicsCount} medic${medicsCount > 1 ? 's' : ''} × ${hours} hours × ${formatKES(rate)} (${tier.title.toLowerCase()})`, amount: medicsCount * hours * rate, group: 'service' });
      const kits = Math.ceil(medicsCount / 2);
      lines.push({ label: `Medic kit${kits > 1 ? 's' : ''}`, detail: `${kits} × KES 3,500 (one per two medics)`, amount: kits * 3500, group: 'service' });
      if (includeAmbulance) {
        const extra = Math.max(0, hours - 8);
        lines.push({ label: 'Ambulance with driver and EMT', detail: extra ? `Up to 8 hours, plus ${extra} extra hour${extra > 1 ? 's' : ''} × KES 3,000` : 'Up to 8 hours', amount: 28000 + extra * 3000, group: 'service' });
      }
      if (includeMedicalPlan) lines.push({ label: 'Event medical plan and risk review', amount: 5000, group: 'service' });
    } else if (pt === 'mc_v6') {
      const fee = variant?.price ?? selectedProgram.basePrice;
      lines.push({ label: `MC: ${variant?.label.split(' —')[0].split(' (')[0] || selectedProgram.title}`, detail: `${variant?.includedHours || 4} hours included`, amount: fee, group: 'service' });
      if (mcExtraHours > 0) {
        const r = variant?.extraHourRate ?? 3000;
        lines.push({ label: `${mcExtraHours} extra hour${mcExtraHours > 1 ? 's' : ''}`, detail: `× ${formatKES(r)}`, amount: mcExtraHours * r, group: 'service' });
      }
      if (includePaSystem) {
        const pa = getPaPrice(people);
        lines.push({ label: 'Public address system with technician', detail: pa.tier, amount: pa.price, group: 'extras' });
      }
    } else if (pt === 'family' && variant) {
      const included = variant.includedPeople || 6;
      const extraPeople = Math.max(0, people - included);
      const extraFee = extraPeople * (variant.extraPersonFee || 0);
      lines.push({ label: variant.label, detail: `Family package, up to ${included} people`, amount: variant.price, group: 'service' });
      if (extraPeople) lines.push({ label: `${extraPeople} extra ${extraPeople > 1 ? 'people' : 'person'}`, detail: `× ${formatKES(variant.extraPersonFee || 0)}`, amount: extraFee, group: 'service' });
      if (variant.bundleDiscountPercent) lines.push({ label: `Bundle saving, ${variant.bundleDiscountPercent}% off`, amount: -(variant.price + extraFee) * variant.bundleDiscountPercent / 100, group: 'discount' });
    } else if (variant?.isGroup || pt === 'flat_rate') {
      const fee = variant?.price ?? selectedProgram.basePrice;
      lines.push({ label: variant?.label || selectedProgram.title, amount: fee, group: 'service' });
      if (selectedProgram.supportsRefresher && isYearlyRefresher) lines.push({ label: 'Yearly refresher, 15% off', amount: -fee * 0.15, group: 'discount' });
    } else {
      const each = variant?.price ?? selectedProgram.basePrice;
      lines.push({ label: variant?.label.split(' (')[0] || selectedProgram.title, detail: `${people} people × ${formatKES(each)}`, amount: each * people, group: 'service' });
    }

    // 2. Travel outside Nairobi
    let travelNote = '';
    if (!isSelfContained) {
      if (clientCoversTravel) {
        travelNote = 'You provide transport and rooms for our crew, so there is no travel charge.';
      } else if (distanceKm > FREE_RADIUS_KM) {
        const vehicles = Math.ceil(crew / CREW_PER_VEHICLE);
        const fuelPerVehicle = Math.round((distanceKm * 2 * FUEL_PER_KM) / 100) * 100;
        lines.push({ label: 'Fuel, return trip', detail: `${distanceKm} km each way × 2 × KES ${FUEL_PER_KM} per km${vehicles > 1 ? ` × ${vehicles} vehicles` : ''}`, amount: fuelPerVehicle * vehicles, group: 'travel' });
        const nights = distanceKm > OVERNIGHT_FROM_KM ? days : days - 1;
        if (nights > 0) lines.push({ label: 'Crew rooms and meals', detail: `${crew} crew × ${nights} night${nights > 1 ? 's' : ''} × ${formatKES(NIGHT_RATE)}`, amount: crew * nights * NIGHT_RATE, group: 'travel' });
      } else {
        travelNote = 'Within 50 km of Nairobi, travel is included.';
      }
      if (pt === 'medic_v6' && includeAmbulance && distanceKm > FREE_RADIUS_KM && !clientCoversTravel) {
        lines.push({ label: 'Ambulance outside Nairobi', detail: `${distanceKm} km × KES 100`, amount: distanceKm * 100, group: 'travel' });
      }
    }

    // 3. Optional extras
    chosenAddons.forEach(id => {
      const a = ADDONS.find(x => x.id === id);
      if (!a) return;
      lines.push({ label: a.label, detail: a.type === 'pp' ? `${people} × ${formatKES(a.price)}` : undefined, amount: a.type === 'pp' ? a.price * people : a.price, group: 'extras' });
    });

    // 4. Things we arrange, passed on at cost
    if (!isSelfContained) {
      const venue = VENUE_TYPES[venueType];
      if (venue.price) lines.push({ label: `Venue: ${venue.label.toLowerCase()}`, detail: `Estimate${days > 1 ? `, ${days} days` : ''}`, amount: venue.price * days, group: 'arranged' });
      const fleet = FLEET[fleetType];
      if (fleet.capacity) {
        const v = Math.ceil(people / fleet.capacity);
        lines.push({ label: `Group transport: ${fleet.label.toLowerCase()}`, detail: `Estimate, ${v} vehicle${v > 1 ? 's' : ''}${days > 1 ? ` × ${days} days` : ''}`, amount: v * fleet.price * days, group: 'arranged' });
      }
      selectedMeals.forEach(mid => {
        const m = MEALS.find(x => x.id === mid);
        if (m) lines.push({ label: m.label, detail: `Estimate, ${people} × ${formatKES(m.price)}${days > 1 ? ` × ${days} days` : ''}`, amount: m.price * people * days, group: 'arranged' });
      });
    }

    const total = lines.reduce((s, l) => s + l.amount, 0);
    const savings = -lines.filter(l => l.amount < 0).reduce((s, l) => s + l.amount, 0);
    return { lines, total, deposit: total / 2, savings, minFeeApplied, perHead: total / people, travelNote, days };
  }, [
    selectedProgram, variant, pt, pax, groupType, includePaSystem, assessmentSite, isYearlyRefresher,
    medicRisk, medicHours, medicsCount, includeAmbulance, includeMedicalPlan, mcExtraHours,
    isSelfContained, clientCoversTravel, distanceKm, crew, chosenAddons, venueType, fleetType, selectedMeals
  ]);

  const visibleAddons = ADDONS.filter(a => a.category === selectedProgram.category || (selectedProgram.id === 'fire_drill' && a.category === 'fire_drill_only'));
  const toggleAddon = (id: string) => setChosenAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const dateText = eventDate ? new Date(eventDate).toLocaleDateString('en-KE', { dateStyle: 'long' }) : 'Date to be confirmed';
  const placeText = isSelfContained ? '' : town === 'other' ? `${customKm} km from Nairobi` : townObj.id === 'nairobi' ? 'Nairobi' : `${townObj.label} (${townObj.km} km)`;
  const clientName = clientInfo.needEtims ? (clientInfo.companyName || clientInfo.organization) : (clientInfo.organization || clientInfo.leadContact);

  const quoteText = (forWhatsApp: boolean) => {
    const b = (s: string) => forWhatsApp ? `*${s}*` : s;
    const items = quote.lines.map(l => `• ${l.label}${l.detail ? ` (${l.detail})` : ''}: ${l.amount < 0 ? '-' : ''}${formatKES(Math.abs(l.amount))}`).join('\n');
    return [
      b('CROSS CONNECT AFRICA: QUOTE REQUEST'),
      `Ref: ${quoteId}`,
      `Service: ${selectedProgram.title}`,
      usesHeadcount || pt === 'mc_v6' || pt === 'medic_v6' ? `People: ${pax}` : '',
      `Date: ${dateText}`,
      placeText ? `Where: ${placeText}` : '',
      '',
      items,
      '',
      b(`Total: ${formatKES(quote.total)}`),
      `50% deposit to confirm the date: ${formatKES(quote.deposit)}`,
      '',
      `Name: ${clientInfo.leadContact || 'Not given'}`,
      `Organisation: ${clientInfo.organization || 'Not given'}`,
      `Phone: ${clientInfo.leadPhone || 'Not given'}`,
      clientInfo.leadEmail ? `Email: ${clientInfo.leadEmail}` : '',
      clientInfo.needEtims ? `eTIMS invoice needed. Company: ${clientInfo.companyName || 'Not given'}, KRA PIN: ${clientInfo.kraPin || 'Not given'}` : '',
      '',
      'Prices from the Cross Connect Africa 2026 rate card, in Kenya shillings, excluding any taxes that apply. Valid 30 days.'
    ].filter((l, i, arr) => l !== '' || (arr[i - 1] !== '' && i > 0)).join('\n');
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(quoteText(true))}`, '_blank');
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(quoteText(false)).then(() => {
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2500);
    });
  };

  const selectCategory = (cat: Category) => {
    setActiveCategory(cat);
    setSelectedProgram(cat.programs[0]);
    setDurationIdx(0);
  };


  // Itemised table, shared by the on-screen preview and the printed proforma
  const ItemTable: React.FC<{ compact?: boolean }> = ({ compact }) => (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b-2 border-brand-green text-brand-green">
          <th className={`${compact ? 'py-2' : 'py-3'} pr-3 font-semibold`}>Item</th>
          <th className={`${compact ? 'py-2' : 'py-3'} pl-3 font-semibold text-right whitespace-nowrap`}>Amount</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {quote.lines.map((l, i) => (
          <tr key={i} className={l.amount < 0 ? 'text-emerald-800' : ''}>
            <td className={`${compact ? 'py-2' : 'py-3'} pr-3 align-top`}>
              <span className="font-medium text-gray-900">{l.label}</span>
              {l.detail && <span className="block text-xs text-gray-500 mt-0.5">{l.detail}</span>}
            </td>
            <td className={`${compact ? 'py-2' : 'py-3'} pl-3 text-right align-top tabular-nums whitespace-nowrap font-medium`}>
              {l.amount < 0 ? '-' : ''}{formatKES(Math.abs(l.amount))}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="border-t-2 border-brand-green">
          <td className="pt-3 pr-3 font-bold text-brand-green">Total</td>
          <td className="pt-3 pl-3 text-right font-bold text-brand-green tabular-nums whitespace-nowrap">{formatKES(quote.total)}</td>
        </tr>
        <tr>
          <td className="pt-1 pr-3 text-gray-600">50% deposit to confirm your date</td>
          <td className="pt-1 pl-3 text-right text-gray-600 tabular-nums whitespace-nowrap">{formatKES(quote.deposit)}</td>
        </tr>
      </tfoot>
    </table>
  );

  const Letterhead = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-brand-green pb-5">
      <div className="flex items-center gap-3">
        <Logo className="w-14 h-14" />
        <div>
          <p className="text-2xl font-serif font-bold text-brand-green leading-none">CROSS CONNECT AFRICA</p>
          <p className="text-xs text-brand-gold font-semibold mt-1">Connecting People. Building Resilience. Saving Lives.</p>
          <p className="text-xs text-gray-500 mt-1">{OFFICIAL_PROFORMA_REMITTANCE.location} · {OFFICIAL_PROFORMA_REMITTANCE.phone}</p>
        </div>
      </div>
      <div className="sm:text-right text-xs text-gray-600 space-y-0.5">
        <p className="inline-block px-3 py-1 bg-brand-green text-brand-gold font-bold uppercase tracking-wider rounded mb-1">Proforma quote</p>
        <p className="font-mono">{quoteId}</p>
        <p>Issued {new Date().toLocaleDateString('en-KE', { dateStyle: 'long' })}</p>
        <p>KRA PIN {OFFICIAL_PROFORMA_REMITTANCE.kraPin}</p>
      </div>
    </div>
  );

  const ProformaBody = () => (
    <div className="space-y-6">
      <Letterhead />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Prepared for</p>
          <p className="font-bold text-brand-green text-base">{clientName || 'Client'}</p>
          {clientInfo.leadContact && <p className="text-gray-700">Attn: {clientInfo.leadContact}</p>}
          {clientInfo.leadPhone && <p className="text-gray-700">{clientInfo.leadPhone}</p>}
          {clientInfo.leadEmail && <p className="text-gray-700">{clientInfo.leadEmail}</p>}
          {clientInfo.needEtims && <p className="text-gray-700 mt-1">Client KRA PIN: <strong>{clientInfo.kraPin || 'to be provided'}</strong></p>}
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Event</p>
          <p className="font-bold text-brand-green text-base">{selectedProgram.title}</p>
          <p className="text-gray-700">{dateText}</p>
          {placeText && <p className="text-gray-700">{placeText}</p>}
          {(usesHeadcount || pt === 'mc_v6' || pt === 'medic_v6') && <p className="text-gray-700">{pax} people</p>}
        </div>
      </div>
      <ItemTable />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-600 border-t border-gray-200 pt-5">
        <div className="space-y-0.5">
          <p className="font-semibold text-brand-green uppercase tracking-wider mb-1">How to pay</p>
          <p>{OFFICIAL_PROFORMA_REMITTANCE.bank}, account {OFFICIAL_PROFORMA_REMITTANCE.accountNumber}</p>
          <p>M-Pesa Paybill {OFFICIAL_PROFORMA_REMITTANCE.paybill}, account {OFFICIAL_PROFORMA_REMITTANCE.accountNumber}</p>
        </div>
        <div className="sm:text-right space-y-0.5">
          <p>A 50% deposit confirms your date. The balance is due on completion.</p>
          <p>Prices in Kenya shillings, excluding any taxes that apply. Valid 30 days.</p>
          <p>Venue, food and outside services are billed at cost where stated.</p>
        </div>
      </div>
    </div>
  );

  // ==========================================================
  // WIZARD
  // ==========================================================
  const steps: { id: StepId; title: string }[] = [
    { id: 'service', title: 'Service' },
    { id: 'details', title: 'Details' },
    ...(!isSelfContained ? [{ id: 'location' as StepId, title: 'Location' }] : []),
    ...(visibleAddons.length > 0 || !isSelfContained ? [{ id: 'extras' as StepId, title: 'Extras' }] : []),
    { id: 'contact', title: 'Your details' },
    { id: 'review', title: 'Send' }
  ];
  const rawIdx = steps.findIndex(s => s.id === stepId);
  const idx = rawIdx === -1 ? Math.min(steps.length - 2, 1) : rawIdx;
  const current = steps[idx];
  const next = steps[idx + 1];
  const contactMissing = !clientInfo.leadContact.trim() || clientInfo.leadPhone.replace(/\D/g, '').length < 9;

  const goTo = (i: number) => {
    const target = steps[Math.max(0, Math.min(steps.length - 1, i))];
    setStepId(target.id);
    setFurthest(f => Math.max(f, i));
    setShowSheet(false);
    requestAnimationFrame(() => document.getElementById('wizard-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const goNext = () => {
    if (current.id === 'contact' && contactMissing) { setShowErrors(true); return; }
    goTo(idx + 1);
  };
  const goBack = () => goTo(idx - 1);

  const pickProgram = (prog: Program) => { setSelectedProgram(prog); setDurationIdx(0); };

  const nextLabel = next ? (next.id === 'review' ? 'Review your quote' : `Next: ${next.title.toLowerCase()}`) : '';

  const metaChips = (
    <>
      {(usesHeadcount || pt === 'mc_v6' || pt === 'medic_v6') && <span className="inline-flex items-center gap-1.5"><Users size={14} /> {pax} {pax === 1 ? 'person' : 'people'}</span>}
      <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> {eventDate ? new Date(eventDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Date open'}</span>
      {placeText && <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {placeText}</span>}
      {pt === 'medic_v6' && <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {Math.max(4, medicHours)} hrs</span>}
    </>
  );

  const LineList: React.FC = () => (
    <ul className="divide-y divide-brand-green/10 text-sm">
      {quote.lines.map((l, i) => (
        <li key={i} className="py-3 flex justify-between gap-4">
          <span className="min-w-0">
            <span className={`block font-medium ${l.amount < 0 ? 'text-emerald-700' : 'text-brand-green'}`}>{l.label}</span>
            {l.detail && <span className="block text-xs text-brand-green/50 mt-0.5 leading-snug">{l.detail}</span>}
          </span>
          <span className={`shrink-0 tabular-nums font-semibold ${l.amount < 0 ? 'text-emerald-700' : 'text-brand-green'}`}>{l.amount < 0 ? '-' : ''}{formatKES(Math.abs(l.amount))}</span>
        </li>
      ))}
    </ul>
  );

  const Notes: React.FC = () => (
    <div className="space-y-2">
      {quote.savings > 0 && <p className="text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-xl px-3 py-2">You save {formatKES(quote.savings)}</p>}
      {quote.minFeeApplied && <p className="text-sm text-amber-900 bg-amber-50 rounded-xl px-3 py-2">Small groups pay the minimum session fee, because every session takes the same planning, props and facilitation.</p>}
      {quote.travelNote && <p className="text-sm text-brand-green/60 flex gap-2"><Truck size={16} className="text-brand-gold shrink-0 mt-0.5" />{quote.travelNote}</p>}
    </div>
  );

  const SendActions: React.FC = () => (
    <div className="space-y-2.5">
      <button onClick={handleWhatsApp} className="w-full h-14 rounded-full bg-[#25D366] hover:bg-[#1fb857] text-white font-semibold text-base flex items-center justify-center gap-2 shadow-soft">
        <MessageCircle size={20} /> Send on WhatsApp
      </button>
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => setShowInvoiceModal(true)} className="h-12 rounded-full ring-1 ring-brand-green/15 bg-white text-brand-green font-semibold text-sm flex items-center justify-center gap-1.5 hover:ring-brand-green/40">
          <Eye size={16} /> Preview
        </button>
        <button onClick={() => window.print()} className="h-12 rounded-full ring-1 ring-brand-green/15 bg-white text-brand-green font-semibold text-sm flex items-center justify-center gap-1.5 hover:ring-brand-green/40">
          <Printer size={16} /> PDF
        </button>
        <button onClick={handleCopyQuote} className="h-12 rounded-full ring-1 ring-brand-green/15 bg-white text-brand-green font-semibold text-sm flex items-center justify-center gap-1.5 hover:ring-brand-green/40">
          {copiedQuote ? <><Check size={16} className="text-emerald-600" /> Copied</> : <><Copy size={16} /> Copy</>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream pt-24 md:pt-28 pb-36 lg:pb-20">
      {/* PRINT VERSION */}
      <div className="hidden print:block bg-white text-gray-900 p-8">
        <ProformaBody />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:hidden">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-gold">2026 rate card prices</p>
            <h1 className="font-display font-bold text-brand-green text-4xl sm:text-5xl md:text-6xl leading-[1] mt-3">Get your price.</h1>
            <p className="text-lg text-brand-green/65 mt-4 leading-relaxed">A few quick questions. Your price updates as you go, and you can send it to us on WhatsApp at the end.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setShowPdfModal(RATE_CARD_PDF_URL)} className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white ring-1 ring-brand-green/15 text-brand-green text-sm font-semibold hover:ring-brand-green/40">
              <Eye size={16} /> Rate card
            </button>
            <a href={COMPANY_PROFILE_PDF_URL} download className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white ring-1 ring-brand-green/15 text-brand-green text-sm font-semibold hover:ring-brand-green/40">
              <FileText size={16} /> Company profile
            </a>
          </div>
        </header>

        {/* PROGRESS */}
        <nav id="wizard-top" aria-label="Quote steps" className="scroll-mt-24 mb-6">
          <ol className="flex gap-1.5 sm:gap-2">
            {steps.map((s, i) => {
              const done = i < idx;
              const active = i === idx;
              const reachable = i <= furthest || i <= idx;
              return (
                <li key={s.id} className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => reachable && goTo(i)}
                    disabled={!reachable}
                    aria-current={active ? 'step' : undefined}
                    className="w-full text-left group disabled:cursor-not-allowed"
                  >
                    <span className={`block h-1.5 rounded-full transition-colors ${active ? 'bg-brand-gold' : done ? 'bg-brand-green' : 'bg-brand-green/10'}`} />
                    <span className={`hidden sm:flex items-center gap-1.5 mt-2.5 text-[13px] font-semibold truncate ${active ? 'text-brand-green' : done ? 'text-brand-green/70 group-hover:text-brand-green' : 'text-brand-green/35'}`}>
                      {done ? <CheckCircle2 size={14} className="text-brand-green shrink-0" /> : <span className="tabular-nums">{i + 1}.</span>}
                      {s.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="sm:hidden mt-2.5 text-[13px] font-semibold text-brand-green">Step {idx + 1} of {steps.length}: {current.title}</p>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT: CURRENT STEP */}
          <section key={current.id} className="lg:col-span-8 rounded-[28px] bg-white/70 ring-1 ring-brand-green/10 p-5 sm:p-8 md:p-10 animate-fade-in-up">

            {/* 1. SERVICE */}
            {current.id === 'service' && (
              <>
                <StepHeader n={idx + 1} total={steps.length} title="What do you need?" hint="Choose a type of service, then the option that fits." />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {CATEGORIES.map(cat => {
                    const on = activeCategory.id === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => selectCategory(cat)}
                        aria-pressed={on}
                        className={`text-left p-4 rounded-2xl transition-all ${on ? 'bg-brand-green text-white shadow-lift' : 'bg-white ring-1 ring-brand-green/10 hover:ring-brand-green/35 text-brand-green'}`}
                      >
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${on ? 'bg-white/10 text-brand-amber' : 'bg-brand-sand text-brand-green'}`}>{cat.icon}</span>
                        <span className="block font-semibold text-[15px] leading-snug mt-3">{cat.title}</span>
                        <span className={`hidden sm:block text-[13px] leading-snug mt-1 ${on ? 'text-white/65' : 'text-brand-green/50'}`}>{CATEGORY_BLURB[cat.id] || ''}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <FieldLabel>Options in {activeCategory.title.toLowerCase()}</FieldLabel>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeCategory.programs.map(prog => (
                      <Choice key={prog.id} selected={selectedProgram.id === prog.id} onClick={() => pickProgram(prog)} icon={prog.icon} title={prog.title} aside={`from ${formatKES(fromPrice(prog))}`} />
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-brand-sand/70 p-4 sm:p-5 flex gap-4 items-start">
                  {selectedProgram.image && <img src={selectedProgram.image} alt="" className="hidden sm:block w-28 h-28 rounded-xl object-cover shrink-0" loading="lazy" />}
                  <div className="min-w-0">
                    <p className="font-semibold text-brand-green">{selectedProgram.title}</p>
                    <p className="text-[15px] text-brand-green/70 leading-relaxed mt-1">{selectedProgram.description}</p>
                    {selectedProgram.inclusions?.length > 0 && (
                      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                        {selectedProgram.inclusions.slice(0, 6).map((inc, i) => (
                          <li key={i} className="flex gap-2 text-sm text-brand-green/70"><CheckCircle2 size={16} className="text-brand-green shrink-0 mt-0.5" />{inc}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* 2. DETAILS */}
            {current.id === 'details' && (
              <>
                <StepHeader n={idx + 1} total={steps.length} title="Tell us about your event" />
                <div className="flex items-center gap-3 p-3 pr-4 rounded-2xl bg-brand-sand/70 mb-7">
                  {selectedProgram.image && <img src={selectedProgram.image} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-brand-green/50">Your service</p>
                    <p className="font-semibold text-brand-green truncate">{selectedProgram.title}</p>
                  </div>
                  <button type="button" onClick={() => goTo(0)} className="text-sm font-semibold text-brand-gold hover:text-brand-green shrink-0">Change</button>
                </div>

                <div className="space-y-7">
                  {selectedProgram.durations && selectedProgram.durations.length > 1 && (
                    <div>
                      <FieldLabel htmlFor="option">{pt === 'mc_v6' ? 'Type of event' : pt === 'family' ? 'Package' : 'Option'}</FieldLabel>
                      {selectedProgram.durations.length <= 5 ? (
                        <div className="grid grid-cols-1 gap-2.5">
                          {selectedProgram.durations.map((d, i) => (
                            <Choice key={i} selected={durationIdx === i} onClick={() => setDurationIdx(i)} title={d.label.replace(/\s*\(KES[^)]*\)/, '')} sub={pt === 'family' ? 'Up to 6 people' : pt === 'mc_v6' ? `${d.includedHours} hours included` : pt === 'per_person' ? 'Per person' : undefined} aside={formatKES(d.price)} />
                          ))}
                        </div>
                      ) : (
                        <Select id="option" value={durationIdx} onChange={(e) => setDurationIdx(parseInt(e.target.value))}>
                          {selectedProgram.durations.map((d, i) => <option key={i} value={i}>{d.label}</option>)}
                        </Select>
                      )}
                    </div>
                  )}

                  {pt === 'team_building_v6' && selectedProgram.teamBuildingRates && (
                    <div>
                      <FieldLabel>Who is the group?</FieldLabel>
                      <div className="grid grid-cols-1 gap-2.5">
                        {(['corporate', 'community', 'youth'] as GroupType[]).map(gt => {
                          const r = selectedProgram.teamBuildingRates![gt];
                          return <Choice key={gt} selected={groupType === gt} onClick={() => setGroupType(gt)} title={r.label} sub={`Minimum ${formatKES(r.minFee)}`} aside={`${formatKES(r.perHead)} pp`} />;
                        })}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <FieldLabel htmlFor="pax">{pt === 'medic_v6' ? 'Expected crowd size' : pt === 'family' ? 'People in the household' : selectedProgram.category === 'school_clubs' ? 'Number of students' : 'Number of people'}</FieldLabel>
                      <Stepper id="pax" value={pax} onChange={setPax} max={pt === 'family' ? 20 : 5000} />
                      {pt === 'team_building_v6' && <p className="text-sm text-brand-green/55 mt-2.5">5% off from 30 people, 10% from 50, 15% from 100, 20% from 200.</p>}
                      {pt === 'family' && <p className="text-sm text-brand-green/55 mt-2.5">The price covers up to 6 people.</p>}
                      {(pt === 'flat_rate' && !selectedProgram.selfContained) && <p className="text-sm text-brand-green/55 mt-2.5">This is a flat fee. Group size helps us plan.</p>}
                    </div>
                    <div>
                      <FieldLabel>Preferred date</FieldLabel>
                      <CustomCalendar value={eventDate} onChange={setEventDate} className="[&>div:first-child]:h-[52px] [&>div:first-child]:px-4 [&>div:first-child]:rounded-2xl" />
                      <p className="text-sm text-brand-green/55 mt-2.5">Not sure yet? Leave it open.</p>
                    </div>
                  </div>

                  {pt === 'team_building_v6' && (
                    <Toggle
                      checked={includePaSystem}
                      onChange={setIncludePaSystem}
                      title={`Add a PA system with technician (${formatKES(getPaPrice(pax).price)})`}
                      sub={pax > 60 ? 'Groups over 60 need a PA so everyone hears. You can also bring your own at no charge.' : 'Needed for groups over 60. You can also bring your own.'}
                    />
                  )}

                  {pt === 'two_part' && selectedProgram.supportsFullChainBundle && (
                    <div>
                      <FieldLabel htmlFor="bundle">Add site assessments and save 10%</FieldLabel>
                      <Select id="bundle" value={assessmentSite} onChange={(e) => { const v = e.target.value as AssessmentSite; setAssessmentSite(v); if (v !== 'none') setIsYearlyRefresher(false); }}>
                        {Object.entries(ASSESSMENT_SITES).map(([k, s]) => <option key={k} value={k}>{s.label}{s.site ? ` (assessments ${formatKES(s.site + s.pre + s.post)})` : ''}</option>)}
                      </Select>
                      <p className="text-sm text-brand-green/55 mt-2.5">Site assessment, pre-training check, the training and the post-training test, booked together.</p>
                    </div>
                  )}

                  {selectedProgram.supportsRefresher && assessmentSite === 'none' && (
                    <Toggle checked={isYearlyRefresher} onChange={setIsYearlyRefresher} title="This is a yearly refresher (15% off)" sub="You did the same course with us in the last 12 months." />
                  )}

                  {pt === 'medic_v6' && (
                    <>
                      <div>
                        <FieldLabel>How risky is the event?</FieldLabel>
                        <div className="grid grid-cols-1 gap-2.5">
                          {(Object.keys(MEDIC_RISK_TIERS) as MedicRisk[]).map(k => {
                            const t = MEDIC_RISK_TIERS[k];
                            return <Choice key={k} selected={medicRisk === k} onClick={() => { setMedicRisk(k); setManualMedics(null); }} title={t.title} sub={`${t.examples}. 1 medic per ${t.paxPerMedic} people.`} />;
                          })}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                        <div>
                          <FieldLabel htmlFor="hours">Hours on standby</FieldLabel>
                          <Stepper id="hours" value={medicHours} onChange={setMedicHours} min={4} max={48} />
                          <p className="text-sm text-brand-green/55 mt-2.5">4 hour minimum.</p>
                        </div>
                        <div>
                          <FieldLabel htmlFor="medics">Number of medics</FieldLabel>
                          <Stepper id="medics" value={medicsCount} onChange={(v) => setManualMedics(v)} min={1} max={50} />
                          <p className="text-sm text-brand-green/55 mt-2.5">
                            We recommend {recommendedMedics}.{manualMedics !== null && manualMedics !== recommendedMedics && <button type="button" onClick={() => setManualMedics(null)} className="ml-1 text-brand-green font-semibold underline">Use {recommendedMedics}</button>}
                          </p>
                        </div>
                      </div>
                      <Toggle checked={includeAmbulance} onChange={setIncludeAmbulance} title="Add an ambulance with driver and EMT (KES 28,000)" sub={pax >= MEDIC_RISK_TIERS[medicRisk].ambulanceFrom ? `Advised for a ${MEDIC_RISK_TIERS[medicRisk].title.toLowerCase()} event of this size.` : 'Up to 8 hours, then KES 3,000 per extra hour.'} />
                      <Toggle checked={includeMedicalPlan} onChange={setIncludeMedicalPlan} title="Add an event medical plan and risk review (KES 5,000)" />
                    </>
                  )}

                  {pt === 'mc_v6' && (
                    <>
                      <div>
                        <FieldLabel htmlFor="mcx">Extra hours on stage</FieldLabel>
                        <Stepper id="mcx" value={mcExtraHours} onChange={setMcExtraHours} min={0} max={12} suffix={`× ${formatKES(variant?.extraHourRate || 3000)}`} />
                      </div>
                      <Toggle checked={includePaSystem} onChange={setIncludePaSystem} title={`Add a PA system with technician (${formatKES(getPaPrice(pax).price)})`} sub={`Sized for ${getPaPrice(pax).tier}.`} />
                    </>
                  )}
                </div>
              </>
            )}

            {/* 3. LOCATION */}
            {current.id === 'location' && (
              <>
                <StepHeader n={idx + 1} total={steps.length} title="Where is it?" hint="Within 50 km of Nairobi, travel is in our price. Further out, you pay only the fuel and, if we need to stay over, rooms for our crew." />
                <div className="space-y-7">
                  <div>
                    <FieldLabel>Town or area</FieldLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TOWNS.map(t => {
                        const on = town === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            disabled={clientCoversTravel}
                            onClick={() => setTown(t.id)}
                            aria-pressed={on}
                            className={`text-left px-4 py-3 rounded-2xl transition-all disabled:opacity-40 ${on ? 'bg-brand-green text-white' : 'bg-white ring-1 ring-brand-green/10 hover:ring-brand-green/35 text-brand-green'} ${t.id === 'nairobi' || t.id === 'other' ? 'col-span-2 sm:col-span-3' : ''}`}
                          >
                            <span className="block font-semibold text-[15px] leading-snug">{t.id === 'nairobi' ? 'Nairobi, or within 50 km' : t.id === 'other' ? 'Somewhere else' : t.label}</span>
                            <span className={`block text-[13px] mt-0.5 ${on ? 'text-white/65' : 'text-brand-green/50'}`}>
                              {t.id === 'nairobi' ? 'Travel included' : t.id === 'other' ? 'Enter the distance' : `About ${t.km} km`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {town === 'other' && !clientCoversTravel && (
                    <div>
                      <FieldLabel htmlFor="km">Distance from Nairobi, one way</FieldLabel>
                      <Stepper id="km" value={customKm} onChange={setCustomKm} min={1} max={1500} suffix="km" />
                    </div>
                  )}

                  {distanceKm > FREE_RADIUS_KM && !clientCoversTravel && (
                    <div>
                      <FieldLabel htmlFor="crew">Our crew travelling</FieldLabel>
                      <Stepper id="crew" value={crew} onChange={(v) => setCrewOverride(v)} min={1} max={40} suffix={`${Math.ceil(crew / CREW_PER_VEHICLE)} vehicle${Math.ceil(crew / CREW_PER_VEHICLE) > 1 ? 's' : ''}`} />
                      <p className="text-sm text-brand-green/55 mt-2.5">Estimated from your booking. One vehicle carries up to 4 of our crew. We confirm the number in your written quote.</p>
                    </div>
                  )}

                  <Toggle checked={clientCoversTravel} onChange={setClientCoversTravel} title="We will provide transport and rooms for your crew" sub="Then there is no travel charge." />

                  {distanceKm > OVERNIGHT_FROM_KM && !clientCoversTravel && (
                    <p className="flex gap-2 text-sm text-brand-green/70 bg-brand-sand/70 rounded-2xl p-4">
                      <Info size={16} className="text-brand-gold shrink-0 mt-0.5" />
                      Over 300 km, our crew stays overnight. At the coast, in game parks and in peak holiday weeks we quote the actual room price, agreed with you before booking.
                    </p>
                  )}
                </div>
              </>
            )}

            {/* 4. EXTRAS */}
            {current.id === 'extras' && (
              <>
                <StepHeader n={idx + 1} total={steps.length} title="Anything else?" hint="All optional. Skip this step if you don't need anything extra." />
                <div className="space-y-7">
                  {visibleAddons.length > 0 && (
                    <div className="grid grid-cols-1 gap-2.5">
                      {visibleAddons.map(a => (
                        <Choice key={a.id} selected={chosenAddons.includes(a.id)} onClick={() => toggleAddon(a.id)} title={a.label} aside={`${formatKES(a.price)}${a.type === 'pp' ? ' each' : ''}`} />
                      ))}
                    </div>
                  )}

                  {!isSelfContained && (
                    <div className="rounded-2xl bg-white ring-1 ring-brand-green/10">
                      <button type="button" onClick={() => setShowArranged(s => !s)} aria-expanded={showArranged} className="w-full flex items-center justify-between gap-3 p-4 text-left">
                        <span>
                          <span className="block text-[15px] font-semibold text-brand-green">Want us to arrange the venue, transport or food?</span>
                          <span className="block text-sm text-brand-green/55 mt-0.5">Passed on at cost. These are planning estimates.</span>
                        </span>
                        <ChevronDown size={20} className={`text-brand-green/40 shrink-0 transition-transform ${showArranged ? 'rotate-180' : ''}`} />
                      </button>
                      {showArranged && (
                        <div className="p-4 pt-0 space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <FieldLabel htmlFor="venue"><span className="inline-flex items-center gap-1.5"><MapIcon size={15} className="text-brand-gold" /> Venue</span></FieldLabel>
                              <Select id="venue" value={venueType} onChange={(e) => setVenueType(e.target.value as keyof typeof VENUE_TYPES)}>
                                {Object.entries(VENUE_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}{v.price ? ` (about ${formatKES(v.price)} a day)` : ''}</option>)}
                              </Select>
                            </div>
                            <div>
                              <FieldLabel htmlFor="fleet"><span className="inline-flex items-center gap-1.5"><Truck size={15} className="text-brand-gold" /> Transport for your group</span></FieldLabel>
                              <Select id="fleet" value={fleetType} onChange={(e) => setFleetType(e.target.value as keyof typeof FLEET)}>
                                {Object.entries(FLEET).map(([k, f]) => <option key={k} value={k}>{f.label}{f.price ? ` (about ${formatKES(f.price)} a day)` : ''}</option>)}
                              </Select>
                            </div>
                          </div>
                          <div>
                            <FieldLabel><span className="inline-flex items-center gap-1.5"><Utensils size={15} className="text-brand-gold" /> Meals, per person</span></FieldLabel>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {MEALS.map(m => {
                                const on = selectedMeals.includes(m.id);
                                return (
                                  <button key={m.id} type="button" aria-pressed={on} onClick={() => setSelectedMeals(p => on ? p.filter(x => x !== m.id) : [...p, m.id])}
                                    className={`p-3 rounded-2xl text-left transition-all ${on ? 'bg-brand-green text-white' : 'bg-white ring-1 ring-brand-green/10 hover:ring-brand-green/35 text-brand-green'}`}>
                                    <span className="block text-sm font-semibold">{m.label}</span>
                                    <span className={`block text-sm ${on ? 'text-white/65' : 'text-brand-green/50'}`}>about {formatKES(m.price)}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* 5. CONTACT */}
            {current.id === 'contact' && (
              <>
                <StepHeader n={idx + 1} total={steps.length} title="Where should we send it?" hint="We use these only to reply with your written quote." />
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <FieldLabel htmlFor="c-name"><span className="inline-flex items-center gap-1.5"><User size={15} className="text-brand-gold" /> Your name</span></FieldLabel>
                      <input id="c-name" type="text" autoComplete="name" value={clientInfo.leadContact} onChange={(e) => setClientInfo(p => ({ ...p, leadContact: e.target.value }))} className={`${inputClass} ${showErrors && !clientInfo.leadContact.trim() ? 'ring-2 ring-red-400' : ''}`} placeholder="Full name" aria-invalid={showErrors && !clientInfo.leadContact.trim()} />
                      {showErrors && !clientInfo.leadContact.trim() && <p className="text-sm text-red-600 mt-1.5">Please add your name.</p>}
                    </div>
                    <div>
                      <FieldLabel htmlFor="c-phone"><span className="inline-flex items-center gap-1.5"><Phone size={15} className="text-brand-gold" /> Phone or WhatsApp</span></FieldLabel>
                      <input id="c-phone" type="tel" autoComplete="tel" value={clientInfo.leadPhone} onChange={(e) => setClientInfo(p => ({ ...p, leadPhone: e.target.value }))} className={`${inputClass} ${showErrors && clientInfo.leadPhone.replace(/\D/g, '').length < 9 ? 'ring-2 ring-red-400' : ''}`} placeholder="07XX XXX XXX" aria-invalid={showErrors && clientInfo.leadPhone.replace(/\D/g, '').length < 9} />
                      {showErrors && clientInfo.leadPhone.replace(/\D/g, '').length < 9 && <p className="text-sm text-red-600 mt-1.5">Please add a phone number we can reach.</p>}
                    </div>
                    <div>
                      <FieldLabel htmlFor="c-org"><span className="inline-flex items-center gap-1.5"><Building2 size={15} className="text-brand-gold" /> Organisation <span className="font-normal text-brand-green/45">(optional)</span></span></FieldLabel>
                      <input id="c-org" type="text" autoComplete="organization" value={clientInfo.organization} onChange={(e) => setClientInfo(p => ({ ...p, organization: e.target.value }))} className={inputClass} placeholder="Company, church, school or group" />
                    </div>
                    <div>
                      <FieldLabel htmlFor="c-email"><span className="inline-flex items-center gap-1.5"><Mail size={15} className="text-brand-gold" /> Email <span className="font-normal text-brand-green/45">(optional)</span></span></FieldLabel>
                      <input id="c-email" type="email" autoComplete="email" value={clientInfo.leadEmail} onChange={(e) => setClientInfo(p => ({ ...p, leadEmail: e.target.value }))} className={inputClass} placeholder="name@example.com" />
                    </div>
                  </div>
                  <Toggle checked={clientInfo.needEtims} onChange={(v) => setClientInfo(p => ({ ...p, needEtims: v }))} title="We need an eTIMS tax invoice" sub="Add your registered company name and KRA PIN." />
                  {clientInfo.needEtims && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" value={clientInfo.companyName} onChange={(e) => setClientInfo(p => ({ ...p, companyName: e.target.value }))} className={inputClass} placeholder="Registered company name" aria-label="Registered company name" />
                      <input type="text" value={clientInfo.kraPin} onChange={(e) => setClientInfo(p => ({ ...p, kraPin: e.target.value.toUpperCase() }))} className={`${inputClass} font-mono`} placeholder="KRA PIN, e.g. P051XXXXXXZ" aria-label="Company KRA PIN" />
                    </div>
                  )}
                </div>
              </>
            )}

            {/* 6. REVIEW AND SEND */}
            {current.id === 'review' && (
              <>
                <StepHeader n={idx + 1} total={steps.length} title="Your quote is ready" hint="Check it over, then send it to us on WhatsApp. We confirm it in writing, usually the same day." />
                <div className="rounded-[24px] bg-brand-ink text-white p-6 sm:p-7">
                  <p className="text-sm text-white/60">{selectedProgram.title}</p>
                  <p className="font-display font-bold text-brand-amber text-5xl sm:text-6xl tabular-nums mt-2 tracking-tight">{formatKES(quote.total)}</p>
                  <p className="text-sm text-white/60 mt-2">{formatKES(quote.deposit)} deposit confirms your date{usesHeadcount && pax > 1 && <> · about {formatKES(quote.perHead)} per person</>}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-5 text-sm text-white/75">{metaChips}</div>
                </div>

                <div className="mt-6">
                  <LineList />
                  <div className="mt-3"><Notes /></div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-brand-sand/70 p-4">
                    <p className="text-xs font-semibold text-brand-green/50 uppercase tracking-wider">Prepared for</p>
                    <p className="font-semibold text-brand-green mt-1">{clientName || clientInfo.leadContact || 'Not given'}</p>
                    <p className="text-brand-green/65">{[clientInfo.leadContact, clientInfo.leadPhone, clientInfo.leadEmail].filter(Boolean).join(' · ')}</p>
                  </div>
                  <div className="rounded-2xl bg-brand-sand/70 p-4 flex flex-col justify-between gap-2">
                    <p className="text-brand-green/65">Something to change?</p>
                    <div className="flex flex-wrap gap-1.5">
                      {steps.slice(0, -1).map((s, i) => (
                        <button key={s.id} type="button" onClick={() => goTo(i)} className="px-3 py-1.5 rounded-full bg-white ring-1 ring-brand-green/10 text-brand-green font-semibold text-[13px] hover:ring-brand-green/35">{s.title}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7"><SendActions /></div>
                <div className="text-xs text-brand-green/50 leading-relaxed mt-5 space-y-1">
                  <p className="flex gap-1.5"><ShieldCheck size={14} className="text-brand-green shrink-0" /> A 50% deposit confirms your date. The balance is due on completion.</p>
                  <p>Prices in Kenya shillings, excluding any taxes that apply. Quotes are valid for 30 days. Venue, food and outside services are billed at cost.</p>
                </div>
              </>
            )}

            {/* STEP NAVIGATION (desktop and tablet) */}
            {current.id !== 'review' && (
              <div className="hidden sm:flex items-center justify-between gap-3 mt-10 pt-6 border-t border-brand-green/10">
                {idx > 0 ? (
                  <button type="button" onClick={goBack} className="inline-flex items-center gap-2 h-12 px-5 rounded-full text-brand-green font-semibold hover:bg-brand-sand">
                    <ArrowLeft size={18} /> Back
                  </button>
                ) : <span />}
                <button type="button" onClick={goNext} className="group inline-flex items-center gap-3 h-14 pl-7 pr-2 rounded-full bg-brand-green text-white font-semibold hover:bg-brand-ink transition-colors">
                  {nextLabel}
                  <span className="w-10 h-10 rounded-full bg-brand-amber text-brand-ink flex items-center justify-center transition-transform group-hover:translate-x-0.5"><ArrowRight size={18} /></span>
                </button>
              </div>
            )}
            {current.id === 'review' && (
              <div className="hidden sm:flex mt-8 pt-6 border-t border-brand-green/10">
                <button type="button" onClick={goBack} className="inline-flex items-center gap-2 h-12 px-5 rounded-full text-brand-green font-semibold hover:bg-brand-sand">
                  <ArrowLeft size={18} /> Back
                </button>
              </div>
            )}
          </section>

          {/* RIGHT: LIVE SUMMARY (desktop) */}
          <aside id="quote-summary" className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24">
            {current.id === 'review' ? (
              <div className="rounded-[28px] bg-brand-ink text-white p-7 shadow-lift">
                <p className="eyebrow text-brand-amber">What happens next</p>
                <ol className="mt-6 space-y-6">
                  {[
                    ['Send it to us', 'Tap Send on WhatsApp. Your quote arrives as a ready-made message.'],
                    ['We confirm in writing', 'We check the details and reply with your written quote, usually the same day.'],
                    ['Secure your date', 'A 50% deposit books the date. The balance is due on completion.']
                  ].map(([t, d], i) => (
                    <li key={t} className="flex gap-4">
                      <span className="w-9 h-9 shrink-0 rounded-full bg-brand-amber text-brand-ink font-display font-bold flex items-center justify-center">{i + 1}</span>
                      <span>
                        <span className="block font-semibold">{t}</span>
                        <span className="block text-sm text-white/60 mt-1 leading-relaxed">{d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <a href="tel:+254710974670" className="mt-8 flex items-center justify-center gap-2 h-12 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold">
                  <Phone size={16} /> Prefer to talk? 0710 974 670
                </a>
              </div>
            ) : (
            <div className="rounded-[28px] bg-brand-ink text-white overflow-hidden shadow-lift">
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-white/55">Your price so far</p>
                  <Logo light className="w-8 h-8 shrink-0 opacity-80" />
                </div>
                <p className="font-display font-bold text-brand-amber text-[2.6rem] leading-none tabular-nums mt-3 tracking-tight">{formatKES(quote.total)}</p>
                <p className="text-sm text-white/55 mt-2">{formatKES(quote.deposit)} deposit{usesHeadcount && pax > 1 && <> · ~{formatKES(quote.perHead)} pp</>}</p>
                <p className="font-semibold mt-5 leading-snug">{selectedProgram.title}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[13px] text-white/60">{metaChips}</div>
              </div>
              <div className="bg-white text-brand-green rounded-t-[24px] p-6 max-h-[46vh] overflow-y-auto">
                <LineList />
                <div className="mt-3"><Notes /></div>
              </div>
            </div>
            )}
            {current.id !== 'review' && (
              <button type="button" onClick={() => contactMissing ? goTo(steps.findIndex(s => s.id === 'contact')) : goTo(steps.length - 1)} className="w-full mt-3 h-12 rounded-full ring-1 ring-brand-green/15 bg-white text-brand-green text-sm font-semibold hover:ring-brand-green/40 flex items-center justify-center gap-2">
                <MessageCircle size={16} className="text-[#1fb857]" /> {contactMissing ? 'Done? Add your details and send' : 'Done? Review and send'}
              </button>
            )}
          </aside>
        </div>
      </div>

      {/* MOBILE BOTTOM BAR: total + next */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-2 print:hidden" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        <div className="rounded-[24px] bg-brand-ink text-white shadow-lift ring-1 ring-white/10 p-2 pl-4 flex items-center gap-3">
          <button type="button" onClick={() => setShowSheet(true)} className="min-w-0 flex-1 text-left" aria-label="See the price breakdown">
            <span className="flex items-center gap-1 text-xs text-white/55">Your price <ChevronUp size={14} /></span>
            <span className="block font-display font-bold text-xl text-brand-amber tabular-nums leading-tight truncate">{formatKES(quote.total)}</span>
          </button>
          {idx > 0 && (
            <button type="button" onClick={goBack} aria-label="Back" className="w-12 h-12 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowLeft size={18} />
            </button>
          )}
          {current.id !== 'review' ? (
            <button type="button" onClick={goNext} className="shrink-0 h-12 pl-5 pr-4 rounded-full bg-brand-amber text-brand-ink font-semibold flex items-center gap-1.5">
              {next?.id === 'review' ? 'Review' : 'Next'} <ArrowRight size={17} />
            </button>
          ) : (
            <button type="button" onClick={handleWhatsApp} className="shrink-0 h-12 px-5 rounded-full bg-[#25D366] text-white font-semibold flex items-center gap-1.5">
              <MessageCircle size={17} /> Send
            </button>
          )}
        </div>
      </div>

      {/* MOBILE BREAKDOWN SHEET */}
      {showSheet && (
        <div className="lg:hidden fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm flex items-end print:hidden" onClick={() => setShowSheet(false)} role="dialog" aria-modal="true" aria-label="Price breakdown">
          <div onClick={e => e.stopPropagation()} className="w-full max-h-[85vh] overflow-y-auto rounded-t-[28px] bg-white p-5 pb-8 animate-fade-in-up">
            <div className="w-10 h-1.5 rounded-full bg-brand-green/15 mx-auto mb-4" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-brand-green/55">{selectedProgram.title}</p>
                <p className="font-display font-bold text-brand-green text-3xl tabular-nums mt-1">{formatKES(quote.total)}</p>
                <p className="text-sm text-brand-green/55 mt-1">{formatKES(quote.deposit)} deposit confirms your date</p>
              </div>
              <button onClick={() => setShowSheet(false)} aria-label="Close" className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-green"><X size={18} /></button>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[13px] text-brand-green/60">{metaChips}</div>
            <div className="mt-4"><LineList /></div>
            <div className="mt-3"><Notes /></div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {showInvoiceModal && (
        <div role="dialog" aria-modal="true" aria-label="Quote preview" className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 print:hidden" onClick={() => setShowInvoiceModal(false)}>
          <div onClick={e => e.stopPropagation()} className="bg-white max-w-3xl w-full rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100">
              <p className="font-display font-bold text-brand-green">Quote preview</p>
              <div className="flex items-center gap-2">
                <button onClick={() => window.print()} className="h-10 px-4 rounded-full bg-brand-green text-white text-sm font-semibold flex items-center gap-1.5"><Printer size={15} /> Print or PDF</button>
                <button onClick={() => setShowInvoiceModal(false)} aria-label="Close" className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600"><X size={20} /></button>
              </div>
            </div>
            <div className="p-5 md:p-8 overflow-y-auto"><ProformaBody /></div>
          </div>
        </div>
      )}

      {/* RATE CARD VIEWER */}
      {showPdfModal && (
        <div role="dialog" aria-modal="true" aria-label="Rate card" className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 print:hidden" onClick={() => setShowPdfModal(null)}>
          <div onClick={e => e.stopPropagation()} className="bg-white w-full max-w-5xl h-[88vh] rounded-[28px] overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100">
              <p className="font-display font-bold text-brand-green">Rate card 2026</p>
              <div className="flex items-center gap-2">
                <a href={showPdfModal} download className="h-10 px-4 rounded-full bg-brand-green text-white text-sm font-semibold flex items-center gap-1.5"><Download size={15} /> Download</a>
                <button onClick={() => setShowPdfModal(null)} aria-label="Close" className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600"><X size={20} /></button>
              </div>
            </div>
            <iframe src={showPdfModal} title="Cross Connect Africa rate card 2026" className="flex-1 w-full border-none bg-gray-100" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;