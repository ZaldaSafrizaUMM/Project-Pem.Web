import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ihyramlohtmngbuzmvgs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeXJhbWxvaHRtbmdidXptdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNjQxNTgsImV4cCI6MjEwNjY0MDE1OH0.DgTvZ555kpoRVXegx-MYJN8tzDyLs3w8TKYO61MtQFQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
