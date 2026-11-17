import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Maximize2, X, ChevronLeft, ChevronRight, Share2, ArrowRight,
  Play, Film, Check
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
  // Featured Action Videos
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

  // Batch 3 Photos
  { id: 'cca-31', type: 'photo', url: 'https://i.imgur.com/l1c14PS.jpg' },
  { id: 'cca-32', type: 'photo', url: 'https://i.imgur.com/NFsaILu.jpg' },
  { id: 'cca-33', type: 'photo', url: 'https://i.imgur.com/j5Usq90.jpg' },
  { id: 'cca-34', type: 'photo', url: 'https://i.imgur.com/Ygy5Wmn.jpg' },
  { id: 'cca-35', type: 'photo', url: 'https://i.imgur.com/aYcMKUG.jpg' },
  { id: 'cca-36', type: 'photo', url: 'https://i.imgur.com/H7y7KfG.jpg' }
];

type RowLayout = 'split-even' | 'full' | 'split-wide-left' | 'split-wide-right';

interface GalleryRow {
  layout: RowLayout;
  entries: { item: GalleryItem; index: number }[];
}

const ROW_PATTERN: RowLayout[] = [
  'split-even',
  'full',
  'split-wide-left',
  'split-even',
  'full',
  'split-wide-right'
];

interface GalleryProps {
  setView?: (view: ViewState) => void;
  onNavigateToBooking?: (data: BookingContextData) => void;
}

