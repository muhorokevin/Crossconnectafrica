import React from 'react';
import { 
  Users, Mountain, Compass, Flame, School, Zap, Briefcase, 
  Heart, Mic2, Target, Award, Users2, Star, ShieldCheck, ShieldAlert, ShieldPlus,
  FileCheck, Activity
} from 'lucide-react';

export type GroupType = 'corporate' | 'community' | 'youth';

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
  priceType: 'per_person' | 'flat_rate' | 'two_part' | 'team_building_v6' | 'medic_v6' | 'mc_v6' | 'family';
  // Hikes and yearly clubs are quoted as complete packages: no travel or logistics extras
  selfContained?: boolean;
  // Crew members we send, used for travel (one vehicle per 4 crew)
  crewByOption?: number[];
  // For two-part pricing (programme fee + per person fee)
  programFee?: number;
  perPersonFee?: number;
  minSessionFee?: number;
  // For Team Building v6 per-head + volume rate + group minimum
  teamBuildingRates?: Record<GroupType, { perHead: number; minFee: number; label: string }>;
  supportsRefresher?: boolean;
  supportsFullChainBundle?: boolean;
  inclusions: string[]; 
  participantsBring: string[];
  ccaProvides: string[];
  icon?: React.ReactNode;
  durations?: { 
    label: string; 
    price: number; 
    days: number; 
    isGroup?: boolean; 
    programFee?: number;
    perPersonFee?: number;
    includedHours?: number;
    extraHourRate?: number;
    siteAssessPrice?: number;
    preAssessPrice?: number;
    postAssessPrice?: number;
    // Families at home: flat price covers up to `includedPeople`, then a fee per extra person
    includedPeople?: number;
    extraPersonFee?: number;
    bundleDiscountPercent?: number;
  }[];
}

export interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  programs: Program[];
}

