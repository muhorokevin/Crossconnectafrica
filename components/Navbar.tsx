import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { ViewState } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const LINKS: { view: ViewState; label: string }[] = [
  { view: ViewState.HOME, label: 'Home' },
  { view: ViewState.ABOUT, label: 'About' },
  { view: ViewState.EVENTS, label: 'Events' },
  { view: ViewState.GALLERY, label: 'Gallery' },
  { view: ViewState.SHOP, label: 'Shop' },
  { view: ViewState.CONTACT, label: 'Contact' }
];

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on Escape or when the screen grows
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const go = (v: ViewState) => { setView(v); setOpen(false); };

  // Over the home hero the bar is transparent; elsewhere, or once scrolled, it is a solid dark pill
  const overHero = currentView === ViewState.HOME && !scrolled && !open;

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3 print:hidden">
      <nav
        aria-label="Main"
        className={`mx-auto max-w-7xl flex items-center justify-between gap-3 rounded-full pl-2 pr-2 py-2 transition-all duration-500 ${
          overHero ? 'bg-transparent' : 'bg-brand-ink/90 backdrop-blur-xl shadow-lift ring-1 ring-white/10'
        }`}
      >
        <button onClick={() => go(ViewState.HOME)} className="flex items-center gap-2.5 pl-1 pr-3 rounded-full group" aria-label="Cross Connect Africa, home">
          <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/15">
            <Logo className="w-7 h-7" light />
          </span>
          <span className="text-left leading-none">
            <span className="block font-display font-bold text-white text-[13px] sm:text-[15px] tracking-tight whitespace-nowrap">CROSS CONNECT</span>
            <span className="block text-brand-amber text-[10px] font-semibold tracking-[0.32em] mt-1">AFRICA</span>
          </span>
        </button>

        <ul className="hidden lg:flex items-center gap-1 rounded-full bg-white/[0.07] ring-1 ring-white/10 p-1">
          {LINKS.map(l => {
            const active = currentView === l.view;
            return (
              <li key={l.label}>
                <button
                  onClick={() => go(l.view)}
                  aria-current={active ? 'page' : undefined}
                  className={`h-9 px-4 rounded-full text-[14px] font-medium transition-colors ${
                    active ? 'bg-white text-brand-ink' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a href="tel:+254710974670" className="hidden xl:inline-flex items-center gap-2 h-11 px-4 rounded-full text-white/85 hover:text-white text-[14px] font-medium">
            <Phone size={15} /> 0710 974 670
          </a>
          <button
            onClick={() => go(ViewState.CALCULATOR)}
            className="group inline-flex items-center gap-2 h-11 px-4 sm:pl-5 sm:pr-1.5 rounded-full bg-brand-amber text-brand-ink text-[14px] font-semibold hover:bg-white transition-colors"
          >
            <span className="hidden sm:inline">Get a quote</span>
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:flex w-8 h-8 rounded-full bg-brand-ink text-brand-amber items-center justify-center transition-transform group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </button>
          <button
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden w-11 h-11 rounded-full bg-white/10 ring-1 ring-white/15 text-white flex items-center justify-center"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden mx-auto max-w-7xl mt-2 rounded-[28px] bg-brand-ink/95 backdrop-blur-xl ring-1 ring-white/10 shadow-lift overflow-hidden transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul className="p-3">
          {LINKS.map((l, i) => (
            <li key={l.label}>
              <button
                onClick={() => go(l.view)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-left font-display font-semibold text-2xl ${
                  currentView === l.view ? 'text-brand-amber' : 'text-white'
                } hover:bg-white/5`}
              >
                {l.label}
                <span className="text-xs font-sans font-medium text-white/40">0{i + 1}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="p-3 pt-0 grid grid-cols-2 gap-2">
          <a href="tel:+254710974670" className="h-12 rounded-full bg-white/10 text-white font-semibold flex items-center justify-center gap-2"><Phone size={16} /> Call</a>
          <button onClick={() => go(ViewState.CALCULATOR)} className="h-12 rounded-full bg-brand-amber text-brand-ink font-semibold">Get a quote</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
