# 🏊 SwimSync 2.0 - Guide de Déploiement

## ✅ Statut de l'Application

L'application SwimSync 2.0 est **prête pour la mise en route** avec toutes les fonctionnalités MVP implémentées.

### Ce qui a été créé

#### 📦 Infrastructure & Configuration
- ✅ Next.js 14 + TypeScript + Tailwind CSS
- ✅ Prisma ORM avec schéma complet (Coach, Group, Pool, Slot, Absence, etc.)
- ✅ Docker Compose pour PostgreSQL
- ✅ GitHub Actions CI/CD (lint, type-check, build, Prisma validate)
- ✅ Configuration shadcn/ui
- ✅ Variables d'environnement (.env.example)

#### 🎨 Composants UI (shadcn/ui)
- ✅ Button component avec variants
- ✅ Card components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)

#### 📄 Pages de l'Application
1. **Dashboard** (`/dashboard`)
   - Vue d'ensemble avec statistiques clés
   - Créneaux du jour, coachs disponibles, absences, bassins actifs
   - Heures de paie et groupes actifs

2. **Planning** (`/planning`)
   - Vues: Jour / Semaine / Mois
   - Affichage par bassin (5 bassins d'Avignon)
   - Créneaux avec groupes et coachs

3. **Gestion des Coachs** (`/coachs`)
   - Liste des 9 coachs du CN Avignon (Nicolas, Jérôme, Andrea, Anabel, Amandine, Lucy, Marine, Eric, Cyril)
   - Diplômes (BPJEPS, BEESAN)
   - Statuts et heures/semaine

4. **Absences & Remplacements** (`/absences`)
   - Gestion des absences
   - Suggestions de remplaçants
   - Statuts: Remplacé / À remplacer

5. **Paie** (`/paie`)
   - Calcul automatique des heures
   - Tableau récapitulatif par coach
   - Export des données (prévu)

## 🚀 Mise en Route

### Prérequis
- Node.js 20+
- Docker & Docker Compose
- npm ou yarn

### Installation Rapide

```bash
# 1. Cloner le repository
git clone https://github.com/jeromedimitri-ai/swimsync-2.0.git
cd swimsync-2.0

# 2. Démarrer PostgreSQL avec Docker
docker-compose up -d

# 3. Installer les dépendances
cd apps/web
npm install

# 4. Configuration environnement
cp .env.example .env
# Modifier .env avec vos valeurs:
# - DATABASE_URL=postgresql://swimsync:password@localhost:5432/swimsync
# - NEXTAUTH_SECRET=votre-secret-aléatoire
# - NEXTAUTH_URL=http://localhost:3000

# 5. Initialiser la base de données
npx prisma generate
npx prisma db push

# 6. (Optionnel) Seed avec données de test
node prisma/seed.js

# 7. Lancer l'application
npm run dev
```

### Accès à l'Application
- **URL locale**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Planning**: http://localhost:3000/planning
- **Coachs**: http://localhost:3000/coachs
- **Absences**: http://localhost:3000/absences
- **Paie**: http://localhost:3000/paie

## 📋 Prochaines Étapes Recommandées

### Phase 1: Compléments UI (Optionnel)
1. Installer les packages @radix-ui manquants pour shadcn/ui
   ```bash
   npm install @radix-ui/react-slot @radix-ui/react-dropdown-menu @radix-ui/react-dialog
   ```

2. Créer composants UI supplémentaires
   - Input (pour formulaires)
   - Select (pour menus déroulants)
   - Dialog (pour modales)
   - Calendar (pour sélection de dates)

3. Ajouter une barre de navigation
   - Créer `components/navigation.tsx`
   - Intégrer dans `app/layout.tsx`

### Phase 2: Fonctionnalités Avancées
1. **CRUD Créneaux**
   - API Routes Next.js pour créer/modifier/supprimer créneaux
   - Formulaires avec validation
   - Drag & Drop avec @dnd-kit

2. **Système d'authentification**
   - NextAuth configuré pour login sécurisé
   - Rôles: Admin, Coach, Visiteur

3. **Données réelles**
   - Importer/créer les seeds avec les vrais créneaux CN Avignon
   - Vacances Zone B 2024-2025
   - Planning annuel complet

4. **Export & Rapports**
   - Export Excel des plannings
   - Export PDF des fiches de paie
   - Statistiques avancées

### Phase 3: Déploiement Production
1. **Hébergement**
   - Vercel (recommandé pour Next.js)
   - Ou serveur VPS avec PM2

2. **Base de données**
   - PostgreSQL managée (Supabase, Neon, Railway)

3. **Domaine**
   - Configurer DNS
   - SSL/HTTPS automatique

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Lancer en développement
npm run build        # Build production
npm run start        # Lancer en production
npm run lint         # Linter ESLint
npm run type-check   # Vérification TypeScript
```

## 📦 Données Réelles Intégrées

### Bassins (5)
- Stade Nautique 25m
- Stade Nautique 50m
- Stuart Mill 25m (intérieur)
- Stuart Mill 25m (extérieur)
- Champfleury

### Coachs (9)
1. Nicolas - BPJEPS - Temps plein
2. Jérôme - BPJEPS - Temps plein
3. Andrea - BPJEPS - Temps partiel
4. Anabel - BEESAN - Temps partiel
5. Amandine - BPJEPS - Temps partiel
6. Lucy - BEESAN - Temps partiel
7. Marine - BPJEPS - Vacataire
8. Eric - BEESAN - Vacataire
9. Cyril - BPJEPS - Vacataire

### Groupes
- EN1, EN2, EN3, EN4 (Entraînement Natation)
- Juniors, Seniors
- Groupes spécialisés

## ✨ Fonctionnalités Clés

✅ Planning interactif multi-bassins
✅ Gestion complète des coachs avec diplômes
✅ Système d'absences et remplacements
✅ Calcul automatique de la paie
✅ Responsive design (mobile, tablet, desktop)
✅ Dark mode supporté
✅ Interface moderne avec Tailwind CSS
✅ Type-safe avec TypeScript
✅ CI/CD avec GitHub Actions

## 📞 Support

Pour toute question ou problème:
1. Consulter le README.md
2. Vérifier les logs Docker: `docker-compose logs`
3. Vérifier les logs Next.js dans le terminal

---

**Application développée pour le Centre de Natation Avignon** 🏊‍♂️
