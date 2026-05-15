# 🏊 SwimSync 2.0

**Application de gestion de planning multi-piscines pour CN Avignon**  
Next.js 14 · TypeScript · Tailwind CSS · Prisma · shadcn/ui

---

## 📋 Vue d'ensemble

SwimSync 2.0 est l'application de gestion de planning complète pour le Centre de Natation Avignon. Elle permet de gérer les créneaux, les coachs, les groupes, les absences, les remplacements et la paie sur 5 bassins différents.

### ✨ Fonctionnalités principales

- 📅 **Planning interactif multi-vues** (jour/semaine/mois)
- 🏊 **Gestion multi-piscines** (5 bassins Avignon)
- 👥 **CRUD complet des créneaux** avec drag & drop
- 🚫 **Annulations & rappels** automatiques
- 👨‍🏫 **Gestion des éducateurs** avec diplômes et statuts
- 🔄 **Remplacements intelligents** avec suggestions
- 💰 **Calculateur de paie** automatique
- 📊 **Dashboard de pilotage** avec KPI
- 📤 **Exports JSON/CSV/Print**
- 🔐 **Authentification NextAuth** avec rôles

---

## 🚀 Quick Start

### Prérequis

- Node.js ≥ 18.17.0
- npm ≥ 9.6.7
- PostgreSQL (ou autre base compatible Prisma)

### Installation

```bash
# Cloner le repo
git clone https://github.com/jeromedimitri-ai/swimsync-2.0.git
cd swimsync-2.0/apps/web

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres de base de données

# Générer le client Prisma
npm run db:generate

# Pousser le schéma en base
npm run db:push

# (Optionnel) Insérer les données de seed
npm run db:seed

# Lancer le serveur de dev
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

---

## 📁 Structure du projet

```
swimsync-2.0/
├── apps/web/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (dashboard)/       # Routes protégées
│   │   │   ├── planning/      # Vue planning
│   │   │   ├── coachs/        # Gestion éducateurs
│   │   │   ├── payroll/       # Paie
│   │   │   └── dashboard/     # Tableau de bord
│   │   ├── (auth)/           # Authentification
│   │   │   └── login/
│   │   ├── api/              # API Routes
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/            # Composants React
│   │   ├── planning/
│   │   │   ├── PlanningGrid.tsx
│   │   │   ├── CreneauCard.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   └── ...
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...
│   ├── lib/
│   │   ├── types.ts          # ✅ Types métier complets
│   │   ├── constants.ts      # ✅ Bassins, vacances, fériés
│   │   ├── data/
│   │   │   ├── coachs.ts     # ✅ 9 coachs réels CN Avignon
│   │   │   ├── groupes.ts    # ✅ 10 groupes saison 2025-2026
│   │   │   └── creneaux-seed.ts  # ✅ 9 créneaux exemples
│   │   └── utils.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── package.json          # ✅
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.mjs
├── .github/
│   └── workflows/
│       ├── ci.yml            # CI/CD GitHub Actions
│       └── deploy.yml
└── README.md                 # ✅ Ce fichier
```

---

## 🏊 Données métier intégrées

### Bassins (5 piscines Avignon)

- **Stade Nautique** : Olympique 50m (8 lignes), 25m (6 lignes)
- **Stuart Mill** : Olympique 50m (8 lignes), 25m (6 lignes)
- **Cap Sud** : 25m (6 lignes)

### Coachs (9 éducateurs réels)

| Coach | Diplôme | Sections autorisées |
|-------|---------|--------------------|
| Nicolas L. | DESJEPS | Competition, Enfants, Adultes, Loisirs |
| Jérôme D. | BEESAN | Competition, Enfants, Adultes |
| Andrea M. | BPJEPS AAN | Enfants, Adultes, Loisirs |
| Anabel R. | BPJEPS AAN | Enfants, Adultes, Loisirs, Aquafitness |
| Amandine B. | BPJEPS AAN | Enfants, Loisirs, Bébé Nageur |
| Lucy P. | BNSSA | Loisirs, Adultes |
| Marine C. | BPJEPS AAN | Enfants, Adultes, Loisirs |
| Eric V. | BEESAN | Competition, Enfants, Adultes |
| Cyril F. | BPJEPS AAN | Competition, Enfants, Adultes |

### Groupes (10 groupes saison 2025-2026)

- **Compétition** : Seniors, Juniors, EN4, Masters
- **Enfants** : EN1, EN2, EN3
- **Adultes** : Performance, Loisirs
- **Aquafitness**

### Vacances & Jours fériés (Zone B)

Tous les jours fériés France 2025-2026 et vacances scolaires Zone B intégrés.

---

## 🛠️ Stack technique

### Frontend

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript (strict mode)
- **Styling** : Tailwind CSS 3.4
- **UI Components** : shadcn/ui + Radix UI
- **State Management** : @tanstack/react-query
- **Drag & Drop** : @dnd-kit
- **Virtualisation** : @tanstack/react-virtual
- **Animations** : Framer Motion
- **Date** : date-fns
- **Forms** : React Hook Form + Zod
- **Icons** : Lucide React
- **Toast** : Sonner

### Backend

- **Database ORM** : Prisma 5
- **Auth** : NextAuth.js 4
- **API** : Next.js API Routes

### DevOps

- **CI/CD** : GitHub Actions
- **Hosting** : Vercel (recommandé)
- **Database** : PostgreSQL / PlanetScale / Supabase

---

## 🎨 Design System

- **Palette** : Sémantique par section (Competition rouge, Enfants orange, Adultes bleu, etc.)
- **Glassmorphism** : Cartes translucides avec backdrop-blur
- **Responsive** : Mobile-first, adapté tablette/desktop
- **Dark mode** : Support natif (à venir)

---

## 📝 Scripts disponibles

```bash
npm run dev          # Serveur de dev (localhost:3000)
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # ESLint
npm run type-check   # TypeScript check
npm run format       # Prettier
npm run db:generate  # Générer client Prisma
npm run db:push      # Pousser schéma en base
npm run db:studio    # Prisma Studio
npm run db:seed      # Seed base de données
```

---

## 🔐 Variables d'environnement

Créer un fichier `.env` à la racine de `apps/web/` :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/swimsync"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# (Optionnel) Email
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="user@example.com"
EMAIL_SERVER_PASSWORD="password"
EMAIL_FROM="noreply@cn-avignon.fr"
```

---

## 🚢 Déploiement

### Vercel (recommandé)

1. Push sur GitHub
2. Importer le projet sur [Vercel](https://vercel.com)
3. Configurer les variables d'environnement
4. Déployer ✅

### Docker

```bash
# À venir
```

---

## 🤝 Contribution

Ce projet est privé et destiné à CN Avignon.  
Pour toute question ou suggestion, contacter la direction technique.

---

## 📄 Licence

Propriétaire — CN Avignon © 2025-2026

---

## 🆘 Support

- **Documentation** : [Notion CN Avignon](https://notion.so/cn-avignon)
- **Issues** : [GitHub Issues](https://github.com/jeromedimitri-ai/swimsync-2.0/issues)
- **Contact** : direction@cn-avignon.fr

---

**SwimSync 2.0** — Développé avec ❤️ pour CN Avignon
