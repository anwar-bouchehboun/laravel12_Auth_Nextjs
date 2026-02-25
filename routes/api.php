<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::get('profile', [AuthController::class, 'profile']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});

// Routes pour la gestion des utilisateurs (protégées par JWT)
Route::middleware('auth:api')->prefix('users')->group(function () {
    // Afficher tous les utilisateurs
    Route::get('/', [UserController::class, 'index']);

    // Rechercher des utilisateurs par nom
    Route::get('/search', [UserController::class, 'search']);

    // Statistiques des utilisateurs
    Route::get('/statistics', [UserController::class, 'statistics']);

    // Modifier le mot de passe
    Route::post('/change-password', [UserController::class, 'updatePassword']);

    // Supprimer son propre compte
    Route::delete('/profile/delete', [UserController::class, 'deleteOwnAccount']);

    // Afficher un utilisateur spécifique
    Route::get('/{id}', [UserController::class, 'show']);

    // Mettre à jour un utilisateur
    Route::put('/{id}', [UserController::class, 'update']);

    // Supprimer un utilisateur (admin)
    Route::delete('/{id}', [UserController::class, 'destroy']);
});
