import { createClient } from '@supabase/supabase-js';

// Using the credentials provided in the prompt
const SUPABASE_URL = 'https://bkvcxodxaqqcfxfdzpnf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_R-lGJewa6ZjlC_-37Iq-hA_UBmt_IXr _-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);