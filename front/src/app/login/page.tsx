'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || err.response?.data?.error || 'Erreur lors de la connexion');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-5xl">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-5xl font-bold">Bon retour !</h1>
          <p className="py-6">
            Connectez-vous pour accéder à votre tableau de bord et gérer vos données.
            Notre plateforme vous offre tous les outils nécessaires pour gérer efficacement vos utilisateurs.
          </p>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div className="stat-title">Sécurisé</div>
              <div className="stat-value text-primary">100%</div>
              <div className="stat-desc">Authentification JWT</div>
            </div>
          </div>
        </div>

        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Connexion</h2>
              <p className="text-sm text-base-content/70 mt-2">
                Pas de compte ?{' '}
                <Link href="/register" className="link link-primary">
                  Inscrivez-vous
                </Link>
              </p>
            </div>

            {error && (
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="votre@email.com"
                className={`input input-bordered ${validationErrors.email ? 'input-error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {validationErrors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{validationErrors.email[0]}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered ${validationErrors.password ? 'input-error' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {validationErrors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{validationErrors.password[0]}</span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt text-base-content/60">Minimum 6 caractères</span>
              </label>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Mot de passe oublié ?</a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
