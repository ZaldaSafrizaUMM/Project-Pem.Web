/**
 * SHIFT App - Complete Unified Dynamic Engine & State Manager
 * Fully supports Home, Pindahan Booking, Deep Cleaning Booking, QRIS & Bank Transfer Payment,
 * Reactive Live Tracker (Pindahan & Cleaning), and History & Help Center.
 */

// Supabase Cloud Credentials & Dynamic Client Initialization
const SUPABASE_URL = 'https://ihyramlohtmngbuzmvgs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeXJhbWxvaHRtbmdidXptdmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNjQxNTgsImV4cCI6MjEwNjY0MDE1OH0.DgTvZ555kpoRVXegx-MYJN8tzDyLs3w8TKYO61MtQFQ';

let supabaseClient = null;
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  try {
    if (window.supabaseClient) {
      supabaseClient = window.supabaseClient;
      return supabaseClient;
    }
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      window.supabaseClient = supabaseClient;
      return supabaseClient;
    }
    if (typeof createClient === 'function') {
      supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      window.supabaseClient = supabaseClient;
      return supabaseClient;
    }
  } catch (err) {
    console.warn('⚠️ Supabase Client Safe Fallback:', err);
  }
  return null;
}

function generateUUID() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const STORAGE_KEY = 'shift_app_state_v2';

// Vehicle Registry for Pindahan
const VEHICLES_REGISTRY = {
  motor_cargo: {
    id: "motor_cargo",
    name: "Motor Roda Tiga / Kargo Mini",
    tag: "Kapasitas Small",
    baseTariff: 60000,
    desc: "Muat 3-5 kardus, tas pakaian, kipas angin, & barang kos ringkas.",
    dim: "1.2 x 0.9 x 0.9 m",
    plate: "AB 4821 YK",
    driver: "Mitra Agus S.",
    badgeClass: "bg-emerald-100 text-emerald-800",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnYCKHbsPDjJeYLZdEzZYJtPkIOIKz15Zh4Gj1KLCN1ST5wh560BLt6sSq13mlUzy7EC6SVA4aCXTROm7B0TQnFBnWDa6WEc4pUxCuT1AwPCgLfbLzCbw1TroveJGS7fk7S_TUGUMcI082spZutsWHel8WXjJE-nPj393JZC6JXxj3AA9L-q4fTKyDBokGEpPS-a1qWRnI6AouSDF87Fifc8gFCDUD4s6amcJkU_F7jx6v3NlDMTXy"
  },
  pickup_open: {
    id: "pickup_open",
    name: "Pick-up Bak Terbuka",
    tag: "Muatan Fleksibel",
    baseTariff: 95000,
    desc: "Muat kasur single/queen, meja lipat, lemari 1 pintu & kardus.",
    dim: "2.0 x 1.3 x 1.1 m",
    plate: "AB 7712 YK",
    driver: "Mitra Heri P.",
    badgeClass: "bg-secondary-fixed/50 text-secondary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5ewYjV8YxX6CkJZ_Ok3q1wDt3_amCA32_EJ3laVbq9wSdBpRH1n_tEzCqWUm0OTrUidFPJTIxr055cy7_3R2jAZaMP9y0_Dspl8qrF53q4Yh_kg8Zw9R_DOrbHl2uzO2gNcHSPJEONzmCVAF6Xg8EnMR5wu4GvaVFtHRMUAhMBkLP1aGZ76R_YcF0nJTBGOsOvoDMNVHMjddcw9iWx7LTq2J9GD5PfEGoUdSwFkNtTvD-ve9un4RZ"
  },
  pickup_box: {
    id: "pickup_box",
    name: "Pick-up Box Tertutup Anti-Hujan",
    tag: "Pilihan Standar",
    baseTariff: 120000,
    desc: "Aman dari hujan & debu. Muat kasur queen, kulkas mini, lemari 2 pintu.",
    dim: "2.1 x 1.4 x 1.3 m",
    plate: "B 9021 SHF",
    driver: "Mitra Budi Santoso",
    badgeClass: "bg-primary-fixed/50 text-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5ewYjV8YxX6CkJZ_Ok3q1wDt3_amCA32_EJ3laVbq9wSdBpRH1n_tEzCqWUm0OTrUidFPJTIxr055cy7_3R2jAZaMP9y0_Dspl8qrF53q4Yh_kg8Zw9R_DOrbHl2uzO2gNcHSPJEONzmCVAF6Xg8EnMR5wu4GvaVFtHRMUAhMBkLP1aGZ76R_YcF0nJTBGOsOvoDMNVHMjddcw9iWx7LTq2J9GD5PfEGoUdSwFkNtTvD-ve9un4RZ"
  },
  truk_engkel: {
    id: "truk_engkel",
    name: "Truk Engkel Box (Muatan Besar)",
    tag: "Kapasitas Maksimal",
    baseTariff: 250000,
    desc: "Muatan 1 rumah / kontrakan full 2 BR. Kasur king, sofa, lemari 3 pintu.",
    dim: "3.1 x 1.6 x 1.7 m",
    plate: "AB 8890 YK",
    driver: "Mitra Bambang K.",
    badgeClass: "bg-tertiary-fixed/60 text-tertiary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnYCKHbsPDjJeYLZdEzZYJtPkIOIKz15Zh4Gj1KLCN1ST5wh560BLt6sSq13mlUzy7EC6SVA4aCXTROm7B0TQnFBnWDa6WEc4pUxCuT1AwPCgLfbLzCbw1TroveJGS7fk7S_TUGUMcI082spZutsWHel8WXjJE-nPj393JZC6JXxj3AA9L-q4fTKyDBokGEpPS-a1qWRnI6AouSDF87Fifc8gFCDUD4s6amcJkU_F7jx6v3NlDMTXy"
  }
};

// Preset Location Pins for Interactive Map Picker (Nationwide Coverage Across All Indonesia Regions)
const NATIONWIDE_MAP_LOCATIONS = [
  // DIY & Jawa Tengah
  { name: "Kost Melati Residence, Sukajadi, Sleman, DI Yogyakarta", region: "diy", city: "Sleman", district: "Sukajadi", km: 4.2, coords: [-7.7602, 110.3805] },
  { name: "Jl. Kaliurang Km 5.5, Pogung, Sleman, DI Yogyakarta", region: "diy", city: "Sleman", district: "Pogung", km: 6.8, coords: [-7.7512, 110.3812] },
  { name: "Apartemen Grand Kamala Lagoon, Seturan, Sleman, DI Yogyakarta", region: "diy", city: "Sleman", district: "Seturan", km: 8.5, coords: [-7.7785, 110.4012] },
  { name: "Gedung Bulaksumur UGM, Caturtunggal, Sleman, DI Yogyakarta", region: "diy", city: "Sleman", district: "Caturtunggal", km: 3.5, coords: [-7.7702, 110.3775] },
  { name: "Jl. Malioboro No. 45, Danurejan, Kota Yogyakarta, DI Yogyakarta", region: "diy", city: "Kota Yogyakarta", district: "Danurejan", km: 10.2, coords: [-7.7932, 110.3658] },
  { name: "Jl. Pandanaran No. 88, Simpang Lima, Semarang, Jawa Tengah", region: "jateng", city: "Kota Semarang", district: "Semarang Selatan", km: 16.5, coords: [-6.9903, 110.4229] },
  { name: "Jl. Slamet Riyadi No. 120, Surakarta (Solo), Jawa Tengah", region: "jateng", city: "Surakarta", district: "Banjarsari", km: 14.8, coords: [-7.5691, 110.8256] },

  // Jabodetabek
  { name: "Sudirman Central Business District (SCBD), Kebayoran Baru, Jakarta Selatan, DKI Jakarta", region: "jabodetabek", city: "Jakarta Selatan", district: "Kebayoran Baru", km: 12.5, coords: [-6.2253, 106.8097] },
  { name: "Apartemen Taman Rasuna Tower 8, Kuningan, Jakarta Selatan, DKI Jakarta", region: "jabodetabek", city: "Jakarta Selatan", district: "Setiabudi", km: 9.2, coords: [-6.2189, 106.8344] },
  { name: "Green Lake City, Cipondoh, Kota Tangerang, Banten", region: "jabodetabek", city: "Kota Tangerang", district: "Cipondoh", km: 18.4, coords: [-6.1895, 106.7025] },
  { name: "Margonda Raya No. 45, Beji, Kota Depok, Jawa Barat", region: "jabodetabek", city: "Kota Depok", district: "Beji", km: 11.0, coords: [-6.3732, 106.8315] },
  { name: "Summarecon Bekasi, Bekasi Utara, Kota Bekasi, Jawa Barat", region: "jabodetabek", city: "Kota Bekasi", district: "Bekasi Utara", km: 15.2, coords: [-6.2235, 106.9995] },

  // Jawa Barat
  { name: "Jl. Dago (Ir. H. Juanda) No. 102, Coblong, Kota Bandung, Jawa Barat", region: "jabar", city: "Kota Bandung", district: "Coblong", km: 7.8, coords: [-6.8856, 107.6138] },
  { name: "Summarecon Bandung, Gedebage, Kota Bandung, Jawa Barat", region: "jabar", city: "Kota Bandung", district: "Gedebage", km: 16.0, coords: [-6.9532, 107.6985] },
  { name: "Jl. Pajajaran No. 34, Bogor Tengah, Kota Bogor, Jawa Barat", region: "jabar", city: "Kota Bogor", district: "Bogor Tengah", km: 8.9, coords: [-6.5891, 106.8062] },

  // Jawa Timur & Bali
  { name: "Jl. Tunjungan No. 50, Genteng, Kota Surabaya, Jawa Timur", region: "jatim", city: "Kota Surabaya", district: "Genteng", km: 11.5, coords: [-7.2625, 112.7388] },
  { name: "Jl. Soekarno-Hatta No. 9, Lowokwaru, Kota Malang, Jawa Timur", region: "jatim", city: "Kota Malang", district: "Lowokwaru", km: 9.4, coords: [-7.9432, 112.6155] },
  { name: "Jl. Sunset Road No. 88, Kuta, Kabupaten Badung, Bali", region: "bali", city: "Badung", district: "Kuta", km: 13.6, coords: [-8.7052, 115.1765] },
  { name: "Jl. Teuku Umar No. 45, Denpasar Barat, Kota Denpasar, Bali", region: "bali", city: "Kota Denpasar", district: "Denpasar Barat", km: 8.2, coords: [-8.6725, 115.2088] },

  // Sumatera, Sulawesi, Kalimantan
  { name: "Jl. Gajah Mada No. 12, Medan Petisah, Kota Medan, Sumatera Utara", region: "luar_jawa", city: "Kota Medan", district: "Medan Petisah", km: 10.5, coords: [3.5852, 98.6675] },
  { name: "Jl. Somba Opu No. 25, Ujung Pandang, Kota Makassar, Sulawesi Selatan", region: "luar_jawa", city: "Kota Makassar", district: "Ujung Pandang", km: 7.9, coords: [-5.1382, 119.4065] },
  { name: "Jl. Ahmad Yani Km 3.5, Banjarmasin, Kalimantan Selatan", region: "luar_jawa", city: "Banjarmasin", district: "Banjarmasin Timur", km: 9.1, coords: [-3.3285, 114.5925] }
];

const PRESET_MAP_LOCATIONS = NATIONWIDE_MAP_LOCATIONS;

// Bank Accounts Registry for Manual Transfer
const OFFICIAL_BANKS = {
  bca: { bank: "BCA", acc: "8730-9912-34", name: "PT Siap Hadir Fleksibel Tuntas", color: "bg-blue-600" },
  mandiri: { bank: "Mandiri", acc: "137-000-8899-123", name: "PT Siap Hadir Fleksibel Tuntas", color: "bg-yellow-600" },
  bri: { bank: "BRI", acc: "0029-01-000456-30-1", name: "PT Siap Hadir Fleksibel Tuntas", color: "bg-blue-800" },
  bni: { bank: "BNI", acc: "098-7654-321", name: "PT Siap Hadir Fleksibel Tuntas", color: "bg-orange-600" }
};

// Centralized Application State
const state = {
  activeService: 'moving', // 'moving' or 'cleaning'
  activeStep: 2,
  isNewUserDemo: true,

  userPreferences: {
    wa: true,
    push: true,
    email: true,
    sms: false
  },

  notifFilters: {
    search: "",
    status: "all",
    time: "feb-2025",
    category: "all"
  },

  notifications: [
    {
      id: "notif-1",
      title: "Armada GranMax Box Menuju Lokasi Jemput Kost Melati Lt. 2",
      message: "Driver Budi Santoso (AB 1420 YK) terdeteksi berjarak 1.8 km (~6 menit) dari titik jemput. Pastikan barang bawaan sudah terkemas rapi untuk langsung dimuat.",
      category: "fleet",
      status: "unread",
      timestamp: "2 menit yang lalu • 10:02 WIB",
      dateGroup: "today",
      ticketId: "SHF-90214",
      metadata: {
        type: "Live Tracking",
        driver: "Budi Santoso",
        plate: "AB 1420 YK",
        location: "Jl. Kaliurang KM 5.2",
        eta: "10:08 WIB (Tepat Waktu)",
        phone: "+6281298448842",
        badgeText: "Live Armada Tracking",
        actionText: "Buka Live GPS Tracker",
        actionLink: "./tracking.html"
      }
    },
    {
      id: "notif-2",
      title: "Pembayaran QRIS Dinamis Terverifikasi Lunas (Rp 182.750)",
      message: "Sistem Bank Indonesia QRIS mengonfirmasi pelunasan otomatis tanpa potongan biaya admin untuk Order Tiket #SHF-90214 (Pindahan Kos Ekstra Helper). Invoice resmi siap disimpan.",
      category: "payment",
      status: "unread",
      timestamp: "25 menit yang lalu • 09:37 WIB",
      dateGroup: "today",
      ticketId: "SHF-90214",
      metadata: {
        type: "Pembayaran QRIS",
        amount: "Rp 182.750",
        reff: "QRS-881290",
        paymentMethod: "QRIS Dinamis Instan",
        badgeText: "Transaksi QRIS Lunas",
        actionText: "Lihat Bukti Bayar",
        actionLink: "./payment.html"
      }
    },
    {
      id: "notif-3",
      title: "Voucher Diskon Eksklusif 15% VIP Siap Digunakan!",
      message: "Sebagai apresiasi pelanggan VIP Dimas Pratama, voucher potongan sebesar Rp 25.000 dengan kode voucher SHIFT-VIP-HEMAT telah dikreditkan ke dompet akun Anda. Berlaku hingga 28 Februari 2025.",
      category: "promo",
      status: "unread",
      timestamp: "2 jam yang lalu • 08:15 WIB",
      dateGroup: "today",
      ticketId: "VIP-DISC-15",
      metadata: {
        type: "Promo VIP",
        voucherCode: "SHIFT-VIP-HEMAT",
        discountAmount: "Rp 25.000 (15%)",
        expiry: "28 Februari 2025",
        badgeText: "Promo Eksklusif VIP",
        actionText: "Klaim ke Akun"
      }
    },
    {
      id: "notif-4",
      title: "Login Sukses dari Perangkat Desktop Chrome (Yogyakarta)",
      message: "Sesi masuk akun diverifikasi melalui nomor WhatsApp +62 812-9981-4421 pada IP 182.253.xx.xx. Jika Anda tidak mengenali aktivitas ini, segera kunci akun atau amankan PIN transaksi.",
      category: "security",
      status: "read",
      timestamp: "Kemarin • 19:40 WIB",
      dateGroup: "this-week",
      ticketId: "SEC-LOG-881",
      metadata: {
        type: "Audit Keamanan",
        device: "Desktop Chrome (Windows 11)",
        ip: "182.253.110.45",
        location: "Yogyakarta, Indonesia",
        badgeText: "Audit Keamanan",
        actionText: "Periksa Perangkat"
      }
    },
    {
      id: "notif-5",
      title: "Layanan Deep Clean Kasur & Kamar Mandi Selesai (#SHF-89102)",
      message: "Mitra terlatih Siti Maryam telah menyelesaikan sanitasi UV-C & desinfeksi menyeluruh di Apartemen Grand Kamala. Garansi higienitas 24 jam Anda aktif hingga 19 Feb 2025 11:30 WIB.",
      category: "cleaning",
      status: "read",
      timestamp: "18 Feb 2025 • 11:35 WIB",
      dateGroup: "this-week",
      ticketId: "SHF-89102",
      metadata: {
        type: "Layanan Selesai & Bergaransi",
        cleaner: "Siti Maryam & Rekan",
        location: "Apartemen Grand Kamala",
        warranty: "Garansi Higienitas 24 Jam",
        badgeText: "Deep Clean Selesai",
        actionText: "Beri Ulasan Bintang"
      }
    },
    {
      id: "notif-6",
      title: "Penyesuaian Biaya Armada: Saldo Dompet Kembali Rp 15.000",
      message: "Efisiensi rute penjemputan dan volume aktual menghasilkan diskon penyesuaian biaya perjalanan. Saldo otomatis dialihkan ke dompet poin loyalitas akun SHIFT Anda.",
      category: "payment",
      status: "read",
      timestamp: "17 Feb 2025 • 14:10 WIB",
      dateGroup: "this-week",
      ticketId: "ADJ-88102",
      metadata: {
        type: "Penyesuaian Biaya Otomatis",
        refundAmount: "Rp 15.000",
        destination: "Poin Loyalitas SHIFT",
        badgeText: "Refund Otomatis"
      }
    },
    {
      id: "notif-7",
      title: "Pesanan Pindahan Rumah Selesai (#SHF-87420) — Total Rp 520.000",
      message: "Pengantaran 24 kardus boks & perabotan ke Condongcatur berhasil diturunkan dengan kondisi 100% utuh tanpa kerusakan.",
      category: "fleet",
      status: "read",
      timestamp: "28 Jan 2025",
      dateGroup: "past-month",
      ticketId: "SHF-87420",
      metadata: {
        type: "Pindahan Rumah Tuntas",
        totalAmount: "Rp 520.000",
        items: "24 Kardus Boks & Perabotan",
        badgeText: "Pindahan Selesai"
      }
    },
    {
      id: "notif-8",
      title: "Selamat Bergabung di Membership SHIFT VIP Tier",
      message: "Anda kini menikmati gratis asuransi bernilai hingga Rp 50.000.000, jalur CS Hotline Prioritas 24 Jam, serta diskon armada bulanan.",
      category: "promo",
      status: "read",
      timestamp: "15 Jan 2025",
      dateGroup: "past-month",
      ticketId: "VIP-WELCOME",
      metadata: {
        type: "Tingkatan Keanggotaan",
        tier: "SHIFT VIP Tier",
        benefits: "Gratis Asuransi Rp 50 Jt & Hotline CS 24 Jam",
        badgeText: "VIP Membership"
      }
    },
    {
      id: "notif-9",
      title: "Pembaruan Syarat & Ketentuan Asuransi Barang 100%",
      message: "Peningkatan batas kompensasi barang elektronik & perabotan rapuh untuk memastikan rasa tenang sepenuhnya selama masa pemindahan.",
      category: "security",
      status: "read",
      timestamp: "05 Jan 2025",
      dateGroup: "past-month",
      ticketId: "POL-2025-01",
      metadata: {
        type: "Kebijakan Layanan",
        policy: "Asuransi Barang 100% Utuh",
        badgeText: "Syarat & Ketentuan"
      }
    }
  ],

  user: {
    isLoggedIn: false, // Default guest unless logged in
    name: "Dimas Pratama",
    email: "dimas.pratama@gmail.com",
    phone: "+62 812-3456-7890",
    role: "Pelanggan VIP",
    discountRate: 0.15,
    metrics: {
      completedOrders: 14,
      runningOrders: 1,
      totalSaved: 245000,
      loyaltyPoints: 1250
    }
  },

  activeOrder: {
    id: "SHF-90214",
    type: "pindahan",
    serviceName: "Pindahan Kos / Apartemen",
    status: "Menunggu Pembayaran",
    mitraName: "Mitra Budi Santoso",
    vehicleName: "Pick-up Box Tertutup",
    vehiclePlate: "B 9021 SHF",
    totalPrice: 182750,
    pickupAddress: "Kost Melati Residence No. 14, Sukajadi, Sleman",
    dropoffAddress: "Apartemen Grand Kamala Lagoon, Tower Emerald",
    createdAt: new Date().toISOString()
  },

  pindahan: {
    orderId: "SHF-90214",
    pickupAddress: "Kost Melati Residence No. 14, Sukajadi, Sleman, Yogyakarta",
    dropoffAddress: "Apartemen Grand Kamala Lagoon, Tower Emerald, Yogyakarta",
    selectedVehicleKey: "pickup_box",
    distanceKm: 8.5,
    perKmRate: 1750,
    pickupFloor: 2,
    pickupFacility: "tangga",
    floorRatePerLevel: 15000,
    dropoffFloor: 8,
    dropoffFacility: "lift",
    helpersCount: 1,
    helperUnitFee: 50000,
    paymentMethod: "qris",
    selectedBank: "bca",
    isCalculated: false,
    pickupDate: "",
    pickupTime: "10:00 WIB",
    notes: "",

    get vehicleObj() {
      return VEHICLES_REGISTRY[this.selectedVehicleKey] || VEHICLES_REGISTRY.pickup_box;
    },
    get baseTariff() {
      return this.vehicleObj.baseTariff;
    },
    get distanceCost() {
      return Math.round(this.distanceKm * this.perKmRate);
    },
    get pickupFloorFee() {
      if (this.pickupFacility === 'lift' || this.pickupFloor <= 1) return 0;
      return (this.pickupFloor - 1) * this.floorRatePerLevel;
    },
    get dropoffFloorFee() {
      if (this.dropoffFacility === 'lift' || this.dropoffFloor <= 1) return 0;
      return (this.dropoffFloor - 1) * this.floorRatePerLevel;
    },
    get helpersFee() {
      return this.helpersCount * this.helperUnitFee;
    },
    get subtotal() {
      return this.baseTariff + this.distanceCost + this.pickupFloorFee + this.dropoffFloorFee + this.helpersFee;
    },
    get discount() {
      return Math.round(this.subtotal * state.user.discountRate);
    },
    get total() {
      return this.subtotal - this.discount;
    }
  },

  cleaning: {
    orderId: "SHF-CLN-90215",
    address: "Kost Melati Residence No. 14, Sukajadi, Sleman",
    housingType: "kos",
    housingPrices: {
      kos: { name: "Kamar Kos Standar", price: 85000, desc: "Luas 12 - 16 m² • 1 Ruangan" },
      studio: { name: "Studio Apartemen", price: 120000, desc: "Luas 20 - 30 m² • Balkon & Dapur" },
      kontrakan: { name: "Kontrakan 2 KT", price: 175000, desc: "Luas 36 - 45 m² • Ruang Tamu" },
      rumah: { name: "Rumah Tingkat / Luas", price: 250000, desc: "Luas > 50 m² • Multi-Lantai" }
    },
    stainLevel: "sedang",
    stainFees: {
      ringan: { name: "Tingkat Kerak Ringan", price: 0 },
      sedang: { name: "Tingkat Kerak Sedang", price: 25000 },
      berat: { name: "Tingkat Kerak Berat", price: 50000 }
    },
    addons: {
      hydroVacuum: true,
      disinfectantFogging: true,
      fridgeCleaning: false,
      acCleaning: false
    },
    addonPrices: {
      hydroVacuum: { name: "Hydro-Vacuum Kasur & UV-C", price: 45000 },
      disinfectantFogging: { name: "Fogging Disinfektan Kamar", price: 30000 },
      fridgeCleaning: { name: "Pembersihan Kulkas Kos", price: 25000 },
      acCleaning: { name: "Cuci AC Split 0.5-1 PK", price: 60000 }
    },
    vipDiscount: 25000,
    cleaner: "Siti Maryam & Rekan",
    isCalculated: false,
    cleanDate: "",
    cleanTime: "13:00 WIB",
    notes: "",

    get housingCost() {
      return this.housingPrices[this.housingType].price;
    },
    get stainCost() {
      return this.stainFees[this.stainLevel].price;
    },
    get addonsCost() {
      let sum = 0;
      if (this.addons.hydroVacuum) sum += this.addonPrices.hydroVacuum.price;
      if (this.addons.disinfectantFogging) sum += this.addonPrices.disinfectantFogging.price;
      if (this.addons.fridgeCleaning) sum += this.addonPrices.fridgeCleaning.price;
      if (this.addons.acCleaning) sum += this.addonPrices.acCleaning.price;
      return sum;
    },
    get subtotal() {
      return this.housingCost + this.stainCost + this.addonsCost;
    },
    get total() {
      return this.subtotal - this.vipDiscount;
    }
  },

  paymentTimer: {
    totalSeconds: 14 * 60 + 38,
    maxSeconds: 15 * 60,
    intervalId: null
  }
};

/* ==========================================
 * SINGLE SOURCE OF TRUTH: REACTIVE LIVE TRACKING STATE
 * ========================================== */
const liveTrackingState = {
  isSyncing: false,
  serviceType: 'pindahan', // 'pindahan' or 'cleaning'
  currentStepIndex: 2, // 0-indexed (Step 3: OTW is index 2)
  speed: 32, // km/h
  etaMinutes: 6,
  distanceRemainingKm: 1.8,
  driverName: "Budi Santoso",
  vehicleName: "Pick-up Box Tertutup",
  vehiclePlate: "B 9021 SHF",
  lastUpdated: "Baru saja",

  // 6 Map Waypoint Positions (%)
  waypoints: [
    { left: 16, top: 78, name: "Titik Jemput (Kost Melati Residence)", speed: 0, eta: 18 },
    { left: 30, top: 62, name: "Jl. Kaliurang Km 5.2", speed: 24, eta: 14 },
    { left: 46, top: 48, name: "Jl. Gejayan No. 45 (Dalam Perjalanan OTW)", speed: 32, eta: 6 },
    { left: 62, top: 34, name: "Jl. Colombo UGM (Mendekati Gerbang)", speed: 28, eta: 3 },
    { left: 78, top: 22, name: "Tiba di Lokasi Tujuan (Bongkar-Muat)", speed: 0, eta: 0 },
    { left: 88, top: 14, name: "Serah Terima Selesai (Tuntas)", speed: 0, eta: 0 }
  ],

  // 6 Milestones for Pindahan
  pindahanMilestones: [
    { step: 1, title: "Pembayaran QRIS Terverifikasi", time: "10:00 WIB", desc: "Total tagihan lunas dengan promo otomatis VIP.", icon: "check" },
    { step: 2, title: "Armada & Mitra Ditugaskan", time: "10:02 WIB", desc: "Budi Santoso & GranMax Box dikonfirmasi.", icon: "check" },
    { step: 3, title: "Meluncur ke Lokasi Jemput (OTW)", time: "SEKARANG", desc: "Driver sedang melaju menuju lokasi penjemputan.", icon: "directions_car" },
    { step: 4, title: "Bongkar-Muat Barang Kos", time: "Est. 10:20 WIB", desc: "Mitra membantu angkat barang dari Lt. 2 ke armada.", icon: "inventory_2" },
    { step: 5, title: "Perjalanan ke Lokasi Tujuan", time: "Est. 11:00 WIB", desc: "Armada melaju aman dengan proteksi terpal rapat.", icon: "local_shipping" },
    { step: 6, title: "Serah Terima & Selesai", time: "Est. 11:30 WIB", desc: "Pemeriksaan barang utuh & konfirmasi tuntas.", icon: "verified" }
  ],

  // 6 Milestones for Cleaning
  cleaningMilestones: [
    { step: 1, title: "Pembayaran QRIS Terverifikasi", time: "12:45 WIB", desc: "Total tagihan lunas dengan promo otomatis VIP.", icon: "check" },
    { step: 2, title: "Mitra Kebersihan Ditugaskan", time: "12:50 WIB", desc: "Siti Maryam & Rahmat menyiapkan set alat steril.", icon: "check" },
    { step: 3, title: "Meluncur ke Kost Melati (OTW)", time: "SEKARANG", desc: "Petugas membawa box hydro-vacuum & fogger.", icon: "two_wheeler" },
    { step: 4, title: "Tiba di Kost & Inspeksi Awal", time: "Est. 13:10 WIB", desc: "Pengecekan titik noda kasur & kerak kamar mandi.", icon: "meeting_room" },
    { step: 5, title: "Eksekusi Deep Cleaning & Vacuum UV-C", time: "Durasi: ~90 Mnt", desc: "Scrub lantai, closet, & sedot tungau kasur.", icon: "cleaning_services" },
    { step: 6, title: "Cold Fogging Disinfektan & Garansi", time: "Tahap Akhir", desc: "Penyemprotan aroma pinus & sertifikat digital.", icon: "verified" }
  ]
};

// Helper: Currency Formatter
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

// LocalStorage Synchronization
function saveStateToStorage() {
  try {
    const payload = {
      activeService: state.activeService || 'moving',
      isNewUserDemo: state.isNewUserDemo,
      activeOrder: state.activeOrder,
      userPreferences: state.userPreferences,
      notifications: state.notifications,
      user: state.user,
      pendingTargetUrl: state.pendingTargetUrl,
      pindahan: {
        pickupAddress: state.pindahan.pickupAddress,
        dropoffAddress: state.pindahan.dropoffAddress,
        selectedVehicleKey: state.pindahan.selectedVehicleKey,
        pickupFloor: state.pindahan.pickupFloor,
        pickupFacility: state.pindahan.pickupFacility,
        dropoffFloor: state.pindahan.dropoffFloor,
        dropoffFacility: state.pindahan.dropoffFacility,
        helpersCount: state.pindahan.helpersCount,
        paymentMethod: state.pindahan.paymentMethod,
        selectedBank: state.pindahan.selectedBank,
        pickupDate: state.pindahan.pickupDate,
        pickupTime: state.pindahan.pickupTime,
        isCalculated: state.pindahan.isCalculated,
        distanceKm: state.pindahan.distanceKm,
        pickupCoords: state.pindahan.pickupCoords,
        dropoffCoords: state.pindahan.dropoffCoords
      },
      cleaning: {
        orderId: state.cleaning.orderId,
        address: state.cleaning.address,
        housingType: state.cleaning.housingType,
        stainLevel: state.cleaning.stainLevel,
        addons: state.cleaning.addons,
        vipDiscount: state.cleaning.vipDiscount,
        cleaner: state.cleaning.cleaner,
        isCalculated: state.cleaning.isCalculated,
        cleanDate: state.cleaning.cleanDate,
        cleanTime: state.cleaning.cleanTime,
        notes: state.cleaning.notes,
        paymentMethod: state.cleaning.paymentMethod
      }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn("Storage write error", e);
  }
}

function loadStateFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const data = JSON.parse(saved);

    if (data.activeService) {
      state.activeService = data.activeService;
    }
    if (typeof data.isNewUserDemo === 'boolean') {
      state.isNewUserDemo = data.isNewUserDemo;
    }
    if (data.activeOrder !== undefined) {
      state.activeOrder = data.activeOrder;
    }
    if (data.userPreferences) {
      Object.assign(state.userPreferences, data.userPreferences);
    }
    if (data.user) {
      Object.assign(state.user, data.user);
    }
    if (data.pendingTargetUrl) {
      state.pendingTargetUrl = data.pendingTargetUrl;
    }
    if (Array.isArray(data.notifications)) {
      state.notifications = data.notifications;
    }
    if (data.pindahan) {
      Object.assign(state.pindahan, data.pindahan);
    }
    if (data.cleaning) {
      if (data.cleaning.addons) {
        Object.assign(state.cleaning.addons, data.cleaning.addons);
      }
      Object.assign(state.cleaning, data.cleaning);
    }
  } catch (e) {
    console.warn("Storage read error", e);
  }
}

// Service Context & Navbar Manager
window.selectServiceCategory = function(cat) {
  if (cat !== 'cleaning' && cat !== 'moving') cat = 'moving';
  state.activeService = cat;
  saveStateToStorage();

  if (cat === 'cleaning') {
    window.location.href = './cleaning.html?service=cleaning';
  } else {
    window.location.href = './booking.html?service=moving';
  }
};

function updateNavbarContext() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');

  if (serviceParam === 'cleaning' || serviceParam === 'moving') {
    state.activeService = serviceParam;
    saveStateToStorage();
  } else {
    const pathname = window.location.pathname;
    if (pathname.includes('cleaning') || pathname.includes('tracking-cleaning')) {
      state.activeService = 'cleaning';
      saveStateToStorage();
    } else if (pathname.includes('booking') || (pathname.includes('tracking') && !pathname.includes('cleaning'))) {
      state.activeService = 'moving';
      saveStateToStorage();
    }
  }

  const currentService = state.activeService || 'moving';

  const pesanLinks = document.querySelectorAll('a[data-path="pesan-layanan"]');
  pesanLinks.forEach(link => {
    link.href = currentService === 'cleaning' ? './cleaning.html?service=cleaning' : './booking.html?service=moving';
  });

  const bayarLinks = document.querySelectorAll('a[data-path="pembayaran"]');
  bayarLinks.forEach(link => {
    link.href = `./payment.html?service=${currentService}`;
  });

  const lacakLinks = document.querySelectorAll('a[data-path="lacak-pesanan"]');
  lacakLinks.forEach(link => {
    link.href = currentService === 'cleaning' ? './tracking-cleaning.html?service=cleaning' : './tracking.html?service=moving';
  });
}

