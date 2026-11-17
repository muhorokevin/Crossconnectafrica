import React, { useState, useEffect, useMemo } from 'react';
import { 
  MessageCircle, User, Mail, Building2, Map, Truck, 
  AlertTriangle, Utensils, FileText, 
  Heart, ShieldCheck, CheckCircle2, Printer,
  Download, FileDown, Check, Copy, Phone, Eye, X, Sparkles, Globe, Users, Clock, Volume2
} from 'lucide-react';
import { CATEGORIES, Program, Category, GroupType } from '../data/programs';
import { BookingContextData } from '../App';
import Logo from '../components/Logo';
import CustomCalendar from '../components/CustomCalendar';

export const RATE_CARD_PDF_URL = '/assets/aistudio/Cross_Connect_Africa_Rate_Card_2026_v6_c1ebbe23.pdf';
export const COMPANY_PROFILE_PDF_URL = '/assets/aistudio/Cross_Connect_Africa_Company_Profile_2026__2__0bc0b926.pdf';
export const PRICING_MODEL_PDF_URL = '/assets/aistudio/CCA_Pricing_Model_2026_15ddde78.pdf';

const VENUE_TYPES = {
  none: { id: 'none', label: 'Venue Provided by Client / Not Required', price: 0 },
  public: { id: 'public', label: 'Public Grounds / Scenic Parks', price: 5000 },
  private: { id: 'private', label: 'Private Training Grounds / Campsite', price: 15000 },
  school: { id: 'school', label: 'School Grounds (Weekend Access)', price: 10000 },
  resort: { id: 'resort', label: 'Resorts / Hotels (Day Facilitation Grounds)', price: 35000 }
};

const FLEET_SOLUTIONS = {
  none: { id: 'none', label: 'Client / Self Organized Transport', price: 0, capacity: 0 },
  prado: { id: 'prado', label: 'Land Rover / Prado 4x4 (6 pax)', price: 10000, capacity: 6 },
  van: { id: 'van', label: 'Safari Tour Van (14 pax)', price: 12000, capacity: 14 },
  minibus: { id: 'minibus', label: 'Mini Bus (18-25 pax)', price: 18000, capacity: 25 },
  coaster: { id: 'coaster', label: 'Coaster (28-33 pax)', price: 25000, capacity: 33 },
  bus45: { id: 'bus45', label: 'Standard Bus (37-45 pax)', price: 35000, capacity: 45 },
  bus55: { id: 'bus55', label: 'Executive Coach (50-55 pax)', price: 45000, capacity: 55 }
};

// Rate Card 2026 v6: Travel outside Nairobi ~KES 132/km from Nairobi (return trip included)
export const TRAVEL_ZONES = {
  nairobi: { 
    id: 'nairobi', 
    label: 'Within Nairobi Metro (Included)', 
    surcharge: 0, 
    examples: 'Nairobi, Westlands, Karen, Industrial Area', 
    note: 'Included in base programme fee'
  },
  near: { 
    id: 'near', 
    label: 'Approx. 50 km from Nairobi (~KES 6,600 @ KES 132/km)', 
    surcharge: 6600, 
    examples: 'Limuru, Ngong, Thika, Kitengela, Tigoni', 
    note: 'Estimated at KES 132/km (return trip included)'
  },
  mid: { 
    id: 'mid', 
    label: 'Approx. 90–110 km from Nairobi (~KES 13,200 @ KES 132/km)', 
    surcharge: 13200, 
    examples: 'Naivasha, Sagana, Machakos', 
    note: 'Estimated at KES 132/km (return trip included)'
  },
  far: { 
    id: 'far', 
    label: 'Approx. 160–180 km from Nairobi (~KES 22,500 @ KES 132/km)', 
    surcharge: 22500, 
    examples: 'Nakuru, Nyeri, Embu, Nanyuki', 
    note: 'Estimated at KES 132/km (return trip included)'
  },
  custom: {
    id: 'custom',
    label: 'Custom Distance Outside Nairobi (KES 132 / km)',
    surcharge: 0,
    examples: 'Anywhere in Kenya',
    note: 'Exact distance × KES 132/km (return trip included)'
  }
};

// Event Medics & Ambulance Risk Tiers (Rate Card 2026 v6 Page 15)
const MEDIC_RISK_TIERS = {
  low: {
    id: 'low',
    label: 'Low Risk — Meetings, conferences, church services, weddings (Rate × 1.00)',
    multiplier: 1.0,
    paxPerMedic: 150,
    ambulanceAdvisedFrom: 300
  },
  medium: {
    id: 'medium',
    label: 'Medium Risk — School sports, concerts, festivals, team building (Rate × 1.15)',
    multiplier: 1.15,
    paxPerMedic: 100,
    ambulanceAdvisedFrom: 200
  },
  high: {
    id: 'high',
    label: 'High Risk — Marathons, hikes, motorsport, large crowds, rough terrain (Rate × 1.35)',
    multiplier: 1.35,
    paxPerMedic: 60,
    ambulanceAdvisedFrom: 100
  }
};

// Full-Chain Assessment Sizes for 10% Bundle (Rate Card 2026 v6 Pages 6-7)
const ASSESSMENT_SITES = {
  none: { id: 'none', label: 'Training Only (No Site Assessments Bundled)', site: 0, pre: 0, post: 0 },
  small: { id: 'small', label: 'Small Site (≤500 m²) — Site KES 23k + Pre KES 8.5k + Post KES 15.5k (-10% Bundle)', site: 23000, pre: 8500, post: 15500 },
  medium: { id: 'medium', label: 'Medium Site (≤2,000 m²) — Site KES 34k + Pre KES 13k + Post KES 22k (-10% Bundle)', site: 34000, pre: 13000, post: 22000 },
  large: { id: 'large', label: 'Large Site (≤5,000 m²) — Site KES 50k + Pre KES 16.5k + Post KES 29.5k (-10% Bundle)', site: 50000, pre: 16500, post: 29500 },
  multi: { id: 'multi', label: 'Multi-Site (>5,000 m²) — Site KES 75k + Pre KES 24.5k + Post KES 44.5k (-10% Bundle)', site: 75000, pre: 24500, post: 44500 }
};

// Optional Add-ons (Exact Rate Card 2026 v6 Figures)
const STRATEGIC_ADDONS = [
  // Team Building Optional Extras (Page 5)
  { id: 'tb_extra_fac', label: 'Extra Professional Facilitator', price: 12000, type: 'flat', category: 'team_building' },
  { id: 'tb_photo_video', label: 'Photography & Video Coverage', price: 18000, type: 'flat', category: 'team_building' },
  { id: 'tb_mc_host', label: 'MC and Energizer Host', price: 15000, type: 'flat', category: 'team_building' },
  { id: 'tb_tshirts', label: 'Branded T-Shirts', price: 2000, type: 'pp', category: 'team_building' },

  // Emergency Services for Drills (Page 9: Billed at cost + 10% handling)
  { id: 'drill_amb', label: 'Ambulance on Standby (up to 8 hrs, est.)', price: 22000, type: 'flat', category: 'fire_drill_only' },
  { id: 'drill_fire_eng', label: 'Fire Engine on Standby (est.)', price: 38500, type: 'flat', category: 'fire_drill_only' },
  { id: 'drill_police', label: 'Police Liaison & Traffic Marshals (est.)', price: 5500, type: 'flat', category: 'fire_drill_only' },

  // Safety & Medics Extras
  { id: 'fa_manuals', label: 'Extra Printed Safety Handbooks', price: 400, type: 'pp', category: 'safety_training' },
  { id: 'hi_hydration_pack', label: 'Trail Snacks & Electrolyte Pack', price: 500, type: 'pp', category: 'expeditions' },
  { id: 'hi_photographer', label: 'Expedition Trail Photographer', price: 10000, type: 'flat', category: 'expeditions' },
  { id: 'ac_badges', label: 'Adventure Club Badges & Awards', price: 250, type: 'pp', category: 'school_clubs' }
];

// PA System pricing by group size (Page 4)
const getPaPriceForPax = (paxCount: number): { price: number; tierLabel: string } => {
  if (paxCount <= 100) return { price: 10000, tierLabel: '61 to 100 people (KES 10,000)' };
  if (paxCount <= 200) return { price: 15000, tierLabel: '101 to 200 people (KES 15,000)' };
  if (paxCount <= 300) return { price: 20000, tierLabel: '201 to 300 people (KES 20,000)' };
  return { price: 30000, tierLabel: '301 to 500 people (KES 30,000)' };
};

// Official Statutory & Remittance Credentials for Proforma Invoices
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

