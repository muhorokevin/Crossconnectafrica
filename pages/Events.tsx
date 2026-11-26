import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
  MapPin,
  ShieldPlus,
  Tent,
  Users,
  X
} from 'lucide-react';
import { Event } from '../types';
import olOlokweImg from '../src/assets/images/event_ol_olokwe_hike_1794913426684.jpg';
import chyuluHillsImg from '../src/assets/images/event_chyulu_hills_hike_1794913426119.jpg';
import ndotoCampImg from '../src/assets/images/event_ndoto_camp_1794913426832.jpg';
import taitaCampImg from '../src/assets/images/event_taita_ridge_camp_1794913429805.jpg';

export type EventCategory = 'fire_safety' | 'first_aid' | 'hike' | 'camping';

export interface ExtendedEvent extends Event {
  county: string;
  durationLabel: string;
  difficultyOrLevel: string;
  categoryType: EventCategory;
  featured?: boolean;
  itinerary: { time: string; task: string }[];
  gearList: string[];
  meetingPoint: string;
}

const CATEGORY_TABS: { id: 'all' | EventCategory; label: string }[] = [
  { id: 'all', label: 'All Events' },
  { id: 'fire_safety', label: 'Fire Safety Training' },
  { id: 'first_aid', label: 'First Aid Training' },
  { id: 'hike', label: 'Uncommon Hikes' },
  { id: 'camping', label: 'Wilderness Camping' }
];

const CATEGORY_LABEL: Record<EventCategory, string> = {
  fire_safety: 'Fire Safety Training',
  first_aid: 'First Aid Training',
  hike: 'Uncommon Hike',
  camping: 'Wilderness Camping'
};