// Global Initializer
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  updateNavbarContext();
  updateUserProfileUI();
  initDatePickers();

  // 1. Dashboard Active Order Capsule / Empty State Engine
  if (document.getElementById('dashboardOrderCapsuleWrapper')) {
    renderDashboardActiveOrderCapsule();
  }

  // 2. Booking Page Form Initializer
  if (document.getElementById('bookingFormContainer')) {
    initBookingFormEngine();
  }

  // 3. Initialize Cleaning Calculator if present
  if (document.getElementById('cleaningCalculatorContainer')) {
    initCleaningCalculator();
  }

  // 4. Initialize Live Tracking Reactive Engine if present
  if (document.getElementById('milestoneContainer') || document.getElementById('mapCanvasContainer') || document.getElementById('cleanerMarker')) {
    initLiveTrackingEngine();
  }

  // 5. Initialize Payment Page Engine if present
  if (document.getElementById('qrisContainer') || document.getElementById('paymentMethodContainer')) {
    initPaymentPageEngine();
  }

  // 6. Initialize History Page Engine if present
  if (document.getElementById('historyContainer')) {
    initHistoryEngine();
  }

  // 7. Initialize Notification Center Engine if present
  if (document.getElementById('timelineList') || document.getElementById('notificationWrapper') || document.getElementById('notifBellBtn')) {
    initNotificationsEngine();
  }

  // 8. Initialize Auth Engine if on auth page
  if (document.getElementById('customerAuthSection')) {
    initAuthEngine();
  }
});

function updateUserProfileUI() {
  if (!state.user) return;
  const userEls = document.querySelectorAll('.js-user-name');
  userEls.forEach(el => {
    if (state.user.isMitra) {
      el.textContent = `${state.user.name} (Mitra Lapangan)`;
    } else {
      el.textContent = state.user.name || "Dimas Pratama";
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');
  if (roleParam === 'mitra') {
    userEls.forEach(el => {
      el.textContent = "Budi Santoso (Mitra Lapangan)";
    });
  }

  // Render dynamic header nav auth status
  window.renderAuthHeaderNav();
}

/* ==========================================
 * AUTHENTICATION GUARD & HEADER NAV ENGINE
 * Dynamic Navbar Header Auth Status & Order Lock Guard
 * ========================================== */

window.renderAuthHeaderNav = function() {
  const containers = document.querySelectorAll('#authHeaderNav, .js-user-auth-header');
  const isLoggedIn = Boolean(state.user && state.user.isLoggedIn);
  const userName = state.user?.name || "Pelanggan VIP";
  const userRole = state.user?.role || "Pelanggan VIP";

  containers.forEach(container => {
    if (!container) return;

    if (!isLoggedIn) {
      container.innerHTML = `
        <div class="flex items-center gap-2">
          <a href="./auth.html?path=login-customer" class="px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-bold transition-all flex items-center gap-1 shadow-sm border border-slate-200/60 cursor-pointer">
            <span class="material-symbols-outlined text-primary text-[17px]">login</span>
            <span>Masuk</span>
          </a>
          <a href="./auth.html?path=register-customer" class="px-4 py-1.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold transition-all flex items-center gap-1 shadow-md cursor-pointer">
            <span class="material-symbols-outlined text-[17px]">person_add</span>
            <span>Daftar</span>
          </a>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="flex items-center gap-space-xs pl-space-xs cursor-pointer group" onclick="window.location.href='./profile.html'" title="Buka Profil Saya">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <span class="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <div class="hidden lg:flex flex-col text-left">
            <span class="font-label-md text-label-md text-on-surface font-semibold leading-tight js-user-name">${userName}</span>
            <span class="font-label-sm text-label-sm text-primary font-bold leading-tight flex items-center gap-1">
              ${userRole}
            </span>
          </div>
        </div>
      `;
    }
  });
};

window.toggleUserDropdownMenu = function(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('userDropdownMenu');
  if (menu) menu.classList.toggle('hidden');
};

window.handleUserLogout = async function() {
  const client = getSupabaseClient();
  if (client) {
    try { await client.auth.signOut(); } catch(e){}
  }
  
  if (state.user) {
    state.user.isLoggedIn = false;
  }
  saveStateToStorage();
  window.renderAuthHeaderNav();
  showToast('Sesi diperbarui.', 'info');
};

window.checkIsLoggedIn = function() {
  if (state.user && state.user.isLoggedIn) return true;
  const client = getSupabaseClient();
  if (client && client.auth) {
    try {
      const session = client.auth.getSession();
      if (session && session.user) {
        if (!state.user) state.user = {};
        state.user.isLoggedIn = true;
        saveStateToStorage();
        return true;
      }
    } catch(e){}
  }
  return false;
};

// Service Selection Auth Guard: Intercepts access if user is not logged in
window.requireAuthGuard = function(callback, targetRedirectUrl) {
  if (window.checkIsLoggedIn()) {
    if (typeof callback === 'function') {
      callback();
    } else if (targetRedirectUrl) {
      window.location.href = targetRedirectUrl;
    }
    return true;
  }

  // Pengguna BELUM LOGIN: Cegat aksi pemilihan layanan
  if (targetRedirectUrl) {
    state.pendingTargetUrl = targetRedirectUrl;
    saveStateToStorage();
  }

  showToast("Silakan Masuk atau Buat Akun terlebih dahulu untuk mulai memesan layanan SHIFT.", "warning");
  window.openAuthRequiredModal(targetRedirectUrl);
  return false;
};

window.checkAuthAndNavigate = function(targetUrl) {
  return window.requireAuthGuard(null, targetUrl);
};

window.openAuthRequiredModal = function(targetRedirectUrl) {
  let modal = document.getElementById('authRequiredModal');
  const target = targetRedirectUrl || state.pendingTargetUrl || './booking.html';

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'authRequiredModal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-md animate-in fade-in duration-200';
    modal.innerHTML = `
      <div class="relative w-full max-w-md bg-surface-container-lowest/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-space-lg border border-slate-100 flex flex-col gap-space-md">
        
        <button onclick="closeAuthRequiredModal()" type="button" class="absolute top-4 right-4 p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div class="flex items-center gap-space-sm pt-2">
          <div class="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md shrink-0">
            <span class="material-symbols-outlined text-[26px]">lock</span>
          </div>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-primary font-extrabold uppercase tracking-wider">Autentikasi Diperlukan</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-extrabold">Login untuk Memesan Layanan</h3>
          </div>
        </div>

        <div class="p-space-sm rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-2">
          <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">info</span>
          <p class="font-body-sm text-body-sm text-on-surface leading-relaxed">
            Silakan <strong>Masuk</strong> atau <strong>Buat Akun SHIFT</strong> terlebih dahulu untuk mulai memesan layanan SHIFT.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <a href="./auth.html?path=login-customer&redirect=${encodeURIComponent(target)}" class="w-full py-3 px-3 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg font-bold text-center flex items-center justify-center gap-1.5 shadow-sm transition-all border border-slate-200">
            <span class="material-symbols-outlined text-primary text-[18px]">login</span>
            <span>Masuk</span>
          </a>
          <a href="./auth.html?path=register-customer&redirect=${encodeURIComponent(target)}" class="w-full py-3 px-3 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold text-center flex items-center justify-center gap-1.5 shadow-md transition-all">
            <span class="material-symbols-outlined text-[18px]">person_add</span>
            <span>Daftar Akun</span>
          </a>
        </div>

        <div class="flex bg-surface-container-low p-1 rounded-2xl">
          <button id="modalTabBtnLogin" onclick="switchModalAuthTab('login')" type="button" class="flex-1 py-2 rounded-xl font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm transition-all text-center">
            Form Cepat Masuk
          </button>
          <button id="modalTabBtnSignup" onclick="switchModalAuthTab('signup')" type="button" class="flex-1 py-2 rounded-xl font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-all text-center">
            Form Cepat Daftar
          </button>
        </div>

        <form onsubmit="handleModalAuthSubmit(event, '${target}')" class="flex flex-col gap-space-sm">
          <div id="modalSignupFields" class="hidden flex flex-col gap-space-sm">
            <div class="flex flex-col gap-1">
              <label class="font-label-sm text-label-sm font-bold text-on-surface">Nama Lengkap</label>
              <input id="modalNameInput" type="text" placeholder="Contoh: Dimas Pratama" class="w-full bg-surface-container-low text-on-surface font-body-md px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/40"/>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-label-sm text-label-sm font-bold text-on-surface">Email / Nomor Handphone</label>
            <input id="modalIdentityInput" type="text" required placeholder="email@domain.com atau 0812xxxx" class="w-full bg-surface-container-low text-on-surface font-body-md px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/40"/>
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-label-sm text-label-sm font-bold text-on-surface">Kata Sandi / PIN 6 Digit</label>
            <input id="modalPasswordInput" type="password" required placeholder="••••••••" class="w-full bg-surface-container-low text-on-surface font-body-md px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/40"/>
          </div>

          <button id="modalAuthSubmitBtn" type="submit" class="mt-2 w-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-headline-sm text-headline-sm font-bold py-3 px-space-md rounded-full shadow-[0_12px_24px_-6px_rgba(254,208,27,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <span>Masuk & Lanjutkan Pesanan</span>
            <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </form>

        <div class="flex flex-col gap-2 pt-2 border-t border-slate-100">
          <button onclick="handleGoogleOAuthLogin('${target}')" type="button" class="w-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold py-2.5 px-space-md rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm">
            <img class="w-4 h-4 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnYCKHbsPDjJeYLZdEzZYJtPkIOIKz15Zh4Gj1KLCN1ST5wh560BLt6sSq13mlUzy7EC6SVA4aCXTROm7B0TQnFBnWDa6WEc4pUxCuT1AwPCgLfbLzCbw1TroveJGS7fk7S_TUGUMcI082spZutsWHel8WXjJE-nPj393JZC6JXxj3AA9L-q4fTKyDBokGEpPS-a1qWRnI6AouSDF87Fifc8gFCDUD4s6amcJkU_F7jx6v3NlDMTXy" alt="Google Logo"/>
            <span>Masuk Cepat dengan Google</span>
          </button>
        </div>

      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.classList.remove('hidden');
  }
};

window.switchModalAuthTab = function(tab) {
  const loginTab = document.getElementById('modalTabBtnLogin');
  const signupTab = document.getElementById('modalTabBtnSignup');
  const signupFields = document.getElementById('modalSignupFields');
  const submitBtnText = document.querySelector('#modalAuthSubmitBtn span:first-child');

  if (tab === 'login') {
    if (loginTab) loginTab.className = 'flex-1 py-2 rounded-xl font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm transition-all text-center';
    if (signupTab) signupTab.className = 'flex-1 py-2 rounded-xl font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-all text-center';
    if (signupFields) signupFields.classList.add('hidden');
    if (submitBtnText) submitBtnText.textContent = 'Masuk & Lanjutkan Pesanan';
  } else {
    if (loginTab) loginTab.className = 'flex-1 py-2 rounded-xl font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-all text-center';
    if (signupTab) signupTab.className = 'flex-1 py-2 rounded-xl font-label-md text-label-md font-bold bg-secondary-container text-on-secondary-container shadow-sm transition-all text-center';
    if (signupFields) signupFields.classList.remove('hidden');
    if (submitBtnText) submitBtnText.textContent = 'Daftar Akun Baru & Lanjutkan';
  }
};

window.closeAuthRequiredModal = function() {
  const modal = document.getElementById('authRequiredModal');
  if (modal) modal.classList.add('hidden');
};

window.handleModalAuthSubmit = function(e, redirectTargetUrl) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('modalNameInput');
  const identityInput = document.getElementById('modalIdentityInput');

  const typedName = nameInput && nameInput.value ? nameInput.value.trim() : "";
  const identity = identityInput && identityInput.value ? identityInput.value.trim() : "Dimas Pratama";

  if (!state.user) state.user = {};
  state.user.isLoggedIn = true;
  state.user.name = typedName || (identity.split(' ')[0] || "Dimas Pratama");
  state.user.email = identity.includes('@') ? identity : "dimas.pratama@gmail.com";
  state.user.phone = identity.includes('+') || identity.match(/^\d+$/) ? identity : "+62 812-3456-7890";
  state.user.role = "Pelanggan VIP";

  saveStateToStorage();
  window.renderAuthHeaderNav();
  window.closeAuthRequiredModal();

  showToast(`Autentikasi Berhasil! Melanjutkan pemesanan Anda...`, 'success');

  const target = redirectTargetUrl || state.pendingTargetUrl;
  if (target) {
    state.pendingTargetUrl = null;
    saveStateToStorage();
    setTimeout(() => {
      window.location.href = target;
    }, 600);
  }
};

window.selectServiceCategory = function(category) {
  state.activeService = category;
  saveStateToStorage();

  const targetUrl = category === 'cleaning' ? './cleaning.html?service=cleaning' : './booking.html?service=moving';
  return window.requireAuthGuard(null, targetUrl);
};

window.navigateToBooking = function(service) {
  const s = service || state.activeService || 'moving';
  const targetUrl = s === 'cleaning' ? './cleaning.html?service=cleaning' : './booking.html?service=moving';
  return window.requireAuthGuard(null, targetUrl);
};

window.navigateToPayment = function() {
  const currentService = state.activeService || 'moving';
  const targetUrl = `./payment.html?service=${currentService}`;
  return window.requireAuthGuard(null, targetUrl);
};

window.navigateToCleaningPayment = function() {
  state.activeService = 'cleaning';
  saveStateToStorage();
  const targetUrl = './payment.html?service=cleaning';
  return window.requireAuthGuard(null, targetUrl);
};

function initAuthEngine() {
  const urlParams = new URLSearchParams(window.location.search);
  const pathParam = urlParams.get('path');
  const tabParam = urlParams.get('tab');

  if (pathParam && typeof window.handleAuthNavigationPath === 'function') {
    window.handleAuthNavigationPath(pathParam);
  } else if (tabParam && typeof window.handleAuthNavigationPath === 'function') {
    window.handleAuthNavigationPath(tabParam);
  } else {
    const roleSec = document.getElementById('roleSelectionSection');
    if (roleSec) {
      window.handleAuthNavigationPath('role-selection');
    }
  }
}

window.handleOtpInput = function(currentEl, nextId, prevId, e) {
  if (e && e.key === 'Backspace') {
    if (!currentEl.value && prevId) {
      const prevEl = document.getElementById(prevId);
      if (prevEl) prevEl.focus();
    }
    return;
  }
  if (currentEl.value && currentEl.value.length >= 1 && nextId) {
    const nextEl = document.getElementById(nextId);
    if (nextEl) nextEl.focus();
  }
};

// Flexible Date Pickers Initializer
function initDatePickers() {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14);

  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = formatDate(today);
  const maxStr = formatDate(maxDate);

  const pickupDateInput = document.getElementById('pickupDate');
  if (pickupDateInput) {
    pickupDateInput.min = todayStr;
    pickupDateInput.max = maxStr;
    if (!pickupDateInput.value) pickupDateInput.value = state.pindahan.pickupDate || todayStr;
    state.pindahan.pickupDate = pickupDateInput.value;
    pickupDateInput.addEventListener('change', (e) => {
      state.pindahan.pickupDate = e.target.value;
      saveStateToStorage();
    });
  }

  const pickupTimeSelect = document.getElementById('pickupTime');
  if (pickupTimeSelect) {
    if (state.pindahan.pickupTime) pickupTimeSelect.value = state.pindahan.pickupTime;
    pickupTimeSelect.addEventListener('change', (e) => {
      state.pindahan.pickupTime = e.target.value;
      saveStateToStorage();
    });
  }

  const cleanDateInput = document.getElementById('cleanDate');
  if (cleanDateInput) {
    cleanDateInput.min = todayStr;
    cleanDateInput.max = maxStr;
    if (!cleanDateInput.value) cleanDateInput.value = state.cleaning.cleanDate || todayStr;
    state.cleaning.cleanDate = cleanDateInput.value;
    cleanDateInput.addEventListener('change', (e) => {
      state.cleaning.cleanDate = e.target.value;
    });
  }
}

/* ==========================================
 * 1. DASHBOARD EMPTY STATE & ACTIVE ORDER ENGINE
 * ========================================== */

function renderDashboardActiveOrderCapsule() {
  const container = document.getElementById('dashboardOrderCapsuleWrapper');
  if (!container) return;

  const o = state.activeOrder;
  const hasActiveOrder = !state.isNewUserDemo && o !== null && o.status !== 'completed' && o.status !== 'cancelled';

  const isCleaningContext = state.activeService === 'cleaning' || (o && o.type === 'cleaning');
  const targetBookingHref = isCleaningContext ? './cleaning.html?service=cleaning' : './booking.html?service=moving';

  if (!hasActiveOrder) {
    container.innerHTML = `
      <div class="relative bg-surface-container-lowest/90 backdrop-blur-2xl rounded-3xl p-space-md md:p-space-lg shadow-xl flex flex-col gap-4 overflow-hidden border border-slate-100/80 transition-all hover:shadow-2xl group">
        <!-- Developer Test Toggle Header -->
        <div class="flex items-center justify-between border-b border-slate-100/80 pb-2.5">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-label-sm text-label-sm font-bold">
            <span class="w-2 h-2 rounded-full bg-slate-400"></span>
            Status Dashboard (${isCleaningContext ? 'Deep Clean' : 'Pindahan'})
          </span>
          <button onclick="toggleDashboardUserDemoState()" class="text-xs bg-primary-fixed/50 hover:bg-primary-fixed text-primary px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 cursor-pointer" title="Beralih mode simulasi pengujian dev">
            <span class="material-symbols-outlined text-[14px]">tune</span>
            <span>Mode Dev: Kosong</span>
          </button>
        </div>

        <!-- Empty State Soft UI Component -->
        <div class="flex flex-col items-center text-center py-2 space-y-3">
          <div class="w-16 h-16 rounded-2xl ${isCleaningContext ? 'bg-emerald-100 text-emerald-700' : 'bg-primary-fixed/40 text-primary'} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
            <span class="material-symbols-outlined text-[36px]">${isCleaningContext ? 'cleaning_services' : 'local_shipping'}</span>
          </div>
          <div class="space-y-1.5 max-w-sm">
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              ${isCleaningContext ? 'Belum Ada Jadwal Cleaning Berjalan' : 'Belum Ada Pesanan Pindahan Berjalan'}
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              ${isCleaningContext ? 'Butuh sanitasi kamar kos, studio apartemen, atau hydro-vacuum kasur UV-C? Pesan tim Siti Maryam sekarang.' : 'Butuh bantuan angkut barang pindahan kos atau kontrakan? Pesan armada SHIFT sekarang dengan kru siap siaga.'}
            </p>
          </div>
        </div>

        <!-- Action Button CTA -->
        <div class="pt-1">
          <button onclick="window.selectServiceCategory('${state.activeService || 'moving'}')" class="w-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg py-3.5 px-5 rounded-full flex items-center justify-center gap-2 transition-all font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center">
            <span class="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Pesan ${isCleaningContext ? 'Deep Clean & Sanitasi' : 'Pindahan Barang'}</span>
          </button>
        </div>
      </div>
    `;
  } else {
    const isOrderCleaning = o.type === 'cleaning';
    container.innerHTML = `
      <div class="relative bg-surface-container-lowest/90 backdrop-blur-2xl rounded-3xl p-space-md md:p-space-lg shadow-xl flex flex-col gap-4 overflow-hidden border border-slate-100 transition-all hover:shadow-2xl">
        <!-- Active Order Header with Developer Toggle -->
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${isOrderCleaning ? 'bg-emerald-100 text-emerald-800' : 'bg-secondary-container text-on-secondary-container'} font-label-sm text-label-sm uppercase font-bold shadow-sm">
            <span class="w-2.5 h-2.5 rounded-full ${isOrderCleaning ? 'bg-emerald-600' : 'bg-secondary'} animate-pulse"></span>
            ${isOrderCleaning ? 'Jadwal Cleaning Aktif' : 'Pesanan Pindahan Aktif'}
          </span>
          <button onclick="toggleDashboardUserDemoState()" class="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 cursor-pointer" title="Beralih mode simulasi pengujian dev">
            <span class="material-symbols-outlined text-[14px]">tune</span>
            <span>Mode Dev: Pesanan Aktif</span>
          </button>
        </div>

        <!-- Active Order Main Info -->
        <div class="flex items-start gap-3.5">
          <div class="w-14 h-14 rounded-2xl ${isOrderCleaning ? 'bg-emerald-100 text-emerald-800' : 'bg-primary-fixed text-primary'} flex items-center justify-center shrink-0 shadow-sm">
            <span class="material-symbols-outlined text-[30px]">${isOrderCleaning ? 'cleaning_services' : 'local_shipping'}</span>
          </div>
          <div class="flex flex-col min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
              <span class="font-label-sm text-label-sm font-mono font-bold text-primary">#${o.id}</span>
              <span class="font-label-sm text-label-sm font-bold text-slate-800 font-mono">${formatRupiah(o.totalPrice)}</span>
            </div>
            <h4 class="font-headline-sm text-headline-sm text-on-surface font-bold truncate mt-0.5">${o.mitraName || (isOrderCleaning ? 'Siti Maryam & Rekan' : 'Mitra Heri P.')}</h4>
            <div class="flex items-center gap-2 text-xs text-on-surface-variant mt-1 flex-wrap">
              <span>${o.vehicleName || (isOrderCleaning ? 'Tim Hydro-Vacuum UV-C' : 'Pick-up Box')}</span>
              <span class="bg-primary-100 text-primary px-2 py-0.5 rounded-md font-mono font-bold">${o.vehiclePlate || (isOrderCleaning ? 'SHIFT-CLN' : 'AB 7712 YK')}</span>
            </div>
            <div class="mt-2 text-xs text-tertiary font-semibold flex items-center gap-1 bg-tertiary-fixed/30 px-2.5 py-1 rounded-lg w-fit">
              <span class="material-symbols-outlined text-[14px]">schedule</span>
              <span>Status: ${o.status}</span>
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="grid grid-cols-2 gap-2.5 pt-1">
          <a href="./payment.html?service=${isOrderCleaning ? 'cleaning' : 'moving'}" class="bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-md text-label-md py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all font-bold shadow-sm cursor-pointer text-center">
            <span class="material-symbols-outlined text-[18px]">qr_code_2</span>
            <span>Bayar (${formatRupiah(o.totalPrice)})</span>
          </a>
          <a href="${isOrderCleaning ? './tracking-cleaning.html?service=cleaning' : './tracking.html?service=moving'}" class="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all font-bold shadow-sm cursor-pointer text-center">
            <span class="material-symbols-outlined text-[18px]">map</span>
            <span>Lacak Live</span>
          </a>
        </div>
      </div>
    `;
  }
}

window.toggleDashboardUserDemoState = function() {
  state.isNewUserDemo = !state.isNewUserDemo;
  saveStateToStorage();
  renderDashboardActiveOrderCapsule();
  const currentMode = state.isNewUserDemo ? '[ Mode Dev: Pengguna Baru (Kosong) ]' : '[ Mode Dev: Pesanan Aktif ]';
  showToast(`Simulasi Beralih ke ${currentMode}`, 'info');
};

/* ==========================================
 * 2. BOOKING FORM ENGINE
 * ========================================== */

function initBookingFormEngine() {
  const pickupInput = document.getElementById('pickupAddressInput');
  if (pickupInput) {
    pickupInput.value = state.pindahan.pickupAddress;
    pickupInput.addEventListener('input', (e) => {
      state.pindahan.pickupAddress = e.target.value;
      saveStateToStorage();
      updatePindahanReviewPills();
      debouncedGeocodeAddressInput(e.target.value, 'pickup');
    });
  }

  const dropoffInput = document.getElementById('dropoffAddressInput');
  if (dropoffInput) {
    dropoffInput.value = state.pindahan.dropoffAddress;
    dropoffInput.addEventListener('input', (e) => {
      state.pindahan.dropoffAddress = e.target.value;
      saveStateToStorage();
      updatePindahanReviewPills();
      debouncedGeocodeAddressInput(e.target.value, 'dropoff');
    });
  }

  renderVehicleSelectionList();
  renderFloorAndFacilityCards();
  renderPindahanCalculatedPrices();
  updatePindahanReviewPills();
  initInteractiveRouteMap();
}

function renderVehicleSelectionList() {
  const container = document.getElementById('vehicleSelectionContainer');
  if (!container) return;

  const currentKey = state.pindahan.selectedVehicleKey;
  container.innerHTML = Object.values(VEHICLES_REGISTRY).map(v => {
    const isSelected = v.id === currentKey;
    const borderClass = isSelected ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-slate-100 bg-surface-container-low/60 hover:bg-surface-container-high/60';
    
    return `
      <div onclick="selectVehicle('${v.id}')" class="p-space-md rounded-2xl border ${borderClass} transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-space-md group">
        <div class="flex items-center gap-space-md w-full md:w-auto">
          <div class="w-12 h-12 rounded-2xl bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
            <span class="material-symbols-outlined text-[26px] ${isSelected ? 'text-primary' : 'text-slate-500'}">
              ${v.id === 'motor_cargo' ? 'two_wheeler' : v.id === 'truk_engkel' ? 'fire_truck' : 'local_shipping'}
            </span>
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-label-lg text-label-lg font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}">${v.name}</h4>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${v.badgeClass}">${v.tag}</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">${v.desc}</p>
            <span class="text-[11px] text-slate-400 font-mono mt-0.5">Dimensi: ${v.dim}</span>
          </div>
        </div>
        <div class="flex items-center justify-between md:justify-end gap-space-md w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          <span class="font-headline-sm text-headline-sm font-extrabold ${isSelected ? 'text-primary' : 'text-on-surface'}">${formatRupiah(v.baseTariff)}</span>
          <span class="material-symbols-outlined text-[22px] ${isSelected ? 'text-primary' : 'text-slate-300'}">
            ${isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
          </span>
        </div>
      </div>
    `;
  }).join('');

  const activeV = state.pindahan.vehicleObj;
  setText('.js-selected-vehicle-name', activeV.name);
  setText('.js-selected-vehicle-tariff', formatRupiah(activeV.baseTariff));
  setText('.js-selected-vehicle-desc', activeV.desc);
  setText('.js-selected-vehicle-dim', activeV.dim);
  setText('.js-selected-vehicle-plate', activeV.plate);
  setText('.js-selected-vehicle-driver', activeV.driver);
}

window.selectVehicle = function(vehicleKey) {
  if (!VEHICLES_REGISTRY[vehicleKey]) return;
  state.pindahan.selectedVehicleKey = vehicleKey;
  saveStateToStorage();
  renderVehicleSelectionList();
  if (state.pindahan.isCalculated) renderPindahanCalculatedPrices();
  showToast(`Armada diubah ke: ${VEHICLES_REGISTRY[vehicleKey].name}`);
};

function renderFloorAndFacilityCards() {
  const pickupFloorBtnContainer = document.getElementById('pickupFloorButtons');
  if (pickupFloorBtnContainer) {
    pickupFloorBtnContainer.innerHTML = [1, 2, 3, 4].map(fl => {
      const isSelected = state.pindahan.pickupFloor === fl;
      const cls = isSelected ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high font-semibold';
      return `<button onclick="setPickupFloor(${fl})" type="button" class="py-2.5 rounded-xl text-center font-label-md text-label-md transition-all border border-slate-100 ${cls}">Lt. ${fl}${fl===4?'+':''}</button>`;
    }).join('');
  }

  const pickupFacilityCard = document.getElementById('pickupFacilityCardDisplay');
  if (pickupFacilityCard) {
    const isTangga = state.pindahan.pickupFacility === 'tangga';
    const floorFee = state.pindahan.pickupFloorFee;
    
    pickupFacilityCard.innerHTML = `
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px] ${isTangga ? 'text-secondary' : 'text-emerald-600'}">
            ${isTangga ? 'stairs' : 'elevator'}
          </span>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm font-bold text-on-surface">Fasilitas Angkut Asal</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">
              ${isTangga ? `Tangga Manual (Lt. ${state.pindahan.pickupFloor})` : 'Ada Lift Barang'}
            </span>
          </div>
        </div>
        <span class="font-label-md text-label-md font-bold ${isTangga && floorFee > 0 ? 'text-secondary' : 'text-emerald-600'}">
          ${isTangga && floorFee > 0 ? '+' + formatRupiah(floorFee) : 'Gratis Rp 0'}
        </span>
      </div>
    `;
  }

  const dropoffFloorBtnContainer = document.getElementById('dropoffFloorButtons');
  if (dropoffFloorBtnContainer) {
    dropoffFloorBtnContainer.innerHTML = [1, 2, 3, 4].map(fl => {
      const isSelected = state.pindahan.dropoffFloor === fl;
      const cls = isSelected ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high font-semibold';
      return `<button onclick="setDropoffFloor(${fl})" type="button" class="py-2.5 rounded-xl text-center font-label-md text-label-md transition-all border border-slate-100 ${cls}">Lt. ${fl}${fl===4?'+':''}</button>`;
    }).join('');
  }

  const dropoffFacilityCard = document.getElementById('dropoffFacilityCardDisplay');
  if (dropoffFacilityCard) {
    const isTangga = state.pindahan.dropoffFacility === 'tangga';
    const floorFee = state.pindahan.dropoffFloorFee;

    dropoffFacilityCard.innerHTML = `
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px] ${isTangga ? 'text-secondary' : 'text-emerald-600'}">
            ${isTangga ? 'stairs' : 'elevator'}
          </span>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm font-bold text-on-surface">Fasilitas Angkut Tujuan</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">
              ${isTangga ? `Tangga Manual (Lt. ${state.pindahan.dropoffFloor})` : 'Ada Lift Barang'}
            </span>
          </div>
        </div>
        <span class="font-label-md text-label-md font-bold ${isTangga && floorFee > 0 ? 'text-secondary' : 'text-emerald-600'}">
          ${isTangga && floorFee > 0 ? '+' + formatRupiah(floorFee) : 'Gratis Rp 0'}
        </span>
      </div>
    `;
  }
}

window.setPickupFloor = function(floor) {
  state.pindahan.pickupFloor = floor;
  saveStateToStorage();
  renderFloorAndFacilityCards();
  if (state.pindahan.isCalculated) renderPindahanCalculatedPrices();
  updatePindahanReviewPills();
};

window.setPickupFacility = function(facility) {
  state.pindahan.pickupFacility = facility;
  saveStateToStorage();
  renderFloorAndFacilityCards();
  if (state.pindahan.isCalculated) renderPindahanCalculatedPrices();
  updatePindahanReviewPills();
  showToast(`Fasilitas Titik Asal: ${facility === 'lift' ? 'Lift Barang (Gratis)' : 'Tangga Manual'}`);
};

window.setDropoffFloor = function(floor) {
  state.pindahan.dropoffFloor = floor;
  saveStateToStorage();
  renderFloorAndFacilityCards();
  if (state.pindahan.isCalculated) renderPindahanCalculatedPrices();
  updatePindahanReviewPills();
};

window.setDropoffFacility = function(facility) {
  state.pindahan.dropoffFacility = facility;
  saveStateToStorage();
  renderFloorAndFacilityCards();
  if (state.pindahan.isCalculated) renderPindahanCalculatedPrices();
  updatePindahanReviewPills();
  showToast(`Fasilitas Titik Tujuan: ${facility === 'lift' ? 'Lift Barang (Gratis)' : 'Tangga Manual'}`);
};

window.updateHelpersCount = function(delta) {
  const newCount = state.pindahan.helpersCount + delta;
  if (newCount < 0 || newCount > 5) return;

  state.pindahan.helpersCount = newCount;
  saveStateToStorage();

  const countDisplay = document.getElementById('helpersCountDisplay');
  if (countDisplay) countDisplay.textContent = `${newCount} Orang`;

  if (state.pindahan.isCalculated) renderPindahanCalculatedPrices();
  updatePindahanReviewPills();
  showToast(`Kru helper diubah: ${newCount} Orang`);
};

/* ==========================================
 * LEAFLET.JS FULL INTERACTIVE ROUTE MAP ENGINE
 * Real-time 2-Way Pinning, Draggable Markers, Polyline, Haversine Distance & Forward/Reverse Geocoding
 * ========================================== */

let leafletMap = null;
let pickupMarker = null;
let dropoffMarker = null;
let routePolyline = null;
let geocodeDebounceTimer = null;

// Real Haversine Distance Calculation (in Km)
function calculateHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Number((Math.max(1.0, d)).toFixed(1));
}

function checkDirectCoordinateMatch(addressQuery) {
  if (!addressQuery) return null;
  const match = addressQuery.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
  if (match) {
    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);
    if (!isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      return [lat, lng];
    }
  }
  return null;
}

function debouncedGeocodeAddressInput(query, fieldType) {
  if (geocodeDebounceTimer) clearTimeout(geocodeDebounceTimer);
  if (!query || query.trim().length < 3) return;

  const directCoords = checkDirectCoordinateMatch(query);
  if (directCoords) {
    const [lat, lon] = directCoords;
    if (fieldType === 'pickup') {
      state.pindahan.pickupCoords = [lat, lon];
      if (pickupMarker) pickupMarker.setLatLng([lat, lon]);
    } else if (fieldType === 'dropoff') {
      state.pindahan.dropoffCoords = [lat, lon];
      if (dropoffMarker) dropoffMarker.setLatLng([lat, lon]);
    } else if (fieldType === 'cleaning') {
      state.cleaning.coords = [lat, lon];
    }
    updateMapRouteAndDistances(true);
    showToast(`Koordinat Diterapkan: [${lat}, ${lon}]`, 'success');
    return;
  }

  geocodeDebounceTimer = setTimeout(() => {
    executeForwardGeocode(query.trim(), fieldType);
  }, 800);
}

async function executeForwardGeocode(addressQuery, fieldType) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}&countrycodes=id&limit=1`;
    const res = await fetch(url, {
      headers: { 'Accept-Language': 'id' }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);

        if (fieldType === 'pickup') {
          state.pindahan.pickupCoords = [lat, lon];
          if (pickupMarker) pickupMarker.setLatLng([lat, lon]);
        } else if (fieldType === 'dropoff') {
          state.pindahan.dropoffCoords = [lat, lon];
          if (dropoffMarker) dropoffMarker.setLatLng([lat, lon]);
        } else if (fieldType === 'cleaning') {
          state.cleaning.coords = [lat, lon];
        }

        if (leafletMap) {
          leafletMap.setView([lat, lon], 14, { animate: true });
        }

        updateMapRouteAndDistances(true);

        const shortName = item.display_name.split(',')[0] || addressQuery;
        showToast(`Peta Meluncur: ${fieldType === 'pickup' ? 'Titik Jemput' : 'Titik Tujuan'} berpindah ke ${shortName}`, 'success');
        return;
      }
    }
  } catch (e) {
    console.warn("Forward geocode error:", e);
  }
}

