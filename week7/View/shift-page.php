<?php
/*
 * =========================================================================
 * IMPLEMENTASI WEEK 7 (SPRINT 06) - FROM OOP TO MVC ARCHITECTURE - SHIFT
 * - Week 7 Task 01: Design the MVC Structure (Model, View, Controller)
 * - Week 7 Task 02: Build the Controller (Request Handler, Model Calling, Data Passing)
 * - Week 7 Task 03: Connect Model, Controller & View (Clean Front Controller & View)
 * =========================================================================
 */
?>
<!-- ========================================================================= -->
<!-- WEEK 7 - TASK 03: Connect Model, Controller & View (VIEW LAYER)           -->
<!-- View hanya bertugas menampilkan data dari Controller ke antarmuka HTML    -->
<!-- Tidak ada deklarasi class, query data, atau business logic di layer ini   -->
<!-- ========================================================================= -->
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta content="web_standard" name="shell-type"/>
  <title><?= htmlspecialchars($shift->name); ?> &mdash; <?= htmlspecialchars($shift->tagline); ?></title>
  <meta name="description" content="<?= htmlspecialchars($shift->tagline); ?> - Implementasi arsitektur Model-View-Controller (MVC) PHP terstruktur."/>

  <!-- Google Fonts: Plus Jakarta Sans (SHIFT Typography) -->
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet"/>
  <!-- Material Symbols Outlined (SHIFT Icon Library) -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>

  <!-- Tailwind CSS CDN + Custom SHIFT Design Token Config -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "on-error":                    "#ffffff",
            "on-tertiary-container":       "#fcfcff",
            "surface-container-low":       "#f2f3ff",
            "on-secondary-fixed":          "#231b00",
            "tertiary-fixed-dim":          "#7bd0ff",
            "on-primary-fixed-variant":    "#004b73",
            "surface-dim":                 "#d2d9f4",
            "surface-container-highest":   "#dae2fd",
            "background":                  "#faf8ff",
            "outline-variant":             "#bfc7d2",
            "surface-tint":                "#006398",
            "on-tertiary-fixed-variant":   "#004c69",
            "secondary-fixed-dim":         "#eec200",
            "surface-container":           "#eaedff",
            "on-secondary-fixed-variant":  "#574500",
            "error-container":             "#ffdad6",
            "secondary":                   "#735c00",
            "on-tertiary":                 "#ffffff",
            "on-primary":                  "#ffffff",
            "inverse-primary":             "#93ccff",
            "surface-container-high":      "#e2e7ff",
            "on-secondary":                "#ffffff",
            "on-surface":                  "#131b2e",
            "on-secondary-container":      "#6f5900",
            "inverse-on-surface":          "#eef0ff",
            "outline":                     "#707881",
            "on-background":               "#131b2e",
            "secondary-container":         "#fed01b",
            "primary-fixed":               "#cce5ff",
            "tertiary-fixed":              "#c4e7ff",
            "inverse-surface":             "#283044",
            "on-primary-container":        "#fdfcff",
            "tertiary":                    "#006387",
            "surface-bright":              "#faf8ff",
            "on-tertiary-fixed":           "#001e2c",
            "primary-container":           "#007bb9",
            "primary":                     "#006194",
            "tertiary-container":          "#007da9",
            "primary-fixed-dim":           "#93ccff",
            "error":                       "#ba1a1a",
            "surface-container-lowest":    "#ffffff",
            "surface-variant":             "#dae2fd",
            "on-error-container":          "#93000a",
            "surface":                     "#faf8ff",
            "on-primary-fixed":            "#001d31",
            "on-surface-variant":          "#3f4850",
            "secondary-fixed":             "#ffe083"
          },
          borderRadius: {
            "DEFAULT": "1rem",
            "lg":      "2rem",
            "xl":      "3rem",
            "full":    "9999px"
          },
          fontFamily: {
            "sans":        ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
            "headline-sm": ["Plus Jakarta Sans"],
            "label-md":    ["Plus Jakarta Sans"],
            "body-lg":     ["Plus Jakarta Sans"],
            "headline-lg": ["Plus Jakarta Sans"],
            "headline-md": ["Plus Jakarta Sans"],
            "label-lg":    ["Plus Jakarta Sans"],
            "body-md":     ["Plus Jakarta Sans"],
            "body-sm":     ["Plus Jakarta Sans"],
            "headline-xl": ["Plus Jakarta Sans"],
            "label-sm":    ["Plus Jakarta Sans"],
            "display":     ["Plus Jakarta Sans"]
          }
        }
      }
    };
  </script>

  <style>
    @layer base {
      html, body { margin: 0; padding: 0; }
      body { overscroll-behavior: none; font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui; }
      main > :first-child { margin-top: 0 !important; }
      main > :last-child { margin-bottom: 0 !important; }
    }
    ::-webkit-scrollbar { display: none; }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
  </style>
