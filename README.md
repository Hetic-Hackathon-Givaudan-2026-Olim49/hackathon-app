# Hackathon Five

## Présentation

Projet réalisé dans le cadre du Hackathon Givaudan 2026.

**Sujet : La relation commerciale à l'ère de l'IA**

L'objectif du projet est de concevoir une solution autour de l'évolution de la relation commerciale grâce à l'intelligence artificielle.

## Équipe

Hackathon Five est une équipe composée de profils complémentaires :

- Product
- Data / IA
- Tech

## Structure du projet

Le projet est organisé sous la forme d'un monorepo avec deux workspaces npm :

- `api/` : partie API / back-end
- `web/` : partie front-end
- `db/` : éléments liés à la base de données
- `.devcontainer/` : environnement de développement
- `.github/` : configuration GitHub, CODEOWNERS et modèle de Pull Request
- `docs/ADR/` : décisions d'architecture

## Installation

Installer les dépendances :

`npm install`

## Lancement

Pour lancer le front-end et l'API en parallèle :

`npm run dev`

## Build

Pour construire les différents workspaces :

`npm run build`

## Workflow Git

La branche de développement principale est `develop`.

Les développements sont réalisés sur des branches dédiées puis intégrés à `develop` via des Pull Requests.

Les branches `main` et `develop` sont protégées.

Toute intégration nécessite une revue avant la fusion.

## Qualité et collaboration

Le projet utilise notamment :

- ESLint
- Prettier
- Husky
- lint-staged
- GitHub Actions
- CODEOWNERS
- Pull Requests

## Architecture

Les décisions techniques importantes du projet sont documentées sous forme d'ADR dans le dossier `docs/ADR/`.
