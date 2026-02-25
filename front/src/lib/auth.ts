import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

// Authentification
export const authService = {
  // Connexion
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Sauvegarder le temps d'expiration
      if (data.expires_in) {
        const expirationTime = Date.now() + data.expires_in * 1000;
        localStorage.setItem('token_expiration', expirationTime.toString());
      }
    }
    return data;
  },

  // Inscription
  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', userData);
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Sauvegarder le temps d'expiration
      if (data.expires_in) {
        const expirationTime = Date.now() + data.expires_in * 1000;
        localStorage.setItem('token_expiration', expirationTime.toString());
      }
    }
    return data;
  },

  // Déconnexion
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('token_expiration');
    }
  },

  // Obtenir le profil
  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/auth/profile');
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },

  // Rafraîchir le token
  async refreshToken(): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/refresh');
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      
      // Sauvegarder le nouveau temps d'expiration
      if (data.expires_in) {
        const expirationTime = Date.now() + data.expires_in * 1000;
        localStorage.setItem('token_expiration', expirationTime.toString());
      }
    }
    return data;
  },

  // Vérifier si le token est expiré
  isTokenExpired(): boolean {
    if (typeof window === 'undefined') return true;
    
    const expiration = localStorage.getItem('token_expiration');
    if (!expiration) return true;
    
    return Date.now() >= parseInt(expiration);
  },

  // Vérifier si le token va expirer bientôt (dans les 5 prochaines minutes)
  isTokenExpiringSoon(): boolean {
    if (typeof window === 'undefined') return false;
    
    const expiration = localStorage.getItem('token_expiration');
    if (!expiration) return false;
    
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes en millisecondes
    return Date.now() >= (parseInt(expiration) - fiveMinutes);
  },

  // Rafraîchir le token de manière proactive si nécessaire
  async refreshTokenIfNeeded(): Promise<void> {
    if (this.isTokenExpiringSoon() && !this.isTokenExpired()) {
      try {
        await this.refreshToken();
      } catch (error) {
        console.error('Failed to refresh token proactively:', error);
      }
    }
  },

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
