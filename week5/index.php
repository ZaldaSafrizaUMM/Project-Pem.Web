<?php
/*
 * =========================================================================
 * IMPLEMENTASI WEEK 5 (SPRINT 04) - SERVER-SIDE PHP PROCEDURAL (APLIKASI SHIFT)
 * - Week 5 Task 01: Create PHP Page (Basic Syntax, Variable & Echo Output)
 * - Week 5 Task 02: Process Data with PHP (Variable, Array, Conditional, Loop & Function)
 * - Week 5 Task 03: Build Dynamic Server-Side Content (PHP Menghasilkan HTML Dinamis)
 * =========================================================================
 */

// =========================================================================
// WEEK 5 - TASK 01: Create PHP Page (Deklarasi Variable & Basic Syntax PHP)
// Menyimpan data informasi utama aplikasi SHIFT di dalam variabel PHP
// =========================================================================
$appName            = "SHIFT (Siap Hadir, Instan, Fleksibel, Tuntas)";
$coordinatorName    = "Tim Operasional SHIFT Indonesia";
$operationalPeriod  = "2025 - 2026 (Layanan Aktif 24/7)";
$systemStatus       = "active";

// Variabel Konfigurasi & Data Metadata Pendukung Aplikasi SHIFT
$appShortName        = "SHIFT";
$appTagline          = "Solusi Pindahan & Deep Cleaning Terpadu Indonesia";
$appVersion          = "v2.5-Sprint04";
$companyName         = "PT Siap Hadir Fleksibel Tuntas";
$currentYear         = date("Y");
$baseDiscountPercent = 15;
$csHotline           = "+62 812-3456-7890";
$operationalCoverage = "Jabodetabek, Bandung, Semarang, Surabaya, & D.I. Yogyakarta";

// =========================================================================
// WEEK 5 - TASK 02: Process Data with PHP (Function, Conditional & Array)
// Memproses status operasional dan daftar layanan prioritas sebelum ditampilkan
// =========================================================================

/**
 * Memeriksa status operasional menggunakan struktur kendali kondisi (if conditional)
 * Mengembalikan status "Berjalan" atau "Tidak Aktif"
 * 
 * @param string $status
 * @return string
 */
function getServiceStatus($status) {
    if ($status === "active") {
        return "Berjalan";
    } else {
        return "Tidak Aktif";
    }
}

/**
 * Array PHP: Koleksi Data Layanan Prioritas SHIFT
 * Berisi nomor, judul, deskripsi, ikon Material Symbols, harga mulai, dan link halaman pemesanan
 */
$priorityServices = [
    [
        "nomor" => 1,
        "judul" => "Jasa Pindahan Kos & Rumah (Moving & Armada)",
        "deskripsi" => "Layanan pindahan praktis untuk kamar kos, apartemen, kontrakan, hingga rumah keluarga dengan opsi armada motor kargo, pick-up bak/box, hingga truk engkel serta live GPS.",
        "ikon" => "local_shipping",
        "harga_mulai" => "Rp 50.000",
        "link" => "./booking.html?service=moving",
        "badge" => "Armada Siap 24/7",
        "badge_color" => "bg-primary-fixed/60 text-primary",
        "icon_bg" => "bg-primary-fixed/60 text-primary group-hover:bg-primary group-hover:text-on-primary",
        "hover_text" => "group-hover:text-primary",
        "button_text" => "Pesan Jasa Pindahan",
        "button_class" => "bg-primary hover:bg-primary-container text-on-primary",
        "action_onclick" => "selectServiceCategory('moving')"
    ],
    [
        "nomor" => 2,
        "judul" => "Jasa Deep Cleaning & Sanitasi Ruangan",
        "deskripsi" => "Pembersihan intensif hunian, sterilisasi lampu UV-C, hydro-vacuum tungau kasur/sofa, pembersihan kerak toilet, dan disinfeksi ruangan higienis ramah lingkungan.",
        "ikon" => "cleaning_services",
        "harga_mulai" => "Rp 85.000",
        "link" => "./cleaning.html",
        "badge" => "Steril UV-C & Eco-Clean",
        "badge_color" => "bg-secondary-container text-on-secondary-container",
        "icon_bg" => "bg-secondary-fixed/60 text-on-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container",
        "hover_text" => "group-hover:text-secondary",
        "button_text" => "Pesan Deep Cleaning",
        "button_class" => "bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-extrabold",
        "action_onclick" => "selectServiceCategory('cleaning')"
    ],
    [
        "nomor" => 3,
        "judul" => "Kru Angkut & Helper Profesional",
        "deskripsi" => "Bantuan tenaga kerja profesional untuk proses angkut perabotan berat, bongkar pasang furniture, packing kardus bubble wrap protektif, dan penataan rapi di tempat baru.",
        "ikon" => "engineering",
        "harga_mulai" => "Rp 40.000",
        "link" => "./booking.html?service=moving&type=helper",
        "badge" => "Kru Terlatih & Terverifikasi",
        "badge_color" => "bg-tertiary-fixed text-on-tertiary-fixed-variant",
        "icon_bg" => "bg-tertiary-fixed/60 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary",
        "hover_text" => "group-hover:text-tertiary",
        "button_text" => "Pesan Kru Angkut",
        "button_class" => "bg-tertiary hover:bg-tertiary-container text-on-tertiary font-bold",
        "action_onclick" => "selectServiceCategory('moving')"
    ]
];

