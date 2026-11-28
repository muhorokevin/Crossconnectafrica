import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Maximize2, X, ChevronLeft, ChevronRight, ChevronDown, Share2, ArrowRight, ArrowUpRight,
  Play, Film, Check, Image as ImageIcon
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

  // Lakeside staff team day: team-carry challenge videos and group photos
  {
    id: 'little-lions-carry-1',
    type: 'video',
    url: '/videos/little-lions-school-1.mp4',
    posterUrl: '/videos/little-lions-school-1.jpg'
  },
  { id: 'lake-team-group', type: 'photo', url: '/images/lake-team-group.jpg' },
  { id: 'lake-team-small-group', type: 'photo', url: '/images/lake-team-small-group.jpg' },
  {
    id: 'little-lions-carry-2',
    type: 'video',
    url: '/videos/little-lions-school-2.mp4',
    posterUrl: '/videos/little-lions-school-2.jpg'
  },
  { id: 'lake-team-four', type: 'photo', url: '/images/lake-team-four.jpg' },
  { id: 'lake-team-small-group-2', type: 'photo', url: '/images/lake-team-small-group-2.jpg' },

  // Latest photos: CITAM Kadolta team days, catering, marshals and hikes
  { id: 'kadolta-team-fun', type: 'photo', url: '/images/kadolta-team-fun.jpg' },
  { id: 'big-group-rope-bridge', type: 'photo', url: '/images/big-group-rope-bridge.jpg' },
  { id: 'team-water-relay', type: 'photo', url: '/images/team-water-relay.jpg' },
  { id: 'kadolta-team-lawn', type: 'photo', url: '/images/kadolta-team-lawn.jpg' },
  { id: 'marshal-radio', type: 'photo', url: '/images/marshal-radio.jpg' },
  { id: 'kadolta-team-016', type: 'photo', url: '/images/kadolta-team-016.jpg' },
  { id: 'catering-buffet', type: 'photo', url: '/images/catering-buffet.jpg' },
  { id: 'kadolta-team-sign', type: 'photo', url: '/images/kadolta-team-sign.jpg' },
  { id: 'hike-mist', type: 'photo', url: '/images/hike-mist.jpg' },
  { id: 'catering-samosas', type: 'photo', url: '/images/catering-samosas.jpg' },
  { id: 'kadolta-team-lawn-2', type: 'photo', url: '/images/kadolta-team-lawn-2.jpg' },

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

const PAGE_SIZE = 24;

interface GalleryProps {
  setView?: (view: ViewState) => void;
  onNavigateToBooking?: (data: BookingContextData) => void;
}

type Filter = 'all' | 'photo' | 'video';

