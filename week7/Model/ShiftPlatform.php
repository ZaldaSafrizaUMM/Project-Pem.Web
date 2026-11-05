<?php
/*
 * =========================================================================
 * IMPLEMENTASI WEEK 7 (SPRINT 06) - FROM OOP TO MVC ARCHITECTURE - SHIFT
 * - Week 7 Task 01: Design the MVC Structure (Model, View, Controller)
 * - Week 7 Task 02: Build the Controller (Request Handler, Model Calling, Data Passing)
 * - Week 7 Task 03: Connect Model, Controller & View (Clean Front Controller & View)
 * =========================================================================
 */

// =========================================================================
// WEEK 7 - TASK 01: Design the MVC Structure (MODEL LAYER)
// Model bertanggung jawab terhadap Data, Data Access, dan Business Data SHIFT
// =========================================================================

/**
 * Class ShiftPlatform
 *
 * Model Layer dalam arsitektur MVC SHIFT.
 * Bertanggung jawab sepenuhnya atas pengelolaan entitas data, data access,
 * spesifikasi armada operasional, dan logika data layanan SHIFT.
 * 
 * @package SHIFT\MVC\Model
 * @version v3.5-Sprint06 (MVC)
 */
class ShiftPlatform {

    /** @var string Nama resmi platform aplikasi SHIFT */
    public string $name = "SHIFT (Siap Hadir, Instan, Fleksibel, Tuntas)";

    /** @var string Koordinator operasional platform */
    public string $coordinator = "Tim Operasional SHIFT Indonesia";

    /** @var string Periode dan jam operasional layanan */
    public string $period = "2025 - 2026 (Operasional 24/7)";

    /** @var string Status operasional sistem server */
    public string $status = "Berjalan";

    /** @var string Tagline resmi platform SHIFT */
    public string $tagline = "Solusi Pindahan & Deep Cleaning Terpadu Indonesia";

    /** @var string Versi rilis arsitektur aplikasi */
    public string $appVersion = "v3.5-Sprint06 (MVC Architecture)";

    /** @var string Nama perusahaan pengelola platform */
    public string $companyName = "PT Siap Hadir Fleksibel Tuntas";

    /** @var string Cakupan wilayah layanan operasional */
    public string $coverage = "Jabodetabek, Bandung, Semarang, Surabaya, & D.I. Yogyakarta";

    /** @var string Kontak bantuan operasional hotline 24/7 */
    public string $csHotline = "+62 812-3456-7890";

    /** @var array Koleksi data layanan operasional SHIFT */
    private array $services = [];

    /** @var array Spesifikasi armada operasional logistik SHIFT */
    private array $fleetSpecs = [];

    /** @var array Keunggulan & Trust Badges SHIFT */
    private array $trustBadges = [];

    /** @var array Fitur Keunggulan Utama (Why Choose Us) */
    private array $whyChooseFeatures = [];

    /**
     * Constructor ShiftPlatform
     * Menginisialisasi katalog layanan operasional, spesifikasi armada, dan badges keunggulan.
     */
    public function __construct() {
        $this->initServices();
        $this->initFleetSpecs();
        $this->initBadgesAndFeatures();
    }

