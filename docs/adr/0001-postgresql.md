# 0001. Utiliser PostgreSQL comme base de données

- Statut : acceptée
- Date : 2026-11-09
- Décideurs : Hackathon Five

## Contexte

Hackathon Five développe une application pendant un hackathon de deux semaines.
Le projet possède un front, une API et une base de données utilisés dans le même environnement de développement.

L'équipe a besoin d'une base reproductible sur les machines des développeurs et pouvant être démarrée avec le reste de l'environnement.

Le projet utilise Docker Compose et la base doit être accessible depuis l'API sans installation manuelle supplémentaire sur la machine du développeur.

## Options

1. PostgreSQL : base relationnelle, disponible avec une image Docker officielle et intégrable directement dans `compose.yaml`. Elle nécessite cependant l'exécution d'un service supplémentaire.

2. SQLite : simple à utiliser et ne nécessite pas de serveur séparé, mais repose sur un fichier local et correspond moins à l'environnement multi-services retenu pour le projet.

3. MariaDB : base relationnelle pouvant également être exécutée dans Docker, mais son adoption demanderait de modifier l'environnement déjà mis en place sans apporter de bénéfice identifié pour le hackathon.

## Décision

Nous choisissons PostgreSQL 17 comme base de données.

PostgreSQL est lancé par `compose.yaml`, ce qui permet à l'équipe d'utiliser la même version et le même environnement de base de données sur les différentes machines de développement.

Ce choix correspond également à l'environnement déjà utilisé par l'API pendant la mise en place du projet.

## Conséquences

- Positives : environnement reproductible, version de PostgreSQL identique pour l'équipe et démarrage géré par Docker Compose.
- Négatives, à accepter : PostgreSQL ajoute un service à démarrer et nécessite que Docker fonctionne pour utiliser complètement l'application.
- À revoir si : les besoins du produit ou les contraintes d'hébergement imposent un autre système de stockage.