export const mockEvents: ExtendedEvent[] = [
  {
    id: '2026-ol-olokwe',
    title: 'Mount Ol Olokwe Sacred Tabletop Hike',
    date: '2027-01-16',
    month: 'Jan',
    location: 'Ol Olokwe Summit Ridge',
    county: 'Samburu County',
    durationLabel: '2 Days · 1 Night Trail',
    difficultyOrLevel: 'Moderate Ridge Ascent · 2,000m',
    price: 12000,
    seatsAvailable: 24,
    categoryType: 'hike',
    featured: true,
    image: olOlokweImg,
    description:
      'Step off the usual city circuit onto Samburu’s sacred sheer granite massif. Ascend ancient stone ledges past cliff-dwelling eagles to a cool cedar and cycad plateau overlooking the Mathews Range.',
    gift: 'Ol Olokwe Topographic Field Map',
    includes: [
      'Return overland transport from Nairobi',
      'Licensed wilderness guides & certified EMT medic',
      'Samburu community conservancy & ranger fees',
      'Hot trail meals, purified water & briefing pack'
    ],
    addons: [{ name: 'Trekking Poles Rental', price: 800 }],
    meetingPoint: 'Kencom / Nairobi CBD 05:30 Departure',
    gearList: ['High-traction hiking boots', '3L hydration pack', 'Sun hat & windshell', 'Headlamp'],
    itinerary: [
      { time: 'Day 1 · 05:30', task: 'Nairobi departure northbound via Isiolo into Samburu plains' },
      { time: 'Day 1 · 13:30', task: 'Conservancy briefing & lower granite boulder approach' },
      { time: 'Day 2 · 05:45', task: 'Sunrise summit push across the cycad plateau rim' },
      { time: 'Day 2 · 12:30', task: 'Guided descent, community lunch & Nairobi return' }
    ]
  },
  {
    id: '2026-fire-naivasha',
    title: 'Live Fire Safety & Warden Certification',
    date: '2026-12-05',
    month: 'Dec',
    location: 'Crescent Training Grounds, Naivasha',
    county: 'Nakuru County',
    durationLabel: '1 Full Day',
    difficultyOrLevel: 'DOSHS Practical Certification',
    price: 5500,
    seatsAvailable: 20,
    categoryType: 'fire_safety',
    image: 'https://i.imgur.com/NLpqywt.jpg',
    description:
      'Hands-on live fire suppression, fire marshal command, smoke-room evacuation drills, and Class A/B/C/Electrical extinguisher mastery for HR teams, schools, churches, and individuals.',
    gift: 'Fire Marshal Reference Card',
    includes: [
      'Live controlled fire tray & CO2 / DCP extinguisher drills',
      'Smoke evacuation & assembly point simulation',
      'Completion certificate & safety checklist manual',
      'Morning tea, lunch & drinking water'
    ],
    addons: [{ name: 'Personal Fire Blanket (1.2m × 1.2m)', price: 3200 }],
    meetingPoint: 'Naivasha Training Yard, 08:30 AM',
    gearList: ['Closed leather/work shoes', 'Cotton long-sleeve clothing', 'Notebook'],
    itinerary: [
      { time: '08:30', task: 'Fire triangle science, classes of fire & hazard spotting' },
      { time: '10:30', task: 'PASS extinguisher drill on live controlled fuel pans' },
      { time: '13:30', task: 'Evacuation warden sweep & incident command simulation' },
      { time: '16:00', task: 'Practical assessment & certification debrief' }
    ]
  },
  {
    id: '2026-firstaid-nanyuki',
    title: 'Wilderness & Workplace First Aid + CPR',
    date: '2026-12-12',
    month: 'Dec',
    location: 'Ol Pejeta Corridor Field Hub, Nanyuki',
    county: 'Laikipia County',
    durationLabel: '1 Full Day',
    difficultyOrLevel: 'Hands-On Trauma & AED',
    price: 4800,
    seatsAvailable: 22,
    categoryType: 'first_aid',
    image: 'https://i.imgur.com/BRDK6Sj.jpeg',
    description:
      'Practical trauma management designed for Kenyan roads, workplaces, and remote trails: tourniquets, severe bleed packing, burn care, fracture splinting, choking response, and adult/child CPR + AED.',
    gift: 'Pocket CPR Resuscitation Shield',
    includes: [
      'High-realism bleeding control & CPR manikin stations',
      'Certified EMT & first aid instructor facilitation',
      'Course handbook & digital responder certificate',
      'Full-day refreshments & hot lunch'
    ],
    addons: [{ name: 'Personal Trauma & First Aid Kit', price: 3500 }],
    meetingPoint: 'Nanyuki Field Centre, 08:30 AM',
    gearList: ['Comfortable athletic attire', 'Closed flat shoes', 'Pen & notebook'],
    itinerary: [
      { time: '08:30', task: 'Primary survey (DRABC), scene safety & emergency triage' },
      { time: '11:00', task: 'Adult, child & infant CPR + AED shock protocols' },
      { time: '14:00', task: 'Catastrophic bleed control, burns, bites & splinting' },
      { time: '16:15', task: 'Timed scenario drill & certificate handover' }
    ]
  },
  {
    id: '2026-chyulu-ridge',
    title: 'Chyulu Hills Cloud Forest & Lava Caves',
    date: '2027-02-13',
    month: 'Feb',
    location: 'Chyulu Volcanic Crest',
    county: 'Makueni / Tsavo Border',
    durationLabel: '1 Full Day',
    difficultyOrLevel: 'Challenging Ridge · 18 km',
    price: 4200,
    seatsAvailable: 28,
    categoryType: 'hike',
    image: chyuluHillsImg,
    description:
      'Walk the emerald volcanic ridgelines Hemingway called the Green Hills of Africa—gliding between mist-soaked ancient forest pockets, sunken volcanic craters, and distant Kilimanjaro panoramas.',
    gift: 'Trail Stewardship Patch',
    includes: [
      'Transport from Nairobi to Kibwezi–Chyulu trailhead',
      'KWS ranger escort, trail guides & lead EMT',
      'Conservation & trail access permits',
      'Trail energy pack & purified hydration refills'
    ],
    addons: [{ name: 'Gaiters & Glove Kit', price: 1200 }],
    meetingPoint: 'Nairobi CBD 05:00 Departure',
    gearList: ['Broken-in trail boots', 'Rain shell', 'Sunscreen', '2.5L water'],
    itinerary: [
      { time: '05:00', task: 'Departure from Nairobi along Mombasa Highway' },
      { time: '09:00', task: 'Trailhead safety check & volcanic cone climb start' },
      { time: '12:30', task: 'Cloud forest crest reflection & Kilimanjaro lookout' },
      { time: '16:00', task: 'Descent traverse & evening return to Nairobi' }
    ]
  },
  {
    id: '2026-ndoto-camp',
    title: 'Ndoto Mountains Wilderness Gorge Camp',
    date: '2027-03-19',
    month: 'Mar',
    location: 'Latakweny Valley & Granite Peaks',
    county: 'Samburu North',
    durationLabel: '3 Days · 2 Nights Camp',
    difficultyOrLevel: 'Remote Overland Expedition',
    price: 22500,
    seatsAvailable: 16,
    categoryType: 'camping',
    image: ndotoCampImg,
    description:
      'Far north of the tourist trails lies Kenya’s hidden granite wonderland. Pitch camp beside crystal mountain pools fed by forest springs, hike untouched granite spires, and gather around desert-sky campfires.',
    gift: 'Expedition Journal & Compass Tag',
    includes: [
      'Overland 4x4 expedition transport & camp logistics',
      'Expedition dome tents, foam mats & camp lighting',
      'Full camp kitchen (breakfast, trail lunch & fire-cooked dinners)',
      'Local Samburu trackers, lead guide & EMT medic standby'
    ],
    addons: [{ name: '4-Season Sleeping Bag Hire', price: 2500 }],
    meetingPoint: 'Nairobi CBD 04:30 Expedition Convoy',
    gearList: ['Layered camp wear', 'River sandals', 'Hiking boots', 'Headlamp & power bank'],
    itinerary: [
      { time: 'Day 1', task: 'Overland drive past Laisamis into Latakweny granite valley & camp setup' },
      { time: 'Day 2', task: 'Dawn gorge climb, crystal rock-pool plunge & evening leadership fire' },
      { time: 'Day 3', task: 'Morning valley walk, break camp & return southbound' }
    ]
  },
  {
    id: '2026-fire-diani',
    title: 'Coastal Fire Safety & Resort Evacuation Lab',
    date: '2027-01-30',
    month: 'Jan',
    location: 'South Coast Training Compound, Diani',
    county: 'Kwale County',
    durationLabel: '1 Full Day',
    difficultyOrLevel: 'Hospitality & Logistics Track',
    price: 5800,
    seatsAvailable: 25,
    categoryType: 'fire_safety',
    image: 'https://i.imgur.com/NLpqywt.jpg',
    description:
      'Tailored for coastal hotels, schools, warehouses, and offices. Covers kitchen grease fires, electrical panel isolation, hose reel deployment, and rapid guest evacuation protocols.',
    gift: 'Hospitality Fire Checklist Pack',
    includes: [
      'Kitchen blanket & foam/CO2 extinguisher live drills',
      'Hose reel pressure handling & assembly coordination',
      'Accredited safety workshop certificate',
      'Meals & hydration throughout the day'
    ],
    addons: [{ name: 'Dry Powder Extinguisher Service Check', price: 1500 }],
    meetingPoint: 'Diani Beach Road Training Ground, 08:30 AM',
    gearList: ['Closed safety/work shoes', 'Breathable work attire', 'Notebook'],
    itinerary: [
      { time: '08:30', task: 'Coastal hospitality & warehouse fire hazard audit' },
      { time: '11:00', task: 'Kitchen oil fire blanket smothering & extinguisher drill' },
      { time: '14:00', task: 'Full building evacuation sweep & roll-call management' },
      { time: '16:00', task: 'Debrief, gaps report & certification' }
    ]
  },
  {
    id: '2026-firstaid-kisumu',
    title: 'Lake Region First Aid, Choking & CPR Course',
    date: '2027-02-27',
    month: 'Feb',
    location: 'Dunga Lakeside Training Centre',
    county: 'Kisumu County',
    durationLabel: '1 Full Day',
    difficultyOrLevel: 'Certified Responder Training',
    price: 4500,
    seatsAvailable: 24,
    categoryType: 'first_aid',
    image: 'https://i.imgur.com/dXyQVwQ.jpeg',
    description:
      'Practical lifesaving skills for Western Kenya schools, churches, boats, and offices—covering drowning resuscitation, heatstroke, snakebite protocol, CPR, and mass casualty triage.',
    gift: 'Waterproof First Aid Quick-Guide',
    includes: [
      'AED trainer & resuscitation manikin practicals',
      'Drowning, shock & snakebite emergency protocols',
      'Certified training pack & attendance credentials',
      'Tea breaks & lakeside buffet lunch'
    ],
    addons: [{ name: 'Compact Boat & Vehicle First Aid Kit', price: 5000 }],
    meetingPoint: 'Kisumu Lakeside Centre, 08:30 AM',
    gearList: ['Comfortable clothes', 'Closed shoes', 'Water bottle'],
    itinerary: [
      { time: '08:30', task: 'Scene assessment, airway recovery & choking relief' },
      { time: '11:15', task: 'CPR + drowning response & AED operation' },
      { time: '14:00', task: 'Snakebite, fracture immobilisation & trauma scenarios' },
      { time: '16:00', task: 'Final skills sign-off & certification' }
    ]
  },
  {
    id: '2026-taita-camp',
    title: 'Taita Hills Cloud Canopy & Mbololo Ridge Camp',
    date: '2027-04-16',
    month: 'Apr',
    location: 'Ngangao & Mbololo Forest Ridge',
    county: 'Taita Taveta County',
    durationLabel: '2 Days · 1 Night Camp',
    difficultyOrLevel: 'Highland Forest Camp · 2,200m',
    price: 14500,
    seatsAvailable: 20,
    categoryType: 'camping',
    image: taitaCampImg,
    description:
      'Camp beneath ancient moss-draped podo trees high above the Tsavo plains in Kenya’s oldest Eastern Arc cloud forest. Wake above a sea of morning mist before trekking hidden granite viewpoints.',
    gift: 'Eastern Arc Conservation Map',
    includes: [
      'Return transport (SGR Voi pickup option or Nairobi coach)',
      'Alpine two-person tents, sleeping pads & camp meals',
      'Indigenous forest guides, conservation permits & EMT medic',
      'Guided dawn canopy hike to Wesu & Mbololo ridges'
    ],
    addons: [{ name: 'Thermal Camp Fleece Pack', price: 1800 }],
    meetingPoint: 'Nairobi CBD 06:00 or Voi SGR Station 10:30',
    gearList: ['Warm fleece (nights drop to 10°C)', 'Waterproof jacket', 'Trail boots', 'Torch'],
    itinerary: [
      { time: 'Day 1 · Morning', task: 'Journey to Wundanyi & ascend to Ngangao forest clearing' },
      { time: 'Day 1 · Evening', task: 'Sunset outcrop walk & fireside fellowship dinner' },
      { time: 'Day 2 · Dawn', task: 'Mist-valley sunrise ridge trek & Voi / Nairobi return' }
    ]
  }
];

