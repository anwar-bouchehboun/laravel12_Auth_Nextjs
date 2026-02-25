'use client';

import { useEffect, useRef } from 'react';
import { authService } from '@/lib/auth';

/**
 * Hook personnalisé pour rafraîchir automatiquement le token JWT
 * Vérifie périodiquement si le token va expirer et le rafraîchit si nécessaire
 */
export function useTokenRefresh() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Fonction pour vérifier et rafraîchir le token
    const checkAndRefreshToken = async () => {
      if (authService.isAuthenticated()) {
        try {
          await authService.refreshTokenIfNeeded();
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      }
    };

    // Vérifier immédiatement au montage
    checkAndRefreshToken();

    // Vérifier toutes les 2 minutes
    intervalRef.current = setInterval(checkAndRefreshToken, 2 * 60 * 1000);

    // Nettoyer l'intervalle au démontage
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}