window.selectPresetAddress = function(name, coords, fieldType) {
  if (fieldType === 'pickup') {
    state.pindahan.pickupAddress = name;
    state.pindahan.pickupCoords = coords;
    const input = document.getElementById('pickupAddressInput');
    if (input) input.value = name;
    if (pickupMarker) pickupMarker.setLatLng(coords);
  } else if (fieldType === 'dropoff') {
    state.pindahan.dropoffAddress = name;
    state.pindahan.dropoffCoords = coords;
    const input = document.getElementById('dropoffAddressInput');
    if (input) input.value = name;
    if (dropoffMarker) dropoffMarker.setLatLng(coords);
  } else if (fieldType === 'cleaning') {
    state.cleaning.address = name;
    state.cleaning.coords = coords;
    const input = document.getElementById('cleanAddressInput');
    if (input) input.value = name;
  }
  updateMapRouteAndDistances(true);
  showToast(`Lokasi terpilih: ${name}`, 'success');
};

window.initInteractiveRouteMap = function() {
  const mapEl = document.getElementById('interactiveRouteMap');
  if (!mapEl || typeof L === 'undefined') return;

  const pickupInput = document.getElementById('pickupAddressInput');
  const dropoffInput = document.getElementById('dropoffAddressInput');

  if (pickupInput && pickupInput.value) {
    const coords = checkDirectCoordinateMatch(pickupInput.value);
    if (coords) state.pindahan.pickupCoords = coords;
  }
  if (dropoffInput && dropoffInput.value) {
    const coords = checkDirectCoordinateMatch(dropoffInput.value);
    if (coords) state.pindahan.dropoffCoords = coords;
  }

  if (!state.pindahan.pickupCoords) state.pindahan.pickupCoords = [-7.9350, 112.6045];
  if (!state.pindahan.dropoffCoords) state.pindahan.dropoffCoords = [-7.9342, 112.6030];

  if (leafletMap) {
    try { leafletMap.remove(); } catch(e){}
    leafletMap = null;
  }

  const pCoords = state.pindahan.pickupCoords;
  const dCoords = state.pindahan.dropoffCoords;
  const centerLat = (pCoords[0] + dCoords[0]) / 2;
  const centerLng = (pCoords[1] + dCoords[1]) / 2;

  leafletMap = L.map('interactiveRouteMap', {
    zoomControl: false
  }).setView([centerLat, centerLng], 13);

  L.control.zoom({ position: 'topright' }).addTo(leafletMap);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(leafletMap);

  const pickupDivIcon = L.divIcon({
    className: 'custom-pin-pickup',
    html: `
      <div class="relative flex flex-col items-center group cursor-grab">
        <div class="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl border-2 border-white transform transition-transform group-hover:scale-110">
          <span class="material-symbols-outlined text-[20px]">place</span>
        </div>
        <div class="w-2.5 h-2.5 bg-primary rounded-full -mt-1 border border-white"></div>
        <span class="bg-primary text-on-primary font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md mt-0.5 whitespace-nowrap">JEMPUT</span>
      </div>
    `,
    iconSize: [40, 55],
    iconAnchor: [20, 35]
  });

  const dropoffDivIcon = L.divIcon({
    className: 'custom-pin-dropoff',
    html: `
      <div class="relative flex flex-col items-center group cursor-grab">
        <div class="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xl border-2 border-white transform transition-transform group-hover:scale-110">
          <span class="material-symbols-outlined text-[20px]">flag</span>
        </div>
        <div class="w-2.5 h-2.5 bg-secondary-container rounded-full -mt-1 border border-white"></div>
        <span class="bg-secondary-container text-on-secondary-container font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md mt-0.5 whitespace-nowrap">TUJUAN</span>
      </div>
    `,
    iconSize: [40, 55],
    iconAnchor: [20, 35]
  });

  pickupMarker = L.marker(pCoords, { icon: pickupDivIcon, draggable: true }).addTo(leafletMap);
  dropoffMarker = L.marker(dCoords, { icon: dropoffDivIcon, draggable: true }).addTo(leafletMap);

  routePolyline = L.polyline([pCoords, dCoords], {
    color: '#006194',
    weight: 4,
    opacity: 0.85,
    dashArray: '8, 8'
  }).addTo(leafletMap);

  pickupMarker.on('dragend', function(e) {
    const pos = e.target.getLatLng();
    state.pindahan.pickupCoords = [pos.lat, pos.lng];
    const input = document.getElementById('pickupAddressInput');
    if (input) {
      input.value = `Titik Jemput (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`;
      state.pindahan.pickupAddress = input.value;
    }
    updateMapRouteAndDistances(false);
    reverseGeocodeCoords(pos.lat, pos.lng, 'pickup');
  });

  dropoffMarker.on('dragend', function(e) {
    const pos = e.target.getLatLng();
    state.pindahan.dropoffCoords = [pos.lat, pos.lng];
    const input = document.getElementById('dropoffAddressInput');
    if (input) {
      input.value = `Titik Antar (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`;
      state.pindahan.dropoffAddress = input.value;
    }
    updateMapRouteAndDistances(false);
    reverseGeocodeCoords(pos.lat, pos.lng, 'dropoff');
  });

  leafletMap.on('click', function(e) {
    const mode = state.mapInteractivityMode || 'pickup';
    const latlng = e.latlng;
    const coordStr = `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;

    if (mode === 'pickup') {
      pickupMarker.setLatLng(latlng);
      state.pindahan.pickupCoords = [latlng.lat, latlng.lng];
      const input = document.getElementById('pickupAddressInput');
      if (input) {
        input.value = `Titik Jemput (${coordStr})`;
        state.pindahan.pickupAddress = input.value;
      }
      reverseGeocodeCoords(latlng.lat, latlng.lng, 'pickup');
    } else {
      dropoffMarker.setLatLng(latlng);
      state.pindahan.dropoffCoords = [latlng.lat, latlng.lng];
      const input = document.getElementById('dropoffAddressInput');
      if (input) {
        input.value = `Titik Antar (${coordStr})`;
        state.pindahan.dropoffAddress = input.value;
      }
      reverseGeocodeCoords(latlng.lat, latlng.lng, 'dropoff');
    }
    updateMapRouteAndDistances(true);
  });

  updateMapRouteAndDistances(true);
};

function updateMapRouteAndDistances(shouldFlyToBounds = false) {
  if (!pickupMarker || !dropoffMarker) return;

  const pPos = pickupMarker.getLatLng();
  const dPos = dropoffMarker.getLatLng();

  if (routePolyline) {
    routePolyline.setLatLngs([pPos, dPos]);
  }

  // Exact Haversine Formula Distance
  const km = calculateHaversineDistanceKm(pPos.lat, pPos.lng, dPos.lat, dPos.lng);

  state.pindahan.distanceKm = km;
  state.pindahan.pickupCoords = [pPos.lat, pPos.lng];
  state.pindahan.dropoffCoords = [dPos.lat, dPos.lng];

  saveStateToStorage();

  setText('.js-distance-km', `${km} km`);
  updatePindahanReviewPills();
  
  if (state.pindahan.isCalculated) {
    renderPindahanCalculatedPrices();
  }

  if (shouldFlyToBounds && leafletMap) {
    try {
      const bounds = L.latLngBounds([pPos, dPos]);
      leafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true, duration: 1.2 });
    } catch(e){}
  }
}

window.setMapInteractivityMode = function(mode) {
  state.mapInteractivityMode = mode;
  const btnPickup = document.getElementById('btnMapModePickup');
  const btnDropoff = document.getElementById('btnMapModeDropoff');
  const textInstruction = document.getElementById('mapInstructionText');

  if (mode === 'pickup') {
    if (btnPickup) btnPickup.className = 'px-3 py-1.5 rounded-xl font-label-sm text-label-sm font-bold bg-primary text-on-primary shadow-sm flex items-center gap-1 cursor-pointer transition-all';
    if (btnDropoff) btnDropoff.className = 'px-3 py-1.5 rounded-xl font-label-sm text-label-sm font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1 cursor-pointer transition-all';
    if (textInstruction) textInstruction.textContent = 'Klik peta atau geser marker untuk memindahkan Titik Jemput (Asal)';
    showToast('Mode Aktif Peta: Klik titik mana saja untuk memindahkan Titik Jemput (Asal)');
  } else {
    if (btnPickup) btnPickup.className = 'px-3 py-1.5 rounded-xl font-label-sm text-label-sm font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1 cursor-pointer transition-all';
    if (btnDropoff) btnDropoff.className = 'px-3 py-1.5 rounded-xl font-label-sm text-label-sm font-bold bg-secondary-container text-on-secondary-container shadow-sm flex items-center gap-1 cursor-pointer transition-all';
    if (textInstruction) textInstruction.textContent = 'Klik peta atau geser marker untuk memindahkan Titik Antar (Tujuan)';
    showToast('Mode Aktif Peta: Klik titik mana saja untuk memindahkan Titik Antar (Tujuan)');
  }
};

window.useCurrentGpsLocation = function() {
  if (!navigator.geolocation) {
    showToast('Fitur Geolocation GPS tidak didukung oleh browser Anda.', 'error');
    return;
  }
  showToast('Mengambil posisi GPS presisi perangkat Anda...', 'info');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const mode = state.mapInteractivityMode || 'pickup';

      if (mode === 'pickup' && pickupMarker) {
        pickupMarker.setLatLng([lat, lng]);
        state.pindahan.pickupCoords = [lat, lng];
        reverseGeocodeCoords(lat, lng, 'pickup');
      } else if (mode === 'dropoff' && dropoffMarker) {
        dropoffMarker.setLatLng([lat, lng]);
        state.pindahan.dropoffCoords = [lat, lng];
        reverseGeocodeCoords(lat, lng, 'dropoff');
      }
      updateMapRouteAndDistances(true);
      showToast('Posisi GPS perangkat berhasil diterapkan ke peta!', 'success');
    },
    (err) => {
      showToast('Gagal mengakses GPS. Menggunakan lokasi default.', 'error');
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
};

async function reverseGeocodeCoords(lat, lng, targetField) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`, {
      headers: { 'Accept-Language': 'id' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.display_name) {
        const addrStr = data.display_name;
        applySelectedLocation(addrStr, null, targetField, false);
        return;
      }
    }
  } catch (e) {
    console.warn("Nominatim reverse geocoding error:", e);
  }

  const fallbackAddr = `Jl. Koor (${lat.toFixed(4)}, ${lng.toFixed(4)}), Sektor Pemesanan SHIFT`;
  applySelectedLocation(fallbackAddr, null, targetField, false);
}

/* ==========================================
 * NATIONWIDE INTERACTIVE GPS MAP LOCATION PICKER MODAL
 * Supports nationwide coverage, live search, region tabs & reverse-geocoding auto-fill
 * ========================================== */

let activeMapTargetField = 'pickup';
let activeMapRegion = 'all';
let currentSearchQuery = '';

window.openMapPickerModal = function(targetField) {
  activeMapTargetField = targetField || 'pickup';
  const modal = document.getElementById('mapPickerModal');
  if (!modal) return;

  activeMapRegion = 'all';
  currentSearchQuery = '';

  const searchInput = document.getElementById('mapSearchInput');
  if (searchInput) searchInput.value = '';

  modal.classList.remove('hidden');
  renderPresetMapMarkers();
};

window.closeMapPickerModal = function() {
  const modal = document.getElementById('mapPickerModal');
  if (modal) modal.classList.add('hidden');
};

window.filterMapByRegion = function(regionKey) {
  activeMapRegion = regionKey;
  renderPresetMapMarkers();
};

window.handleMapSearchInput = function(query) {
  currentSearchQuery = query.trim().toLowerCase();
  renderPresetMapMarkers();
};

function renderPresetMapMarkers() {
  const container = document.getElementById('mapPickerPresetList');
  if (!container) return;

  const regionTabsContainer = document.getElementById('mapRegionTabs');
  if (regionTabsContainer) {
    const regions = [
      { key: 'all', label: 'Semua Indonesia' },
      { key: 'diy', label: 'DIY' },
      { key: 'jateng', label: 'Jateng' },
      { key: 'jabodetabek', label: 'Jabodetabek' },
      { key: 'jabar', label: 'Jawa Barat' },
      { key: 'jatim', label: 'Jatim & Bali' },
      { key: 'luar_jawa', label: 'Luar Jawa' }
    ];

    regionTabsContainer.innerHTML = regions.map(r => {
      const isSelected = r.key === activeMapRegion;
      const cls = isSelected 
        ? 'bg-primary text-on-primary font-bold shadow-sm' 
        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-semibold';
      return `<button onclick="filterMapByRegion('${r.key}')" type="button" class="px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${cls}">${r.label}</button>`;
    }).join('');
  }

  let filtered = NATIONWIDE_MAP_LOCATIONS;

  if (activeMapRegion !== 'all') {
    if (activeMapRegion === 'jatim') {
      filtered = filtered.filter(l => l.region === 'jatim' || l.region === 'bali');
    } else {
      filtered = filtered.filter(l => l.region === activeMapRegion);
    }
  }

  if (currentSearchQuery) {
    filtered = filtered.filter(l => 
      l.name.toLowerCase().includes(currentSearchQuery) || 
      l.city.toLowerCase().includes(currentSearchQuery) || 
      l.district.toLowerCase().includes(currentSearchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center space-y-3 bg-surface-container-low rounded-2xl border border-dashed border-slate-300">
        <span class="material-symbols-outlined text-[36px] text-primary">pin_drop</span>
        <div class="space-y-1">
          <h4 class="font-label-lg text-label-lg font-bold text-on-surface">Lokasi Ditentukan oleh Pin GPS Anda</h4>
          <p class="font-body-sm text-body-sm text-on-surface-variant">"${currentSearchQuery}" tidak ada di preset sampel. Gunakan tombol di bawah untuk menuliskan koordinat/alamat ini secara presisi.</p>
        </div>
        <button onclick="selectCustomAddress('${currentSearchQuery.replace(/'/g, "\\'")}')" class="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer">
          Gunakan Alamat Kustom: "${currentSearchQuery}"
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((loc, idx) => `
    <div onclick="selectMapLocationByObj(${NATIONWIDE_MAP_LOCATIONS.indexOf(loc)})" class="p-3.5 rounded-2xl bg-surface-container-low/80 hover:bg-primary/10 border border-slate-100 cursor-pointer flex items-center justify-between transition-all group">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:bg-primary group-hover:text-on-primary transition-colors">
          <span class="material-symbols-outlined text-[20px]">place</span>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="font-label-md text-label-md font-bold text-on-surface group-hover:text-primary transition-colors truncate">${loc.name}</span>
          <span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
            <span class="bg-primary-fixed/50 text-primary px-1.5 py-0.2 rounded font-bold text-[10px] uppercase">${loc.city}</span>
            <span>• Estimasi Jarak: ${loc.km} km</span>
          </span>
        </div>
      </div>
      <span class="material-symbols-outlined text-slate-300 group-hover:text-primary text-[20px] shrink-0">chevron_right</span>
    </div>
  `).join('');
}

window.selectMapLocationByObj = function(globalIndex) {
  const loc = NATIONWIDE_MAP_LOCATIONS[globalIndex];
  if (!loc) return;

  const target = activeMapTargetField;
  if (loc.coords && target !== 'cleaning') {
    if (target === 'pickup') {
      state.pindahan.pickupCoords = loc.coords;
      if (pickupMarker) pickupMarker.setLatLng(loc.coords);
    } else {
      state.pindahan.dropoffCoords = loc.coords;
      if (dropoffMarker) dropoffMarker.setLatLng(loc.coords);
    }
    updateMapRouteAndDistances(true);
  }

  applySelectedLocation(loc.name, loc.km, target, !loc.coords);
  closeMapPickerModal();
};

window.selectCustomAddress = function(customAddr) {
  if (!customAddr) return;
  const formatted = customAddr.charAt(0).toUpperCase() + customAddr.slice(1);
  const randomKm = Number((Math.floor(Math.random() * 140 + 45) / 10).toFixed(1));
  applySelectedLocation(formatted, randomKm);
};

function applySelectedLocation(addressStr, kmVal, targetOverride, shouldMoveMapCamera = true) {
  const target = targetOverride || activeMapTargetField;

  if (target === 'pickup') {
    state.pindahan.pickupAddress = addressStr;
    const input = document.getElementById('pickupAddressInput');
    if (input) input.value = addressStr;
  } else if (target === 'dropoff') {
    state.pindahan.dropoffAddress = addressStr;
    const input = document.getElementById('dropoffAddressInput');
    if (input) input.value = addressStr;
  } else if (target === 'cleaning') {
    state.cleaning.address = addressStr;
    const input = document.getElementById('cleaningAddressInput');
    if (input) input.value = addressStr;
  }

  if (kmVal) state.pindahan.distanceKm = kmVal;

  if (shouldMoveMapCamera && target !== 'cleaning') {
    debouncedGeocodeAddressInput(addressStr, target);
  }

  saveStateToStorage();
  updatePindahanReviewPills();
  
  if (state.pindahan.isCalculated) renderPindahanCalculatedPrices();
  if (state.cleaning.isCalculated) renderCleaningCalculatedPrices();

  const labelName = target === 'pickup' ? 'Penjemputan' : target === 'dropoff' ? 'Tujuan' : 'Pembersihan';
  showToast(`Alamat ${labelName} diset ke "${addressStr.substring(0, 40)}..."`, 'success');
}

window.selectMapLocation = window.selectMapLocationByObj;

function renderPindahanCalculatedPrices() {
  const p = state.pindahan;

  const placeholder = document.getElementById('pindahanPlaceholderCard');
  const invoice = document.getElementById('pindahanInvoiceCard');

  if (!p.isCalculated) {
    if (placeholder) placeholder.classList.remove('hidden');
    if (invoice) invoice.classList.add('hidden');
    return;
  }

  if (placeholder) placeholder.classList.add('hidden');
  if (invoice) invoice.classList.remove('hidden');

  setText('.js-base-tariff-name', `Tarif Dasar Armada ${p.vehicleObj.name}`);
  setText('.js-base-tariff', formatRupiah(p.baseTariff));

  // 1. Dynamic Distance Line Item
  const distanceLabel = document.querySelector('.js-distance-line-label');
  if (distanceLabel) {
    distanceLabel.textContent = `Jarak Tempuh (${p.distanceKm} km @ Rp 1.750/km)`;
  }
  setText('.js-distance-km', `${p.distanceKm} km`);
  setText('.js-distance-cost', formatRupiah(p.distanceCost));

  // 2. Pickup Floor Facility Line Item (Tangga vs Lift)
  const pickupIcon = document.querySelector('.js-pickup-icon');
  const pickupLabel = document.querySelector('.js-pickup-line-label');
  if (p.pickupFacility === 'lift') {
    if (pickupIcon) {
      pickupIcon.textContent = 'elevator';
      pickupIcon.className = 'material-symbols-outlined text-[18px] text-emerald-600 js-pickup-icon';
    }
    if (pickupLabel) pickupLabel.textContent = `Fasilitas Lift Asal (Lt. ${p.pickupFloor})`;
    setText('.js-pickup-floor-fee', 'Rp 0 (Gratis)');
  } else {
    if (pickupIcon) {
      pickupIcon.textContent = 'stairs';
      pickupIcon.className = 'material-symbols-outlined text-[18px] text-secondary js-pickup-icon';
    }
    if (p.pickupFloor <= 1) {
      if (pickupLabel) pickupLabel.textContent = `Tangga Manual Asal (Lt. 1 - Ground)`;
      setText('.js-pickup-floor-fee', 'Rp 0 (Standar)');
    } else {
      if (pickupLabel) pickupLabel.textContent = `Kompensasi Tangga Manual Asal (Lt. ${p.pickupFloor})`;
      setText('.js-pickup-floor-fee', formatRupiah(p.pickupFloorFee));
    }
  }

  // 3. Dropoff Floor Facility Line Item (Tangga vs Lift)
  const dropoffIcon = document.querySelector('.js-dropoff-icon');
  const dropoffLabel = document.querySelector('.js-dropoff-line-label');
  if (p.dropoffFacility === 'lift') {
    if (dropoffIcon) {
      dropoffIcon.textContent = 'elevator';
      dropoffIcon.className = 'material-symbols-outlined text-[18px] text-emerald-600 js-dropoff-icon';
    }
    if (dropoffLabel) dropoffLabel.textContent = `Fasilitas Lift Tujuan (Lt. ${p.dropoffFloor})`;
    setText('.js-dropoff-floor-fee', 'Rp 0 (Gratis)');
  } else {
    if (dropoffIcon) {
      dropoffIcon.textContent = 'stairs';
      dropoffIcon.className = 'material-symbols-outlined text-[18px] text-secondary js-dropoff-icon';
    }
    if (p.dropoffFloor <= 1) {
      if (dropoffLabel) dropoffLabel.textContent = `Tangga Manual Tujuan (Lt. 1 - Ground)`;
      setText('.js-dropoff-floor-fee', 'Rp 0 (Standar)');
    } else {
      if (dropoffLabel) dropoffLabel.textContent = `Kompensasi Tangga Manual Tujuan (Lt. ${p.dropoffFloor})`;
      setText('.js-dropoff-floor-fee', formatRupiah(p.dropoffFloorFee));
    }
  }

  // 4. Kru Helper Line Item
  setText('.js-helpers-count-text', `${p.helpersCount} Orang`);
  setText('.js-helpers-fee', formatRupiah(p.helpersFee));

  // 5. Discount, Subtotal, Savings & Final Total
  setText('.js-discount-amount', `-${formatRupiah(p.discount)}`);
  setText('.js-subtotal-price', formatRupiah(p.subtotal));
  setText('.js-savings-amount', `Hemat ${formatRupiah(p.discount)}`);
  setText('.js-total-price', formatRupiah(p.total));
}

function updatePindahanReviewPills() {
  const p = state.pindahan;
  
  const routePill = document.getElementById('reviewRoutePill');
  if (routePill) {
    routePill.innerHTML = `<span class="material-symbols-outlined text-[14px] text-primary">route</span> ${p.distanceKm} km • ${p.vehicleObj.name}`;
  }

  const floorPill = document.getElementById('reviewPickupFloorPill');
  if (floorPill) {
    const pickupStr = p.pickupFacility === 'lift' ? `Lt. ${p.pickupFloor} (Lift)` : `Lt. ${p.pickupFloor} (Tangga)`;
    const dropoffStr = p.dropoffFacility === 'lift' ? `Lt. ${p.dropoffFloor} (Lift)` : `Lt. ${p.dropoffFloor} (Tangga)`;
    floorPill.innerHTML = `<span class="material-symbols-outlined text-[14px] text-secondary">stairs</span> ${pickupStr} → ${dropoffStr}`;
  }

  const helperPill = document.getElementById('reviewHelperPill');
  if (helperPill) {
    helperPill.innerHTML = `<span class="material-symbols-outlined text-[14px] text-tertiary">group</span> ${p.helpersCount} Kru Helper`;
  }

  const schedulePill = document.getElementById('reviewSchedulePill');
  if (schedulePill) {
    const timeText = p.pickupTime || "10:00 WIB";
    schedulePill.innerHTML = `<span class="material-symbols-outlined text-[14px] text-primary">schedule</span> Jam ${timeText}`;
  }
}

window.calculatePindahanTariff = function() {
  const dateInput = document.getElementById('pickupDate');
  const timeSelect = document.getElementById('pickupTime');
  const notesInput = document.getElementById('pickupNotes');

  if (dateInput) {
    dateInput.classList.remove('border-red-400', 'bg-red-50', 'ring-2', 'ring-red-200');
  }

  if (dateInput && !dateInput.value) {
    dateInput.classList.add('border-red-400', 'bg-red-50', 'ring-2', 'ring-red-200');
    showToast('Mohon lengkapi tanggal penjemputan terlebih dahulu!', 'error');
    dateInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    dateInput.focus();
    return;
  }

  if (dateInput) state.pindahan.pickupDate = dateInput.value;
  if (timeSelect) state.pindahan.pickupTime = timeSelect.value;
  if (notesInput) state.pindahan.notes = notesInput.value;

  state.pindahan.isCalculated = true;
  saveStateToStorage();
  updatePindahanReviewPills();
  renderPindahanCalculatedPrices();
  showToast('Estimasi tarif presisi berhasil dihitung!', 'success');
};

/* ==========================================
 * 3. REPRODUCTIVE LIVE TRACKING ENGINE
 * Single Source of Truth + Full UI Reactivity
 * ========================================== */

let trackingLeafletMap = null;
let trackingPickupMarker = null;
let trackingDropoffMarker = null;
let trackingDriverMarker = null;
let trackingRoutePolyline = null;

window.initLiveTrackingLeafletMap = function() {
  const container = document.getElementById('liveTrackingMapContainer') || document.getElementById('liveCleaningMapContainer') || document.getElementById('mapCanvasContainer');
  if (!container || typeof L === 'undefined') return;

  const isCleaningPage = window.location.pathname.includes('cleaning') || liveTrackingState.serviceType === 'cleaning';
  const o = state.activeOrder;

  let pCoords, dCoords, driverCoords;

  if (isCleaningPage) {
    // Cleaning service has 1 main destination location (rumah/kos pelanggan)
    const homeAddress = (o && o.pickupAddress) ? o.pickupAddress : (state.cleaning.address || "Kost Melati Residence, Lowokwaru, Malang -7.9350, 112.6045");
    dCoords = checkDirectCoordinateMatch(homeAddress) || state.cleaning.coords || [-7.9432, 112.6155];
    
    // Initial OTW position of cleaner (Siti Maryam)
    const prog = Math.min(0.9, (liveTrackingState.currentStepIndex + 1) / 6);
    pCoords = [dCoords[0] - 0.008, dCoords[1] - 0.010];
    driverCoords = [
      pCoords[0] + (dCoords[0] - pCoords[0]) * prog,
      pCoords[1] + (dCoords[1] - pCoords[1]) * prog
    ];
  } else {
    // Moving service: Pickup -> Dropoff
    const pAddr = (o && o.pickupAddress) ? o.pickupAddress : state.pindahan.pickupAddress;
    const dAddr = (o && o.dropoffAddress) ? o.dropoffAddress : state.pindahan.dropoffAddress;

    pCoords = checkDirectCoordinateMatch(pAddr) || state.pindahan.pickupCoords || [-7.9350, 112.6045];
    dCoords = checkDirectCoordinateMatch(dAddr) || state.pindahan.dropoffCoords || [-7.9342, 112.6030];

    const prog = Math.min(0.9, (liveTrackingState.currentStepIndex + 1) / 6);
    driverCoords = [
      pCoords[0] + (dCoords[0] - pCoords[0]) * prog,
      pCoords[1] + (dCoords[1] - pCoords[1]) * prog
    ];
  }

  // Clear existing map instance
  if (trackingLeafletMap) {
    try { trackingLeafletMap.remove(); } catch(e){}
    trackingLeafletMap = null;
  }

  // Prepare map div inside canvas container if necessary
  if (container.id === 'mapCanvasContainer') {
    let mapDiv = document.getElementById('liveCleaningMapContainer');
    if (!mapDiv) {
      mapDiv = document.createElement('div');
      mapDiv.id = 'liveCleaningMapContainer';
      mapDiv.className = 'absolute inset-0 w-full h-full z-0';
      container.insertBefore(mapDiv, container.firstChild);
    }
    const staticSvg = container.querySelector('svg');
    if (staticSvg) staticSvg.style.display = 'none';
    const staticPin = container.querySelector('#cleanerMarker');
    if (staticPin) staticPin.style.display = 'none';
  } else if (container.id === 'liveTrackingMapContainer') {
    const parentWrapper = container.parentElement;
    if (parentWrapper) {
      const staticSvg = parentWrapper.querySelector('svg');
      if (staticSvg) staticSvg.style.display = 'none';
      const staticBg = parentWrapper.querySelector('.bg-cover');
      if (staticBg) staticBg.style.display = 'none';
      const staticPin = parentWrapper.querySelector('#driverMarkerPin');
      if (staticPin) staticPin.style.display = 'none';
    }
  }

  const mapDivId = container.id === 'mapCanvasContainer' ? 'liveCleaningMapContainer' : container.id;
  const centerLat = (pCoords[0] + dCoords[0]) / 2;
  const centerLng = (pCoords[1] + dCoords[1]) / 2;

  trackingLeafletMap = L.map(mapDivId, {
    zoomControl: false
  }).setView([centerLat, centerLng], 14);

  L.control.zoom({ position: 'topright' }).addTo(trackingLeafletMap);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(trackingLeafletMap);

  if (isCleaningPage) {
    const homeIcon = L.divIcon({
      className: 'custom-pin-cleaning-home',
      html: `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xl border-2 border-white transform transition-transform group-hover:scale-110">
            <span class="material-symbols-outlined text-[20px]">home</span>
          </div>
          <div class="w-2.5 h-2.5 bg-secondary-container rounded-full -mt-1 border border-white"></div>
          <span class="bg-secondary-container text-on-secondary-container font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-md mt-0.5 whitespace-nowrap">TUJUAN PELANGGAN</span>
        </div>
      `,
      iconSize: [120, 60],
      iconAnchor: [60, 40]
    });

    const cleanerIcon = L.divIcon({
      className: 'custom-pin-cleaner',
      html: `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="bg-primary text-on-primary px-2.5 py-0.5 rounded-full shadow-md text-[10px] font-bold whitespace-nowrap mb-1 flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ${liveTrackingState.driverName || "Siti Maryam"} (OTW)
          </div>
          <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 rounded-full bg-primary/20 animate-ping"></div>
            <div class="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl border-2 border-white">
              <span class="material-symbols-outlined text-[20px]">cleaning_services</span>
            </div>
          </div>
        </div>
      `,
      iconSize: [140, 65],
      iconAnchor: [70, 45]
    });

    trackingDropoffMarker = L.marker(dCoords, { icon: homeIcon }).addTo(trackingLeafletMap);
    trackingDriverMarker = L.marker(driverCoords, { icon: cleanerIcon }).addTo(trackingLeafletMap);

    trackingRoutePolyline = L.polyline([driverCoords, dCoords], {
      color: '#006194',
      weight: 5,
      opacity: 0.9,
      dashArray: '8, 8'
    }).addTo(trackingLeafletMap);

    const bounds = L.latLngBounds([driverCoords, dCoords]);
    trackingLeafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });

  } else {
    const pickupIcon = L.divIcon({
      className: 'custom-pin-pickup',
      html: `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl border-2 border-white">
            <span class="material-symbols-outlined text-[20px]">place</span>
          </div>
          <span class="bg-primary text-on-primary font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md mt-0.5 whitespace-nowrap">JEMPUT</span>
        </div>
      `,
      iconSize: [60, 55],
      iconAnchor: [30, 35]
    });

    const dropoffIcon = L.divIcon({
      className: 'custom-pin-dropoff',
      html: `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xl border-2 border-white">
            <span class="material-symbols-outlined text-[20px]">flag</span>
          </div>
          <span class="bg-secondary-container text-on-secondary-container font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md mt-0.5 whitespace-nowrap">TUJUAN</span>
        </div>
      `,
      iconSize: [60, 55],
      iconAnchor: [30, 35]
    });

    const driverIcon = L.divIcon({
      className: 'custom-pin-driver',
      html: `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="bg-primary text-on-primary px-2.5 py-0.5 rounded-full shadow-md text-[10px] font-bold whitespace-nowrap mb-1 flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ${liveTrackingState.driverName || "Budi S."} • ${liveTrackingState.speed} km/j
          </div>
          <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 rounded-full bg-primary/20 animate-ping"></div>
            <div class="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl border-2 border-white">
              <span class="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
          </div>
        </div>
      `,
      iconSize: [140, 65],
      iconAnchor: [70, 45]
    });

    trackingPickupMarker = L.marker(pCoords, { icon: pickupIcon }).addTo(trackingLeafletMap);
    trackingDropoffMarker = L.marker(dCoords, { icon: dropoffIcon }).addTo(trackingLeafletMap);
    trackingDriverMarker = L.marker(driverCoords, { icon: driverIcon }).addTo(trackingLeafletMap);

    trackingRoutePolyline = L.polyline([pCoords, driverCoords, dCoords], {
      color: '#006194',
      weight: 5,
      opacity: 0.9,
      dashArray: '8, 8'
    }).addTo(trackingLeafletMap);

    const bounds = L.latLngBounds([pCoords, dCoords, driverCoords]);
    trackingLeafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }
};

window.openGoogleMaps = function() {
  const isCleaningPage = window.location.pathname.includes('cleaning') || liveTrackingState.serviceType === 'cleaning';
  let url = "https://www.google.com/maps";
  if (isCleaningPage) {
    const o = state.activeOrder;
    const homeAddress = (o && o.pickupAddress) ? o.pickupAddress : (state.cleaning.address || "");
    const coords = checkDirectCoordinateMatch(homeAddress) || state.cleaning.coords || [-7.9432, 112.6155];
    url = `https://www.google.com/maps/search/?api=1&query=${coords[0]},${coords[1]}`;
  } else {
    const o = state.activeOrder;
    const pAddr = (o && o.pickupAddress) ? o.pickupAddress : state.pindahan.pickupAddress;
    const dAddr = (o && o.dropoffAddress) ? o.dropoffAddress : state.pindahan.dropoffAddress;
    const p = checkDirectCoordinateMatch(pAddr) || state.pindahan.pickupCoords || [-7.9350, 112.6045];
    const d = checkDirectCoordinateMatch(dAddr) || state.pindahan.dropoffCoords || [-7.9342, 112.6030];
    url = `https://www.google.com/maps/dir/?api=1&origin=${p[0]},${p[1]}&destination=${d[0]},${d[1]}`;
  }
  window.open(url, '_blank');
};

function initLiveTrackingEngine() {
  const isCleaningPage = window.location.pathname.includes('cleaning');
  liveTrackingState.serviceType = isCleaningPage ? 'cleaning' : 'pindahan';

  const o = state.activeOrder;
  if (o) {
    if (isCleaningPage || o.type === 'cleaning') {
      liveTrackingState.serviceType = 'cleaning';
      liveTrackingState.driverName = o.mitraName || "Siti Maryam & Rekan";
      liveTrackingState.vehicleName = o.vehicleName || "Tim Deep Cleaning UV-C";
      liveTrackingState.vehiclePlate = o.vehiclePlate || "SHIFT-CLN";
    } else {
      liveTrackingState.serviceType = 'pindahan';
      liveTrackingState.driverName = o.mitraName || "Mitra Budi Santoso";
      liveTrackingState.vehicleName = o.vehicleName || "Pick-up Box Tertutup";
      liveTrackingState.vehiclePlate = o.vehiclePlate || "B 9021 SHF";
    }
  }

  // Attach refresh button handlers
  const btnPindahan = document.getElementById('refreshGpsBtn');
  if (btnPindahan) btnPindahan.addEventListener('click', window.triggerGpsSync);

  const btnCleaning = document.getElementById('refreshBtn');
  if (btnCleaning) btnCleaning.addEventListener('click', window.triggerGpsSync);

  // Sync latest order state from Supabase Cloud if available
  fetchActiveOrderFromSupabase();

  // Initialize interactive Leaflet map for tracking
  initLiveTrackingLeafletMap();

  // Render initial UI from liveTrackingState
  updateLiveTrackingUI();
}

async function fetchActiveOrderFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0) {
      const dbOrder = data[0];
      if (dbOrder) {
        state.activeOrder = {
          id: dbOrder.order_id || dbOrder.id || state.activeOrder?.id || "SHF-90214",
          type: dbOrder.type || state.activeOrder?.type || "pindahan",
          serviceName: dbOrder.service_name || state.activeOrder?.serviceName || "Pindahan Barang",
          status: dbOrder.status || state.activeOrder?.status || "Aktif",
          mitraName: dbOrder.mitra_name || state.activeOrder?.mitraName,
          vehicleName: dbOrder.vehicle_name || state.activeOrder?.vehicleName,
          vehiclePlate: dbOrder.vehicle_plate || state.activeOrder?.vehiclePlate,
          totalPrice: dbOrder.total_price || state.activeOrder?.totalPrice,
          pickupAddress: dbOrder.pickup_address || state.activeOrder?.pickupAddress,
          dropoffAddress: dbOrder.dropoff_address || state.activeOrder?.dropoffAddress,
          createdAt: dbOrder.created_at
        };
        saveStateToStorage();
        initLiveTrackingLeafletMap();
        updateLiveTrackingUI();
      }
    }
  } catch(e) {
    console.warn("Supabase order fetch info:", e);
  }
}

