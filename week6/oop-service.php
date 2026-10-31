<?php
/*
 * =========================================================================
 * IMPLEMENTASI WEEK 6 (SPRINT 05) - OBJECT-ORIENTED PROGRAMMING (OOP) - SHIFT
 * - Week 6 Task 01: Create a Class (Blueprint class untuk layanan SHIFT)
 * - Week 6 Task 02: Add Properties & Methods (Encapsulation public/private, constructor, data & behavior)
 * - Week 6 Task 03: Generate Dynamic Content with Object (Output HTML dinamis berbasis objek)
 * =========================================================================
 */

// =========================================================================
// WEEK 6 - TASK 01: Create a Class (Blueprint class ShiftService)
// Mendefinisikan class ShiftService sebagai blueprint/cetak biru yang
// merepresentasikan setiap layanan yang tersedia di platform SHIFT.
// Class ini akan diinstansiasi menjadi objek konkret pada Task 03.
// =========================================================================

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
     * Named arguments (PHP 8+) digunakan untuk keterbacaan kode yang lebih baik.
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

    /** @return string Link pemesanan */
    public function getBookingLink(): string { return $this->bookingLink; }

    // -------------------------------------------------------------------------
    // Behavior Methods -- Logic & output yang dilakukan oleh objek ShiftService
    // -------------------------------------------------------------------------

    /**
     * Memformat harga dasar (integer) menjadi string mata uang Rupiah.
     * Menggunakan $this->basePrice (properti private) via enkapsulasi.
     * Contoh: 125000 -> "Rp 125.000"
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
                    <span class="material-symbols-outlined text-[16px] text-emerald-500 shrink-0">check_circle</span>
                    <span>%s</span>
                 </li>',
                htmlspecialchars($feature)
            );
        }
        return $html;
    }

    /**
     * Merender kartu layanan lengkap sebagai blok HTML dinamis.
     * Method utama Task 03: objek menghasilkan output HTML siap render ke halaman.
     * Seluruh konten kartu dibangun dari properti private via $this->
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
        <!-- KARTU OOP #{$nomorLabel}: Output renderServiceCard() dari objek ShiftService -->
        <div class="group relative rounded-3xl bg-surface-container-lowest/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-slate-100 overflow-hidden">

          <!-- OOP Object Marker Badge -->
          <div class="absolute top-3 right-3 z-20">
            <span class="inline-flex items-center gap-1 bg-gradient-to-r from-primary to-primary-container text-on-primary text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md uppercase tracking-widest">
              <span class="material-symbols-outlined text-[12px]">code</span> OOP Object
            </span>
          </div>

          <div class="flex flex-col gap-4 relative z-10">
            <!-- Header: Ikon Material Symbols & Badge -->
            <div class="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl {$iconBg} flex items-center justify-center shadow-inner transition-colors duration-300 shrink-0">
                <span class="material-symbols-outlined text-[28px] sm:text-[32px]">{$icon}</span>
              </div>
              <div class="flex items-center gap-1.5 flex-wrap pt-0.5 pr-20">
                {$badge}
              </div>
            </div>

            <!-- Konten: Label, Judul & Deskripsi (dari $this->serviceName, $this->serviceDescription) -->
            <div>
              <span class="text-xs font-extrabold text-primary uppercase tracking-wider">Layanan Prioritas #{$nomorLabel}</span>
              <h3 class="text-lg sm:text-xl text-on-surface font-extrabold {$hoverTxt} transition-colors mt-0.5 break-words leading-snug">
                {$name}
              </h3>
              <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-2 line-clamp-3">
                {$desc}
              </p>
            </div>

            <!-- Fitur Unggulan (dirender oleh renderFeatureList() dari $this->features) -->
            <div class="p-3 rounded-2xl bg-surface-container-low/60 border border-slate-100">
              <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Fitur Unggulan:</span>
              <ul class="flex flex-col gap-1.5">
                {$featureList}
              </ul>
            </div>

            <!-- Tarif Mulai Dari (dirender oleh formatHarga() dari $this->basePrice) -->
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

          <!-- Tombol CTA (dari $this->buttonText, $this->bookingLink, $this->onClickAction) -->
          <div class="pt-4 mt-4 border-t border-slate-100 relative z-10">
            <a href="{$link}"
               onclick="{$onclick}; return false;"
               class="w-full py-3 sm:py-3.5 px-4 rounded-full {$btnClass} text-xs sm:text-sm font-bold flex items-center justify-between shadow-md transition-all cursor-pointer">
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

// =========================================================================
// WEEK 6 - TASK 03: Generate Dynamic Content with Object (Object -> PHP -> HTML)
// Membuat instansiasi objek dari class ShiftService, lalu memanggil method
// renderServiceCard() di dalam template HTML untuk output dinamis berbasis OOP.
// =========================================================================

// --- Metadata Aplikasi SHIFT (versi Sprint 05 OOP) ---
$appName            = "SHIFT (Siap Hadir, Instan, Fleksibel, Tuntas)";
$appVersion         = "v3.0-Sprint05";
$companyName        = "PT Siap Hadir Fleksibel Tuntas";
$currentYear        = date("Y");
$systemStatusPulse  = "bg-emerald-500 animate-pulse";
$systemStatusLabel  = "Ekosistem OOP Sprint 05 {$appVersion} (Status: Berjalan)";

/**
 * Instansiasi Objek #01: Jasa Pindahan Kos & Rumah
 * Keyword new memanggil __construct() dan menghasilkan objek ShiftService konkret.
 * Named arguments PHP 8+ digunakan agar parameter lebih terbaca.
 */
