import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, MessageCircle, ChevronRight, Search, Heart, 
  ShieldCheck, Tag, Ticket, ArrowRight, ShoppingCart, Award, Flame, 
  Compass, Shirt, Package, CheckCircle2, FileText, Phone, Truck, 
  ExternalLink, Sparkles, Filter, SlidersHorizontal, Info, ShieldAlert,
  HelpCircle, Check, House, Car, Layers, Wind, Megaphone, BriefcaseMedical,
  Droplet, HeartPulse, Bone, Bandage, BedSingle, Backpack, Flashlight,
  GlassWater, Wrench, Tent, Footprints, Sun, FireExtinguisher, Cross
} from 'lucide-react';
import { Product, ShopSectionId } from '../types';

interface SectionConfig {
  id: ShopSectionId;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tagline: string;
  complianceNote: string;
  badge: string;
}

const SECTIONS: SectionConfig[] = [
  {
    id: 'fire_safety',
    title: 'Fire & Safety Equipment',
    shortTitle: 'Fire & Safety',
    icon: Flame,
    tagline: 'Statutory DOSHS-Compliant Workplace & Event Fire Suppression Gear',
    complianceNote: 'Meets Kenya OSHA 2007 & DOSHS statutory standards for workplaces, commercial buildings, schools, and outdoor gatherings.',
    badge: 'DOSHS & KEBS Standard'
  },
  {
    id: 'first_aid',
    title: 'First Aid & Trauma Equipment',
    shortTitle: 'First Aid',
    icon: ShieldCheck,
    tagline: 'Accredited Medical Trauma Kits, Clinical Splints & Emergency Resuscitation',
    complianceNote: 'Assembled to Kenyan Red Cross & Directorate of Occupational Safety & Health Services (DOSHS) statutory requirements.',
    badge: 'Medical Grade'
  },
  {
    id: 'tactical_hiking',
    title: 'Hiking & Tactical Equipment',
    shortTitle: 'Hiking & Tactical',
    icon: Compass,
    tagline: 'Expedition-Grade Field Hardware, Navigation & Wilderness Survival Essentials',
    complianceNote: 'Rigorously field-tested across Mount Kenya, the Aberdare Range, and extreme wilderness expeditions by Cross Connect guides.',
    badge: 'Field-Tested Standard'
  },
  {
    id: 'ministry_merch',
    title: 'Ministry Apparel & Merchandise',
    shortTitle: 'Ministry & Merch',
    icon: Shirt,
    tagline: 'Ethical Mission Wear, Scripture Field Journals & CSR Fellowship Essentials',
    complianceNote: '100% of merchandise proceeds directly fund Cross Connect Africa monthly CSR outreaches, children’s homes, and youth mentorship.',
    badge: '100% Impact Proceeds'
  }
];