const Gallery: React.FC<GalleryProps> = ({ setView, onNavigateToBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(
    () => GALLERY_ITEMS.filter(item => activeFilter === 'all' || item.type === activeFilter),
    [activeFilter]
  );

  // Build balanced editorial rows matching the showcase collage rhythm
  const rows = useMemo<GalleryRow[]>(() => {
    const built: GalleryRow[] = [];
    let cursor = 0;
    let step = 0;

    while (cursor < filteredItems.length) {
      const remaining = filteredItems.length - cursor;
      const desiredLayout = ROW_PATTERN[step % ROW_PATTERN.length];

      if (desiredLayout === 'full' || remaining === 1) {
        built.push({
          layout: 'full',
          entries: [{ item: filteredItems[cursor], index: cursor }]
        });
        cursor += 1;
      } else {
        built.push({
          layout: desiredLayout,
          entries: [
            { item: filteredItems[cursor], index: cursor },
            { item: filteredItems[cursor + 1], index: cursor + 1 }
          ]
        });
        cursor += 2;
      }
      step += 1;
    }

    return built;
  }, [filteredItems]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  useEffect(() => {
    if (lightboxIndex !== null && filmstripRef.current) {
      const activeThumb = filmstripRef.current.children[lightboxIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev !== null ? (prev + 1) % filteredItems.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handleQuoteClick = () => {
    closeLightbox();
    if (setView) {
      if (onNavigateToBooking) {
        onNavigateToBooking({ categoryTitle: 'Cross Connect Africa Services' });
      } else {
        setView(ViewState.CALCULATOR);
      }
    }
  };

  const photoCount = GALLERY_ITEMS.filter(i => i.type === 'photo').length;
  const videoCount = GALLERY_ITEMS.filter(i => i.type === 'video').length;

  return (
    <div className="bg-white min-h-screen pt-32 md:pt-36 pb-24 text-neutral-900">

      {/* Minimalist Editorial Header */}
      <header className="max-w-2xl mx-auto px-6 text-center mb-10 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 mb-4">
          Our Work
        </h1>
        <p className="text-sm md:text-base text-neutral-500 font-sans leading-relaxed max-w-md mx-auto">
          Moments from corporate team building, fire safety drills, first aid training, and wilderness expeditions across Kenya.
        </p>

        {/* Quiet Editorial Text Filter */}
        <nav
          aria-label="Filter gallery media"
          className="mt-8 flex items-center justify-center gap-6 text-xs font-medium tracking-wide"
        >
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`pb-1 transition-colors whitespace-nowrap shrink-0 border-b ${
              activeFilter === 'all'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            All ({GALLERY_ITEMS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('photo')}
            className={`pb-1 transition-colors whitespace-nowrap shrink-0 border-b ${
              activeFilter === 'photo'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Photos ({photoCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('video')}
            className={`pb-1 transition-colors whitespace-nowrap shrink-0 border-b ${
              activeFilter === 'video'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Videos ({videoCount})
          </button>
        </nav>
      </header>

      {/* Edge-to-Edge Editorial Collage Grid (Tight White Hairline Seams, Pure Pictures) */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 space-y-1.5">
        {rows.map((row, rowIdx) => {
          if (row.layout === 'full') {
            const { item, index } = row.entries[0];
            return (
              <div key={`row-${rowIdx}`} className="w-full">
                <GalleryTile
                  item={item}
                  onOpen={() => openLightbox(index)}
                  heightClass="h-[260px] sm:h-[400px] md:h-[520px]"
                />
              </div>
            );
          }

          return (
            <div
              key={`row-${rowIdx}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-1.5"
            >
              {row.entries.map((entry, colIdx) => {
                const colSpanClass =
                  row.layout === 'split-even'
                    ? 'md:col-span-6'
                    : row.layout === 'split-wide-left'
                    ? colIdx === 0
                      ? 'md:col-span-8'
                      : 'md:col-span-4'
                    : colIdx === 0
                    ? 'md:col-span-4'
                    : 'md:col-span-8';

                return (
                  <div key={entry.item.id} className={colSpanClass}>
                    <GalleryTile
                      item={entry.item}
                      onOpen={() => openLightbox(entry.index)}
                      heightClass="h-[260px] sm:h-[340px] md:h-[390px]"
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Media Lightbox"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6"
        >
          {/* Top Control Bar */}
          <div
            onClick={e => e.stopPropagation()}
            className="w-full flex items-center justify-between text-white pb-3 border-b border-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="text-white/75 text-xs font-mono uppercase tracking-widest tabular-nums">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-white/50 text-[11px] font-mono mr-2">
                ESC to close · ← → to browse
              </span>

              <button
                type="button"
                onClick={() => {
                  const url = filteredItems[lightboxIndex].url;
                  if (navigator.share) {
                    navigator.share({
                      title: 'Cross Connect Africa Media',
                      url
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(url);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2200);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/10"
                title="Share link"
              >
                {copiedLink ? (
                  <>
                    <Check size={14} className="text-emerald-400" /> Copied
                  </>
                ) : (
                  <>
                    <Share2 size={14} /> Share
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
                className="p-2.5 rounded-lg bg-white/10 text-white hover:bg-brand-gold hover:text-brand-green transition-colors border border-white/10"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Central Media Stage */}
          <div
            onClick={e => e.stopPropagation()}
            className="relative flex-1 flex items-center justify-center py-2 px-2 sm:px-12 w-full max-h-[75vh]"
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Media"
              className="absolute left-2 sm:left-4 z-20 p-3 md:p-4 rounded-full bg-black/60 text-white hover:bg-brand-gold hover:text-brand-green transition-colors border border-white/10"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Media"
              className="absolute right-2 sm:right-4 z-20 p-3 md:p-4 rounded-full bg-black/60 text-white hover:bg-brand-gold hover:text-brand-green transition-colors border border-white/10"
            >
              <ChevronRight size={22} />
            </button>

            {filteredItems[lightboxIndex].type === 'video' ? (
              <div className="w-full max-w-4xl max-h-full overflow-hidden bg-black shadow-2xl border border-white/10 flex items-center justify-center">
                <video
                  src={filteredItems[lightboxIndex].url}
                  controls
                  autoPlay
                  playsInline
                  controlsList="nodownload"
                  className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
                />
              </div>
            ) : (
              <img
                src={filteredItems[lightboxIndex].url}
                alt="Cross Connect Africa Gallery"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[72vh] object-contain shadow-2xl select-none"
              />
            )}
          </div>

          {/* Bottom Actions & Thumbnail Filmstrip */}
          <div
            onClick={e => e.stopPropagation()}
            className="w-full pt-3 border-t border-white/10 flex flex-col items-center gap-3"
          >
            <button
              type="button"
              onClick={handleQuoteClick}
              className="px-6 py-2 bg-brand-gold text-brand-green rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2"
            >
              Book a Service <ArrowRight size={14} />
            </button>

            <div
              ref={filmstripRef}
              className="w-full max-w-3xl flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none"
            >
              {filteredItems.map((item, idx) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative shrink-0 w-12 h-10 overflow-hidden transition-opacity border ${
                    idx === lightboxIndex
                      ? 'border-brand-gold ring-2 ring-brand-gold/60 opacity-100'
                      : 'border-white/20 opacity-50 hover:opacity-90'
                  }`}
                >
                  <img
                    src={item.type === 'video' ? (item.posterUrl || item.url) : item.url}
                    alt="Thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {item.type === 'video' && (
                    <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                      <Play size={10} className="fill-current text-brand-gold" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface GalleryTileProps {
  item: GalleryItem;
  onOpen: () => void;
  heightClass: string;
}

const GalleryTile: React.FC<GalleryTileProps> = ({ item, onOpen, heightClass }) => {
  return (
    <div
      onClick={onOpen}
      className={`group relative w-full ${heightClass} overflow-hidden bg-neutral-100 cursor-pointer`}
    >
      {item.type === 'video' ? (
        <div className="w-full h-full relative bg-neutral-900">
          <video
            src={item.url}
            poster={item.posterUrl}
            muted
            loop
            playsInline
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            onMouseOver={e => (e.target as HTMLVideoElement).play().catch(() => {})}
            onMouseOut={e => (e.target as HTMLVideoElement).pause()}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
            <span className="w-12 h-12 rounded-full bg-white/90 text-neutral-900 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Play size={20} className="fill-current ml-0.5" />
            </span>
          </div>
          <span className="absolute top-3 left-3 text-white/90 text-[11px] font-medium flex items-center gap-1 drop-shadow">
            <Film size={12} /> Video
          </span>
        </div>
      ) : (
        <div className="w-full h-full relative">
          <img
            src={item.url}
            alt="Cross Connect Africa"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-full bg-white/85 text-neutral-900 shadow-md">
              <Maximize2 size={18} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