$movingService = new ShiftService(
    nomorUrut:          1,
    serviceName:        "Jasa Pindahan Kos & Rumah (Moving & Armada)",
    serviceDescription: "Layanan pindahan praktis untuk kamar kos, apartemen, kontrakan, hingga rumah keluarga dengan opsi armada motor kargo, pick-up bak/box, hingga truk engkel serta live GPS tracking real-time.",
    basePrice:          50000,
    features:           ["Armada Motor Kargo & Pick-Up Box", "Live GPS Tracking Real-Time", "Helper Angkut Termasuk", "Packing Bubble Wrap Protektif", "Estimasi Tarif Otomatis"],
    iconName:           "local_shipping",
    badgeText:          "Armada Siap 24/7",
    badgeColorClass:    "bg-primary-fixed/60 text-primary",
    iconBgClass:        "bg-primary-fixed/60 text-primary group-hover:bg-primary group-hover:text-on-primary",
    hoverTextClass:     "group-hover:text-primary",
    buttonText:         "Pesan Jasa Pindahan",
    buttonClass:        "bg-primary hover:bg-primary-container text-on-primary",
    bookingLink:        "../week5/booking.html?service=moving",
    onClickAction:      "selectServiceCategory('moving')"
);

/**
 * Instansiasi Objek #02: Jasa Deep Cleaning & Sanitasi Ruangan
 */
$cleaningService = new ShiftService(
    nomorUrut:          2,
    serviceName:        "Jasa Deep Cleaning & Sanitasi Ruangan",
    serviceDescription: "Pembersihan intensif hunian, sterilisasi lampu UV-C, hydro-vacuum tungau kasur/sofa, pembersihan kerak toilet, dan disinfeksi ruangan higienis ramah lingkungan bersertifikasi SNI.",
    basePrice:          85000,
    features:           ["Sterilisasi UV-C Profesional", "Hydro-Vacuum Kasur & Sofa", "Disinfeksi Eco-Friendly SNI", "Pembersihan Kerak Bathroom", "Teknisi Bersertifikat BNSP"],
    iconName:           "cleaning_services",
    badgeText:          "Steril UV-C & Eco-Clean",
    badgeColorClass:    "bg-secondary-container text-on-secondary-container",
    iconBgClass:        "bg-secondary-fixed/60 text-on-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container",
    hoverTextClass:     "group-hover:text-secondary",
    buttonText:         "Pesan Deep Cleaning",
    buttonClass:        "bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-extrabold",
    bookingLink:        "../week5/cleaning.html",
    onClickAction:      "selectServiceCategory('cleaning')"
);

/**
 * Instansiasi Objek #03: Kru Angkut & Helper Profesional
 */