    /**
     * Inisialisasi data seluruh layanan SHIFT (Data Source)
     * Mengelompokkan layanan ke dalam kategori: 'moving' (Pindahan) dan 'cleaning' (Sanitasi).
     */
    private function initServices(): void {
        $this->services = [
            // -----------------------------------------------------------------
            // Layanan Prioritas 01: Pindahan Kos & Rumah
            // -----------------------------------------------------------------
            [
                'nomor'           => 1,
                'category'        => 'moving',
                'category_label'  => 'Pindahan & Logistik',
                'nama'            => 'Jasa Pindahan Kos & Rumah (Moving & Armada)',
                'deskripsi'       => 'Layanan pindahan praktis untuk kamar kos, apartemen, kontrakan, hingga rumah keluarga dengan opsi armada motor kargo, pick-up bak/box, hingga truk engkel serta live GPS tracking real-time dan kalkulasi rute presisi.',
                'harga_dasar'     => 50000,
                'harga_formatted' => 'Rp 50.000',
                'features'        => [
                    'Armada Pick-Up & Truk Engkel Siap',
                    'Live GPS Tracking Real-Time',
                    'Helper Angkut Profesional Termasuk',
                    'Packing Bubble Wrap Protektif'
                ],
                'ikon'            => 'local_shipping',
                'badge'           => 'Armada Siap 24/7',
                'badge_color'     => 'bg-primary-fixed/60 text-primary',
                'icon_bg'         => 'bg-primary-fixed/60 text-primary group-hover:bg-primary group-hover:text-on-primary',
                'hover_text'      => 'group-hover:text-primary',
                'btn_text'        => 'Pesan Jasa Pindahan',
                'btn_class'       => 'bg-primary hover:bg-primary-container text-on-primary',
                'link'            => './booking.html?service=moving',
                'action_onclick'  => "selectServiceCategory('moving')"
            ],

            // -----------------------------------------------------------------
            // Layanan Prioritas 02: Deep Cleaning & Sanitasi
            // -----------------------------------------------------------------
            [
                'nomor'           => 2,
                'category'        => 'cleaning',
                'category_label'  => 'Deep Cleaning & Sanitasi',
                'nama'            => 'Jasa Deep Cleaning & Sanitasi Ruangan',
                'deskripsi'       => 'Pembersihan intensif hunian, sterilisasi lampu UV-C, hydro-vacuum tungau kasur/sofa, pembersihan kerak kamar mandi toilet, dan disinfeksi ruangan higienis ramah lingkungan bersertifikasi SNI.',
                'harga_dasar'     => 85000,
                'harga_formatted' => 'Rp 85.000',
                'features'        => [
                    'Sterilisasi Sinar UV-C Profesional',
                    'Hydro-Vacuum Kasur & Sofa Tungau',
                    'Disinfeksi Eco-Friendly SNI',
                    'Pembersihan Kerak Bathroom Tuntas'
                ],
                'ikon'            => 'cleaning_services',
                'badge'           => 'Steril UV-C & Eco-Clean',
                'badge_color'     => 'bg-secondary-container text-on-secondary-container',
                'icon_bg'         => 'bg-secondary-fixed/60 text-on-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container',
                'hover_text'      => 'group-hover:text-secondary',
                'btn_text'        => 'Pesan Deep Cleaning',
                'btn_class'       => 'bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-extrabold',
                'link'            => './cleaning.html',
                'action_onclick'  => "selectServiceCategory('cleaning')"
            ],

            // -----------------------------------------------------------------
            // Layanan Prioritas 03: Kru Angkut & Helper Profesional
            // -----------------------------------------------------------------
            [
                'nomor'           => 3,
                'category'        => 'moving',
                'category_label'  => 'Tenaga Kerja & Packing',
                'nama'            => 'Kru Angkut & Helper Profesional',
                'deskripsi'       => 'Bantuan tenaga kerja profesional terlatih untuk proses bongkar muat perabotan berat, bongkar pasang furniture lemari/tempat tidur, packing kardus bubble wrap protektif, dan penataan rapi di tempat tujuan.',
                'harga_dasar'     => 40000,
                'harga_formatted' => 'Rp 40.000',
                'features'        => [
                    'Kru Terlatih & Terverifikasi',
                    'Angkut Perabotan Berat Aman',
                    'Bongkar-Pasang Furniture Rapi',
                    'Safety Packing Kardus Protektif'
                ],
                'ikon'            => 'engineering',
                'badge'           => 'Kru Terlatih & Terverifikasi',
                'badge_color'     => 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
                'icon_bg'         => 'bg-tertiary-fixed/60 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary',
                'hover_text'      => 'group-hover:text-tertiary',
                'btn_text'        => 'Pesan Kru Angkut',
                'btn_class'       => 'bg-tertiary hover:bg-tertiary-container text-on-tertiary font-bold',
                'link'            => './booking.html?service=moving&type=helper',
                'action_onclick'  => "selectServiceCategory('moving')"
            ],

            // -----------------------------------------------------------------
            // Layanan Pendukung 04: Armada Express & Premium
            // -----------------------------------------------------------------
            [
                'nomor'           => 4,
                'category'        => 'moving',
                'category_label'  => 'Armada Skala Besar',
                'nama'            => 'Armada Express & Premium (Truk & Box)',
                'deskripsi'       => 'Layanan armada premium untuk pindahan skala besar menggunakan truk engkel, truk double, hingga box tertutup dengan proteksi kargo asuransi penuh dan jadwal fleksibel.',
                'harga_dasar'     => 250000,
                'harga_formatted' => 'Rp 250.000',
                'features'        => [
                    'Truk Engkel & Double Siap Jalan',
                    'Proteksi Tertutup Bebas Hujan & Debu',
                    'Asuransi Muatan Penuh Included',
                    'Jadwal Penjemputan Fleksibel 24 Jam'
                ],
                'ikon'            => 'airport_shuttle',
                'badge'           => 'Premium & Terjamin',
                'badge_color'     => 'bg-primary-fixed text-on-primary-fixed',
                'icon_bg'         => 'bg-primary-fixed/60 text-primary group-hover:bg-primary group-hover:text-on-primary',
                'hover_text'      => 'group-hover:text-primary',
                'btn_text'        => 'Pesan Armada Express',
                'btn_class'       => 'bg-primary hover:bg-primary-container text-on-primary font-bold',
                'link'            => './booking.html?service=moving&type=premium',
                'action_onclick'  => "selectServiceCategory('moving')"
            ],

            // -----------------------------------------------------------------
            // Layanan Pendukung 05: Paket Pindahan All-Inclusive
            // -----------------------------------------------------------------
            [
                'nomor'           => 5,
                'category'        => 'moving',
                'category_label'  => 'Bundling Lengkap Zero-Hassle',
                'nama'            => 'Paket Pindahan All-Inclusive SHIFT',
                'deskripsi'       => 'Paket bundling terlengkap: armada + kru angkut + packing material + deep cleaning lokasi asal & tujuan dalam satu harga transparan. Solusi pindahan zero-hassle terpadu.',
                'harga_dasar'     => 325000,
                'harga_formatted' => 'Rp 325.000',
                'features'        => [
                    'Bundling Armada + Kru + Packing',
                    'Deep Cleaning Asal & Tujuan',
                    'Material Bubble Wrap & Kardus',
                    'Garansi Kepuasan & Asuransi 100%'
                ],
                'ikon'            => 'inventory_2',
                'badge'           => 'All-Inclusive Bundle',
                'badge_color'     => 'bg-secondary-container text-on-secondary-container',
                'icon_bg'         => 'bg-secondary-fixed/60 text-on-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container',
                'hover_text'      => 'group-hover:text-secondary',
                'btn_text'        => 'Pesan Paket All-Inclusive',
                'btn_class'       => 'bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-extrabold',
                'link'            => './booking.html?service=moving&package=allinclusive',
                'action_onclick'  => "selectServiceCategory('moving')"
            ],

            // -----------------------------------------------------------------
            // Layanan Pendukung 06: Sanitasi & Pest Control
            // -----------------------------------------------------------------
            [
                'nomor'           => 6,
                'category'        => 'cleaning',
                'category_label'  => 'Pest Control & Sanitasi',
                'nama'            => 'Jasa Sanitasi & Pest Control Khusus',
                'deskripsi'       => 'Pengendalian hama terpadu (rayap, kutu kasur, kecoa, serangga) menggunakan cairan food-grade ramah anak & hewan peliharaan, bersertifikasi aman dan tuntas bergaransi.',
                'harga_dasar'     => 125000,
                'harga_formatted' => 'Rp 125.000',
                'features'        => [
                    'Pengendalian Hama & Serangga Efektif',
                    'Bahan Kimia Food-Grade Aman',
                    'Sertifikasi Ramah Lingkungan SNI',
                    'Garansi Bebas Hama Tuntas'
                ],
                'ikon'            => 'pest_control',
                'badge'           => 'Higienis & Tersertifikasi',
                'badge_color'     => 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
                'icon_bg'         => 'bg-tertiary-fixed/60 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary',
                'hover_text'      => 'group-hover:text-tertiary',
                'btn_text'        => 'Pesan Sanitasi Khusus',
                'btn_class'       => 'bg-tertiary hover:bg-tertiary-container text-on-tertiary font-bold',
                'link'            => './cleaning.html?service=pestcontrol',
                'action_onclick'  => "selectServiceCategory('cleaning')"
            ]
        ];
    }

