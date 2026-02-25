'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <div className="mb-8">
              <div className="badge badge-primary badge-lg gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                v1.0 - Propulsé par Laravel & Next.js
              </div>
            </div>

            <h1 className="text-6xl font-bold mb-6">
              Bienvenue sur{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Auth Laravel
              </span>
            </h1>

            <p className="text-xl mb-8 text-base-content/70">
              Une application moderne d'authentification avec Laravel, JWT et Next.js.
              Profitez d'une sécurité optimale et d'une expérience utilisateur exceptionnelle.
            </p>

            <div className="flex justify-center gap-4 mb-12">
              <Link href="/register" className="btn btn-primary btn-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Commencer
              </Link>
              <Link href="/login" className="btn btn-outline btn-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Se connecter
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="text-5xl mb-4">🔐</div>
                  <h2 className="card-title">Sécurisé</h2>
                  <p className="text-base-content/70">
                    Authentification JWT robuste avec Laravel pour une sécurité maximale
                  </p>
                  <div className="card-actions">
                    <div className="badge badge-outline">JWT</div>
                    <div className="badge badge-outline">Laravel</div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="text-5xl mb-4">⚡</div>
                  <h2 className="card-title">Rapide</h2>
                  <p className="text-base-content/70">
                    Interface réactive et moderne développée avec Next.js et React
                  </p>
                  <div className="card-actions">
                    <div className="badge badge-outline">Next.js</div>
                    <div className="badge badge-outline">React</div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="text-5xl mb-4">🎨</div>
                  <h2 className="card-title">Moderne</h2>
                  <p className="text-base-content/70">
                    Design élégant et professionnel avec Tailwind CSS et DaisyUI
                  </p>
                  <div className="card-actions">
                    <div className="badge badge-outline">Tailwind</div>
                    <div className="badge badge-outline">DaisyUI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies Stack */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">Technologies utilisées</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="badge badge-lg">Laravel 11</div>
                <div className="badge badge-lg">Next.js 15</div>
                <div className="badge badge-lg">TypeScript</div>
                <div className="badge badge-lg">Tailwind CSS</div>
                <div className="badge badge-lg">DaisyUI</div>
                <div className="badge badge-lg">JWT Auth</div>
                <div className="badge badge-lg">MySQL</div>
              </div>
            </div>

            {/* Stats */}
            <div className="stats stats-vertical lg:stats-horizontal shadow mt-12">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div className="stat-title">Authentification</div>
                <div className="stat-value text-primary">JWT</div>
                <div className="stat-desc">Sécurisée et moderne</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                </div>
                <div className="stat-title">Performance</div>
                <div className="stat-value text-secondary">100%</div>
                <div className="stat-desc">Optimisée</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div className="stat-title">Disponibilité</div>
                <div className="stat-value text-accent">24/7</div>
                <div className="stat-desc">Support continu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