$helperService = new ShiftService(
    nomorUrut:          3,
    serviceName:        "Kru Angkut & Helper Profesional",
    serviceDescription: "Bantuan tenaga kerja profesional terlatih untuk proses angkut perabotan berat, bongkar pasang furniture, packing kardus bubble wrap protektif, dan penataan rapi di tempat tujuan.",
    basePrice:          40000,
    features:           ["Kru Terlatih & Terverifikasi", "Angkut Perabotan Berat Aman", "Bongkar-Pasang Furniture", "Packing Kardus Profesional", "Penataan Rapi di Tempat Baru"],
    iconName:           "engineering",
    badgeText:          "Kru Terlatih & Terverifikasi",
    badgeColorClass:    "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    iconBgClass:        "bg-tertiary-fixed/60 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary",
    hoverTextClass:     "group-hover:text-tertiary",
    buttonText:         "Pesan Kru Angkut",
    buttonClass:        "bg-tertiary hover:bg-tertiary-container text-on-tertiary font-bold",
    bookingLink:        "../week5/booking.html?service=moving&type=helper",
    onClickAction:      "selectServiceCategory('moving')"
);

/**
 * Instansiasi Objek #04: Armada Express & Premium
 */
$expressService = new ShiftService(
    nomorUrut:          4,
    serviceName:        "Armada Express & Premium (Truk & Container)",
    serviceDescription: "Layanan armada premium untuk pindahan skala besar menggunakan truk engkel, truk double, hingga container 20-40 ft dengan proteksi kargo asuransi penuh dan jadwal fleksibel.",
    basePrice:          250000,
    features:           ["Truk Engkel & Double Tersedia", "Container 20ft & 40ft Option", "Asuransi Kargo Penuh Included", "Jadwal Penjemputan Fleksibel", "Koordinator Armada Dedicated"],
    iconName:           "airport_shuttle",
    badgeText:          "Premium & Terjamin",
    badgeColorClass:    "bg-error-container text-on-error-container",
    iconBgClass:        "bg-error-container/60 text-error group-hover:bg-error group-hover:text-on-error",
    hoverTextClass:     "group-hover:text-error",
    buttonText:         "Pesan Armada Express",
    buttonClass:        "bg-on-surface hover:bg-inverse-surface text-surface font-bold",
    bookingLink:        "../week5/booking.html?service=moving&type=premium",
    onClickAction:      "selectServiceCategory('moving')"
);

/**
 * Instansiasi Objek #05: Paket Pindahan All-Inclusive SHIFT
 */
$allInclusiveService = new ShiftService(
    nomorUrut:          5,
    serviceName:        "Paket Pindahan All-Inclusive SHIFT",
    serviceDescription: "Paket bundling terlengkap: armada + kru angkut + packing material + deep cleaning lokasi asal & tujuan dalam satu harga transparan. Solusi pindahan zero-hassle terpadu.",
    basePrice:          325000,
    features:           ["Bundling Armada + Kru + Packing", "Deep Cleaning Lokasi Asal & Tujuan", "Material Bubble Wrap & Kardus Included", "Koordinator Personal Dedicated", "Garansi Kepuasan 100% atau Refund"],
    iconName:           "inventory_2",
    badgeText:          "All-Inclusive Bundle",
    badgeColorClass:    "bg-primary-fixed text-on-primary-fixed",
    iconBgClass:        "bg-primary-fixed/60 text-on-primary-fixed group-hover:bg-primary group-hover:text-on-primary",
    hoverTextClass:     "group-hover:text-primary",
    buttonText:         "Pesan Paket All-Inclusive",
    buttonClass:        "bg-primary hover:bg-primary-container text-on-primary font-bold",
    bookingLink:        "../week5/booking.html?service=all-inclusive",
    onClickAction:      "selectServiceCategory('moving')"
);

/**
 * Instansiasi Objek #06: Jasa Sanitasi & Pest Control Profesional
 */
