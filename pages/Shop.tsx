
import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, MessageCircle, ChevronRight, Search, Heart, ShieldCheck, Tag, Ticket, ArrowRight, ShoppingCart, Award, Camera, Truck, UserCheck } from 'lucide-react';
import { Product } from '../types';

const products: Product[] = [
  // 1. APPAREL
  {
    id: 'app-1',
    name: '"Faith in Action" T-Shirt',
    category: 'Apparel',
    price: '2500',
    description: 'Premium heavy cotton with high-density print. Engineered for events, hikes, and CSR days.',
    valueProp: 'Wear the mission. Built for community and service.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'
  },
  {
    id: 'app-2',
    name: '"Serve. Connect. Grow." Hoodie',
    category: 'Apparel',
    price: '4800',
    description: 'Premium brushed fleece for early morning pickups and evening fellowship sessions.',
    valueProp: 'Rugged warmth for high-altitude de-briefs.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000'
  },
  // 2. ADVENTURE ESSENTIALS
  {
    id: 'ess-1',
    name: 'Mission Expedition Daypack',
    category: 'Adventure Essentials',
    price: '4500',
    description: 'Branded multi-compartment pack with dedicated water bottle loops and mission tag loop.',
    valueProp: 'Tactical efficiency for every mission terrain.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000'
  },
  {
    id: 'ess-2',
    name: 'Stainless Mission Flask',
    category: 'Adventure Essentials',
    price: '1800',
    description: 'Double-walled medical-grade stainless steel. Keeps hydration cool for 24 hours.',
    valueProp: 'Environmentally responsible hydration.',
    image: 'https://images.unsplash.com/photo-1602143407151-0111d1916d4c?q=80&w=1000'
  },
  {
    id: 'ess-3',
    name: 'Mission Bucket Hat',
    category: 'Adventure Essentials',
    price: '1500',
    description: 'Sun protection with identity. Durable twill with adjustable cord.',
    valueProp: 'Identity and protection for the open ridge.',
    image: 'https://images.unsplash.com/photo-1582791694770-cad1d8aff3a5?q=80&w=1000'
  },
  // 3. SAFETY & FIRST AID
  {
    id: 'saf-1',
    name: 'Personal First Aid Kit',
    category: 'Safety & First Aid',
    price: '2800',
    description: 'Contains trauma bandages, antiseptic, and emergency instructions. Essential hiker gear.',
    valueProp: 'Stewardship starts with preparedness.',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446ddd?q=80&w=1000'
  },
  {
    id: 'saf-2',
    name: 'Reflective Mission Vest',
    category: 'Safety & First Aid',
    price: '1200',
    description: 'High-visibility safety gear for street clean-ups and urban restoration projects.',
    valueProp: 'Visibility is credibility.',
    image: 'https://images.unsplash.com/photo-1628102422201-987820610f44?q=80&w=1000'
  },
  // 4. FAITH & LIFESTYLE
  {
    id: 'fai-1',
    name: '"Walking with Purpose" Journal',
    category: 'Faith & Lifestyle',
    price: '2200',
    description: 'Premium leather-bound journal with mission reflection prompts and scripture inserts.',
    valueProp: 'Capture the forge moments in physical ink.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000'
  },
  {
    id: 'fai-2',
    name: '"Serve Others" Wristband',
    category: 'Faith & Lifestyle',
    price: '500',
    description: 'Embossed silicone wristband. A constant reminder of the call to service.',
    valueProp: 'Identity that stays with you.',
    image: 'https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?q=80&w=1000'
  },
  // 5. CSR & IMPACT
  {
    id: 'csr-1',
    name: 'Children\'s Home Support Pack',
    category: 'CSR & Impact',
    price: '3500',
    description: 'Directly funds our monthly charity outreach missions with food and hygiene supplies.',
    valueProp: '100% of proceeds fund CSR logistics.',
    impactLabel: 'A portion of this purchase supports our community outreach work.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000'
  },
  {
    id: 'csr-2',
    name: 'Street Clean-up Kit',
    category: 'CSR & Impact',
    price: '1800',
    description: 'Gloves, bags, and sanitizers for our urban restoration missions.',
    valueProp: 'Restoring beauty to our city.',
    impactLabel: 'Directly supports Urban Restoration days.',
    image: 'https://images.unsplash.com/photo-1550616149-a316c1410427?q=80&w=1000'
  },
  // 6. EXPERIENCE
  {
    id: 'exp-1',
    name: '3-Event Mission Pass',
    category: 'Experience Passes',
    price: '12000',
    description: 'Commit to the season. Access to any three 2026 missions with a 10% discount.',
    valueProp: 'Commitment to consistency.',
    isBundle: true,
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1000'
  },
  {
    id: 'exp-2',
    name: 'First Aid Training Voucher',
    category: 'Experience Passes',
    price: '6000',
    description: 'Voucher for any Professional First Aid & Preparedness Day session.',
    valueProp: 'Give the gift of life-saving skills.',
    image: 'https://images.unsplash.com/photo-1516574187841-69301976e499?q=80&w=1000'
  },
  // 7. CORPORATE & GROUP
  {
    id: 'grp-1',
    name: 'Corporate CSR Package',
    category: 'Corporate & Group',
    price: '150000',
    description: 'Includes event facilitation, merchandise, and a structured CSR activity for up to 30 pax.',
    valueProp: 'High-ticket impact aligned with your mission.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000'
  },
  // 8. ADD-ONS
  {
    id: 'add-1',
    name: 'Event Photo Pack',
    category: 'Small Add-ons',
    price: '1000',
    description: 'High-resolution professional photography pack from your mission day.',
    valueProp: 'Capture the peak moments forever.',
    image: 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=1000'
  },
  {
    id: 'add-2',
    name: 'Transport-Only Pass',
    category: 'Small Add-ons',
    price: '1500',
    description: 'Mission transfer for those who have their own gear but need reliable fleet access.',
    valueProp: 'Reliable logistics for every trail.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000'
  }
];

