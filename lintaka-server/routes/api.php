<?php

use App\Http\Controllers\KontenInformasiController;
use App\Http\Controllers\PengaduanController;
use App\Http\Controllers\PenyuratanController;
use App\Http\Controllers\SuratDinasController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Pengaduan API
Route::post('/Pengaduan', [PengaduanController::class, 'store']);
Route::get('/Pengaduan', [PengaduanController::class, 'index']);
Route::get('/DownloadPengaduan/{id}', [PengaduanController::class, 'download']);
Route::get('/Pengaduan/{id}', [PengaduanController::class, 'show']);
Route::delete('/Pengaduan/{id}', [PengaduanController::class, 'destroy']);

// Penyuratan API
Route::post('/Penyuratan', [PenyuratanController::class, 'store']);
Route::get('/Penyuratan', [PenyuratanController::class, 'index']);
Route::get('/DownloadPenyuratan/{id}', [PenyuratanController::class, 'download']);
Route::get('/Penyuratan/{id}', [PenyuratanController::class, 'show']);
Route::delete('/Penyuratan/{id}', [PenyuratanController::class, 'destroy']);

// Konten Informasi API
Route::post('/Konten Informasi', [KontenInformasiController::class, 'store']);
Route::get('/Konten Informasi', [KontenInformasiController::class, 'index']);
Route::get('/Konten Informasi/{id}', [KontenInformasiController::class, 'show']);
Route::post('/Konten Informasi/{id}', [KontenInformasiController::class, 'update']);
Route::delete('/Konten Informasi/{id}', [KontenInformasiController::class, 'destroy']);

// Surat Dinas API

Route::post('/Surat Dinas', [SuratDinasController::class, 'store']);
Route::get('/Surat Dinas', [SuratDinasController::class, 'index']);
Route::get('/Download Surat Dinas/{id}', [SuratDinasController::class, 'download']);
Route::get('/Surat Dinas/{id}', [SuratDinasController::class, 'show']);
Route::delete('/Surat Dinas/{id}', [SuratDinasController::class, 'destroy']);

// Auth API
Route::post('/register', [UserController::class, 'register'])->name('register');
Route::post('/login', [UserController::class, 'login'])->name('login');
Route::post('/logout', [UserController::class, 'logout'])->name('logout');

// Admin API
Route::post('/Admin/{id}', [UserController::class, 'update']);
Route::get('/Admin', [UserController::class, 'index']);
Route::get('/Admin/{id}', [UserController::class, 'show']);
Route::delete('/Admin/{id}', [UserController::class, 'destroy']);