export const CATEGORIES: Category[] = [
  // ========================================================
  // 1. TEAM BUILDING (Rate Card 2026 v6: Per Head + Volume Discounts + Group Minimums)
  // ========================================================
  {
    id: 'team_building',
    title: 'Team Building',
    icon: <Users2 size={20} />,
    programs: [
      {
        id: 'tb_corporate_fullday',
        category: 'team_building',
        title: 'Full-Day Team Building',
        icon: <Briefcase size={16} />,
        quoteTitle: 'Full-Day Team Building Programme',
        audience: 'Corporates & NGOs · Chamas & Churches · Youth & Schools',
        description: 'Priced per head with automatic volume discounts (5%–20% off for 30+ pax) and minimum session fee protection. Facilitation, props and game gear included.',
        outcomes: 'Collaboration, Focus, Trust & Shared Workplace Values.',
        image: '/images/team-sack-race.jpg',
        basePrice: 1500,
        priceType: 'team_building_v6',
        teamBuildingRates: {
          corporate: { perHead: 1500, minFee: 25000, label: 'Corporates and NGOs' },
          community: { perHead: 900, minFee: 12000, label: 'Chamas, Churches & Community Groups' },
          youth: { perHead: 600, minFee: 10000, label: 'Youth, Teens, Universities & Schools' }
        },
        durations: [
          { label: 'Full Day — Per Head with Volume Tiers (Min KES 25k / 12k / 10k)', price: 1500, days: 1, isGroup: false }
        ],
        inclusions: [
          'Programme design around your objectives, with a written proposal',
          'Risk check of the activities and space',
          'Lead facilitator, with crew for larger groups',
          'All props, game gear and team tagging',
          'First aid kit and trained first aider',
          'Structured debrief and wrap-up'
        ],
        participantsBring: ['Active sportswear', 'Water bottle', 'Open mindset'],
        ccaProvides: ['Lead facilitator', 'Crew & game gear', 'Team tagging ribbons', 'First aid kit & trained first aider']
      },
      {
        id: 'tb_corporate_halfday',
        category: 'team_building',
        title: 'Half-Day Team Building',
        icon: <Users size={16} />,
        quoteTitle: 'Half-Day Team Building Programme',
        audience: 'Staff Meetings, AGMs, Departments, Community & Youth Days',
        description: 'Focused half-day experiential challenges with automatic volume discounts (5%–20% off for 30+ pax). Small groups pay the minimum session fee.',
        outcomes: 'Energised Morale, Reconnection, Trust, Collaborative Mindset.',
        image: '/images/team-archery.jpg',
        basePrice: 1000,
        priceType: 'team_building_v6',
        teamBuildingRates: {
          corporate: { perHead: 1000, minFee: 15000, label: 'Corporates and NGOs' },
          community: { perHead: 600, minFee: 8000, label: 'Chamas, Churches & Community Groups' },
          youth: { perHead: 400, minFee: 6000, label: 'Youth, Teens, Universities & Schools' }
        },
        durations: [
          { label: 'Half Day — Per Head with Volume Tiers (Min KES 15k / 8k / 6k)', price: 1000, days: 0.5, isGroup: false }
        ],
        inclusions: [
          'Programme design around your objectives, with a written proposal',
          'Risk check of activities and space',
          'Lead facilitator, with crew for larger groups',
          'All props, game gear and team tagging',
          'First aid kit and trained first aider'
        ],
        participantsBring: ['Casual sportswear'],
        ccaProvides: ['Facilitators', 'Game gear & props', 'First aid station']
      }
    ]
  },

  // ========================================================
  // 2. FIRE & FIRST AID TRAINING, OCCUPATIONAL, ASSESSMENTS, DRILLS & MEDICS
  // ========================================================
  {
    id: 'safety_training',
    title: 'Safety, Drills & Medics',
    icon: <ShieldCheck size={20} />,
    programs: [
      {
        id: 'fire_safety_training',
        category: 'safety_training',
        title: 'Fire Safety Awareness (Half Day)',
        icon: <Flame size={16} />,
        quoteTitle: 'Fire Safety Awareness (Half Day)',
        audience: 'Teams, Commercial Buildings, Offices, NGOs',
        description: 'Fire science, extinguisher choice, live extinguisher practice, and evacuation. Priced at KES 18,000 programme fee + KES 640 per person (10 pax = KES 24,400).',
        outcomes: 'Statutory Fire Compliance, Extinguisher Confidence, Evacuation Readiness.',
        image: '/images/equipment-extinguishers.jpg',
        basePrice: 18000,
        priceType: 'two_part',
        programFee: 18000,
        perPersonFee: 640,
        supportsRefresher: true,
        supportsFullChainBundle: true,
        durations: [
          { label: 'Half Day — KES 18,000 Programme Fee + KES 640 / person', price: 18000, programFee: 18000, perPersonFee: 640, days: 0.5 }
        ],
        inclusions: [
          'Qualified instructors & safety supervision',
          'Manuals, extinguisher gas and live fire demonstration',
          'Official certificates for participants',
          'Eligible for 10% Full-Chain Bundle savings (with all 3 assessments) & 15% Yearly Refresher'
        ],
        participantsBring: ['Outdoor clothing & closed shoes'],
        ccaProvides: ['Extinguishers & live training pan', 'Safety marshals', 'Manuals & certificates']
      },
      {
        id: 'first_aid',
        category: 'safety_training',
        title: 'Basic First Aid & CPR (1 Day)',
        icon: <Heart size={16} />,
        quoteTitle: 'Basic First Aid & CPR (1 Day)',
        audience: 'Corporates, Factories, NGOs, Community Teams',
        description: 'Bleeding, burns, choking, fractures, adult/child/infant CPR, and AED use. Priced at KES 30,000 programme fee + KES 1,700 per person (10 pax = KES 47,000).',
        outcomes: 'Workplace Lifesaving Readiness, CPR Mastery, Certificates.',
        image: '/images/first-aid-cpr.jpg',
        basePrice: 30000,
        priceType: 'two_part',
        programFee: 30000,
        perPersonFee: 1700,
        supportsRefresher: true,
        supportsFullChainBundle: true,
        durations: [
          { label: '1 Day — KES 30,000 Programme Fee + KES 1,700 / person', price: 30000, programFee: 30000, perPersonFee: 1700, days: 1 }
        ],
        inclusions: [
          'Qualified instructors & practical CPR assessments',
          'Training manuals, bandages, and practice manikins',
          'Official certificates for participants',
          'Eligible for 10% Full-Chain Bundle savings & 15% Yearly Refresher'
        ],
        participantsBring: ['Comfortable clothing for kneeling/practical drills'],
        ccaProvides: ['CPR training manikins', 'AED trainer & bandages', 'Certified instructors']
      },
      {
        id: 'workplace_safety_day',
        category: 'safety_training',
        title: 'Combined Fire & First Aid Day (1 Day)',
        icon: <ShieldAlert size={16} />,
        quoteTitle: 'Combined Fire & First Aid Day',
        audience: 'Corporate Offices, Manufacturing Plants, NGOs',
        description: 'Fire awareness and first aid / CPR in one day. Priced at KES 32,000 programme fee + KES 1,750 per person (10 people = KES 49,500).',
        outcomes: 'Fire safety and first aid covered in one day.',
        image: '/images/fire-training.jpg',
        basePrice: 32000,
        priceType: 'two_part',
        programFee: 32000,
        perPersonFee: 1750,
        supportsRefresher: true,
        supportsFullChainBundle: true,
        durations: [
          { label: '1 day: KES 32,000 programme fee + KES 1,750 per person', price: 32000, programFee: 32000, perPersonFee: 1750, days: 1 }
        ],
        inclusions: [
          'Combined fire awareness and first aid / CPR curriculum',
          'Qualified instructors, manuals, extinguisher gas, bandages & certificates',
          'Eligible for 10% Full-Chain Bundle savings & 15% Yearly Refresher'
        ],
        participantsBring: ['Casual comfortable wear'],
        ccaProvides: ['All medical and fire equipment, manikins, training extinguishers']
      },
      {
        id: 'occupational_courses',
        category: 'safety_training',
        title: 'Occupational Courses (Up to 8 Staff)',
        icon: <Award size={16} />,
        quoteTitle: 'Occupational Appointed Staff Course',
        audience: 'Appointed Fire Wardens, Marshals & Workplace First Aiders',
        description: 'For the few people an institution appoints. One flat fee covers up to 8 selected staff (not sold per head). Includes manuals, gear, and certification.',
        outcomes: 'Appointed Safety Officer Readiness, Record-Keeping & Command Control.',
        image: '/images/indoor-session.jpg',
        basePrice: 48000,
        priceType: 'flat_rate',
        supportsRefresher: true,
        durations: [
          { label: 'Fire warden and marshal: 1 day, up to 8 staff (KES 48,000)', price: 48000, days: 1, isGroup: true },
          { label: 'First aider (advanced): 2 days, up to 8 staff (KES 72,000)', price: 72000, days: 2, isGroup: true }
        ],
        inclusions: [
          'Flat fee covers up to 8 appointed personnel',
          'Fire warden duties, evacuation control, head-counts, hose & blanket drills (or Advanced 2-day First Aid)',
          'Qualified instructors, manuals, practice materials & certification'
        ],
        participantsBring: ['Comfortable active clothing'],
        ccaProvides: ['Specialist occupational instructors', 'Course manuals & consumables', 'Official certification']
      },
      {
        id: 'readiness_assessment',
        category: 'safety_training',
        title: 'Site & Training Readiness Assessments',
        icon: <FileCheck size={16} />,
        quoteTitle: 'Site & Readiness Assessments',
        audience: 'Premises Owners, Facility Managers, Schools, Corporates',
        description: 'Flat fees based on the size of your site, not the number of staff: Step 1 Site Assessment, Step 2 Pre-Training Readiness, or Step 4 Post-Training Practical Report.',
        outcomes: 'Scored Premises Inspection, Readiness Baseline & Post-Training Verification.',
        image: '/images/equipment-safety-point.jpg',
        basePrice: 23000,
        priceType: 'flat_rate',
        durations: [
          { label: 'Small Site (≤500 m²) — 1. Site Assessment (KES 23,000)', price: 23000, days: 0.5, isGroup: true },
          { label: 'Small Site (≤500 m²) — 2. Pre-Training Check (KES 8,500)', price: 8500, days: 0.25, isGroup: true },
          { label: 'Small Site (≤500 m²) — 4. Post-Training Test (KES 15,500)', price: 15500, days: 0.5, isGroup: true },
          { label: 'Medium Site (≤2,000 m²) — 1. Site Assessment (KES 34,000)', price: 34000, days: 0.5, isGroup: true },
          { label: 'Medium Site (≤2,000 m²) — 2. Pre-Training Check (KES 13,000)', price: 13000, days: 0.5, isGroup: true },
          { label: 'Medium Site (≤2,000 m²) — 4. Post-Training Test (KES 22,000)', price: 22000, days: 0.5, isGroup: true },
          { label: 'Large Site (≤5,000 m²) — 1. Site Assessment (KES 50,000)', price: 50000, days: 1, isGroup: true },
          { label: 'Large Site (≤5,000 m²) — 2. Pre-Training Check (KES 16,500)', price: 16500, days: 0.5, isGroup: true },
          { label: 'Large Site (≤5,000 m²) — 4. Post-Training Test (KES 29,500)', price: 29500, days: 0.5, isGroup: true },
          { label: 'Multi-Site (>5,000 m²) — 1. Site Assessment (from KES 75,000)', price: 75000, days: 1.5, isGroup: true },
          { label: 'Multi-Site (>5,000 m²) — 2. Pre-Training Check (from KES 24,500)', price: 24500, days: 1, isGroup: true },
          { label: 'Multi-Site (>5,000 m²) — 4. Post-Training Test (from KES 44,500)', price: 44500, days: 1, isGroup: true }
        ],
        inclusions: [
          'Physical site inspection and hazard scoring',
          'Baseline or post-training practical test evaluation',
          'Detailed written findings & recommendation report'
        ],
        participantsBring: ['Building floor plans if available'],
        ccaProvides: ['Safety assessor', 'Inspection scoring instruments', 'Written report']
      },
      {
        id: 'fire_drill',
        category: 'safety_training',
        title: 'Fire & Emergency Drills',
        icon: <Activity size={16} />,
        quoteTitle: 'Fire & Emergency Evacuation Drill',
        audience: 'Commercial Properties, Office Towers, Schools, Hospitals',
        description: 'Three tiers covering planning visit, facilitators, marshals, insurance, authority notification, and written report. Emergency services booked at cost + 10% handling.',
        outcomes: 'Live Evacuation Compliance, Response Timing & Post-Drill Report.',
        image: '/images/event-marshal.jpg',
        basePrice: 70000,
        priceType: 'flat_rate',
        // Tier 1: lead + 4 marshals; Tier 2: + 3 instructors, 6 marshals; Tier 3: + 4 instructors, 10 marshals, 2 medics
        crewByOption: [5, 10, 17],
        durations: [
          { label: 'Tier 1: Evacuation Drill — Half day, up to 100 people (KES 70,000)', price: 70000, days: 0.5, isGroup: true },
          { label: 'Tier 2: Drill with Response Team — Full day, up to 300 people (KES 180,000)', price: 180000, days: 1, isGroup: true },
          { label: 'Tier 3: Full-Scale Simulation — Full day, 300+ people (KES 295,000)', price: 295000, days: 1, isGroup: true }
        ],
        inclusions: [
          'Planning visit and custom drill plan',
          'Facilitators, instructors and marshals for your tier (4–10 marshals + medics on Tier 2/3)',
          'Insurance coverage and authority notification',
          'Booking and managing emergency services (ambulance/fire engine/police optional)',
          'Written report after the drill'
        ],
        participantsBring: ['Building occupants normal attire'],
        ccaProvides: ['Lead facilitator & instructors', 'Safety marshals', 'Insurance & authority coordination', 'Written report']
      },
      {
        id: 'medic_standby',
        category: 'safety_training',
        title: 'Event Medics & Ambulance',
        icon: <ShieldPlus size={16} />,
        quoteTitle: 'Event Medical Standby & Ambulance',
        audience: 'Meetings, Weddings, Sports Days, Concerts, Marathons',
        description: 'KES 2,400 per medic per hour (4-hour minimum) × risk multiplier (Low ×1.00, Medium ×1.15, High ×1.35) + stocked medic kit (KES 3,500 per 2 medics). From KES 13,100.',
        outcomes: 'Trained Medics on Standby, Rapid Triage & Optional Ambulance Cover.',
        image: '/images/event-marshal.jpg',
        basePrice: 13100,
        priceType: 'medic_v6',
        durations: [
          { label: 'Calculated by Hours (4h min), Medics, Risk Tier & Ambulance (From KES 13,100)', price: 13100, days: 0.5, isGroup: false }
        ],
        inclusions: [
          'Trained medics on standby for the booked hours (KES 2,400/hr base rate)',
          'A stocked medic kit (KES 3,500, one for every two medics)',
          'Optional ambulance with driver & EMT (KES 28,000 up to 8 hrs; KES 3,000/extra hr)',
          'Optional written event medical plan & risk review (KES 5,000)'
        ],
        participantsBring: ['N/A'],
        ccaProvides: ['Certified EMT medics', 'Stocked medic kits', 'Optional ambulance & medical risk plan']
      }
    ]
  },

  // ========================================================
  // FAMILIES AT HOME (Rate Card 2026 v8, page 10)
  // One flat price covers up to 6 people in one household
  // ========================================================
  {
    id: 'families',
    title: 'Families at Home',
    icon: <Heart size={20} />,
    programs: [
      {
        id: 'family_packages',
        category: 'families',
        title: 'Family Safety & Fun at Home',
        icon: <Heart size={16} />,
        quoteTitle: 'Families at Home Package',
        audience: 'Parents, grandparents, older children and house help',
        description: 'Fire safety, first aid and fun for one household, at your home in Nairobi. One flat price covers up to 6 people. Children from about 8 years can take part.',
        outcomes: 'Know what to do if there is a fire, a burn, a fall or someone stops breathing.',
        image: '/images/family-outing.jpg',
        basePrice: 8000,
        priceType: 'family',
        durations: [
          { label: 'Home fire safety (2 to 3 hours)', price: 9500, days: 1, includedPeople: 6, extraPersonFee: 1500 },
          { label: 'Family first aid and CPR (3 to 4 hours)', price: 15000, days: 1, includedPeople: 6, extraPersonFee: 2500 },
          { label: 'Family safety day: fire and first aid (about 5 hours)', price: 22000, days: 1, includedPeople: 6, extraPersonFee: 3000 },
          { label: 'Family fun and bonding games (2 to 3 hours)', price: 8000, days: 1, includedPeople: 6, extraPersonFee: 1000 },
          { label: 'Full family bundle: safety day plus games (10% off)', price: 30000, days: 1, includedPeople: 6, extraPersonFee: 4000, bundleDiscountPercent: 10 }
        ],
        inclusions: [
          'Qualified instructor at your home',
          'CPR manikins (adult, child and baby)',
          'Training extinguisher and fire blanket',
          'Bandages and practice materials',
          'Everyone practises each skill, not just watches'
        ],
        participantsBring: ['Comfortable clothes'],
        ccaProvides: ['Instructor', 'Manikins and practice kit', 'Training extinguisher and fire blanket']
      }
    ]
  },

  // ========================================================
  // 3. SCHOOLS (Fire Safety, First Aid, Adventure Days & Clubs)
  // ========================================================
  {
    id: 'school_clubs',
    title: 'Schools & Youth',
    icon: <School size={20} />,
    programs: [
      {
        id: 'school_fire_safety',
        category: 'school_clubs',
        title: 'School Fire Safety (Half Day)',
        icon: <Flame size={16} />,
        quoteTitle: 'School Fire Safety Training',
        audience: 'Primary, Secondary & Boarding Schools (30–500+ Students)',
        description: 'Fire basics, drills, and safe evacuation for students. Priced at KES 18,500 programme fee + KES 490 per student (30 students = KES 33,200; 100 = KES 67,500).',
        outcomes: 'Student Fire Awareness, Dormitory/Classroom Evacuation Speed.',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000',
        basePrice: 18500,
        priceType: 'two_part',
        programFee: 18500,
        perPersonFee: 490,
        supportsRefresher: true,
        durations: [
          { label: 'Half Day — KES 18,500 Programme Fee + KES 490 / student', price: 18500, programFee: 18500, perPersonFee: 490, days: 0.5 }
        ],
        inclusions: [
          'Qualified youth-friendly safety instructors',
          'Practical fire drills and extinguisher demonstrations',
          'Manuals, training consumables and school certificates'
        ],
        participantsBring: ['School uniform / PE kit'],
        ccaProvides: ['Instructors', 'Extinguisher gas & props', 'Manuals & certificates']
      },
      {
        id: 'school_first_aid',
        category: 'school_clubs',
        title: 'School First Aid (Half Day)',
        icon: <Heart size={16} />,
        quoteTitle: 'School Student First Aid Training',
        audience: 'Primary, Secondary & University Students (30–500+ Students)',
        description: 'Basic first aid, recovery position, and CPR for students. Priced at KES 19,000 programme fee + KES 910 per student (100 students = KES 110,000).',
        outcomes: 'Student Lifesaving Literacy, Recovery Position & CPR Skills.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000',
        basePrice: 19000,
        priceType: 'two_part',
        programFee: 19000,
        perPersonFee: 910,
        supportsRefresher: true,
        durations: [
          { label: 'Half Day — KES 19,000 Programme Fee + KES 910 / student', price: 19000, programFee: 19000, perPersonFee: 910, days: 0.5 }
        ],
        inclusions: [
          'Qualified instructors and hands-on student demonstrations',
          'Bandages, CPR manikins, and practice materials',
          'Student certificates of participation'
        ],
        participantsBring: ['School PE kit'],
        ccaProvides: ['Manikins & bandages', 'Instructors', 'Manuals & certificates']
      },
      {
        id: 'school_adventure_day',
        category: 'school_clubs',
        title: 'School Adventure Day',
        icon: <Target size={16} />,
        quoteTitle: 'School Adventure & Leadership Day',
        audience: 'Primary & Secondary Schools, Year Groups, Scouts',
        description: 'Age-appropriate outdoor learning, nature exploration, leadership and confidence challenges for classes or clubs.',
        outcomes: 'Outdoor Safety Awareness, Peer Cooperation, Character Growth.',
        image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1000',
        basePrice: 25000,
        priceType: 'two_part',
        programFee: 25000,
        perPersonFee: 450,
        minSessionFee: 40000,
        durations: [
          { label: 'Full Day — KES 25,000 + KES 450 / student (Min KES 40,000)', price: 25000, programFee: 25000, perPersonFee: 450, days: 1, isGroup: false }
        ],
        inclusions: [
          'Pre-trip route recce, safety plan and parent communication pack',
          'Lead facilitator + certified trail guides at 1 per 20 students',
          'Dedicated first aid cover and guided team games'
        ],
        participantsBring: ['Comfortable walking shoes', 'Water bottle', 'Sun hat'],
        ccaProvides: ['Lead expedition facilitator', 'Guides (1:20)', 'First aid medical bag', 'Safety gear']
      },
      {
        id: 'club_basic',
        selfContained: true,
        category: 'school_clubs',
        title: 'Adventure Club — Basic Package (Annual)',
        icon: <Target size={16} />,
        quoteTitle: 'School Adventure Club (Basic Annual)',
        audience: 'Up to 40 Students, Termly Calendar',
        description: 'Three full adventure days per school year (one each term) with route planning, first aid cover, and parent communication.',
        outcomes: 'Consistent Character Development, Survival Competency, Outdoor Confidence.',
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000',
        basePrice: 130000,
        priceType: 'flat_rate',
        durations: [
          { label: 'Full Year (Up to 40 Students) — KES 130,000 per year', price: 130000, days: 365, isGroup: true }
        ],
        inclusions: [
          '3 Full Adventure Days (1 in Term 1, 1 in Term 2, 1 in Term 3)',
          'Dedicated lead facilitator and safety guides for every expedition',
          'First aid cover and emergency contingency planning'
        ],
        participantsBring: ['Daypack', 'Water bottle'],
        ccaProvides: ['Complete facilitation team', 'Route recce', 'First aid cover']
      },
      {
        id: 'club_standard',
        selfContained: true,
        category: 'school_clubs',
        title: 'Adventure Club — Standard Package (Annual)',
        icon: <Award size={16} />,
        quoteTitle: 'School Adventure Club (Standard Annual)',
        audience: 'Up to 70 Students, Comprehensive Season',
        description: 'Nine monthly on-campus sessions, two full-day adventure excursions, and one overnight wilderness camp.',
        outcomes: 'Year-Round Leadership Forge, Bushcraft Mastery, Wilderness Independence.',
        image: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=1000',
        basePrice: 440000,
        priceType: 'flat_rate',
        durations: [
          { label: 'Full Year (Up to 70 Students) — KES 440,000 per year', price: 440000, days: 365, isGroup: true }
        ],
        inclusions: [
          '9 Monthly on-campus interactive workshops and bushcraft drills',
          '2 Guided off-campus day adventure expeditions',
          '1 Supervised overnight wilderness leadership camp'
        ],
        participantsBring: ['Camping kit for overnight expedition'],
        ccaProvides: ['Expedition crew', 'Camp safety officers', 'Curriculum materials']
      }
    ]
  },

  // ========================================================
  // 4. HIKES & EXPEDITIONS (Per Person, Guided)
  // ========================================================
  {
    id: 'expeditions',
    title: 'Hikes & Expeditions',
    icon: <Mountain size={20} />,
    programs: [
      {
        id: 'hike_easy',
        selfContained: true,
        category: 'expeditions',
        title: 'Day Hikes & Trail Walks (Per Person)',
        icon: <Compass size={16} />,
        quoteTitle: 'Guided Trail Day Hike',
        audience: 'Individuals, Corporates, Youth Groups, Families',
        description: 'Guided hiking experiences across Kenya’s iconic trails with professional navigation, pacing, and emergency first aid standby.',
        outcomes: 'Physical Fitness, Mental Clarity, Fellowship over Fitness.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000',
        basePrice: 1500,
        priceType: 'per_person',
        durations: [
          { label: 'Karura Forest (KES 1,500 pp)', price: 1500, days: 1 },
          { label: 'Ngong Hills Ridge (KES 2,000 pp)', price: 2000, days: 1 },
          { label: 'Mt Longonot Crater (KES 2,500 pp)', price: 2500, days: 1 },
          { label: 'Ol Donyo Sabuk (KES 2,500 pp)', price: 2500, days: 1 },
          { label: 'Kijabe Hills & Darkvale (KES 2,800 pp)', price: 2800, days: 1 },
          { label: 'Menengai Crater (KES 2,800 pp)', price: 2800, days: 1 },
          { label: 'Sleeping Warrior & Ugali Hill (KES 3,000 pp)', price: 3000, days: 1 }
        ],
        inclusions: ['Licensed guide escort', 'First aid cover', 'Radio communication'],
        participantsBring: ['Hiking boots with grip', '2-3L water', 'Rain jacket'],
        ccaProvides: ['Trail leads', 'Field first aid bag', 'Pacing and emergency coordination']
      },
      {
        id: 'hike_remote',
        selfContained: true,
        category: 'expeditions',
        title: 'Alpine & Remote Expeditions (Per Person)',
        icon: <Star size={16} />,
        quoteTitle: 'Alpine Mountain Expedition',
        audience: 'Experienced Hikers, Adventure Seekers, Mountain Teams',
        description: 'Challenging high-altitude ridges and multi-day peaks across Kenya with experienced mountain guides.',
        outcomes: 'High-Altitude Grit, Summit Mastery, Character Forged in Solitude.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
        basePrice: 3800,
        priceType: 'per_person',
        durations: [
          { label: 'Elephant Hill — Aberdares (KES 3,800 pp)', price: 3800, days: 1 },
          { label: "Mt Satima & Dragon's Teeth (KES 4,200 pp)", price: 4200, days: 1 },
          { label: 'Ol Olokwe Summit — Samburu 2-Day (KES 12,000 pp)', price: 12000, days: 2 },
          { label: 'Mt Mtelo — West Pokot 3-Day (KES 18,000 pp)', price: 18000, days: 3 },
          { label: 'Mt Elgon Speke Peak — 3-Day (KES 25,000 pp)', price: 25000, days: 3 },
          { label: 'Mt Kenya Sirimon Peak — 4-Day (KES 35,000 pp)', price: 35000, days: 4 }
        ],
        inclusions: ['Expert alpine wilderness guides', 'Emergency protocols', 'Permit coordination'],
        participantsBring: ['Alpine layered clothing', 'Waterproof boots', 'Sleeping bag (multi-day)'],
        ccaProvides: ['Lead mountaineer', 'Navigation instruments', 'Wilderness first aid']
      }
    ]
  },

  // ========================================================
  // 5. MC SERVICES (Rate Card 2026 v6 Page 14)
  // ========================================================
  {
    id: 'hosting',
    title: 'MC Services',
    icon: <Mic2 size={20} />,
    programs: [
      {
        id: 'mc_service',
        category: 'hosting',
        title: 'Bilingual MC & Event Hosting',
        icon: <Mic2 size={16} />,
        quoteTitle: 'Bilingual MC Services (English & Swahili)',
        audience: 'Weddings, Corporate Events, Galas, Churches, Schools & Concerts',
        description: 'Warm, bilingual (English & Swahili) hosting covering a pre-event briefing call, run-of-show, cue sheet, and energisers/crowd games. Starting from KES 10,000.',
        outcomes: 'Flawless Timing, Crowd Energy, Zero Dead Air.',
        image: '/images/mc-kevin.jpg',
        basePrice: 22000,
        priceType: 'mc_v6',
        durations: [
          { label: 'Corporate Event, Half Day — 4 hrs included (KES 22,000 | +KES 3,000/extra hr)', price: 22000, days: 0.5, isGroup: true, includedHours: 4, extraHourRate: 3000 },
          { label: 'Corporate Event, Full Day — 8 hrs included (KES 38,000 | +KES 3,000/extra hr)', price: 38000, days: 1, isGroup: true, includedHours: 8, extraHourRate: 3000 },
          { label: 'Wedding / Ceremony — 4 hrs included (KES 28,000 | +KES 3,000/extra hr)', price: 28000, days: 0.5, isGroup: true, includedHours: 4, extraHourRate: 3000 },
          { label: 'Gala, Awards or Fundraiser — 5 hrs included (KES 32,000 | +KES 3,500/extra hr)', price: 32000, days: 0.6, isGroup: true, includedHours: 5, extraHourRate: 3500 },
          { label: 'Church, Chama or Community Event — 4 hrs included (KES 12,000 | +KES 2,000/extra hr)', price: 12000, days: 0.5, isGroup: true, includedHours: 4, extraHourRate: 2000 },
          { label: 'School, Youth or Sports Day — 4 hrs included (KES 10,000 | +KES 1,500/extra hr)', price: 10000, days: 0.5, isGroup: true, includedHours: 4, extraHourRate: 1500 },
          { label: 'Concert or Entertainment Show — 4 hrs included (KES 15,000 | +KES 2,500/extra hr)', price: 15000, days: 0.5, isGroup: true, includedHours: 4, extraHourRate: 2500 }
        ],
        inclusions: [
          'A briefing call before the event',
          'Written run-of-show and cue sheet',
          'Bilingual English and Swahili MC for the included hours',
          'Energisers and crowd games where the programme allows'
        ],
        participantsBring: ['Event programme / order of service'],
        ccaProvides: ['Bilingual Master of Ceremonies', 'Cue sheet & run-of-show coordination']
      }
    ]
  }
];
