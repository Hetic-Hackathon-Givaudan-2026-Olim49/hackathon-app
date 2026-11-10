# AGENTS.md

## Projet

Hackathon Five développe une application autour de la relation commerciale à l'ère de l'IA.

L'objectif actuel est d'aider un commercial à préparer un rendez-vous client à partir des informations disponibles et d'une synthèse produite avec l'aide de l'IA.

## Structure du dépôt

- `web/` : front-end de l'application.
- `api/` : API utilisée par le front-end.
- `db/` : initialisation et données de développement PostgreSQL.
- `.devcontainer/` : environnement de développement commun.
- `.github/workflows/ci.yml` : intégration continue.
- `docs/adr/` : décisions d'architecture du projet.
- `openapi.yaml` : contrat HTTP entre le front-end et l'API.

## Installation et lancement

Depuis le Dev Container :

## Rôle de l'agent

L'agent assiste l'équipe Hackathon Five dans le développement du projet.

Avant de modifier le code :
- identifier le ticket GitHub concerné ;
- consulter les ADR dans `docs/adr/` si la modification touche l'architecture ;
- consulter `openapi.yaml` si la modification concerne les échanges HTTP ;
- limiter les changements au périmètre du ticket.

L'agent ne prend pas seul une décision d'architecture importante.

## Stack et environnement

Le dépôt est un monorepo npm composé des workspaces `api` et `web`.

L'environnement de développement repose sur :
- Node.js pour le projet JavaScript/TypeScript ;
- PostgreSQL 17 pour la base de données ;
- Docker Compose ;
- VS Code Dev Container ;
- ESLint pour l'analyse statique ;
- Prettier pour le formatage ;
- Husky et lint-staged pour le hook pre-commit ;
- GitHub Actions pour la CI.

## Commandes

Installer les dépendances :

`npm ci`

Lancer le front-end et l'API :

`npm run dev`

Construire les workspaces :

`npm run build`

Vérifier ESLint :

`npm run lint`

Vérifier le formatage :

`npm run format:check`

Corriger le formatage :

`npm run format`

Avant de proposer une Pull Request, exécuter :

`npm run lint`
`npm run format:check`
`npm run build`

## Structure du dépôt

- `web/` : front-end.
- `api/` : API consommée par le front-end.
- `db/init/` : initialisation de PostgreSQL.
- `db/data/` : données locales PostgreSQL. Ne pas modifier manuellement.
- `.devcontainer/` : configuration du Dev Container.
- `.github/workflows/ci.yml` : CI et job `qualite`.
- `.github/CODEOWNERS` : ownership des fichiers sensibles.
- `.github/ISSUE_TEMPLATE/` : modèles Story, Tâche, Spike et Bug.
- `docs/adr/` : décisions d'architecture.
- `openapi.yaml` : contrat HTTP de l'API.

## Contrat API

`openapi.yaml` est la référence du contrat HTTP entre le front-end et l'API.

Lorsqu'une modification change :
- une route ;
- une entrée ;
- une réponse ;
- ou un cas d'erreur ;

mettre également à jour `openapi.yaml` dans la même Pull Request.

Consulter `docs/adr/0002-utiliser-openapi-pour-le-contrat-api.md` avant de modifier cette convention.

## Base de données

PostgreSQL 17 est le moteur de base de données retenu.

Consulter `docs/adr/0001-postgresql.md` avant de proposer un changement de moteur de base de données.

Ne jamais modifier directement `db/data/`.

## Workflow Git

`develop` est la branche d'intégration.

Ne jamais pousser directement sur `develop` ou `main`.

Pour une modification :
1. partir de `develop` à jour ;
2. créer une branche dédiée ;
3. limiter la branche à un ticket ;
4. ouvrir une Pull Request vers `develop` ;
5. attendre le check `qualite` vert ;
6. obtenir l'approbation requise ;
7. utiliser Squash and merge.

## Limites

### Toujours faire

- respecter le ticket traité ;
- consulter les ADR avant un changement architectural ;
- maintenir `openapi.yaml` cohérent avec l'API ;
- exécuter les contrôles qualité avant une Pull Request ;
- garder les changements aussi ciblés que possible.

### Demander avant de modifier

- le schéma de la base de données ;
- un choix documenté dans un ADR ;
- la structure générale du dépôt ;
- le contrat API de manière incompatible ;
- la configuration CI ou Dev Container.

### Ne jamais faire

- ajouter une clé API, un mot de passe ou un secret au dépôt ;
- modifier manuellement `db/data/` ;
- pousser directement sur `main` ou `develop` ;
- désactiver ESLint, Prettier, Husky ou la CI pour contourner une erreur ;
- inventer une exigence Product ou Data/IA non confirmée ;
- réécrire silencieusement un ADR accepté.