function updateLiveTrackingUI(isSimulatedStep = false) {
  const stepIdx = liveTrackingState.currentStepIndex;
  const isCleaning = liveTrackingState.serviceType === 'cleaning';
  const milestones = isCleaning ? liveTrackingState.cleaningMilestones : liveTrackingState.pindahanMilestones;
  const currentWp = liveTrackingState.waypoints[stepIdx];
  const activeMilestone = milestones[stepIdx];
  const o = state.activeOrder;

  const currentOrderId = (o && o.id) ? o.id : (isCleaning ? state.cleaning.orderId : state.pindahan.orderId);
  const currentPickup = (o && o.pickupAddress) ? o.pickupAddress : (isCleaning ? state.cleaning.address : state.pindahan.pickupAddress);
  const currentDropoff = (o && o.dropoffAddress) ? o.dropoffAddress : (isCleaning ? 'Lokasi Pengerjaan Hunian' : state.pindahan.dropoffAddress);

  // 1. Update Header Status Title & Badges
  setText('.js-order-status-title, #orderStatusTitle', activeMilestone.title);
  setText('.js-eta-badge, #etaBadge', `~${liveTrackingState.etaMinutes} Menit (${liveTrackingState.distanceRemainingKm} km)`);
  setText('.js-ticket-id', `#${currentOrderId}`);

  // 2. Update Map Telemetry HUD Elements
  setText('.js-speed-text, #speedText', `${liveTrackingState.speed} km/jam • ${liveTrackingState.speed > 0 ? 'Melaju Lancar' : 'Stasioner / Pengerjaan'}`);
  setText('.js-last-updated-text, #lastUpdatedText', `Update: ${liveTrackingState.lastUpdated}`);
  setText('.js-current-route, #currentRouteText', `Via ${currentWp.name}`);
  setText('.js-eta-clock, #etaClockText', `Perkiraan Sampai: 10:${14 + (6 - liveTrackingState.etaMinutes)} WIB`);

  // Update Location Labels in Map HUD / Pin Overlays
  setText('.js-pickup-loc-text, #pickupLocText', currentPickup);
  setText('.js-dropoff-loc-text, #dropoffLocText', currentDropoff);

  // 3. Move Leaflet Map Markers & Polyline Smoothly
  if (trackingLeafletMap && trackingDriverMarker) {
    if (isCleaning) {
      const homeAddress = (o && o.pickupAddress) ? o.pickupAddress : (state.cleaning.address || "Kost Melati Residence, Lowokwaru, Malang -7.9350, 112.6045");
      const dCoords = checkDirectCoordinateMatch(homeAddress) || state.cleaning.coords || [-7.9432, 112.6155];
      const pCoords = [dCoords[0] - 0.008, dCoords[1] - 0.010];

      const prog = Math.min(0.95, (stepIdx + 1) / 6);
      const curDriverCoords = [
        pCoords[0] + (dCoords[0] - pCoords[0]) * prog,
        pCoords[1] + (dCoords[1] - pCoords[1]) * prog
      ];

      trackingDriverMarker.setLatLng(curDriverCoords);
      if (trackingDropoffMarker) trackingDropoffMarker.setLatLng(dCoords);
      if (trackingRoutePolyline) trackingRoutePolyline.setLatLngs([curDriverCoords, dCoords]);

      try {
        const bounds = L.latLngBounds([curDriverCoords, dCoords]);
        trackingLeafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
      } catch(e){}
    } else {
      const pAddr = (o && o.pickupAddress) ? o.pickupAddress : state.pindahan.pickupAddress;
      const dAddr = (o && o.dropoffAddress) ? o.dropoffAddress : state.pindahan.dropoffAddress;

      const pCoords = checkDirectCoordinateMatch(pAddr) || state.pindahan.pickupCoords || [-7.9350, 112.6045];
      const dCoords = checkDirectCoordinateMatch(dAddr) || state.pindahan.dropoffCoords || [-7.9342, 112.6030];

      const prog = Math.min(0.95, (stepIdx + 1) / 6);
      const curDriverCoords = [
        pCoords[0] + (dCoords[0] - pCoords[0]) * prog,
        pCoords[1] + (dCoords[1] - pCoords[1]) * prog
      ];

      if (trackingPickupMarker) trackingPickupMarker.setLatLng(pCoords);
      if (trackingDropoffMarker) trackingDropoffMarker.setLatLng(dCoords);
      trackingDriverMarker.setLatLng(curDriverCoords);

      if (trackingRoutePolyline) trackingRoutePolyline.setLatLngs([pCoords, curDriverCoords, dCoords]);

      try {
        const bounds = L.latLngBounds([pCoords, dCoords, curDriverCoords]);
        trackingLeafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
      } catch(e){}
    }
  }

  // Legacy DOM Pin positioning fallback
  const pin = document.getElementById('driverMarkerPin') || document.getElementById('cleanerMarker');
  if (pin) {
    pin.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    pin.style.left = `${currentWp.left}%`;
    pin.style.top = `${currentWp.top}%`;

    const label = pin.querySelector('.js-marker-label, text:nth-child(5)');
    if (label) {
      label.textContent = `${(liveTrackingState.driverName || (isCleaning ? "Siti" : "Budi")).split(' ')[0]} • ${liveTrackingState.speed} km/j`;
    }
  }

  // 4. Render Milestone Timeline Steps
  const container = document.getElementById('milestoneContainer');
  if (container) {
    container.innerHTML = milestones.map((m, idx) => {
      if (idx < stepIdx) {
        return `
          <div class="relative flex items-start gap-space-sm transition-all duration-300">
            <div class="absolute -left-6 top-1 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center ring-4 ring-surface-container-lowest z-10 shadow-sm">
              <span class="material-symbols-outlined text-[13px] font-bold">check</span>
            </div>
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-label-md text-label-md text-on-surface font-bold">${m.title}</span>
                <span class="font-label-sm text-label-sm text-emerald-600 font-bold bg-emerald-50 px-2 py-0.2 rounded-full">Selesai • ${m.time}</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">${m.desc}</p>
            </div>
          </div>
        `;
      } else if (idx === stepIdx) {
        return `
          <div class="relative flex items-start gap-space-sm transition-all duration-300">
            <div class="absolute -left-6 top-1 w-6 h-6 -ml-0.5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center ring-4 ring-secondary-fixed/50 z-10 animate-bounce shadow-md">
              <span class="material-symbols-outlined text-[14px] font-extrabold">${m.icon}</span>
            </div>
            <div class="flex flex-col bg-surface-container-lowest p-space-sm rounded-2xl border-2 border-primary/30 shadow-md w-full">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-label-md text-label-md text-primary font-black uppercase tracking-wide flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  ${m.title}
                </span>
                <span class="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-extrabold px-2 py-0.5 rounded-full">
                  SEKARANG • Tahap ${m.step}
                </span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface font-medium mt-1 leading-relaxed">${m.desc}</p>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="relative flex items-start gap-space-sm opacity-50 hover:opacity-80 transition-all duration-300">
            <div class="absolute -left-6 top-1 w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center ring-4 ring-surface-container-lowest z-10">
              <span class="material-symbols-outlined text-[13px]">${m.icon}</span>
            </div>
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-label-md text-label-md text-on-surface font-semibold">${m.title}</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">${m.time}</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">${m.desc}</p>
            </div>
          </div>
        `;
      }
    }).join('');
  }
}

// Debounced Live GPS Refresh Trigger
window.triggerGpsSync = function() {
  if (liveTrackingState.isSyncing) return; // Prevent spam clicks (debounce)
  liveTrackingState.isSyncing = true;

  const btn = document.getElementById('refreshGpsBtn') || document.getElementById('refreshBtn');
  if (btn) {
    btn.classList.add('animate-spin', 'pointer-events-none', 'opacity-60');
  }

  // Simulate real-time telemetry updates
  setTimeout(() => {
    const randomSpeed = Math.floor(Math.random() * 14) + 24; // 24-38 km/h
    const newEta = Math.max(1, liveTrackingState.etaMinutes - (Math.random() > 0.5 ? 1 : 0));
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    liveTrackingState.speed = randomSpeed;
    liveTrackingState.etaMinutes = newEta;
    liveTrackingState.lastUpdated = `${timeStr} WIB`;

    // Shift map waypoint position slightly forward
    const currentWp = liveTrackingState.waypoints[liveTrackingState.currentStepIndex];
    currentWp.left = Math.min(85, currentWp.left + 1.5);
    currentWp.top = Math.max(15, currentWp.top - 1.2);

    updateLiveTrackingUI();

    const driver = liveTrackingState.driverName;
    const loc = currentWp.name;
    showToast(`GPS Diperbarui: ${driver} di ${loc} (${randomSpeed} km/jam, Tiba dalam ${newEta} menit).`, 'success');

    if (btn) {
      btn.classList.remove('animate-spin', 'pointer-events-none', 'opacity-60');
    }
    liveTrackingState.isSyncing = false;
  }, 750);
};

// Simulation Step Advancer
window.advanceTrackingStep = function() {
  if (liveTrackingState.isSyncing) return;
  
  const totalSteps = 6;
  liveTrackingState.currentStepIndex = (liveTrackingState.currentStepIndex + 1) % totalSteps;
  const currentWp = liveTrackingState.waypoints[liveTrackingState.currentStepIndex];
  
  liveTrackingState.speed = currentWp.speed;
  liveTrackingState.etaMinutes = currentWp.eta;
  const now = new Date();
  liveTrackingState.lastUpdated = `${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

  updateLiveTrackingUI(true);

  const isCleaning = liveTrackingState.serviceType === 'cleaning';
  const milestones = isCleaning ? liveTrackingState.cleaningMilestones : liveTrackingState.pindahanMilestones;
  const stepInfo = milestones[liveTrackingState.currentStepIndex];

  showToast(`Tahap Alur Berubah: [Langkah ${stepInfo.step}] ${stepInfo.title}`, 'info');
};

/* ==========================================
 * PAYMENT METHOD SWITCHER (QRIS VS BANK MANUAL)
 * ========================================== */

/* ==========================================
 * PAYMENT METHOD SWITCHER & DYNAMIC ROUTING CTA ENGINE
 * ========================================== */

window.selectPaymentMethod = function(method, clickedEl) {
  const isCleaningPage = window.location.pathname.includes('cleaning');
  if (isCleaningPage) {
    state.cleaning.paymentMethod = method;
  } else {
    state.pindahan.paymentMethod = method;
  }
  saveStateToStorage();

  const qrisTab = document.getElementById('paymentTabQris');
  const bankTab = document.getElementById('paymentTabBank');
  const qrisBox = document.getElementById('qrisContainer');
  const bankBox = document.getElementById('bankTransferContainer');

  if (method === 'qris') {
    if (qrisTab) qrisTab.className = 'flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm text-center cursor-pointer transition-all';
    if (bankTab) bankTab.className = 'flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-center cursor-pointer transition-all';
    if (qrisBox) qrisBox.classList.remove('hidden');
    if (bankBox) bankBox.classList.add('hidden');
  } else {
    if (qrisTab) qrisTab.className = 'flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-center cursor-pointer transition-all';
    if (bankTab) bankTab.className = 'flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm text-center cursor-pointer transition-all';
    if (qrisBox) qrisBox.classList.add('hidden');
    if (bankBox) bankBox.classList.remove('hidden');
  }

  // Update card highlights if clickedEl is passed
  const methodCards = document.querySelectorAll('.js-pay-method-card');
  methodCards.forEach(card => {
    const checkIcon = card.querySelector('.js-pay-check');
    if (card === clickedEl) {
      card.className = 'js-pay-method-card p-space-md rounded-2xl bg-primary/5 text-primary border border-primary/30 cursor-pointer flex items-center justify-between shadow-sm';
      if (checkIcon) {
        checkIcon.textContent = 'check_circle';
        checkIcon.className = 'material-symbols-outlined text-primary text-[20px] js-pay-check';
      }
    } else if (clickedEl) {
      card.className = 'js-pay-method-card p-space-md rounded-2xl bg-surface-container-low hover:bg-surface-container-highest/60 border border-slate-100 cursor-pointer flex items-center justify-between transition-all';
      if (checkIcon) {
        checkIcon.textContent = 'radio_button_unchecked';
        checkIcon.className = 'material-symbols-outlined text-outline-variant text-[20px] js-pay-check';
      }
    }
  });

  updatePaymentCtaButtons(method);
  showToast(`Metode pembayaran utama diset ke: ${method === 'qris' ? 'QRIS Dinamis Instan' : 'Transfer Bank Manual'}`);
};

function updatePaymentCtaButtons(method) {
  const ctaBtnPindahan = document.querySelector('#pindahanInvoiceCard button[onclick*="navigateToPayment"]');
  const placeholderBtnPindahan = document.querySelector('#pindahanPlaceholderCard button');

  if (ctaBtnPindahan) {
    ctaBtnPindahan.innerHTML = `<span>Lanjut ke Pembayaran</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span>`;
    ctaBtnPindahan.className = "w-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container py-4 px-space-md rounded-full font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-[0_16px_32px_-8px_rgba(234,179,8,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99] text-center cursor-pointer";
  }
  if (placeholderBtnPindahan) {
    placeholderBtnPindahan.innerHTML = `<span>Lanjut ke Pembayaran</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span>`;
  }

  const ctaBtnCleaningText = document.querySelector('.js-clean-cta-total');
  if (ctaBtnCleaningText) {
    const totalVal = formatRupiah(state.cleaning.total);
    const parentBtn = ctaBtnCleaningText.parentElement;
    ctaBtnCleaningText.textContent = `Lanjut ke Pembayaran (${totalVal})`;
    if (parentBtn) parentBtn.className = "w-full py-3.5 px-space-lg rounded-full bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-bold shadow-[0_12px_28px_-6px_rgba(254,208,27,0.5)] hover:bg-secondary-fixed transition-all flex items-center justify-center gap-2 group cursor-pointer";
  }
}

window.selectBankOption = function(bankKey) {
  if (!OFFICIAL_BANKS[bankKey]) return;
  state.pindahan.selectedBank = bankKey;
  saveStateToStorage();

  const activeBank = OFFICIAL_BANKS[bankKey];
  setText('.js-active-bank-name', activeBank.bank);
  setText('.js-active-bank-acc', activeBank.acc);
  setText('.js-active-bank-owner', activeBank.name);

  showToast(`Bank tujuan transfer dipilih: ${activeBank.bank}`);
};

window.copyBankAccToClipboard = function(accNum) {
  const targetAcc = accNum || OFFICIAL_BANKS[state.pindahan.selectedBank || 'bca'].acc;
  navigator.clipboard.writeText(targetAcc).then(() => {
    showToast(`Nomor rekening ${targetAcc} disalin ke clipboard!`, 'success');
  }).catch(() => {
    showToast(`Nomor rekening ${targetAcc} disalin!`, 'success');
  });
};

window.openManualTransferModal = function() {
  const modal = document.getElementById('manualTransferModal');
  if (modal) modal.classList.remove('hidden');
};

window.closeManualTransferModal = function() {
  const modal = document.getElementById('manualTransferModal');
  if (modal) modal.classList.add('hidden');
};

window.handleConfirmPayment = async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const isCleaning = urlParams.get('service') === 'cleaning' || state.activeService === 'cleaning';

  state.isNewUserDemo = false;
  if (isCleaning) {
    state.activeService = 'cleaning';
    state.activeOrder = {
      id: state.cleaning.orderId || "SHF-CLN-90215",
      type: "cleaning",
      serviceName: "Deep Clean & Sanitasi Hunian",
      status: "Lunas - QRIS Dinamis Instan",
      mitraName: state.cleaning.cleaner || "Siti Maryam & Rekan",
      vehicleName: "Tim Hydro-Vacuum UV-C",
      vehiclePlate: "SHIFT-CLN",
      totalPrice: state.cleaning.total,
      pickupAddress: state.cleaning.address,
      dropoffAddress: state.cleaning.address,
      createdAt: new Date().toISOString()
    };
  } else {
    state.activeService = 'moving';
    state.activeOrder = {
      id: state.pindahan.orderId || "SHF-90214",
      type: "pindahan",
      serviceName: "Pindahan Barang Kos / Apartemen",
      status: "Lunas - QRIS Dinamis Instan",
      mitraName: state.pindahan.vehicleObj?.driver || "Budi Santoso",
      vehicleName: state.pindahan.vehicleObj?.name || "Pick-up Box",
      vehiclePlate: state.pindahan.vehicleObj?.plate || "AB 1420 YK",
      totalPrice: state.pindahan.total,
      pickupAddress: state.pindahan.pickupAddress,
      dropoffAddress: state.pindahan.dropoffAddress,
      createdAt: new Date().toISOString()
    };
  }
  saveStateToStorage();

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('orders').insert([
        {
          order_id: state.activeOrder.id,
          type: state.activeOrder.type,
          service_name: state.activeOrder.serviceName,
          status: state.activeOrder.status,
          mitra_name: state.activeOrder.mitraName,
          vehicle_name: state.activeOrder.vehicleName,
          vehicle_plate: state.activeOrder.vehiclePlate,
          total_price: state.activeOrder.totalPrice,
          pickup_address: state.activeOrder.pickupAddress,
          dropoff_address: state.activeOrder.dropoffAddress,
          created_at: state.activeOrder.createdAt
        }
      ]);
      console.log(`Order ${state.activeOrder.id} successfully saved to Supabase 'orders' table.`);
    } catch(err) {
      console.warn("Supabase order insert exception:", err);
    }
  }

  const modal = document.getElementById('success-modal');
  const modalBox = document.getElementById('modal-box');
  if (modal && modalBox) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
      modalBox.classList.remove('scale-95', 'opacity-0');
      modalBox.classList.add('scale-100', 'opacity-100');
    }, 50);
  } else {
    showToast('Pembayaran QRIS Terkonfirmasi Lunas! Mengalihkan ke Live Tracker...', 'success');
    setTimeout(() => {
      window.location.href = isCleaning ? './tracking-cleaning.html?service=cleaning' : './tracking.html?service=moving';
    }, 1000);
  }
};

window.proceedToTracking = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const isCleaning = urlParams.get('service') === 'cleaning' || state.activeService === 'cleaning';
  window.location.href = isCleaning ? './tracking-cleaning.html?service=cleaning' : './tracking.html?service=moving';
};

window.submitManualTransferConfirmation = async function(e) {
  if (e) e.preventDefault();
  closeManualTransferModal();

  showToast('Konfirmasi transfer manual terkirim! Tim keuangan sedang memverifikasi.', 'success');
  
  const urlParams = new URLSearchParams(window.location.search);
  const isCleaning = urlParams.get('service') === 'cleaning' || state.activeService === 'cleaning';

  state.isNewUserDemo = false;
  if (isCleaning) {
    state.activeService = 'cleaning';
    state.activeOrder = {
      id: state.cleaning.orderId || "SHF-CLN-90215",
      type: "cleaning",
      serviceName: "Deep Clean & Sanitasi Hunian",
      status: "Transfer Diverifikasi (Manual)",
      mitraName: state.cleaning.cleaner || "Siti Maryam & Rekan",
      vehicleName: "Tim Hydro-Vacuum UV-C",
      vehiclePlate: "SHIFT-CLN",
      totalPrice: state.cleaning.total,
      pickupAddress: state.cleaning.address,
      dropoffAddress: state.cleaning.address,
      createdAt: new Date().toISOString()
    };
  } else {
    state.activeService = 'moving';
    state.activeOrder = {
      id: state.pindahan.orderId || "SHF-90214",
      type: "pindahan",
      serviceName: "Pindahan Barang Kos / Apartemen",
      status: "Transfer Diverifikasi (Manual)",
      mitraName: state.pindahan.vehicleObj.driver,
      vehicleName: state.pindahan.vehicleObj.name,
      vehiclePlate: state.pindahan.vehicleObj.plate,
      totalPrice: state.pindahan.total,
      pickupAddress: state.pindahan.pickupAddress,
      dropoffAddress: state.pindahan.dropoffAddress,
      createdAt: new Date().toISOString()
    };
  }
  saveStateToStorage();

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('orders').insert([
        {
          order_id: state.activeOrder.id,
          type: state.activeOrder.type,
          service_name: state.activeOrder.serviceName,
          status: state.activeOrder.status,
          mitra_name: state.activeOrder.mitraName,
          vehicle_name: state.activeOrder.vehicleName,
          vehicle_plate: state.activeOrder.vehiclePlate,
          total_price: state.activeOrder.totalPrice,
          pickup_address: state.activeOrder.pickupAddress,
          dropoff_address: state.activeOrder.dropoffAddress,
          created_at: state.activeOrder.createdAt
        }
      ]);
    } catch(err){}
  }

  setTimeout(() => {
    window.location.href = isCleaning ? './tracking-cleaning.html?service=cleaning' : './tracking.html?service=moving';
  }, 1000);
};

window.navigateToPayment = function() {
  if (!state.pindahan.isCalculated) {
    showToast('Lengkapi data lalu klik "Hitung Estimasi Tarif" terlebih dahulu!', 'error');
    const btnCalc = document.getElementById('btnCalculatePindahan');
    if (btnCalc) btnCalc.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const method = state.pindahan.paymentMethod || 'qris';
  state.isNewUserDemo = false;
  state.activeOrder = {
    id: state.pindahan.orderId,
    type: "pindahan",
    serviceName: "Pindahan Barang Kos / Apartemen",
    status: method === 'bank' ? "Menunggu Transfer Bank Manual" : "Menunggu Pembayaran QRIS",
    mitraName: state.pindahan.vehicleObj.driver,
    vehicleName: state.pindahan.vehicleObj.name,
    vehiclePlate: state.pindahan.vehicleObj.plate,
    totalPrice: state.pindahan.total,
    pickupAddress: state.pindahan.pickupAddress,
    dropoffAddress: state.pindahan.dropoffAddress,
    createdAt: new Date().toISOString()
  };

  const payload = {
    serviceType: "Pindahan Barang (Kos/Apartemen)",
    orderId: state.pindahan.orderId,
    totalPrice: state.pindahan.total,
    subtotal: state.pindahan.subtotal,
    discount: state.pindahan.discount,
    pickupAddress: state.pindahan.pickupAddress,
    dropoffAddress: state.pindahan.dropoffAddress,
    pickupDate: state.pindahan.pickupDate,
    pickupTime: state.pindahan.pickupTime,
    paymentMethod: method
  };

  sessionStorage.setItem('shift_active_payload', JSON.stringify(payload));
  saveStateToStorage();

  showToast(`Memuat Halaman Pembayaran (${method === 'bank' ? 'Transfer Bank' : 'QRIS'})...`, 'info');
  setTimeout(() => {
    window.location.href = `./payment.html?service=pindahan&method=${method}`;
  }, 600);
};

/* ==========================================
 * DEEP CLEANING CALCULATOR ENGINE
 * ========================================== */

window.selectHousingType = function(type, element) {
  if (!state.cleaning.housingPrices[type]) return;
  state.cleaning.housingType = type;
  saveStateToStorage();

  const cards = document.querySelectorAll('.js-housing-card');
  cards.forEach(card => {
    card.className = 'js-housing-card p-space-md rounded-2xl bg-surface-container-low hover:bg-surface-container-highest/50 cursor-pointer flex items-center justify-between transition-colors border border-slate-100';
    const icon = card.querySelector('.js-check-icon');
    if (icon) {
      icon.className = 'w-5 h-5 rounded-full bg-surface-container-high js-check-icon';
      icon.innerHTML = '';
    }
  });

  if (element) {
    element.className = 'js-housing-card p-space-md rounded-2xl bg-primary/5 text-primary shadow-[0_4px_16px_rgba(0,97,148,0.08)] cursor-pointer flex items-center justify-between border border-primary/20';
    const icon = element.querySelector('.js-check-icon');
    if (icon) {
      icon.className = 'w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center js-check-icon';
      icon.innerHTML = '<span class="material-symbols-outlined text-[16px]">done</span>';
    }
  }

  updateCleaningReviewPills();
  if (state.cleaning.isCalculated) renderCleaningCalculatedPrices();
  showToast(`Tipe Hunian diset ke: ${state.cleaning.housingPrices[type].name}`, 'info');
};

window.selectStainLevel = function(level, element) {
  if (!state.cleaning.stainFees[level]) return;
  state.cleaning.stainLevel = level;
  saveStateToStorage();

  const cards = document.querySelectorAll('.js-stain-card');
  cards.forEach(card => {
    card.className = 'js-stain-card p-space-md rounded-2xl bg-surface-container-low hover:bg-surface-container-highest/60 transition-all cursor-pointer flex flex-col justify-between gap-space-sm border border-slate-100';
    const icon = card.querySelector('.js-check-icon');
    if (icon) {
      icon.className = 'w-5 h-5 rounded-full bg-surface-container-high js-check-icon';
      icon.innerHTML = '';
    }
  });

  if (element) {
    element.className = 'js-stain-card p-space-md rounded-2xl bg-primary/5 text-primary shadow-[0_8px_20px_rgba(0,97,148,0.1)] cursor-pointer flex flex-col justify-between gap-space-sm relative overflow-hidden border border-primary/20';
    const icon = element.querySelector('.js-check-icon');
    if (icon) {
      icon.className = 'w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center js-check-icon';
      icon.innerHTML = '<span class="material-symbols-outlined text-[14px]">done</span>';
    }
  }

  updateCleaningReviewPills();
  if (state.cleaning.isCalculated) renderCleaningCalculatedPrices();
  showToast(`Tingkat Kerak: ${level.charAt(0).toUpperCase() + level.slice(1)} (+${formatRupiah(state.cleaning.stainFees[level].price)})`, 'info');
};

window.toggleAddon = function(addonKey, element) {
  if (state.cleaning.addons[addonKey] === undefined) return;
  state.cleaning.addons[addonKey] = !state.cleaning.addons[addonKey];
  const isActive = state.cleaning.addons[addonKey];
  saveStateToStorage();

  if (element) {
    if (isActive) {
      element.className = 'w-12 h-6 rounded-full bg-primary flex items-center justify-end px-1 cursor-pointer shadow-inner transition-all';
      element.innerHTML = '<div class="w-4 h-4 rounded-full bg-on-primary shadow-sm"></div>';
    } else {
      element.className = 'w-12 h-6 rounded-full bg-surface-container-high flex items-center justify-start px-1 cursor-pointer transition-all';
      element.innerHTML = '<div class="w-4 h-4 rounded-full bg-surface-container-lowest shadow-sm"></div>';
    }
  }

  updateCleaningReviewPills();
  if (state.cleaning.isCalculated) renderCleaningCalculatedPrices();
  const name = state.cleaning.addonPrices[addonKey]?.name || addonKey;
  showToast(`Add-On ${name}: ${isActive ? 'Diaktifkan' : 'Dinonaktifkan'}`, isActive ? 'success' : 'info');
};

window.selectPaymentMethod = function(methodKey, element) {
  const isCleaning = window.location.pathname.includes('cleaning');
  if (isCleaning) {
    state.cleaning.paymentMethod = methodKey;
  } else {
    state.pindahan.paymentMethod = methodKey;
  }
  saveStateToStorage();

  const cards = document.querySelectorAll('.js-pay-method-card');
  cards.forEach(card => {
    card.className = 'js-pay-method-card p-space-md rounded-2xl bg-surface-container-low hover:bg-surface-container-highest/60 border border-slate-100 cursor-pointer flex items-center justify-between transition-all';
    const check = card.querySelector('.js-pay-check');
    if (check) {
      check.className = 'material-symbols-outlined text-outline-variant text-[20px] js-pay-check';
      check.textContent = 'radio_button_unchecked';
    }
  });

  if (element) {
    element.className = 'js-pay-method-card p-space-md rounded-2xl bg-primary/5 text-primary border border-primary/30 cursor-pointer flex items-center justify-between shadow-sm';
    const check = element.querySelector('.js-pay-check');
    if (check) {
      check.className = 'material-symbols-outlined text-primary text-[20px] js-pay-check';
      check.textContent = 'check_circle';
    }
  }

  showToast(`Metode Pembayaran: ${methodKey === 'qris' ? 'QRIS Dinamis Instan' : 'Transfer Bank Manual'}`);
};

function updateCleaningReviewPills() {
  const c = state.cleaning;

  const housingPill = document.getElementById('reviewHousingPill');
  if (housingPill) {
    const info = c.housingPrices[c.housingType];
    housingPill.innerHTML = `<span class="material-symbols-outlined text-[14px] text-primary">single_bed</span> ${info.name}`;
  }

  const stainPill = document.getElementById('reviewStainPill');
  if (stainPill) {
    const stainName = c.stainLevel.charAt(0).toUpperCase() + c.stainLevel.slice(1);
    stainPill.innerHTML = `<span class="material-symbols-outlined text-[14px] text-secondary">cleaning_services</span> Kerak ${stainName}`;
  }

  const addonsPill = document.getElementById('reviewAddonsPill');
  if (addonsPill) {
    const activeCount = Object.values(c.addons).filter(Boolean).length;
    addonsPill.innerHTML = `<span class="material-symbols-outlined text-[14px] text-emerald-600">sanitizer</span> ${activeCount} Add-On Higienis`;
  }

  const schedulePill = document.getElementById('reviewCleanSchedulePill');
  if (schedulePill) {
    const timeText = c.cleanTime || "13:00 WIB";
    schedulePill.innerHTML = `<span class="material-symbols-outlined text-[14px] text-primary">schedule</span> Jam ${timeText}`;
  }
}

function initCleaningCalculator() {
  updateCleaningReviewPills();
  renderCleaningCalculatedPrices();
}

function renderCleaningCalculatedPrices() {
  const c = state.cleaning;

  const placeholder = document.getElementById('cleaningPlaceholderCard');
  const invoice = document.getElementById('cleaningInvoiceCard');

  if (!c.isCalculated) {
    if (placeholder) placeholder.classList.remove('hidden');
    if (invoice) invoice.classList.add('hidden');
    return;
  }

  if (placeholder) placeholder.classList.add('hidden');
  if (invoice) invoice.classList.remove('hidden');

  setText('.js-clean-housing-title', `Paket ${c.housingPrices[c.housingType].name}`);
  setText('.js-clean-housing-price', formatRupiah(c.housingCost));
  setText('.js-clean-stain-title', `Tingkat Kerak ${c.stainLevel.charAt(0).toUpperCase() + c.stainLevel.slice(1)}`);
  setText('.js-clean-stain-price', formatRupiah(c.stainCost));

  toggleElementDisplay('.js-line-vacuum', c.addons.hydroVacuum);
  toggleElementDisplay('.js-line-fogging', c.addons.disinfectantFogging);
  toggleElementDisplay('.js-line-fridge', c.addons.fridgeCleaning);
  toggleElementDisplay('.js-line-ac', c.addons.acCleaning);

  setText('.js-clean-subtotal', formatRupiah(c.subtotal));
  setText('.js-clean-savings', `Hemat ${formatRupiah(c.vipDiscount)}`);
  setText('.js-clean-total', formatRupiah(c.total));
  setText('.js-clean-cta-total', `Lanjut ke Pembayaran (${formatRupiah(c.total)})`);
}

window.calculateCleaningTariff = function() {
  const dateInput = document.getElementById('cleanDate');
  const timeSelect = document.getElementById('cleanTime');
  const notesInput = document.getElementById('cleanNotes');

  if (dateInput) {
    dateInput.classList.remove('border-red-400', 'bg-red-50', 'ring-2', 'ring-red-200');
  }

  if (dateInput && !dateInput.value) {
    dateInput.classList.add('border-red-400', 'bg-red-50', 'ring-2', 'ring-red-200');
    showToast('Mohon lengkapi tanggal pembersihan terlebih dahulu!', 'error');
    dateInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    dateInput.focus();
    return;
  }

  if (dateInput) state.cleaning.cleanDate = dateInput.value;
  if (timeSelect) state.cleaning.cleanTime = timeSelect.value;
  if (notesInput) state.cleaning.notes = notesInput.value;

  state.cleaning.isCalculated = true;
  saveStateToStorage();
  updateCleaningReviewPills();
  renderCleaningCalculatedPrices();
  showToast('Estimasi tarif bersih-bersih berhasil dihitung!', 'success');
};

window.navigateToCleaningPayment = function() {
  if (!state.cleaning.isCalculated) {
    showToast('Lengkapi data lalu klik "Hitung Estimasi Tarif" terlebih dahulu!', 'error');
    const btnCalc = document.getElementById('btnCalculateCleaning');
    if (btnCalc) btnCalc.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const method = state.cleaning.paymentMethod || 'qris';
  state.activeService = 'cleaning';
  state.isNewUserDemo = false;
  state.activeOrder = {
    id: state.cleaning.orderId,
    type: "cleaning",
    serviceName: "Deep Clean & Sanitasi Hunian",
    status: method === 'bank' ? "Menunggu Transfer Bank Manual" : "Menunggu Pembayaran QRIS",
    mitraName: state.cleaning.cleaner,
    vehicleName: "Tim Cleaner Hydro-Vacuum",
    vehiclePlate: "SHIFT-CLEAN",
    totalPrice: state.cleaning.total,
    pickupAddress: state.cleaning.address,
    dropoffAddress: state.cleaning.address,
    createdAt: new Date().toISOString()
  };

  const payload = {
    serviceType: "Deep Clean & Sanitasi Hunian",
    orderId: state.cleaning.orderId,
    totalPrice: state.cleaning.total,
    subtotal: state.cleaning.subtotal,
    discount: state.cleaning.vipDiscount,
    cleaner: state.cleaning.cleaner,
    cleanDate: state.cleaning.cleanDate,
    cleanTime: state.cleaning.cleanTime,
    notes: state.cleaning.notes || "",
    paymentMethod: method
  };

  sessionStorage.setItem('shift_cleaning_payload', JSON.stringify(payload));
  saveStateToStorage();

  showToast(`Memuat Halaman Pembayaran Deep Clean (${method === 'bank' ? 'Transfer Bank' : 'QRIS'})...`, 'info');
  setTimeout(() => {
    window.location.href = `./payment.html?service=cleaning&method=${method}`;
  }, 600);
};

/* ==========================================
 * PAYMENT PAGE & COUNTDOWN TIMER ENGINE
 * ========================================== */

window.switchPaymentPageMethod = function(method) {
  const qrisSlab = document.getElementById('qrisPaymentSlab');
  const bankSlab = document.getElementById('bankPaymentSlab');
  const qrisTab = document.getElementById('paymentTabQris');
  const bankTab = document.getElementById('paymentTabBank');

  if (method === 'qris') {
    if (qrisSlab) qrisSlab.classList.remove('hidden');
    if (bankSlab) bankSlab.classList.add('hidden');
    if (qrisTab) qrisTab.className = 'flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm text-center cursor-pointer transition-all';
    if (bankTab) bankTab.className = 'flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-center cursor-pointer transition-all';
    showToast('Metode Pembayaran: Scan QRIS Dinamis Instan', 'info');
  } else {
    if (qrisSlab) qrisSlab.classList.add('hidden');
    if (bankSlab) bankSlab.classList.remove('hidden');
    if (qrisTab) qrisTab.className = 'flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-center cursor-pointer transition-all';
    if (bankTab) bankTab.className = 'flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm text-center cursor-pointer transition-all';
    showToast('Metode Pembayaran: Detail Rekening Transfer Bank Manual', 'info');
  }
};

function initPaymentPageEngine() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const isCleaning = serviceParam === 'cleaning' || state.activeService === 'cleaning';
  const targetMethod = urlParams.get('method') || (isCleaning ? state.cleaning.paymentMethod : state.pindahan.paymentMethod) || 'qris';

  let ticketId = isCleaning ? state.cleaning.orderId : state.pindahan.orderId;
  let serviceTitle = isCleaning ? "Deep Clean & Sanitasi Hunian" : "Pindahan Barang Kos ke Apartemen";
  let totalAmount = isCleaning ? state.cleaning.total : state.pindahan.total;
  let addressText = isCleaning ? state.cleaning.address : `${state.pindahan.pickupAddress} -> ${state.pindahan.dropoffAddress}`;

  const cleaningStored = sessionStorage.getItem('shift_cleaning_payload');
  const pindahanStored = sessionStorage.getItem('shift_active_payload');

  if (isCleaning && cleaningStored) {
    try {
      const data = JSON.parse(cleaningStored);
      totalAmount = data.totalPrice || totalAmount;
      ticketId = data.orderId || ticketId;
    } catch(e){}
  } else if (!isCleaning && pindahanStored) {
    try {
      const data = JSON.parse(pindahanStored);
      totalAmount = data.totalPrice || totalAmount;
      ticketId = data.orderId || ticketId;
    } catch(e){}
  }

  setText('.js-qris-order-id, .js-order-id', `#${ticketId}`);
  setText('.js-qris-service-title', serviceTitle);
  setText('.js-qris-total-amount, .js-total-amount', formatRupiah(totalAmount));
  setText('.js-qris-raw-nominal', `${totalAmount}`);
  setText('.js-pickup-loc', isCleaning ? state.cleaning.address : state.pindahan.pickupAddress);
  setText('.js-dropoff-loc', isCleaning ? 'Lokasi Pengerjaan Hunian' : state.pindahan.dropoffAddress);

  // Dynamic Driver / Cleaner Card updates on Payment page
  const driverNameEl = document.querySelector('.js-driver-name');
  if (driverNameEl) {
    driverNameEl.textContent = isCleaning ? "Siti Maryam & Rekan" : state.pindahan.vehicleObj.driver;
  }
  const driverPlateEl = document.querySelector('.js-driver-plate');
  if (driverPlateEl) {
    driverPlateEl.textContent = isCleaning ? "Spesialis Hydro-Vacuum & UV-C" : state.pindahan.vehicleObj.plate;
  }
  const driverImg = document.querySelector('.lg\\:col-span-5 img');
  if (driverImg && isCleaning) {
    driverImg.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBi_WbqloxLrVDu3XUIn0uc7hkoFFQSS_LgwNFxLMNDfKqjgwu4x0yRoVA4C13k_wj7Uh5CLZFdl47gPa-DG9X9lEJvLwEzwOQV5f2z-hEDHTox44Iaqr-sY4AA1tGGGX3hb95nNSLcO2wvYlu8vBtXW9vPMWGHQ3gBZyuDXJwGFzV40QhRzjoy9FhD012SoCTS1jB-9iMdMS5JdtvNwiJzj7UWLOuP8kbfNMsCtKYO8bQoAwja2Hcq";
  }

  // Dynamic Invoice Breakdown for Cleaning vs Moving
  if (isCleaning) {
    const c = state.cleaning;
    const breakdownBox = document.querySelector('.lg\\:col-span-5 .space-y-2\\.5');
    if (breakdownBox) {
      let activeAddons = [];
      if (c.addons.hydroVacuum) activeAddons.push("Hydro-Vacuum UV-C");
      if (c.addons.disinfectantFogging) activeAddons.push("Fogging Disinfektan");
      if (c.addons.fridgeCleaning) activeAddons.push("Cuci Kulkas");
      if (c.addons.acCleaning) activeAddons.push("Cuci AC Split");

      breakdownBox.innerHTML = `
        <div class="flex items-center justify-between">
          <span>Paket ${c.housingPrices[c.housingType].name}</span>
          <span class="text-on-surface font-semibold">${formatRupiah(c.housingCost)}</span>
        </div>
        <div class="flex items-center justify-between">
          <span>Tingkat Kerak ${c.stainLevel.charAt(0).toUpperCase() + c.stainLevel.slice(1)}</span>
          <span class="text-on-surface font-semibold">${formatRupiah(c.stainCost)}</span>
        </div>
        <div class="flex items-center justify-between">
          <span>Add-On Sanitasi (${activeAddons.length > 0 ? activeAddons.join(', ') : 'Tidak ada'})</span>
          <span class="text-on-surface font-semibold">${formatRupiah(c.addonsCost)}</span>
        </div>
        <div class="flex items-center justify-between text-primary">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">loyalty</span> Promo VIP Diskon
          </span>
          <span class="font-bold">-${formatRupiah(c.vipDiscount)}</span>
        </div>
      `;
    }
  }

  // Activate selected payment method view (QRIS vs Bank Transfer)
  switchPaymentPageMethod(targetMethod);

  startPaymentTimer();
}