    /**
     * Inisialisasi spesifikasi armada operasional SHIFT
     */
    private function initFleetSpecs(): void {
        $this->fleetSpecs = [
            [
                'type'        => 'Motor Kargo',
                'capacity'    => '100 kg / 0.5 m³',
                'dimension'   => '100 x 60 x 80 cm',
                'best_for'    => 'Kardus kecil, koper, dokumen & pakaian kos',
                'base_rate'   => 'Rp 35.000',
                'icon'        => 'two_wheeler'
            ],
            [
                'type'        => 'Pick-Up Bak',
                'capacity'    => '800 kg / 2.5 m³',
                'dimension'   => '220 x 140 x 120 cm',
                'best_for'    => 'Kasur single, kulkas 1 pintu, mesin cuci & 5 kardus',
                'base_rate'   => 'Rp 75.000',
                'icon'        => 'local_shipping'
            ],
            [
                'type'        => 'Pick-Up Box Tertutup',
                'capacity'    => '1.000 kg / 4.0 m³',
                'dimension'   => '240 x 160 x 150 cm',
                'best_for'    => 'Aman hujan: elektronik, kasur queen, lemari & sofa',
                'base_rate'   => 'Rp 95.000',
                'icon'        => 'inventory_2'
            ],
            [
                'type'        => 'Truk Engkel Box',
                'capacity'    => '2.500 kg / 9.0 m³',
                'dimension'   => '310 x 170 x 170 cm',
                'best_for'    => 'Pindahan rumah 1-2 kamar, perabotan besar lengkap',
                'base_rate'   => 'Rp 220.000',
                'icon'        => 'airport_shuttle'
            ]
        ];
    }