const PRODUCTS: Product[] = [
  // ==========================================
  // 1. FIRE & SAFETY EQUIPMENT (RATE CARD 2026)
  // ==========================================
  {
    id: 'pack-small-office',
    name: 'Small Office Safety Pack (Up to 15 Staff)',
    category: 'Ready Packs (6% Off)',
    sectionId: 'fire_safety',
    price: '14000',
    description: 'Complete ready pack: 2 × 6kg ABC extinguishers with wall brackets, Small Office First Aid Kit, 4 glow-in-the-dark fire safety signs, and 1 A3 Fire Action Notice.',
    valueProp: '6% cheaper than buying individual items. Full statutory starter kit for clinics, startups, and branch offices.',
    image: '',
    sku: 'CCA-PK-OFF15',
    certBadge: '6% Ready Pack Saving',
    stockStatus: 'In Stock',
    isBundle: true,
    specs: [
      '2 × 6kg ABC Dry Powder Extinguishers with steel wall brackets',
      '1 × Small Office First Aid Kit (up to 10–15 staff)',
      '4 × Glow-in-the-dark Fire Safety Signs + 1 × A3 Fire Action Notice',
      'Optional on-site mounting at KES 600/point (min KES 3,500 Nairobi visit)'
    ]
  },
  {
    id: 'pack-school-church',
    name: 'School or Church Safety Pack (Up to 100 People)',
    category: 'Ready Packs (6% Off)',
    sectionId: 'fire_safety',
    price: '41000',
    description: 'Institutional protection bundle: 4 × 9kg ABC extinguishers and 1 × 2kg CO2 extinguisher with brackets, 2 Medium First Aid Kits, Fire Blanket, 8 signs, and 2 A3 notices.',
    valueProp: '6% cheaper than individual item pricing. Ideal for churches, schools, halls, and community centres.',
    image: '',
    sku: 'CCA-PK-SCH100',
    certBadge: '6% Ready Pack Saving',
    stockStatus: 'In Stock',
    isBundle: true,
    specs: [
      '4 × 9kg ABC Dry Powder + 1 × 2kg CO2 Extinguisher with brackets',
      '2 × Medium Company First Aid Kits + 1 × Fire Blanket (1.2m × 1.2m)',
      '8 × Photoluminescent Signs + 2 × A3 Fire Action Notices'
    ]
  },
  {
    id: 'pack-workplace-50',
    name: 'Workplace Safety Pack (Up to 50 Staff)',
    category: 'Ready Packs (6% Off)',
    sectionId: 'fire_safety',
    price: '65500',
    description: 'Comprehensive commercial safety solution: 6 × 9kg ABC and 2 × 5kg CO2 extinguishers with brackets, Industrial & Medium First Aid Kits, Fire Blanket, 12 signs, and 2 notices.',
    valueProp: '6% Ready Pack discount for factories, large offices, lodges, and workshops.',
    image: '/images/equipment-safety-point.jpg',
    sku: 'CCA-PK-WRK50',
    certBadge: '6% Ready Pack Saving',
    stockStatus: 'In Stock',
    isBundle: true,
    specs: [
      '6 × 9kg ABC Dry Powder + 2 × 5kg CO2 Extinguishers with brackets',
      '1 × Industrial First Aid Kit + 1 × Medium First Aid Kit + 1 × Fire Blanket',
      '12 × Glow-in-the-dark Safety Signs + 2 × A3 Fire Action Notices'
    ]
  },
  {
    id: 'pack-home-safety',
    name: 'Home Safety Pack (Extinguisher, Blanket, Alarm & Kit)',
    category: 'Ready Packs (6% Off)',
    sectionId: 'fire_safety',
    price: '7000',
    description: 'Complete household fire & medical protection: 2kg ABC dry powder extinguisher, 1.2×1.2m fire blanket, battery optical smoke alarm, and Home First Aid Kit.',
    valueProp: '6% bundle savings for residential apartments, family homes, and Airbnb hosts.',
    image: '',
    sku: 'CCA-PK-HOME',
    certBadge: '6% Ready Pack Saving',
    stockStatus: 'In Stock',
    isBundle: true,
    specs: [
      '2kg ABC Dry Powder Fire Extinguisher',
      '1.2m × 1.2m Kitchen Fire Blanket',
      'Battery-powered Optical Smoke Alarm + Home First Aid Kit'
    ]
  },
  {
    id: 'pack-vehicle-safety',
    name: 'Vehicle Safety Pack (1kg Extinguisher + First Aid Kit)',
    category: 'Ready Packs (6% Off)',
    sectionId: 'fire_safety',
    price: '5000',
    description: 'Road-ready safety pack pairing a 1kg dry powder extinguisher with mounting bracket and a stocked Vehicle First Aid Kit for private cars, matatus, and delivery vans.',
    valueProp: 'NTSA-aligned roadside preparedness with 6% ready pack savings.',
    image: '',
    sku: 'CCA-PK-VEH',
    certBadge: 'NTSA Road Ready',
    stockStatus: 'In Stock',
    isBundle: true,
    specs: [
      '1kg ABC Dry Powder Extinguisher with vehicle retention bracket',
      'Stocked Vehicle First Aid Kit for road emergencies'
    ]
  },
  {
    id: 'fire-ext-6kg',
    name: '6kg Dry Powder (ABC) Fire Extinguisher',
    category: 'Fire Extinguishers',
    sectionId: 'fire_safety',
    price: '3900',
    description: 'Multipurpose dry chemical powder extinguisher for offices, schools, and churches. Tackles Class A (wood/paper), Class B (flammable liquids), and Class C (electrical) fires.',
    valueProp: 'Essential statutory workplace fire suppression at published 2026 pricing.',
    image: '/images/shop-fire-extinguisher.jpg',
    sku: 'CCA-FS-EXT6',
    certBadge: 'KEBS / DOSHS Approved',
    stockStatus: 'In Stock',
    specs: [
      '6kg ABC Stored Pressure Dry Powder',
      'Also available: 1kg (KES 1,600), 2kg (KES 2,200), 4kg (KES 3,300)',
      'Steel wall bracket available separately (KES 450)',
      'Refills: KES 1,800 | Service & tag inspection: KES 1,000'
    ]
  },
  {
    id: 'fire-ext-9kg',
    name: '9kg Dry Powder (ABC) Fire Extinguisher',
    category: 'Fire Extinguishers',
    sectionId: 'fire_safety',
    price: '4800',
    description: 'High-capacity ABC dry powder unit engineered for warehouses, halls, and large offices.',
    valueProp: 'High-yield suppression for high-occupancy halls and commercial facilities.',
    image: '/images/shop-extinguisher-group.jpg',
    sku: 'CCA-FS-EXT9',
    certBadge: 'Industrial Grade',
    stockStatus: 'In Stock',
    specs: [
      '9kg High-Density ABC Chemical Compound',
      'Reinforced high-pressure discharge hose',
      '6L Foam (KES 4,500) and 9L Foam (KES 6,000) also stocked for fuel storage'
    ]
  },
  {
    id: 'fire-co2-2kg',
    name: '2kg CO2 Clean Agent Extinguisher',
    category: 'Fire Extinguishers',
    sectionId: 'fire_safety',
    price: '4900',
    description: 'Clean gas carbon dioxide extinguisher leaving zero residue. Built for server rooms and electrical panels.',
    valueProp: 'Protects critical IT infrastructure and switchboards without powder damage.',
    image: '/images/equipment-extinguishers.jpg',
    sku: 'CCA-FS-CO2-2',
    certBadge: 'Class B & Electrical',
    stockStatus: 'In Stock',
    specs: [
      '2kg Pure Carbon Dioxide (CO2) Gas',
      'Dielectric non-conductive frost horn nozzle',
      'CO2 refill: KES 3,000'
    ]
  },
  {
    id: 'fire-co2-5kg',
    name: '5kg CO2 Industrial Extinguisher',
    category: 'Fire Extinguishers',
    sectionId: 'fire_safety',
    price: '7200',
    description: 'High-volume carbon dioxide extinguisher for electrical rooms, labs, and offices with heavy IT infrastructure. (9kg CO2 for plant/generator rooms: KES 12,500).',
    valueProp: 'Heavy-duty non-conductive clean suppression for major power hubs.',
    image: '/images/equipment-extinguishers.jpg',
    sku: 'CCA-FS-CO2-5',
    certBadge: 'Heavy Commercial',
    stockStatus: 'In Stock',
    specs: [
      '5kg High-Purity CO2 with Extended Swivel Horn',
      'Safe on energized electrical equipment',
      '9kg CO2 unit available for plant/generator rooms at KES 12,500'
    ]
  },
  {
    id: 'fire-blanket-12',
    name: 'Fire Blanket (1.2m × 1.2m)',
    category: 'Fire Blankets',
    sectionId: 'fire_safety',
    price: '1500',
    description: 'Quick-deploy woven fiberglass fire blanket for kitchens, canteens, and small pan fires.',
    valueProp: 'Rapid, zero-mess suppression for domestic and commercial kitchen flare-ups.',
    image: '',
    sku: 'CCA-FS-BLK12',
    certBadge: 'EN 1869 Certified',
    stockStatus: 'In Stock',
    specs: [
      '1.2m × 1.2m Woven Fiberglass Fabric',
      'Dual quick-pull deployment tabs in wall pouch'
    ]
  },
  {
    id: 'fire-blanket-18',
    name: 'Large Fire Blanket (1.8m × 1.8m)',
    category: 'Fire Blankets',
    sectionId: 'fire_safety',
    price: '2200',
    description: 'Extra-large fire blanket for industrial kitchens, workshops, and outdoor camps.',
    valueProp: 'Maximum surface coverage for commercial kitchens and workshops.',
    image: '',
    sku: 'CCA-FS-BLK18',
    certBadge: 'Industrial Workshop',
    stockStatus: 'In Stock',
    specs: [
      '1.8m × 1.8m Heavy-Gauge Fire-Resistant Fiberglass',
      'Quick pull-strap pouch with wall grommets'
    ]
  },
  {
    id: 'smoke-detector-opt',
    name: 'Smoke Alarm (Battery Optical Detector)',
    category: 'Alarms & Detectors',
    sectionId: 'fire_safety',
    price: '1400',
    description: 'Battery-operated optical smoke alarm for homes, hostels, and small offices. Heat detectors also available at KES 2,200.',
    valueProp: '24/7 early-warning life safety without complex wiring.',
    image: '/images/shop-smoke-detector.jpg',
    sku: 'CCA-FS-SMK01',
    certBadge: 'CE & EN 14604',
    stockStatus: 'In Stock',
    specs: [
      'Optical smoke sensor + piercing 85dB acoustic alarm',
      'Battery operated with test button',
      '4-Zone Fire Alarm Panels (KES 24,000) & 8-Zone Panels (KES 38,000) also available'
    ]
  },
  {
    id: 'fire-alarm-breakglass',
    name: 'Manual Call Point (Break Glass)',
    category: 'Alarms & Detectors',
    sectionId: 'fire_safety',
    price: '3200',
    description: 'Surface-mount manual break-glass fire call point allowing occupants to raise the fire alarm immediately by hand.',
    valueProp: 'Essential egress alarm point for corridors and exits.',
    image: '/images/shop-call-point.jpg',
    sku: 'CCA-FS-MCP01',
    certBadge: 'BS 5839 Standard',
    stockStatus: 'In Stock',
    specs: [
      'Impact-resistant ABS safety red housing',
      'Reset test key included',
      'Audible fire alarm bell / sounder available separately (KES 2,800)'
    ]
  },
  {
    id: 'fire-smoke-hood',
    name: '15-Minute Smoke Escape Hood',
    category: 'Smoke Masks & PPE',
    sectionId: 'fire_safety',
    price: '6500',
    description: 'Protective emergency smoke escape hood providing 15 minutes of breathable air filtration to escape through thick smoke in hotels, offices, and hostels.',
    valueProp: 'Critical personal respiratory escape protection for high-rise buildings and hotels.',
    image: '',
    sku: 'CCA-FS-HOOD15',
    certBadge: '15-Min Smoke Escape',
    stockStatus: 'In Stock',
    specs: [
      'Filters CO, smoke particles, and toxic combustion gases for 15+ mins',
      'Reflective trim and wide-vision anti-fog visor',
      'FFP2 Respirators (KES 150 each / KES 2,400 box of 20) & Hi-Vis Vests (KES 450) available'
    ]
  },
  {
    id: 'fire-drill-megaphone',
    name: '25W Evacuation & Crowd Control Megaphone',
    category: 'Safety Hardware',
    sectionId: 'fire_safety',
    price: '5500',
    description: '25W portable megaphone with alert siren for fire marshals managing evacuation assembly points and crowd control.',
    valueProp: 'Clear directional voice command across open evacuation zones.',
    image: '',
    sku: 'CCA-FS-MEG25',
    certBadge: '25W Marshal Command',
    stockStatus: 'In Stock',
    specs: [
      '25W Acoustic Output with Integrated Alert Siren',
      'Emergency whistles (KES 150) & Safety helmets (KES 900) also available'
    ]
  },
  {
    id: 'fire-hosereel-30m',
    name: 'Wall-Mounted 30m Fire Hose Reel',
    category: 'Hoses & Hardware',
    sectionId: 'fire_safety',
    price: '16500',
    description: 'Fixed water-point 30m swing/manual fire hose reel for commercial buildings, schools, and apartments. (Loose 30m standpipe fire hose w/ nozzle: KES 9,500).',
    valueProp: 'Continuous pressurized water flow for building fire suppression.',
    image: '/images/equipment-hose-reel.jpg',
    sku: 'CCA-FS-HOSE30',
    certBadge: '30m Building Spec',
    stockStatus: 'In Stock',
    specs: [
      '30m Heavy-Duty Reinforced Hose with shut-off nozzle',
      'Fire hose cabinet (KES 5,500) & extinguisher cabinet (KES 3,800) available',
      'Photoluminescent Fire Safety Signs (KES 500 each) & A3 Notices (KES 800)'
    ]
  },
  // Added from the equipment photos; prices from Rate Card 2026 v8, pages 13 and 14
  {
    id: 'fire-hose-30m',
    name: 'Fire Hose, 30m with Nozzle',
    category: 'Hoses & Hardware',
    sectionId: 'fire_safety',
    price: '9500',
    description: 'Loose 30m fire hose with a nozzle, for standpipes and hydrants.',
    valueProp: 'Reaches fires far from a fixed hose reel.',
    image: '/images/shop-fire-hose.jpg',
    sku: 'CCA-FS-HOSE-L30',
    stockStatus: 'In Stock',
    specs: [
      '30m hose with nozzle',
      'For standpipe and hydrant use',
      'Fire hose cabinet available (KES 5,500)'
    ]
  },
  {
    id: 'fire-hose-cabinet',
    name: 'Fire Hose Cabinet',
    category: 'Hoses & Hardware',
    sectionId: 'fire_safety',
    price: '5500',
    description: 'Wall cabinet that houses a fire hose and reel, keeping it clean, protected and easy to find.',
    valueProp: 'Keeps your hose ready and in a marked place.',
    image: '/images/shop-hose-cabinet.jpg',
    sku: 'CCA-FS-HCAB',
    stockStatus: 'In Stock',
    specs: [
      'Houses hose and reel',
      'Installation per point: KES 600 (minimum KES 3,500 per visit in Nairobi)'
    ]
  },
  {
    id: 'fire-ext-cabinet',
    name: 'Fire Extinguisher Cabinet',
    category: 'Fire Extinguishers',
    sectionId: 'fire_safety',
    price: '3800',
    description: 'Cabinet that protects an extinguisher from knocks and weather, and makes it easy to find in an emergency.',
    valueProp: 'Protects units and marks where they are.',
    image: '/images/shop-extinguisher-cabinet.jpg',
    sku: 'CCA-FS-ECAB',
    stockStatus: 'In Stock',
    specs: [
      'Protects units, easy to find',
      'Steel wall bracket (KES 450) or floor stand (KES 1,200) also available'
    ]
  },
  {
    id: 'fire-alarm-bell',
    name: 'Fire Alarm Bell / Sounder',
    category: 'Alarms & Detectors',
    sectionId: 'fire_safety',
    price: '2800',
    description: 'Loud bell that sounds the alarm through the building when a call point or detector is triggered.',
    valueProp: 'Makes sure everyone hears the alarm.',
    image: '/images/shop-alarm-bell.jpg',
    sku: 'CCA-FS-BELL',
    stockStatus: 'In Stock',
    specs: [
      'Audible alarm',
      'Works with a fire alarm panel and manual call points (KES 3,200)'
    ]
  },
  {
    id: 'fire-alarm-panel-4',
    name: 'Fire Alarm Panel, 4 Zone',
    category: 'Alarms & Detectors',
    sectionId: 'fire_safety',
    price: '24000',
    description: 'Control panel that links detectors, call points and bells, and shows which area raised the alarm. For small offices, schools and clinics.',
    valueProp: 'One place to see and control your fire alarm.',
    image: '/images/shop-alarm-panel.jpg',
    sku: 'CCA-FS-PANEL4',
    stockStatus: 'In Stock',
    specs: [
      '4 zones, for small offices, schools and clinics',
      '8-zone panel for larger buildings and hostels: KES 38,000',
      'Heat detectors (KES 2,200) and smoke alarms (KES 1,400) available'
    ]
  },
  {
    id: 'fire-safety-sign',
    name: 'Fire Safety Sign (Glow-in-the-Dark)',
    category: 'Signs & Notices',
    sectionId: 'fire_safety',
    price: '500',
    unit: 'each',
    description: 'Exit, assembly point and extinguisher location signs that glow in the dark, so people can find the way out when the lights fail.',
    valueProp: 'Shows the way out, even in a power cut.',
    image: '/images/shop-exit-signs.jpg',
    sku: 'CCA-FS-SIGN',
    stockStatus: 'In Stock',
    specs: [
      'Exit, assembly point and extinguisher location',
      'Fire action notice, A3: KES 800 (evacuation steps and emergency numbers, for each floor)',
      'Assembly point sign stand: KES 2,500',
      'Rechargeable emergency light: KES 2,800'
    ]
  },
  {
    id: 'ppe-hi-vis-vest',
    name: 'High-Visibility Vest',
    category: 'Smoke Masks & PPE',
    sectionId: 'fire_safety',
    price: '450',
    description: 'Reflective vest so marshals and wardens stand out during drills, evacuations and events.',
    valueProp: 'Lets people see who is in charge.',
    image: '/images/shop-hi-vis-vest.jpg',
    sku: 'CCA-FS-VEST',
    stockStatus: 'In Stock',
    specs: [
      'For marshals, wardens and drills',
      'Emergency whistle also available (KES 150)'
    ]
  },
  {
    id: 'ppe-safety-helmet',
    name: 'Safety Helmet',
    category: 'Smoke Masks & PPE',
    sectionId: 'fire_safety',
    price: '900',
    description: 'Hard hat for fire wardens and rescue teams.',
    valueProp: 'Head protection for your response team.',
    image: '/images/shop-safety-helmet.jpg',
    sku: 'CCA-FS-HELMET',
    stockStatus: 'In Stock',
    specs: [
      'For wardens and rescue teams',
      'Heat-resistant fire gloves also available (KES 1,800 a pair)'
    ]
  },

  // ==========================================
  // 2. FIRST AID & TRAUMA EQUIPMENT (RATE CARD 2026)
  // ==========================================
  {
    id: 'fa-industrial-kit',
    name: 'Industrial First Aid Kit (30+ Staff / Higher Risk)',
    category: 'Workplace Kits',
    sectionId: 'first_aid',
    price: '8500',
    description: 'Statutory commercial workplace first aid kit stocked for warehouses, factories, construction sites, and large institutions. (Refill pack: KES 5,000).',
    valueProp: 'Full statutory compliance for 30+ staff offices, factories, and schools.',
    image: '/images/shop-first-aid-box.jpg',
    sku: 'CCA-FA-IND30',
    certBadge: '30+ Staff Workplace',
    stockStatus: 'In Stock',
    specs: [
      'Comprehensive sterile dressings, bandages, burn gel, eyewash, gloves & CPR shield',
      'Medium Company Kit (10–30 staff): KES 5,200 | Refill pack: KES 2,800',
      'Small Office Kit (up to 10 staff): KES 3,200 | Refill pack: KES 1,300'
    ]
  },
  {
    id: 'fa-outdoor-field-kit',
    name: 'Outdoor & Event Field First Aid Kit',
    category: 'Field & Events',
    sectionId: 'first_aid',
    price: '6800',
    description: 'Purpose-built field medical kit curated by our expedition team for hikes, wilderness camps, sports days, and outdoor team events.',
    valueProp: 'Built by field medics specifically for outdoor injury and blister/sprain management.',
    image: 'https://i.imgur.com/qAqwGkv.jpeg',
    sku: 'CCA-FA-FLD01',
    certBadge: 'Field Team Built',
    stockStatus: 'In Stock',
    specs: [
      'Organized field pouch with trauma dressings, instant cold packs, & crepe bandages',
      'Home First Aid Kit (KES 1,900) & Vehicle First Aid Kit (KES 2,800) also stocked'
    ]
  },
  {
    id: 'fa-trauma-bag-stocked',
    name: 'Fully Stocked Trauma Bag (Events & Sports)',
    category: 'EMT Hardware',
    sectionId: 'first_aid',
    price: '14500',
    description: 'Complete field response trauma bag loaded for events, sports tournaments, and standby response teams.',
    valueProp: 'Event-ready medical trauma jump bag with multi-compartment access.',
    image: '',
    sku: 'CCA-FA-TRB14',
    certBadge: 'Events & Sports Spec',
    stockStatus: 'In Stock',
    specs: [
      'Fully stocked event responder trauma jump bag',
      'Includes bleeding control, airway, burn dressings, and diagnostic gear'
    ]
  },
  {
    id: 'fa-cat-tourniquet',
    name: 'Emergency Arterial Tourniquet',
    category: 'Severe Bleed Control',
    sectionId: 'first_aid',
    price: '2200',
    description: 'Tactical windlass tourniquet for severe limb bleeding emergencies. Crucial addition to event trauma bags and workshop kits.',
    valueProp: 'Immediate control of severe life-threatening extremity hemorrhage.',
    image: '',
    sku: 'CCA-FA-TRN01',
    certBadge: 'Severe Bleed Control',
    stockStatus: 'In Stock',
    specs: [
      'One-handed windlass retention system with time strip',
      'Hemostatic gauze for heavy bleeding also available at KES 3,200'
    ]
  },
  {
    id: 'fa-cpr-pocket-mask',
    name: 'CPR Pocket Mask with One-Way Valve',
    category: 'Resuscitation & Airway',
    sectionId: 'first_aid',
    price: '700',
    description: 'Protected resuscitation barrier mask with one-way filter valve for safe rescue breaths during CPR.',
    valueProp: 'Zero-hesitation barrier protection for first responders.',
    image: '',
    sku: 'CCA-FA-CPR01',
    certBadge: 'One-Way Valve',
    stockStatus: 'In Stock',
    specs: [
      'Cushioned seal mask + replaceable one-way filter valve',
      'Supplied in hard carry case',
      'Nitrile Gloves Box of 100 available at KES 1,100'
    ]
  },
  {
    id: 'fa-splint-flexible',
    name: 'Flexible Emergency Fracture Splint',
    category: 'Splints & Immobilization',
    sectionId: 'first_aid',
    price: '900',
    description: 'Lightweight moldable fracture splint for supporting suspected limb fractures until medical help arrives. Assorted full splint set available at KES 5,500.',
    valueProp: 'Waterproof, reusable, and fits compact into any kit.',
    image: '',
    sku: 'CCA-FA-SPL01',
    certBadge: 'Moldable Core',
    stockStatus: 'In Stock',
    specs: [
      'Single Flexible Splint (KES 900) | Assorted Splint Set (KES 5,500)',
      'Adjustable Cervical Collar for neck support: KES 1,800'
    ]
  },
  {
    id: 'fa-burn-kit-large',
    name: 'Large Burn & Scald Trauma Kit',
    category: 'Burn Care',
    sectionId: 'first_aid',
    price: '4500',
    description: 'Dedicated large burn kit for rapid cooling and sterile covering of major burns and scalds in kitchens, factories, and fire drills. Individual burn gel dressing: KES 400.',
    valueProp: 'Immediate thermal cooling and contamination shield for severe burns.',
    image: '',
    sku: 'CCA-FA-BRN45',
    certBadge: 'Medical Hydrogel',
    stockStatus: 'In Stock',
    specs: [
      'Multiple sterile burn dressings & hydrogel spray',
      'Single burn gel dressing (KES 400) | 500ml Eyewash bottle (KES 650)',
      'Wall-mounted Eyewash Station: KES 9,500'
    ]
  },
  {
    id: 'fa-folding-stretcher',
    name: 'Folding Emergency Casualty Stretcher',
    category: 'Evacuation & Rescue',
    sectionId: 'first_aid',
    price: '9500',
    description: 'Lightweight folding aluminium stretcher for safely moving injured casualties at events, schools, sports pitches, and factories. Spine board w/ straps: KES 16,500.',
    valueProp: 'Rapid casualty evacuation with compact vehicle/clinic storage.',
    image: '',
    sku: 'CCA-FA-STR95',
    certBadge: 'Event & Factory Ready',
    stockStatus: 'In Stock',
    specs: [
      'Folding Casualty Stretcher (KES 9,500)',
      'Rigid Spine Board with safety straps (KES 16,500)',
      'Pulse Oximeter (KES 2,500) | Infrared Thermometer (KES 2,200) | Digital BP Monitor (KES 3,800)'
    ]
  },
  {
    id: 'fa-aed-defibrillator',
    name: 'AED Automated External Defibrillator (From)',
    category: 'Cardiac & Training',
    sectionId: 'first_aid',
    price: '145000',
    description: 'Life-saving automated external defibrillator for cardiac arrest response in workplaces, schools, gyms, and public venues (model confirmed at order).',
    valueProp: 'Essential cardiac arrest readiness paired with guided voice prompts.',
    image: '/images/shop-aed.jpg',
    sku: 'CCA-FA-AED01',
    certBadge: 'Cardiac Response',
    stockStatus: 'Pre-Order',
    specs: [
      'AED Defibrillator unit (from KES 145,000)',
      'Training gear also stocked: Adult CPR Manikin (KES 14,000)',
      'Infant CPR Manikin (KES 12,000) | AED Practice Trainer (KES 24,000)'
    ]
  },

  // ==========================================
  // 3. HIKING & TACTICAL EQUIPMENT
  // ==========================================
  {
    id: 'tac-trekking-poles',
    name: 'Alpine Anti-Shock Trekking Poles (Pair)',
    category: 'Mountain Hardware',
    sectionId: 'tactical_hiking',
    price: '3800',
    description: 'Pair of three-section telescoping trekking poles crafted from 7075 aircraft-grade aluminium with integrated internal anti-shock springs. Moisture-wicking natural cork grips with extended EVA foam sleeves for steep ridge climbs.',
    valueProp: 'Reduces knee joint impact by up to 30% on Longonot, Elephant Hill, and Mount Kenya descents.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000&auto=format&fit=crop',
    sku: 'CCA-TC-POLE1',
    certBadge: '7075 Aircraft Alloy',
    stockStatus: 'In Stock',
    specs: [
      'Weight: 260g per pole with quick-lock aluminum levers',
      'Adjustable length: 65cm to 135cm with laser-etched height markers',
      'Natural cork ergonomic grip + adjustable padded wrist strap',
      'Includes tungsten carbide tips, rubber walking caps, and mud baskets'
    ]
  },
  {
    id: 'tac-daypack-35',
    name: 'Mission Expedition Tactical Daypack (35L)',
    category: 'Packs & Bags',
    sectionId: 'tactical_hiking',
    price: '4500',
    description: 'Heavy-duty 35L tactical daypack with laser-cut MOLLE attachment webbing, dedicated 3L hydration bladder compartment with dual tube ports, and padded air-mesh back ventilation.',
    valueProp: 'Engineered for full-day wilderness hikes, navigation trials, and gear hauling.',
    image: 'https://i.imgur.com/JTJ1k1w.jpeg',
    sku: 'CCA-TC-BP35',
    certBadge: 'Water-Resistant Cordura',
    stockStatus: 'In Stock',
    specs: [
      '35L Capacity with 4 external compression straps',
      'Heavy 900D high-density waterproof oxford nylon',
      'Padded breathable shoulder harness with sternum whistle clip',
      'Velcro patch panel for mission callsign or identification'
    ]
  },
  {
    id: 'tac-rucksack-65',
    name: 'High-Altitude Expedition Rucksack (65L)',
    category: 'Packs & Bags',
    sectionId: 'tactical_hiking',
    price: '8800',
    description: 'Multi-day alpine rucksack featuring an internal lightweight aluminium stay frame, adjustable torso suspension, bottom sleeping bag compartment, and high-visibility rain cover.',
    valueProp: 'Ultimate multi-day load carriage for Mount Kenya Lenana summits and Aberdares traverses.',
    image: '',
    sku: 'CCA-TC-RUK65',
    certBadge: 'Alpine Expedition 65L',
    stockStatus: 'In Stock',
    specs: [
      '65L Capacity + 10L expandable top collar',
      'Pre-curved ergonomic aluminum internal frame transfers weight to hips',
      'Includes detachable waterproof high-visibility neon rainfly',
      'Dual trekking pole loops and ice axe attachments'
    ]
  },
  {
    id: 'tac-headlamp-1200',
    name: 'Tactical High-Lumen Rechargeable LED Headlamp',
    category: 'Field Lighting',
    sectionId: 'tactical_hiking',
    price: '2900',
    description: '1200 Lumens tactical headlamp with Cree LED core and secondary red night-vision LED. USB-C fast charging with 18650 lithium battery. IPX6 waterproof rating handles heavy torrential rain.',
    valueProp: 'Essential for 2:00 AM summit pushes, night forest navigation, and camp setup.',
    image: '',
    sku: 'CCA-TC-HL12',
    certBadge: '1200 Lumens • USB-C',
    stockStatus: 'In Stock',
    specs: [
      '1200 Lumens Output with 150-meter beam distance',
      '5 Light Modes: Turbo, High, Medium, Red Constant, Red SOS Strobe',
      'USB-C Fast Charging (4 hours charge = up to 35 hours runtime on low)',
      '90-Degree adjustable tilt angle with sweat-wicking headband'
    ]
  },
  {
    id: 'tac-compass-prismatic',
    name: 'Military Prismatic Sighting Navigation Compass',
    category: 'Navigation',
    sectionId: 'tactical_hiking',
    price: '2600',
    description: 'Heavy metal alloy casing with oil-filled thermo-elastic floating dial, sighting slit with magnifying lens, and built-in clinometer to measure mountain slopes and heights. Phosphorescent dial glows in dark.',
    valueProp: 'Dead reckoning orienteering instrument that never runs out of battery.',
    image: '',
    sku: 'CCA-TC-COMP1',
    certBadge: 'Sighting Clinometer',
    stockStatus: 'In Stock',
    specs: [
      'Heavy-duty zinc alloy waterproof construction',
      'Graduated sighting prism for precise bearing triangulation (within 1°)',
      'Integrated slope angle clinometer and standard 1:25,000 map scale edge',
      'Supplied with tactical belt pouch and neck lanyard'
    ]
  },
  {
    id: 'tac-flask-12',
    name: 'Stainless Expedition Thermal Flask (1.2L)',
    category: 'Hydration',
    sectionId: 'tactical_hiking',
    price: '2200',
    description: 'Double-walled vacuum insulated 18/8 medical-grade stainless steel flask. Keeps hot coffee or herbal tea steaming hot for 14 hours on freezing summits, or glacier water ice-cold for 24 hours under the African sun.',
    valueProp: 'Indestructible BPA-free hydration for the most punishing climates.',
    image: 'https://i.imgur.com/rnxR5gh.jpeg',
    sku: 'CCA-TC-FLK12',
    certBadge: '18/8 Stainless Steel',
    stockStatus: 'In Stock',
    specs: [
      '1.2 Liter (40 oz) High-Capacity Volume',
      'Double-wall vacuum insulation with sweat-proof powder coat finish',
      'Dual lids: leak-proof insulated sports spout lid + standard carry handle lid',
      'BPA-free, lead-free, zero metallic aftertaste'
    ]
  },
  {
    id: 'tac-water-filter',
    name: 'Portable Trail Water Filtration Straw (2,000L)',
    category: 'Hydration',
    sectionId: 'tactical_hiking',
    price: '2800',
    description: 'Ultra-light personal hollow-fiber membrane water purifier straw. Filters out 99.9999% of waterborne bacteria (Salmonella, Cholera, E. coli) and 99.9% of protozoan cysts from streams, rivers, and wilderness dams.',
    valueProp: 'Drink safely straight from natural Kenyan rivers and high-altitude tarns.',
    image: '',
    sku: 'CCA-TC-WFL01',
    certBadge: '0.01 Micron Membrane',
    stockStatus: 'In Stock',
    specs: [
      'Filtration pore size: 0.01 microns (hospital-grade hollow fiber)',
      'Treats up to 2,000 liters (530 gallons) of wilderness water',
      'Includes gravity extension tube, syringe cleaning backwash, and pre-filter',
      'Weighs only 70 grams'
    ]
  },
  {
    id: 'tac-multitool-18',
    name: 'Tactical 18-in-1 Heavy Duty Rescue Multi-Tool',
    category: 'Survival & Hardware',
    sectionId: 'tactical_hiking',
    price: '3400',
    description: 'Black-oxide coated 420HC stainless steel multi-tool with spring-action needlenose pliers, wire strippers, serrated rope saw blade, glass breaker, can opener, and 9-piece hex bit driver set with nylon sheath.',
    valueProp: 'Full field toolbox on your belt for emergency shelter repairs and equipment fixes.',
    image: '',
    sku: 'CCA-TC-TOOL18',
    certBadge: '420HC Stainless Steel',
    stockStatus: 'In Stock',
    specs: [
      '18 Independent lockable survival tools with safety catch',
      'Spring-action needle-nose pliers and replaceable wire cutters',
      'Integrated emergency tungsten carbide window punch & belt cutter',
      'Heavy-duty molded nylon tactical belt holster included'
    ]
  },
  {
    id: 'tac-bivy-sack',
    name: 'Thermal Reflective Emergency Bivy Sack',
    category: 'Survival & Hardware',
    sectionId: 'tactical_hiking',
    price: '1600',
    description: 'Windproof, waterproof emergency sleeping bag constructed of aluminized PE material. Reflects 90% of radiant body heat back to the user, preventing fatal hypothermia during unexpected night stranding on high ridges.',
    valueProp: 'Mandatory safety protocol for any hiker entering Aberdares or Mount Kenya.',
    image: '',
    sku: 'CCA-TC-BIV01',
    certBadge: '90% Heat Reflective',
    stockStatus: 'In Stock',
    specs: [
      'Dimensions: 210cm x 90cm (Full adult survival cocoon)',
      'Tear-resistant puncture-proof aluminized polyethylene',
      'Ultra-compact pack size fits in the palm of your hand (weighs 115g)',
      'Includes emergency 120dB rescue whistle on drawstring'
    ]
  },
  {
    id: 'tac-trail-gaiters',
    name: 'Heavy-Duty Mountain Trail Gaiters (Pair)',
    category: 'Mountain Hardware',
    sectionId: 'tactical_hiking',
    price: '2400',
    description: 'Reinforced 600D ripstop waterproof leg gaiters designed to seal your hiking boots against mud, scree, sharp acacia thorns, ticks, and wet savannah brush. Heavy-duty under-boot TPU strap and front lace hook.',
    valueProp: 'Keeps socks dry and lower legs protected on muddy moorlands and thorny trails.',
    image: '',
    sku: 'CCA-TC-GTR01',
    certBadge: 'Thorn & Mud Shield',
    stockStatus: 'In Stock',
    specs: [
      'Waterproof breathable 600D anti-tear Oxford polyester',
      'Full front wide-velcro closure for effortless slip-on and removal',
      'Abrasion-resistant TPU under-boot strap tested to -30°C',
      'Rust-proof metal front shoelace hook'
    ]
  },

  // ==========================================
  // 4. MINISTRY APPAREL & MERCHANDISE
  // ==========================================
  {
    id: 'merch-tshirt-fia',
    name: '"Faith in Action" Premium Heavyweight T-Shirt',
    category: 'Mission Apparel',
    sectionId: 'ministry_merch',
    price: '2500',
    description: 'Crafted from 240gsm combed ringspun African cotton. Features our iconic high-density screenprinted Cross Connect Africa chest emblem and bold "Faith in Action" back manifesto. Pre-shrunk and durable for CSR clean-ups and rugged trails.',
    valueProp: 'Wear the mission. 100% of proceeds support community outreach logistics.',
    image: '',
    sku: 'CCA-MC-TSH01',
    certBadge: '240gsm Combed Cotton',
    stockStatus: 'In Stock',
    impactLabel: '100% Proceeds Fund Monthly Outreach',
    specs: [
      '100% Combed Ringspun African Cotton (240 GSM heavy drape)',
      'Reinforced twin-needle stitching on neck, sleeves, and hem',
      'High-density fade-resistant mineral ink print',
      'Unisex athletic fit (Sizes: S, M, L, XL, XXL)'
    ]
  },
  {
    id: 'merch-hoodie-scg',
    name: '"Serve. Connect. Grow." Expedition Hoodie',
    category: 'Mission Apparel',
    sectionId: 'ministry_merch',
    price: '4800',
    description: 'Ultra-warm 340gsm brushed fleece hoodie built for early morning 5:00 AM mission departures, cold mountain trailheads, and evening fireside fellowship. Features double-lined hood, heavyweight ribbing, and kangaroo pouch pocket.',
    valueProp: 'Rugged warmth for high-altitude debriefs and team fellowship.',
    image: '',
    sku: 'CCA-MC-HOD01',
    certBadge: '340gsm Brushed Fleece',
    stockStatus: 'In Stock',
    impactLabel: 'Funds Youth Mentorship Retreats',
    specs: [
      '340 GSM Cotton-Poly Brushed Fleece (anti-pilling finish)',
      'Double-fabric hood with matching flat woven drawstrings',
      'Deep kangaroo pouch pocket with hidden headphone pass-through',
      'Embroidered gold Cross Connect Africa shoulder emblem'
    ]
  },
  {
    id: 'merch-polo-facilitator',
    name: 'Technical Facilitator & Chaplain Pique Polo',
    category: 'Mission Apparel',
    sectionId: 'ministry_merch',
    price: '3200',
    description: 'Professional moisture-wicking pique polo tailored for corporate team building facilitators, youth pastors, and event safety marshals. Features embroidered chest crest, ribbed collar, and side vents.',
    valueProp: 'Executive presentation meets all-day active field performance.',
    image: '',
    sku: 'CCA-MC-POL01',
    certBadge: 'Dry-Fit Pique',
    stockStatus: 'In Stock',
    specs: [
      'Performance Dry-Fit breathable poly-cotton blend',
      'UV-protective 30+ sun shield fabric',
      'Reinforced 3-button placket with tone-on-tone buttons',
      'Available in Executive Forest Green and Desert Sand'
    ]
  },
  {
    id: 'merch-bucket-hat',
    name: 'CCA High-Altitude Twill Safari Bucket Hat',
    category: 'Expedition Headwear',
    sectionId: 'ministry_merch',
    price: '1800',
    description: 'Durable washed cotton twill wide-brim sun protection hat. Designed for full-day sun exposure on open savannahs and mountain tracks. Includes adjustable paracord chin strap and brass side ventilation eyelets.',
    valueProp: 'Identity and essential sun protection for the open ridge.',
    image: '',
    sku: 'CCA-MC-HAT01',
    certBadge: 'Sun Shield Twill',
    stockStatus: 'In Stock',
    specs: [
      'Heavy 100% pre-washed cotton twill',
      '3-inch reinforced brim shields face and neck',
      'Adjustable military-spec chin cord with cord lock',
      'Brass mesh ventilation eyelets for heat dissipation'
    ]
  },
  {
    id: 'merch-journal-leather',
    name: '"Walking with Purpose" Embossed Leather Journal',
    category: 'Faith & Lifestyle',
    sectionId: 'ministry_merch',
    price: '2200',
    description: 'Handcrafted genuine Kenyan leather journal with 200 pages of 100gsm acid-free unlined cream parchment. Debossed with the Cross Connect Africa seal and scripture reflection prompts on every tenth page.',
    valueProp: 'Capture the mountaintop revelations and forge moments in physical ink.',
    image: 'https://i.imgur.com/1H2TZBa.jpeg',
    sku: 'CCA-MC-JRN01',
    certBadge: 'Kenyan Artisan Leather',
    stockStatus: 'In Stock',
    impactLabel: 'Handcrafted by Local Youth Artisans',
    specs: [
      'Genuine Kenyan vegetable-tanned pull-up leather wrap cover',
      '200 pages (100 sheets) of 100gsm fountain-pen friendly paper',
      'Wrap-around leather tie strap with brass compass charm',
      'Internal ribbon bookmark'
    ]
  },
  {
    id: 'merch-wristbands-trio',
    name: '"Serve Others" Mission Wristbands (Trio Pack)',
    category: 'Faith & Lifestyle',
    sectionId: 'ministry_merch',
    price: '600',
    description: 'Pack of three debossed and ink-filled hypoallergenic silicone bands in Forest Green, Desert Sand, and Heritage Gold. Features the inscriptions: "Serve. Connect. Grow.", "Faith in Action", and "Be Strong & Courageous (Joshua 1:9)".',
    valueProp: 'A quiet, tangible daily reminder of the call to servant leadership.',
    image: 'https://i.imgur.com/8gT01yT.jpeg',
    sku: 'CCA-MC-WST03',
    certBadge: 'Trio Pack',
    stockStatus: 'In Stock',
    specs: [
      'Set of 3 wristbands (Forest Green, Desert Sand, Heritage Gold)',
      '100% Medical-grade hypoallergenic silicone',
      'Deep debossed laser lettering with waterproof enamel fill'
    ]
  },
  {
    id: 'merch-csr-childrens-pack',
    name: 'Children\'s Home Charity Outreach Sponsorship Pack',
    category: 'CSR & Outreach',
    sectionId: 'ministry_merch',
    price: '3500',
    description: 'Directly finances essential food staples (flour, rice, cooking oil), hygiene materials, and school books for our scheduled partner children’s home outreach in Kiambu and Machakos counties.',
    valueProp: '100% of proceeds go directly to children’s home outreach logistics.',
    image: 'https://i.imgur.com/JqP8igR.jpeg',
    sku: 'CCA-MC-CSR01',
    certBadge: '100% Direct Impact',
    stockStatus: 'In Stock',
    impactLabel: 'Directly Funds Children’s Home Food & Supplies',
    specs: [
      'Provides dry food rations & hygiene pack for 3 vulnerable children for 1 month',
      'Includes personalized digital Certificate of Philanthropy',
      'Option to personally accompany our team on delivery day'
    ]
  },
  {
    id: 'merch-cleanup-kit',
    name: 'Urban Restoration & Community Service Clean-up Kit',
    category: 'CSR & Outreach',
    sectionId: 'ministry_merch',
    price: '1800',
    description: 'Complete environmental stewardship volunteer pack: heavy-duty puncture-proof work gloves, biodegradable waste bags, hand sanitizer, and high-vis safety vest. Everything required for church youth cleanup days.',
    valueProp: 'Practical tools to restore beauty and dignity to Kenyan communities.',
    image: 'https://i.imgur.com/sjLj5CK.jpeg',
    sku: 'CCA-MC-CSR02',
    certBadge: 'Volunteer Stewardship',
    stockStatus: 'In Stock',
    impactLabel: 'Equips Urban Restoration Days',
    specs: [
      '2 Pairs Heavy-Duty Nitrile Coated Thorn-Proof Work Gloves',
      '10x 100L Heavy Gauge Biodegradable Waste Bags',
      '1x 100ml Hospital-grade hand sanitizer',
      '1x CCA Volunteer Reflective Vest'
    ]
  },
  {
    id: 'merch-mission-pass-3',
    name: '3-Event Mission Explorer Season Pass (2026)',
    category: 'Experience Passes',
    sectionId: 'ministry_merch',
    price: '12000',
    description: 'Season commitment pass granting admission to any three 2026 Cross Connect Africa public mountain expeditions or adventure trail days with a built-in 15% bundled savings. Fully transferable between team members.',
    valueProp: 'Commitment to physical resilience and community growth throughout 2026.',
    image: 'https://i.imgur.com/Q3qLaBj.jpeg',
    sku: 'CCA-MC-EXP03',
    certBadge: '15% Bundled Concession',
    stockStatus: 'In Stock',
    isBundle: true,
    specs: [
      'Valid for any 3 public day-hikes or fitness retreats throughout 2026',
      'Includes guide fees, park entry coordination, and first aid standby',
      'Includes free "Faith in Action" mission t-shirt upon redemption'
    ]
  }
];