</head>
<body class="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col overflow-x-hidden">

  <!-- ========================================================================= -->
  <!-- HEADER NAVBAR WITH STICKY BLUR (SOFT UI NAVIGATION)                       -->
  <!-- ========================================================================= -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-100">
    <div class="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
      
      <!-- Brand Logo -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <a class="flex items-center gap-2 group shrink-0" href="./index.php">
          <div class="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,97,148,0.25)] shrink-0 group-hover:scale-105 transition-transform">
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
        <a aria-current="page" class="px-4 py-1.5 transition-colors <?= ($selectedCategory === 'all') ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'; ?> rounded-full text-xs sm:text-sm" href="./index.php?category=all">Beranda</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="./index.php#katalog-mvc">Katalog Layanan</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer" onclick="selectServiceCategory('moving')">Layanan Pindahan</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer" onclick="selectServiceCategory('cleaning')">Layanan Deep Clean</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="./history.html">Riwayat &amp; Bantuan</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-primary font-bold hover:bg-primary-fixed/40 transition-colors" href="./mitra.html">Portal Mitra</a>
      </nav>

      <!-- Right Action Controls (CS Button, Dynamic Auth Header Nav & Mobile Hamburger) -->
      <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <a class="hidden sm:flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-all text-on-surface text-xs sm:text-sm font-semibold cursor-pointer" href="#" onclick="if(typeof openWhatsAppCS==='function') openWhatsAppCS(); return false;">
          <span class="material-symbols-outlined text-primary text-[18px]">support_agent</span>
          <span class="hidden lg:inline">Bantuan 24/7</span>
        </a>
        
        <!-- Dynamic Header Nav Container: Populated by app.js renderAuthHeaderNav() -->
        <div id="authHeaderNav" class="flex items-center gap-1.5"></div>

        <!-- Mobile Menu Hamburger Button -->
        <button id="mobileMenuBtn" type="button" class="md:hidden w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-all cursor-pointer shrink-0" aria-label="Buka Menu Navigasi" onclick="toggleMobileNav()">
          <span id="mobileMenuIcon" class="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer / Dropdown -->
    <div id="mobileNavMenu" class="hidden md:hidden border-t border-slate-100 bg-surface/95 backdrop-blur-2xl px-4 py-4 shadow-xl flex flex-col gap-2 transition-all duration-300">
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm transition-colors <?= ($selectedCategory === 'all') ? 'bg-primary-fixed/50 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'; ?> flex items-center gap-2" href="./index.php?category=all">
        <span class="material-symbols-outlined text-[20px]">home</span> Beranda (Semua)
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2" href="./index.php#katalog-mvc">
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
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-pointer" href="#" onclick="if(typeof openWhatsAppCS==='function') openWhatsAppCS(); return false;">
        <span class="material-symbols-outlined text-primary text-[20px]">support_agent</span> Bantuan CS WhatsApp 24/7
      </a>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- MAIN VIEW CONTAINER                                                       -->
  <!-- ========================================================================= -->
  <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex flex-col gap-8 sm:gap-12">

    <!-- ========================================================================= -->
    <!-- HERO BANNER SECTION (CLEAN ON-DEMAND SOFT UI)                             -->
    <!-- ========================================================================= -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-surface-container-lowest via-surface-container-low/70 to-surface-container/40 p-5 sm:p-8 md:p-12 border border-slate-100 shadow-xl">
      <div class="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-primary-fixed blur-3xl opacity-40 pointer-events-none"></div>
      <div class="absolute top-1/2 -right-32 w-72 sm:w-[32rem] h-72 sm:h-[32rem] rounded-full bg-tertiary-fixed blur-3xl opacity-35 pointer-events-none"></div>
      <div class="absolute -bottom-20 left-1/3 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-secondary-fixed blur-3xl opacity-20 pointer-events-none"></div>

      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center py-2 sm:py-4">
        
        <!-- Live Status Pill (Data Model: $shift->status & $shift->getGreeting()) -->
        <div class="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-2xl sm:rounded-full bg-surface-container-high/90 backdrop-blur-md shadow-sm mb-4 border border-slate-200/70 max-w-full text-center">
          <span class="inline-flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs sm:text-sm text-primary tracking-wide uppercase font-extrabold break-words">Sistem Operasional: <?= htmlspecialchars($shift->status); ?> (<?= htmlspecialchars($shift->appVersion); ?>)</span>
          </span>
          <span class="hidden sm:inline text-outline-variant font-body-sm text-body-sm">•</span>
          <span class="text-xs sm:text-sm text-on-surface-variant font-bold break-words"><?= $shift->getGreeting(); ?>! Hemat s.d 15% untuk Pemesanan via Online Hari Ini!</span>
        </div>

        <!-- Main Headline -->
        <h1 class="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight font-extrabold leading-tight break-words">
          Solusi <span class="text-primary bg-clip-text">Pindahan Barang</span> &amp; <span class="text-secondary bg-clip-text">Deep Cleaning</span> Paling Praktis
        </h1>
        
        <p class="text-sm sm:text-base md:text-lg text-on-surface-variant mt-3 max-w-2xl leading-relaxed break-words">
          Pesan armada angkut (Pickup, Box, Truk Engkel) atau teknisi spesialis deep clean hunian dalam hitungan detik. Melayani area <span class="font-bold text-on-surface"><?= htmlspecialchars($shift->coverage); ?></span> dengan tarif presisi kalkulasi GPS.
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

        <!-- Informasi Utama Platform SHIFT (Soft UI Glass Card) -->
        <div class="w-full max-w-3xl mt-6 p-4 sm:p-6 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md border border-slate-200/80 text-left">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[20px]">info</span>
              </div>
              <div class="min-w-0">
                <span class="text-sm sm:text-base font-bold text-on-surface truncate block">Informasi Utama Platform SHIFT</span>
                <span class="block text-xs text-on-surface-variant font-medium">Server-Side MVC Architecture (Sprint 06 - Week 7)</span>
              </div>
            </div>
            <div class="flex items-center gap-2 bg-surface-container-high/60 px-3 py-1.5 rounded-full self-start sm:self-auto shrink-0">
              <span class="text-xs text-on-surface-variant font-medium">Status Operasional:</span>
              <span class="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <?= htmlspecialchars($shift->status); ?>
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-3">
            <div class="flex flex-col min-w-0">
              <span class="text-xs text-on-surface-variant font-medium">Nama Resmi Aplikasi:</span>
              <span class="text-xs sm:text-sm md:text-base font-extrabold text-primary leading-tight mt-0.5 break-words">
                <?= htmlspecialchars($shift->name); ?>
              </span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-xs text-on-surface-variant font-medium">Paradigma Server:</span>
              <span class="text-xs sm:text-sm md:text-base font-bold text-on-surface leading-tight mt-0.5 break-words">
                Model-View-Controller (MVC)
              </span>
            </div>
            <div class="flex flex-col min-w-0 sm:col-span-2 md:col-span-1">
              <span class="text-xs text-on-surface-variant font-medium">Periode &amp; Jam Layanan:</span>
              <span class="text-xs sm:text-sm md:text-base font-bold text-secondary leading-tight mt-0.5 break-words">
                <?= htmlspecialchars($shift->period); ?>
              </span>
            </div>
          </div>
        </div>

        <!-- Keunggulan & Trust Badges Section (Data Model: $trustBadges) -->
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
    <!-- WEEK 7 - TASK 03: Service Catalog with Interactive MVC Filter             -->
    <!-- Menampilkan layanan dari Model via Controller tanpa bisnis logika di View -->
    <!-- ========================================================================= -->
    <section class="flex flex-col gap-6" id="katalog-mvc">
      
      <!-- Catalog Header & Filter Control Buttons -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Katalog Layanan SHIFT &mdash; Task 03</span>
          <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1 break-words">
            Pilihan Layanan Siap Dipesan
          </h2>
          <p class="text-xs sm:text-sm text-on-surface-variant mt-1">
            Data layanan dikelola oleh Model <code class="font-mono text-primary bg-primary-fixed/30 px-1 rounded text-xs">ShiftPlatform</code>, diproses oleh Controller, dan dirender secara dinamis oleh View.
          </p>
        </div>

        <!-- Filter Pill Buttons (Interaktif: Mengirim Request GET ke Controller) -->
        <div class="flex flex-wrap items-center gap-1.5 bg-surface-container-low/80 p-1.5 rounded-full border border-slate-200 self-start md:self-auto shrink-0 shadow-sm">
          
          <!-- Filter: Semua -->
          <a href="./index.php?category=all#katalog-mvc"
             class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 <?= ($selectedCategory === 'all') ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'; ?>">
            <span class="material-symbols-outlined text-[16px]">widgets</span>
            <span>Semua (6)</span>
          </a>

          <!-- Filter: Pindahan -->
          <a href="./index.php?category=moving#katalog-mvc"
             class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 <?= ($selectedCategory === 'moving') ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'; ?>">
            <span class="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Pindahan &amp; Armada (4)</span>
          </a>

          <!-- Filter: Deep Cleaning -->
          <a href="./index.php?category=cleaning#katalog-mvc"
             class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 <?= ($selectedCategory === 'cleaning') ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'; ?>">
            <span class="material-symbols-outlined text-[16px]">cleaning_services</span>
            <span>Deep Cleaning (2)</span>
          </a>

        </div>
      </div>

      <!-- Result Counter Banner -->
      <div class="flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-surface-container-low/60 border border-slate-100 text-xs text-on-surface-variant">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[18px]">filter_list</span>
          <span>Menampilkan <strong class="text-on-surface"><?= $totalServices; ?> Layanan</strong> dalam kategori: <span class="font-extrabold text-primary uppercase"><?= htmlspecialchars($selectedCategory); ?></span></span>
        </div>
        <span class="text-[11px] text-slate-400 hidden sm:inline">Data dipasok dari Model &rarr; Controller &rarr; View</span>
      </div>

      <!-- DYNAMIC SERVICE CARDS GRID (Iterasi atas variabel $services dari Controller) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <?php foreach ($services as $service): 
          $nomorFormatted = sprintf('%02d', $service['nomor']);
        ?>
        <div class="group relative rounded-3xl bg-surface-container-lowest/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-slate-100 overflow-hidden">

          <div class="flex flex-col gap-4 relative z-10">
            <!-- Header: Ikon & Badge Kategori -->
            <div class="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl <?= $service['icon_bg']; ?> flex items-center justify-center shadow-inner transition-colors duration-300 shrink-0">
                <span class="material-symbols-outlined text-[28px] sm:text-[32px]"><?= $service['ikon']; ?></span>
              </div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold">#<?= $nomorFormatted; ?></span>
                <span class="px-2.5 py-1 rounded-full <?= $service['badge_color']; ?> text-xs font-extrabold uppercase tracking-wider"><?= $service['badge']; ?></span>
              </div>
            </div>

            <!-- Konten: Label, Judul & Deskripsi -->
            <div>
              <span class="text-xs font-extrabold text-primary uppercase tracking-wider"><?= htmlspecialchars($service['category_label']); ?></span>
              <h3 class="text-lg sm:text-xl text-on-surface font-extrabold <?= $service['hover_text']; ?> transition-colors mt-0.5 break-words leading-snug">
                <?= htmlspecialchars($service['nama']); ?>
              </h3>
              <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-2 line-clamp-3">
                <?= htmlspecialchars($service['deskripsi']); ?>
              </p>
            </div>

            <!-- Fitur Unggulan (Iterasi Array dari Model) -->
            <div class="p-3 rounded-2xl bg-surface-container-low/60 border border-slate-100">
              <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Fitur Unggulan:</span>
              <ul class="flex flex-col gap-1">
                <?php foreach ($service['features'] as $feature): ?>
                <li class="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span class="material-symbols-outlined text-[15px] text-emerald-500 shrink-0">check_circle</span>
                  <span class="truncate"><?= htmlspecialchars($feature); ?></span>
                </li>
                <?php endforeach; ?>
              </ul>
            </div>

            <!-- Tarif Mulai Dari -->
            <div class="p-3 sm:p-3.5 rounded-2xl bg-surface-container-low/70 border border-slate-100 flex items-center justify-between gap-2 flex-wrap">
              <div class="flex flex-col min-w-0">
                <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Tarif Mulai Dari</span>
                <span class="text-base sm:text-lg font-extrabold text-primary"><?= htmlspecialchars($service['harga_formatted']); ?></span>
              </div>
              <span class="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                <span class="material-symbols-outlined text-[14px]">verified</span> Terverifikasi
              </span>
            </div>
          </div>

          <!-- Tombol CTA Pesan Layanan -->
          <div class="pt-4 mt-4 border-t border-slate-100 relative z-10">
            <a href="<?= htmlspecialchars($service['link']); ?>"
               onclick="<?= htmlspecialchars($service['action_onclick']); ?>; return false;"
               class="w-full py-3 sm:py-3.5 px-4 rounded-full <?= $service['btn_class']; ?> text-xs sm:text-sm font-bold flex items-center justify-between shadow-md transition-all cursor-pointer">
              <span class="truncate pr-2"><?= htmlspecialchars($service['btn_text']); ?></span>
              <span class="w-7 h-7 rounded-full bg-current/15 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </span>
            </a>
          </div>

        </div>
        <?php endforeach; ?>
      </div>

    </section>

    <!-- ========================================================================= -->
    <!-- SECTION: Spesifikasi Armada Logistik SHIFT (Data dari Model: $fleetSpecs)  -->
    <!-- ========================================================================= -->
    <section class="flex flex-col gap-4 sm:gap-6">
      <div>
        <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Spesifikasi Armada Logistik</span>
        <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1">Armada Siap Jalan 24/7</h2>
        <p class="text-xs sm:text-sm text-on-surface-variant mt-1">Daftar armada logistik yang dikelola secara terpusat oleh method <code class="font-mono text-primary text-xs bg-primary-fixed/30 px-1 rounded">ShiftPlatform::getFleetSpecs()</code> pada Model layer.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <?php foreach ($fleetSpecs as $fleet): ?>
        <div class="p-5 rounded-3xl bg-surface-container-lowest shadow-sm border border-slate-100 flex flex-col justify-between gap-3">
          <div class="flex flex-col gap-2">
            <div class="w-10 h-10 rounded-2xl bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[24px]"><?= $fleet['icon']; ?></span>
            </div>
            <h4 class="text-base font-extrabold text-on-surface"><?= htmlspecialchars($fleet['type']); ?></h4>
            <div class="flex flex-col gap-1 text-xs text-on-surface-variant">
              <div><strong class="text-on-surface">Kapasitas:</strong> <?= htmlspecialchars($fleet['capacity']); ?></div>
              <div><strong class="text-on-surface">Dimensi:</strong> <?= htmlspecialchars($fleet['dimension']); ?></div>
              <div class="mt-1 text-[11px] leading-relaxed"><strong class="text-on-surface">Cocok untuk:</strong> <?= htmlspecialchars($fleet['best_for']); ?></div>
            </div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[11px] font-bold text-on-surface-variant">Mulai Dari</span>
            <span class="text-sm font-extrabold text-primary"><?= htmlspecialchars($fleet['base_rate']); ?></span>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SEKSI KEUNGGULAN SHIFT (WHY CHOOSE US - DATA DARI MODEL)                  -->
    <!-- ========================================================================= -->
    <section class="rounded-3xl bg-surface-container-low/60 p-5 sm:p-8 md:p-10 border border-slate-100 flex flex-col gap-6">
      <div class="text-center max-w-2xl mx-auto px-2">
        <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Mengapa Memilih SHIFT?</span>
        <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1 break-words">
          Standar Layanan Logistik &amp; Sanitasi Terbaik
        </h2>
      </div>

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

    <!-- ========================================================================= -->
    <!-- SEKSI GERBANG MITRA KERJA (JOIN PARTNER SECTION)                          -->
    <!-- ========================================================================= -->
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

    <!-- ========================================================================= -->
    <!-- DOKUMENTASI TEKNIS ARSITEKTUR MVC (COLLAPSIBLE ACCORDION PANEL)           -->
    <!-- Menyimpan rincian spesifikasi MVC secara rapi tanpa mengotori UI utama    -->
    <!-- ========================================================================= -->
    <details class="group rounded-3xl bg-surface-container-low/40 border border-slate-200/70 p-5 sm:p-6 transition-all duration-300">
      <summary class="cursor-pointer font-bold text-sm sm:text-base text-on-surface flex items-center justify-between gap-2 select-none">
        <span class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[18px]">account_tree</span>
          </span>
          <span>Dokumentasi Arsitektur MVC PHP (Sprint 06 - Week 7)</span>
        </span>
        <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform duration-200 text-[20px]">
          expand_more
        </span>
      </summary>

      <div class="mt-5 pt-5 border-t border-slate-200/70 flex flex-col gap-6 text-xs sm:text-sm">
        
        <!-- Alur Kerja MVC (Request -> Controller -> Model -> View) -->
        <div class="flex flex-col gap-2">
          <span class="font-bold text-xs uppercase tracking-wider text-on-surface-variant">Alur Kerja Eksekusi MVC SHIFT</span>
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
            <div class="p-3 rounded-xl bg-surface-container/70 border border-slate-200 flex flex-col gap-1">
              <span class="text-[10px] font-extrabold text-primary uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">touch_app</span> 1. Request
              </span>
              <span class="font-bold text-on-surface">URL Parameter</span>
              <code class="text-[11px] font-mono text-primary bg-surface-container-lowest p-1 rounded border border-slate-200 truncate">
                ?category=<?= htmlspecialchars($selectedCategory); ?>
              </code>
            </div>

            <div class="p-3 rounded-xl bg-primary-fixed/20 border border-primary/20 flex flex-col gap-1">
              <span class="text-[10px] font-extrabold text-primary uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">tune</span> 2. Controller
              </span>
              <span class="font-bold text-on-surface">ShiftController</span>
              <span class="text-[11px] text-on-surface-variant">Method <code class="font-mono text-primary font-bold">show('<?= htmlspecialchars($selectedCategory); ?>')</code></span>
            </div>

            <div class="p-3 rounded-xl bg-secondary-container/30 border border-secondary/20 flex flex-col gap-1">
              <span class="text-[10px] font-extrabold text-secondary uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">database</span> 3. Model
              </span>
              <span class="font-bold text-on-surface">ShiftPlatform</span>
              <span class="text-[11px] text-on-surface-variant">Filter data: <strong class="text-primary font-bold"><?= $totalServices; ?> layanan</strong></span>
            </div>

            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col gap-1">
              <span class="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">desktop_windows</span> 4. View
              </span>
              <span class="font-bold text-on-surface">shift-page.php</span>
              <span class="text-[11px] text-emerald-800">Merender antarmuka Soft UI</span>
            </div>
          </div>
        </div>

        <!-- 3 Layer Cards (Task 01, Task 02, Task 03) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-surface-container-lowest border border-slate-100 flex flex-col gap-2 shadow-sm">
            <span class="text-[11px] font-extrabold text-primary uppercase tracking-wider">Week 7 - Task 01</span>
            <h4 class="font-bold text-on-surface text-sm">Model Layer (ShiftPlatform)</h4>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Mengelola data profil platform, sumber data layanan, spesifikasi armada logistik, dan badges tanpa manipulasi tampilan.
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-lowest border border-slate-100 flex flex-col gap-2 shadow-sm">
            <span class="text-[11px] font-extrabold text-secondary uppercase tracking-wider">Week 7 - Task 02</span>
            <h4 class="font-bold text-on-surface text-sm">Controller Layer (ShiftController)</h4>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Menerima HTTP Request, memanggil method Model untuk menyaring data, lalu mengekstrak data ke View layer.
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-lowest border border-slate-100 flex flex-col gap-2 shadow-sm">
            <span class="text-[11px] font-extrabold text-tertiary uppercase tracking-wider">Week 7 - Task 03</span>
            <h4 class="font-bold text-on-surface text-sm">View Layer (shift-page.php)</h4>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Merender output HTML dinamis murni berbasis variabel dari Controller, bersih dari business logic atau query data.
            </p>
          </div>
        </div>

        <!-- Ringkasan Profil dari Model (Verifikasi getProfile()) -->
        <div class="p-4 rounded-2xl bg-surface-container-lowest border border-slate-100 shadow-sm flex flex-col gap-2">
          <span class="font-bold text-xs uppercase tracking-wider text-on-surface-variant">Verifikasi Model: Output Method getProfile()</span>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div><span class="text-slate-400 block text-[10px]">Aplikasi:</span><strong><?= htmlspecialchars($profile['name']); ?></strong></div>
            <div><span class="text-slate-400 block text-[10px]">Koordinator:</span><strong><?= htmlspecialchars($profile['coordinator']); ?></strong></div>
            <div><span class="text-slate-400 block text-[10px]">Periode:</span><strong><?= htmlspecialchars($profile['period']); ?></strong></div>
            <div><span class="text-slate-400 block text-[10px]">Hotline CS:</span><strong><?= htmlspecialchars($profile['csHotline']); ?></strong></div>
          </div>
        </div>

      </div>
    </details>

  </main>

  <!-- ========================================================================= -->
  <!-- FOOTER MODERN (SOFT UI DYNAMIC FOOTER)                                    -->
  <!-- ========================================================================= -->
  <footer class="bg-surface-container-lowest border-t border-slate-100 py-6 mt-auto">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant text-xs sm:text-sm text-center sm:text-left">
      <div class="flex flex-col sm:flex-row items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
          <span class="material-symbols-outlined text-[14px]">local_shipping</span>
        </div>
        <span class="font-bold text-on-surface"><?= htmlspecialchars($shift->name); ?> Platform <?= htmlspecialchars($shift->appVersion); ?></span>
        <span class="text-slate-400 hidden sm:inline">•</span>
        <span>© <?= date('Y'); ?> <?= htmlspecialchars($shift->companyName); ?>. All Rights Reserved.</span>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a href="./auth.html?path=role-selection" class="hover:text-primary transition-colors font-semibold">Portal Akses</a>
        <a href="./mitra.html" class="hover:text-primary transition-colors font-semibold">Portal Mitra</a>
        <a href="./history.html" class="hover:text-primary transition-colors font-semibold">Pusat Bantuan</a>
        <a href="#" onclick="if(typeof openWhatsAppCS==='function') openWhatsAppCS(); return false;" class="hover:text-primary transition-colors font-semibold">Hubungi CS (<?= htmlspecialchars($shift->csHotline); ?>)</a>
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