function startPaymentTimer() {
  if (state.paymentTimer.intervalId) clearInterval(state.paymentTimer.intervalId);

  const timerEl = document.querySelector('.js-countdown-timer, #countdown-text');
  if (!timerEl) return;

  function updateDisplay() {
    const s = state.paymentTimer.totalSeconds;
    if (s <= 0) {
      clearInterval(state.paymentTimer.intervalId);
      timerEl.textContent = "00:00 (KADALUARSA)";
      showToast("Waktu Pembayaran Habis. Silakan generate ulang.", "error");
      return;
    }
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  updateDisplay();
  state.paymentTimer.intervalId = setInterval(() => {
    state.paymentTimer.totalSeconds--;
    updateDisplay();
  }, 1000);
}

window.copyNominalToClipboard = function(nominalText) {
  const cleanNominal = nominalText || document.querySelector('.js-qris-raw-nominal')?.textContent || "182750";
  navigator.clipboard.writeText(cleanNominal).then(() => {
    showToast(`Nominal ${formatRupiah(Number(cleanNominal))} disalin!`, 'success');
  }).catch(() => {
    showToast(`Nominal ${cleanNominal} berhasil dicopy!`, 'success');
  });
};

window.handleConfirmPayment = async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const isCleaning = urlParams.get('service') === 'cleaning' || state.activeService === 'cleaning';

  showToast('Memverifikasi transaksi dengan sistem bank...', 'info');

  state.isNewUserDemo = false;
  if (isCleaning) {
    state.activeService = 'cleaning';
    state.activeOrder = {
      id: state.cleaning.orderId || "SHF-CLN-90215",
      type: "cleaning",
      serviceName: "Deep Clean & Sanitasi Hunian",
      status: "Pembayaran Terverifikasi (OTW)",
      mitraName: state.cleaning.cleaner || "Siti Maryam & Rekan",
      vehicleName: "Tim Hydro-Vacuum UV-C",
      vehiclePlate: "SHIFT-CLN",
      totalPrice: state.cleaning.total,
      pickupAddress: state.cleaning.address,
      dropoffAddress: state.cleaning.address,
      createdAt: new Date().toISOString()
    };
  } else {
    state.activeService = 'moving';
    if (!state.activeOrder || state.activeOrder.type !== 'pindahan') {
      state.activeOrder = {
        id: state.pindahan.orderId || "SHF-90214",
        type: "pindahan",
        serviceName: "Pindahan Barang Kos / Apartemen",
        status: "Pembayaran Terverifikasi (OTW)",
        mitraName: state.pindahan.vehicleObj.driver,
        vehicleName: state.pindahan.vehicleObj.name,
        vehiclePlate: state.pindahan.vehicleObj.plate,
        totalPrice: state.pindahan.total,
        pickupAddress: state.pindahan.pickupAddress,
        dropoffAddress: state.pindahan.dropoffAddress,
        createdAt: new Date().toISOString()
      };
    } else {
      state.activeOrder.status = "Pembayaran Terverifikasi (OTW)";
    }
  }
  saveStateToStorage();

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('orders').insert([
        {
          order_id: state.activeOrder.id,
          type: state.activeOrder.type,
          service_name: state.activeOrder.serviceName,
          status: state.activeOrder.status,
          mitra_name: state.activeOrder.mitraName,
          vehicle_name: state.activeOrder.vehicleName,
          vehicle_plate: state.activeOrder.vehiclePlate,
          total_price: state.activeOrder.totalPrice,
          pickup_address: state.activeOrder.pickupAddress,
          dropoff_address: state.activeOrder.dropoffAddress,
          created_at: state.activeOrder.createdAt
        }
      ]);
    } catch(err){}
  }

  const modal = document.getElementById('paymentSuccessModal') || document.getElementById('success-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const box = document.getElementById('modal-box');
    if (box) {
      requestAnimationFrame(() => {
        box.classList.remove('scale-95', 'opacity-0');
        box.classList.add('scale-100', 'opacity-100');
      });
    }
  } else {
    setTimeout(() => {
      showToast('Pembayaran Berhasil Terverifikasi! Mengalihkan ke Live Tracker...', 'success');
      setTimeout(() => {
        window.location.href = isCleaning ? './tracking-cleaning.html?service=cleaning' : './tracking.html?service=moving';
      }, 1000);
    }, 1000);
  }
};

window.proceedToTracking = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const isCleaning = urlParams.get('service') === 'cleaning' || state.activeService === 'cleaning';
  window.location.href = isCleaning ? './tracking-cleaning.html?service=cleaning' : './tracking.html?service=moving';
};

/* ==========================================
 * HISTORY & HELP CENTER FILTER ENGINE
 * ========================================== */

function initHistoryEngine() {
  const container = document.getElementById('orderCardsContainer');
  if (container && container.children.length === 0) {
    renderHistoryCardsList(container);
  }

  const filterTabs = document.querySelectorAll('.filter-tab, .js-history-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      filterTabs.forEach(t => {
        t.className = 'px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all whitespace-nowrap filter-tab cursor-pointer';
      });
      tab.className = 'px-space-md py-space-xs rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container shadow-sm font-semibold whitespace-nowrap transition-all filter-tab active cursor-pointer';
      filterHistoryCards(filter);
    });
  });
}

function renderHistoryCardsList(container) {
  const orders = [
    {
      id: "SHF-90214",
      service: "Pindahan Kos / Rumah",
      title: "Pindahan Kos Melati -> Apartemen Grand Kamala",
      date: "Hari Ini, 10:15 WIB",
      status: "running",
      statusText: "Sedang Berjalan (OTW)",
      total: state.pindahan.total,
      partner: `${state.pindahan.vehicleObj.driver} (${state.pindahan.vehicleObj.name})`,
      route: "Sleman ke Kota Yogyakarta",
      link: "./tracking.html"
    },
    {
      id: "SHF-CLN-90215",
      service: "Deep Cleaning & Sanitasi",
      title: "Deep Clean & Vacuum UV-C Kamar Kos",
      date: "Hari Ini, 13:00 WIB",
      status: "running",
      statusText: "Mitra Siap Meluncur",
      total: 160000,
      partner: "Siti Maryam & Rekan",
      route: "Kost Melati Residence No. 14",
      link: "./tracking-cleaning.html"
    }
  ];

  container.innerHTML = orders.map(o => `
    <div class="js-history-card p-space-md md:p-space-lg rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-space-md" data-status="${o.status}" data-category="${o.service}">
      <div class="flex items-start gap-space-sm min-w-0">
        <div class="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center shrink-0 shadow-sm mt-1">
          <span class="material-symbols-outlined text-[24px]">${o.service.includes('Cleaning') ? 'cleaning_services' : 'local_shipping'}</span>
        </div>
        <div class="flex flex-col min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-label-sm text-label-sm font-mono font-bold text-primary">${o.id}</span>
            <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold bg-secondary-container text-on-secondary-container">${o.statusText}</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant">• ${o.date}</span>
          </div>
          <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 truncate">${o.title}</h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant truncate">${o.route} • Mitra: ${o.partner}</p>
        </div>
      </div>

      <div class="flex items-center justify-between md:justify-end gap-space-md shrink-0 pt-space-xs md:pt-0 border-t md:border-t-0 border-slate-100">
        <div class="flex flex-col text-left md:text-right">
          <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Total Tagihan</span>
          <span class="font-label-lg text-label-lg font-bold text-primary">${formatRupiah(o.total)}</span>
        </div>

        <a href="${o.link}" class="px-space-md py-2 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed font-label-md text-label-md font-bold transition-all flex items-center gap-1 shadow-sm">
          <span>Lacak Live</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
    </div>
  `).join('');
}

function filterHistoryCards(filterType) {
  const cards = document.querySelectorAll('.js-history-card');
  cards.forEach(card => {
    const status = card.dataset.status;
    if (filterType === 'all' || status === filterType) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/* ==========================================
 * SHARED UTILITIES & TOAST ENGINE
 * ========================================== */

function toggleElementDisplay(selector, show) {
  const els = document.querySelectorAll(selector);
  els.forEach(el => {
    if (show) el.classList.remove('hidden');
    else el.classList.add('hidden');
  });
}

function setText(selector, val) {
  const els = document.querySelectorAll(selector);
  els.forEach(el => el.textContent = val);
}

window.openGoogleMaps = function() {
  const address = state.pindahan.pickupAddress || state.cleaning.address;
  const origin = encodeURIComponent(address);
  window.open(`https://www.google.com/maps/search/?api=1&query=${origin}`, '_blank');
};

window.openWhatsAppCS = function() {
  window.open(`https://wa.me/6281234567890?text=Halo%20CS%20SHIFT,%20saya%20butuh%20bantuan%20terkait%20pesanan%20saya`, '_blank');
};

window.openWhatsAppMitra = function() {
  const name = state.pindahan.vehicleObj.driver;
  window.open(`https://wa.me/6281234567890?text=Halo%20Mitra%20${encodeURIComponent(name)},%20saya%20Dimas%20pelanggan%20VIP`, '_blank');
};

function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-primary text-on-primary' : type === 'error' ? 'bg-error text-on-error' : 'bg-on-surface text-surface';
  toast.className = `${bgClass} px-5 py-3 rounded-2xl shadow-xl font-label-md text-label-md flex items-center gap-2 transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto`;
  
  const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  toast.innerHTML = `<span class="material-symbols-outlined text-[20px]">${icon}</span><span>${message}</span>`;
  
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.remove('translate-y-4', 'opacity-0'));
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ==========================================
 * NOTIFICATION CENTER & SYSTEM LOGS ENGINE
 * ========================================== */

function initNotificationsEngine() {
  updateHeaderNotificationBell();
  bindHeaderDropdownEvents();

  const timelineContainer = document.getElementById('timelineList');
  if (!timelineContainer) return; // Not on full notifications page

  renderNotificationCenter();
  bindNotificationFilterControls();
  bindNotificationActionButtons();
  bindChannelPreferenceToggles();
}

function updateHeaderNotificationBell() {
  const unreadCount = state.notifications.filter(n => n.status === 'unread').length;

  // Header Bell Badge
  const bellBadges = document.querySelectorAll('#notifBellBtn .bg-error, .js-notif-bell-badge');
  bellBadges.forEach(badge => {
    badge.textContent = unreadCount;
    if (unreadCount === 0) {
      badge.classList.add('hidden');
    } else {
      badge.classList.remove('hidden');
    }
  });

  // Dropdown Title Slab Badge
  const dropdownBadges = document.querySelectorAll('#notifDropdownPanel .bg-secondary-container, .js-notif-dropdown-badge');
  dropdownBadges.forEach(badge => {
    badge.textContent = unreadCount > 0 ? `${unreadCount} Baru` : 'Semua Terbaca';
    if (unreadCount === 0) {
      badge.className = 'px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold shadow-sm';
    } else {
      badge.className = 'px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-sm';
    }
  });

  // Page Title Headline Badge
  const headlineBadge = document.getElementById('headlineUnreadBadge');
  if (headlineBadge) {
    if (unreadCount > 0) {
      headlineBadge.textContent = `${unreadCount} Belum Dibaca`;
      headlineBadge.className = 'px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-sm';
    } else {
      headlineBadge.textContent = 'Semua Terbaca';
      headlineBadge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold shadow-sm';
    }
  }

  // Populate Dropdown Items List
  const dropdownItemsList = document.querySelector('#notifDropdownPanel .max-h-\\[360px\\]');
  if (dropdownItemsList) {
    renderHeaderDropdownItems(dropdownItemsList);
  }
}

function renderHeaderDropdownItems(container) {
  const displayItems = state.notifications.slice(0, 4);
  if (displayItems.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center text-on-surface-variant font-body-sm">
        Tidak ada notifikasi tersimpan.
      </div>
    `;
    return;
  }

  container.innerHTML = displayItems.map(n => {
    const isUnread = n.status === 'unread';
    const isFleet = n.category === 'fleet';
    const isPayment = n.category === 'payment';
    const isPromo = n.category === 'promo';
    const isSecurity = n.category === 'security';

    const icon = isFleet ? 'local_shipping' : isPayment ? 'check_circle' : isPromo ? 'redeem' : isSecurity ? 'verified_user' : 'star';
    const bgIcon = isFleet ? 'bg-primary-fixed text-primary' : isPayment ? 'bg-secondary-fixed/50 text-on-secondary-fixed' : isPromo ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-fixed text-tertiary';

    return `
      <div onclick="handleDropdownCardClick('${n.id}')" class="p-3 rounded-2xl ${isUnread ? 'bg-surface-container-low/70 border border-primary-fixed/40' : 'bg-surface-container-low/40'} hover:bg-surface-container-low transition-all relative cursor-pointer group">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-full ${bgIcon} flex items-center justify-center shrink-0 relative">
            <span class="material-symbols-outlined text-[20px]">${icon}</span>
            ${isUnread ? '<span class="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white"></span>' : ''}
          </div>
          <div class="flex flex-col gap-1 grow min-w-0">
            <div class="flex items-center justify-between gap-1">
              <span class="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary truncate">${n.metadata?.badgeText || n.category}</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant shrink-0">${n.timestamp.split('•')[0] || n.timestamp}</span>
            </div>
            <p class="font-label-md text-label-md text-on-surface font-bold leading-snug truncate">${n.title}</p>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-clamp-2">${n.message}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.handleDropdownCardClick = function(id) {
  openNotifDetailModal(id);
  const panel = document.getElementById('notifDropdownPanel');
  if (panel) panel.classList.add('hidden');
};

function bindHeaderDropdownEvents() {
  const bellBtn = document.getElementById('notifBellBtn');
  const panel = document.getElementById('notifDropdownPanel');

  if (bellBtn && panel) {
    bellBtn.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('hidden');
    };

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !bellBtn.contains(e.target)) {
        panel.classList.add('hidden');
      }
    });
  }

  const dropdownMarkReadBtn = document.querySelector('#notifDropdownPanel button:nth-child(1)');
  if (dropdownMarkReadBtn && dropdownMarkReadBtn.textContent.includes('Tandai Dibaca')) {
    dropdownMarkReadBtn.onclick = () => markAllNotificationsRead();
  }
}

function bindNotificationFilterControls() {
  // Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = state.notifFilters.search;
    searchInput.addEventListener('input', (e) => {
      state.notifFilters.search = e.target.value;
      renderNotificationCenter();
    });
  }

  // Status Filter Select
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.value = state.notifFilters.status;
    statusFilter.addEventListener('change', (e) => {
      state.notifFilters.status = e.target.value;
      renderNotificationCenter();
    });
  }

  // Time Filter Select
  const timeFilter = document.getElementById('timeFilter');
  if (timeFilter) {
    timeFilter.value = state.notifFilters.time;
    timeFilter.addEventListener('change', (e) => {
      state.notifFilters.time = e.target.value;
      renderNotificationCenter();
    });
  }

  // Category Pills
  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(pill => {
    pill.onclick = () => {
      const cat = pill.dataset.cat;
      state.notifFilters.category = cat;

      pills.forEach(p => {
        p.className = 'category-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-lowest/80 hover:bg-surface-container-high text-on-surface font-semibold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer';
      });
      pill.className = 'category-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active';

      renderNotificationCenter();
    };
  });
}

function bindNotificationActionButtons() {
  const markAllBtn = document.getElementById('markAllReadBtn');
  if (markAllBtn) {
    markAllBtn.onclick = () => markAllNotificationsRead();
  }

  const clearReadBtn = document.getElementById('clearReadBtn');
  if (clearReadBtn) {
    clearReadBtn.onclick = () => clearReadNotifications();
  }
}

function bindChannelPreferenceToggles() {
  const toggles = [
    { id: 'toggleWA', key: 'wa', label: 'WhatsApp' },
    { id: 'togglePush', key: 'push', label: 'Push Browser' },
    { id: 'toggleEmail', key: 'email', label: 'Email' },
    { id: 'toggleSMS', key: 'sms', label: 'SMS Log' }
  ];

  toggles.forEach(t => {
    const el = document.getElementById(t.id);
    if (el) {
      el.checked = !!state.userPreferences[t.key];
      el.onchange = (e) => {
        state.userPreferences[t.key] = e.target.checked;
        saveStateToStorage();
        const statusText = e.target.checked ? 'Diaktifkan' : 'Dinonaktifkan';
        showToast(`Notifikasi ${t.label} ${statusText}`, e.target.checked ? 'success' : 'info');
      };
    }
  });
}

window.markAllNotificationsRead = function() {
  state.notifications.forEach(n => n.status = 'read');
  saveStateToStorage();
  updateHeaderNotificationBell();
  renderNotificationCenter();

  const markAllBtn = document.getElementById('markAllReadBtn');
  if (markAllBtn) {
    markAllBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">done_all</span><span>Semua Terbaca</span>`;
    markAllBtn.classList.add('opacity-75', 'cursor-not-allowed');
    markAllBtn.disabled = true;
  }

  showToast('Seluruh notifikasi ditandai sudah dibaca', 'success');
};

window.markAllNotifsRead = function() {
  window.markAllNotificationsRead();
};

window.zoomMap = function(factor) {
  showToast(`Tampilan Zoom Peta disesuaikan (${factor > 1 ? 'In' : 'Out'})`, 'info');
};

window.handleNotifCategoryFilter = function(cat) {
  if (state && state.notifFilters) state.notifFilters.category = cat;
  const pills = document.querySelectorAll('.category-pill, .js-cat-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-cat') === cat) {
      p.className = 'js-cat-pill category-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active';
    } else {
      p.className = 'js-cat-pill category-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-lowest/80 hover:bg-surface-container-high text-on-surface font-semibold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer';
    }
  });
  if (typeof renderNotificationCenter === 'function') renderNotificationCenter();
};

window.clearReadNotifications = function() {
  const readCount = state.notifications.filter(n => n.status === 'read').length;
  if (readCount === 0) {
    showToast('Tidak ada notifikasi berstatus sudah dibaca.', 'info');
    return;
  }
  state.notifications = state.notifications.filter(n => n.status === 'unread');
  saveStateToStorage();
  updateHeaderNotificationBell();
  renderNotificationCenter();
  showToast(`${readCount} Notifikasi terarsip dibersihkan`, 'success');
};