// Products without a real photo of the item get an icon tile instead of an unrelated stock picture
const PRODUCT_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  'pack-small-office': Package,
  'pack-school-church': Package,
  'pack-home-safety': House,
  'pack-vehicle-safety': Car,
  'fire-blanket-12': Layers,
  'fire-blanket-18': Layers,
  'fire-smoke-hood': Wind,
  'fire-drill-megaphone': Megaphone,
  'fa-trauma-bag-stocked': BriefcaseMedical,
  'fa-cat-tourniquet': Droplet,
  'fa-cpr-pocket-mask': HeartPulse,
  'fa-splint-flexible': Bone,
  'fa-burn-kit-large': Bandage,
  'fa-folding-stretcher': BedSingle,
  'tac-rucksack-65': Backpack,
  'tac-headlamp-1200': Flashlight,
  'tac-compass-prismatic': Compass,
  'tac-water-filter': GlassWater,
  'tac-multitool-18': Wrench,
  'tac-bivy-sack': Tent,
  'tac-trail-gaiters': Footprints,
  'merch-tshirt-fia': Shirt,
  'merch-hoodie-scg': Shirt,
  'merch-polo-facilitator': Shirt,
  'merch-bucket-hat': Sun
};
const SECTION_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  fire_safety: FireExtinguisher,
  first_aid: Cross,
  tactical_hiking: Compass,
  ministry_merch: Shirt
};

