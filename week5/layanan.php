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
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta content="web_standard" name="shell-type"/>
  <title><?= $appName ?> - Katalog Layanan Prioritas</title>
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
  
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
            <span class="font-label-sm text-[10px] sm:text-xs text-on-surface-variant font-semibold uppercase tracking-wider truncate">Katalog Layanan</span>
          </div>
        </a>
      </div>

      <!-- Main Navigation Links (Desktop) -->
      <nav class="hidden md:flex items-center gap-1.5 bg-surface-container-low/80 p-1.5 rounded-full shadow-[0_0_1px_rgba(2,132,199,0.05)]">
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="./index.php">Beranda</a>
        <a aria-current="page" class="px-4 py-1.5 transition-colors bg-surface-container-high text-on-surface font-semibold rounded-full text-xs sm:text-sm" href="./layanan.php">Katalog Layanan</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="./history.html">Riwayat &amp; Bantuan</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-primary font-bold hover:bg-primary-fixed/40 transition-colors" href="./mitra.html">Portal Mitra</a>
      </nav>

      <!-- Right Action Controls (Auth Header Nav & Mobile Hamburger) -->
      <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div id="authHeaderNav" class="flex items-center gap-1.5"></div>

        <!-- Mobile Menu Hamburger Button -->
        <button id="mobileMenuBtn" type="button" class="md:hidden w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-all cursor-pointer shrink-0" aria-label="Buka Menu Navigasi" onclick="toggleMobileNav()">
          <span id="mobileMenuIcon" class="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer / Dropdown -->
    <div id="mobileNavMenu" class="hidden md:hidden border-t border-slate-100 bg-surface/95 backdrop-blur-2xl px-4 py-4 shadow-xl flex flex-col gap-2 transition-all duration-300">
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2" href="./index.php">
        <span class="material-symbols-outlined text-[20px]">home</span> Beranda
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm transition-colors bg-primary-fixed/50 text-primary font-bold flex items-center gap-2" href="./layanan.php">
        <span class="material-symbols-outlined text-[20px]">category</span> Katalog Layanan
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
      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center py-2 sm:py-4">
        
        <!-- Live Status Pill -->
        <div class="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-2xl sm:rounded-full bg-surface-container-high/90 backdrop-blur-md shadow-sm mb-4 border border-slate-200/70 max-w-full text-center">
          <span class="w-2.5 h-2.5 rounded-full <?= $systemStatusPulse ?>"></span>
          <span class="text-xs sm:text-sm text-primary tracking-wide uppercase font-extrabold break-words"><?= $systemStatusLabel ?></span>
        </div>

        <h1 class="font-display text-2xl sm:text-4xl md:text-5xl text-on-surface tracking-tight font-extrabold leading-tight break-words">
          Katalog Resmi <span class="text-primary bg-clip-text">Layanan Prioritas</span> SHIFT
        </h1>
        
        <p class="text-sm sm:text-base md:text-lg text-on-surface-variant mt-3 max-w-2xl leading-relaxed break-words">
          Sistem logistik dan deep cleaning pintar terintegrasi dengan kalkulasi tarif otomatis, armada ready 24 jam, dan teknisi bersertifikasi.
        </p>

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

  </main>

  <!-- Footer Modern -->
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
        <a href="#" onclick="openWhatsAppCS()" class="hover:text-primary transition-colors font-semibold">Hubungi CS</a>
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
