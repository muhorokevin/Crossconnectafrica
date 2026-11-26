import React from 'react';
import { Instagram, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { ViewState } from '../types';
import Logo from './Logo';

interface FooterProps {
  setView?: (view: ViewState) => void;
}

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC<FooterProps> = ({ setView }) => {
  const go = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    if (setView) {
      setView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const linkCls = 'text-white/65 hover:text-white transition-colors text-left';

  return (
    <footer className="px-2 sm:px-3 pb-2 sm:pb-3 pt-2 sm:pt-3 bg-brand-cream print:hidden">
      <div className="rounded-[28px] sm:rounded-[36px] bg-brand-ink text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 md:pt-20 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center"><Logo light className="w-8 h-8" /></span>
                <div className="leading-none">
                  <p className="font-display font-bold text-xl">CROSS CONNECT</p>
                  <p className="text-brand-amber text-[11px] font-semibold tracking-[0.32em] mt-1">AFRICA</p>
                </div>
              </div>
              <p className="text-white/65 leading-relaxed max-w-sm">
                Team building, first aid and fire safety, equipment, drills, MCs and event medics, anywhere in Kenya.
              </p>
              <button
                onClick={(e) => go(e, ViewState.CALCULATOR)}
                className="group mt-8 inline-flex items-center gap-3 h-12 pl-6 pr-1.5 rounded-full bg-brand-amber text-brand-ink font-semibold hover:bg-white transition-colors"
              >
                Get your price
                <span className="w-9 h-9 rounded-full bg-brand-ink text-brand-amber flex items-center justify-center transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
              </button>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-5">Explore</h3>
              <ul className="space-y-3">
                <li><button onClick={(e) => go(e, ViewState.ABOUT)} className={linkCls}>About us</button></li>
                <li><button onClick={(e) => go(e, ViewState.CALCULATOR)} className={linkCls}>Get a quote</button></li>
                <li><button onClick={(e) => go(e, ViewState.EVENTS)} className={linkCls}>Events and hikes</button></li>
                <li><button onClick={(e) => go(e, ViewState.GALLERY)} className={linkCls}>Gallery</button></li>
                <li><button onClick={(e) => go(e, ViewState.SHOP)} className={linkCls}>Safety equipment</button></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-5">Documents</h3>
              <ul className="space-y-3">
                <li><a href="/docs/Cross_Connect_Africa_Rate_Card_2026.pdf" download className={linkCls}>Rate card 2026</a></li>
                <li><a href="/docs/Cross_Connect_Africa_Company_Profile_2026.pdf" download className={linkCls}>Company profile</a></li>
                <li><button onClick={(e) => go(e, ViewState.PRIVACY_POLICY)} className={linkCls}>Privacy policy</button></li>
                <li><button onClick={(e) => go(e, ViewState.TERMS_OF_SERVICE)} className={linkCls}>Terms of service</button></li>
                <li><button onClick={(e) => go(e, ViewState.LIABILITY_WAIVER)} className={linkCls}>Liability waiver</button></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-5">Contact</h3>
              <ul className="space-y-4 text-white/65">
                <li className="flex items-start gap-3">
                  <MapPin size={17} className="text-brand-amber shrink-0 mt-0.5" />
                  <span>Valley View Office Park, B1 Office 1<br />P.O. Box 18923-00100 Nairobi</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={17} className="text-brand-amber shrink-0" />
                  <a href="tel:+254710974670" className="hover:text-white transition-colors">+254 710 974 670</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={17} className="text-brand-amber shrink-0 mt-0.5" />
                  <a href="mailto:crossconnectmissions@protonmail.com" className="break-all hover:text-white transition-colors">crossconnectmissions@protonmail.com</a>
                </li>
              </ul>
              <div className="flex gap-2 mt-6">
                <a href="https://www.instagram.com/crossconnectafrica?igsh=MWU4NzBkbXY3N29pZw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-amber hover:text-brand-ink transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://tiktok.com/@crossconnectafrica" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-amber hover:text-brand-ink transition-colors">
                  <TikTokIcon size={18} />
                </a>
              </div>
            </div>
          </div>

          <p aria-hidden="true" className="font-display font-bold leading-[0.8] tracking-[-0.05em] text-white/[0.06] text-[17vw] lg:text-[12.5rem] whitespace-nowrap select-none -mb-2">
            CROSS CONNECT
          </p>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-2 text-sm text-white/40">
            <p>&copy; {new Date().getFullYear()} Cross Connect Africa Ltd. All rights reserved.</p>
            <p>Connecting People. Building Resilience. Saving Lives.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