const ProductVisual: React.FC<{ product: Product; className?: string; iconSize?: number; lazy?: boolean }> = ({ product, className = '', iconSize = 56, lazy }) => {
  const [failed, setFailed] = useState(false);
  if (product.image && !failed) {
    return <img src={product.image} alt={product.name} loading={lazy ? 'lazy' : undefined} onError={() => setFailed(true)} className={`w-full h-full object-cover ${className}`} />;
  }
  const Icon = PRODUCT_ICONS[product.id] || SECTION_ICONS[product.sectionId || ''] || Package;
  return (
    <div role="img" aria-label={product.name} className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-sand to-brand-stone">
      <span className="rounded-full bg-white/80 shadow-soft flex items-center justify-center text-brand-green" style={{ width: iconSize * 2, height: iconSize * 2 }}>
        <Icon size={iconSize} strokeWidth={1.5} />
      </span>
    </div>
  );
};

interface CartItem extends Product {
  quantity: number;
}

const Shop: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ShopSectionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickAddedToast, setQuickAddedToast] = useState<string | null>(null);


  const formatPrice = (price: string) => `KES ${parseInt(price).toLocaleString()}`;

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSection = activeSection === 'all' || p.sectionId === activeSection;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.specs && p.specs.some(s => s.toLowerCase().includes(q)));
      return matchesSection && matchesSearch;
    });
  }, [activeSection, searchQuery]);

  // Section item counts
  const sectionCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTS.length };
    SECTIONS.forEach(s => {
      counts[s.id] = PRODUCTS.filter(p => p.sectionId === s.id).length;
    });
    return counts;
  }, []);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setQuickAddedToast(product.name);
    setTimeout(() => setQuickAddedToast(null), 2500);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0);
  const totalCartCount = cart.reduce((a, b) => a + b.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    let message = `*CROSS CONNECT AFRICA — STORE ORDER / QUOTATION REQUEST*\n`;
    message += `--------------------------------------------------\n`;
    cart.forEach(item => {
      message += `• ${item.quantity}x [${item.sku || 'SKU'}] ${item.name} — KES ${(parseInt(item.price) * item.quantity).toLocaleString()}\n`;
    });
    message += `--------------------------------------------------\n`;
    message += `*ORDER TOTAL: KES ${cartTotal.toLocaleString()}*\n\n`;
    message += `Delivery Location: [Please advise delivery address / town]\n`;
    message += `Organization / Name: [Your Name or Company]\n`;
    message += `Need Official Proforma Invoice? [Yes / No]\n`;
    
    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSingleItemInquiry = (product: Product) => {
    const message = `*EQUIPMENT INQUIRY — CROSS CONNECT AFRICA*\n` +
      `Product: ${product.name} (${product.sku || 'N/A'})\n` +
      `Price: KES ${parseInt(product.price).toLocaleString()}\n` +
      `Category: ${product.category}\n` +
      `Please provide stock availability and dispatch time to my location.`;
    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBulkRFQ = (sectionTitle?: string) => {
    const message = `*BULK INSTITUTIONAL PROCUREMENT REQUEST*\n` +
      `Category: ${sectionTitle || 'General Equipment & Safety Supplies'}\n` +
      `Organization / Institution:\n` +
      `Estimated Quantities Required:\n` +
      `Please furnish our procurement department with an official stamped Proforma Invoice and KRA PIN details.`;
    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-28 md:pt-36 pb-32 text-brand-green selection:bg-brand-gold selection:text-brand-green">
      
      {/* QUICK ADD TOAST NOTIFICATION */}
      {quickAddedToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-brand-green text-brand-cream border border-brand-gold/40 shadow-2xl px-5 py-3 rounded-xl flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <div className="w-6 h-6 rounded-full bg-brand-gold text-brand-green flex items-center justify-center font-bold">
            <Check size={14} />
          </div>
          <span>Added <strong>{quickAddedToast}</strong> to your bag!</span>
        </div>
      )}

      {/* FLOATING BAG BUTTON */}
      <button 
        onClick={() => setIsCartOpen(true)}
        aria-label="View Mission Bag"
        className="fixed bottom-8 right-6 md:right-10 z-40 bg-brand-green text-brand-gold p-4 md:p-5 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-brand-gold/40 group"
      >
        <ShoppingBag size={22} className="group-hover:rotate-6 transition-transform" />
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-brand-cream">
          Mission Bag
        </span>
        {totalCartCount > 0 && (
          <span className="bg-brand-gold text-brand-green text-xs font-bold h-6 min-w-6 px-1.5 rounded-full flex items-center justify-center font-mono shadow-sm">
            {totalCartCount}
          </span>
        )}
      </button>

      {/* 1. CINEMATIC HERO HEADER */}
      <section className="relative bg-brand-green text-brand-cream py-14 md:py-18 px-6 overflow-hidden border-b border-brand-gold/20 mb-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-brand-gold text-xs md:text-xs font-bold uppercase tracking-[0.4em]">
            <Sparkles size={14} className="text-brand-gold" />
            Field-Grade Equipment & Mission Procurement
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Cross Connect <span className="text-brand-gold italic font-light">Supply & Provisioning.</span>
          </h1>
          
          <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto font-serif italic leading-relaxed">
            Statutory DOSHS-certified fire suppression hardware, clinical first responder trauma modules, alpine-tested tactical trekking gear, and ethically crafted ministry fellowship merchandise.
          </p>

          {/* Quick Metrics */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-brand-cream/80 font-medium">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base text-brand-gold">38+</span>
              <span className="text-[13px] uppercase tracking-wider text-gray-300">Cataloged SKUs</span>
            </div>
            <span className="text-white/20 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base text-brand-gold">DOSHS</span>
              <span className="text-[13px] uppercase tracking-wider text-gray-300">Statutory Compliant</span>
            </div>
            <span className="text-white/20 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base text-brand-gold">24h</span>
              <span className="text-[13px] uppercase tracking-wider text-gray-300">Nairobi Dispatch</span>
            </div>
            <span className="text-white/20 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base text-brand-gold">100%</span>
              <span className="text-[13px] uppercase tracking-wider text-gray-300">CSR Margin Reinvestment</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION TABS & SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* SECTION SELECTION GRID (4 Clean Categorized Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {SECTIONS.map(sec => {
            const Icon = sec.icon;
            const isSelected = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(isSelected ? 'all' : sec.id)}
                className={`p-4 md:p-5 rounded-2xl text-left transition-all border flex flex-col justify-between relative group ${
                  isSelected 
                    ? 'bg-brand-green text-brand-cream border-brand-gold shadow-lg ring-2 ring-brand-gold/40' 
                    : 'bg-white text-brand-green border-brand-green/10 hover:border-brand-gold/60 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-brand-gold text-brand-green' : 'bg-brand-cream text-brand-green group-hover:bg-brand-gold/20'}`}>
                    <Icon size={20} />
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-black/30 text-brand-gold' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {sectionCounts[sec.id]} Items
                  </span>
                </div>
                <div>
                  <h3 className={`font-serif font-bold text-sm md:text-base leading-tight mb-1 ${isSelected ? 'text-brand-gold' : 'text-brand-green'}`}>
                    {sec.shortTitle}
                  </h3>
                  <p className={`text-[13px] line-clamp-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                    {sec.badge}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* SEARCH & FILTER CONTROLS BAR */}
        <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-brand-green/10 flex flex-col md:flex-row items-center justify-between gap-3 mb-8">
          
          {/* Quick Tab Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeSection === 'all'
                  ? 'bg-brand-green text-brand-gold font-bold shadow-xs'
                  : 'text-gray-600 hover:text-brand-green hover:bg-brand-cream'
              }`}
            >
              All Provisions ({sectionCounts.all})
            </button>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeSection === s.id
                    ? 'bg-brand-green text-brand-gold font-bold shadow-xs'
                    : 'text-gray-600 hover:text-brand-green hover:bg-brand-cream'
                }`}
              >
                {s.shortTitle}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by equipment, spec, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-brand-cream/60 border border-brand-green/15 rounded-xl text-xs text-brand-green placeholder:text-gray-400 focus:outline-none focus:border-brand-gold transition-colors font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green"
              >
                <X size={14} />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* 3. STRUCTURED SECTION RENDERING */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* If user is filtering by a specific section OR seeing all */}
        {SECTIONS.filter(s => activeSection === 'all' || activeSection === s.id).map(section => {
          const sectionItems = filteredProducts.filter(p => p.sectionId === section.id);
          const SectionIcon = section.icon;

          if (sectionItems.length === 0) return null;

          return (
            <section key={section.id} id={section.id} className="space-y-6 scroll-mt-36">
              
              {/* SECTION HEADER BANNER */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-green/10 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-brand-green text-brand-gold rounded-lg inline-flex">
                      <SectionIcon size={18} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
                      Section {SECTIONS.findIndex(s => s.id === section.id) + 1} • {section.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-green tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 font-serif italic">
                    {section.tagline}
                  </p>
                  <div className="flex items-center gap-2 text-[13px] text-gray-500 pt-1">
                    <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                    <span>{section.complianceNote}</span>
                  </div>
                </div>

                {/* Section Action / Bulk RFQ Link */}
                <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                  <span className="text-[13px] font-mono text-gray-400 hidden sm:inline">
                    {sectionItems.length} Products Available
                  </span>
                  <button
                    onClick={() => handleBulkRFQ(section.title)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-brand-cream hover:bg-brand-green hover:text-brand-gold border border-brand-green/20 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-green transition-all flex items-center justify-center gap-2"
                  >
                    <FileText size={14} /> Bulk Quote / RFQ
                  </button>
                </div>
              </div>

              {/* PRODUCTS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sectionItems.map(product => (
                  <div 
                    key={product.id} 
                    className="group bg-white rounded-2xl border border-brand-green/10 hover:border-brand-gold/60 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
                  >
                    {/* Image Area */}
                    <div 
                      onClick={() => setSelectedProduct(product)}
                      className="aspect-[4/3] bg-brand-sand/40 overflow-hidden relative cursor-pointer"
                    >
                      <ProductVisual product={product} lazy className="group-hover:scale-105 transition-transform duration-700" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {product.certBadge && (
                          <span className="bg-brand-green/95 backdrop-blur-sm text-brand-gold px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm border border-brand-gold/30">
                            {product.certBadge}
                          </span>
                        )}
                        {product.impactLabel && (
                          <span className="bg-amber-600/95 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Heart size={10} /> Impact Choice
                          </span>
                        )}
                      </div>

                      {/* Stock Status Badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="bg-white/95 backdrop-blur-sm text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                          {product.stockStatus || 'In Stock'}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-2">
                        {/* SKU & Category */}
                        <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                          <span>{product.sku || 'CCA-EQUIP'}</span>
                          <span className="text-brand-gold font-sans font-bold uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={() => setSelectedProduct(product)}
                          className="font-serif font-bold text-base text-brand-green group-hover:text-brand-gold transition-colors leading-snug cursor-pointer line-clamp-2"
                        >
                          {product.name}
                        </h3>

                        {/* Brief Spec Highlights */}
                        {product.specs && product.specs.length > 0 && (
                          <ul className="space-y-1 text-[13px] text-gray-500 font-sans pt-1">
                            {product.specs.slice(0, 2).map((spec, i) => (
                              <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                                <span className="text-brand-gold font-bold">•</span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Price & Action Row */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-xs text-gray-400 uppercase font-semibold">Standard Unit</div>
                          <div className="text-base font-serif font-bold text-brand-green">
                            {formatPrice(product.price)}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            title="Inspect Specifications"
                            className="p-2 rounded-xl text-gray-500 hover:text-brand-green hover:bg-brand-cream border border-gray-200 transition-colors"
                          >
                            <Info size={16} />
                          </button>
                          
                          <button 
                            onClick={() => addToCart(product)}
                            className="px-3.5 py-2 bg-brand-green text-brand-gold hover:bg-brand-gold hover:text-brand-green font-bold text-[13px] uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                          >
                            <Plus size={14} /> Add
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </section>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-brand-green/20 max-w-xl mx-auto px-6 space-y-4">
            <Search size={40} className="mx-auto text-brand-gold opacity-60" />
            <h3 className="font-serif text-xl font-bold text-brand-green">No equipment matching query</h3>
            <p className="text-xs text-gray-500">
              We couldn't find items matching "{searchQuery}". Try searching for terms like "extinguisher", "tourniquet", "headlamp", or "hoodie".
            </p>
            <button
              onClick={() => { setActiveSection('all'); setSearchQuery(''); }}
              className="px-6 py-2.5 bg-brand-green text-brand-gold text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-green/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* 4. INSTITUTIONAL & CORPORATE BULK PROCUREMENT CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
        <div className="bg-brand-green text-white rounded-3xl p-8 md:p-12 border border-brand-gold/30 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-[0.4em]">
              <Package size={14} /> Corporate & School Procurement
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
              Need a Formal <span className="text-brand-gold italic">Proforma Invoice</span> for Bulk Requisition?
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-serif italic leading-relaxed">
              We supply schools, corporate headquarters, safari camps, and NGOs across Kenya with certified DOSHS first aid replenishment, fire extinguisher supply/servicing, and customized corporate team merchandise.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[13px] text-gray-300 pt-2 font-mono">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-brand-gold" /> KRA PIN Registered</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-brand-gold" /> Statutory DOSHS Approval</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-brand-gold" /> Countrywide Courier Delivery</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => handleBulkRFQ()}
              className="px-8 py-3.5 bg-brand-gold text-brand-green font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <FileText size={16} /> Request Official RFQ
            </button>
            <a
              href="https://wa.me/254710974670?text=Hello%20Cross%20Connect%20Africa!%20We%20would%20like%20to%20discuss%20bulk%20procurement%20of%20safety%20gear."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} className="text-[#25D366]" /> Talk to Kevin on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 5. DETAILED PRODUCT SPECIFICATION MODAL */}
      {selectedProduct && (
        <div 
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-green/80 backdrop-blur-md animate-fade-in"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row border border-brand-green/20 relative"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)} 
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-brand-green hover:text-brand-gold text-gray-500 transition-colors shadow-md"
            >
              <X size={18} />
            </button>

            {/* Left Image Showcase */}
            <div className="md:w-1/2 bg-brand-sand/50 relative min-h-[280px] md:min-h-full">
              <div className="absolute inset-0"><ProductVisual key={selectedProduct.id} product={selectedProduct} iconSize={72} /></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/10">
                <span>SKU: {selectedProduct.sku || 'CCA-EQUIP'}</span>
                <span className="text-brand-gold font-bold">{selectedProduct.stockStatus || 'In Stock'}</span>
              </div>
            </div>

            {/* Right Specification Data */}
            <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">
                      {selectedProduct.category}
                    </span>
                    {selectedProduct.certBadge && (
                      <span className="text-xs bg-brand-green/10 text-brand-green font-bold px-2 py-0.5 rounded-md">
                        {selectedProduct.certBadge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-brand-green leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <div className="text-2xl font-serif font-bold text-brand-gold mt-2">
                    {formatPrice(selectedProduct.price)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {selectedProduct.description}
                </p>

                {/* Mission Relevance / Value Prop */}
                <div className="p-3.5 bg-brand-cream/60 rounded-xl border border-brand-green/10 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block">
                    Operational Relevance
                  </span>
                  <p className="text-xs font-serif italic text-brand-green">
                    "{selectedProduct.valueProp}"
                  </p>
                </div>

                {/* Full Technical Specifications List */}
                {selectedProduct.specs && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block">
                      Technical Specifications
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-700 font-sans">
                      {selectedProduct.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-brand-gold shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impact Note if applicable */}
                {selectedProduct.impactLabel && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2 text-amber-800 text-xs font-medium">
                    <Heart size={16} className="text-amber-600 shrink-0" />
                    <span>{selectedProduct.impactLabel}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3.5 bg-brand-green text-brand-gold font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} /> Add to Mission Bag
                </button>
                
                <button
                  onClick={() => handleSingleItemInquiry(selectedProduct)}
                  className="w-full py-2.5 bg-white text-gray-700 hover:text-brand-green font-semibold text-xs border border-gray-200 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={15} className="text-[#25D366]" /> Ask Question on WhatsApp
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 6. MISSION BAG (CART DRAWER) */}
      <div className={`fixed inset-y-0 right-0 z-[100] w-full md:w-[460px] bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-brand-green text-brand-cream">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-gold text-brand-green rounded-lg">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white leading-tight">
                Mission Requisition Bag
              </h2>
              <span className="text-[13px] text-gray-300 font-mono">
                {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)} 
            aria-label="Close cart"
            className="p-2 text-gray-300 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 py-28 space-y-4">
              <ShoppingBag size={48} className="mx-auto opacity-20" />
              <p className="font-serif italic text-base">"Your mission bag is currently empty."</p>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-xs font-bold uppercase tracking-wider text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:text-brand-green transition-colors"
              >
                Browse Equipment Catalog
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 p-3.5 bg-brand-cream/30 rounded-2xl border border-gray-100 relative group">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-sand shrink-0">
                  <ProductVisual product={item} iconSize={14} />
                </div>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-serif font-bold text-brand-green text-sm leading-snug line-clamp-1">
                      {item.name}
                    </h4>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      aria-label="Remove item"
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="text-xs text-gray-400 font-mono">
                    {item.sku || 'CCA-EQUIP'} • {formatPrice(item.price)} each
                  </div>

                  {/* Quantity Modifier */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)} 
                        className="px-2 py-1 text-gray-500 hover:text-brand-green hover:bg-gray-100"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-xs font-bold font-mono px-2 text-center w-6">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)} 
                        className="px-2 py-1 text-gray-500 hover:text-brand-green hover:bg-gray-100"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <span className="font-serif font-bold text-sm text-brand-green">
                      KES {(parseInt(item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-brand-cream/50 space-y-4">
            
            {/* Delivery Note */}
            <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-brand-green/10 text-[13px] text-gray-600">
              <Truck size={16} className="text-brand-gold shrink-0 mt-0.5" />
              <span>
                <strong>Logistics:</strong> Same-day dispatch within Nairobi. Parcel courier delivery countrywide across Kenya via Fargo / G4S / Easy Coach.
              </span>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                Requisition Subtotal
              </span>
              <span className="text-2xl font-serif font-bold text-brand-green">
                KES {cartTotal.toLocaleString()}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} /> Submit Order via WhatsApp
              </button>

              <button 
                onClick={() => handleBulkRFQ('Items in Bag: ' + cart.map(i => i.name).join(', '))}
                className="w-full py-2.5 bg-brand-green text-brand-gold hover:bg-brand-green/90 font-bold uppercase tracking-wider text-xs rounded-xl transition-all border border-brand-gold/30 flex items-center justify-center gap-2"
              >
                <FileText size={14} /> Request Proforma Invoice (PDF)
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Cart Backdrop */}
      {isCartOpen && (
        <div 
          onClick={() => setIsCartOpen(false)} 
          className="fixed inset-0 bg-brand-green/60 z-[90] backdrop-blur-xs transition-opacity"
        ></div>
      )}

    </div>
  );
};

export default Shop;
