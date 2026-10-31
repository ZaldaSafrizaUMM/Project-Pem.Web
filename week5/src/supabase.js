/*
 * IMPLEMENTASI WEEK 4 - REST API & FETCH API (SINGLE PAGE / DYNAMIC APPLICATION - SHIFT)
 * - Week 4 Task 01: Connect to API (fetch API & parsing JSON)
 * - Week 4 Task 02: Display API Data (DOM manipulation dinamis dari API ke interface SHIFT)
 * - Week 4 Task 03: Handle API State (feedback loading spinner, success data, error handling & tombol Coba Lagi)
 */

import { createClient } from '@supabase/supabase-js';

// =========================================================================
// WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
// Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
// =========================================================================
const SUPABASE_URL = 'https://ihyramlohtmngbuzmvgs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeXJhbWxvaHRtbmdidXptdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNjQxNTgsImV4cCI6MjEwNjY0MDE1OH0.DgTvZ555kpoRVXegx-MYJN8tzDyLs3w8TKYO61MtQFQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;

