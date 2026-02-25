# Application d'Authentification Laravel + Next.js

Application moderne d'authentification avec Laravel (backend API REST), JWT et Next.js (frontend).

## 🚀 Fonctionnalités

- ✅ **Authentification JWT** sécurisée
- ✅ **Inscription et connexion** des utilisateurs
- ✅ **Gestion de profil** avec édition
- ✅ **Gestion des utilisateurs** (CRUD complet)
- ✅ **Recherche d'utilisateurs**
- ✅ **Statistiques du dashboard**
- ✅ **Design moderne** avec Tailwind CSS
- ✅ **API REST complète** avec Laravel

## 🛠️ Installation

### 1. Installer les dépendances :
```bash
npm install
```

### 2. Configurer les variables d'environnement :
```bash
cp .env.example .env.local
```

Modifier `.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME="Auth Laravel"
```

### 3. Démarrer le serveur de développement :
```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

## 📡 Pages

- `/` - Page d'accueil
- `/login` - Connexion
- `/register` - Inscription
- `/dashboard` - Tableau de bord (protégé)
- `/users` - Gestion des utilisateurs (protégé)
- `/profile` - Profil utilisateur (protégé)

## 🏗️ Structure

```
src/
├── app/              # Pages Next.js
├── components/       # Composants réutilisables
├── contexts/         # Context API (Auth)
└── lib/             # Services API (axios, auth, users)
```

## 🔧 Technologies

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Axios

