import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentView === ViewState.HOME;

  // Logic: 
  // If Home: Transparent at top, Green when scrolled.
  // If Not Home: Always Green.
  const navBgClass = isHome 
    ? (scrolled ? "bg-brand-green/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6")
    : "bg-brand-green shadow-lg py-3";

  const navBaseClass = "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out";

  const linkClass = (view: ViewState) => `relative cursor-pointer transition-colors font-medium tracking-widest text-xs uppercase group ${
    currentView === view ? 'text-brand-gold' : 'text-white hover:text-brand-gold'
  }`;

  return (
    <nav className={`${navBaseClass} ${navBgClass}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView(ViewState.HOME)}
        >
          <div className="transition-transform duration-300 group-hover:scale-105">
            <Logo className="w-10 h-10 md:w-12 md:h-12" light={true} />
          </div>
          <div className="flex flex-col">
            <span className={`font-serif font-bold text-xl leading-none tracking-tight ${(!isHome || scrolled) ? 'text-brand-cream' : 'text-white'}`}>CROSS CONNECT</span>
            <span className="text-brand-gold text-[0.6rem] tracking-[0.3em] uppercase">Africa</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setView(ViewState.HOME)} className={linkClass(ViewState.HOME)}>
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => setView(ViewState.ABOUT)} className={linkClass(ViewState.ABOUT)}>
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => setView(ViewState.ADVENTURE_BUILDER)} className={linkClass(ViewState.ADVENTURE_BUILDER)}>
            Builder
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => setView(ViewState.EVENTS)} className={linkClass(ViewState.EVENTS)}>
            Events
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => setView(ViewState.SHOP)} className={`${linkClass(ViewState.SHOP)} flex items-center gap-1`}>
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => setView(ViewState.CONTACT)} className={linkClass(ViewState.CONTACT)}>
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </button>

          <button 
            onClick={() => setView(ViewState.CALCULATOR)} 
            className={`ml-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                (!isHome || scrolled) 
                ? 'bg-brand-gold text-brand-green hover:bg-white' 
                : 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-brand-gold hover:border-brand-gold hover:text-brand-green'
            }`}
          >
            Get Quote <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className={`md:hidden cursor-pointer transition-colors ${(!isHome || scrolled) ? 'text-brand-cream' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 right-0 bg-brand-green border-t border-brand-green/50 overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 shadow-xl' : 'max-h-0 opacity-0'}`}>
        <div className="p-8 flex flex-col gap-6 items-center">
          <button onClick={() => { setView(ViewState.HOME); setIsMobileMenuOpen(false); }} className="text-brand-cream text-lg font-serif">Home</button>
          <button onClick={() => { setView(ViewState.ABOUT); setIsMobileMenuOpen(false); }} className="text-brand-cream text-lg font-serif">About Us</button>
          <button onClick={() => { setView(ViewState.ADVENTURE_BUILDER); setIsMobileMenuOpen(false); }} className="text-brand-cream text-lg font-serif">Adventure Builder</button>
          <button onClick={() => { setView(ViewState.EVENTS); setIsMobileMenuOpen(false); }} className="text-brand-cream text-lg font-serif">Events</button>
          <button onClick={() => { setView(ViewState.SHOP); setIsMobileMenuOpen(false); }} className="text-brand-cream text-lg font-serif flex items-center gap-2"><ShoppingBag size={18}/> Shop Gear</button>
          <button onClick={() => { setView(ViewState.CONTACT); setIsMobileMenuOpen(false); }} className="text-brand-cream text-lg font-serif">Contact Us</button>
          <button onClick={() => { setView(ViewState.CALCULATOR); setIsMobileMenuOpen(false); }} className="px-8 py-3 bg-brand-gold text-brand-green font-bold uppercase tracking-widest rounded-full w-full">Get Quote</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;