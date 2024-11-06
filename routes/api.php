<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('users', UserController::class)->only(['index','show', 'update', 'destroy']);
    Route::prefix('users')->group(function () {
        Route::get('restore/{uuid}', [UserController::class, 'restore']);
        Route::get('remove/{uuid}', [UserController::class, 'remove']);
    });
//    Route::get('/', [UserController::class, 'index']);
//    Route::get('/{id}', [UserController::class, 'show']);
//    Route::post('/', [UserController::class, 'store']);
//    Route::put('/{id}', [UserController::class, 'update']);
//    Route::delete('/{id}', [UserController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
