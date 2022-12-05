<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// ------------------------------------------------------------------------------

// route api products
Route::apiResource('/product', App\Http\Controllers\Api\ProductController::class);
// route api Admins
Route::apiResource('/user', App\Http\Controllers\Api\UserController::class);
// route api Admins
Route::apiResource('/category', App\Http\Controllers\Api\CategoryController::class);
// route api Admins
Route::apiResource('/customer', App\Http\Controllers\Api\CustomerController::class);

// auth
Route::post('/login', App\Http\Controllers\Api\LoginController::class)->name('login');
// Route::post('/logout', App\Http\Controllers\Api\LogoutController::class)->name('logout');


// midlewere //jika user belum login maka akan diriderect kembali ke halaman login sekaligus mendapatkan data user
Route::middleware('auth:api')->get('/datauser', function (Request $request) {
    return $request->user();
});