/**
 * Format integer ke format mata uang Rupiah
 * @param int|float $number
 * @return string
 */
function formatRupiahPHP($number) {
    return "Rp " . number_format($number, 0, ',', '.');
}

/**
 * Mendapatkan ucapan waktu dinamis berdasarkan jam sistem server
 * @return string
 */
function getGreetingTimePHP() {
    $jam = (int)date('H');
    if ($jam >= 4 && $jam < 11) {
        return "Selamat Pagi";
    } elseif ($jam >= 11 && $jam < 15) {
        return "Selamat Siang";
    } elseif ($jam >= 15 && $jam < 18) {
        return "Selamat Sore";
    } else {
        return "Selamat Malam";
    }
}

// Status Label & Indikator Pulse Sistem Server
$systemStatusLabel = ($systemStatus === "active") 
    ? "Ekosistem Logistik & Sanitasi Terpadu {$appVersion} (Status: " . getServiceStatus($systemStatus) . ")"
    : "Pemeliharaan Server Berkala {$appVersion} (Status: " . getServiceStatus($systemStatus) . ")";
$systemStatusPulse = ($systemStatus === "active") ? "bg-emerald-500 animate-pulse" : "bg-amber-500";
$promoBannerText = "Hemat s.d 15% untuk Pemesanan via Online Hari Ini!";

// Keunggulan & Trust Badges
$trustBadges = [
    ["title" => "Asuransi 100%", "subtitle" => "Barang Aman Terjamin", "icon" => "verified", "color" => "bg-primary-fixed/50 text-primary"],
    ["title" => "Lacak GPS Live", "subtitle" => "Pantau Real-Time", "icon" => "my_location", "color" => "bg-secondary-fixed/50 text-secondary"],
    ["title" => "Mitra Terlatih", "subtitle" => "Driver & Helper Handal", "icon" => "badge", "color" => "bg-tertiary-fixed/50 text-tertiary"],
    ["title" => "Tarif Presisi", "subtitle" => "Tanpa Biaya Tersembunyi", "icon" => "savings", "color" => "bg-emerald-100 text-emerald-800"]
];

