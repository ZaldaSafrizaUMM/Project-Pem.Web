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
// WEEK 7 - TASK 03: Entry Point (Request -> Controller -> Model -> View)
// Front Controller: Menerima HTTP Request klien, menginstansiasi
// ShiftController, dan memicu siklus eksekusi MVC terstruktur.
// =========================================================================

require_once __DIR__ . '/Controller/ShiftController.php';

// Inisialisasi Controller dan jalankan alur pemrosesan request
$controller = new ShiftController();
$controller->process();