const Events: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | EventCategory>('all');
  const [selectedEvent, setSelectedEvent] = useState<ExtendedEvent | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

  const featuredEvent = useMemo(
    () => mockEvents.find((ev) => ev.featured) || mockEvents[0],
    []
  );

  const filteredEvents = useMemo(() => {
    if (activeCategory === 'all') return mockEvents;
    return mockEvents.filter((ev) => ev.categoryType === activeCategory);
  }, [activeCategory]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleBooking = (event: ExtendedEvent) => {
    const message = `*CROSS CONNECT AFRICA — EVENT & TRAINING BOOKING*
Event: ${event.title}
Category: ${CATEGORY_LABEL[event.categoryType]}
Location: ${event.location}, ${event.county}
Date: ${event.date}
Rate: ${formatPrice(event.price)} per person

Hello! I would like to book a spot or inquire about a group booking for this event.`;
    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getCategoryIcon = (cat: EventCategory) => {
    switch (cat) {
      case 'fire_safety':
        return <Flame size={15} className="text-brand-gold shrink-0" />;
      case 'first_aid':
        return <ShieldPlus size={15} className="text-brand-gold shrink-0" />;
      case 'hike':
        return <Compass size={15} className="text-brand-gold shrink-0" />;
      case 'camping':
        return <Tent size={15} className="text-brand-gold shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-28 md:pt-36 pb-24 text-brand-green">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-16">

        {/* 1. EDITORIAL HEADER */}
        <header className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs text-brand-gold font-bold uppercase tracking-[0.25em]">
            <span>Upcoming Nationwide Calendar</span>
            <span aria-hidden="true">·</span>
            <span>Training &amp; Expeditions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-green leading-[1.08] tracking-tight text-balance">
            Hands-On Safety Trainings &amp; <span className="italic text-brand-gold font-normal">Uncommon Kenyan Expeditions.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
            Certified fire safety and first aid courses paired with guided hikes and wilderness camps across Kenya’s hidden ridges, forests, and northern valleys.
          </p>
        </header>

        {/* 2. FEATURED SPOTLIGHT (DOMINANT ANCHOR) */}
        <section aria-label="Featured upcoming expedition">
          <div
            onClick={() => setSelectedEvent(featuredEvent)}
            className="bg-white rounded-3xl border border-brand-green/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer group hover:border-brand-gold/60 transition-colors"
          >
            <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[380px] bg-brand-green overflow-hidden">
              {!failedImages[`feat-${featuredEvent.id}`] ? (
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(`feat-${featuredEvent.id}`)}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-green to-emerald-950 text-brand-cream p-8 text-center">
                  <Compass size={36} className="text-brand-gold mb-3" />
                  <p className="font-serif text-xl">{featuredEvent.title}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-brand-gold">
                  <span>Featured Expedition</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredEvent.county}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredEvent.durationLabel}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-green leading-snug group-hover:text-brand-gold transition-colors">
                  {featuredEvent.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {featuredEvent.description}
                </p>

                <div className="pt-2 space-y-2 text-xs text-gray-700 border-t border-brand-green/10">
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-500">Departure Date</span>
                    <span className="font-semibold tabular-nums">{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Terrain / Level</span>
                    <span className="font-semibold">{featuredEvent.difficultyOrLevel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Open Spots</span>
                    <span className="font-semibold tabular-nums">{featuredEvent.seatsAvailable} seats</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-green/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[13px] text-gray-500 block">Per Person</span>
                  <span className="text-2xl font-serif font-bold text-brand-green tabular-nums">
                    {formatPrice(featuredEvent.price)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(featuredEvent);
                  }}
                  className="px-5 py-3 bg-brand-green text-brand-gold text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-gold hover:text-brand-green transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>View Brief</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FILTER BAR & EVENTS GRID */}
        <section className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-brand-green/10 pb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-green">
                Upcoming Calendar Across Kenya
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Filter by Fire Safety, First Aid, Uncommon Hikes, or Wilderness Camps across 7 Kenyan counties.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-brand-sand/80 rounded-xl border border-brand-green/10">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                      isActive
                        ? 'bg-brand-green text-brand-gold shadow-xs'
                        : 'text-brand-green/80 hover:text-brand-green hover:bg-white/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-2xl border border-brand-green/10 overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-brand-gold/60 transition-colors"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-brand-green overflow-hidden">
                    {!failedImages[event.id] ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(event.id)}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-green to-emerald-950 text-brand-cream p-6 text-center">
                        {getCategoryIcon(event.categoryType)}
                        <p className="font-serif text-base mt-2">{event.title}</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white font-medium">
                      <span className="flex items-center gap-1.5">
                        {getCategoryIcon(event.categoryType)}
                        <span>{CATEGORY_LABEL[event.categoryType]}</span>
                      </span>
                      <span className="tabular-nums">{event.month} {event.date.split('-')[2]}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                      <span>{event.county}</span>
                      <span aria-hidden="true">·</span>
                      <span>{event.durationLabel}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-brand-green leading-snug group-hover:text-brand-gold transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-brand-green/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[13px] text-gray-500 block">Investment</span>
                    <span className="text-lg font-serif font-bold text-brand-green tabular-nums">
                      {formatPrice(event.price)}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-brand-green group-hover:text-brand-gold flex items-center gap-1.5 whitespace-nowrap shrink-0">
                    <span>Inspect Details</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. GROUP & NATIONWIDE DEPLOYMENT STRIP */}
        <section className="bg-brand-green text-white rounded-3xl p-8 md:p-10 border border-brand-gold/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs text-brand-gold font-bold uppercase tracking-[0.2em] block">
              Private &amp; Corporate Cohorts
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Planning a Private Team Training or Expedition Anywhere in Kenya?
            </h2>
            <p className="text-xs md:text-sm text-brand-cream/80 leading-relaxed">
              We run dedicated Fire Safety, First Aid, Wilderness Camps, and Team Building sessions at your facility or custom destinations nationwide.
            </p>
          </div>
          <a
            href={`https://wa.me/254710974670?text=${encodeURIComponent(
              'Hello Cross Connect Africa, we would like to organise a private training or expedition for our group.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-brand-gold text-brand-green text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Book Group Session</span>
            <ArrowRight size={15} />
          </a>
        </section>
      </div>

      {/* EVENT / TRAINING DETAIL MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-green/90 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-brand-green/10 relative"
          >
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event details"
              className="absolute top-5 right-5 z-[110] p-2.5 bg-brand-gold text-brand-green rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <X size={20} />
            </button>

            <div className="relative h-64 md:h-80 bg-brand-green">
              {!failedImages[`modal-${selectedEvent.id}`] ? (
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(`modal-${selectedEvent.id}`)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-green text-brand-gold">
                  {getCategoryIcon(selectedEvent.categoryType)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-brand-gold font-medium">
                  <span>{CATEGORY_LABEL[selectedEvent.categoryType]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedEvent.county}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedEvent.durationLabel}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight">
                  {selectedEvent.title}
                </h2>
              </div>
            </div>

            <div className="p-6 md:p-10 space-y-8">
              {/* Key Fact Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-gray-100 text-xs">
                <div>
                  <span className="text-gray-500 block">Date</span>
                  <span className="font-semibold text-brand-green flex items-center gap-1.5 mt-0.5 tabular-nums">
                    <Calendar size={13} className="text-brand-gold" /> {selectedEvent.date}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Location</span>
                  <span className="font-semibold text-brand-green flex items-center gap-1.5 mt-0.5">
                    <MapPin size={13} className="text-brand-gold shrink-0" /> {selectedEvent.location}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Meeting Point</span>
                  <span className="font-semibold text-brand-green mt-0.5 block">
                    {selectedEvent.meetingPoint}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Capacity</span>
                  <span className="font-semibold text-brand-green flex items-center gap-1.5 mt-0.5 tabular-nums">
                    <Users size={13} className="text-brand-gold" /> {selectedEvent.seatsAvailable} spaces
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-2">
                      Overview
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-3 flex items-center gap-1.5">
                      <Clock size={14} /> Schedule &amp; Run-of-Show
                    </h3>
                    <div className="space-y-3 border-t border-gray-100 pt-3">
                      {selectedEvent.itinerary.map((step, i) => (
                        <div key={i} className="flex gap-4 text-xs">
                          <span className="font-semibold text-brand-gold whitespace-nowrap min-w-[96px] tabular-nums">
                            {step.time}
                          </span>
                          <span className="text-gray-700">{step.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-brand-sand/50 p-6 rounded-2xl border border-brand-green/10 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                      Included in Investment
                    </h3>
                    <ul className="space-y-2.5">
                      {selectedEvent.includes.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-brand-green">
                          <CheckCircle2 size={14} className="text-brand-gold shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-brand-cream/60 p-6 rounded-2xl border border-brand-green/10 space-y-2.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                      What to Bring
                    </h3>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {selectedEvent.gearList.join(' · ')}
                    </p>
                    <p className="text-xs text-brand-green font-medium pt-1">
                      Complimentary take-home: {selectedEvent.gift}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-gray-500 block">Per Person Fee</span>
                  <div className="text-3xl font-serif font-bold text-brand-green tabular-nums">
                    {formatPrice(selectedEvent.price)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleBooking(selectedEvent)}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-green text-brand-gold text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-gold hover:text-brand-green transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Reserve Seat on WhatsApp</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
