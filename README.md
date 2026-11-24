# EcoRide Frontend

Frontend de l'application **EcoRide**, une plateforme de covoiturage écoresponsable développée avec Next.js.

Cette application consomme l'API REST du backend EcoRide développé avec FastAPI.

## Fonctionnalités

### Utilisateur

- Inscription et connexion.
- Gestion du profil.
- Recherche de covoiturages.
- Réservation de trajets.
- Consultation de l'historique des réservations.
- Dépôt d'avis après un trajet.

### Chauffeur

- Gestion des véhicules.
- Création et gestion des covoiturages.
- Modification du statut des trajets.
- Consultation des réservations.

### Employé

- Modération des avis utilisateurs.

### Administrateur

- Consultation des statistiques de la plateforme.
- Suivi de l'activité des covoiturages.
- Suivi des revenus générés.

---

## Technologies utilisées

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI
- React Hook Form
- Zod

---

## Prérequis

- Node.js 22 ou supérieur
- npm
- Backend EcoRide opérationnel

---

## Installation

Cloner le projet :

```bash
git clone https://github.com/Lehanann/ecoride-next.git
cd ecoride-front
```

Installer les dépendances :

```bash
npm install
```

---

## Configuration

Créer un fichier `.env.local`.

Exemple :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Adapter l'URL en fonction de l'environnement utilisé.

---

## Lancement

Mode développement :

```bash
npm run dev
```

L'application sera disponible à l'adresse :

```text
http://localhost:3000
```

Construction pour la production :

```bash
npm run build
```

Lancement :

```bash
npm run start
```

---

## Backend associé

Cette application nécessite le backend EcoRide développé avec FastAPI.

Le backend fournit :

- l'authentification JWT ;
- la gestion des utilisateurs ;
- la gestion des véhicules ;
- la gestion des covoiturages ;
- la gestion des réservations ;
- la gestion des avis ;
- le tableau de bord administrateur.

Consulter le dépôt backend pour les instructions d'installation et de configuration.

---

## Architecture

Organisation principale :

```text
src/
├── app/
├── components/
├── hooks/
├── services/
├── types/
└── utils/
```

---

## Objectif pédagogique

Ce projet a été développé dans le cadre d'un projet d'étude afin de démontrer :

- l'utilisation de Next.js et React ;
- le développement d'interfaces modernes avec TypeScript ;
- la consommation d'une API REST FastAPI ;
- la gestion de l'état applicatif côté client ;
- la validation des formulaires avec React Hook Form et Zod ;
- la conception d'une application web complète de covoiturage.

Le projet est destiné à illustrer une démarche de développement et des compétences techniques. Il n'a pas vocation à constituer un produit de production.