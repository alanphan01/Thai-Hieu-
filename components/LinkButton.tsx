import React from 'react';
import { LinkItem } from '../types';

interface LinkButtonProps {
  item: LinkItem;
}

const LinkButton: React.FC<LinkButtonProps> = ({ item }) => {
  const isFeatured = item.is_featured;

  // Base layout: Ultra-compact, sharp edges, refined padding
  const baseClasses = "group relative w-full p-3.5 sm:p-4 rounded-sm transition-all duration-500 flex flex-col justify-center items-start text-left cursor-pointer border overflow-hidden";
  
  // Featured: "Black Card" aesthetic - Dark with Gold Border & Text, rather than full Gold background (too flashy/cheap)
  const featuredClasses = `
    bg-[#0A0A0A] 
    border-[#C5A059]
    shadow-[0_0_15px_-3px_rgba(197,160,89,0.15)]
    hover:bg-[#111] hover:shadow-[0_0_20px_-5px_rgba(197,160,89,0.3)]
    hover:border-[#E5C070]
  `;
  
  // Standard: Minimalist Ghost - Almost invisible until hovered
  const standardClasses = `
    bg-[#050505]/40 backdrop-blur-sm
    border-[#1A1A1A]
    hover:bg-[#0A0A0A] hover:border-[#333]
    hover:translate-x-1
  `;

  return (
    <a href={item.url} className={`${baseClasses} ${isFeatured ? featuredClasses : standardClasses}`}>
      
      {/* Featured Marker (Golden Strip on left) */}
      {isFeatured && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#8A6D15] via-[#E5C070] to-[#8A6D15]"></div>
      )}

      {/* Standard Tech Accents - Minimal */}
      {!isFeatured && (
        <span className="absolute top-1/2 right-3 w-1 h-1 bg-slate-800 rounded-full group-hover:bg-[#C5A059] transition-colors duration-300"></span>
      )}

      <div className="relative z-10 w-full pl-2 flex flex-col gap-0.5">
        {/* Title: EB Garamond, Sophisticated size, not too big */}
        <div className="flex items-center">
            {isFeatured && <span className="text-[#C5A059] text-[10px] mr-2 tracking-widest uppercase font-sans font-bold">VIP</span>}
            <span className={`block font-serif font-bold uppercase tracking-wider leading-tight ${
            isFeatured 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#F9F1D8] via-[#E5C070] to-[#B08D1E] text-base sm:text-lg' 
                : 'text-slate-300 text-sm sm:text-base group-hover:text-white transition-colors'
            }`}>
            {item.title}
            </span>
        </div>

        {/* Subtitle: Manrope, Extremely minimal and clean */}
        {item.subtitle && (
          <span className={`block text-[10px] sm:text-[11px] font-sans font-normal tracking-[0.05em] ${
            isFeatured ? 'text-[#C5A059]/80 italic' : 'text-slate-500 group-hover:text-slate-400 italic'
          }`}>
            {item.subtitle}
          </span>
        )}
      </div>

      {/* Subtle Scanline/Shine for Featured */}
      {isFeatured && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E5C070]/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
      )}
    </a>
  );
};

export default LinkButton;