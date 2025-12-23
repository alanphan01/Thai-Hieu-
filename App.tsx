import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { LinkItem, ProfileData } from './types';
import { FALLBACK_LINKS, FALLBACK_PROFILE } from './constants';
import LinkButton from './components/LinkButton';

const App: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>(FALLBACK_PROFILE);
  const [links, setLinks] = useState<LinkItem[]>(FALLBACK_LINKS);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (!profileError && profileData) {
          setProfile({
            name: profileData.name,
            role: profileData.role,
            sub_role: profileData.sub_role,
            avatar_url: profileData.avatar_url || FALLBACK_PROFILE.avatar_url,
          });
        }

        const { data: linksData, error: linksError } = await supabase
          .from('links')
          .select('*')
          .order('order_index', { ascending: true });

        if (!linksError && linksData && linksData.length > 0) {
          setLinks(linksData);
        }
      } catch (error) {
        console.error('Error fetching data, using fallback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-6 sm:p-10 lg:p-16 overflow-hidden">
      {/* Background Layers */}
      <div className="bg-luxury-gradient"></div>
      <div className="bg-blueprint"></div>
      <div className="bg-noise"></div>
      
      {/* Content Container */}
      <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start lg:items-center relative">
        
        {/* Left Column: Profile - The Insider */}
        <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-end lg:text-right animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          
          {/* Avatar - Rembrandt Lighting Simulation via CSS */}
          <div className="relative mb-8 group cursor-default">
            {/* Mystic Glow */}
            <div className="absolute -inset-6 rounded-full bg-gold-500/10 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000"></div>
            
            <div className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-full p-[2px] bg-gradient-to-br from-gold-600 via-navy-900 to-gold-600 shadow-2xl">
               <div className="w-full h-full rounded-full overflow-hidden border border-black bg-black relative">
                 <img 
                   src={profile.avatar_url} 
                   alt={profile.name}
                   // Increased contrast and slight grayscale to make it look serious/dramatic
                   className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 filter contrast-125 brightness-90 grayscale-[0.2]"
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://picsum.photos/400/400';
                   }}
                 />
               </div>
            </div>
          </div>

          {/* Typography - Sharp & Authoritative */}
          <div className="space-y-4 flex flex-col items-center lg:items-end w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white drop-shadow-2xl">
              {profile.name}
            </h1>
            
            <div className="flex flex-col items-center lg:items-end gap-2 w-full">
               <div className="bg-gold-500/10 border border-gold-500/30 px-3 py-1">
                 <p className="text-gold-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm shadow-black drop-shadow-md">
                   {profile.role}
                 </p>
               </div>
               
               <p className="text-slate-400 text-sm sm:text-base italic leading-relaxed max-w-sm lg:text-right font-light">
                 "{profile.sub_role}"
               </p>
            </div>
          </div>
        </div>

        {/* Divider (Desktop) - The Thin Gold Line */}
        <div className="hidden lg:block lg:col-span-1 h-full min-h-[400px] w-px bg-gradient-to-b from-transparent via-gold-600/40 to-transparent mx-auto"></div>

        {/* Right Column: Links - The Arsenal */}
        <div className="lg:col-span-6 w-full flex flex-col gap-5">
          {links.map((link, index) => (
            <div 
              key={link.id} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${(index + 1) * 150}ms`, opacity: 0 }}
            >
              <LinkButton item={link} />
            </div>
          ))}

          {/* Footer - The Fear Induction */}
          <div className="mt-10 text-center lg:text-left animate-fade-in-up" style={{ animationDelay: '800ms', opacity: 0 }}>
             <div className="h-px w-full bg-slate-800 mb-6"></div>
             <p className="text-slate-400 text-xs sm:text-sm font-serif italic tracking-wide leading-relaxed">
               "Trong đầu tư, thông tin là tiền tệ.<br className="sm:hidden" /> Bạn đang trả tiền để biết, hay trả giá vì không biết?"
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;