$sanitasiService = new ShiftService(
    nomorUrut:          6,
    serviceName:        "Jasa Sanitasi & Pest Control Profesional",
    serviceDescription: "Pengendalian hama terpadu (rayap, tikus, kecoa, nyamuk) menggunakan bahan kimia food-grade ramah anak & hewan peliharaan, dengan sertifikasi Kemenkes RI dan garansi 3 bulan.",
    basePrice:          125000,
    features:           ["Pengendalian Rayap & Tikus", "Bahan Kimia Food-Grade Aman", "Sertifikasi Kemenkes RI", "Garansi 3 Bulan Bebas Hama", "Teknisi Berseragam & ID Resmi"],
    iconName:           "pest_control",
    badgeText:          "Kemenkes RI Certified",
    badgeColorClass:    "bg-secondary-fixed text-on-secondary-fixed",
    iconBgClass:        "bg-secondary-fixed/60 text-secondary group-hover:bg-secondary-container group-hover:text-on-secondary-container",
    hoverTextClass:     "group-hover:text-secondary",
    buttonText:         "Pesan Sanitasi & Pest Control",
    buttonClass:        "bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-extrabold",
    bookingLink:        "../week5/booking.html?service=cleaning&type=pestcontrol",
    onClickAction:      "selectServiceCategory('cleaning')"
);

// --- Array of Objects: kumpulan semua instansiasi ShiftService untuk iterasi ---
$allServices = [
    $movingService,
    $cleaningService,
    $helperService,
    $expressService,
    $allInclusiveService,
    $sanitasiService,
];