const Calculator: React.FC<{ initialData?: BookingContextData | null }> = ({ initialData }) => {
  const [clientInfo, setClientInfo] = useState({
    leadContact: initialData?.clientInfo?.contact || '',
    leadEmail: initialData?.clientInfo?.email || '',
    leadPhone: initialData?.clientInfo?.phone || '',
    organization: initialData?.clientInfo?.company || '',
    needEtims: initialData?.clientInfo?.needEtims || false,
    companyName: initialData?.clientInfo?.companyName || initialData?.clientInfo?.company || '',
    kraPin: initialData?.clientInfo?.kraPin || '',
    etimsEmail: initialData?.clientInfo?.etimsEmail || initialData?.clientInfo?.email || '',
    etimsPhone: initialData?.clientInfo?.etimsPhone || initialData?.clientInfo?.phone || ''
  });
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<Category>(() => {
    if (initialData?.program) {
      const foundCat = CATEGORIES.find(c => c.programs.some(p => p.id === initialData.program?.id));
      if (foundCat) return foundCat;
    }
    return CATEGORIES[0];
  });

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(
    initialData?.program || CATEGORIES[0].programs[0]
  ); 
  const [durationIdx, setDurationIdx] = useState(initialData?.durationIndex || 0);
  const [pax, setPax] = useState(initialData?.pax || 30);
  const [missionDate, setMissionDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Team Building v6 Controls (Group Type + PA System)
  const [groupType, setGroupType] = useState<GroupType>('corporate');
  const [includePaSystem, setIncludePaSystem] = useState(false);

  // Safety Training v6 Controls (Full Chain 10% Bundle & Yearly Refresher 15%)
  const [assessmentBundleSite, setAssessmentBundleSite] = useState<keyof typeof ASSESSMENT_SITES>('none');
  const [isYearlyRefresher, setIsYearlyRefresher] = useState(false);

  // Event Medics & Ambulance v6 Controls (Page 15)
  const [medicRisk, setMedicRisk] = useState<keyof typeof MEDIC_RISK_TIERS>('low');
  const [medicHours, setMedicHours] = useState(4);
  const [useAutoMedics, setUseAutoMedics] = useState(true);
  const [manualMedics, setManualMedics] = useState(1);
  const [includeAmbulance, setIncludeAmbulance] = useState(false);
  const [includeMedicalPlan, setIncludeMedicalPlan] = useState(false);

  // MC Services v6 Controls (Page 14)
  const [mcExtraHours, setMcExtraHours] = useState(0);

  // Travel outside Nairobi
  const [travelZone, setTravelZone] = useState<keyof typeof TRAVEL_ZONES>('nairobi');
  const [customKm, setCustomKm] = useState(60);
  const [clientCoversTravel, setClientCoversTravel] = useState(false);

  // Field Logistics
  const [venueType, setVenueType] = useState<keyof typeof VENUE_TYPES>('none');
  const [fleetType, setFleetType] = useState<keyof typeof FLEET_SOLUTIONS>('none');
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [chosenAddons, setChosenAddons] = useState<string[]>(initialData?.addons || []);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const [quoteId] = useState(`CCA-Q-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`);

  const formatKES = (n: number) => `KES ${Math.round(n).toLocaleString()}`;

  // Recommended medics count for current pax and risk tier
  const recommendedMedics = useMemo(() => {
    const tier = MEDIC_RISK_TIERS[medicRisk];
    return Math.max(1, Math.ceil((pax > 0 ? pax : 1) / tier.paxPerMedic));
  }, [pax, medicRisk]);

  const effectiveMedicsCount = useAutoMedics ? recommendedMedics : Math.max(1, manualMedics);

  // Keep MC duration extra hours reset if switching variants
  useEffect(() => {
    setMcExtraHours(0);
    setAssessmentBundleSite('none');
    setIsYearlyRefresher(false);
  }, [selectedProgram?.id, durationIdx]);

  // ========================================================
  // RATE CARD 2026 (v6) EXACT PRICING ENGINE
  // ========================================================
  const results = useMemo(() => {
    const isHosting = selectedProgram?.priceType === 'mc_v6';
    const isMedic = selectedProgram?.priceType === 'medic_v6';
    const isFlat = selectedProgram?.priceType === 'flat_rate';

    if (!selectedProgram || (pax <= 0 && !isHosting && !isMedic && !isFlat)) {
      return { 
        subtotal: 0, deposit: 0, missionBase: 0, undiscountedMissionBase: 0, 
        paPrice: 0, bundleAssessmentsPrice: 0, ambulancePrice: 0, medicalPlanPrice: 0,
        medicKitsPrice: 0, logisticsBase: 0, addonsBase: 0, travelSurcharge: 0, days: 0, 
        venuePrice: 0, transportPrice: 0, mealsPrice: 0, discountPercent: 0, 
        discountLabel: '', totalSavings: 0, effectivePerHead: 0, minFeeApplied: false
      };
    }

    const variant = selectedProgram.durations ? selectedProgram.durations[durationIdx] : undefined;
    const days = Math.ceil(variant?.days || 1);
    
    let undiscountedMissionBase = 0;
    let missionBase = 0;
    let discountPercent = 0;
    let discountLabel = '';
    let minFeeApplied = false;
    let paPrice = 0;
    let bundleAssessmentsPrice = 0;
    let ambulancePrice = 0;
    let medicalPlanPrice = 0;
    let medicKitsPrice = 0;

    // 1. SERVICE FEE BY RATE CARD v6 STRUCTURE
    if (selectedProgram.priceType === 'team_building_v6' && selectedProgram.teamBuildingRates) {
      // Rate Card 2026 v6 (Pages 3-5): Per-head rate × pax, less volume discount (5%/10%/15%/20%), floored at group minimum session fee
      const groupConfig = selectedProgram.teamBuildingRates[groupType];
      const safePax = Math.max(1, pax);
      const rawPerHeadTotal = safePax * groupConfig.perHead;

      if (safePax >= 200) discountPercent = 20;
      else if (safePax >= 100) discountPercent = 15;
      else if (safePax >= 50) discountPercent = 10;
      else if (safePax >= 30) discountPercent = 5;
      else discountPercent = 0;

      const discountedTotal = rawPerHeadTotal * (1 - discountPercent / 100);

      if (discountedTotal < groupConfig.minFee) {
        missionBase = groupConfig.minFee;
        undiscountedMissionBase = groupConfig.minFee;
        minFeeApplied = true;
        discountPercent = 0;
        discountLabel = `Minimum Session Fee Applied (${groupConfig.label})`;
      } else {
        undiscountedMissionBase = rawPerHeadTotal;
        missionBase = discountedTotal;
        if (discountPercent > 0) {
          discountLabel = `Volume Rate (${discountPercent}% Off for ${safePax} Pax)`;
        }
      }

      // PA System (Groups over 60 or selected)
      if (includePaSystem) {
        paPrice = getPaPriceForPax(safePax).price;
      }

    } else if (selectedProgram.priceType === 'two_part') {
      // Fire & First Aid Training + Schools Safety (Pages 6-8): Programme Fee + (Per Person × Pax)
      const progFee = variant?.programFee ?? selectedProgram.programFee ?? 18000;
      const perPaxFee = variant?.perPersonFee ?? selectedProgram.perPersonFee ?? 640;
      const rawCourseTotal = progFee + (perPaxFee * (pax > 0 ? pax : 0));
      const minFee = selectedProgram.minSessionFee || 0;
      const baseCourse = Math.max(minFee, rawCourseTotal);

      // Full Chain 10% Bundle or 15% Yearly Refresher
      if (selectedProgram.supportsFullChainBundle && assessmentBundleSite !== 'none') {
        const siteObj = ASSESSMENT_SITES[assessmentBundleSite];
        bundleAssessmentsPrice = siteObj.site + siteObj.pre + siteObj.post;
        const fourItemTotal = baseCourse + bundleAssessmentsPrice;
        undiscountedMissionBase = fourItemTotal;
        missionBase = fourItemTotal * 0.9; // 10% bundle saving on the four
        discountPercent = 10;
        discountLabel = `Full Chain Bundle Saving (10% Off Site, Pre, Training & Post Assessments)`;
      } else if (selectedProgram.supportsRefresher && isYearlyRefresher) {
        undiscountedMissionBase = baseCourse;
        missionBase = baseCourse * 0.85; // 15% off course fee
        discountPercent = 15;
        discountLabel = `Yearly Refresher Concession (15% Off Course Fee within 12 months)`;
      } else {
        undiscountedMissionBase = baseCourse;
        missionBase = baseCourse;
      }

    } else if (selectedProgram.priceType === 'medic_v6') {
      // Event Medics & Ambulance (Page 15):
      // KES 2,400 × medicCount × hours (min 4) × riskMultiplier + KES 3,500 per 2 medics (kit) + optional Ambulance + optional Medical Plan
      const hours = Math.max(4, medicHours);
      const tier = MEDIC_RISK_TIERS[medicRisk];
      const hourlyMedicFee = Math.round(2400 * tier.multiplier);
      const medicsLabor = effectiveMedicsCount * hours * hourlyMedicFee;
      medicKitsPrice = Math.ceil(effectiveMedicsCount / 2) * 3500;

      if (includeAmbulance) {
        const extraAmbHours = Math.max(0, hours - 8);
        ambulancePrice = 28000 + (extraAmbHours * 3000);
      }
      if (includeMedicalPlan) {
        medicalPlanPrice = 5000;
      }

      undiscountedMissionBase = medicsLabor + medicKitsPrice + ambulancePrice + medicalPlanPrice;
      missionBase = undiscountedMissionBase;

    } else if (selectedProgram.priceType === 'mc_v6') {
      // MC Services (Page 14): Base Occasion Fee + (Extra Hours × Extra Hour Rate) + optional PA
      const baseFee = variant?.price ?? selectedProgram.basePrice;
      const extraRate = variant?.extraHourRate ?? 3000;
      const extraTotal = Math.max(0, mcExtraHours) * extraRate;
      undiscountedMissionBase = baseFee + extraTotal;
      missionBase = undiscountedMissionBase;

      if (includePaSystem) {
        paPrice = getPaPriceForPax(pax).price;
      }

    } else if (variant?.isGroup || selectedProgram.priceType === 'flat_rate') {
      // Occupational courses, Assessments, Fire & Emergency Drills, Annual Adventure Clubs
      const flatBase = variant?.price || selectedProgram.basePrice;
      if (selectedProgram.supportsRefresher && isYearlyRefresher) {
        undiscountedMissionBase = flatBase;
        missionBase = flatBase * 0.85;
        discountPercent = 15;
        discountLabel = 'Yearly Refresher Concession (15% Off within 12 months)';
      } else {
        undiscountedMissionBase = flatBase;
        missionBase = flatBase;
      }

    } else {
      // Per person services (Guided Hikes & Expeditions)
      undiscountedMissionBase = (variant?.price || selectedProgram.basePrice) * (pax > 0 ? pax : 1);
      missionBase = undiscountedMissionBase;
    }

    // 2. TRAVEL OUTSIDE NAIROBI (~KES 132/km from Nairobi, return trip included)
    let travelSurcharge = 0;
    if (!clientCoversTravel) {
      if (travelZone === 'custom') {
        travelSurcharge = Math.max(0, customKm) * 132;
      } else {
        travelSurcharge = TRAVEL_ZONES[travelZone]?.surcharge || 0;
      }
      // Ambulance outside Nairobi add-on: KES 100/km one-way estimate if ambulance active & outside Nairobi
      if (isMedic && includeAmbulance && travelZone !== 'nairobi') {
        const approxKm = travelZone === 'custom' ? customKm : (travelZone === 'near' ? 50 : travelZone === 'mid' ? 100 : 170);
        travelSurcharge += approxKm * 100;
      }
    }

    // 3. FIELD LOGISTICS (Venue, Fleet, Meals)
    const venuePrice = (VENUE_TYPES[venueType]?.price || 0) * days;
    const fleet = FLEET_SOLUTIONS[fleetType];
    let transportPrice = 0;
    if (fleet && fleet.capacity > 0) {
      const vehicles = Math.ceil((pax > 0 ? pax : 1) / fleet.capacity);
      transportPrice = vehicles * fleet.price * days;
    }
    const mealsPrice = selectedMeals.reduce((sum, id) => {
      const m = [
        { id: 'breakfast', price: 400 },
        { id: 'lunch', price: 800 },
        { id: 'dinner', price: 1200 },
        { id: 'tea', price: 250 }
      ].find(x => x.id === id);
      return sum + (m?.price || 0) * (pax > 0 ? pax : 1) * days;
    }, 0);

    const logisticsBase = venuePrice + transportPrice + mealsPrice + travelSurcharge;

    // 4. STRATEGIC ADD-ONS (Plus PA System if added)
    const chosenAddonsSum = chosenAddons.reduce((sum, id) => {
      const a = STRATEGIC_ADDONS.find(x => x.id === id);
      if (!a) return sum;
      return sum + (a.type === 'pp' ? a.price * (pax > 0 ? pax : 1) : a.price);
    }, 0);

    const addonsBase = chosenAddonsSum + paPrice;
    const subtotal = missionBase + logisticsBase + addonsBase;
    const undiscountedSubtotal = undiscountedMissionBase + logisticsBase + addonsBase;
    const totalSavings = Math.max(0, undiscountedSubtotal - subtotal);
    const effectivePerHead = pax > 0 ? Math.round(subtotal / pax) : subtotal;

    return { 
      subtotal, 
      deposit: subtotal * 0.5, 
      missionBase,
      undiscountedMissionBase,
      paPrice,
      bundleAssessmentsPrice,
      ambulancePrice,
      medicalPlanPrice,
      medicKitsPrice,
      discountPercent,
      discountLabel,
      totalSavings,
      logisticsBase,
      travelSurcharge,
      addonsBase,
      days,
      venuePrice,
      transportPrice,
      mealsPrice,
      effectivePerHead,
      minFeeApplied
    };
  }, [
    selectedProgram, durationIdx, pax, groupType, includePaSystem, 
    assessmentBundleSite, isYearlyRefresher, medicRisk, medicHours, 
    effectiveMedicsCount, includeAmbulance, includeMedicalPlan, mcExtraHours,
    venueType, fleetType, selectedMeals, chosenAddons, travelZone, customKm, clientCoversTravel
  ]);

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

    const concessionLine = results.totalSavings > 0 
      ? `\nDISCOUNT / BUNDLE SAVING: -${formatKES(results.totalSavings)} (${results.discountLabel})`
      : '';

    const travelLine = results.travelSurcharge > 0 
      ? `\nTRAVEL OUTSIDE NAIROBI: ${formatKES(results.travelSurcharge)} (${travelZone === 'custom' ? `${customKm} km @ KES 132/km` : TRAVEL_ZONES[travelZone].label})`
      : clientCoversTravel ? '\nTRAVEL: Client providing crew transport & accommodation directly' : '';

    const paLine = results.paPrice > 0 ? `\nPA SYSTEM WITH TECHNICIAN: ${formatKES(results.paPrice)}` : '';

    const etimsWhatsAppText = clientInfo.needEtims ? `
--------------------------------
*eTIMS TAX INVOICE REQUESTED*
Company: ${clientInfo.companyName || clientInfo.organization || 'Not Specified'}
KRA PIN: ${clientInfo.kraPin || 'Pending Provision'}
Accounts Email: ${clientInfo.etimsEmail || clientInfo.leadEmail || 'Not Specified'}` : '';

    const message = `*CROSS CONNECT AFRICA — 2026 RATE CARD PROPOSAL*
ID: ${quoteId}
SERVICE: ${selectedProgram.title}${selectedProgram.durations && selectedProgram.durations.length > 1 ? ` (${selectedProgram.durations[durationIdx]?.label})` : ''}
AUDIENCE SCALE: ${pax} Participants (approx. ${formatKES(results.effectivePerHead)} per head)
DEPLOYMENT DATE: ${formattedDate}${travelLine}${paLine}
ADD-ONS: ${activeAddonsText || 'None Selected'}${concessionLine}
TOTAL INVESTMENT: ${formatKES(results.subtotal)}
50% CONFIRMATION DEPOSIT: ${formatKES(results.deposit)}
--------------------------------
CLIENT / ORGANIZATION: ${clientInfo.organization || clientInfo.companyName || 'Not Specified'}
LEAD CONTACT: ${clientInfo.leadContact || 'Not Specified'}
PHONE: ${clientInfo.leadPhone || 'Not Specified'}
EMAIL: ${clientInfo.leadEmail || 'Not Specified'}${etimsWhatsAppText}`;

    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyQuote = () => {
    const activeAddonsText = chosenAddons.map(id => STRATEGIC_ADDONS.find(a => a.id === id)?.label).filter(Boolean).join(', ');
    const concessionInfo = results.totalSavings > 0 
      ? `\nSavings Applied: -${formatKES(results.totalSavings)} (${results.discountLabel})`
      : '';
    const travelInfo = results.travelSurcharge > 0
      ? `\nTravel Outside Nairobi: ${formatKES(results.travelSurcharge)}`
      : clientCoversTravel ? '\nTravel: Client covers crew logistics directly (Zero Surcharge)' : '';

    const etimsCopyText = clientInfo.needEtims ? `
eTIMS Tax Invoice: REQUESTED (KRA PIN: ${OFFICIAL_PROFORMA_REMITTANCE.kraPin})
Company: ${clientInfo.companyName || clientInfo.organization || 'Not Specified'}
KRA PIN: ${clientInfo.kraPin || 'Pending Provision'}
` : '';

    const summary = `CROSS CONNECT AFRICA — 2026 PROFORMA QUOTATION (RATE CARD v6)
Quotation Ref: ${quoteId}
Date: ${new Date().toLocaleDateString('en-KE')}
Client: ${clientInfo.organization || clientInfo.companyName || clientInfo.leadContact || 'Prospective Partner'}
Contact: ${clientInfo.leadContact || 'Lead Facilitator'} | Phone: ${clientInfo.leadPhone || 'Not Specified'}
${etimsCopyText}
Programme: ${selectedProgram?.title}
Participant Scale: ${pax} Participants (${formatKES(results.effectivePerHead)} per person)
Deployment: ${new Date(missionDate).toLocaleDateString('en-KE')}${travelInfo}
Service Fee (incl. applicable bundle/volume rate): ${formatKES(results.missionBase)}
${results.paPrice > 0 ? `PA System w/ Technician: ${formatKES(results.paPrice)}\n` : ''}Logistics & Field Setup: ${formatKES(results.logisticsBase)}
Add-ons: ${activeAddonsText || 'None'}${concessionInfo}
TOTAL ESTIMATE: ${formatKES(results.subtotal)}
50% Confirmation Deposit: ${formatKES(results.deposit)}
--------------------------------
Valid 30 days. Excludes applicable taxes.
${OFFICIAL_PROFORMA_REMITTANCE.companyName} | ${OFFICIAL_PROFORMA_REMITTANCE.location}
Email: ${OFFICIAL_PROFORMA_REMITTANCE.email} | Phone: ${OFFICIAL_PROFORMA_REMITTANCE.phone}
Bank: ${OFFICIAL_PROFORMA_REMITTANCE.bank} | Paybill: ${OFFICIAL_PROFORMA_REMITTANCE.paybill} | Account: ${OFFICIAL_PROFORMA_REMITTANCE.accountNumber}`;

    navigator.clipboard.writeText(summary).then(() => {
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2500);
    });
  };

  const filteredAddons = useMemo(() => {
    if (!selectedProgram) return [];
    if (selectedProgram.id === 'fire_drill') {
      return STRATEGIC_ADDONS.filter(a => a.category === 'fire_drill_only' || a.category === 'safety_training');
    }
    return STRATEGIC_ADDONS.filter(a => a.category === selectedProgram.category);
  }, [selectedProgram]);

  return (
    <div className="min-h-screen bg-brand-cream pt-28 md:pt-36 pb-32 px-4 md:px-12 selection:bg-brand-gold selection:text-brand-green">
      
      {/* 1. PRINT-ONLY COMPONENT (High Fidelity 2026 Proforma PDF) */}
      <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-0 text-brand-green font-serif">
        <div className="max-w-[800px] mx-auto p-12 bg-white min-h-screen flex flex-col justify-between">
          
          <div>
            {/* Letterhead */}
            <div className="flex justify-between items-start border-b-4 border-brand-green pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-brand-green/5 border border-brand-green/20 rounded flex items-center justify-center">
                  <Logo className="w-14 h-14" />
                </div>
                <div>
                  <h1 className="text-3xl font-serif font-black tracking-tight text-brand-green uppercase leading-none">
                    CROSS CONNECT
                  </h1>
                  <span className="text-brand-gold text-xs tracking-[0.45em] font-bold uppercase block mt-1">
                    AFRICA
                  </span>
                  <span className="text-[8px] text-gray-500 font-sans tracking-widest uppercase block mt-0.5">
                    Connecting People. Building Resilience. Saving Lives.
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-brand-green text-brand-gold text-[9px] font-bold uppercase tracking-widest mb-1">
                  {clientInfo.needEtims ? 'Official eTIMS Tax Invoice' : 'Official Proforma Invoice'}
                </span>
                <p className="text-[9px] text-gray-400 font-mono font-bold">{quoteId}</p>
                <p className="text-[9px] text-gray-500 font-sans mt-0.5">Date: {new Date().toLocaleDateString('en-KE')}</p>
              </div>
            </div>

            {/* Bill To & Company Remittance */}
            <div className="grid grid-cols-2 gap-8 text-xs font-sans pb-6 border-b border-gray-200 mb-6">
              <div>
                <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider mb-1">Client & Billing Entity</p>
                <p className="font-bold text-brand-green text-base font-serif">
                  {clientInfo.needEtims ? (clientInfo.companyName || clientInfo.organization || 'Client Organization') : (clientInfo.organization || clientInfo.leadContact || 'Client Organization')}
                </p>
                <p className="text-gray-600 mt-0.5">Attn: <strong>{clientInfo.leadContact || 'Lead Representative'}</strong></p>
                {clientInfo.leadEmail && <p className="text-gray-600">Email: {clientInfo.leadEmail}</p>}
                {clientInfo.leadPhone && <p className="text-gray-600">Phone: {clientInfo.leadPhone}</p>}
                {clientInfo.needEtims && (
                  <p className="text-emerald-800 font-mono mt-1 bg-emerald-50 p-1.5 border border-emerald-200 inline-block">
                    Client KRA PIN: <strong>{clientInfo.kraPin || 'Pending'}</strong>
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="font-bold text-brand-green uppercase tracking-wider mb-0.5">Cross Connect Africa Ltd</p>
                <p className="text-gray-600">Valley View Office Park, B1 Office 1, Nairobi</p>
                <p className="text-gray-600">{OFFICIAL_PROFORMA_REMITTANCE.postal}</p>
                <p className="text-gray-600">Email: {OFFICIAL_PROFORMA_REMITTANCE.email}</p>
                <p className="text-gray-600">Tel: {OFFICIAL_PROFORMA_REMITTANCE.phone}</p>
                <p className="text-gray-600 font-mono text-[10px] mt-1">KRA PIN: <strong>{OFFICIAL_PROFORMA_REMITTANCE.kraPin}</strong></p>
              </div>
            </div>

            {/* Engagement Details Strip */}
            <div className="bg-brand-sand/40 p-4 border border-brand-green/10 mb-6 flex justify-between items-center text-xs font-sans">
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Selected Programme</span>
                <span className="font-bold text-brand-green font-serif text-sm">{selectedProgram?.title}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Participant Scale</span>
                <span className="font-bold text-brand-green font-mono">{pax} PAX ({formatKES(results.effectivePerHead)}/head)</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Deployment Date</span>
                <span className="font-bold text-brand-green">{new Date(missionDate).toLocaleDateString('en-KE')}</span>
              </div>
            </div>

            {/* Itemized Table */}
            <table className="w-full text-left text-xs font-sans mb-6">
              <thead>
                <tr className="border-b-2 border-brand-green bg-brand-green/5 text-brand-green">
                  <th className="py-2.5 px-3 font-bold uppercase text-[9px] tracking-wider">Item & Deliverable Description</th>
                  <th className="py-2.5 px-3 font-bold uppercase text-[9px] tracking-wider text-center">Basis</th>
                  <th className="py-2.5 px-3 font-bold uppercase text-[9px] tracking-wider text-right">Amount (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-3">
                    <p className="font-bold text-brand-green font-serif">{selectedProgram?.title}</p>
                    <p className="text-[10px] text-gray-500 font-serif italic">
                      {selectedProgram?.durations?.[durationIdx]?.label || selectedProgram?.description}
                    </p>
                  </td>
                  <td className="py-3 px-3 text-center text-gray-600 font-mono">Service</td>
                  <td className="py-3 px-3 text-right font-bold text-brand-green font-mono">{formatKES(results.missionBase)}</td>
                </tr>

                {results.paPrice > 0 && (
                  <tr>
                    <td className="py-2.5 px-3">
                      <p className="font-semibold text-gray-800">Public Address System with Technician</p>
                      <p className="text-[10px] text-gray-500">{getPaPriceForPax(pax).tierLabel}</p>
                    </td>
                    <td className="py-2.5 px-3 text-center text-gray-600 font-mono">PA System</td>
                    <td className="py-2.5 px-3 text-right font-mono text-gray-800">{formatKES(results.paPrice)}</td>
                  </tr>
                )}

                {results.travelSurcharge > 0 && (
                  <tr>
                    <td className="py-2.5 px-3">
                      <p className="font-semibold text-gray-800">Travel Outside Nairobi ({travelZone === 'custom' ? `${customKm} km` : TRAVEL_ZONES[travelZone].examples})</p>
                      <p className="text-[10px] text-gray-500">Billed at ~KES 132/km from Nairobi (return trip included)</p>
                    </td>
                    <td className="py-2.5 px-3 text-center text-gray-600 font-mono">Travel</td>
                    <td className="py-2.5 px-3 text-right font-mono text-gray-800">{formatKES(results.travelSurcharge)}</td>
                  </tr>
                )}

                {results.venuePrice > 0 && (
                  <tr>
                    <td className="py-2 px-3 text-gray-700">Venue Coordination ({VENUE_TYPES[venueType].label})</td>
                    <td className="py-2 px-3 text-center text-gray-500">Logistics</td>
                    <td className="py-2 px-3 text-right font-mono">{formatKES(results.venuePrice)}</td>
                  </tr>
                )}

                {results.transportPrice > 0 && (
                  <tr>
                    <td className="py-2 px-3 text-gray-700">Mission Fleet Transport ({FLEET_SOLUTIONS[fleetType].label})</td>
                    <td className="py-2 px-3 text-center text-gray-500">Fleet</td>
                    <td className="py-2 px-3 text-right font-mono">{formatKES(results.transportPrice)}</td>
                  </tr>
                )}

                {results.mealsPrice > 0 && (
                  <tr>
                    <td className="py-2 px-3 text-gray-700">Field Catering ({selectedMeals.join(', ')})</td>
                    <td className="py-2 px-3 text-center text-gray-500">{pax} Pax</td>
                    <td className="py-2 px-3 text-right font-mono">{formatKES(results.mealsPrice)}</td>
                  </tr>
                )}

                {chosenAddons.map(id => {
                  const a = STRATEGIC_ADDONS.find(x => x.id === id);
                  if (!a) return null;
                  const amt = a.type === 'pp' ? a.price * (pax > 0 ? pax : 1) : a.price;
                  return (
                    <tr key={id}>
                      <td className="py-2 px-3 text-gray-700">{a.label}</td>
                      <td className="py-2 px-3 text-center text-gray-500">{a.type === 'pp' ? 'Per Pax' : 'Fixed'}</td>
                      <td className="py-2 px-3 text-right font-mono">{formatKES(amt)}</td>
                    </tr>
                  );
                })}

                {results.totalSavings > 0 && (
                  <tr className="bg-emerald-50/60 text-emerald-900">
                    <td className="py-2 px-3 font-semibold">{results.discountLabel}</td>
                    <td className="py-2 px-3 text-center text-xs font-mono">Discount</td>
                    <td className="py-2 px-3 text-right font-bold font-mono">-{formatKES(results.totalSavings)}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Totals Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-72 bg-brand-sand/40 p-4 border border-brand-green/20 space-y-2 text-xs font-sans">
                <div className="flex justify-between font-bold text-sm text-brand-green pt-1 border-t border-brand-green/30">
                  <span>Total Investment:</span>
                  <span className="font-mono text-base">{formatKES(results.subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-gold font-bold text-xs pt-1 border-t border-dashed border-gray-300">
                  <span>50% Confirmation Deposit:</span>
                  <span className="font-mono">{formatKES(results.deposit)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Remittance & Bank Settlement Footer */}
          <div className="border-t-2 border-brand-green pt-4 text-xs font-sans text-gray-600 grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-brand-green uppercase text-[9px] tracking-wider mb-1">Official Remittance Details</p>
              <p>Bank: <strong>{OFFICIAL_PROFORMA_REMITTANCE.bank}</strong></p>
              <p>Account No: <strong>{OFFICIAL_PROFORMA_REMITTANCE.accountNumber}</strong></p>
              <p>M-Pesa Paybill: <strong>{OFFICIAL_PROFORMA_REMITTANCE.paybill}</strong> (Acc: {OFFICIAL_PROFORMA_REMITTANCE.accountNumber})</p>
              <p>Direct M-Pesa: <strong>{OFFICIAL_PROFORMA_REMITTANCE.mpesaNumber}</strong></p>
            </div>
            <div className="text-right text-[10px] space-y-1">
              <p className="font-serif italic text-brand-green">"Connecting People. Building Resilience. Saving Lives."</p>
              <p>Prices in KES, exclude applicable taxes. Valid 30 days. 50% deposit confirms date.</p>
              <p className="text-gray-400">Authorized by Kevin Muhoro • Cross Connect Africa Ltd</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. ON-SCREEN APPLICATION WORKFLOW */}
      <div className="max-w-[1400px] mx-auto print:hidden">
        
        {/* HEADER & OFFICIAL RATE CARD LINK */}
        <header className="mb-10 text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full mb-1">
            <Sparkles size={14} className="text-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-green">
              2026 Rate Card • Team Building · Safety · Drills · Medics · MC
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-brand-green font-bold tracking-tight leading-tight">
            Quotation & <span className="text-brand-gold italic font-light">Proforma Architect.</span>
          </h1>
          
          <p className="text-gray-600 text-sm md:text-base font-serif italic max-w-2xl mx-auto leading-relaxed">
            Transparent pricing built on the 2026 Rate Card: service fees with automatic volume & bundle rates, chosen add-ons, and outside-Nairobi travel.
          </p>

          {/* Official PDF Downloads Bar */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <a 
              href={RATE_CARD_PDF_URL} 
              download="Cross_Connect_Africa_Rate_Card_2026.pdf"
              className="px-4 py-2 bg-brand-green text-brand-gold text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-green/90 transition-all flex items-center gap-2 shadow-xs"
            >
              <Download size={14} /> Download Rate Card 2026 (PDF)
            </a>

            <button
              onClick={() => setShowPdfModal(RATE_CARD_PDF_URL)}
              className="px-4 py-2 bg-white text-brand-green border border-brand-green/20 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-sand transition-all flex items-center gap-1.5"
            >
              <Eye size={14} className="text-brand-gold" /> Preview Rate Card
            </button>

            <a 
              href={COMPANY_PROFILE_PDF_URL} 
              download="Cross_Connect_Africa_Company_Profile_2026.pdf"
              className="px-4 py-2 bg-brand-sand text-brand-green border border-brand-green/20 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-sand/80 transition-all flex items-center gap-1.5"
            >
              <FileText size={14} className="text-brand-gold" /> Company Profile (PDF)
            </a>
          </div>
        </header>

        {/* MAIN CALCULATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CONFIGURATION COLUMN (LEFT SIDE) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-brand-green/10 space-y-10">
              
              {/* 01: CLIENT & COMPLIANCE ENTITY */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                  <div className="w-8 h-8 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif text-xs rounded-lg">01</div>
                  <h3 className="text-sm font-serif font-bold text-brand-green uppercase tracking-wider">Client & Entity Credentials</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <User size={12} className="text-brand-gold" /> Lead Contact Person *
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Bishop Muhoro / HR Director"
                      value={clientInfo.leadContact}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, leadContact: e.target.value }))}
                      className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl text-xs text-brand-green font-medium focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 size={12} className="text-brand-gold" /> Organization / Business Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. CITAM Parklands / Safaricom / KCB"
                      value={clientInfo.organization}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl text-xs text-brand-green font-medium focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone size={12} className="text-brand-gold" /> WhatsApp / Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+254 7XX XXX XXX"
                      value={clientInfo.leadPhone}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, leadPhone: e.target.value }))}
                      className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl text-xs text-brand-green font-medium focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail size={12} className="text-brand-gold" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="contact@company.co.ke"
                      value={clientInfo.leadEmail}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, leadEmail: e.target.value }))}
                      className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl text-xs text-brand-green font-medium focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                {/* ETIMS TAX INVOICE TOGGLE */}
                <div className="p-4 bg-brand-sand/50 rounded-2xl border border-brand-green/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-brand-green" />
                      <div>
                        <span className="text-xs font-serif font-bold text-brand-green block">Generate Official eTIMS Tax Invoice</span>
                        <span className="text-[10px] text-gray-500">Enable if your finance department requires KRA PIN validated tax invoicing</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={clientInfo.needEtims} 
                        onChange={(e) => setClientInfo(prev => ({ ...prev, needEtims: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                    </label>
                  </div>

                  {clientInfo.needEtims && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-brand-green/10">
                      <input 
                        type="text" 
                        placeholder="Registered Company Name for Tax"
                        value={clientInfo.companyName}
                        onChange={(e) => setClientInfo(prev => ({ ...prev, companyName: e.target.value }))}
                        className="p-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                      />
                      <input 
                        type="text" 
                        placeholder="Company KRA PIN (e.g. P051XXXXXXZ)"
                        value={clientInfo.kraPin}
                        onChange={(e) => setClientInfo(prev => ({ ...prev, kraPin: e.target.value }))}
                        className="p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono uppercase"
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* 02: SERVICE PILLAR & EXACT RATE CARD PROGRAM */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                  <div className="w-8 h-8 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif text-xs rounded-lg">02</div>
                  <h3 className="text-sm font-serif font-bold text-brand-green uppercase tracking-wider">Service Pillar & Programme</h3>
                </div>

                {/* Pillar Switcher (5 Cards) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        setSelectedProgram(cat.programs[0]);
                        setDurationIdx(0);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        activeCategory.id === cat.id 
                          ? 'bg-brand-green text-brand-gold border-brand-green shadow-md font-bold' 
                          : 'bg-brand-cream/60 text-gray-600 border-transparent hover:border-brand-green/20'
                      }`}
                    >
                      <div className="text-base">{cat.icon}</div>
                      <span className="text-[10px] uppercase tracking-wider leading-tight">{cat.title}</span>
                    </button>
                  ))}
                </div>

                {/* Programme Selection Buttons within Pillar */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Choose Specific {activeCategory.title} Service
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeCategory.programs.map(prog => (
                      <button
                        key={prog.id}
                        type="button"
                        onClick={() => {
                          setSelectedProgram(prog);
                          setDurationIdx(0);
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between gap-3 ${
                          selectedProgram?.id === prog.id
                            ? 'bg-brand-sand border-brand-green shadow-sm ring-1 ring-brand-green'
                            : 'bg-white border-gray-100 hover:border-brand-gold/40'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="font-serif font-bold text-xs text-brand-green block">{prog.title}</span>
                          <span className="text-[10px] text-gray-500 font-sans line-clamp-1">{prog.outcomes}</span>
                        </div>
                        <div className={`p-1.5 rounded-lg shrink-0 ${selectedProgram?.id === prog.id ? 'bg-brand-green text-brand-gold' : 'bg-gray-100 text-gray-400'}`}>
                          {prog.icon}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Configuration: Variant, Date & Pax */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      {selectedProgram?.priceType === 'mc_v6' ? 'Occasion & Included Hours' : 'Duration / Option'}
                    </label>
                    <select
                      value={durationIdx}
                      onChange={(e) => setDurationIdx(parseInt(e.target.value))}
                      className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl text-xs text-brand-green font-semibold focus:outline-none"
                    >
                      {selectedProgram?.durations?.map((d, i) => (
                        <option key={i} value={i}>{d.label}</option>
                      )) || <option value={0}>Standard Scope</option>}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      Target Deployment Date
                    </label>
                    <CustomCalendar value={missionDate} onChange={setMissionDate} />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                        Participant / Crowd Count
                      </label>
                      {results.effectivePerHead > 0 && pax > 0 && (
                        <span className="text-[9px] font-mono font-bold text-brand-gold">
                          ~{formatKES(results.effectivePerHead)}/pax
                        </span>
                      )}
                    </div>
                    <input 
                      type="number"
                      min="1"
                      value={pax}
                      onChange={(e) => setPax(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl font-serif font-bold text-lg text-brand-green focus:outline-none"
                    />
                  </div>
                </div>

                {/* SPECIAL 1: TEAM BUILDING GROUP TYPE & VOLUME RATE + PA SYSTEM (Pages 3-5) */}
                {selectedProgram?.priceType === 'team_building_v6' && selectedProgram.teamBuildingRates && (
                  <div className="p-4 bg-brand-sand/50 rounded-2xl border border-brand-green/15 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brand-green flex items-center gap-1.5">
                        <Users size={13} className="text-brand-gold" /> Group Type (Per-Head Rate & Minimum Fee)
                      </label>
                      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">Auto Volume Tiers (5%–20% Off)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(['corporate', 'community', 'youth'] as GroupType[]).map((gt) => {
                        const cfg = selectedProgram.teamBuildingRates![gt];
                        return (
                          <button
                            key={gt}
                            type="button"
                            onClick={() => setGroupType(gt)}
                            className={`p-3 rounded-xl text-left border transition-all text-xs ${
                              groupType === gt 
                                ? 'bg-brand-green text-brand-gold font-bold border-brand-green shadow-xs' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-gold/40'
                            }`}
                          >
                            <div className="font-bold leading-snug">{cfg.label}</div>
                            <div className="text-[10px] opacity-85 mt-1 font-mono">
                              KES {cfg.perHead.toLocaleString()}/head · Min {formatKES(cfg.minFee)}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Volume Tier Indicator */}
                    <div className="text-[11px] text-gray-600 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-brand-green/10">
                      <span>Volume Tiers: <strong>30–49 (5% off)</strong> · <strong>50–99 (10% off)</strong> · <strong>100–199 (15% off)</strong> · <strong>200+ (20% off)</strong></span>
                      {results.minFeeApplied && (
                        <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-semibold text-[10px]">
                          Minimum session fee applied
                        </span>
                      )}
                    </div>

                    {/* Public Address System Option (Recommended over 60 pax) */}
                    <div className="pt-2 border-t border-brand-green/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-brand-green font-semibold">
                        <input 
                          type="checkbox"
                          checked={includePaSystem}
                          onChange={(e) => setIncludePaSystem(e.target.checked)}
                          className="accent-brand-green rounded w-4 h-4"
                        />
                        <Volume2 size={14} className="text-brand-gold" />
                        <span>Add PA System with Technician ({getPaPriceForPax(pax).tierLabel})</span>
                      </label>
                      {pax > 60 && !includePaSystem && (
                        <span className="text-[10px] text-amber-700 font-medium">Recommended for groups over 60 people (or bring yours free)</span>
                      )}
                    </div>
                  </div>
                )}

                {/* SPECIAL 2: SAFETY FULL-CHAIN 10% BUNDLE & 15% YEARLY REFRESHER (Pages 6-7) */}
                {(selectedProgram?.supportsFullChainBundle || selectedProgram?.supportsRefresher) && (
                  <div className="p-4 bg-brand-sand/50 rounded-2xl border border-brand-green/15 space-y-3">
                    {selectedProgram.supportsFullChainBundle && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-brand-green flex items-center gap-1.5">
                            <ShieldCheck size={13} className="text-brand-gold" /> Optional: Bundle with Site, Pre & Post Assessments (Save 10%)
                          </label>
                          <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Save 10% on the 4</span>
                        </div>
                        <select
                          value={assessmentBundleSite}
                          onChange={(e) => {
                            const val = e.target.value as keyof typeof ASSESSMENT_SITES;
                            setAssessmentBundleSite(val);
                            if (val !== 'none') setIsYearlyRefresher(false);
                          }}
                          className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs text-brand-green font-semibold"
                        >
                          {Object.values(ASSESSMENT_SITES).map(s => (
                            <option key={s.id} value={s.id}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {selectedProgram.supportsRefresher && assessmentBundleSite === 'none' && (
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-brand-green font-semibold">
                        <input 
                          type="checkbox"
                          checked={isYearlyRefresher}
                          onChange={(e) => setIsYearlyRefresher(e.target.checked)}
                          className="accent-brand-green rounded w-4 h-4"
                        />
                        <span>Yearly Refresher: Repeating the same course within 12 months (15% off course fee)</span>
                      </label>
                    )}
                  </div>
                )}

                {/* SPECIAL 3: EVENT MEDICS & AMBULANCE CONFIGURATOR (Page 15) */}
                {selectedProgram?.priceType === 'medic_v6' && (
                  <div className="p-4 bg-brand-sand/50 rounded-2xl border border-brand-green/15 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-brand-green uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle size={13} className="text-brand-gold" /> Event Medics & Ambulance Configuration (KES 2,400/hr base, 4h min)
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Event Risk Tier</label>
                      <select
                        value={medicRisk}
                        onChange={(e) => setMedicRisk(e.target.value as keyof typeof MEDIC_RISK_TIERS)}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-brand-green font-semibold"
                      >
                        {Object.values(MEDIC_RISK_TIERS).map(t => (
                          <option key={t.id} value={t.id}>{t.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <Clock size={12} className="text-brand-gold" /> Standby Hours (Min 4 hrs)
                        </label>
                        <input 
                          type="number"
                          min="4"
                          max="48"
                          value={medicHours}
                          onChange={(e) => setMedicHours(Math.max(4, parseInt(e.target.value) || 4))}
                          className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-mono font-bold text-sm text-brand-green"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Number of Medics</label>
                          <button
                            type="button"
                            onClick={() => setUseAutoMedics(!useAutoMedics)}
                            className="text-[10px] text-brand-gold font-bold underline"
                          >
                            {useAutoMedics ? `Auto (${recommendedMedics} rec.)` : 'Custom'}
                          </button>
                        </div>
                        <input 
                          type="number"
                          min="1"
                          value={effectiveMedicsCount}
                          disabled={useAutoMedics}
                          onChange={(e) => {
                            setUseAutoMedics(false);
                            setManualMedics(Math.max(1, parseInt(e.target.value) || 1));
                          }}
                          className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-mono font-bold text-sm text-brand-green disabled:bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-brand-green/10">
                      <label className="flex items-start gap-2 cursor-pointer text-xs text-brand-green">
                        <input 
                          type="checkbox"
                          checked={includeAmbulance}
                          onChange={(e) => setIncludeAmbulance(e.target.checked)}
                          className="accent-brand-green rounded w-4 h-4 mt-0.5"
                        />
                        <span>
                          <strong>Ambulance w/ Driver & EMT</strong><br />
                          <span className="text-[10px] text-gray-500">KES 28,000 up to 8 hrs (+KES 3,000/extra hr)</span>
                        </span>
                      </label>

                      <label className="flex items-start gap-2 cursor-pointer text-xs text-brand-green">
                        <input 
                          type="checkbox"
                          checked={includeMedicalPlan}
                          onChange={(e) => setIncludeMedicalPlan(e.target.checked)}
                          className="accent-brand-green rounded w-4 h-4 mt-0.5"
                        />
                        <span>
                          <strong>Event Medical Plan & Risk Review</strong><br />
                          <span className="text-[10px] text-gray-500">KES 5,000 flat fee</span>
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* SPECIAL 4: MC SERVICES EXTRA HOURS & PA (Page 14) */}
                {selectedProgram?.priceType === 'mc_v6' && (
                  <div className="p-4 bg-brand-sand/50 rounded-2xl border border-brand-green/15 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <Clock size={12} className="text-brand-gold" /> Extra Hours Beyond Included ({selectedProgram.durations?.[durationIdx]?.includedHours || 4} hrs)
                        </label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            min="0"
                            max="12"
                            value={mcExtraHours}
                            onChange={(e) => setMcExtraHours(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-24 p-2.5 bg-white border border-gray-200 rounded-xl font-mono font-bold text-sm text-brand-green"
                          />
                          <span className="text-xs text-gray-600">
                            × {formatKES(selectedProgram.durations?.[durationIdx]?.extraHourRate || 3000)} / extra hr
                          </span>
                        </div>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer text-xs text-brand-green font-semibold">
                        <input 
                          type="checkbox"
                          checked={includePaSystem}
                          onChange={(e) => setIncludePaSystem(e.target.checked)}
                          className="accent-brand-green rounded w-4 h-4"
                        />
                        <Volume2 size={14} className="text-brand-gold" />
                        <span>Add PA System w/ Technician ({formatKES(getPaPriceForPax(pax).price)})</span>
                      </label>
                    </div>
                  </div>
                )}

              </section>

              {/* 03: TRAVEL OUTSIDE NAIROBI & FIELD LOGISTICS */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                  <div className="w-8 h-8 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif text-xs rounded-lg">03</div>
                  <h3 className="text-sm font-serif font-bold text-brand-green uppercase tracking-wider">Travel Outside Nairobi & Field Logistics</h3>
                </div>

                {/* Travel Outside Nairobi (~KES 132/km return trip included) */}
                <div className="p-4 bg-white rounded-2xl border border-brand-green/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-green flex items-center gap-1.5">
                      <Globe size={13} className="text-brand-gold" /> Travel Outside Nairobi (~KES 132/km return trip included)
                    </label>
                    <span className="text-[10px] font-mono text-gray-400">Rate Card 2026</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={travelZone}
                      onChange={(e) => setTravelZone(e.target.value as keyof typeof TRAVEL_ZONES)}
                      disabled={clientCoversTravel}
                      className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl text-xs text-brand-green font-semibold disabled:opacity-50"
                    >
                      {Object.values(TRAVEL_ZONES).map(z => (
                        <option key={z.id} value={z.id}>
                          {z.label}
                        </option>
                      ))}
                    </select>

                    {travelZone === 'custom' && !clientCoversTravel && (
                      <div className="flex items-center gap-2">
                        <input 
                          type="number"
                          min="1"
                          value={customKm}
                          onChange={(e) => setCustomKm(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl text-xs font-mono font-bold text-brand-green"
                          placeholder="Distance in km"
                        />
                        <span className="text-xs text-gray-500 whitespace-nowrap font-mono">km × 132</span>
                      </div>
                    )}
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-gray-700">
                    <input 
                      type="checkbox"
                      checked={clientCoversTravel}
                      onChange={(e) => setClientCoversTravel(e.target.checked)}
                      className="accent-brand-green rounded"
                    />
                    <span>Client organisation covers facilitator travel & accommodation directly (KES 0 surcharge)</span>
                  </label>
                </div>

                {/* Venue & Fleet Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Map size={12} className="text-brand-gold" /> Optional Venue Coordination
                    </label>
                    <select
                      value={venueType}
                      onChange={(e) => setVenueType(e.target.value as any)}
                      className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl text-xs text-brand-green font-semibold"
                    >
                      {Object.values(VENUE_TYPES).map(v => (
                        <option key={v.id} value={v.id}>
                          {v.label} {v.price > 0 ? `(${formatKES(v.price)})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Truck size={12} className="text-brand-gold" /> Optional Group Transport Fleet
                    </label>
                    <select
                      value={fleetType}
                      onChange={(e) => setFleetType(e.target.value as any)}
                      className="w-full p-3 bg-brand-cream/40 border border-brand-green/15 rounded-xl text-xs text-brand-green font-semibold"
                    >
                      {Object.values(FLEET_SOLUTIONS).map(f => (
                        <option key={f.id} value={f.id}>
                          {f.label} {f.capacity > 0 ? `— ${formatKES(f.price)}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Field Catering Options */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Utensils size={12} className="text-brand-gold" /> Optional Group Catering / Meals (Passed on at cost)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'breakfast', label: 'Breakfast', price: 400 },
                      { id: 'lunch', label: 'Buffet Lunch', price: 800 },
                      { id: 'dinner', label: 'Dinner', price: 1200 },
                      { id: 'tea', label: 'Tea & Snacks', price: 250 }
                    ].map(m => {
                      const isSelected = selectedMeals.includes(m.id);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedMeals(prev => prev.includes(m.id) ? prev.filter(x => x !== m.id) : [...prev, m.id])}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isSelected 
                              ? 'bg-brand-green text-brand-gold border-brand-green font-bold shadow-xs' 
                              : 'bg-white text-gray-600 border-gray-200 hover:border-brand-gold/40'
                          }`}
                        >
                          <div className="text-[10px] uppercase font-bold">{m.label}</div>
                          <div className="text-xs font-mono mt-0.5">{formatKES(m.price)} pp</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </section>

              {/* 04: OPTIONAL EXTRAS & ADD-ONS */}
              {filteredAddons.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <div className="w-8 h-8 bg-brand-green text-brand-gold flex items-center justify-center font-bold font-serif text-xs rounded-lg">04</div>
                    <h3 className="text-sm font-serif font-bold text-brand-green uppercase tracking-wider">Optional Extras & Add-ons</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {filteredAddons.map(addon => {
                      const isChecked = chosenAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                            isChecked 
                              ? 'bg-brand-green text-brand-gold border-brand-green shadow-md ring-1 ring-brand-gold' 
                              : 'bg-white text-gray-600 border-gray-100 hover:border-brand-gold/40'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-[11px] font-bold leading-tight">{addon.label}</span>
                            {isChecked && <CheckCircle2 size={14} className="text-brand-gold shrink-0 mt-0.5" />}
                          </div>
                          <div className="pt-2 text-xs font-mono font-bold">
                            {formatKES(addon.price)} <span className="text-[9px] font-sans font-normal opacity-70">({addon.type === 'pp' ? 'each / pax' : 'flat'})</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

            </div>
          </div>

          {/* QUOTATION SUMMARY COLUMN (RIGHT SIDE) */}
          <div className="lg:col-span-5 sticky top-32 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-brand-green/10 space-y-6">
              
              {/* Header */}
              <div className="border-b border-gray-100 pb-4 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Logo className="w-10 h-10" />
                  <div>
                    <span className="font-serif font-black text-lg text-brand-green block leading-none uppercase">CROSS CONNECT</span>
                    <span className="text-brand-gold text-[9px] tracking-[0.35em] font-bold uppercase block mt-0.5">AFRICA · 2026 RATE CARD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-gray-400 block">{quoteId}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                    {clientInfo.needEtims ? 'eTIMS Proforma' : 'Valid 30 Days'}
                  </span>
                </div>
              </div>

              {/* Engagement Overview */}
              <div className="space-y-2">
                <div className="text-sm font-serif font-bold text-brand-green leading-snug">
                  {selectedProgram?.title}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-sans">
                  <span>{pax} Participants</span>
                  <span>·</span>
                  <span>{new Date(missionDate).toLocaleDateString('en-KE')}</span>
                  {selectedProgram?.priceType === 'team_building_v6' && (
                    <>
                      <span>·</span>
                      <span className="text-brand-green font-semibold text-[10px] bg-brand-sand px-1.5 py-0.5 rounded capitalize">
                        {groupType === 'corporate' ? 'Corporate / NGO' : groupType === 'community' ? 'Chama / Church' : 'Youth / School'}
                      </span>
                    </>
                  )}
                  {selectedProgram?.priceType === 'medic_v6' && (
                    <>
                      <span>·</span>
                      <span className="text-brand-green font-semibold text-[10px] bg-brand-sand px-1.5 py-0.5 rounded">
                        {effectiveMedicsCount} Medic{effectiveMedicsCount > 1 ? 's' : ''} × {Math.max(4, medicHours)}h
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Line Items Breakdown */}
              <div className="space-y-3 pt-2 text-xs font-sans divide-y divide-gray-50">
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-gray-600 font-medium">01 Service Fee:</span>
                  <span className="font-mono font-bold text-brand-green">{formatKES(results.missionBase)}</span>
                </div>

                {results.paPrice > 0 && (
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-gray-600">PA System w/ Technician:</span>
                    <span className="font-mono text-gray-800">{formatKES(results.paPrice)}</span>
                  </div>
                )}

                {results.travelSurcharge > 0 && (
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-gray-600">Travel Outside Nairobi:</span>
                    <span className="font-mono text-brand-green">{formatKES(results.travelSurcharge)}</span>
                  </div>
                )}

                {results.venuePrice > 0 && (
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-gray-600">Venue Coordination:</span>
                    <span className="font-mono text-gray-800">{formatKES(results.venuePrice)}</span>
                  </div>
                )}

                {results.transportPrice > 0 && (
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-gray-600">Group Fleet:</span>
                    <span className="font-mono text-gray-800">{formatKES(results.transportPrice)}</span>
                  </div>
                )}

                {results.mealsPrice > 0 && (
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-gray-600">Catering ({selectedMeals.length} items):</span>
                    <span className="font-mono text-gray-800">{formatKES(results.mealsPrice)}</span>
                  </div>
                )}

                {chosenAddons.length > 0 && (
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-gray-600">Optional Extras ({chosenAddons.length}):</span>
                    <span className="font-mono text-gray-800">{formatKES(results.addonsBase - results.paPrice)}</span>
                  </div>
                )}

                {results.discountLabel && (
                  <div className="flex justify-between items-baseline pt-2 text-emerald-800 bg-emerald-50/70 p-2 rounded-lg">
                    <span className="font-semibold text-[11px]">{results.discountLabel}</span>
                    {results.totalSavings > 0 && (
                      <span className="font-mono font-bold">-{formatKES(results.totalSavings)}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Total Investment Card */}
              <div className="bg-brand-green text-white p-6 rounded-2xl shadow-xl space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
                    Total Investment
                  </span>
                  {pax > 0 && (
                    <span className="text-[11px] font-mono text-brand-cream/80">
                      ~{formatKES(results.effectivePerHead)}/pax
                    </span>
                  )}
                </div>

                <div className="text-3xl md:text-4xl font-serif font-bold text-brand-gold tracking-tight">
                  {formatKES(results.subtotal)}
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-gray-300">50% Deposit to Confirm Date:</span>
                  <span className="font-serif font-bold text-brand-gold">{formatKES(results.deposit)}</span>
                </div>
              </div>

              {/* Remittance Credentials Callout */}
              <div className="p-3 bg-brand-sand/50 rounded-xl text-[10px] text-gray-600 font-sans space-y-1">
                <p><strong>Payment Terms:</strong> 50% deposit confirms date; balance due on completion. Excludes taxes.</p>
                <p><strong>Remittance:</strong> {OFFICIAL_PROFORMA_REMITTANCE.bank} · Paybill: <strong>{OFFICIAL_PROFORMA_REMITTANCE.paybill}</strong> (Acc: {OFFICIAL_PROFORMA_REMITTANCE.accountNumber})</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handleWhatsApp}
                  disabled={results.subtotal === 0}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <MessageCircle size={18} /> Request Proposal on WhatsApp
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowInvoiceModal(true)}
                    className="py-3 bg-brand-cream hover:bg-brand-sand text-brand-green font-bold uppercase tracking-wider text-[10px] rounded-xl border border-brand-green/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye size={14} className="text-brand-gold" /> Preview Invoice
                  </button>

                  <button
                    onClick={handlePrint}
                    className="py-3 bg-brand-green hover:bg-brand-green/90 text-brand-gold font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <FileDown size={14} /> Export PDF
                  </button>
                </div>

                <button
                  onClick={handleCopyQuote}
                  className="w-full py-2.5 text-gray-600 hover:text-brand-green text-xs font-semibold rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedQuote ? (
                    <>
                      <Check size={14} className="text-emerald-600" /> Quotation Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Proforma Summary
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 3. INTERACTIVE ON-SCREEN PROFORMA / INVOICE PREVIEW MODAL */}
      {showInvoiceModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-fade-in"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-white max-w-4xl w-full my-auto rounded-3xl shadow-2xl border border-brand-green/20 overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Bar */}
            <div className="bg-brand-green text-white p-4 px-6 flex justify-between items-center border-b border-brand-gold/30 shrink-0">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-brand-gold" />
                <div>
                  <span className="font-serif font-bold text-sm block">
                    {clientInfo.needEtims ? 'Official eTIMS Tax Invoice & Proforma' : 'Official Proforma Quotation'}
                  </span>
                  <span className="text-[10px] text-brand-gold font-mono">Ref: {quoteId}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-brand-gold text-brand-green font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Printer size={13} /> Print / Export PDF
                </button>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10 overflow-y-auto space-y-6 bg-brand-cream/20">
              {/* Letterhead */}
              <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-brand-green pb-6 gap-4">
                <div className="flex items-center gap-4">
                  <Logo className="w-14 h-14" />
                  <div>
                    <h2 className="text-2xl font-serif font-black text-brand-green uppercase leading-none">CROSS CONNECT AFRICA</h2>
                    <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] block mt-1">Connecting People. Building Resilience. Saving Lives.</span>
                    <span className="text-xs text-gray-500 font-sans mt-0.5 block">Valley View Office Park, B1 Office 1, Nairobi · +254 710 974 670</span>
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="inline-block px-3 py-1 bg-brand-green text-brand-gold text-xs font-bold uppercase tracking-wider rounded-md mb-1">
                    {clientInfo.needEtims ? 'eTIMS TAX PROFORMA' : 'PROFORMA INVOICE'}
                  </span>
                  <p className="text-xs text-gray-500 font-mono">Date: {new Date().toLocaleDateString('en-KE')}</p>
                  <p className="text-xs text-gray-500 font-mono">KRA PIN: {OFFICIAL_PROFORMA_REMITTANCE.kraPin}</p>
                </div>
              </div>

              {/* Client & Remittance Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
                <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">Billed Entity</span>
                  <p className="font-bold text-sm text-brand-green font-serif">
                    {clientInfo.needEtims ? (clientInfo.companyName || clientInfo.organization || 'Prospective Client') : (clientInfo.organization || clientInfo.leadContact || 'Prospective Client')}
                  </p>
                  <p className="text-gray-600">Contact: {clientInfo.leadContact || 'Lead Facilitator'}</p>
                  <p className="text-gray-600">Phone: {clientInfo.leadPhone || 'Not Specified'}</p>
                  {clientInfo.leadEmail && <p className="text-gray-600">Email: {clientInfo.leadEmail}</p>}
                  {clientInfo.needEtims && <p className="font-mono text-emerald-800 font-bold mt-1">KRA PIN: {clientInfo.kraPin || 'Pending'}</p>}
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 text-right">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">Remittance Details</span>
                  <p className="font-bold text-brand-green">{OFFICIAL_PROFORMA_REMITTANCE.bank}</p>
                  <p className="font-mono">Account No: <strong>{OFFICIAL_PROFORMA_REMITTANCE.accountNumber}</strong></p>
                  <p className="font-mono">Paybill: <strong>{OFFICIAL_PROFORMA_REMITTANCE.paybill}</strong> (Acc: {OFFICIAL_PROFORMA_REMITTANCE.accountNumber})</p>
                  <p className="font-mono">M-Pesa: <strong>{OFFICIAL_PROFORMA_REMITTANCE.mpesaNumber}</strong></p>
                </div>
              </div>

              {/* Items Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-brand-green text-brand-gold">
                    <tr>
                      <th className="p-3 font-bold uppercase text-[10px]">Deliverable Description</th>
                      <th className="p-3 font-bold uppercase text-[10px] text-center">Scale / Basis</th>
                      <th className="p-3 font-bold uppercase text-[10px] text-right">Total (KES)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans">
                    <tr>
                      <td className="p-3">
                        <span className="font-bold font-serif text-brand-green text-sm block">{selectedProgram?.title}</span>
                        <span className="text-[11px] text-gray-500 italic font-serif">
                          {selectedProgram?.durations?.[durationIdx]?.label || selectedProgram?.description}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono">{pax} Pax</td>
                      <td className="p-3 text-right font-mono font-bold text-brand-green">{formatKES(results.missionBase)}</td>
                    </tr>

                    {results.paPrice > 0 && (
                      <tr>
                        <td className="p-3 text-gray-700">Public Address System w/ Technician ({getPaPriceForPax(pax).tierLabel})</td>
                        <td className="p-3 text-center font-mono">PA System</td>
                        <td className="p-3 text-right font-mono">{formatKES(results.paPrice)}</td>
                      </tr>
                    )}

                    {results.travelSurcharge > 0 && (
                      <tr>
                        <td className="p-3">
                          <span className="font-semibold text-gray-800">Travel Outside Nairobi</span>
                          <span className="text-[11px] text-gray-500 block">{travelZone === 'custom' ? `${customKm} km @ KES 132/km` : TRAVEL_ZONES[travelZone].label}</span>
                        </td>
                        <td className="p-3 text-center font-mono">Travel</td>
                        <td className="p-3 text-right font-mono">{formatKES(results.travelSurcharge)}</td>
                      </tr>
                    )}

                    {results.venuePrice > 0 && (
                      <tr>
                        <td className="p-3 text-gray-700">Venue Coordination ({VENUE_TYPES[venueType].label})</td>
                        <td className="p-3 text-center font-mono">{results.days} Day(s)</td>
                        <td className="p-3 text-right font-mono">{formatKES(results.venuePrice)}</td>
                      </tr>
                    )}

                    {results.transportPrice > 0 && (
                      <tr>
                        <td className="p-3 text-gray-700">Fleet Transport ({FLEET_SOLUTIONS[fleetType].label})</td>
                        <td className="p-3 text-center font-mono">Fleet</td>
                        <td className="p-3 text-right font-mono">{formatKES(results.transportPrice)}</td>
                      </tr>
                    )}

                    {results.mealsPrice > 0 && (
                      <tr>
                        <td className="p-3 text-gray-700">Field Catering ({selectedMeals.join(', ')})</td>
                        <td className="p-3 text-center font-mono">{pax} Pax</td>
                        <td className="p-3 text-right font-mono">{formatKES(results.mealsPrice)}</td>
                      </tr>
                    )}

                    {chosenAddons.map(id => {
                      const a = STRATEGIC_ADDONS.find(x => x.id === id);
                      if (!a) return null;
                      const amt = a.type === 'pp' ? a.price * (pax > 0 ? pax : 1) : a.price;
                      return (
                        <tr key={id}>
                          <td className="p-3 text-gray-700">{a.label}</td>
                          <td className="p-3 text-center font-mono">{a.type === 'pp' ? 'Per Person' : 'Flat'}</td>
                          <td className="p-3 text-right font-mono">{formatKES(amt)}</td>
                        </tr>
                      );
                    })}

                    {results.totalSavings > 0 && (
                      <tr className="bg-emerald-50 text-emerald-900">
                        <td className="p-3 font-semibold">{results.discountLabel}</td>
                        <td className="p-3 text-center font-mono text-xs">Discount</td>
                        <td className="p-3 text-right font-mono font-bold">-{formatKES(results.totalSavings)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total Card */}
              <div className="flex justify-end">
                <div className="w-80 bg-brand-green text-white p-5 rounded-2xl space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Total Investment:</span>
                    <span className="text-xl font-serif font-bold text-brand-gold font-mono">{formatKES(results.subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10 text-gray-300">
                    <span>50% Confirmation Deposit:</span>
                    <span className="font-mono font-bold text-white">{formatKES(results.deposit)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL PDF EMBED VIEWER */}
      {showPdfModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fade-in"
        >
          <div className="bg-white w-full max-w-5xl h-[88vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-brand-green text-white flex items-center justify-between border-b border-brand-gold/30">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-brand-gold" />
                <span className="font-serif font-bold text-sm">Cross Connect Africa — Official 2026 Rate Card</span>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href={showPdfModal} 
                  download
                  className="px-3.5 py-1.5 bg-brand-gold text-brand-green font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </a>
                <button 
                  onClick={() => setShowPdfModal(null)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full h-full bg-gray-100">
              <iframe 
                src={showPdfModal}
                title="Cross Connect Africa Official Rate Card 2026"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Calculator;