const Gallery: React.FC<GalleryProps> = ({ setView }) => {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const filteredItems = useMemo(
    () => GALLERY_ITEMS.filter(item => activeFilter === 'all' || item.type === activeFilter),
    [activeFilter]
  );
  const shown = filteredItems.slice(0, visible);

  const counts = {
    all: GALLERY_ITEMS.length,
    photo: GALLERY_ITEMS.filter(i => i.type === 'photo').length,
    video: GALLERY_ITEMS.filter(i => i.type === 'video').length
  };

  const changeFilter = (f: Filter) => { setActiveFilter(f); setVisible(PAGE_SIZE); };

  const closeLightbox = () => setLightboxIndex(null);
  const step = (dir: 1 | -1) =>
    setLightboxIndex(prev => (prev === null ? null : (prev + dir + filteredItems.length) % filteredItems.length));

  // Keyboard controls and scroll lock while the viewer is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [lightboxIndex === null, filteredItems.length]);

  // Keep the active thumbnail in view
  useEffect(() => {
    if (lightboxIndex === null || !filmstripRef.current) return;
    const thumb = filmstripRef.current.children[lightboxIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [lightboxIndex]);

  const share = (url: string) => {
    const full = url.startsWith('/') ? window.location.origin + url : url;
    if (navigator.share) {
      navigator.share({ title: 'Cross Connect Africa', url: full }).catch(() => {});
    } else {
      navigator.clipboard.writeText(full);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const goQuote = () => { closeLightbox(); setView?.(ViewState.CALCULATOR); };

  const current = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-brand-cream min-h-screen pt-28 md:pt-36 pb-10">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-gold">Gallery</p>
          <h1 className="font-display font-bold text-brand-green text-4xl sm:text-5xl md:text-6xl leading-[1.02] mt-4">Our work, in pictures.</h1>
          <p className="text-lg text-brand-green/65 mt-4 leading-relaxed">
            Team days, safety training, drills, hikes and events from across Kenya. Tap any photo to see it full size.
          </p>
        </div>

        <div role="tablist" aria-label="Filter the gallery" className="inline-flex self-start md:self-auto rounded-full bg-white ring-1 ring-brand-green/10 p-1 shadow-soft">
          {([
            ['all', 'All'],
            ['photo', 'Photos'],
            ['video', 'Videos']
          ] as [Filter, string][]).map(([f, label]) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={activeFilter === f}
              onClick={() => changeFilter(f)}
              className={`h-10 px-4 sm:px-5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeFilter === f ? 'bg-brand-green text-white' : 'text-brand-green/70 hover:text-brand-green'
              }`}
            >
              {f === 'video' && <Film size={15} />}
              {f === 'photo' && <ImageIcon size={15} />}
              {label}
              <span className={`text-xs tabular-nums ${activeFilter === f ? 'text-brand-amber' : 'text-brand-green/40'}`}>{counts[f]}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Masonry grid: every photo keeps its own shape, nothing is cropped */}
      <main className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-10">
        <div className="columns-2 md:columns-3 xl:columns-4 gap-2.5 sm:gap-4 [&>*]:mb-2.5 sm:[&>*]:mb-4">
          {shown.map((item, idx) => (
            <GalleryTile key={item.id} item={item} onOpen={() => setLightboxIndex(idx)} />
          ))}
        </div>

        {visible < filteredItems.length && (
          <div className="mt-8 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setVisible(v => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white ring-1 ring-brand-green/15 text-brand-green font-semibold hover:ring-brand-green/40 shadow-soft"
            >
              Show more <ChevronDown size={18} />
            </button>
            <p className="text-sm text-brand-green/50">Showing {shown.length} of {filteredItems.length}</p>
          </div>
        )}
      </main>

      {/* Closing call to action */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-16 md:mt-24">
        <div className="rounded-[28px] bg-brand-ink text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight">Want a day like this for your team?</h2>
            <p className="text-white/65 mt-2 text-lg">See your price in a minute, then send it to us on WhatsApp.</p>
          </div>
          <button
            type="button"
            onClick={goQuote}
            className="group shrink-0 inline-flex items-center gap-3 h-14 pl-7 pr-2 rounded-full bg-brand-amber text-brand-ink font-semibold hover:bg-white transition-colors"
          >
            Get your price
            <span className="w-10 h-10 rounded-full bg-brand-ink text-brand-amber flex items-center justify-center transition-transform group-hover:rotate-45"><ArrowUpRight size={18} /></span>
          </button>
        </div>
      </section>

      {/* Full-screen viewer */}
      {current && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
          className="fixed inset-0 z-[70] bg-brand-ink/[0.97] backdrop-blur-sm flex flex-col animate-fade-in"
        >
          {/* Top bar */}
          <div onClick={e => e.stopPropagation()} className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 text-white">
            <span className="text-sm text-white/60 tabular-nums">{lightboxIndex + 1} / {filteredItems.length}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => share(current.url)} className="h-10 px-4 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold flex items-center gap-1.5">
                {copiedLink ? <><Check size={15} className="text-emerald-400" /> Copied</> : <><Share2 size={15} /> Share</>}
              </button>
              <button type="button" onClick={closeLightbox} aria-label="Close" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-brand-ink flex items-center justify-center">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Stage */}
          <div
            className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-20"
            onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div onClick={e => e.stopPropagation()} className="max-w-full max-h-full flex items-center justify-center">
              {current.type === 'video' ? (
                <video
                  key={current.id}
                  src={current.url}
                  poster={current.posterUrl}
                  controls
                  autoPlay
                  playsInline
                  controlsList="nodownload"
                  className="max-h-[calc(100svh-190px)] max-w-full rounded-2xl bg-black"
                />
              ) : (
                <img
                  key={current.id}
                  src={current.url}
                  alt="Cross Connect Africa event photo"
                  referrerPolicy="no-referrer"
                  className="max-h-[calc(100svh-190px)] max-w-full object-contain rounded-2xl select-none animate-fade-in"
                />
              )}
            </div>

            <button type="button" onClick={e => { e.stopPropagation(); step(-1); }} aria-label="Previous" className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-brand-amber hover:text-brand-ink text-white items-center justify-center">
              <ChevronLeft size={24} />
            </button>
            <button type="button" onClick={e => { e.stopPropagation(); step(1); }} aria-label="Next" className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-brand-amber hover:text-brand-ink text-white items-center justify-center">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom: thumbnails, phone arrows and quote button */}
          <div onClick={e => e.stopPropagation()} className="px-3 sm:px-6 pt-3 pb-4 flex flex-col items-center gap-3">
            <div ref={filmstripRef} className="w-full max-w-4xl flex gap-1.5 overflow-x-auto no-scrollbar py-1">
              {filteredItems.map((item, idx) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Show item ${idx + 1}`}
                  className={`relative shrink-0 w-14 h-11 rounded-lg overflow-hidden transition-all ${idx === lightboxIndex ? 'ring-2 ring-brand-amber opacity-100' : 'opacity-45 hover:opacity-90'}`}
                >
                  <img src={item.type === 'video' ? item.posterUrl || item.url : item.url} alt="" loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  {item.type === 'video' && <span className="absolute inset-0 flex items-center justify-center bg-black/30"><Play size={12} className="text-white fill-current" /></span>}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="Previous" className="sm:hidden w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"><ChevronLeft size={20} /></button>
              <button type="button" onClick={goQuote} className="h-11 px-5 rounded-full bg-brand-amber text-brand-ink text-sm font-semibold flex items-center gap-2 hover:bg-white">
                Get your price <ArrowRight size={15} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next" className="sm:hidden w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GalleryTile: React.FC<{ item: GalleryItem; onOpen: () => void }> = ({ item, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  const isVideo = item.type === 'video';
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={isVideo ? 'Play video' : 'Open photo'}
      className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl sm:rounded-[20px] bg-brand-sand text-left focus-visible:ring-2 focus-visible:ring-brand-gold"
    >
      <img
        src={isVideo ? item.posterUrl || item.url : item.url}
        alt={isVideo ? '' : 'Cross Connect Africa event photo'}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto block transition-all duration-700 group-hover:scale-[1.04] ${loaded ? 'opacity-100' : 'opacity-0 min-h-[180px]'}`}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {isVideo ? (
        <>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-white/90 text-brand-ink shadow-lift flex items-center justify-center transition-transform group-hover:scale-110">
              <Play size={22} className="fill-current ml-0.5" />
            </span>
          </span>
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur text-white text-xs font-semibold flex items-center gap-1">
            <Film size={12} /> Video
          </span>
        </>
      ) : (
        <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 text-brand-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={16} />
        </span>
      )}
    </button>
  );
};

export default Gallery;