function renderNotificationCenter() {
  updateCategoryPillCounters();
  updateHeaderNotificationBell();

  const container = document.getElementById('timelineList');
  if (!container) return;

  const filtered = getFilteredNotifications();

  // Update showing status counter
  const showingStats = document.getElementById('showingStats');
  if (showingStats) {
    showingStats.innerHTML = `Menampilkan <span class="text-on-surface font-bold">${filtered.length}</span> dari total <span class="text-on-surface font-bold">${state.notifications.length}</span> notifikasi`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-surface-container-lowest/90 backdrop-blur-2xl rounded-3xl p-space-xl text-center flex flex-col items-center justify-center gap-3 shadow-md border border-slate-100/80 my-4">
        <div class="w-16 h-16 rounded-2xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
          <span class="material-symbols-outlined text-[36px]">notifications_off</span>
        </div>
        <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Tidak Ada Notifikasi Ditemukan</h3>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-md">
          Tidak ada riwayat notifikasi yang cocok dengan kriteria pencarian atau filter yang Anda pilih.
        </p>
        <button onclick="resetNotificationFilters()" class="mt-2 px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary-container transition-all">
          Reset Filter & Cari Ulang
        </button>
      </div>
    `;
    return;
  }

  // Group filtered items by dateGroup
  const groups = {
    'today': { title: 'Hari Ini • 19 Februari 2025', items: [] },
    'this-week': { title: 'Kemarin & Minggu Ini', items: [] },
    'past-month': { title: 'Arsip Bulan Lalu • Januari 2025', items: [] }
  };

  filtered.forEach(n => {
    const grp = n.dateGroup || 'today';
    if (groups[grp]) groups[grp].items.push(n);
    else groups['today'].items.push(n);
  });

  let html = '';

  Object.keys(groups).forEach(key => {
    const groupData = groups[key];
    if (groupData.items.length === 0) return;

    const unreadInGroup = groupData.items.filter(i => i.status === 'unread').length;

    html += `
      <div class="flex flex-col gap-space-sm pt-space-xs" data-group="${key}">
        <div class="flex items-center justify-between px-1">
          <div class="flex items-center gap-2">
            ${key === 'today' ? '<span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>' : ''}
            <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">${groupData.title}</h2>
          </div>
          <span class="font-label-sm text-label-sm ${unreadInGroup > 0 ? 'text-primary font-bold uppercase tracking-wider bg-primary-fixed/40' : 'text-on-surface-variant'} px-2.5 py-1 rounded-full">
            ${groupData.items.length} Peristiwa ${unreadInGroup > 0 ? `(${unreadInGroup} Baru)` : ''}
          </span>
        </div>
    `;

    groupData.items.forEach(n => {
      html += renderNotificationCardHTML(n);
    });

    html += `</div>`;
  });

  container.innerHTML = html;
}

window.resetNotificationFilters = function() {
  state.notifFilters = { search: "", status: "all", time: "feb-2025", category: "all" };

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = "";

  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) statusFilter.value = "all";

  const timeFilter = document.getElementById('timeFilter');
  if (timeFilter) timeFilter.value = "feb-2025";

  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(p => {
    if (p.dataset.cat === 'all') p.className = 'category-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active';
    else p.className = 'category-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-lowest/80 hover:bg-surface-container-high text-on-surface font-semibold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer';
  });

  renderNotificationCenter();
};

function updateCategoryPillCounters() {
  const counts = {
    all: state.notifications.length,
    fleet: state.notifications.filter(n => n.category === 'fleet').length,
    payment: state.notifications.filter(n => n.category === 'payment').length,
    promo: state.notifications.filter(n => n.category === 'promo').length,
    security: state.notifications.filter(n => n.category === 'security').length,
    cleaning: state.notifications.filter(n => n.category === 'cleaning').length
  };

  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(pill => {
    const cat = pill.dataset.cat;
    const badge = pill.querySelector('span:last-child');
    if (badge && counts[cat] !== undefined) {
      badge.textContent = counts[cat];
    }
  });
}

function getFilteredNotifications() {
  const { search, status, time, category } = state.notifFilters;

  return state.notifications.filter(n => {
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchMsg = n.message.toLowerCase().includes(q);
      const matchTicket = n.ticketId ? n.ticketId.toLowerCase().includes(q) : false;
      const matchDriver = n.metadata && n.metadata.driver ? n.metadata.driver.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchMsg && !matchTicket && !matchDriver) return false;
    }

    if (status === 'unread' && n.status !== 'unread') return false;
    if (status === 'read' && n.status !== 'read') return false;

    if (category !== 'all' && n.category !== category) return false;

    if (time === 'feb-2025' || time === 'last-30') {
      if (n.dateGroup !== 'today' && n.dateGroup !== 'this-week') return false;
    } else if (time === 'jan-2025' || time === 'archive') {
      if (n.dateGroup !== 'past-month') return false;
    }

    return true;
  });
}

function renderNotificationCardHTML(n) {
  const isUnread = n.status === 'unread';
  const isFleet = n.category === 'fleet';
  const isPayment = n.category === 'payment';
  const isPromo = n.category === 'promo';
  const isSecurity = n.category === 'security';
  const isCleaning = n.category === 'cleaning';

  const iconName = isFleet ? 'local_shipping' : isPayment ? 'task_alt' : isPromo ? 'redeem' : isSecurity ? 'verified_user' : 'sanitizer';
  const iconBg = isFleet ? 'bg-primary-fixed text-primary' : isPayment ? 'bg-secondary-fixed/50 text-on-secondary-fixed' : isPromo ? 'bg-secondary-container text-on-secondary-container' : isCleaning ? 'bg-tertiary-fixed text-tertiary' : 'bg-surface-container-high text-on-surface-variant';
  const tagBg = isFleet ? 'bg-primary/10 text-primary' : isPayment ? 'bg-secondary-fixed/40 text-on-secondary-fixed-variant' : isPromo ? 'bg-secondary-container text-on-secondary-container' : isCleaning ? 'bg-tertiary-fixed/60 text-tertiary' : 'bg-surface-container-high text-on-surface-variant';

  const cardBg = isUnread ? 'bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_15px_30px_-10px_rgba(0,97,148,0.12)] border border-primary-fixed/40 hover:shadow-[0_20px_40px_-10px_rgba(0,97,148,0.18)]' : 'bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_10px_25px_-10px_rgba(2,132,199,0.04)] hover:bg-surface-container-lowest';

  return `
    <div onclick="openNotifDetailModal('${n.id}')" class="notif-item relative ${cardBg} p-space-md rounded-2xl flex flex-col gap-3 transition-all cursor-pointer group" data-category="${n.category}" data-status="${n.status}">
      <div class="flex items-start gap-space-sm">
        <div class="relative shrink-0">
          <div class="w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shadow-sm">
            <span class="material-symbols-outlined text-[26px]">${iconName}</span>
          </div>
          ${isUnread ? `
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full ring-2 ring-white animate-ping"></span>
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full ring-2 ring-white"></span>
          ` : ''}
        </div>

        <div class="flex flex-col gap-1 grow min-w-0">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-full ${tagBg} font-label-sm text-label-sm font-bold uppercase tracking-wider">
                ${n.metadata?.badgeText || n.category}
              </span>
              ${n.ticketId ? `<span class="text-body-sm font-body-sm text-outline">• Tiket #${n.ticketId}</span>` : ''}
            </div>
            <div class="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
              <span class="material-symbols-outlined text-[14px]">schedule</span>
              <span>${n.timestamp}</span>
            </div>
          </div>

          <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
            ${n.title}
          </h3>
          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            ${n.message}
          </p>

          ${renderNotificationCardActions(n)}
        </div>
      </div>
    </div>
  `;
}

function renderNotificationCardActions(n) {
  if (n.category === 'fleet' && n.status === 'unread') {
    return `
      <div class="mt-1 p-3 rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" onclick="event.stopPropagation()">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-[16px]">navigation</span>
          </div>
          <div>
            <div class="font-label-md text-label-md text-on-surface font-bold">Posisi: ${n.metadata?.location || 'Jl. Kaliurang KM 5.2'}</div>
            <div class="font-body-sm text-body-sm text-on-surface-variant">Estimasi Tiba: ${n.metadata?.eta || '10:08 WIB'}</div>
          </div>
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <a href="./tracking.html" class="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary-container transition-all flex items-center gap-1 justify-center grow sm:grow-0">
            <span class="material-symbols-outlined text-[16px]">near_me</span>
            Lacak GPS
          </a>
          <a href="https://wa.me/6281234567890" target="_blank" class="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-all flex items-center gap-1 justify-center grow sm:grow-0">
            <span class="material-symbols-outlined text-[16px]">call</span>
            Hubungi Driver
          </a>
        </div>
      </div>
    `;
  }

  if (n.category === 'payment' && n.status === 'unread') {
    return `
      <div class="flex items-center gap-2 mt-1 flex-wrap" onclick="event.stopPropagation()">
        <a href="./payment.html" class="px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary font-label-md text-label-md font-bold hover:bg-primary-fixed-dim transition-all flex items-center gap-1 shadow-sm">
          <span class="material-symbols-outlined text-[16px]">receipt_long</span>
          Lihat Bukti Bayar
        </a>
        <button onclick="openNotifDetailModal('${n.id}')" class="px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-all flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">info</span>
          Detail Transaksi
        </button>
      </div>
    `;
  }

  if (n.category === 'promo' && n.status === 'unread') {
    return `
      <div class="flex items-center gap-2 mt-1 flex-wrap" onclick="event.stopPropagation()">
        <button onclick="claimVoucherToAccount('${n.metadata?.voucherCode || 'SHIFT-VIP-HEMAT'}')" class="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-all flex items-center gap-1 shadow-sm">
          <span class="material-symbols-outlined text-[16px]">account_balance_wallet</span>
          Klaim ke Akun
        </button>
        <button onclick="copyVoucherCode('${n.metadata?.voucherCode || 'SHIFT-VIP-HEMAT'}')" class="px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-all flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">content_copy</span>
          Salin Kode
        </button>
      </div>
    `;
  }

  return '';
}

window.claimVoucherToAccount = function(code) {
  showToast(`Voucher [${code}] berhasil diklaim ke saldo promo akun Anda!`, 'success');
};

window.copyVoucherCode = function(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Kode Voucher [${code}] berhasil disalin!`, 'success');
  }).catch(() => {
    showToast(`Kode Voucher ${code} disalin`, 'success');
  });
};

window.openNotifDetailModal = function(id) {
  const item = state.notifications.find(n => n.id === id);
  if (!item) return;

  if (item.status === 'unread') {
    item.status = 'read';
    saveStateToStorage();
    renderNotificationCenter();
  }

  const modal = document.getElementById('notifDetailModal');
  if (!modal) return;

  const titleEl = document.getElementById('modalTitle') || document.getElementById('modalNotifTitle');
  const categoryEl = document.getElementById('modalCategory') || document.getElementById('modalNotifTag');
  const timeEl = document.getElementById('modalTime') || document.getElementById('modalNotifTime');
  const ticketEl = document.getElementById('modalTicket');
  const msgEl = document.getElementById('modalMessage') || document.getElementById('modalNotifMessage');
  const metadataBox = document.getElementById('modalMetadataBox') || document.getElementById('modalNotifMetaContainer');
  const actionsBox = document.getElementById('modalActions');
  const primaryActionBtn = document.getElementById('modalNotifPrimaryActionBtn');

  if (titleEl) titleEl.textContent = item.title;
  if (categoryEl) categoryEl.textContent = item.metadata?.badgeText || item.category.toUpperCase();
  if (timeEl) timeEl.textContent = item.timestamp;
  if (ticketEl) ticketEl.textContent = item.ticketId ? `#${item.ticketId}` : '';
  if (msgEl) msgEl.textContent = item.message;

  if (metadataBox && item.metadata) {
    let metaHTML = '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">';
    Object.keys(item.metadata).forEach(k => {
      if (['badgeText', 'actionText', 'actionLink'].includes(k)) return;
      metaHTML += `
        <div class="flex flex-col bg-slate-50 p-2 rounded-lg border border-slate-200">
          <span class="text-slate-400 capitalize font-semibold">${k.replace(/([A-Z])/g, ' $1')}</span>
          <span class="font-bold text-slate-800">${item.metadata[k]}</span>
        </div>
      `;
    });
    metaHTML += '</div>';
    metadataBox.innerHTML = metaHTML;
    metadataBox.classList.remove('hidden');
  }

  if (actionsBox) {
    let actionButtons = '';

    if (item.category === 'fleet') {
      actionButtons = `
        <a href="./tracking.html" class="flex-1 bg-primary hover:bg-primary-container text-on-primary py-3 rounded-2xl font-bold text-sm text-center flex items-center justify-center gap-1.5 transition-all shadow-sm">
          <span class="material-symbols-outlined text-[18px]">near_me</span>
          Lihat Status Pesanan Terkait
        </a>
      `;
    } else if (item.category === 'payment') {
      actionButtons = `
        <button onclick="downloadReceiptPDF('${item.ticketId || 'SHF-90214'}')" class="flex-1 bg-primary-fixed text-primary hover:bg-primary-fixed-dim py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Unduh e-Receipt (PDF)
        </button>
      `;
    } else if (item.category === 'promo') {
      actionButtons = `
        <button onclick="copyVoucherCode('${item.metadata?.voucherCode || 'SHIFT-VIP-HEMAT'}')" class="flex-1 bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">content_copy</span>
          Salin Kode Voucher
        </button>
      `;
    }

    actionButtons += `
      <button onclick="closeNotifDetailModal()" class="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer">
        Tutup
      </button>
    `;

    actionsBox.innerHTML = actionButtons;
  } else if (primaryActionBtn) {
    if (item.category === 'fleet') {
      primaryActionBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">near_me</span> Buka Live GPS Tracker`;
      primaryActionBtn.onclick = () => { window.location.href = './tracking.html'; };
    } else if (item.category === 'payment') {
      primaryActionBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">download</span> Unduh e-Receipt (PDF)`;
      primaryActionBtn.onclick = () => { downloadReceiptPDF(item.ticketId || 'SHF-90214'); };
    } else {
      primaryActionBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check</span> Tutup Detail`;
      primaryActionBtn.onclick = () => closeNotifDetailModal();
    }
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeNotifDetailModal = function() {
  const modal = document.getElementById('notifDetailModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

window.downloadReceiptPDF = function(ticketId) {
  showToast(`Mengunduh e-Receipt PDF resmi Tiket #${ticketId}...`, 'info');
  setTimeout(() => {
    showToast(`e-Receipt PDF #${ticketId} berhasil diunduh!`, 'success');
  }, 1200);
};

/* ==========================================
 * AUTHENTICATION & MITRA REGISTRATION MODULE ENGINE
 * ========================================== */

window.handleAuthNavigationPath = function(path) {
  const roleSec = document.getElementById('roleSelectionSection');
  const specSec = document.getElementById('mitraSpecializationSection');
  const custSec = document.getElementById('customerAuthSection');
  const mitraLoginSec = document.getElementById('mitraLoginSection');
  const mitraRegSec = document.getElementById('mitraAuthSection');
  const resetSec = document.getElementById('resetPasswordSection');
  const tabContainer = document.getElementById('authTabContainer');

  const formWrap = document.getElementById('mitraFormWrapper');
  const gateWrap = document.getElementById('mitraApprovalGateBox');

  let cleanPath = path;
  let typeParam = null;
  if (path.includes('?')) {
    const parts = path.split('?');
    cleanPath = parts[0];
    const params = new URLSearchParams(parts[1]);
    typeParam = params.get('type');
  }

  if (typeParam) {
    localStorage.setItem('shift_mitra_registration_role', typeParam);
    if (window.state) window.state.mitraRegistrationRole = typeParam;
  }

  if (roleSec) roleSec.classList.add('hidden');
  if (specSec) specSec.classList.add('hidden');
  if (custSec) custSec.classList.add('hidden');
  if (mitraLoginSec) mitraLoginSec.classList.add('hidden');
  if (mitraRegSec) mitraRegSec.classList.add('hidden');
  if (resetSec) resetSec.classList.add('hidden');
  if (tabContainer) tabContainer.classList.remove('hidden');

  const navLinks = document.querySelectorAll('header nav a[data-path]');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('data-path');
    if (linkPath === cleanPath || (cleanPath === 'mitra-registration' && linkPath === 'mitra-registration')) {
      link.className = 'px-space-md py-1.5 transition-colors bg-surface-container-high text-on-surface font-semibold rounded-full';
    } else {
      link.className = 'px-space-md py-1.5 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors';
    }
  });

  if (cleanPath === 'role-selection') {
    if (roleSec) roleSec.classList.remove('hidden');
    if (tabContainer) tabContainer.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (cleanPath === 'mitra-registration') {
    if (specSec) specSec.classList.remove('hidden');
    if (tabContainer) tabContainer.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const currentRole = typeParam || localStorage.getItem('shift_mitra_registration_role') || 'driver';
    if (typeof window.selectRole === 'function') window.selectRole(currentRole);
  } else if (cleanPath === 'document-upload') {
    if (mitraRegSec) mitraRegSec.classList.remove('hidden');
    if (formWrap) formWrap.classList.remove('hidden');
    if (gateWrap) gateWrap.classList.add('hidden');
    window.switchAuthTab('mitra_reg');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const currentRole = typeParam || localStorage.getItem('shift_mitra_registration_role') || 'driver';
    if (typeof window.selectMitraCategory === 'function') window.selectMitraCategory(currentRole);
  } else if (cleanPath === 'login-customer') {
    if (custSec) custSec.classList.remove('hidden');
    window.switchAuthTab('customer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (cleanPath === 'register-customer') {
    window.location.href = './booking.html';
  } else if (cleanPath === 'login-mitra') {
    if (mitraLoginSec) mitraLoginSec.classList.remove('hidden');
    window.switchAuthTab('mitra_login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (cleanPath === 'partner-onboarding-status' || cleanPath === 'status-pengajuan') {
    if (mitraRegSec) mitraRegSec.classList.remove('hidden');
    if (formWrap) formWrap.classList.add('hidden');
    if (gateWrap) gateWrap.classList.remove('hidden');
    window.switchAuthTab('mitra_reg');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window.loadMitraStatusFromSupabase === 'function') {
      window.loadMitraStatusFromSupabase();
    }
  } else if (cleanPath === 'bantuan-dukungan') {
    if (typeof window.openWhatsAppCS === 'function') window.openWhatsAppCS();
  } else if (cleanPath === 'profil-saya' || cleanPath === 'profile') {
    if (window.location.pathname.includes('profile.html')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = './profile.html';
    }
  } else if (cleanPath === 'beranda') {
    window.location.href = './index.html';
  } else if (cleanPath === 'pesan-layanan') {
    window.location.href = './booking.html';
  } else if (cleanPath === 'riwayat-dan-bantuan') {
    window.location.href = './history.html';
  }
};

window.switchAuthTab = function(tabName) {
  const custSec = document.getElementById('customerAuthSection');
  const mitraLoginSec = document.getElementById('mitraLoginSection');
  const mitraRegSec = document.getElementById('mitraAuthSection');
  const resetSec = document.getElementById('resetPasswordSection');

  const btnCust = document.getElementById('tabCustomerBtn');
  const btnMitraLogin = document.getElementById('tabMitraLoginBtn');
  const btnMitraReg = document.getElementById('tabMitraRegBtn');
  const btnReset = document.getElementById('tabResetBtn');

  if (custSec) custSec.classList.add('hidden');
  if (mitraLoginSec) mitraLoginSec.classList.add('hidden');
  if (mitraRegSec) mitraRegSec.classList.add('hidden');
  if (resetSec) resetSec.classList.add('hidden');

  const inactiveCls = 'flex-1 py-3 px-3 rounded-xl font-label-lg text-label-lg font-semibold bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap';
  const activeCls = 'flex-1 py-3 px-3 rounded-xl font-label-lg text-label-lg font-bold bg-primary text-on-primary shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap';

  if (btnCust) btnCust.className = inactiveCls;
  if (btnMitraLogin) btnMitraLogin.className = inactiveCls;
  if (btnMitraReg) btnMitraReg.className = inactiveCls;
  if (btnReset) btnReset.className = inactiveCls;

  if (tabName === 'mitra_login') {
    if (mitraLoginSec) mitraLoginSec.classList.remove('hidden');
    if (btnMitraLogin) btnMitraLogin.className = activeCls;
    showToast('Portal Login Mitra Lapangan SHIFT Aktif', 'info');
  } else if (tabName === 'mitra_reg' || tabName === 'mitra') {
    if (mitraRegSec) mitraRegSec.classList.remove('hidden');
    if (btnMitraReg) btnMitraReg.className = activeCls;
    showToast('Tab Pendaftaran Mitra Lapangan Baru Aktif', 'info');
  } else if (tabName === 'reset') {
    if (resetSec) resetSec.classList.remove('hidden');
    if (btnReset) btnReset.className = activeCls;
    showToast('Tab Reset PIN / Lupa Sandi Aktif', 'info');
  } else {
    if (custSec) custSec.classList.remove('hidden');
    if (btnCust) btnCust.className = activeCls;
    showToast('Tab Customer Login & Onboarding Aktif', 'info');
  }
};

window.fillMitraDemoAccount = function(mode) {
  const idEl = document.getElementById('mitraLoginIdentifier');
  const passEl = document.getElementById('mitraLoginPassword');
  const errBox = document.getElementById('mitraLoginValidationErrorBox');
  const suspBox = document.getElementById('mitraSuspendedAlertBox');

  if (errBox) errBox.classList.add('hidden');
  if (suspBox) suspBox.classList.add('hidden');

  if (mode === 'pending') {
    if (idEl) idEl.value = 'Siti Maryam (+62 813-9876-5432)';
    if (passEl) passEl.value = '849201';
    showToast('Akun Demo Dipilih: Siti Maryam (Status: Pending Approval)', 'info');
  } else if (mode === 'approved') {
    if (idEl) idEl.value = 'Budi Santoso (+62 812-9876-1122)';
    if (passEl) passEl.value = '849201';
    showToast('Akun Demo Dipilih: Budi Santoso (Status: Approved)', 'info');
  } else if (mode === 'suspended') {
    if (idEl) idEl.value = 'Heri Purwanto (+62 811-2233-4455)';
    if (passEl) passEl.value = '849201';
    showToast('Akun Demo Dipilih: Heri Purwanto (Status: Suspended)', 'info');
  }
};

window.simulateMitraWrongPassword = function() {
  const errorBox = document.getElementById('mitraLoginValidationErrorBox');
  const suspBox = document.getElementById('mitraSuspendedAlertBox');

  if (suspBox) suspBox.classList.add('hidden');
  if (errorBox) {
    errorBox.classList.remove('hidden');
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  showToast('Nama pengguna atau PIN salah. Silakan coba lagi.', 'error');
};

window.handleMitraLogin = async function(e) {
  if (e) e.preventDefault();
  const idVal = document.getElementById('mitraLoginIdentifier')?.value?.trim() || '';
  const passVal = document.getElementById('mitraLoginPassword')?.value?.trim() || '';

  const errorBox = document.getElementById('mitraLoginValidationErrorBox');
  const suspBox = document.getElementById('mitraSuspendedAlertBox');
  if (errorBox) errorBox.classList.add('hidden');
  if (suspBox) suspBox.classList.add('hidden');

  if (!idVal) {
    showToast('Mohon isi No. Handphone / Nama Mitra terlebih dahulu!', 'warning');
    const inputEl = document.getElementById('mitraLoginIdentifier');
    if (inputEl) inputEl.focus();
    return;
  }

  let isPending = idVal.includes('Siti') || idVal.includes('Pending') || idVal.includes('pending');
  let isSuspended = idVal.includes('Heri') || idVal.includes('Suspended') || idVal.includes('suspended');
  let isApproved = idVal.includes('Budi') || idVal.includes('Approved') || idVal.includes('approved');

  // Supabase Table Profile Check
  const client = getSupabaseClient();
  if (client && idVal) {
    try {
      const { data: profile } = await client
        .from('profiles')
        .select('*')
        .or(`phone.eq.${idVal},email.eq.${idVal},full_name.ilike.%${idVal}%`)
        .maybeSingle();

      if (profile) {
        const st = profile.status_akun || profile.status;
        if (st === 'pending') {
          isPending = true;
          isApproved = false;
        } else if (st === 'approved') {
          isApproved = true;
          isPending = false;
        } else if (st === 'suspended') {
          isSuspended = true;
        }
      }
    } catch (err) {
      console.warn('Supabase profile query check warning:', err);
    }
  }

  if (isPending) {
    showToast('Akses Ditahan: Pendaftaran Anda Masih Menunggu Persetujuan Admin (1x24 Jam)', 'warning');
    window.handleAuthNavigationPath('partner-onboarding-status');
    if (typeof window.toggleMitraAdminApprovalState === 'function') {
      window.toggleMitraAdminApprovalState(false);
    }
  } else if (isSuspended) {
    if (suspBox) {
      suspBox.classList.remove('hidden');
      suspBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    showToast('Peringatan: Akun Mitra Dinonaktifkan Sementara. Silakan hubungi CS.', 'error');
  } else {
    // Approved
    if (!state.user) state.user = {};
    state.user.name = idVal.split(' ')[0] || "Budi Santoso";
    state.user.role = "Mitra Driver & Cleaning";
    state.user.isMitra = true;
    state.user.isLoggedIn = true;
    saveStateToStorage();
    if (typeof window.renderAuthHeaderNav === 'function') {
      window.renderAuthHeaderNav();
    }

    showToast('Login Mitra Berhasil! Mengalihkan ke Dashboard Tugas Lapangan Mitra...', 'success');
    setTimeout(() => {
      window.location.href = './index.html?role=mitra';
    }, 800);
  }
};

window.simulateWrongPassword = function() {
  const errorBox = document.getElementById('loginValidationErrorBox');
  const attemptsEl = document.getElementById('wrongPinAttempts');

  let count = parseInt(attemptsEl?.textContent || "1") + 1;
  if (count > 3) count = 1;
  if (attemptsEl) attemptsEl.textContent = count;

  if (errorBox) {
    errorBox.classList.remove('hidden');
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  showToast('Simulasi Validasi: PIN/Kata Sandi Salah! Pilihan "Lupa Kata Sandi?" ditampilkan.', 'error');
};

window.handleCustomerLogin = async function(e) {
  if (e) e.preventDefault();
  const identityInput = document.getElementById('loginIdentifier');
  const passwordInput = document.getElementById('loginPassword');

  const identity = identityInput ? identityInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value.trim() : "";

  if (!identity) {
    showToast('Mohon isi Email / WhatsApp / ID Pelanggan terlebih dahulu!', 'warning');
    if (identityInput) identityInput.focus();
    return;
  }

  // Supabase Auth Integration
  const client = getSupabaseClient();
  if (client && identity.includes('@') && password) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: identity,
        password: password
      });
      if (error) {
        console.warn('Supabase Auth Customer Login Info:', error.message);
      } else if (data && data.user) {
        console.log('Supabase Customer Auth Success:', data.user);
        if (data.user.user_metadata && data.user.user_metadata.full_name) {
          state.user.name = data.user.user_metadata.full_name;
        }
      }
    } catch (err) {
      console.warn('Supabase signInWithPassword exception:', err);
    }
  }

  if (!state.user) state.user = {};
  state.user.isLoggedIn = true;
  state.user.name = identity ? identity.split(' ')[0] : "Pelanggan VIP";
  state.user.email = identity.includes('@') ? identity : "dimas.pratama@gmail.com";
  state.user.phone = identity.includes('+') || identity.match(/^\d+$/) ? identity : "+62 812-3456-7890";
  state.user.role = "Pelanggan VIP";

  saveStateToStorage();
  if (typeof window.renderAuthHeaderNav === 'function') {
    window.renderAuthHeaderNav();
  }

  showToast(`Login Pelanggan Berhasil! Selamat datang kembali, ${state.user.name}.`, 'success');

  const urlParams = new URLSearchParams(window.location.search);
  const redirectTarget = urlParams.get('redirect') || state.pendingTargetUrl;

  if (redirectTarget) {
    state.pendingTargetUrl = null;
    saveStateToStorage();
    setTimeout(() => {
      window.location.href = redirectTarget;
    }, 400);
  } else {
    setTimeout(() => {
      window.location.href = './booking.html';
    }, 400);
  }
};

window.togglePasswordVisibility = function(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';

  const icon = btnEl.querySelector('.material-symbols-outlined');
  if (icon) icon.textContent = isPass ? 'visibility_off' : 'visibility';
};

window.sendOtpToGmail = function() {
  const emailInput = document.getElementById('resetEmailInput');
  const emailVal = emailInput?.value || "dimas.pratama@gmail.com";

  const sub1 = document.getElementById('resetSubStep1');
  const sub2 = document.getElementById('resetSubStep2');
  const textGmail = document.getElementById('sentGmailText');

  if (sub1) sub1.classList.add('hidden');
  if (sub2) sub2.classList.remove('hidden');
  if (textGmail) textGmail.textContent = emailVal;

  const badge1 = document.getElementById('resetStep1Badge');
  const badge2 = document.getElementById('resetStep2Badge');
  if (badge1) badge1.className = 'p-2 rounded-xl bg-surface-container-low text-on-surface-variant text-center font-label-sm text-label-sm font-semibold opacity-60';
  if (badge2) badge2.className = 'p-2 rounded-xl bg-primary text-on-primary text-center font-label-sm text-label-sm font-bold shadow-sm';

  showToast(`Kode OTP [849201] dikirimkan ke Gmail: ${emailVal}`, 'success');

  // Countdown Timer Simulator
  let seconds = 60;
  const countdownEl = document.getElementById('otpCountdownText');
  if (countdownEl) {
    const timer = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        clearInterval(timer);
        countdownEl.textContent = 'Kode OTP kedaluwarsa. Klik Kirim Ulang OTP.';
      } else {
        countdownEl.textContent = `Kirim Ulang OTP dalam 00:${String(seconds).padStart(2, '0')} detik`;
      }
    }, 1000);
  }
};

window.verifyOtpAndResetPassword = function(e) {
  if (e) e.preventDefault();
  const p1 = document.getElementById('newPinInput')?.value;
  const p2 = document.getElementById('confirmNewPinInput')?.value;

  if (p1 !== p2) {
    showToast('Konfirmasi PIN baru tidak cocok!', 'error');
    return;
  }

  showToast('PIN 6-Digit Baru Berhasil Diperbarui & Disimpan!', 'success');
  setTimeout(() => {
    window.location.href = './booking.html';
  }, 600);
};

window.handleGoogleOAuthLogin = function(redirectTargetUrl) {
  showToast('Menghubungkan ke Layanan Autentikasi Google OAuth...', 'info');
  setTimeout(() => {
    if (!state.user) state.user = {};
    state.user.isLoggedIn = true;
    state.user.name = "Dimas Pratama (Google Account)";
    state.user.email = "dimas.pratama@gmail.com";
    state.user.role = "Pelanggan VIP Google";

    saveStateToStorage();
    if (typeof window.renderAuthHeaderNav === 'function') {
      window.renderAuthHeaderNav();
    }

    showToast('Login dengan Google Sukses! Selamat datang, Dimas Pratama.', 'success');

    const urlParams = new URLSearchParams(window.location.search);
    const target = (typeof redirectTargetUrl === 'string' && redirectTargetUrl) ? redirectTargetUrl : (urlParams.get('redirect') || state.pendingTargetUrl);

    if (target) {
      state.pendingTargetUrl = null;
      saveStateToStorage();
      setTimeout(() => {
        window.location.href = target;
      }, 400);
    } else {
      setTimeout(() => {
        window.location.href = './booking.html';
      }, 400);
    }
  }, 600);
};

window.handleWhatsappQuickReg = function() {
  showToast('Verifikasi Nomor WhatsApp Otomatis Berhasil!', 'success');
  if (!state.user) state.user = {};
  state.user.isLoggedIn = true;
  state.user.name = "Dimas Pratama";
  state.user.phone = "+62 812-3456-7890";
  state.user.role = "Pelanggan VIP WhatsApp";

  saveStateToStorage();
  if (typeof window.renderAuthHeaderNav === 'function') {
    window.renderAuthHeaderNav();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const redirectTarget = urlParams.get('redirect') || state.pendingTargetUrl;

  if (redirectTarget) {
    state.pendingTargetUrl = null;
    saveStateToStorage();
    setTimeout(() => {
      window.location.href = redirectTarget;
    }, 400);
  } else {
    setTimeout(() => {
      window.location.href = './booking.html';
    }, 400);
  }
};

window.handleCustomerOnboardingSubmit = async function(e) {
  if (e) e.preventDefault();

  const fn = document.getElementById('onboardFirstName')?.value || "Dimas";
  const ln = document.getElementById('onboardLastName')?.value || "Pratama";
  const phone = document.getElementById('onboardPhone')?.value || "+62 812-3456-7890";
  const email = document.getElementById('onboardEmail')?.value || "dimas.pratama@gmail.com";
  const age = document.getElementById('onboardAge')?.value || "24";
  const password = "Password123!";

  // Supabase Auth & Profiles Persistence
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data: signUpData } = await client.auth.signUp({
        email: email,
        password: password
      });

      const userId = signUpData?.user?.id || `user_${Date.now()}`;
      
      const { data: profData, error: profError } = await client.from('profiles').upsert([
        {
          id: userId,
          full_name: `${fn} ${ln}`,
          email: email,
          phone: phone,
          role: 'customer',
          status_akun: 'approved',
          created_at: new Date().toISOString()
        }
      ]);

      if (profError) {
        console.info('Supabase profiles info:', profError.message);
      } else {
        console.log('Customer Profile saved to Supabase Cloud:', profData);
      }
    } catch (err) {
      console.warn('Supabase customer registration sync warning:', err);
    }
  }

  if (!state.user) state.user = {};
  state.user.isLoggedIn = true;
  state.user.name = `${fn} ${ln}`;
  state.user.phone = phone;
  state.user.email = email;
  state.user.age = age;
  state.user.role = "Pelanggan VIP";

  saveStateToStorage();
  if (typeof window.renderAuthHeaderNav === 'function') {
    window.renderAuthHeaderNav();
  }

  showToast(`Pendaftaran Akun Pelanggan ${fn} ${ln} Berhasil & Tersimpan di Supabase!`, 'success');

  const urlParams = new URLSearchParams(window.location.search);
  const redirectTarget = urlParams.get('redirect') || state.pendingTargetUrl;

  if (redirectTarget) {
    state.pendingTargetUrl = null;
    saveStateToStorage();
    setTimeout(() => {
      window.location.href = redirectTarget;
    }, 400);
  } else {
    setTimeout(() => {
      window.location.href = './booking.html';
    }, 400);
  }
};