?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta content="web_standard" name="shell-type"/>
  <title>SHIFT OOP Catalog &mdash; Week 6 Sprint 05 | Object-Oriented PHP</title>
  <meta name="description" content="Katalog Layanan SHIFT versi OOP Sprint 05 - implementasi PHP OOP dengan class ShiftService, enkapsulasi properti private, constructor, dan dynamic HTML rendering via object methods."/>

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
    /* Fade-in stagger animation for OOP service cards */
    @keyframes cardFadeIn {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .oop-card-animate { animation: cardFadeIn 0.45s ease both; }
    .oop-card-animate:nth-child(1) { animation-delay: 0.05s; }
    .oop-card-animate:nth-child(2) { animation-delay: 0.13s; }
    .oop-card-animate:nth-child(3) { animation-delay: 0.21s; }
    .oop-card-animate:nth-child(4) { animation-delay: 0.29s; }
    .oop-card-animate:nth-child(5) { animation-delay: 0.37s; }
    .oop-card-animate:nth-child(6) { animation-delay: 0.45s; }
  </style>
</head>
<body class="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col overflow-x-hidden">

  <!-- HEADER: Sticky Navbar SHIFT Soft UI -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-100">
    <div class="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <a class="flex items-center gap-2 group shrink-0" href="../week5/index.php">
          <div class="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,97,148,0.25)] shrink-0 group-hover:scale-105 transition-transform">
            <span class="material-symbols-outlined text-[24px]">local_shipping</span>
          </div>
          <div class="flex flex-col min-w-0 max-w-[130px] sm:max-w-[220px]">
            <span class="font-headline-sm text-sm sm:text-base font-extrabold text-primary tracking-tight truncate leading-tight">SHIFT</span>
            <span class="font-label-sm text-[10px] sm:text-xs text-on-surface-variant font-semibold uppercase tracking-wider truncate">OOP Catalog &mdash; Week 6</span>
          </div>
        </a>
      </div>
      <nav class="hidden md:flex items-center gap-1.5 bg-surface-container-low/80 p-1.5 rounded-full">
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="../week5/index.php">Beranda</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="../week5/layanan.php">Katalog Week 5</a>
        <a aria-current="page" class="px-4 py-1.5 transition-colors bg-surface-container-high text-on-surface font-semibold rounded-full text-xs sm:text-sm" href="./oop-service.php">OOP Week 6</a>
        <a class="px-4 py-1.5 rounded-full text-xs sm:text-sm text-primary font-bold hover:bg-primary-fixed/40 transition-colors" href="../week5/mitra.html">Portal Mitra</a>
      </nav>
      <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div class="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-primary/10 to-primary-fixed/60 border border-primary/20 px-3 py-1.5 rounded-full">
          <span class="material-symbols-outlined text-primary text-[16px]">code</span>
          <span class="text-xs font-extrabold text-primary tracking-wide"><?php echo $appVersion; ?></span>
        </div>
        <button id="mobileMenuBtn" type="button" class="md:hidden w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-all cursor-pointer shrink-0" aria-label="Buka Menu Navigasi" onclick="toggleMobileNav()">
          <span id="mobileMenuIcon" class="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </div>
    </div>
    <div id="mobileNavMenu" class="hidden md:hidden border-t border-slate-100 bg-surface/95 backdrop-blur-2xl px-4 py-4 shadow-xl flex flex-col gap-2">
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center gap-2" href="../week5/index.php"><span class="material-symbols-outlined text-[20px]">home</span> Beranda</a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center gap-2" href="../week5/layanan.php"><span class="material-symbols-outlined text-[20px]">category</span> Katalog Week 5</a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm bg-primary-fixed/50 text-primary font-bold flex items-center gap-2" href="./oop-service.php"><span class="material-symbols-outlined text-[20px]">code</span> OOP Catalog Week 6</a>
      <a class="px-4 py-2.5 rounded-xl font-medium text-sm text-primary font-bold hover:bg-primary-fixed/40 transition-colors flex items-center gap-2" href="../week5/mitra.html"><span class="material-symbols-outlined text-[20px]">badge</span> Portal Mitra</a>
    </div>
  </header>

  <!-- MAIN CONTENT -->
  <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex flex-col gap-8 sm:gap-12">

    <!-- HERO SECTION -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low/70 to-primary-fixed/20 p-6 sm:p-10 md:p-14 border border-slate-100 shadow-xl">
      <div class="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" aria-hidden="true"></div>
      <div class="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none" aria-hidden="true"></div>
      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center py-2 sm:py-4">

        <div class="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 rounded-full bg-surface-container-high/90 backdrop-blur-md shadow-sm mb-5 border border-slate-200/70 max-w-full">
          <span class="w-2.5 h-2.5 rounded-full <?php echo $systemStatusPulse; ?>"></span>
          <span class="text-xs sm:text-sm text-primary tracking-wide uppercase font-extrabold break-words"><?php echo $systemStatusLabel; ?></span>
        </div>

        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-extrabold px-4 py-2 rounded-full shadow-lg mb-5 uppercase tracking-widest">
          <span class="material-symbols-outlined text-[18px]">code</span>
          Week 6 Sprint 05 &mdash; OOP PHP Implementation
          <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
        </div>

        <h1 class="font-display text-2xl sm:text-4xl md:text-5xl text-on-surface tracking-tight font-extrabold leading-tight break-words">
          Katalog Layanan SHIFT <span class="text-primary">Berbasis OOP</span>
        </h1>
        <p class="text-sm sm:text-base md:text-lg text-on-surface-variant mt-3 max-w-2xl leading-relaxed">
          Implementasi <strong class="text-on-surface">Object-Oriented Programming (OOP) PHP</strong> &mdash; setiap kartu layanan dirender secara dinamis melalui
          <code class="text-primary bg-primary-fixed/40 px-1.5 py-0.5 rounded text-sm font-mono">$object->renderServiceCard()</code>
          bukan array prosedural biasa.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-2 mt-5">
          <?php
          $oopConcepts = [
            ["code",         "Class & Object"],
            ["lock",         "Encapsulation"],
            ["build",        "Constructor"],
            ["function",     "Methods & \$this->"],
            ["dynamic_form", "Dynamic HTML Output"],
          ];
          foreach ($oopConcepts as [$icon, $label]): ?>
          <span class="inline-flex items-center gap-1.5 bg-surface-container-high/80 border border-slate-200 text-on-surface text-xs font-semibold px-3 py-1.5 rounded-full">
            <span class="material-symbols-outlined text-primary text-[16px]"><?php echo $icon; ?></span>
            <?php echo $label; ?>
          </span>
          <?php endforeach; ?>
        </div>

        <!-- Prosedural vs OOP Comparison -->
        <div class="w-full max-w-3xl mt-8 p-5 sm:p-6 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md border border-slate-200/80 text-left">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px]">compare_arrows</span>
            </div>
            <div>
              <span class="text-sm font-bold text-on-surface block">Transisi: Prosedural &rarr; OOP</span>
              <span class="text-xs text-on-surface-variant font-medium">Week 5 (Sprint 04) vs Week 6 (Sprint 05)</span>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3.5 rounded-xl bg-surface-container/70 border border-slate-200">
              <span class="flex items-center gap-1.5 text-xs font-extrabold text-on-surface-variant uppercase tracking-wider mb-2">
                <span class="material-symbols-outlined text-[14px]">history</span> Week 5 &mdash; Prosedural
              </span>
              <pre class="text-[11px] font-mono text-on-surface-variant leading-relaxed bg-surface-container-highest/50 p-2 rounded-lg overflow-x-auto">$services = [
  ["judul" => "Pindahan",
   "harga" => "Rp 50.000"],
];
foreach ($services as $s) {
  echo $s['judul'];
}</pre>
            </div>
            <div class="p-3.5 rounded-xl bg-primary-fixed/20 border border-primary/20">
              <span class="flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider mb-2">
                <span class="material-symbols-outlined text-[14px]">code</span> Week 6 &mdash; OOP
              </span>
              <pre class="text-[11px] font-mono text-on-surface leading-relaxed bg-surface-container-lowest/70 p-2 rounded-lg overflow-x-auto">class ShiftService {
  private string $serviceName;
  private int $basePrice;
  public function __construct(...) {
    $this->serviceName = $name;
  }
  public function renderServiceCard(): string {
    return "...HTML...";
  }
}</pre>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION: OOP Class Structure (Task 01 & 02) -->
    <section class="flex flex-col gap-4 sm:gap-6">
      <div>
        <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Week 6 &mdash; Task 01 &amp; 02</span>
        <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1">Struktur Class &amp; Enkapsulasi OOP</h2>
        <p class="text-sm text-on-surface-variant mt-1">Blueprint class <code class="text-primary bg-primary-fixed/40 px-1.5 py-0.5 rounded font-mono text-xs">ShiftService</code> dengan properti <code class="font-mono text-xs bg-surface-container-high/60 px-1 rounded">private</code>, constructor, dan method public.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-md border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[20px]">code_blocks</span></div>
            <div><span class="text-[10px] font-extrabold text-primary uppercase tracking-widest block">Task 01</span><span class="text-sm font-bold text-on-surface">Create a Class</span></div>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Mendefinisikan <code class="font-mono text-primary bg-primary-fixed/30 px-1 rounded">class ShiftService</code> sebagai <strong>blueprint</strong> objek layanan SHIFT. Menggantikan array asosiatif prosedural dengan struktur class terorganisir.</p>
          <pre class="text-[11px] font-mono bg-surface-container-high/60 text-on-surface p-2.5 rounded-xl leading-relaxed overflow-x-auto">class ShiftService {
  // private properties...
  // public methods...
}</pre>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-md border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl bg-secondary-container/80 text-secondary flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[20px]">lock</span></div>
            <div><span class="text-[10px] font-extrabold text-secondary uppercase tracking-widest block">Task 02 &mdash; Part A</span><span class="text-sm font-bold text-on-surface">Private Properties</span></div>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed"><strong>Enkapsulasi</strong>: properti dideklarasikan <code class="font-mono bg-surface-container-high/60 px-1 rounded">private</code> agar data terlindungi. Hanya bisa diakses dari dalam class melalui method getter.</p>
          <pre class="text-[11px] font-mono bg-surface-container-high/60 text-on-surface p-2.5 rounded-xl leading-relaxed overflow-x-auto">private string $serviceName;