// Fitur Keunggulan Utama (Why Choose Us)
$whyChooseFeatures = [
    [
        "icon" => "calculate",
        "icon_color" => "bg-primary-fixed/50 text-primary",
        "title" => "Kalkulasi GPS Transparan",
        "description" => "Harga dihitung otomatis dari rute km presisi. Tidak ada biaya siluman di lokasi."
    ],
    [
        "icon" => "verified",
        "icon_color" => "bg-secondary-fixed/50 text-secondary",
        "title" => "Garansi & Asuransi 100%",
        "description" => "Jaminan penggantian jika barang rusak atau hasil pembersihan kurang memuaskan."
    ],
    [
        "icon" => "map",
        "icon_color" => "bg-tertiary-fixed/50 text-tertiary",
        "title" => "Pelacakan Live GPS",
        "description" => "Pantau pergerakan armada driver atau jadwal kedatangan cleaner secara langsung."
    ],
    [
        "icon" => "support_agent",
        "icon_color" => "bg-emerald-100 text-emerald-800",
        "title" => "Mitra Terlatih & CS 24/7",
        "description" => "Driver, helper, & cleaner tersertifikasi dengan dukungan CS WhatsApp 24 jam."
    ]
];
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta content="web_standard" name="shell-type"/>
  <!-- WEEK 5 - TASK 06: Dynamic HTML Output untuk Judul Halaman -->
  <title><?= $appName ?> - <?= $appTagline ?></title>
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
  
  <style>
    @layer base {
      html, body { margin: 0; padding: 0; }
      body { overscroll-behavior: none; }
      main > :first-child { margin-top: 0 !important; }
      main > :last-child { margin-bottom: 0 !important; }
    }
    ::-webkit-scrollbar { display: none; }
  </style>
  
  <!-- Tailwind CSS CDN & Custom Configuration (Soft UI System Preserved) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "on-error": "#ffffff",
            "on-tertiary-container": "#fcfcff",
            "surface-container-low": "#f2f3ff",
            "on-secondary-fixed": "#231b00",
            "tertiary-fixed-dim": "#7bd0ff",
            "on-primary-fixed-variant": "#004b73",
            "surface-dim": "#d2d9f4",
            "surface-container-highest": "#dae2fd",
            "background": "#faf8ff",
            "outline-variant": "#bfc7d2",
            "surface-tint": "#006398",
            "on-tertiary-fixed-variant": "#004c69",
            "secondary-fixed-dim": "#eec200",
            "surface-container": "#eaedff",
            "on-secondary-fixed-variant": "#574500",
            "error-container": "#ffdad6",
            "secondary": "#735c00",
            "on-tertiary": "#ffffff",
            "on-primary": "#ffffff",
            "inverse-primary": "#93ccff",
            "surface-container-high": "#e2e7ff",
            "on-secondary": "#ffffff",
            "on-surface": "#131b2e",
            "on-secondary-container": "#6f5900",
            "inverse-on-surface": "#eef0ff",
            "outline": "#707881",
            "on-background": "#131b2e",
            "secondary-container": "#fed01b",
            "primary-fixed": "#cce5ff",
            "tertiary-fixed": "#c4e7ff",
            "inverse-surface": "#283044",
            "on-primary-container": "#fdfcff",
            "tertiary": "#006387",
            "surface-bright": "#faf8ff",
            "on-tertiary-fixed": "#001e2c",
            "primary-container": "#007bb9",
            "primary": "#006194",
            "tertiary-container": "#007da9",
            "primary-fixed-dim": "#93ccff",
            "error": "#ba1a1a",
            "surface-container-lowest": "#ffffff",
            "surface-variant": "#dae2fd",
            "on-error-container": "#93000a",
            "surface": "#faf8ff",
            "on-primary-fixed": "#001d31",
            "on-surface-variant": "#3f4850",
            "secondary-fixed": "#ffe083"
          },
          borderRadius: {
            "DEFAULT": "1rem",
            "lg": "2rem",
            "xl": "3rem",
            "full": "9999px"
          },
          spacing: {
            "space-md": "1rem",
            "space-xs": "0.25rem",
            "margin": "2rem",
            "margin-mobile": "1rem",
            "gutter": "1.5rem",
            "space-sm": "0.5rem",
            "space-lg": "1.5rem",
            "space-xl": "2.5rem",
            "gutter-mobile": "1rem"
          },
          fontFamily: {
            "headline-sm": ["Plus Jakarta Sans"],
            "label-md": ["Plus Jakarta Sans"],
            "display-mobile": ["Plus Jakarta Sans"],
            "body-lg": ["Plus Jakarta Sans"],
            "headline-lg": ["Plus Jakarta Sans"],
            "headline-md": ["Plus Jakarta Sans"],
            "label-lg": ["Plus Jakarta Sans"],
            "body-md": ["Plus Jakarta Sans"],
            "body-sm": ["Plus Jakarta Sans"],
            "headline-xl": ["Plus Jakarta Sans"],
            "label-sm": ["Plus Jakarta Sans"],
            "display": ["Plus Jakarta Sans"],
            "headline-xl-mobile": ["Plus Jakarta Sans"]
          }
        }
      }
    };
  </script>