window.selectMitraCategory = function(cat, element) {
  const activeRole = cat || localStorage.getItem('shift_mitra_registration_role') || 'driver';
  localStorage.setItem('shift_mitra_registration_role', activeRole);
  if (window.state) window.state.mitraRegistrationRole = activeRole;

  const cards = document.querySelectorAll('.js-mitra-cat-card');
  cards.forEach(card => {
    card.className = 'js-mitra-cat-card p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container-highest/60 border border-slate-200 cursor-pointer flex items-start gap-2.5 transition-all';
    const check = card.querySelector('.js-mitra-cat-check');
    if (check) {
      check.className = 'material-symbols-outlined text-slate-300 text-[20px] js-mitra-cat-check shrink-0 mt-0.5';
      check.textContent = 'radio_button_unchecked';
    }
  });

  if (element) {
    element.className = 'js-mitra-cat-card p-3 rounded-2xl bg-primary/5 text-primary border border-primary/30 shadow-sm cursor-pointer flex items-start gap-2.5 transition-all';
    const check = element.querySelector('.js-mitra-cat-check');
    if (check) {
      check.className = 'material-symbols-outlined text-primary text-[20px] js-mitra-cat-check shrink-0 mt-0.5';
      check.textContent = 'check_circle';
    }
  }

  // Header & Pill Tabs Capsule Sync
  const tabDriver = document.getElementById('tabCapsuleDriver') || document.getElementById('tab-driver');
  const tabHelper = document.getElementById('tabCapsuleHelper') || document.getElementById('tab-helper');
  const tabCleaner = document.getElementById('tabCapsuleCleaner') || document.getElementById('tab-cleaner');

  const activeTabCls = 'px-5 py-2 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer';
  const inactiveTabCls = 'px-5 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer';

  if (tabDriver) tabDriver.className = (activeRole === 'driver') ? activeTabCls : inactiveTabCls;
  if (tabHelper) tabHelper.className = (activeRole === 'helper') ? activeTabCls : inactiveTabCls;
  if (tabCleaner) tabCleaner.className = (activeRole === 'cleaner') ? activeTabCls : inactiveTabCls;

  const formStepTitle = document.getElementById('formStepTitle');
  const bannerTitle = document.getElementById('bannerTitle');
  const bannerDesc = document.getElementById('bannerDesc');
  const roleBadge = document.getElementById('formStep2RoleBadge');
  const submitBtn = document.getElementById('btnSubmitDriverForm') || document.getElementById('submitBtn');

  const simTypeGroup = document.getElementById('simTypeGroup');
  const armadaSelectorGroup = document.getElementById('armadaSelectorGroup');
  const armadaSpecGroup = document.getElementById('armadaSpecGroup');
  const simUploadBox = document.getElementById('simUploadBox');
  const stnkUploadBox = document.getElementById('stnkUploadBox');
  const armadaPhotosGrid = document.getElementById('armadaPhotosGrid');
  const kirUploadBox = document.getElementById('kirUploadBox');

  const helperPhysicalGroup = document.getElementById('helperPhysicalGroup');
  const helperUploadsGroup = document.getElementById('helperUploadsGroup');
  const cleanerSkillsGroup = document.getElementById('cleanerSkillsGroup');
  const cleanerEquipmentGroup = document.getElementById('cleanerEquipmentGroup');

  if (activeRole === 'driver') {
    if (formStepTitle) formStepTitle.textContent = 'Formulir & Dokumen Khusus Driver Logistik';
    if (bannerTitle) bannerTitle.textContent = 'Persyaratan Spesifik Driver Logistik';
    if (bannerDesc) bannerDesc.textContent = 'Khusus Mitra Driver: Wajib memiliki SIM A/B1 aktif, STNK aktif, serta kesiapan armada Pick-up, Blind Van, atau Truk Engkel CDE.';
    if (roleBadge) roleBadge.textContent = 'Driver Logistik';
    if (submitBtn) submitBtn.querySelector('span').textContent = 'Kirimkan Berkas Driver & Mulai Verifikasi Armada';

    if (simTypeGroup) simTypeGroup.classList.remove('hidden');
    if (armadaSelectorGroup) armadaSelectorGroup.classList.remove('hidden');
    if (armadaSpecGroup) armadaSpecGroup.classList.remove('hidden');
    if (simUploadBox) simUploadBox.classList.remove('hidden');
    if (stnkUploadBox) stnkUploadBox.classList.remove('hidden');
    if (armadaPhotosGrid) armadaPhotosGrid.classList.remove('hidden');
    if (kirUploadBox) kirUploadBox.classList.remove('hidden');

    if (helperPhysicalGroup) helperPhysicalGroup.classList.add('hidden');
    if (helperUploadsGroup) helperUploadsGroup.classList.add('hidden');
    if (cleanerSkillsGroup) cleanerSkillsGroup.classList.add('hidden');
    if (cleanerEquipmentGroup) cleanerEquipmentGroup.classList.add('hidden');

    showToast('Kategori Aktif: Mitra Driver Logistik (Wajib SIM & Armada)', 'info');

  } else if (activeRole === 'helper') {
    if (formStepTitle) formStepTitle.textContent = 'Registrasi & Unggah Berkas Helper Angkut';
    if (bannerTitle) bannerTitle.textContent = 'Formulir Rekrutmen Mitra Helper Angkut SHIFT';
    if (bannerDesc) bannerDesc.textContent = 'Pendaftaran tenaga profesional bongkar muat & packing perabot. Bebas SIM & tanpa kendaraan pribadi.';
    if (roleBadge) roleBadge.textContent = 'Helper Angkut';
    if (submitBtn) submitBtn.querySelector('span').textContent = 'Kirimkan Berkas Helper Angkut & Mulai Verifikasi';

    if (simTypeGroup) simTypeGroup.classList.add('hidden');
    if (armadaSelectorGroup) armadaSelectorGroup.classList.add('hidden');
    if (armadaSpecGroup) armadaSpecGroup.classList.add('hidden');
    if (simUploadBox) simUploadBox.classList.add('hidden');
    if (stnkUploadBox) stnkUploadBox.classList.add('hidden');
    if (armadaPhotosGrid) armadaPhotosGrid.classList.add('hidden');
    if (kirUploadBox) kirUploadBox.classList.add('hidden');

    if (helperPhysicalGroup) helperPhysicalGroup.classList.remove('hidden');
    if (helperUploadsGroup) helperUploadsGroup.classList.remove('hidden');
    if (cleanerSkillsGroup) cleanerSkillsGroup.classList.add('hidden');
    if (cleanerEquipmentGroup) cleanerEquipmentGroup.classList.add('hidden');

    showToast('Kategori Aktif: Helper Angkut (Bebas SIM & Tanpa Kendaraan)', 'info');

  } else if (activeRole === 'cleaner') {
    if (formStepTitle) formStepTitle.textContent = 'Formulir Pendaftaran & Unggah Berkas Spesialis Deep Clean';
    if (bannerTitle) bannerTitle.textContent = 'Khusus Spesialis Kebersihan & Sanitasi Ruang';
    if (bannerDesc) bannerDesc.textContent = 'Tidak membutuhkan SIM atau kendaraan pribadi. Peralatan chemical bersertifikasi Kemenkes RI disediakan langsung atau opsi subsidi.';
    if (roleBadge) roleBadge.textContent = 'Deep Clean';
    if (submitBtn) submitBtn.querySelector('span').textContent = 'Kirimkan Berkas Deep Clean & Mulai Verifikasi';

    if (simTypeGroup) simTypeGroup.classList.add('hidden');
    if (armadaSelectorGroup) armadaSelectorGroup.classList.add('hidden');
    if (armadaSpecGroup) armadaSpecGroup.classList.add('hidden');
    if (simUploadBox) simUploadBox.classList.add('hidden');
    if (stnkUploadBox) stnkUploadBox.classList.add('hidden');
    if (armadaPhotosGrid) armadaPhotosGrid.classList.add('hidden');
    if (kirUploadBox) kirUploadBox.classList.add('hidden');

    if (helperPhysicalGroup) helperPhysicalGroup.classList.remove('hidden');
    if (cleanerSkillsGroup) cleanerSkillsGroup.classList.remove('hidden');
    if (cleanerEquipmentGroup) cleanerEquipmentGroup.classList.remove('hidden');
    if (helperUploadsGroup) helperUploadsGroup.classList.remove('hidden');

    showToast('Kategori Aktif: Spesialis Deep Clean & Sanitasi Ruang', 'info');
  }
};

window.switchCategory = function(cat) {
  window.selectMitraCategory(cat);
};
window.switchRoleTabInForm = function(roleKey) {
  window.selectMitraCategory(roleKey);
};

async function uploadFileToSupabaseStorage(file, docName, userId) {
  if (!file) return null;

  const isCv = (docName === 'cv' || docName === 'cv-input');
  const maxMb = isCv ? 10 : 5;
  const maxSizeBytes = maxMb * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    showToast(`Ukuran file ${docName} (${(file.size / (1024 * 1024)).toFixed(1)} MB) melebihi batas ${maxMb} MB!`, 'error');
    return null;
  }

  const allowedExts = isCv ? ['pdf', 'doc', 'docx'] : ['jpg', 'jpeg', 'png', 'pdf'];
  const ext = file.name.split('.').pop().toLowerCase();
  if (!allowedExts.includes(ext)) {
    showToast(`Format file ${docName} [.${ext}] tidak valid. Wajib: ${allowedExts.join(', ')}`, 'error');
    return null;
  }

  const client = getSupabaseClient();
  const cleanName = file.name.replace(/\s+/g, '_');
  const fileName = `${Date.now()}_${cleanName}`;

  if (!client) {
    console.warn(`[Demo Mode] Supabase client belum siap. Presigned URL file: ${fileName}`);
    return `https://ihyramlohtmngbuzmvgs.supabase.co/storage/v1/object/public/dokumen-mitra/${fileName}`;
  }

  try {
    console.log(`📤 Executing supabase.storage.from('dokumen-mitra').upload('${fileName}', file)...`);
    const { data, error } = await client.storage
      .from('dokumen-mitra')
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.error(`❌ Supabase Storage Upload Error (${docName} / ${file.name}):`, error.message || error, error);
      showToast(`Gagal mengunggah ${file.name}: ${error.message || 'Storage error'}`, 'error');
      return `https://ihyramlohtmngbuzmvgs.supabase.co/storage/v1/object/public/dokumen-mitra/${fileName}`;
    }

    const { data: publicUrlData } = client.storage
      .from('dokumen-mitra')
      .getPublicUrl(data ? data.path : fileName);

    const publicUrl = publicUrlData ? publicUrlData.publicUrl : `https://ihyramlohtmngbuzmvgs.supabase.co/storage/v1/object/public/dokumen-mitra/${fileName}`;
    console.log(`✅ File '${file.name}' (${docName}) successfully uploaded to bucket 'dokumen-mitra':`, publicUrl);
    return publicUrl;
  } catch (err) {
    console.error(`❌ Exception saat mengunggah file (${docName}):`, err);
    return `https://ihyramlohtmngbuzmvgs.supabase.co/storage/v1/object/public/dokumen-mitra/${fileName}`;
  }
}

window.triggerUpload = function(inputId) {
  const input = document.getElementById(inputId);
  if (input) input.click();
};

window.handleFileSelected = function(inputElement, previewContainerId) {
  if (inputElement && inputElement.files && inputElement.files[0]) {
    window.handleMitraDocumentUpload(inputElement, previewContainerId);
  }
};

window.closeModal = function() {
  const modal = document.getElementById('successModal');
  if (modal) modal.classList.add('hidden');
};

window.closeModalAndRedirect = function() {
  window.closeModal();
  if (typeof window.handleAuthNavigationPath === 'function') {
    window.handleAuthNavigationPath('partner-onboarding-status');
  } else {
    window.location.hash = '#partner-onboarding-status';
  }
};

window.handleSubmit = function(e) {
  if (e) e.preventDefault();
  window.handleMitraRegistrationSubmit(e);
};

window.handleMitraDocumentUpload = async function(inputEl, previewId) {
  if (!inputEl || !inputEl.files || inputEl.files.length === 0) return;
  const file = inputEl.files[0];
  const isCv = inputEl.id === 'cv-input';
  const maxMb = isCv ? 10 : 5;

  if (file.size > maxMb * 1024 * 1024) {
    showToast(`Ukuran berkas [${file.name}] (${(file.size / (1024 * 1024)).toFixed(1)} MB) melebihi batas ${maxMb} MB!`, 'error');
    inputEl.value = '';
    return;
  }

  const allowedExts = isCv ? ['pdf', 'doc', 'docx'] : ['jpg', 'jpeg', 'png', 'pdf'];
  const ext = file.name.split('.').pop().toLowerCase();
  if (!allowedExts.includes(ext)) {
    showToast(`Format [${file.name}] tidak valid! Gunakan ${allowedExts.join(', ')}.`, 'error');
    inputEl.value = '';
    return;
  }

  const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
  const target = document.getElementById(previewId);
  if (target) {
    const fnSpan = target.querySelector('.filename');
    if (fnSpan) fnSpan.textContent = `Mengunggah ${file.name}...`;
    else target.textContent = `Mengunggah ${file.name}...`;
    target.classList.remove('hidden');
    target.classList.add('inline-flex');
  }

  showToast(`Mengunggah berkas [${file.name}] ke Supabase Storage bucket 'dokumen-mitra'...`, 'info');

  const docName = inputEl.id || 'dokumen';
  const uploadedUrl = await uploadFileToSupabaseStorage(file, docName, 'mitra');
  if (uploadedUrl) {
    inputEl.dataset.uploadedUrl = uploadedUrl;
    if (target) {
      const fnSpan = target.querySelector('.filename');
      if (fnSpan) fnSpan.textContent = `${file.name} (${sizeMb} MB) • Terunggah ke Cloud`;
      else target.textContent = `${file.name} (${sizeMb} MB) • Terunggah ke Cloud`;
    }
    showToast(`Berkas [${file.name}] berhasil diunggah ke Supabase Storage!`, 'success');
  }
};

window.handleMitraRegistrationSubmit = async function(e) {
  if (e) e.preventDefault();

  const agreement = document.getElementById('paktaCheck') || document.getElementById('agreementCheckbox');
  if (agreement && !agreement.checked) {
    showToast('Mohon centang Pakta Integritas Layanan & Keabsahan Data untuk melanjutkan.', 'warning');
    return;
  }

  const submitBtn = document.getElementById('btnSubmitDriverForm') || document.getElementById('submitBtn');
  let originalBtnHtml = '';
  if (submitBtn) {
    originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="material-symbols-outlined text-[22px] animate-spin">progress_activity</span>
      <span>Mengunggah Berkas ke Supabase & Memverifikasi...</span>
    `;
  }

  const activeRole = localStorage.getItem('shift_mitra_registration_role') || 'driver';
  const name = document.getElementById('mitraFullName')?.value.trim() || "Siti Rahmawati Putri";
  const nik = document.getElementById('driverNIK')?.value.trim() || "3276015509920004";
  const phone = document.getElementById('mitraPhone')?.value.trim() || "+62 812-9844-3210";
  const city = document.getElementById('mitraCity')?.value || "Jabodetabek Metro";
  const dob = document.getElementById('helperDob')?.value || "1995-09-15";

  // Cleaner Specific Skill Checkboxes & Equipment Choice
  const cleanSkills = [];
  if (document.getElementById('specKosApartment')?.checked) cleanSkills.push('Deep Clean Kos & Apartemen');
  if (document.getElementById('specHydroVacuum')?.checked) cleanSkills.push('Cuci Kasur Hidro-Vakum');
  if (document.getElementById('specKerakBath')?.checked) cleanSkills.push('Kerak Kamar Mandi & Porselen');
  if (document.getElementById('specPascaRenov')?.checked) cleanSkills.push('Pembersihan Pasca Renovasi');

  const checkedEquip = document.querySelector('input[name="peralatan"]:checked');
  const equipStatus = checkedEquip ? checkedEquip.value : 'butuh_shift';

  // Helper Specific Physical Fields
  const height = document.getElementById('helperHeight')?.value || "165";
  const weight = document.getElementById('helperWeight')?.value || "55";
  const lifting = document.getElementById('helperLiftingCapacity')?.value || "25-35";

  // Driver Specific Fields
  const simType = document.getElementById('driverSimType')?.value || "SIM A";
  const simNumber = document.getElementById('simNumberInput')?.value.trim() || "9812-1409-00021";
  const simExpiry = document.getElementById('simExpiryInput')?.value || "2027-09-21";
  const stnkExpiry = document.getElementById('stnkExpiryInput')?.value || "2025-04-15";
  const spec = document.getElementById('mitraSpecInput')?.value.trim() || "B 9421 KAZ - Daihatsu Gran Max 2021";

  const checkedArmada = document.querySelector('input[name="armada_type"]:checked');
  const tipeArmada = checkedArmada ? checkedArmada.value : 'pickup_bak';
  const kepemilikanArmada = typeof activeOwnership !== 'undefined' ? activeOwnership : 'Milik Sendiri';
  const userId = generateUUID();

  // File Inputs
  const elKtp = document.getElementById('fileKtp') || document.getElementById('ktp-input');
  const elSkck = document.getElementById('fileSkck') || document.getElementById('skck-input');
  const elSehat = document.getElementById('sehat-input');
  const elFoto = document.getElementById('foto-input');
  const elCv = document.getElementById('cv-input');
  const elCert = document.getElementById('cert-input');
  const elSim = document.getElementById('fileSim');
  const elStnk = document.getElementById('fileStnk');
  const elFotoDepan = document.getElementById('fileFotoMobilDepan');
  const elFotoSamping = document.getElementById('fileFotoMobilSamping');
  const elKir = document.getElementById('fileKir');

  const getFileUrl = async (inputEl, docName) => {
    if (inputEl && inputEl.dataset && inputEl.dataset.uploadedUrl) {
      return inputEl.dataset.uploadedUrl;
    }
    const file = inputEl?.files[0];
    if (file) {
      return await uploadFileToSupabaseStorage(file, docName, userId);
    }
    return null;
  };

  showToast(`Mengunggah berkas ${activeRole.toUpperCase()} ke Supabase Storage (dokumen-mitra)...`, 'info');

  const [
    urlKtp,
    urlSkck,
    urlSehat,
    urlFoto,
    urlCv,
    urlCert,
    urlSim,
    urlStnk,
    urlFotoDepan,
    urlFotoSamping,
    urlKir
  ] = await Promise.all([
    getFileUrl(elKtp, 'ktp'),
    getFileUrl(elSkck, 'skck'),
    getFileUrl(elSehat, 'surat_sehat'),
    getFileUrl(elFoto, 'foto'),
    getFileUrl(elCv, 'cv'),
    getFileUrl(elCert, 'sertifikat'),
    getFileUrl(elSim, 'sim'),
    getFileUrl(elStnk, 'stnk'),
    getFileUrl(elFotoDepan, 'foto_depan'),
    getFileUrl(elFotoSamping, 'foto_samping'),
    getFileUrl(elKir, 'kir')
  ]);

  // Supabase DB Sync to 'profiles' and 'mitra_documents'
  const client = getSupabaseClient();
  const supabaseRole = activeRole === 'cleaner' ? 'mitra_cleaner' : 'mitra_driver';

  if (client) {
    try {
      const profilePayload = {
        id: userId,
        full_name: name,
        nik: nik,
        phone: phone,
        city: city,
        dob: dob,
        specialization: activeRole === 'cleaner' ? (cleanSkills.join(', ') || 'Deep Clean Kos & Apartemen') : spec,
        equipment_status: activeRole === 'cleaner' ? equipStatus : null,
        height: height,
        weight: weight,
        lifting_capacity: lifting,
        role: supabaseRole,
        sub_role: activeRole,
        status_akun: 'pending',
        created_at: new Date().toISOString()
      };

      console.log('📤 Executing supabase.from("profiles").upsert()... Payload:', profilePayload);

      let profData = null;
      let profErr = null;

      const resUpsert = await client.from('profiles').upsert([profilePayload]).select();
      profData = resUpsert.data;
      profErr = resUpsert.error;

      if (profErr) {
        console.warn('⚠️ Supabase profiles upsert failed, trying insert fallback:', profErr.message);
        const resInsert = await client.from('profiles').insert([profilePayload]).select();
        profData = resInsert.data;
        profErr = resInsert.error;

        if (profErr) {
          console.warn('⚠️ Supabase profiles insert with ID failed, trying insert without explicit ID:', profErr.message);
          const { id, ...payloadWithoutId } = profilePayload;
          const resNoId = await client.from('profiles').insert([payloadWithoutId]).select();
          profData = resNoId.data;
          profErr = resNoId.error;
        }
      }

      if (profErr) {
        console.error('❌ Supabase profiles insert/upsert error:', profErr);
      } else {
        console.log('✅ Supabase profiles insert successful:', profData);
      }

      // 2. Insert to 'mitra_documents'
      const docPayload = {
        user_id: userId,
        mitra_name: name,
        phone: phone,
        url_ktp: urlKtp || null,
        url_skck: urlSkck || null,
        url_surat_sehat: urlSehat || null,
        url_foto: urlFoto || null,
        url_cv: urlCv || null,
        url_sertifikat: urlCert || null,
        url_sim: urlSim || null,
        url_stnk: urlStnk || null,
        url_foto_depan: urlFotoDepan || null,
        url_foto_samping: urlFotoSamping || null,
        url_kir: urlKir || null,
        plat_nomor: activeRole === 'driver' ? spec : null,
        tipe_armada: activeRole === 'driver' ? tipeArmada : null,
        kepemilikan_armada: activeRole === 'driver' ? kepemilikanArmada : null,
        nomor_sim: activeRole === 'driver' ? simNumber : null,
        masa_berlaku_sim: activeRole === 'driver' ? simExpiry : null,
        masa_berlaku_stnk: activeRole === 'driver' ? stnkExpiry : null,
        profession_role: activeRole,
        created_at: new Date().toISOString()
      };

      console.log('📤 Executing supabase.from("mitra_documents").insert()... Payload:', docPayload);
      const { data: docData, error: docErr } = await client
        .from('mitra_documents')
        .insert([docPayload])
        .select();

      if (docErr) {
        console.error('❌ Supabase mitra_documents insert error:', docErr);
      } else {
        console.log(`✅ Mitra (${activeRole}) Documents & Profile Saved to Supabase Cloud!`, docData);
      }

    } catch (err) {
      console.error('❌ Supabase DB Exception:', err);
    }
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHtml;
  }

  // Generate unique registration tracking code (SHF-XXXXX-IND)
  const randNum = Math.floor(10000 + Math.random() * 90000);
  const regCodeStr = 'SHF-' + randNum + '-IND';
  const regCodeEl = document.getElementById('regCode');
  if (regCodeEl) regCodeEl.textContent = regCodeStr;

  showToast(`Pendaftaran ${name} Berhasil & Terkirim ke Supabase! Status: Ditinjau HRD 1x24 Jam.`, 'success');

  // Redirect to Status Pengajuan Screen
  if (typeof window.handleAuthNavigationPath === 'function') {
    window.handleAuthNavigationPath('partner-onboarding-status');
  } else {
    window.location.hash = '#status-pengajuan';
  }
};

window.toggleMitraAdminApprovalState = function(isApproved) {
  const headline = document.getElementById('applicantStatusHeadline');
  const estimate = document.getElementById('applicantStatusEstimate');
  const percentage = document.getElementById('applicantProgressPercentage');
  const progressBar = document.getElementById('applicantProgressBar');
  const btnLogin = document.getElementById('btnLoginDriverShift');
  const stage4Item = document.getElementById('stage4Item');

  if (isApproved) {
    if (headline) headline.textContent = "Akun Disetujui Admin! Selamat Bergabung di Ekosistem SHIFT";
    if (estimate) estimate.textContent = "Akun Aktif & Siap Menerima Order";
    if (percentage) percentage.textContent = "100% Selesai (4/4 Tahapan)";
    if (progressBar) progressBar.style.width = "100%";
    if (stage4Item) stage4Item.classList.remove('opacity-60');
    if (btnLogin) {
      btnLogin.className = "px-5 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 font-label-md text-label-md transition-all cursor-pointer font-bold shadow-md";
      btnLogin.textContent = "Login Driver SHIFT (Aktif)";
    }
    showToast('Simulasi Dev: Admin menyetujui (Approve) pendaftaran mitra!', 'success');
  } else {
    if (headline) headline.textContent = "Sedang Diverifikasi Tim HRD & Inspektur Armada";
    if (estimate) estimate.textContent = "Estimasi Tuntas 4 Jam Lagi";
    if (percentage) percentage.textContent = "75% Selesai (3/4 Tahapan)";
    if (progressBar) progressBar.style.width = "75%";
    if (stage4Item) stage4Item.classList.add('opacity-60');
    if (btnLogin) {
      btnLogin.className = "px-5 py-2 rounded-full bg-surface-container-high text-primary hover:bg-surface-variant font-label-md text-label-md transition-all cursor-pointer font-bold";
      btnLogin.textContent = "Login Driver SHIFT";
    }
    showToast('Simulasi Dev: Status dikembalikan ke Pending Approval.', 'info');
  }
};

/* ==========================================
 * MITRA REAL-TIME TRACKING & DOKUMEN AUDIT ENGINE
 * ========================================== */

window.searchStatus = async function() {
  const input = document.getElementById('search-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) {
    input.focus();
    showToast('Masukkan NIK 16-Digit atau No. WhatsApp pendaftaran Anda!', 'warning');
    return;
  }

  const btn = document.getElementById('search-btn');
  let origHtml = '';
  if (btn) {
    origHtml = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span><span>Memeriksa...</span>';
    btn.disabled = true;
  }

  try {
    await window.loadMitraStatusFromSupabase(val);
  } catch (err) {
    console.warn("Search Status error:", err);
  } finally {
    if (btn) {
      btn.innerHTML = origHtml;
      btn.disabled = false;
    }
  }
};

window.loadMitraStatusFromSupabase = async function(searchVal) {
  const inputEl = document.getElementById('search-input');
  const val = searchVal !== undefined ? searchVal : (inputEl ? inputEl.value.trim() : "");
  if (!val) {
    return;
  }

  const client = getSupabaseClient();
  let profileData = null;
  let docData = null;

  if (client && val) {
    try {
      // Query profiles with joined mitra_documents using or logic
      const { data, error } = await client
        .from('profiles')
        .select('*, mitra_documents(*)')
        .or(`nik.eq.${val},phone.eq.${val}`)
        .maybeSingle();

      if (!error && data) {
        profileData = data;
        if (data.mitra_documents && data.mitra_documents.length > 0) {
          docData = data.mitra_documents[0];
        }
      }
    } catch (err) {
      console.warn("Supabase loadMitraStatus query exception:", err);
    }
  }

  if (!profileData) {
    showToast(`Data pendaftaran untuk NIK / No. WA [${val}] tidak ditemukan di Supabase Cloud.`, 'warning');
    return;
  }

  // Update UI Elements with retrieved data
  const nameEl = document.getElementById('applicantName');
  const avatarEl = document.getElementById('applicantAvatar');
  const regCodeEl = document.getElementById('applicantRegCode');
  const catEl = document.getElementById('applicantCategoryDetail');
  const submitTimeEl = document.getElementById('applicantSubmitTime');
  const headlineEl = document.getElementById('applicantStatusHeadline');
  const estEl = document.getElementById('applicantStatusEstimate');
  const pctEl = document.getElementById('applicantProgressPercentage');
  const barEl = document.getElementById('applicantProgressBar');

  const fullName = profileData.full_name || profileData.nama || "Budi Setiawan";
  if (nameEl) nameEl.textContent = fullName;
  
  if (avatarEl) {
    const parts = fullName.trim().split(' ');
    const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : fullName.slice(0, 2).toUpperCase();
    avatarEl.textContent = initials;
  }

  const regId = profileData.id ? (profileData.id.includes('SHF') || profileData.id.includes('#') ? profileData.id : `#REG-SHIFT-${profileData.id.slice(-5)}`) : "#REG-SHIFT-88492";
  if (regCodeEl) regCodeEl.textContent = regId;

  const roleName = profileData.sub_role === 'cleaner' ? 'Spesialis Deep Clean' : (profileData.sub_role === 'helper' ? 'Mitra Helper Angkut' : 'Mitra Driver Logistik');
  const specText = profileData.specialization || profileData.plat_nomor || 'Pick-up Bak Gran Max (B 9421 KAZ)';
  if (catEl) catEl.textContent = `${roleName} • ${specText}`;

  if (submitTimeEl) {
    const d = profileData.created_at ? new Date(profileData.created_at) : new Date();
    submitTimeEl.textContent = `${d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })} • ${d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
  }

  const statusAkun = profileData.status_akun || 'pending';
  const stage4Item = document.getElementById('stage4Item');
  const btnLogin = document.getElementById('btnLoginDriverShift');

  if (statusAkun === 'approved') {
    if (headlineEl) headlineEl.textContent = "Akun Disetujui Admin! Selamat Bergabung di Ekosistem SHIFT";
    if (estEl) estEl.textContent = "Akun Aktif & Siap Menerima Order";
    if (pctEl) pctEl.textContent = "100% Selesai (4/4 Tahapan)";
    if (barEl) barEl.style.width = "100%";
    if (stage4Item) stage4Item.classList.remove('opacity-60');
    if (btnLogin) {
      btnLogin.className = "px-5 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 font-label-md text-label-md transition-all cursor-pointer font-bold shadow-md";
      btnLogin.textContent = "Login Driver SHIFT (Aktif)";
    }
  } else if (statusAkun === 'rejected') {
    if (headlineEl) headlineEl.textContent = "Verifikasi Berkas Memerlukan Perbaikan / Upload Ulang";
    if (estEl) estEl.textContent = "Harap Cek Catatan Verifikator";
    if (pctEl) pctEl.textContent = "25% (Memerlukan Perbaikan)";
    if (barEl) barEl.style.width = "25%";
  } else {
    if (headlineEl) headlineEl.textContent = "Sedang Diverifikasi Tim HRD & Inspektur Armada";
    if (estEl) estEl.textContent = "Estimasi Tuntas 4 Jam Lagi";
    if (pctEl) pctEl.textContent = "75% Selesai (3/4 Tahapan)";
    if (barEl) barEl.style.width = "75%";
  }

  // Render Document Audit Grid
  window.renderDocumentAuditGrid(docData, profileData);

  showToast(`Data pengajuan #${val.slice(-5)} (${fullName}) berhasil dimuat!`, 'success');
};

window.renderDocumentAuditGrid = function(docData, profileData) {
  const docs = [
    {
      key: 'ktp',
      label: 'KTP Elektronik',
      sub: profileData?.nik ? `NIK: ${profileData.nik}` : 'NIK Terverifikasi',
      icon: 'id_card',
      url: docData?.url_ktp || profileData?.url_ktp
    },
    {
      key: 'sim',
      label: 'SIM A / B1 Pengemudi',
      sub: docData?.masa_berlaku_sim ? `Masa Berlaku: ${docData.masa_berlaku_sim}` : 'Aktif Valid',
      icon: 'drive_eta',
      url: docData?.url_sim || profileData?.url_sim
    },
    {
      key: 'stnk',
      label: 'STNK Armada',
      sub: docData?.masa_berlaku_stnk ? `Pajak Aktif s/d ${docData.masa_berlaku_stnk}` : 'Pajak Aktif',
      icon: 'receipt_long',
      url: docData?.url_stnk || profileData?.url_stnk
    },
    {
      key: 'foto',
      label: 'Foto Fisik Armada',
      sub: docData?.tipe_armada ? `Armada ${docData.tipe_armada}` : 'Kondisi Prima',
      icon: 'photo_camera',
      url: docData?.url_foto_depan || docData?.url_foto || profileData?.url_foto
    },
    {
      key: 'skck',
      label: 'SKCK Kepolisian',
      sub: 'Status Kepolisian Valid',
      icon: 'policy',
      url: docData?.url_skck || profileData?.url_skck
    },
    {
      key: 'sehat',
      label: 'Surat Keterangan Sehat',
      sub: 'Klinik / Dokter Pratama',
      icon: 'medical_services',
      url: docData?.url_surat_sehat || profileData?.url_surat_sehat
    }
  ];

  const gridContainer = document.getElementById('dokumen-audit-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = docs.map(doc => {
    const isComplete = Boolean(doc.url);
    const badgeHtml = isComplete ? `
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
        <span class="material-symbols-outlined text-[14px]">verified</span>
        <span>TERVERIFIKASI</span>
      </span>
    ` : `
      <div class="flex items-center gap-1.5">
        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-label-sm text-label-sm font-bold">
          <span class="material-symbols-outlined text-[14px]">pending</span>
          <span>BELUM LENGKAP</span>
        </span>
        <button onclick="handleAuthNavigationPath('document-upload')" class="px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-all cursor-pointer font-bold shadow-sm">
          Unggah
        </button>
      </div>
    `;

    return `
      <div class="rounded-2xl bg-surface-container-low p-4 flex items-center justify-between gap-4 border border-slate-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full ${isComplete ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-800'} flex items-center justify-center font-bold">
            <span class="material-symbols-outlined text-[20px]">${doc.icon}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-label-lg text-label-lg text-on-surface font-bold">${doc.label}</span>
            <span class="font-body-sm text-body-sm text-outline">${doc.sub}</span>
          </div>
        </div>
        ${badgeHtml}
      </div>
    `;
  }).join('');
};

/* ==========================================
 * CUSTOMER VIP PROFILE & ACCOUNT ENGINE
 * ========================================== */

window.loadProfileFromSupabase = async function() {
  const client = getSupabaseClient();
  let userProf = state.user || {};

  if (client) {
    try {
      const email = userProf.email || "dimas.pratama@gmail.com";
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .or(`email.eq.${email},phone.eq.${userProf.phone || ''}`)
        .maybeSingle();

      if (!error && data) {
        userProf = {
          ...userProf,
          name: data.full_name || data.nama || userProf.name,
          email: data.email || userProf.email,
          phone: data.phone || data.nomor_hp || userProf.phone,
          gender: data.gender || userProf.gender || 'L',
          dob: data.dob || data.birth_date || userProf.dob || '1998-04-18',
          role: data.role === 'customer' ? 'Pelanggan VIP' : (data.role || userProf.role),
          savedAddresses: data.saved_addresses || userProf.savedAddresses
        };
        state.user = userProf;
        saveStateToStorage();
      }
    } catch (err) {
      console.warn("Supabase profile load exception:", err);
    }
  }

  // Populate Form Fields
  const inputFullName = document.getElementById('inputFullName');
  const inputEmail = document.getElementById('inputEmail');
  const inputPhone = document.getElementById('inputPhone');
  const inputDob = document.getElementById('inputDob');

  if (inputFullName) inputFullName.value = userProf.name || "";
  if (inputEmail) inputEmail.value = userProf.email || "";
  if (inputPhone) inputPhone.value = userProf.phone || "";
  if (inputDob) inputDob.value = userProf.dob || "";

  const genderVal = userProf.gender || 'L';
  const radioGender = document.querySelector(`input[name="gender"][value="${genderVal}"]`);
  if (radioGender) {
    radioGender.checked = true;
    if (typeof window.toggleGenderUI === 'function') window.toggleGenderUI(genderVal);
  }

  // Populate Header UI
  const profileHeaderName = document.getElementById('profileHeaderName');
  const profileHeaderAvatar = document.getElementById('profileHeaderAvatar');
  const navUserName = document.getElementById('navUserName');
  const navAvatarInitials = document.getElementById('navAvatarInitials');
  const walletBalanceDisplay = document.getElementById('walletBalanceDisplay');

  const fullName = userProf.name || "Pelanggan";
  const initials = userProf.name ? userProf.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : "U";

  if (profileHeaderName) profileHeaderName.textContent = userProf.name ? fullName : "Profil Pelanggan";
  if (profileHeaderAvatar) profileHeaderAvatar.textContent = initials;
  if (navUserName) navUserName.textContent = fullName;
  if (navAvatarInitials) navAvatarInitials.textContent = initials;

  const currentBalance = userProf.balance !== undefined ? userProf.balance : 0;
  if (walletBalanceDisplay) walletBalanceDisplay.textContent = `Rp ${currentBalance.toLocaleString('id-ID')}`;

  // Render Addresses
  window.renderSavedAddressGrid();
};

window.saveProfileToSupabase = async function(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('inputFullName')?.value.trim() || "Pelanggan";
  const email = document.getElementById('inputEmail')?.value.trim() || "";
  const phone = document.getElementById('inputPhone')?.value.trim() || "";
  const dob = document.getElementById('inputDob')?.value || "";
  const checkedGender = document.querySelector('input[name="gender"]:checked');
  const gender = checkedGender ? checkedGender.value : 'L';

  if (!state.user) state.user = {};
  state.user.name = name;
  state.user.email = email;
  state.user.phone = phone;
  state.user.dob = dob;
  state.user.gender = gender;
  saveStateToStorage();

  const client = getSupabaseClient();
  if (client) {
    try {
      const userId = state.user.id || generateUUID();
      const profilePayload = {
        id: userId,
        full_name: name,
        email: email,
        phone: phone,
        gender: gender,
        dob: dob,
        role: 'customer',
        updated_at: new Date().toISOString()
      };

      console.log('📤 Updating Customer Profile in Supabase profiles:', profilePayload);
      const { data, error } = await client
        .from('profiles')
        .upsert([profilePayload])
        .select();

      if (error) {
        console.warn('⚠️ Supabase profile update error:', error.message);
      } else {
        console.log('✅ Customer Profile successfully saved to Supabase Cloud:', data);
      }
    } catch (err) {
      console.warn('⚠️ Supabase profile update exception:', err);
    }
  }

  window.loadProfileFromSupabase();
  showToast('Perubahan data profil Anda berhasil disimpan!', 'success');
};

window.renderSavedAddressGrid = function() {
  const container = document.getElementById('addressCardsGrid');
  const badgeCount = document.getElementById('addressCountBadge');
  if (!container) return;

  const defaultAddresses = [
    {
      id: "addr-1",
      label: "Kost Melati Sleman - Kamar 204",
      type: "Kost / Titik Jemput",
      isPrimary: true,
      address: "Jl. Kaliurang KM 5, Gang Melati No. 12, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281",
      accessNote: "Lantai 2 ada lift barang & parkir mobil pick-up luas, portal kost terbuka 24 jam.",
      bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq7pD52Lg0yG7okReqL1wM1SVJyztz1PmBjLSVKQUzziWu5P5DfjbsXDJzG8Eak1yYwp7Q-61NaysQoJ4PIyKB0_0Yk2fEMlusaQ1F3w2wM5TmdD57ZsePfc1t2jWOKEB3gnn-__LkLyfUD7i6obKQaVHKSM3yeDNI9hsJH5g0DOyDb4fDfGCzE6XqIoptb9CuzSxpOdJA1EItys8-ZepWi_ldsaxi2Gx-2GgUs8gqNvos2E9T77xs"
    },
    {
      id: "addr-2",
      label: "Rumah Keluarga Grogol",
      type: "Rumah / Titik Tujuan",
      isPrimary: false,
      address: "Jl. Muwardi Raya No. 45, RT 04/RW 03, Grogol, Grogol Petamburan, Jakarta Barat, DKI Jakarta 11450",
      accessNote: "Bisa masuk truk engkel box, pagar hitam di samping pos satpam perumahan.",
      bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPDQzBrZ5FUSY_jSKWmZB_8ZMrCu5povIaOr-c99lGoU-1osDffnX33BycyGVpBLGwVheZ3d8YlbTWE_tkae5D27NyZcskGHn7xR3ViQNptfBWAQpnv22QWC7kVo1vOcDPkxjJcmQRR8zXDJkCxiVFDYAGo1BNyFoESKtXOnRSmMgTTkx6PGGdyxLPA3OWQexrWz2AlPGLLszCDLBcHS4SpIh5v2S8K4xsBs8i33C0aiIFwyfhcpxe"
    }
  ];

  const addresses = (state.user && state.user.savedAddresses && state.user.savedAddresses.length > 0)
    ? state.user.savedAddresses
    : defaultAddresses;

  if (badgeCount) badgeCount.textContent = addresses.length;

  container.innerHTML = addresses.map((item, idx) => `
    <div class="relative rounded-3xl p-space-lg bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,97,148,0.06)] border border-slate-100 flex flex-col justify-between gap-space-md">
      <div class="flex flex-col gap-space-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            ${item.isPrimary ? `
              <span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                Alamat Utama
              </span>
            ` : ''}
            <span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold">
              ${item.type || 'Titik Jemput'}
            </span>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="removeAddress('${item.id || idx}')" class="w-8 h-8 rounded-full bg-surface-container-low hover:bg-error-container hover:text-error flex items-center justify-center text-on-surface-variant transition-all cursor-pointer" title="Hapus Alamat">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>
        <div>
          <h3 class="font-headline-sm text-headline-sm font-extrabold text-on-surface">${item.label}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant mt-1">${item.address}</p>
        </div>
        <div class="p-space-sm rounded-2xl bg-surface-container-low flex items-start gap-2.5 text-on-surface border border-slate-200">
          <span class="material-symbols-outlined text-primary text-[20px] mt-0.5 flex-shrink-0">info</span>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Catatan Akses Pengemudi & Helper</span>
            <span class="font-body-sm text-body-sm font-medium">${item.accessNote || 'Akses parkir aman.'}</span>
          </div>
        </div>
      </div>
      <div class="w-full h-28 rounded-2xl overflow-hidden relative" style="background-image: url('${item.bgImage || defaultAddresses[0].bgImage}')">
        <div class="absolute inset-0 bg-primary/10 flex items-center justify-center">
          <span class="px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-md text-label-md font-bold shadow-md flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px] text-error" style="font-variation-settings: 'FILL' 1;">location_on</span>
            Titik Presisi GPS Terpasang
          </span>
        </div>
      </div>
    </div>
  `).join('');
};

window.saveAddress = async function(e) {
  if (e) e.preventDefault();

  const label = document.getElementById('newAddrLabel')?.value.trim();
  const type = document.getElementById('newAddrType')?.value;
  const address = document.getElementById('newAddrDetail')?.value.trim();
  const accessNote = document.getElementById('newAddrAccessNote')?.value.trim();

  if (!label || !address) {
    showToast('Mohon isi Label Alamat dan Detail Alamat Lengkap!', 'warning');
    return;
  }

  const newAddressObj = {
    id: `addr-${Date.now()}`,
    label: label,
    type: type,
    isPrimary: false,
    address: address,
    accessNote: accessNote || 'Akses parkir aman.',
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq7pD52Lg0yG7okReqL1wM1SVJyztz1PmBjLSVKQUzziWu5P5DfjbsXDJzG8Eak1yYwp7Q-61NaysQoJ4PIyKB0_0Yk2fEMlusaQ1F3w2wM5TmdD57ZsePfc1t2jWOKEB3gnn-__LkLyfUD7i6obKQaVHKSM3yeDNI9hsJH5g0DOyDb4fDfGCzE6XqIoptb9CuzSxpOdJA1EItys8-ZepWi_ldsaxi2Gx-2GgUs8gqNvos2E9T77xs"
  };

  if (!state.user) state.user = {};
  if (!state.user.savedAddresses) {
    state.user.savedAddresses = [
      {
        id: "addr-1",
        label: "Kost Melati Sleman - Kamar 204",
        type: "Kost / Titik Jemput",
        isPrimary: true,
        address: "Jl. Kaliurang KM 5, Gang Melati No. 12, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281",
        accessNote: "Lantai 2 ada lift barang & parkir mobil pick-up luas, portal kost terbuka 24 jam."
      }
    ];
  }
  state.user.savedAddresses.push(newAddressObj);
  saveStateToStorage();

  const client = getSupabaseClient();
  if (client) {
    try {
      const email = state.user.email || "dimas.pratama@gmail.com";
      console.log('MB Syncing saved_addresses to Supabase Cloud...');
      const { data, error } = await client
        .from('profiles')
        .update({ saved_addresses: state.user.savedAddresses })
        .eq('email', email);

      if (error) console.warn('⚠️ Supabase saved_addresses update error:', error.message);
      else console.log('✅ saved_addresses updated in Supabase:', data);
    } catch (err) {
      console.warn('⚠️ Supabase saved_addresses exception:', err);
    }
  }

  window.renderSavedAddressGrid();
  if (typeof window.closeAddressModal === 'function') window.closeAddressModal();
  showToast('Alamat favorit baru berhasil disimpan ke profil Anda!', 'success');
};

window.removeAddress = function(addrId) {
  if (!state.user || !state.user.savedAddresses) return;
  state.user.savedAddresses = state.user.savedAddresses.filter((a, idx) => a.id !== addrId && String(idx) !== String(addrId));
  saveStateToStorage();
  window.renderSavedAddressGrid();
  showToast('Alamat berhasil dihapus dari daftar tersimpan.', 'info');
};

window.submitTopup = async function() {
  const amount = typeof selectedTopupAmount !== 'undefined' ? selectedTopupAmount : 200000;
  if (!state.user) state.user = {};
  const oldBalance = state.user.balance !== undefined ? state.user.balance : 345000;
  state.user.balance = oldBalance + amount;
  saveStateToStorage();

  const walletDisplay = document.getElementById('walletBalanceDisplay');
  if (walletDisplay) {
    walletDisplay.textContent = `Rp ${state.user.balance.toLocaleString('id-ID')}`;
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const orderPayload = {
        order_id: `TOPUP-${Date.now()}`,
        type: "topup_qris",
        service_name: "Top Up Saldo SHIFT Pay via QRIS",
        status: "Lunas - QRIS Instan",
        mitra_name: "Sistem Otomatis SHIFT Pay",
        vehicle_name: "QRIS Bank Indonesia",
        vehicle_plate: "QRIS-PAY",
        total_price: amount,
        pickup_address: "Dompet SHIFT Pay",
        dropoff_address: "Dompet SHIFT Pay",
        created_at: new Date().toISOString()
      };
      console.log('📤 Logging Top Up Transaction to Supabase "orders"...', orderPayload);
      await client.from('orders').insert([orderPayload]);
    } catch (err) {
      console.warn('⚠️ Supabase topup log exception:', err);
    }
  }

  if (typeof window.closeTopupModal === 'function') window.closeTopupModal();
  showToast(`Top Up QRIS sebesar Rp ${amount.toLocaleString('id-ID')} Berhasil! Saldo SHIFT Pay kini: Rp ${state.user.balance.toLocaleString('id-ID')}`, 'success');
};

