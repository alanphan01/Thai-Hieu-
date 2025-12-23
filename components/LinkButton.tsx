import React from 'react';
import { LinkItem } from '../types';

interface LinkButtonProps {
  item: LinkItem;
}

const LinkButton: React.FC<LinkButtonProps> = ({ item }) => {
  const isFeatured = item.is_featured;

  // Base layout - Less rounded corners for a sharper, military/strategic look
  const baseClasses = "group relative w-full p-6 sm:p-7 rounded-lg transition-all duration-300 flex flex-col justify-center items-start text-left cursor-pointer min-h-[100px] overflow-hidden border";
  
  // Featured: The "Lead Magnet" - Gold, Attention Grabbing
  const featuredClasses = `
    bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500
    border-gold-300
    shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)]
    hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.7)] hover:scale-[1.01]
  `;
  
  // Standard: "Classified Intel" - Dark, Ghostly, High Contrast on hover
  const standardClasses = `
    bg-navy-900/60 backdrop-blur-sm
    border-slate-700
    hover:border-gold-500/50 hover:bg-navy-800
    hover:translate-x-1
  `;

  return (
    <a href={item.url} className={`${baseClasses} ${isFeatured ? featuredClasses : standardClasses}`}>
      
      {/* Tech corner markers for standard buttons */}
      {!isFeatured && (
        <>
          <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-600 group-hover:border-gold-500 transition-colors"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-slate-600 group-hover:border-gold-500 transition-colors"></span>
        </>
      )}

      <div className="relative z-10 w-full flex flex-col gap-2">
        {/* Title: BIG, BOLD, UPPERCASE */}
        <span className={`block uppercase font-black tracking-wider leading-none ${
          isFeatured 
            ? 'text-navy-950 text-xl sm:text-2xl font-serif' 
            : 'text-gray-100 text-lg sm:text-xl group-hover:text-gold-300 transition-colors'
        }`}>
          {isFeatured && <span className="mr-3">⚡</span>}
          {item.title}
        </span>

        {/* Subtitle: Thin, Italic, Short */}
        {item.subtitle && (
          <span className={`block text-xs sm:text-sm font-light italic tracking-wide ${
            isFeatured ? 'text-navy-900/80' : 'text-slate-400 group-hover:text-slate-300'
          }`}>
            {item.subtitle}
          </span>
        )}
      </div>

      {/* Hover glint effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out pointer-events-none"></div>
    </a>
  );
};

export default LinkButton;