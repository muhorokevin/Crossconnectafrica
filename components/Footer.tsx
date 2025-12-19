
import React from 'react';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { ViewState } from '../types';
import Logo from './Logo';

interface FooterProps {
  setView?: (view: ViewState) => void;
}

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC<FooterProps> = ({ setView }) => {
  const handleLinkClick = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    if (setView) {
      setView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-green text-brand-cream pt-20 pb-8 border-t border-brand-gold/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
                <Logo light={true} className="w-10 h-10" />
                <div>
                    <h2 className="text-2xl font-serif font-bold leading-none">CROSS CONNECT</h2>
                    <span className="text-brand-gold text-[0.6rem] tracking-[0.3em] uppercase block">Africa</span>
                </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed mb-6">
              Forging character through wilderness experiences. Rooted in faith, driven by excellence.
            </p>
            <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/crossconnectafrica?igsh=MWU4NzBkbXY3N29pZw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-green transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://tiktok.com/@crossconnectafrica" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-green transition-all"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={18} />
                </a>
            </div>
          </div>

          <div>
            <h3 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">Explore</h3>
            <ul className="space-y-4 text-gray-300">
                <li><button onClick={(e) => handleLinkClick(e, ViewState.HOME)} className="hover:text-white transition-colors text-left">Our Story</button></li>
                <li><button onClick={(e) => handleLinkClick(e, ViewState.ABOUT)} className="hover:text-white transition-colors text-left">About Us</button></li>
                <li><button onClick={(e) => handleLinkClick(e, ViewState.EVENTS)} className="hover:text-white transition-colors text-left">Expeditions</button></li>
                <li><button onClick={(e) => handleLinkClick(e, ViewState.ADVENTURE_BUILDER)} className="hover:text-white transition-colors text-left">Corporate Programs</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">Legal</h3>
             <ul className="space-y-4 text-gray-300">
                <li><button onClick={(e) => handleLinkClick(e, ViewState.PRIVACY_POLICY)} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={(e) => handleLinkClick(e, ViewState.TERMS_OF_SERVICE)} className="hover:text-white transition-colors text-left">Terms of Service</button></li>
                <li><button onClick={(e) => handleLinkClick(e, ViewState.LIABILITY_WAIVER)} className="hover:text-white transition-colors text-left">Liability Waiver</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-brand-gold shrink-0 mt-1" />
                    <span>Valley View Office Park<br/>B1 Office 1<br/>P.O. Box 18923-00100 Nairobi</span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone size={18} className="text-brand-gold shrink-0" />
                    <span>+254 710 974 670</span>
                </li>
                 <li className="flex items-center gap-3">
                    <Mail size={18} className="text-brand-gold shrink-0" />
                    <span>crossconnectmisiions@protonmail.com</span>
                </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Cross Connect Africa. All rights reserved.</p>
            <div className="flex gap-4">
                <p>Designed with Faith & Pixel.</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
