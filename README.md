# Consignes
Concevoir une petite application web qui affiche sous forme de trombinoscope tous les personnages Marvel (photo + nom).
Marvel met à disposition une API qui peut être requêtée pour obtenir tous les personnages https://developer.marvel.com/.
La liste complète des personnages ne pourra pas être affichée sur la même page, il faudra les paginer.

Cette application doit être mobile-first
Lancement dans 2 containers Docker
Container partie serveur : NodeJS / JavaScript (pas de TypeScript)
Container partie client : Framework au choix (Angular(JS), VueJS, React, autre, ou rien)
Déployer l'image docker sur un environnement AWS OU GCP et indiquer l'URL de déploiement où nous pouvons voir le résultat.
Le projet doit pouvoir être lancé en quelques lignes de commande sur un poste de développement grâce à docker.


# MarvelFront App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## Install

node v12.18.3
npm 6.14.6

`npm install`

## Development server

Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Dockerize

Run `docker build -t marvel-front .` then `docker run --name marvel-front -d -p 8080:80 marvel-front`
Access `http://localhost:8080/`
