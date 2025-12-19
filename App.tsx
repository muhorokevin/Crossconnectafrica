
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import AdventureBuilder, { Program } from './pages/AdventureBuilder';
import Calculator from './pages/Calculator';
import Events from './pages/Events';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import LiabilityWaiver from './pages/LiabilityWaiver';
import MissionConsultant from './components/MissionConsultant';
import { ViewState, GeneratedItinerary } from './types';

export interface BookingContextData {
  program?: Program;
  days?: number;
  pax?: number;
  categoryTitle?: string;
  addons?: string[];
  itinerary?: GeneratedItinerary | null;
  durationIndex?: number;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [bookingContext, setBookingContext] = useState<BookingContextData | null>(null);

  // Ensure page loads from top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  const handleNavigateToBooking = (data: BookingContextData) => {
    setBookingContext(data);
    setCurrentView(ViewState.CALCULATOR);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home setView={setCurrentView} />;
      case ViewState.ABOUT:
        return <About />;
      case ViewState.ADVENTURE_BUILDER:
        return <AdventureBuilder onNavigateToBooking={handleNavigateToBooking} />;
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
        return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-brand-cream min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <MissionConsultant />
      <Footer setView={setCurrentView} />
    </div>
  );
};

export default App;
