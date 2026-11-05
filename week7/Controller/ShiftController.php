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
// WEEK 7 - TASK 02: Build the Controller (CONTROLLER LAYER)
// Controller menerima HTTP Request, memanggil Model, dan mengirim data ke View
// =========================================================================

require_once __DIR__ . '/../Model/ShiftPlatform.php';

/**
 * Class ShiftController
 *
 * Controller Layer dalam arsitektur MVC SHIFT.
 * Bertanggung jawab menerima request dari pengguna, berinteraksi dengan Model (ShiftPlatform)
 * untuk mendapatkan data yang dibutuhkan, dan meneruskan data tersebut ke View (shift-page.php).
 *
 * @package SHIFT\MVC\Controller
 * @version v3.5-Sprint06 (MVC)
 */
class ShiftController {

    /** @var ShiftPlatform Instance dari Model ShiftPlatform */
    private ShiftPlatform $model;

    /**
     * Constructor ShiftController
     * Menginstansiasi Model ShiftPlatform untuk mengelola data operasional.
     */
    public function __construct() {
        $this->model = new ShiftPlatform();
    }

    /**
     * Method index()
     * Menyiapkan seluruh data profil utama dan katalog lengkap layanan SHIFT.
     * Mengembalikan data bundle yang siap diteruskan ke View layer.
     *
     * @return array Data bundle utama untuk View
     */
    public function index(): array {
        return [
            'shift'             => $this->model,
            'profile'           => $this->model->getProfile(),
            'services'          => $this->model->getServices(),
            'fleetSpecs'        => $this->model->getFleetSpecs(),
            'trustBadges'       => $this->model->getTrustBadges(),
            'whyChooseFeatures' => $this->model->getWhyChooseFeatures(),
            'selectedCategory'  => 'all',
            'totalServices'     => count($this->model->getServices()),
        ];
    }

    /**
     * Method show()
     * Mengambil dan memfilter data layanan berdasarkan kategori tertentu ('all', 'moving', atau 'cleaning')
     * melalui pemanggilan method pada Model layer.
     *
     * @param string $category Kategori layanan ('all', 'moving', atau 'cleaning')
     * @return array Data bundle terfilter untuk View
     */
    public function show(string $category = 'all'): array {
        $category = strtolower(trim($category));
        $validCategories = ['all', 'moving', 'cleaning'];

        if (!in_array($category, $validCategories)) {
            $category = 'all';
        }

        $filteredServices = $this->model->getServicesByCategory($category);

        return [
            'shift'             => $this->model,
            'profile'           => $this->model->getProfile(),
            'services'          => $filteredServices,
            'fleetSpecs'        => $this->model->getFleetSpecs(),
            'trustBadges'       => $this->model->getTrustBadges(),
            'whyChooseFeatures' => $this->model->getWhyChooseFeatures(),
            'selectedCategory'  => $category,
            'totalServices'     => count($filteredServices),
        ];
    }

    /**
     * Method process()
     * Menangani alur Request -> Controller -> Model -> View secara terpusat:
     * 1. Menangkap parameter GET '?category=...' dari request URL klien.
     * 2. Memanggil method show() untuk meminta data yang sesuai dari Model.
     * 3. Meng-ekstrak variabel data dan merender file tampilan 'View/shift-page.php'.
     */
    public function process(): void {
        // 1. Tangkap parameter HTTP GET
        $requestedCategory = isset($_GET['category']) ? (string)$_GET['category'] : 'all';

        // 2. Olah data melalui Controller & Model
        $viewData = $this->show($requestedCategory);

        // 3. Ekstrak data agar variabel ($shift, $profile, $services, $fleetSpecs, $trustBadges, $whyChooseFeatures, $selectedCategory, $totalServices)
        //    langsung dapat diakses secara bersih di dalam View tanpa logika bisnis
        extract($viewData);

        // 4. Sertakan file View untuk merender antarmuka HTML
        $viewFile = __DIR__ . '/../View/shift-page.php';

        if (file_exists($viewFile)) {
            require $viewFile;
        } else {
            http_response_code(500);
            echo "<h1 style='color:#ba1a1a;font-family:sans-serif;'>500 Internal Error: File View tidak ditemukan ({$viewFile})</h1>";
        }
    }
}
