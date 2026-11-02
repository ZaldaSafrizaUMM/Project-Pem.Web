/*
 * IMPLEMENTASI WEEK 4 - REST API & FETCH API (SINGLE PAGE / DYNAMIC APPLICATION - SHIFT)
 * - Week 4 Task 01: Connect to API (fetch API & parsing JSON)
 * - Week 4 Task 02: Display API Data (DOM manipulation dinamis dari API ke interface SHIFT)
 * - Week 4 Task 03: Handle API State (feedback loading spinner, success data, error handling & tombol Coba Lagi)
 */

/**
 * SHIFT - Single Page & Dynamic Application Entry (Week 4: REST API & Fetch API)
 * File ini menyediakan gerbang integrasi utama untuk modul data Week 4 SHIFT.
 * Logika inti implementasi aktif tersentralisasi pada ./src/shift-core.js dan ./src/app.js.
 */

// =========================================================================
// WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
// Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
// =========================================================================
export const connectToApi = async (endpoint, options = {}) => {
  if (window.ShiftCore && typeof window.ShiftCore.supabaseRest === 'function') {
    return await window.ShiftCore.supabaseRest(endpoint, options);
  }
  const SUPABASE_URL = 'https://ihyramlohtmngbuzmvgs.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeXJhbWxvaHRtbmdidXptdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNjQxNTgsImV4cCI6MjEwNjY0MDE1OH0.DgTvZ555kpoRVXegx-MYJN8tzDyLs3w8TKYO61MtQFQ';
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  return await response.json();
};

// =========================================================================
// WEEK 4 - TASK 02: Display API Data (DOM Manipulation Dinamis ke Interface SHIFT)
// Merender data hasil API secara dinamis ke elemen DOM antarmuka aplikasi
// =========================================================================
export const displayApiData = (containerId, items = [], renderItemFn) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (typeof renderItemFn === 'function') {
    container.innerHTML = items.map(renderItemFn).join('');
  }
};

// =========================================================================
// WEEK 4 - TASK 03: Handle API State (Loading Spinner, Success Data, Error Handling & Tombol Coba Lagi)
// Mengelola feedback visual saat loading, data berhasil dimuat, dan tombol retry saat error
// =========================================================================
export const handleApiState = {
  showLoading: (containerId, message = 'Memuat data dari REST API...') => {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="col-span-full py-12 flex flex-col items-center justify-center text-center gap-3">
        <div class="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p class="text-xs font-semibold text-on-surface-variant">${message}</p>
      </div>
    `;
  },
  showErrorWithRetry: (containerId, errorMsg, retryCallback) => {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="col-span-full p-6 text-center bg-surface-container-lowest rounded-2xl border border-error/20 flex flex-col items-center gap-3">
        <span class="material-symbols-outlined text-[28px] text-error">cloud_off</span>
        <p class="text-xs text-error font-medium">${errorMsg || 'Gagal terhubung ke REST API'}</p>
        <button id="btnRetryState" class="px-5 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all cursor-pointer">
          Coba Lagi
        </button>
      </div>
    `;
    const btn = document.getElementById('btnRetryState');
    if (btn && typeof retryCallback === 'function') {
      btn.addEventListener('click', retryCallback);
    }
  }
};

console.log('🚀 [SHIFT] Week 4 REST API & Fetch API Architecture Ready.');
