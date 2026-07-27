import React, { useState } from 'react';
import { 
  Maximize2, X, ChevronLeft, ChevronRight, Share2, ArrowRight,
  Play, Film, Image as ImageIcon, Grid
} from 'lucide-react';
import { ViewState } from '../types';
import { BookingContextData } from '../App';

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  posterUrl?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // Featured Videos
  { 
    id: 'cca-vid-1', 
    type: 'video', 
    url: 'https://i.imgur.com/zP0E5jy.mp4',
    posterUrl: 'https://i.imgur.com/zP0E5jym.jpg'
  },
  { 
    id: 'cca-vid-2', 
    type: 'video', 
    url: 'https://i.imgur.com/ta9deUd.mp4',
    posterUrl: 'https://i.imgur.com/ta9deUdm.jpg'
  },

  // Batch 1 Photos
  { id: 'cca-1', type: 'photo', url: 'https://i.imgur.com/FBjiPbv.jpg' },
  { id: 'cca-2', type: 'photo', url: 'https://i.imgur.com/UBoZrzi.jpg' },
  { id: 'cca-3', type: 'photo', url: 'https://i.imgur.com/Fx3RVWQ.jpg' },
  { id: 'cca-4', type: 'photo', url: 'https://i.imgur.com/AF3fciZ.jpg' },
  { id: 'cca-5', type: 'photo', url: 'https://i.imgur.com/NLpqywt.jpg' },
  { id: 'cca-6', type: 'photo', url: 'https://i.imgur.com/7HrGbaB.jpg' },
  { id: 'cca-7', type: 'photo', url: 'https://i.imgur.com/CfW44CK.jpg' },
  { id: 'cca-8', type: 'photo', url: 'https://i.imgur.com/AJTo4iQ.jpg' },
  { id: 'cca-9', type: 'photo', url: 'https://i.imgur.com/093ouTZ.jpg' },
  { id: 'cca-10', type: 'photo', url: 'https://i.imgur.com/tubYZYY.jpg' },
  { id: 'cca-11', type: 'photo', url: 'https://i.imgur.com/Or37w5D.jpg' },
  { id: 'cca-12', type: 'photo', url: 'https://i.imgur.com/frG2QtL.jpg' },
  { id: 'cca-13', type: 'photo', url: 'https://i.imgur.com/U0P7741.jpg' },

  // Batch 2 Photos
  { id: 'cca-14', type: 'photo', url: 'https://i.imgur.com/09r3OhQ.jpg' },
  { id: 'cca-15', type: 'photo', url: 'https://i.imgur.com/Pmvfb0p.jpg' },
  { id: 'cca-16', type: 'photo', url: 'https://i.imgur.com/a4Sckw2.jpg' },
  { id: 'cca-17', type: 'photo', url: 'https://i.imgur.com/AEeSVD2.jpg' },
  { id: 'cca-18', type: 'photo', url: 'https://i.imgur.com/PvaeM57.jpg' },
  { id: 'cca-19', type: 'photo', url: 'https://i.imgur.com/U6IYQbX.jpg' },
  { id: 'cca-20', type: 'photo', url: 'https://i.imgur.com/qiDvVR0.jpg' },
  { id: 'cca-21', type: 'photo', url: 'https://i.imgur.com/26HEl6e.jpg' },
  { id: 'cca-22', type: 'photo', url: 'https://i.imgur.com/T3BvnEz.jpg' },
  { id: 'cca-23', type: 'photo', url: 'https://i.imgur.com/5H5yO5D.jpg' },
  { id: 'cca-24', type: 'photo', url: 'https://i.imgur.com/GG4Ueyp.jpg' },
  { id: 'cca-25', type: 'photo', url: 'https://i.imgur.com/xIzAMk0.jpg' },
  { id: 'cca-26', type: 'photo', url: 'https://i.imgur.com/oq4FA5p.jpg' },
  { id: 'cca-27', type: 'photo', url: 'https://i.imgur.com/unzqdqy.jpg' },
  { id: 'cca-28', type: 'photo', url: 'https://i.imgur.com/pArhD8O.jpg' },
  { id: 'cca-29', type: 'photo', url: 'https://i.imgur.com/tuHGYnC.jpg' },
  { id: 'cca-30', type: 'photo', url: 'https://i.imgur.com/E6vTiKp.jpg' },
];

interface GalleryProps {
  setView?: (view: ViewState) => void;
  onNavigateToBooking?: (data: BookingContextData) => void;
}

