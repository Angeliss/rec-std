<?php

use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StudentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $std = Student::latest()->limit(5)->get();
    $std->load('level');
    $std->load('studySector');

    return Inertia::render('Dash', [
        'latest' => $std
    ]);
})->name('dashboard');
Route::get('/parametre', [SettingController::class, 'index'])->name('setting');
Route::post('/parametre/add-level', [SettingController::class, 'storeLevel'])->name('add-level');
Route::post('/parametre/add-study-sector', [SettingController::class, 'storeStudySector'])->name('add-study-sector');

Route::get('/students', [StudentController::class, 'index'])->name('students');
Route::get('/students/{id}/show', [StudentController::class, 'show'])->name('show');
Route::get('/students/add', [StudentController::class, 'create'])->name('create');
Route::post('/students/add', [StudentController::class, 'store'])->name('store');
Route::get('/students/{id}/edit', [StudentController::class, 'edit'])->name('edit');
Route::post('/students/{id}/edit', [StudentController::class, 'update'])->name('update');
Route::delete('/students/{id}/delete', [StudentController::class, 'destroy'])->name('delete');
Route::get('/students/search', [StudentController::class, 'searching'])->name('search');

// Route::get('/', function () {
//     return Inertia::render('Dash', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
