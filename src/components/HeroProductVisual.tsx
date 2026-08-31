import React from 'react';
import { FlavorOption } from '../types';
import { handleImageError } from '../utils/imageUtils';

interface HeroProductVisualProps {
  selectedFlavor: FlavorOption;
  selectedImageIdx: number;
  onSelectImageIdx: (idx: number) => void;
}

export const HeroProductVisual: React.FC<HeroProductVisualProps> = ({
  selectedImageIdx,
  onSelectImageIdx,
}) => {
  // Gallery items updated with real high-resolution images
  const galleryItems = [
    {
      id: 0,
      title: 'Wheysted 100% CFM Native Isolate',
      thumbnail: 'https://i.pinimg.com/736x/e7/d8/c6/e7d8c6603e0b4844f628b707bc5d867f.jpg',
    },
    {
      id: 1,
      title: 'Indian Athlete Performance & Strength',
      thumbnail: 'https://i.pinimg.com/736x/0a/f0/a9/0af0a95dda99b5934f7ed5dcc61736f0.jpg',
    },
    {
      id: 2,
      title: 'NABL Certified Lab Tested Purity',
      thumbnail: 'https://i.pinimg.com/1200x/c7/b4/bf/c7b4bf24ede327b9a047c059ef33a7fa.jpg',
    },
  ];

  // Safeguard index within bounds
  const currentIdx = Math.min(Math.max(0, selectedImageIdx), galleryItems.length - 1);
  const currentItem = galleryItems[currentIdx];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between min-h-[560px] sm:min-h-[620px] lg:min-h-[660px]">
      {/* Floating 90% Pure CFM Whey Isolate Badge in Top Right */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-6 z-20 animate-fadeIn">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-red-500/30 blur-md group-hover:bg-red-500/50 transition-all" />
          <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-[#08121e]/95 border-2 border-red-500/90 shadow-[0_0_20px_rgba(224,25,49,0.35)] flex flex-col items-center justify-center text-center p-2 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black text-red-500 leading-none">
              90%
            </span>
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-100 mt-1 leading-tight">
              PURE CFM
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-red-400 leading-tight">
              WHEY ISOLATE
            </span>
          </div>
        </div>
      </div>

      {/* Main Center Product Image with Increased Height */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center pt-2 pb-4">
        <div className="relative w-full max-w-[500px] h-[460px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 flex items-center justify-center group">
          <img
            key={currentItem.id}
            src={currentItem.thumbnail}
            alt={currentItem.title}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Bottom title overlay banner */}
          <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md py-2 px-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between">
            <span className="text-xs font-bold text-white tracking-wide truncate">
              {currentItem.title}
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 shrink-0 ml-2">
              {currentIdx + 1} / {galleryItems.length}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Thumbnail Gallery Selector */}
      <div className="relative z-10 w-full flex flex-col items-center gap-2.5 pb-2">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {galleryItems.map((item) => {
            const isSelected = currentIdx === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectImageIdx(item.id)}
                className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl p-1 bg-slate-900 border transition-all cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-red-500 ring-2 ring-red-500/80 shadow-[0_0_15px_rgba(224,25,49,0.4)] scale-105'
                    : 'border-slate-300 hover:border-slate-400 opacity-75 hover:opacity-100'
                }`}
                title={item.title}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover rounded-xl"
                />
              </button>
            );
          })}
        </div>

        {/* Pagination indicator dots */}
        <div className="flex items-center gap-1.5 pt-1">
          {galleryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectImageIdx(item.id)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIdx === item.id
                  ? 'w-6 h-1.5 bg-[#e01931] shadow-[0_0_8px_rgba(224,25,49,0.6)]'
                  : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to image ${item.id + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