private int $basePrice;
private array $features;
private string $iconName;</pre>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-md border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[20px]">build</span></div>
            <div><span class="text-[10px] font-extrabold text-tertiary uppercase tracking-widest block">Task 02 &mdash; Part B</span><span class="text-sm font-bold text-on-surface">Constructor &amp; $this-></span></div>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed"><strong>Constructor</strong> <code class="font-mono bg-surface-container-high/60 px-1 rounded">__construct()</code> dipanggil otomatis saat <code class="font-mono text-primary bg-primary-fixed/30 px-1 rounded">new ShiftService()</code>. Keyword <code class="font-mono bg-surface-container-high/60 px-1 rounded">$this-></code> merujuk properti objek saat ini.</p>
          <pre class="text-[11px] font-mono bg-surface-container-high/60 text-on-surface p-2.5 rounded-xl leading-relaxed overflow-x-auto">public function __construct(
  string $name, int $price, ...
) {
  $this->serviceName = $name;
  $this->basePrice   = $price;
}</pre>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-md border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[20px]">function</span></div>
            <div><span class="text-[10px] font-extrabold text-primary uppercase tracking-widest block">Task 02 &mdash; Part C</span><span class="text-sm font-bold text-on-surface">Public Methods</span></div>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Method <code class="font-mono bg-surface-container-high/60 px-1 rounded">public</code> menjadi antarmuka dari luar class. Contoh: <code class="font-mono text-primary bg-primary-fixed/30 px-1 rounded">formatHarga()</code>, <code class="font-mono text-primary bg-primary-fixed/30 px-1 rounded">renderBadge()</code>, <code class="font-mono text-primary bg-primary-fixed/30 px-1 rounded">getServiceInfo()</code>.</p>
          <pre class="text-[11px] font-mono bg-surface-container-high/60 text-on-surface p-2.5 rounded-xl leading-relaxed overflow-x-auto">public function formatHarga(): string {
  return "Rp " . number_format(
    $this->basePrice, 0, ',', '.'
  );
}</pre>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-md border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl bg-secondary-container/80 text-secondary flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[20px]">add_box</span></div>
            <div><span class="text-[10px] font-extrabold text-secondary uppercase tracking-widest block">Task 03 &mdash; Part A</span><span class="text-sm font-bold text-on-surface">Instansiasi Objek</span></div>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Keyword <code class="font-mono bg-surface-container-high/60 px-1 rounded">new</code> menginstansiasi objek konkret dari class blueprint. Setiap objek memiliki data independen via propertinya sendiri.</p>
          <pre class="text-[11px] font-mono bg-surface-container-high/60 text-on-surface p-2.5 rounded-xl leading-relaxed overflow-x-auto">$movingService = new ShiftService(
  nomorUrut:   1,
  serviceName: "Jasa Pindahan Kos",
  basePrice:   50000,
  features:    ["Armada Box", ...]
);</pre>
        </div>

        <div class="p-5 rounded-2xl bg-gradient-to-br from-primary-fixed/30 to-surface-container-lowest shadow-md border border-primary/20 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[20px]">dynamic_form</span></div>
            <div><span class="text-[10px] font-extrabold text-primary uppercase tracking-widest block">Task 03 &mdash; Part B</span><span class="text-sm font-bold text-on-surface">Dynamic HTML via Object</span></div>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Method <code class="font-mono text-primary bg-primary-fixed/40 px-1 rounded">renderServiceCard()</code> dipanggil pada setiap objek untuk menghasilkan blok HTML kartu layanan secara dinamis berbasis data objek.</p>
          <pre class="text-[11px] font-mono bg-surface-container-lowest p-2.5 rounded-xl leading-relaxed border border-primary/10 overflow-x-auto">&lt;?php
