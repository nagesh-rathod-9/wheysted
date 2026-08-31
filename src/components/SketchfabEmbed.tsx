import React from 'react';
import { Rotate3d, ExternalLink, Sparkles } from 'lucide-react';

interface SketchfabEmbedProps {
  title?: string;
  className?: string;
  modelUrl?: string;
  showCredit?: boolean;
}

export const SketchfabEmbed: React.FC<SketchfabEmbedProps> = ({
  title = 'Whey Protein Concentrado 450g',
  className = 'w-full h-full min-h-[380px]',
  modelUrl = 'https://sketchfab.com/models/eae02796dbee4b93b2d62e63cdc7837f/embed?autostart=1&ui_controls=1&ui_infos=0&ui_watermark=0',
  showCredit = true,
}) => {
  return (
    <div className={`relative flex flex-col w-full h-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner ${className}`}>
      {/* 3D Model Iframe */}
      <div className="sketchfab-embed-wrapper flex-1 relative w-full h-full min-h-[320px] bg-slate-100">
        <iframe
          title={title}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src={modelUrl}
          className="w-full h-full absolute inset-0 border-0 rounded-t-2xl"
          loading="lazy"
        />
      </div>

      {/* Credit & 3D Hint Bar */}
      {showCredit && (
        <div className="px-3.5 py-2 bg-white border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <Rotate3d className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
            <span className="font-bold text-slate-800">3D Sketchfab Engine</span>
            <span className="hidden sm:inline text-slate-400">• Drag 360° to rotate</span>
          </div>

          <p className="text-[11px] font-normal text-slate-500 flex items-center gap-1 m-0">
            <a
              href="https://sketchfab.com/3d-models/whey-protein-concentrado-450g-eae02796dbee4b93b2d62e63cdc7837f"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-0.5"
            >
              <span>{title}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="hidden md:inline">
              by{' '}
              <a
                href="https://sketchfab.com/winkler"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="font-bold text-slate-700 hover:text-emerald-600 transition-colors"
              >
                winkler
              </a>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
