# 0002. Utiliser OpenAPI pour définir le contrat de l'API

- Statut : acceptée
- Date : 2026-11-09
- Décideurs : Hackathon Five

## Contexte

Hackathon Five développe une application autour de la relation commerciale à l'ère de l'IA.

Le front-end doit communiquer avec l'API pour permettre au commercial de demander la préparation d'un rendez-vous client et d'obtenir une synthèse générée avec l'aide de l'IA.

Le projet implique plusieurs profils, notamment Tech et Data/IA. Il est donc nécessaire de définir clairement les données attendues en entrée, les réponses retournées par l'API et les cas d'erreur.

## Options

1. Documentation uniquement dans le README : simple à maintenir au début, mais moins adaptée pour décrire précisément les routes, les entrées, les réponses et les erreurs de l'API.

2. Documentation directement dans le code : proche de l'implémentation, mais oblige les autres membres de l'équipe à lire le code pour comprendre le contrat de l'API.

3. OpenAPI : définit le contrat HTTP dans un fichier standardisé et lisible indépendamment de l'implémentation, mais demande de maintenir le contrat lorsque l'API évolue.

## Décision

Nous choisissons OpenAPI pour documenter le contrat de l'API.

Le contrat est versionné dans le fichier ../../openapi.yaml.

Ce fichier décrit notamment la route permettant de demander la préparation d'un rendez-vous client, les données attendues et les réponses possibles.

Le fichier OpenAPI devient la référence partagée entre le front-end, l'API et les travaux liés à l'IA.

## Conséquences

- Positives : le contrat de l'API est explicite, versionné avec le code et consultable par toute l'équipe.
- Positives : le front-end et l'API peuvent s'appuyer sur la même définition des échanges.
- Négatives, à accepter : toute modification d'une route ou de son format nécessite également de mettre à jour `openapi.yaml`.
- À revoir si : le projet abandonne l'API HTTP actuelle ou adopte un autre mécanisme de communication qui rend OpenAPI inadapté.
