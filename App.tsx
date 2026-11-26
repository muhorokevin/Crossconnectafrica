
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import { Program } from './data/programs';
import Calculator from './pages/Calculator';
import Events from './pages/Events';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import LiabilityWaiver from './pages/LiabilityWaiver';
import WhatsAppQuickChat from './components/WhatsAppQuickChat';
import { ViewState, GeneratedItinerary } from './types';

export interface BookingContextData {
  program?: Program;
  days?: number;
  pax?: number;
  categoryTitle?: string;
  addons?: string[];
  itinerary?: GeneratedItinerary | null;
  durationIndex?: number;
  clientInfo?: {
    company?: string;
    contact?: string;
    email?: string;
    phone?: string;
    needEtims?: boolean;
    companyName?: string;
    kraPin?: string;
    etimsEmail?: string;
    etimsPhone?: string;
  };
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [bookingContext, setBookingContext] = useState<BookingContextData | null>(null);

  // Ensure page loads from top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  // Fade sections in as they scroll into view (elements with the "reveal" class)
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const t = window.setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'));
      if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-in')); return; }
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io?.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(el => io!.observe(el));
    }, 60);
    return () => { window.clearTimeout(t); io?.disconnect(); };
  }, [currentView]);

  const handleNavigateToBooking = (data: BookingContextData) => {
    setBookingContext(data);
    setCurrentView(ViewState.CALCULATOR);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home setView={setCurrentView} onNavigateToBooking={handleNavigateToBooking} />;
      case ViewState.ABOUT:
        return <About setView={setCurrentView} />;
      case ViewState.GALLERY:
        return <Gallery setView={setCurrentView} onNavigateToBooking={handleNavigateToBooking} />;

      case ViewState.CALCULATOR:
        return <Calculator initialData={bookingContext} />;
      case ViewState.EVENTS:
        return <Events />;
      case ViewState.SHOP:
        return <Shop />;
      case ViewState.CONTACT:
        return <Contact />;
      case ViewState.PRIVACY_POLICY:
        return <PrivacyPolicy />;
      case ViewState.TERMS_OF_SERVICE:
        return <TermsOfService />;
      case ViewState.LIABILITY_WAIVER:
        return <LiabilityWaiver />;
      default:
        return <Home setView={setCurrentView} onNavigateToBooking={handleNavigateToBooking} />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-brand-cream min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* The quote page has its own WhatsApp button and a bottom bar on phones */}
      {currentView !== ViewState.CALCULATOR && <WhatsAppQuickChat />}
      <Footer setView={setCurrentView} />
    </div>
  );
};

export default App;