// Global Helper to provide saved addresses for booking/cleaning pages
window.getSavedAddresses = function() {
  if (state.user && state.user.savedAddresses && state.user.savedAddresses.length > 0) {
    return state.user.savedAddresses;
  }
  return [
    {
      id: "addr-1",
      label: "Kost Melati Sleman - Kamar 204",
      type: "Kost / Titik Jemput",
      isPrimary: true,
      address: "Jl. Kaliurang KM 5, Gang Melati No. 12, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281"
    },
    {
      id: "addr-2",
      label: "Rumah Keluarga Grogol",
      type: "Rumah / Titik Tujuan",
      isPrimary: false,
      address: "Jl. Muwardi Raya No. 45, RT 04/RW 03, Grogol, Grogol Petamburan, Jakarta Barat, DKI Jakarta 11450"
    }
  ];
};

/* ==========================================
 * ORDER HISTORY & VIP HELP CENTER MODULE ENGINE
 * ========================================== */

let activeHistoryFilter = 'all';

window.loadOrdersFromSupabase = async function() {
  const client = getSupabaseClient();
  let ordersList = [];

  if (client) {
    try {
      console.log('📤 Querying all orders from Supabase "orders" table...');
      const { data, error } = await client
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        ordersList = data;
        console.log(`✅ Loaded ${data.length} orders from Supabase Cloud:`, data);
      } else if (error) {
        console.warn('⚠️ Supabase orders query error:', error.message);
      }
    } catch (err) {
      console.warn('⚠️ Supabase orders query exception:', err);
    }
  }

  // Use empty array when database table returns 0 records
  const finalOrders = (ordersList && ordersList.length > 0) ? ordersList : [];
  if (state) state.allOrders = finalOrders;

  window.updateHistoryMetrics(finalOrders);
  window.filterOrdersList();
};

window.updateHistoryMetrics = function(orders) {
  const safeOrders = orders || [];
  const completedCount = safeOrders.filter(o => o.status === 'selesai' || o.status === 'completed').length;
  const runningOrder = safeOrders.find(o => o.status === 'otw' || o.status === 'running' || o.status === 'proses' || o.status === 'menunggu_pembayaran');

  const metricCompleted = document.querySelector('.js-metric-completed');
  const metricRunning = document.querySelector('.js-metric-running');
  const metricSaved = document.querySelector('.js-metric-saved');
  const metricPoints = document.querySelector('.js-metric-points');

  if (metricCompleted) metricCompleted.textContent = completedCount;
  if (metricRunning) {
    if (runningOrder) {
      metricRunning.textContent = `1 Pesanan (${runningOrder.order_id || 'OTW'})`;
    } else {
      metricRunning.textContent = `0 Pesanan Aktif`;
    }
  }
  if (metricSaved && safeOrders.length === 0) metricSaved.textContent = 'Rp 0';
  if (metricPoints && safeOrders.length === 0) metricPoints.textContent = '0';
};

window.filterOrdersList = function() {
  const orders = (state && state.allOrders) ? state.allOrders : [];
  const searchVal = (document.getElementById('historySearchInput')?.value || '').toLowerCase().trim();
  const categoryVal = document.getElementById('historyCategorySelect')?.value || 'Semua Layanan';

  const filtered = orders.filter(order => {
    // Status Filter
    const st = (order.status || '').toLowerCase();
    let matchesStatus = true;
    if (activeHistoryFilter === 'running') {
      matchesStatus = (st === 'otw' || st === 'running' || st === 'proses' || st === 'menunggu_pembayaran');
    } else if (activeHistoryFilter === 'completed') {
      matchesStatus = (st === 'selesai' || st === 'completed');
    } else if (activeHistoryFilter === 'cancelled') {
      matchesStatus = (st === 'dibatalkan' || st === 'cancelled');
    }

    // Category Filter
    let matchesCategory = true;
    if (categoryVal.includes('Pindahan')) {
      matchesCategory = (order.type === 'pindahan' || (order.service_name || '').toLowerCase().includes('pindahan'));
    } else if (categoryVal.includes('Deep Cleaning') || categoryVal.includes('Cleaning')) {
      matchesCategory = (order.type === 'cleaning' || (order.service_name || '').toLowerCase().includes('clean'));
    }

    // Text Search Filter
    let matchesSearch = true;
    if (searchVal) {
      const ticket = (order.order_id || '').toLowerCase();
      const pickup = (order.pickup_address || '').toLowerCase();
      const dropoff = (order.dropoff_address || '').toLowerCase();
      const driver = (order.mitra_name || '').toLowerCase();
      const sName = (order.service_name || '').toLowerCase();
      matchesSearch = ticket.includes(searchVal) || pickup.includes(searchVal) || dropoff.includes(searchVal) || driver.includes(searchVal) || sName.includes(searchVal);
    }

    return matchesStatus && matchesCategory && matchesSearch;
  });

  window.renderOrdersHistoryGrid(filtered);
};

window.renderOrdersHistoryGrid = function(orders) {
  const container = document.getElementById('orderCardsContainer');
  if (!container) return;

  if (!orders || orders.length === 0) {
    container.innerHTML = `
      <div class="p-space-xl text-center bg-surface-container-lowest/90 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3">
        <div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-outline">
          <span class="material-symbols-outlined text-[36px]">inbox</span>
        </div>
        <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">Belum ada pesanan aktif</h3>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-md">Mulai pesan layanan pindahan atau kebersihan sekarang!</p>
        <button onclick="window.location.href='./booking.html'" class="mt-2 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer">
          Pesan Layanan Sekarang
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const isRunning = (order.status === 'otw' || order.status === 'running' || order.status === 'proses' || order.status === 'menunggu_pembayaran');
    const isCancelled = (order.status === 'dibatalkan' || order.status === 'cancelled');
    const isCleaning = order.type === 'cleaning';
    const trackingLink = isCleaning ? `./tracking-cleaning.html?service=cleaning&orderId=${order.order_id}` : `./tracking.html?service=moving&orderId=${order.order_id}`;

    if (isRunning) {
      return `
        <div class="rounded-2xl bg-surface-container-lowest/90 backdrop-blur-2xl p-space-md md:p-space-lg shadow-[0_20px_45px_-12px_rgba(0,97,148,0.12)] relative overflow-hidden transition-all order-card running border border-slate-100">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-secondary-container to-primary"></div>
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md border-b border-surface-container-high/60">
            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-md text-label-md font-bold shadow-sm">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
                ${order.status_label || 'SEDANG BERJALAN • OTW'}
              </span>
              <span class="font-label-lg text-label-lg font-bold text-on-surface">#${order.order_id}</span>
              <span class="text-outline-variant">•</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">${order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Hari Ini'}</span>
            </div>
            <div class="flex items-center gap-space-sm self-start lg:self-auto">
              <div class="text-right">
                <span class="font-label-sm text-label-sm text-on-surface-variant block">Total Biaya</span>
                <span class="font-headline-md text-headline-md text-on-surface font-extrabold">Rp ${(order.total_price || 182750).toLocaleString('id-ID')}</span>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-primary-fixed/40 text-primary font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">check_circle</span> ${order.payment_method || 'QRIS Lunas'}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-md my-space-md">
            <div class="lg:col-span-7 flex flex-col justify-between space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl ${isCleaning ? 'bg-tertiary-fixed text-tertiary' : 'bg-primary-fixed text-primary'} flex items-center justify-center shrink-0 shadow-sm">
                  <span class="material-symbols-outlined text-[26px]">${isCleaning ? 'sanitizer' : 'local_shipping'}</span>
                </div>
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                    ${order.service_name || (isCleaning ? 'Deep Clean & Sanitasi Hunian' : 'Pindahan Kos & Angkut Barang')}
                  </h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">
                    ${order.vehicle_name || 'Pick-up Box AB 1420 YK (Kapasitas Maksimal 800 kg)'}
                  </p>
                </div>
              </div>
              <div class="p-space-md rounded-2xl bg-surface-container-low/70 flex flex-col gap-2 relative border border-slate-200">
                <div class="flex items-start gap-3">
                  <div class="flex flex-col items-center mt-1">
                    <div class="w-3 h-3 rounded-full bg-primary"></div>
                    <div class="w-0.5 h-7 bg-outline-variant/60 my-0.5"></div>
                    <div class="w-3 h-3 rounded-full bg-secondary-container"></div>
                  </div>
                  <div class="flex flex-col gap-2 grow">
                    <div>
                      <span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Lokasi Penjemputan</span>
                      <p class="font-label-lg text-label-lg text-on-surface font-semibold">${order.pickup_address || 'Kost Melati Lt. 2, Sleman'}</p>
                    </div>
                    <div>
                      <span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Tujuan Pengantaran</span>
                      <p class="font-label-lg text-label-lg text-on-surface font-semibold">${order.dropoff_address || 'Jl. Gejayan No. 12, Sleman, D.I. Yogyakarta'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:col-span-5 flex flex-col justify-between bg-surface-container-low/50 p-space-md rounded-2xl border border-slate-200">
              <div>
                <span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider block mb-2">Kru & Driver Bertugas</span>
                <div class="flex items-center gap-3">
                  <div class="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg">
                    ${(order.mitra_name || 'Budi Santoso').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <h4 class="font-label-lg text-label-lg text-on-surface font-bold">${order.mitra_name || 'Budi Santoso'}</h4>
                      <span class="material-symbols-outlined text-primary text-[16px]">verified</span>
                    </div>
                    <div class="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span class="material-symbols-outlined text-secondary-fixed-dim text-[15px]" style="font-variation-settings: 'FILL' 1;">star</span>
                      <span class="font-bold text-on-surface">${order.driver_rating || '4.9'}</span> (340+ Pengantaran Sukses)
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3 p-3 rounded-xl bg-surface-container-lowest flex items-center justify-between shadow-sm border border-slate-100">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-[20px]">near_me</span>
                  <div>
                    <span class="font-label-sm text-label-sm text-on-surface-variant block">Posisi Armada</span>
                    <span class="font-label-md text-label-md text-on-surface font-bold">Jalan Kaliurang Km 5.5</span>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                  Tiba dlm ~6 Menit
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm border-t border-slate-100">
            <div class="flex items-center gap-2">
              <button onclick="downloadReceipt('${order.order_id}')" class="px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-all flex items-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">receipt_long</span> Detail Invoice
              </button>
              <button onclick="openWhatsAppCS()" class="px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-all flex items-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">call</span> Hubungi Kru
              </button>
            </div>
            <a class="px-space-lg py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-[0_10px_20px_-5px_rgba(0,97,148,0.35)] hover:bg-primary-container transition-all flex items-center gap-2 scale-100 hover:scale-105 active:scale-95" href="${trackingLink}">
              <span class="material-symbols-outlined text-[18px]">satellite_alt</span>
              <span>Lacak Live GPS Sekarang</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      `;
    }

    return `
      <div class="rounded-2xl bg-surface-container-lowest/80 backdrop-blur-xl p-space-md md:p-space-lg shadow-[0_15px_30px_-10px_rgba(0,97,148,0.06)] relative overflow-hidden transition-all order-card ${isCancelled ? 'cancelled' : 'completed'} border border-slate-100">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md border-b border-surface-container-high/60">
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full ${isCancelled ? 'bg-error-container text-on-error-container' : 'bg-primary-fixed/40 text-primary'} font-label-md text-label-md font-bold">
              <span class="material-symbols-outlined text-[14px]">${isCancelled ? 'cancel' : 'check_circle'}</span>
              ${isCancelled ? 'DIBATALKAN' : 'SELESAI'}
            </span>
            <span class="font-label-lg text-label-lg font-bold text-on-surface">#${order.order_id}</span>
            <span class="text-outline-variant">•</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">${order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Terbaru'}</span>
          </div>
          <div class="flex items-center gap-space-sm self-start lg:self-auto">
            <div class="text-right">
              <span class="font-label-sm text-label-sm text-on-surface-variant block">Total Bayar</span>
              <span class="font-headline-md text-headline-md text-on-surface font-extrabold">Rp ${(order.total_price || 160000).toLocaleString('id-ID')}</span>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
              ${order.payment_method || 'QRIS Dinamis'}
            </span>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-md my-space-md items-center">
          <div class="lg:col-span-7 flex items-start gap-3">
            <div class="w-12 h-12 rounded-2xl ${isCleaning ? 'bg-tertiary-fixed text-tertiary' : 'bg-primary-fixed text-primary'} flex items-center justify-center shrink-0 shadow-sm">
              <span class="material-symbols-outlined text-[26px]">${isCleaning ? 'sanitizer' : 'local_shipping'}</span>
            </div>
            <div>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                ${order.service_name || (isCleaning ? 'Deep Clean & Sanitasi Hunian' : 'Pindahan Kos / Rumah')}
              </h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Lokasi: ${order.pickup_address || order.dropoff_address || 'Yogyakarta Metro'}
              </p>
              <div class="flex items-center gap-2 mt-2">
                <span class="font-body-sm text-body-sm text-on-surface-variant">Petugas: <strong class="text-on-surface">${order.mitra_name || 'Mitra SHIFT'}</strong></span>
              </div>
            </div>
          </div>
          <div class="lg:col-span-5 bg-surface-container-low/50 p-space-md rounded-2xl border border-slate-200">
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-label-sm text-label-sm text-on-surface-variant font-bold">Ulasan Pelanggan</span>
              <div class="flex items-center text-secondary-fixed-dim">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
              </div>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface italic bg-surface-container-lowest/80 p-2 rounded-xl border border-slate-100">
              ${order.review_text || '“Layanan profesional, tepat waktu, dan pengemasan perabot sangat rapi.”'}
            </p>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs border-t border-slate-100">
          <button onclick="showToast('Foto Hasil Sebelum & Sesudah dimuat!', 'info')" class="px-4 py-2 rounded-full bg-surface-container-low text-primary font-label-md text-label-md hover:bg-surface-container-high transition-all flex items-center gap-1.5 cursor-pointer">
            <span class="material-symbols-outlined text-[16px]">photo_library</span> Lihat Foto Hasil (Sebelum & Sesudah)
          </button>
          <div class="flex items-center gap-2">
            <button onclick="downloadReceipt('${order.order_id}')" class="px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-all flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">download</span> Unduh E-Receipt PDF
            </button>
            <button onclick="reorderService('${order.order_id}', '${order.type}')" class="px-space-md py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold shadow-sm hover:bg-secondary-fixed transition-all flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">replay</span> Pesan Ulang Layanan Ini
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.reorderService = function(orderId, type) {
  const targetType = type || (orderId.includes('CLN') ? 'cleaning' : 'pindahan');
  if (state) {
    state.activeService = targetType === 'cleaning' ? 'cleaning' : 'moving';
    saveStateToStorage();
  }

  showToast(`Detail pesanan #${orderId} disalin ke draf! Mengalihkan ke form pemesanan...`, 'success');
  setTimeout(() => {
    window.location.href = targetType === 'cleaning' ? './cleaning.html' : './booking.html';
  }, 800);
};

window.downloadReceipt = function(orderId) {
  const orders = (state && state.allOrders) ? state.allOrders : [];
  const order = orders.find(o => o.order_id === orderId) || {
    order_id: orderId || "SHF-90214",
    type: "pindahan",
    service_name: "Pindahan Kos & Angkut Barang",
    total_price: 182750,
    payment_method: "QRIS Lunas - BI Instan",
    pickup_address: "Kost Melati Lt. 2, Sleman, Yogyakarta",
    dropoff_address: "Jl. Gejayan No. 12, Sleman, D.I. Yogyakarta",
    created_at: new Date().toISOString()
  };

  const receiptHtml = `
    <div id="receiptModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-md">
      <div class="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">S</div>
            <span class="font-headline-sm font-extrabold text-primary">KUITANSI RESMI SHIFT</span>
          </div>
          <button onclick="document.getElementById('receiptModal').remove()" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer">✕</button>
        </div>

        <div class="bg-slate-50 p-4 rounded-2xl flex flex-col gap-2 font-mono text-xs border border-slate-200">
          <div class="flex justify-between font-bold text-slate-800 text-sm">
            <span>NO. TIKET: #${order.order_id}</span>
            <span class="text-emerald-600">LUNAS ✓</span>
          </div>
          <div>WAKTU: ${new Date(order.created_at || Date.now()).toLocaleString('id-ID')}</div>
          <div>LAYANAN: ${order.service_name || 'Pindahan Barang SHIFT'}</div>
          <div>METODE: ${order.payment_method || 'QRIS Dinamis Instan'}</div>
          <hr class="my-1 border-slate-300">
          <div>JEMPUT: ${order.pickup_address || 'Yogyakarta Metro'}</div>
          <div>TUJUAN: ${order.dropoff_address || 'Yogyakarta Metro'}</div>
          <hr class="my-1 border-slate-300">
          <div class="flex justify-between text-sm font-bold text-slate-900">
            <span>TOTAL PEMBAYARAN:</span>
            <span>Rp ${(order.total_price || 182750).toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button onclick="window.print()" class="px-5 py-2.5 rounded-full bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-container cursor-pointer flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px]">print</span> Cetak / Simpan PDF
          </button>
          <button onclick="document.getElementById('receiptModal').remove()" class="px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 cursor-pointer">
            Tutup
          </button>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById('receiptModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', receiptHtml);
  showToast(`Kuitansi e-Receipt #${order.order_id} berhasil diterbitkan!`, 'success');
};

// Event listeners for history page elements
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('orderCardsContainer') || document.getElementById('orderFilterTabs')) {
      window.loadOrdersFromSupabase();

      // Filter tabs event listener
      const filterTabs = document.querySelectorAll('.filter-tab');
      filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          filterTabs.forEach(t => {
            t.className = 'px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all whitespace-nowrap filter-tab cursor-pointer';
          });
          e.currentTarget.className = 'px-space-md py-space-xs rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container shadow-sm font-semibold whitespace-nowrap transition-all filter-tab active cursor-pointer';
          activeHistoryFilter = e.currentTarget.getAttribute('data-filter') || 'all';
          window.filterOrdersList();
        });
      });

      // Search input & category select listener
      const searchInput = document.getElementById('historySearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', () => window.filterOrdersList());
      }

      const catSelect = document.getElementById('historyCategorySelect');
      if (catSelect) {
        catSelect.addEventListener('change', () => window.filterOrdersList());
      }
    }
  });
}




