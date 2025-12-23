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
    <div className="min-h-screen w-full relative flex flex-col items-center py-12 px-4 overflow-hidden text-slate-200 font-sans selection:bg-[#C5A059]/30">
      {/* Backgrounds */}
      <div className="bg-luxury-gradient"></div>
      <div className="bg-blueprint"></div>
      <div className="bg-noise"></div>

      {/* Main Content Container - Narrow width for 'Invitation' feel */}
      <div className="w-full max-w-[400px] mx-auto flex flex-col items-center gap-6 relative z-10">

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-5 mb-2 animate-fade-in-up">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-4 bg-[#C5A059]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-[#C5A059]/30 shadow-2xl"
            />
          </div>
          
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-[0.15em] text-[#E5C070] uppercase">
              {profile.name}
            </h1>
            <div className="h-[1px] w-12 bg-[#C5A059]/30 mx-auto my-2"></div>
            <p className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium">
              {profile.role}
            </p>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-500 font-serif italic max-w-[280px] leading-relaxed">
            "{profile.sub_role}"
          </p>
        </div>

        {/* Links Grid - Tighter spacing */}
        <div className="w-full flex flex-col gap-2.5">
          {links.map((link) => (
            <div key={link.id} className="animate-fade-in-up" style={{ animationDelay: `${link.order_index * 100}ms` }}>
              <LinkButton item={link} />
            </div>
          ))}
        </div>

        {/* Footer Quote */}
        <div className="mt-8 pt-6 border-t border-slate-800/30 w-full text-center">
          <p className="text-[9px] sm:text-[10px] text-slate-600 font-serif italic tracking-wider leading-loose opacity-70">
            "TRONG ĐẦU TƯ, THÔNG TIN LÀ TIỀN TỆ.<br/>
            BẠN ĐANG TRẢ TIỀN ĐỂ BIẾT, HAY TRẢ GIÁ VÌ KHÔNG BIẾT?"
          </p>
        </div>

      </div>
    </div>
  );
};

export default App;