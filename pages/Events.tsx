
import React, { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, CheckCircle2, Heart, ShieldPlus, Trees, Star, X, Clock, Info, Zap, Backpack, Utensils, Award, ShieldCheck, HeartHandshake, Footprints } from 'lucide-react';
import { Event } from '../types';

export interface ExtendedEvent extends Event {
  itinerary: { time: string; task: string }[];
  gearList: string[];
  meetingPoint: string;
  categoryType: 'hike' | 'csr' | 'safety' | 'teambuilding' | 'social' | 'gala';
}

export const mockEvents: ExtendedEvent[] = [
  {
    id: '2026-01',
    title: 'New Year Fellowship Meet & Greet',
    date: '2026-01-10', // Saturday
    month: 'Jan',
    location: 'Karura Gardens',
    price: 1800,
    seatsAvailable: 60,
    categoryType: 'social',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000',
    description: 'A relaxed Christian meet-up to start the year. Icebreakers, games, prayer moments, and intentional introductions for young adults and community seekers.',
    gift: 'Vision Card Set',
    includes: ['Transport', 'Mineral Water', 'Professional Facilitators', 'Social Games'],
    addons: [{ name: 'Picnic Basket', price: 1200 }],
    meetingPoint: 'Outside City Market, CBD',
    gearList: ['Casual Wear', 'Sunscreen', 'Outdoor Blanket'],
    itinerary: [
      { time: '09:00', task: 'Assembly at City Market' },
      { time: '10:30', task: 'Vision & Purpose Sync' },
      { time: '12:00', task: 'Fellowship Brunch' },
      { time: '14:30', task: 'Intentional Networking' }
    ]
  },
  {
    id: '2026-02',
    title: 'Stronger Together Team Day',
    date: '2026-02-14', // Saturday
    month: 'Feb',
    location: 'Kijabe Grounds',
    price: 2500,
    seatsAvailable: 45,
    categoryType: 'teambuilding',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000',
    description: 'Faith-based team building with fun challenges, communication games, and fellowship. Ideal for churches, ministries, and professionals.',
    gift: 'Unity Keychain',
    includes: ['Transport', 'Mineral Water', 'Facilitators', 'Team Equipment'],
    addons: [{ name: 'Team T-Shirt', price: 1500 }],
    meetingPoint: 'Outside City Market, CBD',
    gearList: ['Sporty Attire', 'Sneakers', 'Water Bottle'],
    itinerary: [
      { time: '07:00', task: 'Departure from CBD' },
      { time: '10:00', task: 'Synergy Lab Challenges' },
      { time: '13:00', task: 'Community Lunch' },
      { time: '15:00', task: 'Trust-Building Drills' }
    ]
  },
  {
    id: '2026-03',
    title: 'New Paths Fellowship Hike',
    date: '2026-03-14', // Saturday
    month: 'Mar',
    location: 'Kijani Forest',
    price: 2200,
    seatsAvailable: 35,
    categoryType: 'hike',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000',
    description: 'A gentle, well-paced hike focused on vision, purpose, and fellowship. Designed for community, not fitness competition.',
    gift: 'Mission Map',
    includes: ['Transport', 'Mineral Water', 'Guides', 'Facilitation'],
    addons: [{ name: 'Hiker\'s Log', price: 800 }],
    meetingPoint: 'Outside City Market, CBD',
    gearList: ['Hiking Boots', 'Backpack', 'Sun Hat'],
    itinerary: [
      { time: '06:30', task: 'Assembly at City Market' },
      { time: '09:30', task: 'Forest Trail Start' },
      { time: '12:00', task: 'Summit Reflection' },
      { time: '15:00', task: 'Post-Hike De-brief' }
    ]
  },
  {
    id: '2026-04',
    title: 'Love in Action Outreach',
    date: '2026-04-18', // Saturday
    month: 'Apr',
    location: 'Children’s Home',
    price: 2000,
    seatsAvailable: 30,
    categoryType: 'csr',
    image: 'https://i.imgur.com/WBVuUUz.jpeg',
    description: 'A full day of service: games with children, cleaning, mentorship, and prayer. Deeply joyful and impactful Christian service.',
    gift: 'CSR Impact Pin',
    includes: ['Transport', 'Mineral Water', 'Coordination', 'Facilitation'],
    addons: [{ name: 'Donation Pack', price: 1500 }],
    meetingPoint: 'Outside City Market, CBD',
    gearList: ['Service Clothes', 'Comfortable Shoes', 'Open Heart'],
    itinerary: [
      { time: '08:00', task: 'Departure from CBD' },
      { time: '09:30', task: 'Arrival & Play Session' },
      { time: '11:30', task: 'Service & Maintenance' },
      { time: '15:00', task: 'Testimony Sharing' }
    ]
  },
  {
    id: '2026-05',
    title: 'Christian First Aid Day',
    date: '2026-05-16', // Saturday
    month: 'May',
    location: 'Kiboko Safety Grounds',
    price: 2800,
    seatsAvailable: 25,
    categoryType: 'safety',
    image: 'https://i.imgur.com/BRDK6Sj.jpeg',
    description: 'Hands-on first aid training framed around stewardship and service—being ready to help others in the body of Christ.',
    gift: 'Mini First Aid Kit',
    includes: ['Transport', 'Mineral Water', 'Trainers', 'Materials'],
    addons: [{ name: 'Digital Certification', price: 500 }],
    meetingPoint: 'Outside City Market, CBD',
    gearList: ['Comfortable Clothing', 'Notebook', 'Pen'],
    itinerary: [
      { time: '08:00', task: 'Assembly at CBD' },
      { time: '09:30', task: 'Stewardship Theory' },
      { time: '11:00', task: 'Practical First Aid' },
      { time: '14:00', task: 'Evacuation Drills' }
    ]
  },
  {
    id: '2026-12',
    title: 'End-Year Gala Dinner',
    date: '2026-12-19', // Saturday
    month: 'Dec',
    location: 'Elite Lodge Space',
    price: 3500,
    seatsAvailable: 100,
    categoryType: 'gala',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000',
    description: 'A classy, alcohol-free Christian celebration with dinner, music, testimonies, awards, and community bonding.',
    gift: 'CCA Heritage Keepsake',
    includes: ['Transport', 'Full Dinner', 'Venue', 'Facilitation', 'Music'],
    addons: [{ name: 'VIP Seating Upgrade', price: 1500 }],
    meetingPoint: 'Outside City Market, CBD',
    gearList: ['Formal Attire', 'Appreciative Spirit'],
    itinerary: [
      { time: '17:00', task: 'Assembly at CBD for Transfer' },
      { time: '18:00', task: 'Red carpet & Welcome' },
      { time: '19:30', task: 'Gala Dinner' },
      { time: '21:00', task: 'Mission Awards' }
    ]
  }
];

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<ExtendedEvent | null>(null);
  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

  const handleBooking = (event: Event) => {
    const message = `*CROSS CONNECT AFRICA*
*COMMUNITY MISSION BOOKING*
--------------------------------
MISSION: ${event.title}
DATE: ${event.date}
LOCATION: ${event.location}
INVESTMENT: ${formatPrice(event.price)}
--------------------------------
I would like to secure a spot for this mission. Please advise on the next steps for commitment.

_Faith. Fellowship. Service. Adventure._`;
    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
  };

  const pillars = [
    { icon: <Footprints size={24} />, title: 'Purposeful Hikes', desc: 'Limited to 6 intentional trails per year focused on fellowship over fitness.' },
    { icon: <Heart size={24} />, title: 'Charity & CSR', desc: 'Faith in action through outreach, market clean-ups, and children\'s home visits.' },
    { icon: <ShieldPlus size={24} />, title: 'Safety Preparedness', desc: 'Practical training rooted in Christian stewardship and being ready to serve.' },
    { icon: <HeartHandshake size={24} />, title: 'Team Fellowship', desc: 'Strategic meet-ups for churches, chamas, and Christian professionals.' },
    { icon: <Trees size={24} />, title: 'Park Socials', desc: 'Low-pressure joyful gatherings for deep conversation and connection.' },
    { icon: <Star size={24} />, title: 'End-Year Gala', desc: 'Classy, alcohol-free celebrations to honor the mission journey together.' }
  ];

  return (
    <div className="min-h-screen bg-brand-cream pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <header className="mb-24 text-center max-w-4xl mx-auto animate-fade-in-up">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.8em] mb-4 block">Balanced Year Plan 2026</span>
            <h1 className="text-5xl md:text-7xl font-serif text-brand-green font-bold tracking-tighter italic leading-none mb-8">Faith. Fellowship. <br/><span className="not-italic text-brand-gold">Service. Adventure.</span></h1>
            <p className="text-gray-400 font-serif italic text-xl opacity-80 leading-relaxed mb-12">
              "We are not a hiking club. We are a Christian community platform that uses intentional experiences to build connection, character, and kingdom impact."
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-green">
                <span className="bg-brand-sand px-4 py-2 border border-brand-green/5">Alcohol-Free</span>
                <span className="bg-brand-sand px-4 py-2 border border-brand-green/5">Christ-Centered</span>
                <span className="bg-brand-sand px-4 py-2 border border-brand-green/5">Purpose-Driven</span>
            </div>
        </header>

        {/* PILLARS GRID */}
        <section className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-green/10 border border-brand-green/5">
                {pillars.map((p, i) => (
                    <div key={i} className="bg-white p-10 space-y-4 hover:bg-brand-sand/50 transition-colors">
                        <div className="text-brand-gold">{p.icon}</div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-green">{p.title}</h3>
                        <p className="text-gray-400 text-xs font-serif italic leading-relaxed">{p.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* EXPEDITION BOARD */}
        <section className="mb-32">
            <div className="flex justify-between items-end mb-12">
                <div>
                   <span className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.4em] block mb-2">Operational Docket</span>
                   <h2 className="text-4xl font-serif font-bold text-brand-green tracking-tighter italic">The Mission <span className="not-italic text-brand-gold">Board.</span></h2>
                </div>
                <p className="text-gray-400 text-xs font-serif italic hidden md:block">Select a pass to view mission parameters.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mockEvents.map(event => (
                <div 
                  key={event.id} 
                  onClick={() => setSelectedEvent(event)}
                  className="relative group bg-white flex flex-col md:flex-row border border-gray-100 overflow-hidden cursor-pointer transition-all hover:shadow-[0_40px_100px_rgba(0,0,0,0.04)] hover:-translate-y-1"
                >
                  {/* TICKET STUB */}
                  <div className={`w-full md:w-28 flex flex-col justify-center items-center text-center border-r-2 border-dashed border-gray-100 p-6 ${
                    event.categoryType === 'hike' ? 'bg-brand-green text-brand-gold' :
                    event.categoryType === 'csr' ? 'bg-brand-gold text-white' :
                    event.categoryType === 'safety' ? 'bg-red-900 text-white' :
                    'bg-brand-sand text-brand-green'
                  }`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">{event.month}</span>
                    <div className="text-4xl font-serif font-bold leading-none">{event.date.split('-')[2]}</div>
                  </div>

                  {/* TICKET BODY */}
                  <div className="flex-grow p-8 flex flex-col justify-between bg-white paper-texture relative">
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                           <div className="flex items-center gap-2 text-brand-gold text-[8px] font-bold uppercase tracking-[0.4em]">
                              <MapPin size={10} /> {event.location}
                           </div>
                           <span className="text-brand-green font-serif font-bold text-lg italic">{formatPrice(event.price)}</span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-brand-green tracking-tighter group-hover:text-brand-gold transition-colors">{event.title}</h3>
                        <p className="text-gray-400 font-serif italic text-xs leading-relaxed line-clamp-2 opacity-80">"{event.description}"</p>
                    </div>

                    <div className="pt-6 flex justify-between items-center border-t border-gray-50 mt-4">
                        <div className="flex items-center gap-2 text-gray-300 text-[8px] font-bold uppercase tracking-widest">
                           <Users size={10} /> Community Size: {event.seatsAvailable}
                        </div>
                        <div className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.4em] flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                           View Mission Detail <ArrowRight size={12} />
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </section>

        {/* MODAL */}
        {selectedEvent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-green/95 backdrop-blur-md animate-fade-in-up">
                <div className="bg-white rounded-none shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto paper-texture border border-white/10 relative">
                    <button 
                      onClick={() => setSelectedEvent(null)} 
                      className="absolute top-6 right-6 z-[110] p-2 bg-brand-gold text-brand-green rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <X size={24} />
                    </button>

                    <div className="relative h-60 md:h-80">
                        <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover grayscale brightness-75" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.6em] mb-2 block">Mission Directive</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tighter italic leading-none">{selectedEvent.title}</h2>
                        </div>
                    </div>
                    
                    <div className="p-8 md:p-12 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">Mission Focus</h3>
                                    <p className="text-gray-500 font-serif italic text-lg leading-relaxed">"{selectedEvent.description}"</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] border-b border-gray-100 pb-3 mb-2 flex items-center gap-2"><Clock size={14}/> Operational Log</h3>
                                    <div className="space-y-3">
                                        {selectedEvent.itinerary.map((step, i) => (
                                            <div key={i} className="flex gap-4 border-l-2 border-brand-gold/20 pl-4 py-1">
                                                <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest">{step.time}</span>
                                                <span className="text-xs font-serif italic text-brand-green">{step.task}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="bg-brand-sand/50 p-6 space-y-6">
                                    <h3 className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] border-b border-brand-green/10 pb-3 flex items-center gap-2">Investment Covers</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {selectedEvent.includes.map((inc, i) => (
                                            <div key={i} className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-brand-green">
                                                <CheckCircle2 size={12} className="text-brand-gold shrink-0"/> {inc}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-brand-green text-brand-gold p-6 flex items-center gap-4 relative overflow-hidden">
                                    <div className="absolute -right-4 -bottom-4 opacity-5"><Award size={80}/></div>
                                    <Award size={24} className="shrink-0" />
                                    <div>
                                        <span className="text-[8px] font-bold uppercase tracking-widest block opacity-60">Mission Token</span>
                                        <p className="text-[10px] font-bold uppercase italic">{selectedEvent.gift}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                             <div className="text-center md:text-left">
                                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Pass Investment</span>
                                <div className="text-4xl font-serif font-bold text-brand-green">{formatPrice(selectedEvent.price)}</div>
                             </div>
                             <button 
                                onClick={() => handleBooking(selectedEvent)}
                                className="w-full md:w-auto bg-brand-green text-brand-gold px-12 py-5 font-bold uppercase tracking-[0.5em] text-[10px] shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-4"
                             >
                                SECURE MISSION PASS <ArrowRight size={18} />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Events;