foreach ($allServices as $svc) {
    echo $svc->renderServiceCard();
}
?&gt;</pre>
        </div>

      </div>
    </section>

    <!-- SECTION: Dynamic OOP Service Cards (Task 03) -->
    <section class="flex flex-col gap-4 sm:gap-6" id="oop-catalog">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
        <div>
          <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">Week 6 &mdash; Task 03</span>
          <h2 class="text-xl sm:text-2xl md:text-3xl text-on-surface font-extrabold tracking-tight mt-1">Katalog Layanan &mdash; Output Dinamis dari Objek</h2>
          <p class="text-sm text-on-surface-variant mt-1 max-w-2xl">
            Setiap kartu dirender oleh pemanggilan <code class="text-primary bg-primary-fixed/40 px-1.5 py-0.5 rounded font-mono text-xs">$service->renderServiceCard()</code> &mdash; bukan dari array prosedural. Total: <strong><?php echo count($allServices); ?> objek ShiftService</strong> diinstansiasi.
          </p>
        </div>
        <div class="shrink-0 flex items-center gap-2 bg-primary-fixed/40 border border-primary/20 px-4 py-2 rounded-full self-start md:self-auto">
          <span class="material-symbols-outlined text-primary text-[20px]">widgets</span>
          <span class="text-sm font-extrabold text-primary"><?php echo count($allServices); ?> Objek Aktif</span>
        </div>
      </div>

      <!-- =========================================================================
           WEEK 6 - TASK 03: Generate Dynamic Content with Object (Object -> PHP -> HTML)
           Loop foreach pada array of objects ShiftService[], memanggil method
           renderServiceCard() pada setiap objek untuk menghasilkan HTML dinamis
           ========================================================================= -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <?php foreach ($allServices as $service) : ?>
        <div class="oop-card-animate">
          <?php echo $service->renderServiceCard(); ?>
        </div>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- SECTION: OOP Debug Panel (getServiceInfo() output per object) -->
    <section class="flex flex-col gap-4 sm:gap-6">
      <div>
        <span class="text-xs sm:text-sm text-primary font-bold uppercase tracking-wider">OOP Debug Panel</span>
        <h2 class="text-xl sm:text-2xl text-on-surface font-extrabold tracking-tight mt-1">Output <code class="font-mono text-primary text-lg">getServiceInfo()</code> per Objek</h2>
        <p class="text-sm text-on-surface-variant mt-1">Data ringkasan yang dihasilkan method <code class="font-mono text-primary bg-primary-fixed/40 px-1.5 py-0.5 rounded text-xs">getServiceInfo()</code> untuk setiap instance objek ShiftService &mdash; membuktikan enkapsulasi bekerja dengan baik.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <?php foreach ($allServices as $idx => $service) :
              $info = $service->getServiceInfo(); ?>
        <div class="p-4 rounded-2xl bg-surface-container-lowest border border-slate-100 shadow-sm">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-extrabold flex items-center justify-center shrink-0"><?php echo $idx + 1; ?></span>
            <span class="text-xs font-bold text-on-surface truncate"><?php echo htmlspecialchars($info['nama']); ?></span>
          </div>
          <div class="flex flex-col gap-1.5">
            <div class="flex justify-between items-center gap-2 text-xs">
              <span class="text-on-surface-variant font-medium">Harga:</span>
              <span class="font-extrabold text-primary"><?php echo htmlspecialchars($info['harga']); ?></span>
            </div>
            <div class="flex justify-between items-center gap-2 text-xs">
              <span class="text-on-surface-variant font-medium">Ikon:</span>
              <code class="font-mono bg-surface-container-high/60 px-1.5 py-0.5 rounded text-on-surface"><?php echo htmlspecialchars($info['ikon']); ?></code>
            </div>
            <div class="flex justify-between items-start gap-2 text-xs">
              <span class="text-on-surface-variant font-medium shrink-0">Badge:</span>
              <span class="font-semibold text-on-surface text-right"><?php echo htmlspecialchars($info['badge']); ?></span>
            </div>
            <div class="mt-2 pt-2 border-t border-slate-100">
              <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Fitur (<?php echo count($info['fitur']); ?>):</span>
              <?php foreach (array_slice($info['fitur'], 0, 3) as $f): ?>
              <span class="inline-block text-[10px] bg-surface-container-high/60 text-on-surface px-1.5 py-0.5 rounded mr-1 mb-1"><?php echo htmlspecialchars($f); ?></span>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="bg-surface-container-lowest border-t border-slate-100 py-6 mt-auto">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant text-xs sm:text-sm text-center sm:text-left">
      <div class="flex flex-col sm:flex-row items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0"><span class="material-symbols-outlined text-[14px]">local_shipping</span></div>
        <span class="font-bold text-on-surface"><?php echo $appName; ?> Platform <?php echo $appVersion; ?></span>
        <span class="text-slate-400 hidden sm:inline">&bull;</span>
        <span>&copy; <?php echo $currentYear; ?> <?php echo $companyName; ?>. All Rights Reserved.</span>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a href="../week5/index.php" class="hover:text-primary transition-colors font-semibold">Beranda</a>
        <a href="../week5/layanan.php" class="hover:text-primary transition-colors font-semibold">Week 5 Prosedural</a>
        <a href="./oop-service.php" class="text-primary font-bold">Week 6 OOP</a>
        <a href="../week5/auth.html?path=role-selection" class="hover:text-primary transition-colors font-semibold">Portal Akses</a>
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
      console.log('[SHIFT OOP] Service category selected:', category);
      window.location.href = '../week5/booking.html?service=' + category;
    }
  </script>

</body>
</html>