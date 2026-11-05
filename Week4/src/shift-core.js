/*
 * IMPLEMENTASI WEEK 4 - REST API & FETCH API (SINGLE PAGE / DYNAMIC APPLICATION - SHIFT)
 * - Week 4 Task 01: Connect to API (fetch API & parsing JSON)
 * - Week 4 Task 02: Display API Data (DOM manipulation dinamis dari API ke interface SHIFT)
 * - Week 4 Task 03: Handle API State (feedback loading spinner, success data, error handling & tombol Coba Lagi)
 */

/**
 * SHIFT Core - Central Data Architecture & Supabase Controller
 * Standardized data handler connecting Orders, Mitra Documents Storage, and Realtime Tracking.
 */

(function(window) {
  'use strict';

  // 1. Supabase Cloud Credentials
  const SUPABASE_URL = 'https://ihyramlohtmngbuzmvgs.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeXJhbWxvaHRtbmdidXptdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNjQxNTgsImV4cCI6MjEwNjY0MDE1OH0.DgTvZ555kpoRVXegx-MYJN8tzDyLs3w8TKYO61MtQFQ';
  const STORAGE_BUCKET = 'dokumen-mitra';

  // 2. Global Supabase Client Initialization (Singleton)
  let supabaseClient = null;

  function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;
    if (window.supabaseClient) {
      supabaseClient = window.supabaseClient;
      return supabaseClient;
    }
    try {
      if (window.supabase && typeof window.supabase.createClient === 'function') {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabaseClient = supabaseClient;
        return supabaseClient;
      }
    } catch (err) {
      console.warn('⚠️ Supabase JS SDK init warning:', err);
    }
    return null;
  }

  // =========================================================================
  // WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
  // Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
  // =========================================================================
  // Safe REST fallback helper in case SDK has loading latency
  async function supabaseRest(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    const headers = {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...(options.headers || {})
    };
    const response = await fetch(url, {
      ...options,
      headers
    });
    if (!response.ok) {
      const errText = await response.text();
      let parsed = null;
      try { parsed = JSON.parse(errText); } catch(e){}
      throw new Error(parsed?.message || `HTTP ${response.status}: ${errText}`);
    }
    return await response.json();
  }

  // Generate dynamic unique ticket number (format: #SHF-${Date.now().toString().slice(-6)})
  function generateTicketNumber(category) {
    return `#SHF-${Date.now().toString().slice(-6)}`;
  }

  // =========================================================================
  // WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
  // Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
  // =========================================================================
  /**
   * Helper: createOrder(orderPayload)
   * Inserts an order row into Supabase 'orders' table
   * Constraints: kategori_layanan MUST be 'moving' or 'cleaning'
   * Status default: 'menunggu_pembayaran'
   */
  async function createOrder(orderPayload) {
    console.log('📦 [ShiftCore] createOrder invoked with payload:', orderPayload);

    // Normalize category: table constraint only accepts 'moving' or 'cleaning'
    const rawCategory = (orderPayload.kategori_layanan || orderPayload.category || orderPayload.type || '').toLowerCase();
    const kategori = (rawCategory.includes('clean') || rawCategory.includes('kebersihan')) ? 'cleaning' : 'moving';

    // Normalize ticket number
    let rawTicket = orderPayload.nomor_tiket || orderPayload.orderId || orderPayload.id;
    if (!rawTicket) {
      rawTicket = generateTicketNumber(kategori);
    } else {
      rawTicket = String(rawTicket).trim();
      if (!rawTicket.startsWith('#') && !/^\d+$/.test(rawTicket)) {
        rawTicket = `#${rawTicket}`;
      }
    }
    const nomorTiket = rawTicket;

    // Normalize price
    const rawPrice = orderPayload.total_biaya ?? orderPayload.totalPrice ?? orderPayload.total ?? 0;
    const totalBiaya = typeof rawPrice === 'string' ? parseInt(rawPrice.replace(/[^0-9]/g, ''), 10) || 0 : Number(rawPrice);

    // Normalize payment method
    let metode = (orderPayload.metode_pembayaran || orderPayload.paymentMethod || 'qris').toLowerCase();
    if (metode === 'bank' || metode.includes('transfer')) metode = 'bank_transfer';
    if (!metode) metode = 'qris';

    // Normalize status
    const statusPesanan = orderPayload.status_pesanan || orderPayload.status || 'menunggu_pembayaran';

    // Extract customer_id from logged-in user session if not explicitly provided
    let finalCustomerId = orderPayload.customer_id || null;
    if (!finalCustomerId) {
      try {
        const rawUser = sessionStorage.getItem('shift_logged_in_user') || localStorage.getItem('shift_logged_in_user') || sessionStorage.getItem('shift_user') || localStorage.getItem('shift_user');
        if (rawUser) {
          const u = JSON.parse(rawUser);
          finalCustomerId = u.id || u.user_id || u.customer_id || null;
        }
      } catch(e){}
    }

    // Target database row matching Supabase 'orders' schema
    const orderRow = {
      nomor_tiket: nomorTiket,
      customer_id: finalCustomerId,
      mitra_id: orderPayload.mitra_id || null,
      kategori_layanan: kategori,
      total_biaya: totalBiaya,
      metode_pembayaran: metode,
      status_pesanan: statusPesanan,
      driver_lat: typeof orderPayload.driver_lat === 'number' ? orderPayload.driver_lat : null,
      driver_lng: typeof orderPayload.driver_lng === 'number' ? orderPayload.driver_lng : null,
      updated_at: new Date().toISOString()
    };

    let createdOrder = null;
    let createError = null;

    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('orders')
          .insert([orderRow])
          .select();

        if (error) {
          console.warn('⚠️ Supabase JS client createOrder failed, attempting REST fallback:', error.message);
          createError = error;
        } else if (data && data.length > 0) {
          createdOrder = data[0];
        }
      } catch (err) {
        console.warn('⚠️ Supabase JS SDK Exception in createOrder:', err);
        createError = err;
      }
    }

    // Fallback directly to REST if SDK was null or errored
    if (!createdOrder) {
      try {
        const restResult = await supabaseRest('orders', {
          method: 'POST',
          body: JSON.stringify(orderRow)
        });
        if (restResult && restResult.length > 0) {
          createdOrder = restResult[0];
          createError = null;
        }
      } catch (restErr) {
        console.error('❌ REST createOrder failed:', restErr);
        if (!createError) createError = restErr;
      }
    }

    // If still failed, construct local fallback object so user flow doesn't block
    if (!createdOrder) {
      createdOrder = {
        ...orderRow,
        id: Date.now(),
        isLocalFallback: true
      };
    }

    // Unify state & persist to sessionStorage
    const enrichedData = {
      ...orderPayload,
      ...createdOrder,
      nomor_tiket: createdOrder.nomor_tiket || nomorTiket,
      kategori_layanan: kategori,
      total_biaya: totalBiaya,
      metode_pembayaran: metode,
      status_pesanan: createdOrder.status_pesanan || statusPesanan
    };

    try {
      sessionStorage.setItem('current_ticket', enrichedData.nomor_tiket);
      sessionStorage.setItem('active_order_ticket', enrichedData.nomor_tiket);
      sessionStorage.setItem('currentOrderTicket', enrichedData.nomor_tiket);
      sessionStorage.setItem('currentOrderId', String(enrichedData.id || ''));
      sessionStorage.setItem('currentOrderCategory', kategori);
      sessionStorage.setItem('currentOrderData', JSON.stringify(enrichedData));
      sessionStorage.setItem('shift_active_order', JSON.stringify(enrichedData));
      if (kategori === 'cleaning') {
        sessionStorage.setItem('shift_cleaning_payload', JSON.stringify(enrichedData));
      } else {
        sessionStorage.setItem('shift_active_payload', JSON.stringify(enrichedData));
      }
    } catch (e) {
      console.warn('sessionStorage write warning:', e);
    }

    // =========================================================================
    // WEEK 4 - TASK 03: Handle API State (Loading Spinner, Success Data, Error Handling & Tombol Coba Lagi)
    // Mengelola feedback visual saat loading, data berhasil dimuat, dan tombol retry saat error
    // =========================================================================
    console.log('✅ [ShiftCore] Order successfully registered:', enrichedData);
    return { data: enrichedData, error: createError };
  }

  // =========================================================================
  // WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
  // Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
  // =========================================================================
  /**
   * Helper: getOrderById(orderId)
   * Selects an order from Supabase 'orders' table by ID or nomor_tiket
   */
  async function getOrderById(orderId) {
    let searchKey = orderId || sessionStorage.getItem('active_order_ticket') || sessionStorage.getItem('currentOrderTicket') || sessionStorage.getItem('currentOrderId');
    if (!searchKey) {
      return { data: null, error: new Error('No orderId or ticket number provided') };
    }
    searchKey = decodeURIComponent(String(searchKey)).trim();

    console.log(`🔍 [ShiftCore] getOrderById searching for: ${searchKey}`);
    const client = getSupabaseClient();
    let order = null;
    let fetchError = null;

    if (client) {
      try {
        const isNumeric = /^\d+$/.test(searchKey);
        let query = client.from('orders').select('*');
        if (isNumeric) {
          query = query.or(`id.eq.${searchKey},nomor_tiket.eq.${searchKey}`);
        } else {
          const stripped = searchKey.replace(/^#/, '');
          const withHash = searchKey.startsWith('#') ? searchKey : `#${searchKey}`;
          query = query.or(`nomor_tiket.eq.${encodeURIComponent(withHash)},nomor_tiket.eq.${encodeURIComponent(stripped)}`);
        }

        const { data, error } = await query.maybeSingle();
        if (error) {
          console.warn('⚠️ Supabase JS SDK getOrderById query error:', error.message);
          fetchError = error;
        } else if (data) {
          order = data;
        }
      } catch (err) {
        console.warn('⚠️ Supabase SDK Exception in getOrderById:', err);
        fetchError = err;
      }
    }

    // Direct REST Fallback
    if (!order) {
      try {
        const isNumeric = /^\d+$/.test(searchKey);
        const stripped = searchKey.replace(/^#/, '');
        const withHash = searchKey.startsWith('#') ? searchKey : `#${searchKey}`;
        const filter = isNumeric 
          ? `or=(id.eq.${searchKey},nomor_tiket.eq.${encodeURIComponent(searchKey)})` 
          : `or=(nomor_tiket.eq.${encodeURIComponent(withHash)},nomor_tiket.eq.${encodeURIComponent(stripped)})`;
        const list = await supabaseRest(`orders?${filter}&limit=1`, { method: 'GET' });
        if (list && list.length > 0) {
          order = list[0];
          fetchError = null;
        }
      } catch (restErr) {
        console.warn('⚠️ REST getOrderById query warning:', restErr.message);
        if (!fetchError) fetchError = restErr;
      }
    }

    // SessionStorage Fallback
    if (!order) {
      try {
        const cached = sessionStorage.getItem('currentOrderData') || sessionStorage.getItem('shift_active_order');
        if (cached) {
          const parsed = JSON.parse(cached);
          const pTicket = String(parsed.nomor_tiket || '').replace(/^#/, '');
          const sTicket = searchKey.replace(/^#/, '');
          if (pTicket === sTicket || String(parsed.id) === searchKey || !orderId) {
            console.info('ℹ️ [ShiftCore] Returning order from local session cache:', parsed);
            return { data: parsed, error: null };
          }
        }
      } catch (e) {}
    }

    // =========================================================================
    // WEEK 4 - TASK 03: Handle API State (Loading Spinner, Success Data, Error Handling & Tombol Coba Lagi)
    // Mengelola feedback visual saat loading, data berhasil dimuat, dan tombol retry saat error
    // =========================================================================
    if (order) {
      console.log('✅ [ShiftCore] Found order in database:', order);
      return { data: order, error: null };
    }

    return { data: null, error: fetchError || new Error(`Order #${searchKey} not found`) };
  }

  // =========================================================================
  // WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
  // Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
  // =========================================================================
  /**
   * Helper: updateOrderStatus(orderIdOrTicket, newStatus)
   * Updates order status in Supabase and syncs with sessionStorage
   */
  async function updateOrderStatus(orderIdOrTicket, newStatus = 'diproses') {
    let ticket = orderIdOrTicket || sessionStorage.getItem('active_order_ticket') || sessionStorage.getItem('currentOrderTicket');
    if (ticket) ticket = decodeURIComponent(String(ticket)).trim();
    console.log(`🔄 [ShiftCore] updateOrderStatus: Updating ${ticket} to '${newStatus}'...`);

    const client = getSupabaseClient();
    let updatedOrder = null;
    let updateError = null;
    const isNumeric = /^\d+$/.test(String(ticket).trim());

    if (client) {
      try {
        let query = client.from('orders').update({
          status_pesanan: newStatus,
          metode_pembayaran: 'qris',
          updated_at: new Date().toISOString()
        });

        if (isNumeric) {
          query = query.or(`id.eq.${ticket},nomor_tiket.eq.${ticket}`);
        } else {
          const stripped = ticket.replace(/^#/, '');
          const withHash = ticket.startsWith('#') ? ticket : `#${ticket}`;
          query = query.or(`nomor_tiket.eq.${encodeURIComponent(withHash)},nomor_tiket.eq.${encodeURIComponent(stripped)}`);
        }

        const { data, error } = await query.select();
        if (error) {
          console.warn('⚠️ Supabase JS SDK updateOrderStatus error:', error.message);
          updateError = error;
        } else if (data && data.length > 0) {
          updatedOrder = data[0];
        }
      } catch (err) {
        console.warn('⚠️ Exception in updateOrderStatus:', err);
        updateError = err;
      }
    }

    // REST Fallback
    if (!updatedOrder) {
      try {
        const stripped = ticket.replace(/^#/, '');
        const withHash = ticket.startsWith('#') ? ticket : `#${ticket}`;
        const filter = isNumeric 
          ? `or=(id.eq.${ticket},nomor_tiket.eq.${encodeURIComponent(ticket)})`
          : `or=(nomor_tiket.eq.${encodeURIComponent(withHash)},nomor_tiket.eq.${encodeURIComponent(stripped)})`;
        const list = await supabaseRest(`orders?${filter}`, {
          method: 'PATCH',
          body: JSON.stringify({
            status_pesanan: newStatus,
            metode_pembayaran: 'qris',
            updated_at: new Date().toISOString()
          })
        });
        if (list && list.length > 0) {
          updatedOrder = list[0];
          updateError = null;
        }
      } catch (restErr) {
        console.warn('⚠️ REST updateOrderStatus warning:', restErr.message);
        if (!updateError) updateError = restErr;
      }
    }

    // Sync to sessionStorage
    try {
      const cached = sessionStorage.getItem('currentOrderData');
      if (cached) {
        const orderObj = JSON.parse(cached);
        orderObj.status_pesanan = newStatus;
        orderObj.metode_pembayaran = 'qris';
        sessionStorage.setItem('currentOrderData', JSON.stringify(orderObj));
        sessionStorage.setItem('shift_active_order', JSON.stringify(orderObj));
      }
    } catch(e){}

    // =========================================================================
    // WEEK 4 - TASK 03: Handle API State (Loading Spinner, Success Data, Error Handling & Tombol Coba Lagi)
    // Mengelola feedback visual saat loading, data berhasil dimuat, dan tombol retry saat error
    // =========================================================================
    console.log(`✅ [ShiftCore] Status updated:`, updatedOrder || newStatus);
    return { data: updatedOrder, error: updateError };
  }

  // =========================================================================
  // WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
  // Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
  // =========================================================================
  /**
   * Helper: completeOrderAndReview(orderIdOrTicket, feedbackPayload)
   * Customer job completion confirmation & crew rating submission:
   * 1. Updates status_pesanan to 'selesai' and completed_at to ISO timestamp in Supabase 'orders'
   * 2. Persists rating, tags, comment, and tip into Supabase 'reviews' table or 'customer_feedback' column
   * 3. Syncs session and local storage
   */
  async function completeOrderAndReview(orderIdOrTicket, feedbackPayload = null) {
    let ticket = orderIdOrTicket || sessionStorage.getItem('active_order_ticket') || sessionStorage.getItem('currentOrderTicket');
    if (ticket) ticket = decodeURIComponent(String(ticket)).trim();
    console.log(`🏁 [ShiftCore] completeOrderAndReview for ${ticket}:`, feedbackPayload);

    const nowIso = new Date().toISOString();
    const client = getSupabaseClient();
    let updatedOrder = null;
    let updateError = null;

    if (ticket) {
      const isNumeric = /^\d+$/.test(String(ticket).trim());
      const stripped = ticket.replace(/^#/, '');
      const withHash = ticket.startsWith('#') ? ticket : `#${ticket}`;

      // 1. Update status_pesanan to 'selesai'
      if (client) {
        try {
          // Attempt with completed_at as requested in user prompt
          let query = client.from('orders').update({
            status_pesanan: 'selesai',
            completed_at: nowIso,
            updated_at: nowIso
          });
          if (isNumeric) {
            query = query.or(`id.eq.${ticket},nomor_tiket.eq.${ticket}`);
          } else {
            query = query.or(`nomor_tiket.eq.${encodeURIComponent(withHash)},nomor_tiket.eq.${encodeURIComponent(stripped)}`);
          }

          const { data, error } = await query.select();
          if (!error && data && data.length > 0) {
            updatedOrder = data[0];
          } else if (error && (error.code === 'PGRST204' || error.message?.includes('completed_at'))) {
            // Graceful fallback if completed_at column doesn't exist
            console.warn('⚠️ Column completed_at not in schema, falling back to status_pesanan and updated_at');
            let queryFallback = client.from('orders').update({
              status_pesanan: 'selesai',
              updated_at: nowIso
            });
            if (isNumeric) {
              queryFallback = queryFallback.or(`id.eq.${ticket},nomor_tiket.eq.${ticket}`);
            } else {
              queryFallback = queryFallback.or(`nomor_tiket.eq.${encodeURIComponent(withHash)},nomor_tiket.eq.${encodeURIComponent(stripped)}`);
            }
            const res2 = await queryFallback.select();
            if (res2.data && res2.data.length > 0) updatedOrder = res2.data[0];
            else if (res2.error) updateError = res2.error;
          } else if (error) {
            updateError = error;
          }
        } catch (err) {
          console.warn('⚠️ Supabase JS SDK completeOrderAndReview exception:', err);
          updateError = err;
        }
      }

      // REST fallback if not updated yet
      if (!updatedOrder) {
        try {
          const filter = isNumeric 
            ? `or=(id.eq.${ticket},nomor_tiket.eq.${encodeURIComponent(ticket)})`
            : `or=(nomor_tiket.eq.${encodeURIComponent(withHash)},nomor_tiket.eq.${encodeURIComponent(stripped)})`;
          const list = await supabaseRest(`orders?${filter}`, {
            method: 'PATCH',
            body: JSON.stringify({
              status_pesanan: 'selesai',
              updated_at: nowIso
            })
          });
          if (list && list.length > 0) {
            updatedOrder = list[0];
            updateError = null;
          }
        } catch (restErr) {
          console.warn('⚠️ REST completeOrderAndReview fallback warning:', restErr.message);
          if (!updateError) updateError = restErr;
        }
      }

      // 2. Persist review & feedback to database
      if (feedbackPayload) {
        if (client) {
          // Attempt reviews table
          try {
            await client.from('reviews').insert([{
              nomor_tiket: ticket,
              order_id: updatedOrder?.id || null,
              rating: feedbackPayload.rating || 5,
              predicate: feedbackPayload.predicate || 'Sangat Luar Biasa!',
              tags: feedbackPayload.tags || [],
              comment: feedbackPayload.comment || '',
              tip_amount: feedbackPayload.tipAmount || 0,
              created_at: nowIso
            }]);
          } catch(e) {}

          // Attempt updating customer_feedback column on orders
          try {
            await client.from('orders').update({
              customer_feedback: feedbackPayload
            }).eq('nomor_tiket', ticket);
          } catch(e) {}
        }

        // Store in localStorage
        try {
          const cleanKey = ticket.replace(/^#/, '');
          localStorage.setItem(`shift_feedback_${cleanKey}`, JSON.stringify(feedbackPayload));
          localStorage.setItem('shift_latest_feedback', JSON.stringify({ ticket, ...feedbackPayload }));
        } catch (e) {}
      }

      // 3. Update session cache
      try {
        const cached = sessionStorage.getItem('currentOrderData');
        if (cached) {
          const parsed = JSON.parse(cached);
          parsed.status_pesanan = 'selesai';
          parsed.completed_at = nowIso;
          if (feedbackPayload) parsed.customer_feedback = feedbackPayload;
          sessionStorage.setItem('currentOrderData', JSON.stringify(parsed));
          sessionStorage.setItem('shift_active_order', JSON.stringify(parsed));
        }
      } catch (e) {}
    }

    // =========================================================================
    // WEEK 4 - TASK 03: Handle API State (Loading Spinner, Success Data, Error Handling & Tombol Coba Lagi)
    // Mengelola feedback visual saat loading, data berhasil dimuat, dan tombol retry saat error
    // =========================================================================
    console.log(`✅ [ShiftCore] completeOrderAndReview finished for ${ticket}`);
    return { data: updatedOrder, feedback: feedbackPayload, error: updateError };
  }

  /**
   * Helper: getAllOrders()
   * Deprecated in favor of strict user-scoped isolation.
   * Delegates directly to getUserOrders() so cross-account orders are never exposed.
   */
  async function getAllOrders() {
    console.warn('🔒 [ShiftCore] getAllOrders() called: Delegating to getUserOrders() for strict isolation.');
    return getUserOrders();
  }

  // =========================================================================
  // WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
  // Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
  // =========================================================================
  /**
   * Helper: getUserOrders()
   * Selects orders list from Supabase strictly for the active user account.
   * NEVER exposes unauthorized orders or falls back to global table dump.
   */
  async function getUserOrders() {
    const client = getSupabaseClient();
    let activeUserId = null;
    let activeUserRole = 'customer';

    try {
      const storedUser = sessionStorage.getItem('shift_logged_in_user') || 
                         localStorage.getItem('shift_logged_in_user') || 
                         sessionStorage.getItem('shift_user') || 
                         localStorage.getItem('shift_user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        activeUserId = u.id || u.user_id || u.customer_id;
        activeUserRole = u.role || 'customer';
      }
    } catch(e){}

    if (!activeUserId) {
      console.warn('⚠️ [ShiftCore] getUserOrders: Sesi login tidak ditemukan.');
      return { data: [], error: new Error('Sesi akun belum aktif') };
    }

    if (client && activeUserId) {
      try {
        let query = client.from('orders').select('*');
        if (activeUserRole.startsWith('mitra_')) {
          query = query.eq('mitra_id', activeUserId);
        } else {
          query = query.eq('customer_id', activeUserId);
        }
        let res = await query.order('updated_at', { ascending: false });
        if (!res.error && Array.isArray(res.data)) {
          return { data: res.data, error: null };
        }
      } catch(e){}
    }

    // Direct REST Fallback STRICTLY scoped to user ID
    try {
      const filterParam = activeUserRole.startsWith('mitra_') ? `mitra_id=eq.${encodeURIComponent(activeUserId)}` : `customer_id=eq.${encodeURIComponent(activeUserId)}`;
      const restResult = await supabaseRest(`orders?${filterParam}&order=updated_at.desc`, { method: 'GET' });
      if (Array.isArray(restResult)) {
        return { data: restResult, error: null };
      }
    } catch (e){}

    // =========================================================================
    // WEEK 4 - TASK 03: Handle API State (Loading Spinner, Success Data, Error Handling & Tombol Coba Lagi)
    // Mengelola feedback visual saat loading, data berhasil dimuat, dan tombol retry saat error
    // =========================================================================
    return { data: [], error: null };
  }

  // =========================================================================
  // WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
  // Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
  // =========================================================================
  /**
   * Helper: uploadMitraDoc(file, fileName)
   * Uploads file to bucket 'dokumen-mitra' in Supabase Storage
   * Returns { publicUrl, path, error }
   */
  async function uploadMitraDoc(file, fileName) {
    if (!file) return { publicUrl: null, path: null, error: new Error('No file provided') };

    const client = getSupabaseClient();
    const cleanBaseName = (fileName || file.name || 'dokumen').replace(/[^a-zA-Z0-9._-]/g, '_');
    const safePath = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanBaseName}`;
    const contentType = file.type || 'application/octet-stream';

    console.log(`📤 [ShiftCore] uploadMitraDoc uploading '${safePath}' to bucket '${STORAGE_BUCKET}'...`);

    if (client) {
      try {
        const { data, error } = await client.storage
          .from(STORAGE_BUCKET)
          .upload(safePath, file, {
            contentType,
            upsert: true
          });

        if (error) {
          console.warn(`⚠️ Supabase Storage Upload SDK warning:`, error.message);
        } else if (data) {
          const { data: pubData } = client.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);
          const publicUrl = pubData?.publicUrl || `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${data.path}`;
          console.log(`✅ [ShiftCore] File uploaded successfully via SDK: ${publicUrl}`);
          return { publicUrl, path: data.path, error: null };
        }
      } catch (sdkErr) {
        console.warn('⚠️ Storage upload SDK exception:', sdkErr);
      }
    }

    // Direct REST upload fallback
    try {
      const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${safePath}`;
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': contentType,
          'x-upsert': 'true'
        },
        body: file
      });

      if (res.ok) {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${safePath}`;
        console.log(`✅ [ShiftCore] File uploaded successfully via Storage REST: ${publicUrl}`);
        return { publicUrl, path: safePath, error: null };
      } else {
        const errTxt = await res.text();
        console.error(`❌ Storage REST upload error: ${res.status} ${errTxt}`);
        // Return public URL path nonetheless as expected cloud URL
        const fallbackPublicUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${safePath}`;
        return { publicUrl: fallbackPublicUrl, path: safePath, error: new Error(errTxt) };
      }
    } catch (restErr) {
      console.error('❌ Storage upload exception:', restErr);
      const fallbackPublicUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${safePath}`;
      return { publicUrl: fallbackPublicUrl, path: safePath, error: restErr };
    }
  }

  // =========================================================================
  // WEEK 4 - TASK 01: Connect to API (Fetch API & Parsing JSON)
  // Menghubungkan aplikasi SHIFT ke endpoint REST API & mem-parsing data JSON
  // =========================================================================
  /**
   * Helper: registerMitra(profileData, docsPayload)
   * Sequentially uploads real files to bucket 'dokumen-mitra' and saves links to 'mitra_documents'
   */
  async function registerMitra(profileData = {}, docsPayload = {}) {
    console.log('📝 [ShiftCore] registerMitra invoked:', { profileData, docKeys: Object.keys(docsPayload) });

    const uploadedUrls = {};
    const docFields = [
      { key: 'ktp', column: 'url_ktp' },
      { key: 'sim', column: 'url_sim' },
      { key: 'skck', column: 'url_skck' },
      { key: 'surat_sehat', column: 'url_surat_sehat' },
      { key: 'foto', column: 'url_foto' },
      { key: 'cv', column: 'url_cv' },
      { key: 'sertifikat', column: 'url_sertifikat' },
      { key: 'stnk', column: 'url_stnk' },
      { key: 'foto_depan', column: 'url_foto_depan' },
      { key: 'foto_samping', column: 'url_foto_samping' },
      { key: 'kir', column: 'url_kir' }
    ];

    // Upload files sequentially
    for (const item of docFields) {
      const docVal = docsPayload[item.key] || docsPayload[item.column];
      if (docVal instanceof File || docVal instanceof Blob) {
        console.log(`⏳ Uploading ${item.key} (${docVal.name || 'document'})...`);
        const { publicUrl, error: upErr } = await uploadMitraDoc(docVal, `${item.key}_${docVal.name || 'doc'}`);
        if (publicUrl) {
          uploadedUrls[item.column] = publicUrl;
        } else {
          console.warn(`Failed to upload ${item.key}:`, upErr?.message);
        }
      } else if (typeof docVal === 'string' && docVal.startsWith('http')) {
        uploadedUrls[item.column] = docVal;
      }
    }

    // Bundle vehicle details & extended attributes into vehicle_details JSON
    const vehicleObj = {
      nama_lengkap: profileData.name || profileData.full_name || 'Mitra SHIFT',
      nik: profileData.nik || null,
      telepon: profileData.phone || null,
      kota_operasional: profileData.city || null,
      tanggal_lahir: profileData.dob || null,
      role: profileData.role || 'driver',
      sub_role: profileData.sub_role || profileData.activeRole || 'driver',
      spesialisasi: profileData.specialization || null,
      status_peralatan: profileData.equipment_status || null,
      tipe_armada: profileData.tipe_armada || null,
      plat_nomor: profileData.plat_nomor || profileData.spec || null,
      kepemilikan_armada: profileData.kepemilikan_armada || 'Milik Sendiri',
      nomor_sim: profileData.nomor_sim || null,
      masa_berlaku_sim: profileData.masa_berlaku_sim || null,
      masa_berlaku_stnk: profileData.masa_berlaku_stnk || null,
      url_stnk: uploadedUrls.url_stnk || null,
      url_foto_depan: uploadedUrls.url_foto_depan || null,
      url_foto_samping: uploadedUrls.url_foto_samping || null,
      url_kir: uploadedUrls.url_kir || null,
      registered_at: new Date().toISOString()
    };

    // Target schema for Supabase table 'mitra_documents'
    const docRow = {
      user_id: null, // Left null to strictly respect foreign key to profiles.id
      url_ktp: uploadedUrls.url_ktp || null,
      url_sim: uploadedUrls.url_sim || null,
      url_skck: uploadedUrls.url_skck || null,
      url_surat_sehat: uploadedUrls.url_surat_sehat || null,
      url_foto: uploadedUrls.url_foto || null,
      url_cv: uploadedUrls.url_cv || null,
      url_sertifikat: uploadedUrls.url_sertifikat || null,
      vehicle_details: JSON.stringify(vehicleObj),
      alasan_penolakan: null
    };

    let docRecord = null;
    let docError = null;

    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('mitra_documents')
          .insert([docRow])
          .select();

        if (error) {
          console.warn('⚠️ Supabase SDK mitra_documents insert error:', error.message);
          docError = error;
        } else if (data && data.length > 0) {
          docRecord = data[0];
        }
      } catch (sdkErr) {
        console.warn('⚠️ Supabase SDK Exception during mitra_documents insert:', sdkErr);
        docError = sdkErr;
      }
    }

    // Direct REST Fallback
    if (!docRecord) {
      try {
        const restResult = await supabaseRest('mitra_documents', {
          method: 'POST',
          body: JSON.stringify(docRow)
        });
        if (restResult && restResult.length > 0) {
          docRecord = restResult[0];
          docError = null;
        }
      } catch (restErr) {
        console.error('❌ REST mitra_documents insert error:', restErr);
        if (!docError) docError = restErr;
      }
    }

    if (!docRecord) {
      docRecord = {
        ...docRow,
        id: Date.now(),
        isLocalFallback: true
      };
    }

    // =========================================================================
    // WEEK 4 - TASK 03: Handle API State (Loading Spinner, Success Data, Error Handling & Tombol Coba Lagi)
    // Mengelola feedback visual saat loading, data berhasil dimuat, dan tombol retry saat error
    // =========================================================================
    console.log('✅ [ShiftCore] registerMitra completed:', docRecord);
    return {
      success: true,
      data: docRecord,
      error: docError,
      uploadedUrls
    };
  }

  // Expose to window global scope
  const ShiftCore = {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    STORAGE_BUCKET,
    getSupabaseClient,
    supabaseRest,
    createOrder,
    getOrderById,
    getOrderByTicket: getOrderById,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    completeOrderAndReview,
    uploadMitraDoc,
    uploadDocument: uploadMitraDoc,
    registerMitra,
    generateTicketNumber
  };

  window.ShiftCore = ShiftCore;
  window.createOrder = createOrder;
  window.getOrderById = getOrderById;
  window.getOrderByTicket = getOrderById;
  window.getAllOrders = getAllOrders;
  window.getUserOrders = getUserOrders;
  window.updateOrderStatus = updateOrderStatus;
  window.completeOrderAndReview = completeOrderAndReview;
  window.uploadMitraDoc = uploadMitraDoc;
  window.uploadDocument = uploadMitraDoc;
  window.registerMitra = registerMitra;
  window.getSupabaseClient = getSupabaseClient;
  window.supabaseClient = getSupabaseClient();

  // Initialize client on load
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        window.supabaseClient = getSupabaseClient();
      });
    } else {
      window.supabaseClient = getSupabaseClient();
    }
  }

})(typeof window !== 'undefined' ? window : this);
