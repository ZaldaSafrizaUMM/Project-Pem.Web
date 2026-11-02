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

    /**
     * Constructor ShiftPlatform
     * Menginisialisasi katalog layanan operasional dan spesifikasi armada logistik.
     */
    public function __construct() {
        $this->initServices();
        $this->initFleetSpecs();
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
                'deskripsi'       => 'Layanan pindahan praktis untuk kamar kos, apartemen, kontrakan, hingga rumah keluarga dengan opsi armada motor kargo, pick-up bak/box, hingga truk engkel serta live GPS tracking real-time dan kalkulasi tangga/lift presisi.',
                'harga_dasar'     => 50000,
                'harga_formatted' => 'Rp 50.000',
                'features'        => [
                    'Armada Motor Kargo & Pick-Up Box',
                    'Live GPS Tracking Real-Time',
                    'Helper Angkut Termasuk',
                    'Packing Bubble Wrap Protektif',
                    'Estimasi Jarak & Lantai Tangga/Lift'
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
                    'Sterilisasi UV-C Profesional',
                    'Hydro-Vacuum Kasur & Sofa',
                    'Disinfeksi Eco-Friendly SNI',
                    'Pembersihan Kerak Bathroom',
                    'Teknisi Bersertifikat BNSP'
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
                    'Bongkar-Pasang Furniture',
                    'Packing Kardus Profesional',
                    'Penataan Rapi di Lokasi Baru'
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
                'nama'            => 'Armada Express & Premium (Truk & Container)',
                'deskripsi'       => 'Layanan armada premium untuk pindahan skala besar menggunakan truk engkel, truk double, hingga container 20-40 ft dengan proteksi kargo asuransi penuh dan jadwal fleksibel.',
                'harga_dasar'     => 250000,
                'harga_formatted' => 'Rp 250.000',
                'features'        => [
                    'Truk Engkel & Double Tersedia',
                    'Container 20ft & 40ft Option',
                    'Asuransi Kargo Penuh Included',
                    'Jadwal Penjemputan Fleksibel',
                    'Koordinator Armada Dedicated'
                ],
                'ikon'            => 'airport_shuttle',
                'badge'           => 'Premium & Terjamin',
                'badge_color'     => 'bg-error-container text-on-error-container',
                'icon_bg'         => 'bg-error-container/60 text-error group-hover:bg-error group-hover:text-on-error',
                'hover_text'      => 'group-hover:text-error',
                'btn_text'        => 'Pesan Armada Express',
                'btn_class'       => 'bg-on-surface hover:bg-inverse-surface text-surface font-bold',
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
                    'Koordinator Personal Dedicated',
                    'Garansi Kepuasan 100% atau Refund'
                ],
                'ikon'            => 'inventory_2',
                'badge'           => 'All-Inclusive Bundle',
                'badge_color'     => 'bg-primary-fixed text-on-primary-fixed',
                'icon_bg'         => 'bg-primary-fixed/60 text-on-primary-fixed group-hover:bg-primary group-hover:text-on-primary',
                'hover_text'      => 'group-hover:text-primary',
                'btn_text'        => 'Pesan Paket All-Inclusive',
                'btn_class'       => 'bg-primary hover:bg-primary-container text-on-primary font-bold',
                'link'            => './booking.html?service=all-inclusive',
                'action_onclick'  => "selectServiceCategory('moving')"
            ],

            // -----------------------------------------------------------------
            // Layanan Pendukung 06: Sanitasi & Pest Control
            // -----------------------------------------------------------------
            [
                'nomor'           => 6,
                'category'        => 'cleaning',
                'category_label'  => 'Pest Control & Sanitasi',
                'nama'            => 'Jasa Sanitasi & Pest Control Profesional',
                'deskripsi'       => 'Pengendalian hama terpadu (rayap, tikus, kecoa, nyamuk) menggunakan bahan kimia food-grade ramah anak & hewan peliharaan, dengan sertifikasi Kemenkes RI dan garansi 3 bulan.',
                'harga_dasar'     => 125000,
                'harga_formatted' => 'Rp 125.000',
                'features'        => [
                    'Pengendalian Rayap & Tikus',
                    'Bahan Kimia Food-Grade Aman',
                    'Sertifikasi Kemenkes RI',
                    'Garansi 3 Bulan Bebas Hama',
                    'Teknisi Berseragam & ID Resmi'
                ],
                'ikon'            => 'pest_control',
                'badge'           => 'Kemenkes RI Certified',
                'badge_color'     => 'bg-secondary-fixed text-on-secondary-fixed',
                'icon_bg'         => 'bg-secondary-fixed/60 text-secondary group-hover:bg-secondary-container group-hover:text-on-secondary-container',
                'hover_text'      => 'group-hover:text-secondary',
                'btn_text'        => 'Pesan Sanitasi & Pest Control',
                'btn_class'       => 'bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-extrabold',
                'link'            => './booking.html?service=cleaning&type=pestcontrol',
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

    // =========================================================================
    // MODEL METHODS (DATA ACCESS & BUSINESS LOGIC)
    // =========================================================================

    /**
     * Mendapatkan profil lengkap informasi operasional platform SHIFT
     *
     * @return array Data profil aplikasi
     */
    public function getProfile(): array {
        return [
            'name'         => $this->name,
            'coordinator'  => $this->coordinator,
            'period'       => $this->period,
            'status'       => $this->status,
            'tagline'      => $this->tagline,
            'appVersion'   => $this->appVersion,
            'companyName'  => $this->companyName,
            'coverage'     => $this->coverage,
            'csHotline'    => $this->csHotline,
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
     * Format integer harga menjadi string Rupiah
     *
     * @param int $price
     * @return string
     */
    public static function formatRupiah(int $price): string {
        return 'Rp ' . number_format($price, 0, ',', '.');
    }
}
