import React from 'react';

interface WheystedLogoProps {
  variant?: 'navbar' | 'hero' | 'footer' | 'storefront' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const WheystedLogo: React.FC<WheystedLogoProps> = ({
  variant = 'navbar',
  size = 'md',
  className = '',
}) => {
  if (variant === 'storefront') {
    return (
      <div
        className={`relative inline-flex flex-col items-center justify-center bg-[#e01931] px-5 sm:px-8 py-3.5 sm:py-5 rounded-2xl sm:rounded-3xl shadow-xl border border-red-400/40 select-none overflow-hidden ${className}`}
      >
        {/* Subtle illuminated top glow like real storefront sign */}
        <div className="absolute inset-x-0 top-0 h-1 bg-white/40" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-white/20 blur-xl pointer-events-none" />

        {/* 3D Dimensional White WHEYSTED Text */}
        <span
          className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none transform transition-transform"
          style={{
            textShadow: '0 1px 0 #cbd5e1, 0 2px 0 #94a3b8, 0 3px 0 #64748b, 0 4px 6px rgba(0,0,0,0.4)',
            letterSpacing: '0.02em',
          }}
        >
          WHEYSTED
        </span>

        {/* PROTEIN STORE Boxed Tag with White Border */}
        <div className="mt-1.5 sm:mt-2 px-3 sm:px-4 py-0.5 sm:py-1 bg-[#c8102e] border-2 border-white rounded shadow-sm">
          <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-widest text-white uppercase leading-none">
            PROTEIN STORE
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <div className="px-2 py-1 bg-[#e01931] rounded-lg shadow-sm flex flex-col items-center">
          <span
            className="text-xs sm:text-sm font-black tracking-wider text-white uppercase leading-none"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
          >
            WHEYSTED
          </span>
          <span className="text-[7px] font-black tracking-widest text-white/90 uppercase mt-0.5 border-t border-white/40 pt-0.5">
            PROTEIN STORE
          </span>
        </div>
      </div>
    );
  }

  // Default Navbar / Hero / Footer display
  const isFooter = variant === 'footer';
  const sizeClasses = {
    sm: {
      main: 'text-base sm:text-lg',
      sub: 'text-[7px] sm:text-[8px] px-1.5 py-0.5',
      box: 'mt-0.5',
    },
    md: {
      main: 'text-lg sm:text-xl md:text-2xl',
      sub: 'text-[8px] sm:text-[9.5px] px-2 py-0.5',
      box: 'mt-0.5 sm:mt-1',
    },
    lg: {
      main: 'text-2xl sm:text-3xl md:text-4xl',
      sub: 'text-[10px] sm:text-xs px-2.5 py-1',
      box: 'mt-1 sm:mt-1.5',
    },
    xl: {
      main: 'text-3xl sm:text-4xl md:text-5xl',
      sub: 'text-xs sm:text-sm px-3 py-1',
      box: 'mt-1.5 sm:mt-2',
    },
  }[size];

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      {/* 3D WHEYSTED Text */}
      <span
        className={`${sizeClasses.main} font-black tracking-tight uppercase leading-tight ${
          isFooter ? 'text-white' : 'text-slate-900'
        }`}
        style={{
          textShadow: isFooter
            ? '0 1px 0 #cbd5e1, 0 2px 4px rgba(0,0,0,0.5)'
            : '0 1px 0 #94a3b8, 0 2px 2px rgba(0,0,0,0.12)',
          letterSpacing: '0.01em',
        }}
      >
        WHEYSTED
      </span>

      {/* Red Boxed Tag Badge with White Border: PROTEIN STORE */}
      <div
        className={`${sizeClasses.box} ${sizeClasses.sub} bg-[#e01931] border border-red-600 rounded-sm shadow-2xs flex items-center justify-center`}
      >
        <span className="font-black tracking-widest text-white uppercase leading-none">
          PROTEIN STORE
        </span>
      </div>
    </div>
  );
};