const categories = ['All', 'Apparel', 'Adventure Essentials', 'Safety & First Aid', 'Faith & Lifestyle', 'CSR & Impact', 'Experience Passes', 'Corporate & Group', 'Small Add-ons'];

interface CartItem extends Product {
  quantity: number;
}

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: string) => `KES ${parseInt(price).toLocaleString()}`;

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
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

  const handleCheckout = () => {
    if (cart.length === 0) return;
    let message = `*CCA MERCHANT ORDER*\n--------------------------------\n`;
    cart.forEach(item => { message += `${item.quantity}x ${item.name}\n`; });
    message += `--------------------------------\n*TOTAL: KES ${cartTotal.toLocaleString()}*`;
    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Apparel': return <Tag size={14} />;
      case 'Adventure Essentials': return <ShoppingBag size={14} />;
      case 'Safety & First Aid': return <ShieldCheck size={14} />;
      case 'Faith & Lifestyle': return <Heart size={14} />;
      case 'CSR & Impact': return <Award size={14} />;
      case 'Experience Passes': return <Ticket size={14} />;
      case 'Corporate & Group': return <UserCheck size={14} />;
      case 'Small Add-ons': return <Plus size={14} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-40 pb-32">
      
      {/* FLOATING CART TRIGGER */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-10 right-10 z-40 bg-brand-green text-brand-gold p-5 rounded-full shadow-2xl kinetic-btn flex items-center gap-3 border border-brand-gold/30"
      >
        <ShoppingBag size={20} />
        {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-green text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-brand-green">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
      </button>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">
        
        {/* SIDEBAR */}
        <div className="lg:w-80 flex-shrink-0">
           <div className="sticky top-32 space-y-12">
              <div>
                 <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">Merchant of Merit</span>
                 <h1 className="text-4xl font-serif font-bold text-brand-green leading-tight tracking-tighter italic">Boutique <br/><span className="not-italic text-brand-gold">Gear.</span></h1>
                 <p className="text-gray-400 mt-6 font-serif italic text-sm opacity-80 leading-relaxed">"Everything here helps you show up better for Christian community, service, and adventure."</p>
              </div>

              <div className="relative">
                 <input 
                    type="text" 
                    placeholder="Search archives..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-none text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-brand-green shadow-sm"
                 />
                 <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>

              <div className="space-y-4">
                 <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em] block">Mission Categories</label>
                 <div className="flex flex-col gap-2">
                    {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`text-left px-6 py-4 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all flex justify-between items-center ${
                            selectedCategory === cat 
                              ? 'bg-brand-green text-brand-gold shadow-lg' 
                              : 'text-gray-400 hover:text-brand-green border border-transparent hover:border-brand-green/5'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(cat)}
                            {cat}
                          </div>
                          {selectedCategory === cat && <ChevronRight size={12} />}
                        </button>
                    ))}
                 </div>
              </div>

              <div className="p-6 bg-brand-sand border border-brand-green/5 space-y-4 text-center">
                <div className="text-brand-gold mx-auto w-fit"><Heart size={20} /></div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-green">Our Strategy</h4>
                <p className="text-[10px] text-gray-400 font-serif italic leading-relaxed">
                  Every purchase supports our rotational CSR outreach missions. Faith is lived through service.
                </p>
              </div>
           </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="flex-grow">
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-none border border-gray-100 hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] transition-all duration-700 flex flex-col cursor-pointer overflow-hidden"
                >
                   <div className="aspect-[4/5] bg-brand-sand overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s]" 
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.impactLabel && (
                            <div className="bg-brand-gold text-white px-2 py-1 text-[8px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                <Heart size={10} /> Impact Choice
                            </div>
                        )}
                        {product.isBundle && (
                            <div className="bg-brand-green text-brand-gold px-2 py-1 text-[8px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                <Ticket size={10} /> Bundle
                            </div>
                        )}
                      </div>
                      <div className="absolute bottom-4 right-4">
                         <div className="bg-white/95 backdrop-blur-md px-4 py-2 text-[10px] font-bold text-brand-green uppercase tracking-[0.2em] shadow-lg">
                            {formatPrice(product.price)}
                         </div>
                      </div>
                   </div>
                   <div className="p-8 space-y-4">
                      <div className="text-[8px] text-brand-gold font-bold uppercase tracking-[0.4em]">{product.category}</div>
                      <h3 className="font-serif text-xl font-bold text-brand-green tracking-tight leading-none italic">{product.name}</h3>
                      <p className="text-gray-400 text-xs font-serif italic line-clamp-2 leading-relaxed opacity-80">"{product.description}"</p>
                      <div className="pt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-brand-green flex items-center gap-2">Secure Gear <ArrowRight size={12}/></span>
                         <Plus size={16} className="text-brand-gold"/>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           {filteredProducts.length === 0 && (
             <div className="py-32 text-center space-y-4 opacity-40">
                <Search size={48} className="mx-auto text-gray-300" />
                <p className="font-serif italic text-xl">"No archives found for this query."</p>
             </div>
           )}
        </div>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-brand-green/90 backdrop-blur-md animate-fade-in-up">
           <div className="bg-white rounded-none overflow-hidden shadow-2xl max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-y-auto border border-white/10 relative">
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-6 right-6 z-10 p-3 text-gray-400 hover:text-brand-green transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="bg-brand-sand relative min-h-[400px]">
                 <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              
              <div className="p-10 md:p-16 flex flex-col justify-center">
                 <div className="space-y-10">
                    <div>
                       <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">{selectedProduct.category} ARCHIVE</span>
                       <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-green tracking-tight leading-tight italic">{selectedProduct.name}</h2>
                       <div className="text-2xl font-serif font-bold text-brand-gold mt-4">{formatPrice(selectedProduct.price)}</div>
                    </div>
                    
                    <div className="space-y-6">
                       <p className="text-base text-gray-500 font-serif leading-relaxed italic opacity-90">"{selectedProduct.description}"</p>
                       <div className="p-6 border border-brand-gold/20 italic font-serif text-brand-green text-sm relative">
                          <div className="absolute -top-3 left-6 bg-white px-3 text-[8px] font-bold uppercase tracking-[0.4em] text-brand-gold">Mission Relevance</div>
                          "{selectedProduct.valueProp}"
                       </div>
                       {selectedProduct.impactLabel && (
                           <div className="bg-brand-sand/50 p-4 flex items-center gap-3 text-brand-gold border border-brand-gold/20">
                               <Heart size={18} />
                               <span className="text-[10px] font-bold uppercase tracking-widest">{selectedProduct.impactLabel}</span>
                           </div>
                       )}
                    </div>

                    <button 
                      onClick={() => addToCart(selectedProduct)}
                      className="w-full py-6 bg-brand-green text-brand-gold font-bold uppercase tracking-[0.5em] text-[10px] shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-4 group"
                    >
                        <ShoppingCart size={18} className="group-hover:rotate-6 transition-transform" /> SECURE FOR MISSION
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* CART DRAWER */}
      <div className={`fixed inset-y-0 right-0 z-[100] w-full md:w-[420px] bg-white shadow-2xl transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-brand-green text-brand-cream">
            <h2 className="text-xl font-serif font-bold flex items-center gap-4 italic tracking-tight uppercase">
                <ShoppingBag size={20} className="text-brand-gold"/> Mission Bag
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="hover:text-brand-gold transition-colors"><X size={28} /></button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-10 paper-texture">
            {cart.length === 0 ? (
                <div className="text-center text-gray-300 py-32 space-y-6">
                    <ShoppingBag size={64} className="mx-auto opacity-10" />
                    <p className="font-serif italic text-xl">"Bag currently empty."</p>
                    <button onClick={() => setIsCartOpen(false)} className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold border-b border-brand-gold/30 pb-1">Return to Archive</button>
                </div>
            ) : (
                cart.map(item => (
                    <div key={item.id} className="flex gap-6 group animate-reveal border-b border-gray-50 pb-8 last:border-0">
                        <div className="w-20 h-20 bg-brand-sand overflow-hidden flex-shrink-0 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="flex-grow space-y-2">
                            <div className="flex justify-between items-start">
                                <h4 className="font-serif font-bold text-brand-green text-lg leading-tight group-hover:text-brand-gold transition-colors italic">{item.name}</h4>
                                <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><X size={14} /></button>
                            </div>
                            <div className="text-[9px] font-bold uppercase text-gray-400 tracking-widest">{formatPrice(item.price)}</div>
                            <div className="flex items-center gap-6 pt-2">
                                <div className="flex items-center gap-4 bg-gray-50 px-3 py-1 border border-gray-100">
                                   <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-brand-green"><Minus size={12} /></button>
                                   <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                   <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-brand-green"><Plus size={12} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        <div className="p-8 border-t border-gray-100 bg-brand-sand/30">
            <div className="flex justify-between items-end mb-8">
                <span className="text-[10px] font-bold uppercase text-gray-400 tracking-[0.3em]">Total Investment</span>
                <span className="text-2xl font-serif font-bold text-brand-green">KES {cartTotal.toLocaleString()}</span>
            </div>
            <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full py-6 bg-[#25D366] text-white font-bold uppercase tracking-[0.4em] text-[10px] hover:brightness-105 transition-all shadow-lg flex items-center justify-center gap-4 disabled:opacity-50"
            >
                <MessageCircle size={20} /> Finalize with Kevin
            </button>
        </div>
      </div>

      {isCartOpen && (
        <div onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-brand-green/70 z-[90] backdrop-blur-sm transition-opacity"></div>
      )}

    </div>
  );
};

export default Shop;