</head>
<body class="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col overflow-x-hidden">

  <!-- Header Navbar with Sticky Blur -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-100">
    <div class="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
      
      <!-- Brand Logo -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <a class="flex items-center gap-2 group shrink-0" href="./index.php">
          <div class="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,97,148,0.25)] shrink-0">
            <span class="material-symbols-outlined text-[24px]">local_shipping</span>
          </div>
          <div class="flex flex-col min-w-0 max-w-[130px] sm:max-w-[200px]">
            <span class="font-headline-sm text-sm sm:text-base font-extrabold text-primary tracking-tight truncate leading-tight">SHIFT</span>
            <span class="font-label-sm text-[10px] sm:text-xs text-on-surface-variant font-semibold uppercase tracking-wider truncate">Pindah &amp; Bersih</span>
          </div>
        </a>
        <div class="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/60 shrink-0">
          <span class="material-symbols-outlined text-primary text-[15px]">verified_user</span>
          <span class="font-label-sm text-xs text-on-surface-variant font-medium">SSL Terenkripsi</span>
        </div>
      </div>

      <!-- Main Navigation Links (Desktop) -->
      <nav class="hidden md:flex items-center gap-1.5 bg-surface-container-low/80 p-1.5 rounded-full shadow-[0_0_1px_rgba(2,132,199,0.05)]">
        <a aria-current="page" class="px-4 py-1.5 transition-colors bg-surface-container-high text-on-surface font-semibold rounded-full text-xs sm:text-sm" href="./index.php">Beranda</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="./layanan.php">Katalog Layanan</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer" onclick="selectServiceCategory('moving')">Layanan Pindahan</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer" onclick="selectServiceCategory('cleaning')">Layanan Deep Clean</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="./history.html">Riwayat &amp; Bantuan</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-primary font-bold hover:bg-primary-fixed/40 transition-colors" href="./mitra.html">Portal Mitra</a>
      </nav>

      <!-- Right Action Controls (CS Button, Dynamic Auth Header Nav & Mobile Hamburger) -->
      <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <a class="hidden sm:flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-all text-on-surface text-xs sm:text-sm font-semibold" href="#" onclick="if(typeof openWhatsAppCS==='function') openWhatsAppCS();">
          <span class="material-symbols-outlined text-primary text-[18px]">support_agent</span>
          <span class="hidden lg:inline">Bantuan 24/7</span>
        </a>
        
        <!-- Dynamic Header Nav Container: Renders 'Masuk' & 'Daftar' when logged out, or profile avatar when logged in -->
        <div id="authHeaderNav" class="flex items-center gap-1.5">
          <!-- Populated by app.js renderAuthHeaderNav() -->
        </div>

        <!-- Mobile Menu Hamburger Button -->
        <button id="mobileMenuBtn" type="button" class="md:hidden w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-all cursor-pointer shrink-0" aria-label="Buka Menu Navigasi" onclick="toggleMobileNav()">
          <span id="mobileMenuIcon" class="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer / Dropdown -->
    <div id="mobileNavMenu" class="hidden md:hidden border-t border-slate-100 bg-surface/95 backdrop-blur-2xl px-4 py-4 shadow-xl flex flex-col gap-2 transition-all duration-300">
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm transition-colors bg-primary-fixed/50 text-primary font-bold flex items-center gap-2" href="./index.php">
        <span class="material-symbols-outlined text-[20px]">home</span> Beranda
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2" href="./layanan.php">
        <span class="material-symbols-outlined text-[20px]">category</span> Katalog Layanan
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-pointer" onclick="toggleMobileNav(); selectServiceCategory('moving');">
        <span class="material-symbols-outlined text-[20px]">local_shipping</span> Layanan Pindahan
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-pointer" onclick="toggleMobileNav(); selectServiceCategory('cleaning');">
        <span class="material-symbols-outlined text-[20px]">cleaning_services</span> Layanan Deep Clean
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2" href="./history.html">
        <span class="material-symbols-outlined text-[20px]">history</span> Riwayat &amp; Bantuan
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-primary font-bold hover:bg-primary-fixed/40 transition-colors flex items-center gap-2" href="./mitra.html">
        <span class="material-symbols-outlined text-[20px]">badge</span> Portal Mitra
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-2" href="#" onclick="if(typeof openWhatsAppCS==='function') openWhatsAppCS();">
        <span class="material-symbols-outlined text-primary text-[20px]">support_agent</span> Bantuan CS WhatsApp 24/7
      </a>
    </div>
  </header>

  <!-- Main View Container -->
  <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex flex-col gap-8 sm:gap-12">
    
    <!-- HERO BANNER SECTION -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-surface-container-lowest via-surface-container-low/70 to-surface-container/40 p-4 sm:p-8 md:p-12 border border-slate-100 shadow-xl">
      <div class="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-primary-fixed blur-3xl opacity-40 pointer-events-none"></div>
      <div class="absolute top-1/2 -right-32 w-72 sm:w-[32rem] h-72 sm:h-[32rem] rounded-full bg-tertiary-fixed blur-3xl opacity-35 pointer-events-none"></div>
      <div class="absolute -bottom-20 left-1/3 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-secondary-fixed blur-3xl opacity-20 pointer-events-none"></div>

      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center py-2 sm:py-4">
        
        <!-- Live Status Pill (Dynamic Output PHP) -->
        <div class="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-2xl sm:rounded-full bg-surface-container-high/90 backdrop-blur-md shadow-sm mb-4 border border-slate-200/70 max-w-full text-center">
          <span class="inline-flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full <?= $systemStatusPulse ?>"></span>
            <span class="text-xs sm:text-sm text-primary tracking-wide uppercase font-extrabold break-words"><?= $systemStatusLabel ?></span>
          </span>
          <span class="hidden sm:inline text-outline-variant font-body-sm text-body-sm">•</span>
          <span class="text-xs sm:text-sm text-on-surface-variant font-bold break-words"><?= getGreetingTimePHP() ?>! <?= $promoBannerText ?></span>
        </div>

        <!-- Main Headline -->
        <h1 class="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight font-extrabold leading-tight break-words">
          Solusi <span class="text-primary bg-clip-text">Pindahan Barang</span> &amp; <span class="text-secondary bg-clip-text">Deep Cleaning</span> Paling Praktis
        </h1>
        
        <p class="text-sm sm:text-base md:text-lg text-on-surface-variant mt-3 max-w-2xl leading-relaxed break-words">
          Pesan armada angkut (Pickup, Box, Truk Engkel) atau teknisi spesialis deep clean hunian dalam hitungan detik. Melayani area <span class="font-bold text-on-surface"><?= $operationalCoverage ?></span> dengan tarif presisi kalkulasi GPS.
        </p>

        <!-- Main Hero CTA Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 w-full justify-center max-w-md">
          <button onclick="selectServiceCategory('moving')" type="button" class="w-full sm:w-auto px-6 py-3.5 rounded-full bg-primary hover:bg-primary-container text-on-primary text-sm sm:text-base font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined text-[20px] sm:text-[22px]">local_shipping</span>
            <span>Pesan Jasa Pindahan</span>
          </button>

          <button onclick="selectServiceCategory('cleaning')" type="button" class="w-full sm:w-auto px-6 py-3.5 rounded-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container text-sm sm:text-base font-bold shadow-lg shadow-secondary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined text-[20px] sm:text-[22px]">cleaning_services</span>
            <span>Pesan Deep Cleaning</span>
          </button>
        </div>

        <!-- ========================================================================= -->
        <!-- WEEK 5 - TASK 01: Create PHP Page (Echo Output Informasi Utama SHIFT)     -->
        <!-- Menampilkan data aplikasi, koordinator, periode, dan status dengan echo    -->
        <!-- ========================================================================= -->
        <div class="w-full max-w-3xl mt-6 p-4 sm:p-6 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md border border-slate-200/80 text-left">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[20px]">info</span>
              </div>
              <div class="min-w-0">
                <span class="text-sm sm:text-base font-bold text-on-surface truncate block">Informasi Utama Aplikasi SHIFT</span>
                <span class="block text-xs text-on-surface-variant font-medium">Server-Side Data Output (Sprint 04 - Week 5)</span>
              </div>
            </div>
            <div class="flex items-center gap-2 bg-surface-container-high/60 px-3 py-1.5 rounded-full self-start sm:self-auto shrink-0">
              <span class="text-xs text-on-surface-variant font-medium">Status Operasional:</span>
              <span class="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <?php echo getServiceStatus($systemStatus); ?>
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-3">
            <div class="flex flex-col min-w-0">
              <span class="text-xs text-on-surface-variant font-medium">Nama Resmi Aplikasi:</span>
              <span class="text-xs sm:text-sm md:text-base font-extrabold text-primary leading-tight mt-0.5 break-words">
                <?php echo $appName; ?>
              </span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-xs text-on-surface-variant font-medium">Koordinator Operasional:</span>
              <span class="text-xs sm:text-sm md:text-base font-bold text-on-surface leading-tight mt-0.5 break-words">
                <?php echo $coordinatorName; ?>
              </span>
            </div>
            <div class="flex flex-col min-w-0 sm:col-span-2 md:col-span-1">
              <span class="text-xs text-on-surface-variant font-medium">Periode &amp; Jam Layanan:</span>
              <span class="text-xs sm:text-sm md:text-base font-bold text-secondary leading-tight mt-0.5 break-words">
                <?php echo $operationalPeriod; ?>
              </span>
            </div>
          </div>
        </div>

        <!-- Keunggulan & Trust Badges Section -->
        <!-- Merender koleksi keunggulan secara terstruktur dari Array PHP             -->
        <!-- ========================================================================= -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-8 pt-6 border-t border-slate-200/60 w-full text-left">
          <?php foreach ($trustBadges as $badge): ?>
          <div class="flex items-center gap-2.5 p-2.5 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm border border-slate-100 min-w-0">
            <div class="w-9 h-9 rounded-xl <?= $badge['color'] ?> flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px]"><?= $badge['icon'] ?></span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-xs sm:text-sm text-on-surface font-extrabold truncate"><?= $badge['title'] ?></span>
              <span class="text-[11px] text-on-surface-variant truncate"><?= $badge['subtitle'] ?></span>
            </div>
          </div>
          <?php endforeach; ?>
        </div>

      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- WEEK 5 - TASK 03: Build Dynamic Server-Side Content                       -->
    <!-- Menghasilkan kartu layanan HTML secara dinamis menggunakan foreach PHP     -->
    <!-- ========================================================================= -->
    <section class="flex flex-col gap-4 sm:gap-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
        <div>
          <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Katalog Layanan Prioritas SHIFT</span>
          <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1 break-words">
            Pilihan Layanan Prioritas Siap Dipesan
          </h2>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <?php foreach ($priorityServices as $service) : ?>
        <!-- KARTU LAYANAN PRIORITAS #0<?php echo $service['nomor']; ?> (DYNAMIC PHP FOREACH) -->
        <div class="group relative rounded-3xl bg-surface-container-lowest/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-slate-100 overflow-hidden">
          
          <div class="flex flex-col gap-4 relative z-10">
            <!-- Header Kartu: Ikon Material Symbols, Nomor Prioritas, dan Status Badge -->
            <div class="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl <?php echo $service['icon_bg']; ?> flex items-center justify-center shadow-inner transition-colors duration-300 shrink-0">
                <span class="material-symbols-outlined text-[28px] sm:text-[32px]"><?php echo $service['ikon']; ?></span>
              </div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold">
                  #0<?php echo $service['nomor']; ?>
                </span>
                <span class="px-2.5 py-1 rounded-full <?php echo $service['badge_color']; ?> text-xs font-extrabold uppercase tracking-wider">
                  <?php echo $service['badge']; ?>
                </span>
              </div>
            </div>

            <!-- Konten: Judul & Deskripsi Lengkap Layanan -->
            <div>
              <span class="text-xs font-extrabold text-primary uppercase tracking-wider">Layanan Prioritas #0<?php echo $service['nomor']; ?></span>
              <h3 class="text-lg sm:text-xl text-on-surface font-extrabold <?php echo $service['hover_text']; ?> transition-colors mt-0.5 break-words">
                <?php echo $service['judul']; ?>
              </h3>
              <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-2 line-clamp-3">
                <?php echo $service['deskripsi']; ?>
              </p>
            </div>

            <!-- Tarif Mulai Dari -->
            <div class="p-3 sm:p-3.5 rounded-2xl bg-surface-container-low/70 border border-slate-100 flex items-center justify-between gap-2 flex-wrap">
              <div class="flex flex-col min-w-0">
                <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Tarif Mulai Dari</span>
                <span class="text-base sm:text-lg font-extrabold text-primary"><?php echo $service['harga_mulai']; ?></span>
              </div>
              <span class="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                <span class="material-symbols-outlined text-[14px]">verified</span> Terverifikasi
              </span>
            </div>
          </div>

          <!-- Tombol Aksi Menuju Link Pemesanan -->
          <div class="pt-4 mt-4 border-t border-slate-100 relative z-10">
            <a href="<?php echo $service['link']; ?>" onclick="<?php echo $service['action_onclick']; ?>; return false;" class="w-full py-3 sm:py-3.5 px-4 rounded-full <?php echo $service['button_class']; ?> text-xs sm:text-sm font-bold flex items-center justify-between shadow-md transition-all cursor-pointer">
              <span class="truncate pr-2"><?php echo $service['button_text']; ?></span>
              <span class="w-7 h-7 rounded-full bg-current/15 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </span>
            </a>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- SEKSI KEUNGGULAN SHIFT (WHY CHOOSE US) -->
    <section class="rounded-3xl bg-surface-container-low/60 p-5 sm:p-8 md:p-10 border border-slate-100 flex flex-col gap-6">
      <div class="text-center max-w-2xl mx-auto px-2">
        <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Mengapa Memilih SHIFT?</span>
        <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1 break-words">
          Standar Layanan Logistik &amp; Sanitasi Terbaik
        </h2>
      </div>

      <!-- Render Fitur Keunggulan menggunakan Loop PHP foreach -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <?php foreach ($whyChooseFeatures as $feature): ?>
        <div class="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-slate-100 flex flex-col gap-2 min-w-0">
          <div class="w-10 h-10 rounded-xl <?= $feature['icon_color'] ?> flex items-center justify-center font-bold shrink-0">
            <span class="material-symbols-outlined text-[22px]"><?= $feature['icon'] ?></span>
          </div>
          <h4 class="text-sm sm:text-base text-on-surface font-bold break-words"><?= $feature['title'] ?></h4>
          <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed"><?= $feature['description'] ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- SEKSI GERBANG MITRA KERJA (JOIN PARTNER SECTION) -->
    <section class="rounded-3xl bg-gradient-to-r from-surface-container-lowest via-surface-container-low to-secondary-fixed/30 p-5 sm:p-8 md:p-10 border border-slate-100 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0 max-w-full">
        <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-md">
          <span class="material-symbols-outlined text-[32px] sm:text-[36px]">engineering</span>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-xs sm:text-sm text-secondary font-extrabold uppercase tracking-wider">Peluang Karir Profesional</span>
          <h3 class="text-lg sm:text-xl md:text-2xl text-on-surface font-extrabold leading-tight mt-1 break-words">
            Ingin Bergabung Sebagai Mitra SHIFT?
          </h3>
          <p class="text-xs sm:text-sm md:text-base text-on-surface-variant mt-1.5 leading-relaxed break-words">
            Daftarkan diri Anda sebagai Mitra Driver Armada, Helper Angkut, atau Spesialis Deep Clean. Nikmati penghasilan harian menarik &amp; jadwal kerja fleksibel.
          </p>
        </div>
      </div>

      <a href="./auth.html?path=mitra-registration" class="w-full md:w-auto px-6 py-3.5 rounded-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container text-sm sm:text-base font-extrabold shadow-md transition-all shrink-0 cursor-pointer text-center flex items-center justify-center gap-2">
        <span>Daftar Mitra SHIFT Sekarang</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </a>
    </section>

  </main>

  <!-- Footer Modern (Dynamic Output PHP) -->
  <footer class="bg-surface-container-lowest border-t border-slate-100 py-6 mt-auto">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant text-xs sm:text-sm text-center sm:text-left">
      <div class="flex flex-col sm:flex-row items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
          <span class="material-symbols-outlined text-[14px]">local_shipping</span>
        </div>
        <span class="font-bold text-on-surface"><?= $appName ?> Platform <?= $appVersion ?></span>
        <span class="text-slate-400 hidden sm:inline">•</span>
        <span>© <?= $currentYear ?> <?= $companyName ?>. All Rights Reserved.</span>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a href="./auth.html?path=role-selection" class="hover:text-primary transition-colors font-semibold">Portal Akses</a>
        <a href="./history.html" class="hover:text-primary transition-colors font-semibold">Pusat Bantuan</a>
        <a href="#" onclick="openWhatsAppCS()" class="hover:text-primary transition-colors font-semibold">Hubungi CS (<?= $csHotline ?>)</a>
      </div>
    </div>
  </footer>

  <!-- Script Helper for Mobile Nav -->
  <script>
    function toggleMobileNav() {
      const menu = document.getElementById('mobileNavMenu');
      const icon = document.getElementById('mobileMenuIcon');
      if (!menu) return;
      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
        if (icon) icon.textContent = 'close';
      } else {
        menu.classList.add('hidden');
        if (icon) icon.textContent = 'menu';
      }
    }
  </script>

  <!-- Supabase JS SDK CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <!-- Central Shift Core Data Handler -->
  <script src="./src/shift-core.js"></script>
  <!-- App Dynamic Engine Script -->
  <script src="./src/app.js"></script>
</body>
</html>