    /**
     * Inisialisasi data Trust Badges dan Why Choose Features
     */
    private function initBadgesAndFeatures(): void {
        $this->trustBadges = [
            ["title" => "Asuransi 100%", "subtitle" => "Barang Aman Terjamin", "icon" => "verified", "color" => "bg-primary-fixed/50 text-primary"],
            ["title" => "Lacak GPS Live", "subtitle" => "Pantau Real-Time", "icon" => "my_location", "color" => "bg-secondary-fixed/50 text-secondary"],
            ["title" => "Mitra Terlatih", "subtitle" => "Driver & Helper Handal", "icon" => "badge", "color" => "bg-tertiary-fixed/50 text-tertiary"],
            ["title" => "Tarif Presisi", "subtitle" => "Tanpa Biaya Tersembunyi", "icon" => "savings", "color" => "bg-emerald-100 text-emerald-800"]
        ];

        $this->whyChooseFeatures = [
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
    }

    // =========================================================================
    // MODEL METHODS (DATA ACCESS & BUSINESS LOGIC)
    // =========================================================================

    /**
     * Mendapatkan ucapan salam dinamis berdasarkan jam sistem
     *
     * @return string
     */
    public function getGreeting(): string {
        $jam = (int)date('H');
        if ($jam >= 4 && $jam < 11) return "Selamat Pagi";
        if ($jam >= 11 && $jam < 15) return "Selamat Siang";
        if ($jam >= 15 && $jam < 18) return "Selamat Sore";
        return "Selamat Malam";
    }

    /**
     * Mendapatkan profil lengkap informasi operasional platform SHIFT
     *
     * @return array Data profil aplikasi
     */
    public function getProfile(): array {
        return [
            'name'           => $this->name,
            'coordinator'    => $this->coordinator,
            'period'         => $this->period,
            'status'         => $this->status,
            'tagline'        => $this->tagline,
            'appVersion'     => $this->appVersion,
            'companyName'    => $this->companyName,
            'coverage'       => $this->coverage,
            'csHotline'      => $this->csHotline,
            'total_services' => count($this->services),
        ];
    }

    /**
     * Mengembalikan seluruh koleksi layanan operasional SHIFT
     *
     * @return array Daftar semua layanan
     */
    public function getServices(): array {
        return $this->services;
    }

    /**
     * Mengambil layanan berdasarkan filter kategori tertentu ('all', 'moving', 'cleaning')
     *
     * @param string $category Kategori yang diminta
     * @return array Daftar layanan yang sesuai kategori
     */
    public function getServicesByCategory(string $category = 'all'): array {
        $category = strtolower(trim($category));
        if ($category === 'all' || empty($category)) {
            return $this->services;
        }

        return array_values(array_filter(
            $this->services,
            fn($item) => isset($item['category']) && $item['category'] === $category
        ));
    }

    /**
     * Mengembalikan spesifikasi armada operasional logistik SHIFT
     *
     * @return array Daftar tipe armada beserta kapasitasnya
     */
    public function getFleetSpecs(): array {
        return $this->fleetSpecs;
    }

    /**
     * Mengembalikan koleksi trust badges
     *
     * @return array
     */
    public function getTrustBadges(): array {
        return $this->trustBadges;
    }

    /**
     * Mengembalikan daftar fitur keunggulan utama (Why Choose Us)
     *
     * @return array
     */
    public function getWhyChooseFeatures(): array {
        return $this->whyChooseFeatures;
    }

    /**
     * Format integer harga menjadi string Rupiah
     *
     * @param int $price
     * @return string
     */
    public static function formatRupiah(int $price): string {
        return 'Rp ' . number_format($price, 0, ',', '.');
    }
}
