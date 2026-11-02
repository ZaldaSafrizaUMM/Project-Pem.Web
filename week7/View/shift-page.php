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
  <title><?= htmlspecialchars($shift->name); ?> &mdash; Week 7 Sprint 06 | MVC Architecture</title>
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
    body { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui; }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
    @keyframes mvcFadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .mvc-animate-card { animation: mvcFadeIn 0.4s ease both; }
    .mvc-animate-card:nth-child(1) { animation-delay: 0.05s; }
    .mvc-animate-card:nth-child(2) { animation-delay: 0.12s; }
    .mvc-animate-card:nth-child(3) { animation-delay: 0.19s; }
    .mvc-animate-card:nth-child(4) { animation-delay: 0.26s; }
    .mvc-animate-card:nth-child(5) { animation-delay: 0.33s; }
    .mvc-animate-card:nth-child(6) { animation-delay: 0.40s; }
  </style>
</head>
<body class="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col overflow-x-hidden">

  <!-- HEADER: Sticky Navbar SHIFT Soft UI -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-100">
    <div class="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
      
      <!-- Brand Logo -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <a class="flex items-center gap-2 group shrink-0" href="./index.php">
          <div class="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,97,148,0.25)] shrink-0 group-hover:scale-105 transition-transform">
            <span class="material-symbols-outlined text-[24px]">local_shipping</span>
          </div>
          <div class="flex flex-col min-w-0 max-w-[130px] sm:max-w-[220px]">
            <span class="font-headline-sm text-sm sm:text-base font-extrabold text-primary tracking-tight truncate leading-tight">SHIFT</span>
            <span class="font-label-sm text-[10px] sm:text-xs text-on-surface-variant font-semibold uppercase tracking-wider truncate">MVC Platform &mdash; Week 7</span>
          </div>
        </a>
      </div>

      <!-- Main Navigation Links -->
      <nav class="hidden md:flex items-center gap-1.5 bg-surface-container-low/80 p-1.5 rounded-full">
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm <?= ($selectedCategory === 'all') ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors'; ?>" href="./index.php?category=all">Beranda MVC</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm <?= ($selectedCategory === 'moving') ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors'; ?>" href="./index.php?category=moving">Pindahan &amp; Armada</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm <?= ($selectedCategory === 'cleaning') ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors'; ?>" href="./index.php?category=cleaning">Deep Cleaning</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="../week6/oop-service.php">Week 6 OOP</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-primary font-bold hover:bg-primary-fixed/40 transition-colors" href="./mitra.html">Portal Mitra</a>
      </nav>

      <!-- Right Controls: Status & Mobile Hamburger -->
      <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div class="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-primary/10 to-primary-fixed/60 border border-primary/20 px-3 py-1.5 rounded-full">
          <span class="material-symbols-outlined text-primary text-[16px]">account_tree</span>
          <span class="text-xs font-extrabold text-primary tracking-wide">MVC Sprint 06</span>
        </div>
        <button id="mobileMenuBtn" type="button" class="md:hidden w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-all cursor-pointer shrink-0" aria-label="Buka Menu Navigasi" onclick="toggleMobileNav()">
          <span id="mobileMenuIcon" class="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </div>

    </div>

    <!-- Mobile Navigation Drawer -->
    <div id="mobileNavMenu" class="hidden md:hidden border-t border-slate-100 bg-surface/95 backdrop-blur-2xl px-4 py-4 shadow-xl flex flex-col gap-2">
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm <?= ($selectedCategory === 'all') ? 'bg-primary-fixed/50 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'; ?> flex items-center gap-2" href="./index.php?category=all">
        <span class="material-symbols-outlined text-[20px]">home</span> Beranda MVC (Semua)
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm <?= ($selectedCategory === 'moving') ? 'bg-primary-fixed/50 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'; ?> flex items-center gap-2" href="./index.php?category=moving">
        <span class="material-symbols-outlined text-[20px]">local_shipping</span> Layanan Pindahan &amp; Armada
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm <?= ($selectedCategory === 'cleaning') ? 'bg-primary-fixed/50 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'; ?> flex items-center gap-2" href="./index.php?category=cleaning">
        <span class="material-symbols-outlined text-[20px]">cleaning_services</span> Layanan Deep Cleaning
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:bg-surface-container-high flex items-center gap-2" href="../week6/oop-service.php">
        <span class="material-symbols-outlined text-[20px]">code</span> Week 6 OOP Catalog
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-primary font-bold hover:bg-primary-fixed/40 transition-colors flex items-center gap-2" href="./mitra.html">
        <span class="material-symbols-outlined text-[20px]">badge</span> Portal Mitra
      </a>
    </div>
  </header>

  <!-- MAIN CONTENT CONTAINER -->
  <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex flex-col gap-8 sm:gap-12">

    <!-- HERO SECTION: MVC Banner & Data dari Model ShiftPlatform -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low/70 to-primary-fixed/20 p-6 sm:p-10 md:p-14 border border-slate-100 shadow-xl">
      <div class="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" aria-hidden="true"></div>
      <div class="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none" aria-hidden="true"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center py-2 sm:py-4">

        <!-- Status Pulse (Data dari Model: $shift->status) -->
        <div class="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 rounded-full bg-surface-container-high/90 backdrop-blur-md shadow-sm mb-5 border border-slate-200/70 max-w-full">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-xs sm:text-sm text-primary tracking-wide uppercase font-extrabold break-words">
            Sistem Operasional: <?= htmlspecialchars($shift->status); ?> &bull; <?= htmlspecialchars($shift->period); ?>
          </span>
        </div>

        <!-- Sprint Badge -->
        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-extrabold px-4 py-2 rounded-full shadow-lg mb-5 uppercase tracking-widest">
          <span class="material-symbols-outlined text-[18px]">account_tree</span>
          WEEK 7 &mdash; SPRINT 06: FROM OOP TO MVC ARCHITECTURE
          <span class="material-symbols-outlined text-[18px]">verified</span>
        </div>

        <!-- Main Headline -->
        <h1 class="font-display text-2xl sm:text-4xl md:text-5xl text-on-surface tracking-tight font-extrabold leading-tight break-words">
          Struktur Aplikasi SHIFT <span class="text-primary">Berbasis MVC</span>
        </h1>
        
        <p class="text-sm sm:text-base md:text-lg text-on-surface-variant mt-3 max-w-2xl leading-relaxed">
          Pemisahan kode terstruktur antara <strong class="text-on-surface">Model</strong> (Data), <strong class="text-on-surface">View</strong> (Presentasi), dan <strong class="text-on-surface">Controller</strong> (Penghubung Logika &amp; Request HTTP).
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a href="#katalog-mvc" class="px-6 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">category</span>
            <span>Jelajahi Katalog MVC</span>
          </a>
          <a href="./booking.html?service=moving" class="px-6 py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">local_shipping</span>
            <span>Pesan Pindahan</span>
          </a>
        </div>

        <!-- ========================================================================= -->
        <!-- MVC ARCHITECTURE FLOW DEMO CARD (ALUR REQUEST -> CONTROLLER -> MODEL -> VIEW) -->
        <!-- ========================================================================= -->
        <div class="w-full max-w-3xl mt-8 p-5 sm:p-6 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md border border-slate-200/80 text-left">
          <div class="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 flex-wrap">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[20px]">sync_alt</span>
              </div>
              <div>
                <span class="text-sm font-bold text-on-surface block">Alur Kerja MVC Sprint 06 SHIFT Saat Ini</span>
                <span class="text-xs text-on-surface-variant font-medium">Request &rarr; Controller &rarr; Model &rarr; View</span>
              </div>
            </div>
            <div class="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-emerald-800 text-xs font-extrabold">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Kategori Aktif: <?= strtoupper(htmlspecialchars($selectedCategory)); ?></span>
            </div>
          </div>

          <!-- Step Flow Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-4 text-xs">
            
            <!-- Step 1: Request -->
            <div class="p-3 rounded-xl bg-surface-container/70 border border-slate-200 flex flex-col gap-1">
              <span class="text-[10px] font-extrabold text-primary uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">touch_app</span> 1. Request
              </span>
              <span class="font-bold text-on-surface">URL Parameter</span>
              <code class="text-[11px] font-mono text-primary bg-surface-container-lowest p-1 rounded border border-slate-200 truncate">
                ?category=<?= htmlspecialchars($selectedCategory); ?>
              </code>
            </div>

            <!-- Step 2: Controller -->
            <div class="p-3 rounded-xl bg-primary-fixed/20 border border-primary/20 flex flex-col gap-1">
              <span class="text-[10px] font-extrabold text-primary uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">tune</span> 2. Controller
              </span>
              <span class="font-bold text-on-surface">ShiftController</span>
              <span class="text-[11px] text-on-surface-variant">Memanggil <code class="font-mono text-primary font-bold">show('<?= htmlspecialchars($selectedCategory); ?>')</code></span>
            </div>

            <!-- Step 3: Model -->
            <div class="p-3 rounded-xl bg-secondary-container/30 border border-secondary/20 flex flex-col gap-1">
              <span class="text-[10px] font-extrabold text-secondary uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">database</span> 3. Model
              </span>
              <span class="font-bold text-on-surface">ShiftPlatform</span>
              <span class="text-[11px] text-on-surface-variant">Filter data: <strong class="text-primary font-bold"><?= $totalServices; ?> layanan</strong> ditemukan</span>
            </div>

            <!-- Step 4: View -->
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col gap-1">
              <span class="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">desktop_windows</span> 4. View
              </span>
              <span class="font-bold text-on-surface">shift-page.php</span>
              <span class="text-[11px] text-emerald-800">Merender <?= $totalServices; ?> kartu HTML Soft UI</span>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- SECTION: MVC Structure Explanations (Task 01, 02, 03) -->
    <section class="flex flex-col gap-4 sm:gap-6">
      <div>
        <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Arsitektur Terstruktur &mdash; Sprint 06</span>
        <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1">Struktur 3 Layer MVC SHIFT</h2>
        <p class="text-sm text-on-surface-variant mt-1">Pemisahan tanggung jawab (*Separation of Concerns*) sesuai kurikulum perkuliahan.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <!-- CARD: MODEL LAYER (Task 01) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest shadow-md border border-slate-100 flex flex-col justify-between gap-3">
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-2xl bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[22px]">database</span>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-primary-fixed/60 text-primary text-[10px] font-extrabold uppercase tracking-wider">Task 01</span>
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-extrabold text-on-surface">Model Layer</h3>
              <span class="text-xs font-mono text-primary block mt-0.5">Model/ShiftPlatform.php</span>
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Bertanggung jawab atas <strong>Data &amp; Logika Bisnis</strong>. Menyimpan properti platform (<code class="font-mono text-primary">$name</code>, <code class="font-mono text-primary">$coordinator</code>, <code class="font-mono text-primary">$period</code>, <code class="font-mono text-primary">$status</code>), spesifikasi armada, dan menyediakan method data access.
            </p>
          </div>
          <div class="p-3 rounded-2xl bg-surface-container-low/70 border border-slate-100 text-[11px] font-mono text-on-surface flex flex-col gap-1">
            <span>&bull; getProfile(): array</span>
            <span>&bull; getServices(): array</span>
            <span>&bull; getServicesByCategory($cat)</span>
            <span>&bull; getFleetSpecs(): array</span>
          </div>
        </div>

        <!-- CARD: CONTROLLER LAYER (Task 02) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest shadow-md border border-slate-100 flex flex-col justify-between gap-3">
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-2xl bg-secondary-container/80 text-secondary flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[22px]">tune</span>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-extrabold uppercase tracking-wider">Task 02</span>
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-extrabold text-on-surface">Controller Layer</h3>
              <span class="text-xs font-mono text-secondary block mt-0.5">Controller/ShiftController.php</span>
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Bertindak sebagai <strong>Otak Pengendali</strong>. Menerima input dari pengguna (HTTP GET/POST), meminta data yang relevan ke Model, mengolah parameter filter, dan meneruskan data bersih ke View.
            </p>
          </div>
          <div class="p-3 rounded-2xl bg-surface-container-low/70 border border-slate-100 text-[11px] font-mono text-on-surface flex flex-col gap-1">
            <span>&bull; index(): array</span>
            <span>&bull; show(string $category): array</span>
            <span>&bull; process(): void</span>
            <span>&bull; extract($viewData) &rarr; require View</span>
          </div>
        </div>

        <!-- CARD: VIEW LAYER (Task 03) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest shadow-md border border-slate-100 flex flex-col justify-between gap-3">
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-2xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[22px]">desktop_windows</span>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-extrabold uppercase tracking-wider">Task 03</span>
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-extrabold text-on-surface">View Layer</h3>
              <span class="text-xs font-mono text-tertiary block mt-0.5">View/shift-page.php</span>
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Bertanggung jawab murni untuk <strong>Presentasi &amp; Antarmuka Pengguna (UI)</strong>. Menampilkan data dari Controller via tag PHP ringkas (<code class="font-mono text-primary">&lt;?= $shift-&gt;name ?&gt;</code>) tanpa manipulasi logika bisnis.
            </p>
          </div>
          <div class="p-3 rounded-2xl bg-surface-container-low/70 border border-slate-100 text-[11px] font-mono text-on-surface flex flex-col gap-1">
            <span>&bull; Bersih dari deklarasi class</span>
            <span>&bull; foreach ($services as $service)</span>
            <span>&bull; Filter kategori interaktif</span>
            <span>&bull; 100% Soft UI Tailwind CSS</span>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION: Service Catalog with Interactive MVC Filter (Task 03) -->
    <section class="flex flex-col gap-6" id="katalog-mvc">
      
      <!-- Catalog Header & Filter Control Buttons -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Katalog Layanan SHIFT &mdash; Task 03</span>
          <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1">
            Layanan Terpadu &mdash; Output Dinamis MVC
          </h2>
          <p class="text-sm text-on-surface-variant mt-1 max-w-2xl">
            Pilih kategori di bawah untuk mendemokan pemrosesan dinamis: <code class="font-mono text-primary bg-primary-fixed/40 px-1.5 py-0.5 rounded text-xs">Request &rarr; Controller::show() &rarr; Model::getServicesByCategory() &rarr; View</code>.
          </p>
        </div>

        <!-- Filter Pill Buttons (Interaktif: Mengirim Request GET ke Controller) -->
        <div class="flex flex-wrap items-center gap-1.5 bg-surface-container-low/80 p-1.5 rounded-full border border-slate-200 self-start md:self-auto shrink-0">
          
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
        <div class="mvc-animate-card group relative rounded-3xl bg-surface-container-lowest/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-slate-100 overflow-hidden">
          
          <!-- MVC Marker Badge -->
          <div class="absolute top-3 right-3 z-20">
            <span class="inline-flex items-center gap-1 bg-gradient-to-r from-primary to-primary-container text-on-primary text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md uppercase tracking-widest">
              <span class="material-symbols-outlined text-[12px]">account_tree</span> MVC Item #<?= $nomorFormatted; ?>
            </span>
          </div>

          <div class="flex flex-col gap-4 relative z-10">
            <!-- Header: Ikon & Badge Kategori -->
            <div class="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl <?= $service['icon_bg']; ?> flex items-center justify-center shadow-inner transition-colors duration-300 shrink-0">
                <span class="material-symbols-outlined text-[28px] sm:text-[32px]"><?= $service['ikon']; ?></span>
              </div>
              <div class="flex items-center gap-1.5 flex-wrap pt-0.5 pr-20">
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
              <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Fitur Unggulan:</span>
              <ul class="flex flex-col gap-1.5">
                <?php foreach ($service['features'] as $feature): ?>
                <li class="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span class="material-symbols-outlined text-[16px] text-emerald-500 shrink-0">check_circle</span>
                  <span><?= htmlspecialchars($feature); ?></span>
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

    <!-- SECTION: Armada Specs from Model (Data Access: $fleetSpecs) -->
    <section class="flex flex-col gap-4 sm:gap-6">
      <div>
        <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Spesifikasi Armada &mdash; Data dari Model</span>
        <h2 class="text-xl sm:text-2xl text-on-surface font-extrabold tracking-tight mt-1">Armada Logistik SHIFT Siap 24/7</h2>
        <p class="text-sm text-on-surface-variant mt-1">Daftar spesifikasi armada yang dikelola oleh method <code class="font-mono text-primary text-xs bg-primary-fixed/40 px-1 rounded">ShiftPlatform::getFleetSpecs()</code> pada Model layer.</p>
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

    <!-- SECTION: Info Ringkasan Ekosistem (Data dari Model: $profile) -->
    <section class="p-6 sm:p-8 rounded-3xl bg-surface-container-low/70 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex flex-col gap-1 text-center md:text-left">
        <span class="text-xs font-bold text-primary uppercase tracking-wider">Ringkasan Operasional Ekosistem SHIFT</span>
        <h3 class="text-lg sm:text-xl font-extrabold text-on-surface"><?= htmlspecialchars($profile['name']); ?></h3>
        <p class="text-xs text-on-surface-variant max-w-xl">
          <?= htmlspecialchars($profile['tagline']); ?>. Melayani wilayah <?= htmlspecialchars($profile['coverage']); ?> dengan pengawasan terpusat oleh <?= htmlspecialchars($profile['coordinator']); ?>.
        </p>
      </div>
      <div class="flex items-center gap-3 shrink-0 flex-wrap justify-center">
        <a href="./booking.html?service=moving" class="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:bg-primary-container transition-all">
          Booking Pindahan
        </a>
        <a href="./auth.html?path=role-selection" class="px-5 py-2.5 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold shadow-sm hover:bg-surface-dim transition-all">
          Masuk Portal
        </a>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="bg-surface-container-lowest border-t border-slate-100 py-6 mt-auto">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant text-xs sm:text-sm text-center sm:text-left">
      <div class="flex flex-col sm:flex-row items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
          <span class="material-symbols-outlined text-[14px]">account_tree</span>
        </div>
        <span class="font-bold text-on-surface"><?= htmlspecialchars($shift->name); ?> &bull; <?= htmlspecialchars($shift->appVersion); ?></span>
        <span class="text-slate-400 hidden sm:inline">&bull;</span>
        <span>&copy; <?= date('Y'); ?> <?= htmlspecialchars($shift->companyName); ?>. All Rights Reserved.</span>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a href="./index.php" class="text-primary font-bold">Beranda MVC</a>
        <a href="../week6/oop-service.php" class="hover:text-primary transition-colors font-semibold">Week 6 OOP</a>
        <a href="../week5/layanan.php" class="hover:text-primary transition-colors font-semibold">Week 5 Prosedural</a>
        <a href="./auth.html?path=role-selection" class="hover:text-primary transition-colors font-semibold">Portal Akses</a>
      </div>
    </div>
  </footer>

  <script>
    function toggleMobileNav() {
      const menu = document.getElementById('mobileNavMenu');
      const icon = document.getElementById('mobileMenuIcon');
      if (!menu) return;
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        if (icon) icon.textContent = 'close';
      } else {
        menu.classList.add('hidden');
        if (icon) icon.textContent = 'menu';
      }
    }
    function selectServiceCategory(category) {
      console.log('[SHIFT MVC] Service category selected:', category);
      window.location.href = './booking.html?service=' + category;
    }
  </script>

</body>
</html>
