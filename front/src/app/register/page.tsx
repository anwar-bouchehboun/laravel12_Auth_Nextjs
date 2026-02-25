'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password, passwordConfirmation);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row w-full max-w-5xl">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-5xl font-bold">Rejoignez-nous !</h1>
          <p className="py-6">
            Créez votre compte dès aujourd'hui et profitez de tous les avantages de notre plateforme.
            L'inscription est rapide et sécurisée.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="alert alert-info shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Gratuit et sans engagement</span>
            </div>
            <div className="alert alert-success shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Données sécurisées avec JWT</span>
            </div>
          </div>
        </div>

        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Inscription</h2>
              <p className="text-sm text-base-content/70 mt-2">
                Déjà un compte ?{' '}
                <Link href="/login" className="link link-primary">
                  Connectez-vous
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
                <span className="label-text">Nom complet</span>
              </label>
              <input
                type="text"
                placeholder="Jean Dupont"
                className={`input input-bordered ${validationErrors.name ? 'input-error' : ''}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {validationErrors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{validationErrors.name[0]}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="jean@exemple.com"
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
                <span className="label-text-alt text-base-content/60">
                  Minimum 6 caractères
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmer le mot de passe</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered ${validationErrors.password ? 'input-error' : ''}`}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              {validationErrors.password && (
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Les mots de passe doivent correspondre
                  </span>
                </label>
              )}
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
                    Inscription...
                  </>
                ) : (
                  'S\'inscrire'
                )}
              </button>
            </div>

            <div className="text-xs text-center text-base-content/60 mt-4">
              En vous inscrivant, vous acceptez nos conditions d'utilisation
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
