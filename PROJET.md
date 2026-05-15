# Zyber — GRC Cyber PME (ANSSI)

## Contexte métier

Application open source de GRC (Governance, Risk, and Compliance) Cyber dédiée aux PME.
Permet à une PME de s'auto-évaluer et de se mettre en conformité avec les **42 mesures du "Guide d'hygiène informatique" de l'ANSSI**.

- 10 thématiques (Sensibiliser, Authentifier, Sécuriser le réseau, etc.)
- 2 niveaux : **Standard** et **Renforcé**

---

## Fonctionnalités clés

1. **Dashboard récapitulatif** : Jauge globale, score Standard vs Renforcé, progression par thématique
2. **Module d'évaluation (Checklist interactive)** : 42 mesures avec statut (Non commencé, En cours, Atteint, Non applicable) + commentaire
3. **Plan d'action** : Kanban ou liste de tâches générée à partir des mesures "Non commencées" ou "En cours"
4. **Gestion des preuves** : Lien ou document justificatif attaché à chaque mesure

---

## Stack technique retenue

```
monorepo/
  apps/
    web/          ← Vite + React + TanStack Router + tRPC client + Shadcn
    api/          ← Bun + Hono + tRPC server + Prisma
  packages/
    trpc/         ← router partagé (types end-to-end)
    db/           ← Prisma schema + migrations
```

| Couche | Choix |
|--------|-------|
| Runtime | Bun |
| HTTP server | Hono |
| API | tRPC v11 |
| Frontend | Vite + React |
| Routing | TanStack Router (file-based, type-safe) |
| Data fetching | TanStack Query (intégré tRPC) |
| UI | Shadcn/UI + Tailwind CSS |
| ORM | Prisma |
| Auth | Better Auth |
| Base de données | PostgreSQL |
| Charts | Recharts |

### Choix structurants

- **Pas de Next.js** : app B2B dashboard, SSR inutile, SPA suffit
- **Bun comme vrai runtime HTTP** (pas juste package manager)
- **Monorepo Bun Workspaces** : backend et frontend découplés et déployables indépendamment
- **tRPC partagé** via le package `packages/trpc` pour la type-safety end-to-end

---

## Plan d'action

| Étape | Description | Statut |
|-------|-------------|--------|
| 1 | Initialisation du monorepo + schéma Prisma (Users, Tenants, Mesures, Évaluations, Tâches) | 🔲 À faire |
| 2 | Seed : insertion des 42 mesures ANSSI (thématiques, niveaux, descriptions) | 🔲 À faire |
| 3 | UI + Dashboard (navigation, graphiques, données mockées) | 🔲 À faire |
| 4 | Logique métier + intégration BDD (statuts temps réel, recalcul score) | 🔲 À faire |

---

## Prochaine session

Reprendre à l'**Étape 1** :
- Initialiser le monorepo Bun Workspaces
- Proposer le schéma Prisma : `User`, `Organization` (tenant), `Measure`, `Assessment`, `EvaluationItem`, `Task`, `Evidence`
