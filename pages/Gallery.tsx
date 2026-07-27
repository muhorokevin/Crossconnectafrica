import React, { useState } from 'react';
import { 
  Maximize2, X, ChevronLeft, ChevronRight, Share2, ArrowRight
} from 'lucide-react';
import { ViewState } from '../types';
import { BookingContextData } from '../App';

export interface PhotoItem {
  id: string;
  imageUrl: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  // Batch 1 (13 photos)
  { id: 'cca-1', imageUrl: 'https://i.imgur.com/FBjiPbv.jpg' },
  { id: 'cca-2', imageUrl: 'https://i.imgur.com/UBoZrzi.jpg' },
  { id: 'cca-3', imageUrl: 'https://i.imgur.com/Fx3RVWQ.jpg' },
  { id: 'cca-4', imageUrl: 'https://i.imgur.com/AF3fciZ.jpg' },
  { id: 'cca-5', imageUrl: 'https://i.imgur.com/NLpqywt.jpg' },
  { id: 'cca-6', imageUrl: 'https://i.imgur.com/7HrGbaB.jpg' },
  { id: 'cca-7', imageUrl: 'https://i.imgur.com/CfW44CK.jpg' },
  { id: 'cca-8', imageUrl: 'https://i.imgur.com/AJTo4iQ.jpg' },
  { id: 'cca-9', imageUrl: 'https://i.imgur.com/093ouTZ.jpg' },
  { id: 'cca-10', imageUrl: 'https://i.imgur.com/tubYZYY.jpg' },
  { id: 'cca-11', imageUrl: 'https://i.imgur.com/Or37w5D.jpg' },
  { id: 'cca-12', imageUrl: 'https://i.imgur.com/frG2QtL.jpg' },
  { id: 'cca-13', imageUrl: 'https://i.imgur.com/U0P7741.jpg' },

  // Batch 2 (17 photos)
  { id: 'cca-14', imageUrl: 'https://i.imgur.com/09r3OhQ.jpg' },
  { id: 'cca-15', imageUrl: 'https://i.imgur.com/Pmvfb0p.jpg' },
  { id: 'cca-16', imageUrl: 'https://i.imgur.com/a4Sckw2.jpg' },
  { id: 'cca-17', imageUrl: 'https://i.imgur.com/AEeSVD2.jpg' },
  { id: 'cca-18', imageUrl: 'https://i.imgur.com/PvaeM57.jpg' },
  { id: 'cca-19', imageUrl: 'https://i.imgur.com/U6IYQbX.jpg' },
  { id: 'cca-20', imageUrl: 'https://i.imgur.com/qiDvVR0.jpg' },
  { id: 'cca-21', imageUrl: 'https://i.imgur.com/26HEl6e.jpg' },
  { id: 'cca-22', imageUrl: 'https://i.imgur.com/T3BvnEz.jpg' },
  { id: 'cca-23', imageUrl: 'https://i.imgur.com/5H5yO5D.jpg' },
  { id: 'cca-24', imageUrl: 'https://i.imgur.com/GG4Ueyp.jpg' },
  { id: 'cca-25', imageUrl: 'https://i.imgur.com/xIzAMk0.jpg' },
  { id: 'cca-26', imageUrl: 'https://i.imgur.com/oq4FA5p.jpg' },
  { id: 'cca-27', imageUrl: 'https://i.imgur.com/unzqdqy.jpg' },
  { id: 'cca-28', imageUrl: 'https://i.imgur.com/pArhD8O.jpg' },
  { id: 'cca-29', imageUrl: 'https://i.imgur.com/tuHGYnC.jpg' },
  { id: 'cca-30', imageUrl: 'https://i.imgur.com/E6vTiKp.jpg' },
];

interface GalleryProps {
  setView?: (view: ViewState) => void;
  onNavigateToBooking?: (data: BookingContextData) => void;
}

const Gallery: React.FC<GalleryProps> = ({ setView, onNavigateToBooking }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_PHOTOS.length);
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
            Cross Connect <span className="not-italic text-brand-gold">Photo Gallery</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-serif italic leading-relaxed">
            Moments captured in action across Kenya — featuring corporate team building, certified first aid & fire safety drills, event medical standby, school adventure clubs, hikes, and professional event hosting.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        
        {/* Pure Image Grid (No Classifications/Labels) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <img
                src={photo.imageUrl}
                alt="Cross Connect Africa Gallery Photo"
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
          ))}
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && GALLERY_PHOTOS[lightboxIndex] && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
        >
          {/* Top Control Bar */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center gap-3">
            <span className="text-white/70 text-xs font-mono uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              {lightboxIndex + 1} / {GALLERY_PHOTOS.length}
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

          {/* Central Image Container */}
          <div 
            onClick={e => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
          >
            <img
              src={GALLERY_PHOTOS[lightboxIndex].imageUrl}
              alt="Cross Connect Africa Gallery Photo"
              className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />

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
                  const url = GALLERY_PHOTOS[lightboxIndex].imageUrl;
                  if (navigator.share) {
                    navigator.share({
                      title: 'Cross Connect Africa Gallery',
                      url: url,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(url);
                    alert('Image link copied to clipboard!');
                  }
                }}
                className="px-5 py-2.5 bg-white/10 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2"
              >
                <Share2 size={14} /> Share Photo
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Gallery;