const Gallery: React.FC<GalleryProps> = ({ setView, onNavigateToBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    item => activeFilter === 'all' || item.type === activeFilter
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handleQuoteClick = () => {
    closeLightbox();
    if (setView) {
      if (onNavigateToBooking) {
        onNavigateToBooking({
          categoryTitle: 'Cross Connect Africa Services'
        });
      } else {
        setView(ViewState.CALCULATOR);
      }
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-28 pb-20">
      
      {/* Header Banner */}
      <div className="bg-brand-green text-brand-cream py-14 px-6 relative overflow-hidden border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em] mb-3 block">
            Visual Experience
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold italic tracking-tight mb-4">
            Cross Connect <span className="not-italic text-brand-gold">Gallery & Highlights</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-serif italic leading-relaxed">
            Moments and video clips captured in action across Kenya — featuring corporate team building, first aid & fire safety drills, event medical standby, school adventure clubs, hikes, and professional event hosting.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        
        {/* Media Type Filter Tabs */}
        <div className="flex items-center justify-center gap-3 pb-4 pt-2 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeFilter === 'all'
                ? 'bg-brand-green text-brand-gold shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-brand-cream border border-gray-200'
            }`}
          >
            <Grid size={15} /> All Media ({GALLERY_ITEMS.length})
          </button>

          <button
            onClick={() => setActiveFilter('photo')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeFilter === 'photo'
                ? 'bg-brand-green text-brand-gold shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-brand-cream border border-gray-200'
            }`}
          >
            <ImageIcon size={15} /> Photos ({GALLERY_ITEMS.filter(i => i.type === 'photo').length})
          </button>

          <button
            onClick={() => setActiveFilter('video')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeFilter === 'video'
                ? 'bg-brand-green text-brand-gold shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-brand-cream border border-gray-200'
            }`}
          >
            <Film size={15} /> Videos ({GALLERY_ITEMS.filter(i => i.type === 'video').length})
          </button>
        </div>

        {/* Pure Grid (No Names / Titles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              {item.type === 'video' ? (
                <div className="w-full h-full relative">
                  <video
                    src={item.url}
                    poster={item.posterUrl}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                    onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                  
                  {/* Video Play Badge Indicator */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="p-4 rounded-full bg-brand-gold/90 text-brand-green shadow-xl transform group-hover:scale-110 transition-transform flex items-center justify-center">
                      <Play size={24} className="fill-current ml-0.5" />
                    </span>
                  </div>

                  {/* Video Label Chip */}
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                    <Film size={12} className="text-brand-gold" /> Video
                  </span>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={item.url}
                    alt="Cross Connect Africa Gallery"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
                      <Maximize2 size={22} />
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
        >
          {/* Top Control Bar */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center gap-3">
            <span className="text-white/70 text-xs font-mono uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              {lightboxIndex + 1} / {filteredItems.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-brand-gold hover:text-brand-green transition-all"
            >
              <X size={22} />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 text-white hover:bg-brand-gold hover:text-brand-green transition-all border border-white/10"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 text-white hover:bg-brand-gold hover:text-brand-green transition-all border border-white/10"
          >
            <ChevronRight size={26} />
          </button>

          {/* Media Player Container */}
          <div 
            onClick={e => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center w-full"
          >
            {filteredItems[lightboxIndex].type === 'video' ? (
              <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
                <video
                  src={filteredItems[lightboxIndex].url}
                  controls
                  autoPlay
                  playsInline
                  controlsList="nodownload"
                  className="w-full max-h-[75vh] object-contain mx-auto"
                />
              </div>
            ) : (
              <img
                src={filteredItems[lightboxIndex].url}
                alt="Cross Connect Africa Gallery"
                className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            )}

            {/* Bottom Actions Bar */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center items-center">
              <button
                onClick={handleQuoteClick}
                className="px-6 py-2.5 bg-brand-gold text-brand-green rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center gap-2"
              >
                Book a Service <ArrowRight size={14} />
              </button>
              <button
                onClick={() => {
                  const url = filteredItems[lightboxIndex].url;
                  if (navigator.share) {
                    navigator.share({
                      title: 'Cross Connect Africa Media',
                      url: url,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(url);
                    alert('Media link copied to clipboard!');
                  }
                }}
                className="px-5 py-2.5 bg-white/10 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2"
              >
                <Share2 size={14} /> Share Link
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Gallery;
