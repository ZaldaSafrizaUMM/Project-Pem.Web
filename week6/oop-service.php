<?php
/*
 * =========================================================================
 * IMPLEMENTASI WEEK 6 (SPRINT 05) - OBJECT-ORIENTED PROGRAMMING (OOP) - SHIFT
 * - Week 6 Task 01: Create a Class (Blueprint class untuk layanan SHIFT)
 * - Week 6 Task 02: Add Properties & Methods (Encapsulation, constructor, data & behavior)
 * - Week 6 Task 03: Generate Dynamic Content with Object (Output HTML dinamis berbasis objek)
 * =========================================================================
 */

// =========================================================================
// WEEK 6 - TASK 01: Create a Class (Blueprint class ShiftService)
// Mendefinisikan class ShiftService sebagai blueprint/cetak biru yang
// merepresentasikan setiap layanan yang tersedia di platform SHIFT.
// =========================================================================

if (!class_exists('ShiftService')) {
    /**
     * Class ShiftService
     *
     * Blueprint OOP untuk merepresentasikan satu unit layanan di platform SHIFT.
     * Menggantikan pendekatan prosedural (array asosiatif biasa) dari Week 5
     * dengan struktur class yang terenkapsulasi, terstruktur, dan mudah diperluas.
     *
     * @package SHIFT\OOP\Sprint05
     * @version v3.0-Sprint05
     */
    class ShiftService {

        // =========================================================================
        // WEEK 6 - TASK 02: Add Properties, Methods, Constructor & Encapsulation
        // Mendefinisikan properti (data) dan method (perilaku) dari objek layanan.
        // Enkapsulasi: properti bersifat private agar hanya bisa diakses/diubah
        // melalui method public (getter/setter) -- prinsip information hiding OOP.
        // =========================================================================

        /** @var int Nomor urut/prioritas layanan di katalog */
        private int $nomorUrut;

        /** @var string Nama resmi layanan SHIFT */
        private string $serviceName;

        /** @var string Deskripsi lengkap layanan */
        private string $serviceDescription;

        /** @var int Harga dasar layanan dalam satuan Rupiah (integer) */
        private int $basePrice;

        /** @var array Daftar fitur unggulan layanan */
        private array $features;

        /** @var string Nama ikon dari library Material Symbols Outlined */
        private string $iconName;

        /** @var string Teks badge/label status layanan */
        private string $badgeText;

        /** @var string Kelas Tailwind CSS untuk warna badge */
        private string $badgeColorClass;

        /** @var string Kelas Tailwind CSS untuk background ikon */
        private string $iconBgClass;

        /** @var string Kelas Tailwind CSS untuk efek hover teks judul */
        private string $hoverTextClass;

        /** @var string Teks pada tombol CTA */
        private string $buttonText;

        /** @var string Kelas Tailwind CSS untuk tombol CTA */
        private string $buttonClass;

        /** @var string URL tujuan halaman pemesanan layanan */
        private string $bookingLink;

        /** @var string Perintah JavaScript untuk fungsi onclick tombol CTA */
        private string $onClickAction;

        // -------------------------------------------------------------------------
        // Constructor: Inisialisasi objek ShiftService dengan data yang diberikan
        // Menggunakan $this-> untuk mengacu ke properti milik objek saat ini
        // -------------------------------------------------------------------------

        /**
         * Constructor ShiftService
         *
         * Menginisialisasi semua properti objek layanan sekaligus saat instansiasi.
         * Named arguments (PHP 8+) dapat digunakan untuk keterbacaan kode yang lebih baik.
         *
         * @param int    $nomorUrut          Nomor urut layanan
         * @param string $serviceName        Nama resmi layanan
         * @param string $serviceDescription Deskripsi lengkap layanan
         * @param int    $basePrice          Harga dasar dalam Rupiah
         * @param array  $features           Daftar fitur unggulan
         * @param string $iconName           Nama ikon Material Symbols Outlined
         * @param string $badgeText          Teks badge status
         * @param string $badgeColorClass    Kelas Tailwind warna badge
         * @param string $iconBgClass        Kelas Tailwind background ikon
         * @param string $hoverTextClass     Kelas Tailwind hover efek judul
         * @param string $buttonText         Teks tombol CTA
         * @param string $buttonClass        Kelas Tailwind tombol CTA
         * @param string $bookingLink        URL halaman pemesanan
         * @param string $onClickAction      Fungsi JavaScript onclick CTA
         */
        public function __construct(
            int    $nomorUrut,
            string $serviceName,
            string $serviceDescription,
            int    $basePrice,
            array  $features,
            string $iconName,
            string $badgeText,
            string $badgeColorClass,
            string $iconBgClass,
            string $hoverTextClass,
            string $buttonText,
            string $buttonClass,
            string $bookingLink,
            string $onClickAction
        ) {
            $this->nomorUrut          = $nomorUrut;
            $this->serviceName        = $serviceName;
            $this->serviceDescription = $serviceDescription;
            $this->basePrice          = $basePrice;
            $this->features           = $features;
            $this->iconName           = $iconName;
            $this->badgeText          = $badgeText;
            $this->badgeColorClass    = $badgeColorClass;
            $this->iconBgClass        = $iconBgClass;
            $this->hoverTextClass     = $hoverTextClass;
            $this->buttonText         = $buttonText;
            $this->buttonClass        = $buttonClass;
            $this->bookingLink        = $bookingLink;
            $this->onClickAction      = $onClickAction;
        }

        // -------------------------------------------------------------------------
        // Public Getter Methods -- Enkapsulasi: akses properti private dari luar class
        // -------------------------------------------------------------------------

        /** @return int Nomor urut layanan */
        public function getNomorUrut(): int { return $this->nomorUrut; }

        /** @return string Nama resmi layanan */
        public function getServiceName(): string { return $this->serviceName; }

        /** @return string Deskripsi layanan */
        public function getServiceDescription(): string { return $this->serviceDescription; }

        /** @return int Harga dasar integer Rupiah */
        public function getBasePrice(): int { return $this->basePrice; }

        /** @return array Daftar fitur layanan */
        public function getFeatures(): array { return $this->features; }

        /** @return string Nama ikon Material Symbols */
        public function getIconName(): string { return $this->iconName; }

        /** @return string Teks badge status */
        public function getBadgeText(): string { return $this->badgeText; }

        /** @return string Link pemesanan */
        public function getBookingLink(): string { return $this->bookingLink; }

        /** @return string Aksi onclick JavaScript */
        public function getOnClickAction(): string { return $this->onClickAction; }

        // -------------------------------------------------------------------------
        // Behavior Methods -- Logic & output yang dilakukan oleh objek ShiftService
        // -------------------------------------------------------------------------

        /**
         * Memformat harga dasar (integer) menjadi string mata uang Rupiah.
         * Menggunakan $this->basePrice (properti private) via enkapsulasi.
         * Contoh: 50000 -> "Rp 50.000"
         *
         * @return string Harga terformat sebagai string Rupiah
         */
        public function formatHarga(): string {
            return "Rp " . number_format($this->basePrice, 0, ',', '.');
        }

        /**
         * Mengembalikan ringkasan data layanan sebagai associative array.
         * Berguna untuk debugging, logging, atau serialisasi data objek.
         * Demonstrasi penggunaan $this-> untuk mengakses semua properti private.
         *
         * @return array Ringkasan informasi layanan
         */
        public function getServiceInfo(): array {
            return [
                'nomor'     => $this->nomorUrut,
                'nama'      => $this->serviceName,
                'deskripsi' => $this->serviceDescription,
                'harga'     => $this->formatHarga(),
                'fitur'     => $this->features,
                'ikon'      => $this->iconName,
                'badge'     => $this->badgeText,
                'link'      => $this->bookingLink,
            ];
        }

        /**
         * Merender badge HTML layanan menggunakan properti objek via $this->
         * Badge menampilkan nomor urut dan label status dalam pill Tailwind CSS.
         *
         * @return string HTML string badge layanan
         */
        public function renderBadge(): string {
            return sprintf(
                '<span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold">#0%d</span>
                 <span class="px-2.5 py-1 rounded-full %s text-xs font-extrabold uppercase tracking-wider">%s</span>',
                $this->nomorUrut,
                htmlspecialchars($this->badgeColorClass),
                htmlspecialchars($this->badgeText)
            );
        }

        /**
         * Merender daftar fitur layanan sebagai list item HTML.
         * Iterasi atas $this->features (array private) menggunakan foreach.
         *
         * @return string HTML string list fitur layanan
         */
        public function renderFeatureList(): string {
            $html = '';
            foreach ($this->features as $feature) {
                $html .= sprintf(
                    '<li class="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span class="material-symbols-outlined text-[15px] text-emerald-500 shrink-0">check_circle</span>
                        <span class="truncate">%s</span>
                     </li>',
                    htmlspecialchars($feature)
                );
            }
            return $html;
        }

        /**
         * Merender kartu layanan lengkap sebagai blok HTML dinamis.
         * Method utama Task 03: objek menghasilkan output HTML siap render ke halaman.
         * Tampilan visual dirancang bersih, rapi, dan konsisten dengan sistem Soft UI Week 5.
         *
         * @return string HTML string kartu layanan lengkap
         */
        public function renderServiceCard(): string {
            $badge       = $this->renderBadge();
            $featureList = $this->renderFeatureList();
            $harga       = $this->formatHarga();
            $nomorLabel  = sprintf('%02d', $this->nomorUrut);

            $iconBg   = htmlspecialchars($this->iconBgClass);
            $hoverTxt = htmlspecialchars($this->hoverTextClass);
            $btnClass = htmlspecialchars($this->buttonClass);
            $btnText  = htmlspecialchars($this->buttonText);
            $link     = htmlspecialchars($this->bookingLink);
            $onclick  = htmlspecialchars($this->onClickAction);
            $name     = htmlspecialchars($this->serviceName);
            $desc     = htmlspecialchars($this->serviceDescription);
            $icon     = htmlspecialchars($this->iconName);

            return <<<HTML
            <!-- KARTU LAYANAN PRIORITAS #{$nomorLabel} (DYNAMIC OOP OBJECT RENDER) -->
            <div class="group relative rounded-3xl bg-surface-container-lowest/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-slate-100 overflow-hidden">
              
              <div class="flex flex-col gap-4 relative z-10">
                <!-- Header Kartu: Ikon Material Symbols, Nomor Prioritas, dan Status Badge -->
                <div class="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl {$iconBg} flex items-center justify-center shadow-inner transition-colors duration-300 shrink-0">
                    <span class="material-symbols-outlined text-[28px] sm:text-[32px]">{$icon}</span>
                  </div>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    {$badge}
                  </div>
                </div>

                <!-- Konten: Judul & Deskripsi Lengkap Layanan -->
                <div>
                  <span class="text-xs font-extrabold text-primary uppercase tracking-wider">Layanan Prioritas #{$nomorLabel}</span>
                  <h3 class="text-lg sm:text-xl text-on-surface font-extrabold {$hoverTxt} transition-colors mt-0.5 break-words">
                    {$name}
                  </h3>
                  <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-2 line-clamp-3">
                    {$desc}
                  </p>
                </div>

                <!-- Fitur Unggulan Layanan (OOP Method renderFeatureList) -->
                <div class="p-3 rounded-2xl bg-surface-container-low/60 border border-slate-100">
                  <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">Fitur Unggulan:</span>
                  <ul class="flex flex-col gap-1">
                    {$featureList}
                  </ul>
                </div>

                <!-- Tarif Mulai Dari -->
                <div class="p-3 sm:p-3.5 rounded-2xl bg-surface-container-low/70 border border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                  <div class="flex flex-col min-w-0">
                    <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Tarif Mulai Dari</span>
                    <span class="text-base sm:text-lg font-extrabold text-primary">{$harga}</span>
                  </div>
                  <span class="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                    <span class="material-symbols-outlined text-[14px]">verified</span> Terverifikasi
                  </span>
                </div>
              </div>

              <!-- Tombol Aksi Menuju Link Pemesanan -->
              <div class="pt-4 mt-4 border-t border-slate-100 relative z-10">
                <a href="{$link}" onclick="{$onclick}; return false;" class="w-full py-3 sm:py-3.5 px-4 rounded-full {$btnClass} text-xs sm:text-sm font-bold flex items-center justify-between shadow-md transition-all cursor-pointer">
                  <span class="truncate pr-2">{$btnText}</span>
                  <span class="w-7 h-7 rounded-full bg-current/15 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </span>
                </a>
              </div>
            </div>
HTML;
        }
    }
}

