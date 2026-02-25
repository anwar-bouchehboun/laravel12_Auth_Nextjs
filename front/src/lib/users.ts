import api from './api';
import { User } from './auth';

export interface PaginatedUsers {
  data: User[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface UserStatistics {
  total_users: number;
  verified_users: number;
  unverified_users: number;
  recent_users: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

// Service de gestion des utilisateurs
export const userService = {
  // Liste des utilisateurs avec pagination
  async getUsers(page: number = 1, perPage: number = 10): Promise<PaginatedUsers> {
    const { data } = await api.get<PaginatedUsers>('/users', {
      params: { page, per_page: perPage },
    });
    return data;
  },

  // Obtenir un utilisateur par ID
  async getUser(id: number): Promise<User> {
    const { data } = await api.get<{ success: boolean; data: User }>(`/users/${id}`);
    return data.data;
  },

  // Rechercher des utilisateurs
  async searchUsers(query: string): Promise<User[]> {
    const { data } = await api.get<User[]>('/users/search', {
      params: { query },
    });
    return data;
  },

  // Statistiques des utilisateurs
  async getStatistics(): Promise<UserStatistics> {
    const { data } = await api.get<UserStatistics>('/users/statistics');
    return data;
  },

  // Mettre à jour un utilisateur
  async updateUser(id: number, userData: UpdateUserData): Promise<User> {
    const { data } = await api.put<User>(`/users/${id}`, userData);
    return data;
  },

  // Changer le mot de passe
  async changePassword(passwordData: ChangePasswordData): Promise<{ message: string }> {
    const { data } = await api.post<{ message: string }>('/users/change-password', passwordData);
    return data;
  },

  // Supprimer un utilisateur
  async deleteUser(id: number): Promise<{ message: string }> {
    const { data } = await api.delete<{ message: string }>(`/users/${id}`);
    return data;
  },
};
