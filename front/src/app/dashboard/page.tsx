'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { userService, UserStatistics } from '@/lib/users';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await userService.getStatistics();
        setStats(data);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Bienvenue, {user.name} 👋
        </h1>
        <p className="text-base-content/70">
          Voici un aperçu de votre tableau de bord
        </p>
      </div>

      {/* Statistiques */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-8">
        {loadingStats ? (
          <div className="stat">
            <div className="stat-value">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          </div>
        ) : stats ? (
          <>
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div className="stat-title">Total utilisateurs</div>
              <div className="stat-value text-primary">{stats.total_users}</div>
              <div className="stat-desc">Tous les comptes enregistrés</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-success">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <div className="stat-title">Vérifiés</div>
              <div className="stat-value text-success">{stats.verified_users}</div>
              <div className="stat-desc">Comptes confirmés</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-warning">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="stat-title">Non vérifiés</div>
              <div className="stat-value text-warning">{stats.unverified_users}</div>
              <div className="stat-desc">En attente</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                </svg>
              </div>
              <div className="stat-title">Récents</div>
              <div className="stat-value text-info">{stats.recent_users}</div>
              <div className="stat-desc">Derniers 7 jours</div>
            </div>
          </>
        ) : null}
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/users" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body items-center text-center">
            <div className="text-5xl mb-4">👥</div>
            <h2 className="card-title">Gérer les utilisateurs</h2>
            <p className="text-base-content/70">Voir, rechercher et gérer tous les utilisateurs</p>
            <div className="card-actions">
              <button className="btn btn-primary btn-sm">Accéder</button>
            </div>
          </div>
        </Link>

        <Link href="/profile" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body items-center text-center">
            <div className="text-5xl mb-4">👤</div>
            <h2 className="card-title">Mon profil</h2>
            <p className="text-base-content/70">Voir et modifier vos informations personnelles</p>
            <div className="card-actions">
              <button className="btn btn-success btn-sm">Modifier</button>
            </div>
          </div>
        </Link>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="card-title">Sécurité</h2>
            <p className="text-base-content/70">Authentification JWT sécurisée</p>
            <div className="badge badge-success gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Protégé
            </div>
          </div>
        </div>
      </div>

      {/* Informations du compte */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Informations du compte
          </h2>
          <div className="divider"></div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <span className="font-medium">Nom</span>
              <span className="text-base-content/70">{user.name}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <span className="font-medium">Email</span>
              <span className="text-base-content/70">{user.email}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
              <span className="font-medium">Statut</span>
              <span className="badge badge-success">Actif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
