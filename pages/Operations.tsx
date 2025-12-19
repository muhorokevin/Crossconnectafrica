
import React from 'react';
import { ShoppingCart, ShieldCheck, Mountain, Briefcase, Heart, Camera, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

const inventoryGroups = [
  {
    title: "1. Core Safety & Medical (The Priority)",
    icon: <ShieldCheck className="text-brand-gold" />,
    description: "Essential for 'Safety & Training' services and high-risk expeditions.",
    items: [
      { name: "Trauma-Grade First Aid Kits", spec: "Individual & Group sizes (Red Cross Standard)", price: "KES 15k-30k" },
      { name: "Adult & Infant CPR Manikins", spec: "For training sessions (Feedback enabled)", price: "KES 45k+" },
      { name: "VHF/UHF Walkie Talkies", spec: "Long-range for mountain expeditions", price: "KES 20k pair" },
      { name: "Training Fire Extinguishers", spec: "CO2 & Water (Refillable for drills)", price: "KES 5k/unit" },
      { name: "Wilderness Stretcher (Litter)", spec: "Foldable, lightweight for remote rescue", price: "KES 12k" },
    ]
  },
  {
    title: "2. Adventure & Survival Gear",
    icon: <Mountain className="text-brand-gold" />,
    description: "Equipment for 'Survival Camps' and 'Guided Wilderness Hikes'.",
    items: [
      { name: "Canvas Safari Tents", spec: "4-Person, Weather-proof, Heavy Duty", price: "KES 25k/tent" },
      { name: "Camping Bedrolls & High-Density Mats", spec: "Comfort focused for premium guests", price: "KES 4k/unit" },
      { name: "Multi-fuel Expedition Stoves", spec: "MSR or similar for reliable cooking", price: "KES 8k/unit" },
      { name: "Survival Toolkits", spec: "Ferro rods, bushcraft knives, paracord", price: "KES 5k/set" },
      { name: "Solar Lanterns & Headlamps", spec: "Waterproof, rechargeable", price: "KES 2.5k/unit" },
    ]
  },
  {
    title: "3. Corporate & Team Building Props",
    icon: <Briefcase className="text-brand-gold" />,
    description: "Interaction tools for 'Corporate Excellence' retreats.",
    items: [
      { name: "Professional Mobile PA System", spec: "Battery powered for outdoor use", price: "KES 35k+" },
      { name: "Heavy Duty Ropes & Tarps", spec: "For low-ropes challenges", price: "KES 15k set" },
      { name: "Team Identity Kits", spec: "Colored bandanas, bibs, and flags", price: "KES 10k set" },
      { name: "Psychometric Tool Licenses", spec: "Digital access for strategic debriefs", price: "Per Participant" },
      { name: "Giant 'Jenga' & Wooden Puzzles", spec: "Custom CCA branded wood", price: "KES 8k set" },
    ]
  },
  {
    title: "4. Mentorship & Faith Materials",
    icon: <Heart className="text-brand-gold" />,
    description: "Printed and physical assets for 'Boy-to-Men' and 'Spiritual Retreats'.",
    items: [
      { name: "Bespoke Leather Journals", spec: "Gold-embossed with CCA Logo", price: "KES 1.5k/unit" },
      { name: "High-Grade Archival Workbooks", spec: "Matte finish, custom curriculum", price: "KES 500/unit" },
      { name: "Portable Projector & Screen", spec: "For evening campfire teachings", price: "KES 25k" },
      { name: "Ceremonial 'Rites' Tokens", spec: "Engraved coins or wooden shields", price: "KES 1k/unit" },
    ]
  },
  {
    title: "5. Branding & High-End Logistics",
    icon: <Zap className="text-brand-gold" />,
    description: "Maintaining the 'Rugged Refinement' aesthetic across all touchpoints.",
    items: [
      { name: "Premium Staff Uniforms", spec: "Tactical Green Polos & Safari Hats", price: "KES 4k/set" },
      { name: "Branded Vehicle Decals", spec: "Magnetic or Vinyl for expedition cars", price: "KES 15k" },
      { name: "Pop-up 'Concierge' Tent", spec: "Branded emerald green check-in station", price: "KES 18k" },
      { name: "Stainless Steel Welcome Flasks", spec: "Branded for guest arrival tea", price: "KES 2.5k/unit" },
    ]
  }
];

const Operations: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-16 border-b border-brand-green/10 pb-12">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Strategic Procurement</span>
            <h1 className="text-5xl md:text-7xl font-serif text-brand-green font-medium leading-[0.9] mb-6">
                Operations <br/><span className="italic font-light">Inventory</span>
            </h1>
            <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
                To achieve "Rugged Refinement," every item purchased must balance extreme durability with high-end aesthetic appeal. Avoid bright plastics; favor canvas, steel, and treated wood.
            </p>
        </div>

        {/* The List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {inventoryGroups.map((group, idx) => (
                <div key={idx} className="bg-white p-8 border border-brand-green/5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        {React.cloneElement(group.icon as React.ReactElement, { size: 120 })}
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            {React.cloneElement(group.icon as React.ReactElement, { size: 24 })}
                            <h2 className="text-2xl font-serif font-bold text-brand-green">{group.title}</h2>
                        </div>
                        <p className="text-gray-400 text-sm mb-8 font-medium italic">{group.description}</p>
                        
                        <div className="space-y-6">
                            {group.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-start gap-4 border-b border-gray-50 pb-4 last:border-0">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-brand-green text-sm flex items-center gap-2">
                                            <CheckCircle2 size={14} className="text-brand-gold" /> {item.name}
                                        </h4>
                                        <p className="text-gray-500 text-xs mt-1">{item.spec}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-gray-300 uppercase block mb-1">Est. Cost</span>
                                        <span className="font-mono text-xs font-bold text-brand-green bg-brand-sand px-2 py-1">{item.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Visual Documentation Tip */}
            <div className="bg-brand-green p-10 text-white flex flex-col justify-between rounded-sm">
                <div>
                    <Camera size={32} className="text-brand-gold mb-6" />
                    <h3 className="text-3xl font-serif font-bold mb-4">The Golden Rule</h3>
                    <p className="text-gray-300 leading-relaxed">
                        "If it's visible to the client, it must be branded. If it's used for safety, it must be new. If it's used for comfort, it must be premium."
                    </p>
                </div>
                <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8">
                    <AlertCircle size={20} className="text-brand-gold" />
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest leading-relaxed">
                        Always procure from certified Kenyan suppliers to ensure warranty and local support.
                    </p>
                </div>
            </div>
        </div>

        {/* Action Call */}
        <div className="mt-20 bg-brand-gold/10 p-12 text-center border-2 border-dashed border-brand-gold/30">
            <h2 className="text-3xl font-serif text-brand-green font-bold mb-4">Ready to Stock Up?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">This list is a living document. As programs scale, update the specifications to match your group size limits.</p>
            <button 
                onClick={() => window.print()}
                className="px-8 py-3 bg-brand-green text-white font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors flex items-center gap-2 mx-auto"
            >
                <Zap size={18} /> Print Shopping List
            </button>
        </div>

      </div>
    </div>
  );
};

export default Operations;