// =========================================================================
// WEEK 6 - TASK 03: Generate Dynamic Content with Object (Object -> PHP -> HTML)
// Instansiasi objek konkret dari class ShiftService
// =========================================================================

// Variabel Konfigurasi & Data Metadata Pendukung Aplikasi SHIFT
$appName            = "SHIFT (Siap Hadir, Instan, Fleksibel, Tuntas)";
$appShortName       = "SHIFT";
$appTagline         = "Solusi Pindahan & Deep Cleaning Terpadu Indonesia";
$coordinatorName    = "Tim Operasional SHIFT Indonesia";
$operationalPeriod  = "2025 - 2026 (Layanan Aktif 24/7)";
$systemStatus       = "active";
$appVersion         = "v3.0-Sprint05";
$companyName        = "PT Siap Hadir Fleksibel Tuntas";
$currentYear        = date("Y");
$csHotline          = "+62 812-3456-7890";
$operationalCoverage = "Jabodetabek, Bandung, Semarang, Surabaya, & D.I. Yogyakarta";

/**
 * Memeriksa status operasional
 * @param string $status
 * @return string
 */
function getServiceStatus($status) {
    return ($status === "active") ? "Berjalan" : "Tidak Aktif";
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

$systemStatusLabel = ($systemStatus === "active") 
    ? "Ekosistem Logistik & Sanitasi Terpadu {$appVersion} (Status: " . getServiceStatus($systemStatus) . ")"
    : "Pemeliharaan Server Berkala {$appVersion} (Status: " . getServiceStatus($systemStatus) . ")";
$systemStatusPulse = ($systemStatus === "active") ? "bg-emerald-500 animate-pulse" : "bg-amber-500";
$promoBannerText = "Hemat s.d 15% untuk Pemesanan via Online Hari Ini!";

// -------------------------------------------------------------------------
// Instansiasi Layanan Prioritas Utama SHIFT (Object Instantiation via Constructor)
// -------------------------------------------------------------------------

/**
 * Instansiasi Objek #01: Jasa Pindahan Kos & Rumah
 */
$movingService = new ShiftService(
    nomorUrut:          1,
    serviceName:        "Jasa Pindahan Kos & Rumah (Moving & Armada)",
    serviceDescription: "Layanan pindahan praktis untuk kamar kos, apartemen, kontrakan, hingga rumah keluarga dengan opsi armada motor kargo, pick-up bak/box, hingga truk engkel serta live GPS.",
    basePrice:          50000,
    features:           ["Armada Pick-Up & Truk Siap", "Live GPS Tracking Real-Time", "Kru Helper Terlatih & Sigap"],
    iconName:           "local_shipping",
    badgeText:          "Armada Siap 24/7",
    badgeColorClass:    "bg-primary-fixed/60 text-primary",
    iconBgClass:        "bg-primary-fixed/60 text-primary group-hover:bg-primary group-hover:text-on-primary",
    hoverTextClass:     "group-hover:text-primary",
    buttonText:         "Pesan Jasa Pindahan",
    buttonClass:        "bg-primary hover:bg-primary-container text-on-primary",
    bookingLink:        "./booking.html?service=moving",
    onClickAction:      "selectServiceCategory('moving')"
);

/**
 * Instansiasi Objek #02: Jasa Deep Cleaning & Sanitasi Ruangan
 */
$cleaningService = new ShiftService(
    nomorUrut:          2,
    serviceName:        "Jasa Deep Cleaning & Sanitasi Ruangan",
    serviceDescription: "Pembersihan intensif hunian, sterilisasi lampu UV-C, hydro-vacuum tungau kasur/sofa, pembersihan kerak toilet, dan disinfeksi ruangan higienis ramah lingkungan.",
    basePrice:          85000,
    features:           ["Sterilisasi Sinar UV-C & Ozon", "Hydro-Vacuum Tungau & Alergen", "Disinfeksi Eco-Friendly SNI"],
    iconName:           "cleaning_services",
    badgeText:          "Steril UV-C & Eco-Clean",
    badgeColorClass:    "bg-secondary-container text-on-secondary-container",
    iconBgClass:        "bg-secondary-fixed/60 text-on-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container",
    hoverTextClass:     "group-hover:text-secondary",
    buttonText:         "Pesan Deep Cleaning",
    buttonClass:        "bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-extrabold",
    bookingLink:        "./cleaning.html",
    onClickAction:      "selectServiceCategory('cleaning')"
);

/**
 * Instansiasi Objek #03: Kru Angkut & Helper Profesional
 */
$helperService = new ShiftService(
    nomorUrut:          3,
    serviceName:        "Kru Angkut & Helper Profesional",
    serviceDescription: "Bantuan tenaga kerja profesional untuk proses angkut perabotan berat, bongkar pasang furniture, packing kardus bubble wrap protektif, dan penataan rapi di tempat baru.",
    basePrice:          40000,
    features:           ["Tenaga Kerja Angkut Terverifikasi", "Bongkar-Pasang Furniture Rapi", "Safety Packing & Bubble Wrap"],
    iconName:           "engineering",
    badgeText:          "Kru Terlatih & Terverifikasi",
    badgeColorClass:    "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    iconBgClass:        "bg-tertiary-fixed/60 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary",
    hoverTextClass:     "group-hover:text-tertiary",
    buttonText:         "Pesan Kru Angkut",
    buttonClass:        "bg-tertiary hover:bg-tertiary-container text-on-tertiary font-bold",
    bookingLink:        "./booking.html?service=moving&type=helper",
    onClickAction:      "selectServiceCategory('moving')"
);

/**
 * Instansiasi Objek #04: Armada Express & Premium
 */
$expressService = new ShiftService(
    nomorUrut:          4,
    serviceName:        "Armada Express & Premium (Truk & Box)",
    serviceDescription: "Layanan armada premium untuk pindahan skala besar menggunakan truk engkel, truk double, hingga armada box tertutup dengan proteksi muatan optimal.",
    basePrice:          250000,
    features:           ["Truk Engkel & Double Tersedia", "Proteksi Tertutup Bebas Hujan", "Kapasitas Muatan Ekstra Luas"],
    iconName:           "airport_shuttle",
    badgeText:          "Premium & Terjamin",
    badgeColorClass:    "bg-primary-fixed text-on-primary-fixed",
    iconBgClass:        "bg-primary-fixed/60 text-primary group-hover:bg-primary group-hover:text-on-primary",
    hoverTextClass:     "group-hover:text-primary",
    buttonText:         "Pesan Armada Express",
    buttonClass:        "bg-primary hover:bg-primary-container text-on-primary font-bold",
    bookingLink:        "./booking.html?service=moving&type=premium",
    onClickAction:      "selectServiceCategory('moving')"
);

/**
 * Instansiasi Objek #05: Paket Pindahan All-Inclusive SHIFT
 */
$allInclusiveService = new ShiftService(
    nomorUrut:          5,
    serviceName:        "Paket Pindahan All-Inclusive SHIFT",
    serviceDescription: "Paket bundling terlengkap: armada + kru angkut + packing material + deep cleaning lokasi asal & tujuan dalam satu harga transparan tanpa ribet.",
    basePrice:          325000,
    features:           ["Bundling Armada + Kru + Packing", "Deep Cleaning Asal & Tujuan", "Garansi Kepuasan & Asuransi"],
    iconName:           "inventory_2",
    badgeText:          "All-Inclusive Bundle",
    badgeColorClass:    "bg-secondary-container text-on-secondary-container",
    iconBgClass:        "bg-secondary-fixed/60 text-on-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container",
    hoverTextClass:     "group-hover:text-secondary",
    buttonText:         "Pesan Paket All-Inclusive",
    buttonClass:        "bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-extrabold",
    bookingLink:        "./booking.html?service=moving&package=allinclusive",
    onClickAction:      "selectServiceCategory('moving')"
);

/**
 * Instansiasi Objek #06: Jasa Sanitasi & Pest Control Khusus
 */
$sanitasiService = new ShiftService(
    nomorUrut:          6,
    serviceName:        "Jasa Sanitasi & Pest Control Khusus",
    serviceDescription: "Pengendalian hama terpadu (rayap, kutu kasur, kecoa) menggunakan cairan food-grade ramah anak & hewan peliharaan, bersertifikasi aman dan tuntas.",
    basePrice:          125000,
    features:           ["Bahan Food-Grade Eco-Friendly", "Aman untuk Anak & Peliharaan", "Teknisi Khusus Bersertifikat"],
    iconName:           "pest_control",
    badgeText:          "Higienis & Tersertifikasi",
    badgeColorClass:    "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    iconBgClass:        "bg-tertiary-fixed/60 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary",
    hoverTextClass:     "group-hover:text-tertiary",
    buttonText:         "Pesan Sanitasi Khusus",
    buttonClass:        "bg-tertiary hover:bg-tertiary-container text-on-tertiary font-bold",
    bookingLink:        "./cleaning.html?service=pestcontrol",
    onClickAction:      "selectServiceCategory('cleaning')"
);

// Koleksi seluruh objek layanan ShiftService
$allServices = [
    $movingService,
    $cleaningService,
    $helperService,
    $expressService,
    $allInclusiveService,
    $sanitasiService
];

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
        "description" => "Harga dihitung otomatis dari rute km presisi. Tidak ada biaya siluman di lokasi penjemputan maupun tujuan."
    ],
    [
        "icon" => "verified",
        "icon_color" => "bg-secondary-fixed/50 text-secondary",
        "title" => "Garansi & Asuransi 100%",
        "description" => "Jaminan kompensasi penuh jika perabotan rusak atau hasil pengerjaan deep clean hunian kurang memuaskan."
    ],
    [
        "icon" => "map",
        "icon_color" => "bg-tertiary-fixed/50 text-tertiary",
        "title" => "Pelacakan Live GPS",
        "description" => "Pantau koordinat pergerakan armada driver atau jadwal kedatangan tim cleaner secara real-time via web."
    ],
    [
        "icon" => "support_agent",
        "icon_color" => "bg-emerald-100 text-emerald-800",
        "title" => "Mitra Terlatih & CS 24/7",
        "description" => "Driver, helper, & cleaner bersertifikasi dengan dukungan hotline Customer Service WhatsApp 24 jam nonstop."
    ]
];
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta content="web_standard" name="shell-type"/>
  <title><?= $appName ?> - <?= $appTagline ?></title>
  
  <!-- Google Fonts: Plus Jakarta Sans -->
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
  
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
  
  <!-- Tailwind CSS CDN & Soft UI System Tokens -->
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
          fontFamily: {
            "sans": ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
            "headline-sm": ["Plus Jakarta Sans"],
            "label-md": ["Plus Jakarta Sans"],
            "body-lg": ["Plus Jakarta Sans"],
            "headline-lg": ["Plus Jakarta Sans"],
            "headline-md": ["Plus Jakarta Sans"],
            "label-lg": ["Plus Jakarta Sans"],
            "body-md": ["Plus Jakarta Sans"],
            "body-sm": ["Plus Jakarta Sans"],
            "headline-xl": ["Plus Jakarta Sans"],
            "label-sm": ["Plus Jakarta Sans"],
            "display": ["Plus Jakarta Sans"]
          }
        }
      }
    };
  </script>
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
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="./index.php">Beranda</a>
        <a aria-current="page" class="px-4 py-1.5 transition-colors bg-surface-container-high text-on-surface font-semibold rounded-full text-xs sm:text-sm" href="./oop-service.php">Katalog Layanan</a>
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
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2" href="./index.php">
        <span class="material-symbols-outlined text-[20px]">home</span> Beranda
      </a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm transition-colors bg-primary-fixed/50 text-primary font-bold flex items-center gap-2" href="./oop-service.php">
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

        <!-- Informasi Utama Platform SHIFT (Soft UI Glass Card) -->
        <div class="w-full max-w-3xl mt-6 p-4 sm:p-6 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md border border-slate-200/80 text-left">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[20px]">info</span>
              </div>
              <div class="min-w-0">
                <span class="text-sm sm:text-base font-bold text-on-surface truncate block">Informasi Utama Platform SHIFT</span>
                <span class="block text-xs text-on-surface-variant font-medium">Server-Side OOP Architecture (Sprint 05 - Week 6)</span>
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
              <span class="text-xs text-on-surface-variant font-medium">Paradigma Server:</span>
              <span class="text-xs sm:text-sm md:text-base font-bold text-on-surface leading-tight mt-0.5 break-words">
                Object-Oriented PHP (Class &amp; Object)
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
    <!-- WEEK 6 - TASK 03: Dynamic Content with Object (KARTU LAYANAN OOP SHIFT)    -->
    <!-- Menghasilkan kartu layanan HTML secara dinamis melalui objek ShiftService  -->
    <!-- ========================================================================= -->
    <section class="flex flex-col gap-4 sm:gap-6" id="katalog-layanan">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
        <div>
          <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Katalog Layanan Prioritas SHIFT</span>
          <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1 break-words">
            Pilihan Layanan Siap Dipesan
          </h2>
          <p class="text-xs sm:text-sm text-on-surface-variant mt-1">
            Dirender secara dinamis melalui instansiasi objek class <code class="font-mono text-primary bg-primary-fixed/30 px-1 rounded text-xs">ShiftService</code> dan method <code class="font-mono text-primary bg-primary-fixed/30 px-1 rounded text-xs">$service->renderServiceCard()</code>.
          </p>
        </div>
        <div class="shrink-0 flex items-center gap-2 bg-primary-fixed/40 border border-primary/20 px-3.5 py-1.5 rounded-full self-start md:self-auto">
          <span class="material-symbols-outlined text-primary text-[18px]">widgets</span>
          <span class="text-xs font-extrabold text-primary"><?= count($allServices) ?> Layanan OOP Siap Dipesan</span>
        </div>
      </div>

      <!-- Bento Grid Kartu Layanan Dinamis Berbasis Objek OOP -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <?php foreach ($allServices as $service) : ?>
          <?php echo $service->renderServiceCard(); ?>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SEKSI KEUNGGULAN SHIFT (WHY CHOOSE US)                                    -->
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
    <!-- DOKUMENTASI TEKNIS OOP (COLLAPSIBLE ACCORDION PANEL)                      -->
    <!-- Menyimpan rincian spesifikasi OOP secara rapi tanpa mengotori UI utama    -->
    <!-- ========================================================================= -->
    <details class="group rounded-3xl bg-surface-container-low/40 border border-slate-200/70 p-5 sm:p-6 transition-all duration-300">
      <summary class="cursor-pointer font-bold text-sm sm:text-base text-on-surface flex items-center justify-between gap-2 select-none">
        <span class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[18px]">code</span>
          </span>
          <span>Dokumentasi Arsitektur OOP PHP (Sprint 05 - Week 6)</span>
        </span>
        <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform duration-200 text-[20px]">
          expand_more
        </span>
      </summary>

      <div class="mt-5 pt-5 border-t border-slate-200/70 flex flex-col gap-6 text-xs sm:text-sm">
        
        <!-- Grid Task 01, 02, 03 Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-surface-container-lowest border border-slate-100 flex flex-col gap-2 shadow-sm">
            <span class="text-[11px] font-extrabold text-primary uppercase tracking-wider">Week 6 - Task 01</span>
            <h4 class="font-bold text-on-surface text-sm">Create a Class</h4>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Blueprint class <code class="font-mono text-primary bg-primary-fixed/30 px-1 rounded">ShiftService</code> menggantikan struktur array prosedural dengan tipe data objek terstruktur.
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-lowest border border-slate-100 flex flex-col gap-2 shadow-sm">
            <span class="text-[11px] font-extrabold text-secondary uppercase tracking-wider">Week 6 - Task 02</span>
            <h4 class="font-bold text-on-surface text-sm">Properties &amp; Methods</h4>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Enkapsulasi 14 properti <code class="font-mono bg-slate-100 px-1 rounded">private</code>, inisialisasi via constructor <code class="font-mono bg-slate-100 px-1 rounded">__construct()</code>, serta behavior methods (<code class="font-mono text-xs">formatHarga()</code>, <code class="font-mono text-xs">renderServiceCard()</code>).
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-lowest border border-slate-100 flex flex-col gap-2 shadow-sm">
            <span class="text-[11px] font-extrabold text-tertiary uppercase tracking-wider">Week 6 - Task 03</span>
            <h4 class="font-bold text-on-surface text-sm">Dynamic Content</h4>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Instansiasi <?= count($allServices); ?> objek layanan konkret menggunakan keyword <code class="font-mono bg-slate-100 px-1 rounded">new</code>, menghasilkan HTML dinamis siap render ke antarmuka pengguna.
            </p>
          </div>
        </div>

        <!-- OOP Output Verification Table: getServiceInfo() -->
        <div class="flex flex-col gap-2">
          <span class="font-bold text-xs uppercase tracking-wider text-on-surface-variant">Verifikasi Enkapsulasi: Output Method getServiceInfo()</span>
          <div class="overflow-x-auto rounded-2xl border border-slate-100 bg-surface-container-lowest">
            <table class="w-full text-left text-xs">
              <thead class="bg-surface-container-low text-on-surface-variant font-bold border-b border-slate-100">
                <tr>
                  <th class="p-3">#</th>
                  <th class="p-3">Nama Layanan (Object)</th>
                  <th class="p-3">Harga Dasar</th>
                  <th class="p-3">Ikon Symbol</th>
                  <th class="p-3">Status Badge</th>
                  <th class="p-3">Total Fitur</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <?php foreach ($allServices as $svc): 
                  $info = $svc->getServiceInfo(); ?>
                <tr class="hover:bg-surface-container-low/40 transition-colors">
                  <td class="p-3 font-extrabold text-primary">#0<?= $info['nomor']; ?></td>
                  <td class="p-3 font-semibold text-on-surface"><?= htmlspecialchars($info['nama']); ?></td>
                  <td class="p-3 font-bold text-emerald-700"><?= htmlspecialchars($info['harga']); ?></td>
                  <td class="p-3"><code class="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-primary"><?= htmlspecialchars($info['ikon']); ?></code></td>
                  <td class="p-3"><span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]"><?= htmlspecialchars($info['badge']); ?></span></td>
                  <td class="p-3 font-semibold text-on-surface-variant"><?= count($info['fitur']); ?> fitur terdaftar</td>
                </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
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
        <span class="font-bold text-on-surface"><?= $appName ?> Platform <?= $appVersion ?></span>
        <span class="text-slate-400 hidden sm:inline">•</span>
        <span>© <?= $currentYear ?> <?= $companyName ?>. All Rights Reserved.</span>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a href="./auth.html?path=role-selection" class="hover:text-primary transition-colors font-semibold">Portal Akses</a>
        <a href="./mitra.html" class="hover:text-primary transition-colors font-semibold">Portal Mitra</a>
        <a href="./history.html" class="hover:text-primary transition-colors font-semibold">Pusat Bantuan</a>
        <a href="#" onclick="if(typeof openWhatsAppCS==='function') openWhatsAppCS(); return false;" class="hover:text-primary transition-colors font-semibold">Hubungi CS (<?= $csHotline ?>)</a>
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
