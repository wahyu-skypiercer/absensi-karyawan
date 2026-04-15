<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IzinController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Guest routes
Route::middleware('guest')->group(function () {
    Route::get('/', [AuthController::class, 'showLogin']);
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.process');
});

// Authenticated routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Admin routes
    Route::middleware('role:admin')->prefix('dashboard/admin')->name('admin.')->group(function () {
        Route::get('/', [DashboardController::class, 'admin'])->name('dashboard');

        // User Management
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

        // CRUD Karyawan
        Route::get('/karyawan', [KaryawanController::class, 'index'])->name('karyawan.index');
        Route::post('/karyawan', [KaryawanController::class, 'store'])->name('karyawan.store');
        Route::put('/karyawan/{karyawan}', [KaryawanController::class, 'update'])->name('karyawan.update');
        Route::delete('/karyawan/{karyawan}', [KaryawanController::class, 'destroy'])->name('karyawan.destroy');

        // Shift Management
        Route::get('/shift', [ShiftController::class, 'index'])->name('shift.index');
        Route::post('/shift', [ShiftController::class, 'store'])->name('shift.store');
        Route::put('/shift/{shift}', [ShiftController::class, 'update'])->name('shift.update');
        Route::delete('/shift/{shift}', [ShiftController::class, 'destroy'])->name('shift.destroy');

        // Absensi
        Route::get('/absensi', [AbsensiController::class, 'index'])->name('absensi.index');

        // Izin
        Route::get('/izin', [IzinController::class, 'index'])->name('izin.index');
        Route::post('/izin/{izin}/approve', [IzinController::class, 'approve'])->name('izin.approve');
        Route::post('/izin/{izin}/reject', [IzinController::class, 'reject'])->name('izin.reject');

        // Laporan
        Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
    });

    // Karyawan routes
    Route::middleware('role:karyawan')->prefix('dashboard/karyawan')->name('karyawan.')->group(function () {
        Route::get('/', [DashboardController::class, 'karyawan'])->name('dashboard');
        Route::post('/absen-masuk', [AbsensiController::class, 'absenMasuk'])->name('absen.masuk');
        Route::post('/absen-pulang', [AbsensiController::class, 'absenPulang'])->name('absen.pulang');

        // Izin karyawan
        Route::get('/izin', [IzinController::class, 'karyawanIndex'])->name('izin.index');
        Route::post('/izin', [IzinController::class, 'karyawanStore'])->name('izin.store');
    });
});