<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Afficher tous les utilisateurs avec pagination
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $users = User::paginate($perPage);

        return response()->json($users, 200);
    }

    /**
     * Rechercher des utilisateurs par nom
     */
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'required|string|min:2',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $searchTerm = $request->input('query');
        $users = User::where('name', 'LIKE', "%{$searchTerm}%")
            ->orWhere('email', 'LIKE', "%{$searchTerm}%")
            ->get();

        return response()->json($users, 200);
    }

    /**
     * Afficher un utilisateur spécifique
     */
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ], 200);
    }

    /**
     * Mettre à jour les informations d'un utilisateur
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Vérifier que l'utilisateur connecté modifie son propre profil ou est admin
        if (Auth::guard('api')->id() !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this user'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name'  => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Mise à jour des champs
        if ($request->has('name')) {
            $user->name = $request->name;
        }

        if ($request->has('email')) {
            $user->email = $request->email;
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    /**
     * Modifier le mot de passe avec confirmation
     */
    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password'      => 'required|string|min:6',
            'new_password'          => 'required|string|min:6|confirmed',
            'new_password_confirmation' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::guard('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        // Vérifier que le mot de passe actuel est correct
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect'
            ], 401);
        }

        // Vérifier que le nouveau mot de passe est différent de l'ancien
        if (Hash::check($request->new_password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'New password must be different from current password'
            ], 422);
        }

        // Mettre à jour le mot de passe
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully'
        ], 200);
    }

    /**
     * Supprimer un utilisateur
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Empêcher l'utilisateur de supprimer son propre compte via cette route
        // Pour supprimer son propre compte, l'utilisateur devrait utiliser une route dédiée
        if (Auth::guard('api')->id() === $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot delete your own account from this endpoint. Please use the profile deletion endpoint.'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ], 200);
    }

    /**
     * Supprimer son propre compte (profil)
     */
    public function deleteOwnAccount()
    {
        /** @var \App\Models\User $user */
        $user = Auth::guard('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        // Déconnecter l'utilisateur avant de supprimer le compte
        Auth::guard('api')->logout();

        // Supprimer le compte
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Your account has been deleted successfully'
        ], 200);
    }

    /**
     * Obtenir les statistiques des utilisateurs
     */
    public function statistics()
    {
        $totalUsers = User::count();
        $recentUsers = User::where('created_at', '>=', now()->subDays(7))->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_users' => $totalUsers,
                'recent_users_last_7_days' => $recentUsers
            ]
        ], 200);
    }
}
