import { createClient } from '@supabase/supabase-js';

// Hàm lấy biến môi trường an toàn (hoạt động cho cả Create React App và Vite)
const getEnv = (key: string, viteKey: string) => {
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    // @ts-ignore
    return process.env[key];
  }
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[viteKey]) {
    // @ts-ignore
    return import.meta.env[viteKey];
  }
  return null;
};

// 1. Lấy URL: Ưu tiên từ Env Var, nếu không có thì dùng fallback
const SUPABASE_URL = getEnv('REACT_APP_SUPABASE_URL', 'VITE_SUPABASE_URL') || 'https://bkvcxodxaqqcfxfdzpnf.supabase.co';

// 2. Lấy Key: Ưu tiên từ Env Var. 
// LƯU Ý: Key hardcode ở đây có vẻ bạn đang dùng loại key lạ, hãy đảm bảo lấy đúng "anon" "public" key từ dashboard Supabase.
const SUPABASE_ANON_KEY = getEnv('REACT_APP_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY') || 'sb_publishable_R-lGJewa6ZjlC_-37Iq-hA_UBmt_IXr _-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);