# twitch-bot

## Technical stack

- express server
- node-json-db database
- Angular frontend

## npm commands

### Install

```cmd
npm i
```

### Start project for dev

```cmd
npm start
```

### Build project

```cmd
npm run build
```

## Pre-require

- NodeJS installed in your computer
- Dev.Twitch account and application with these allowed redirect URL
  - http://localhost:3000/auth/twitch/callback
  - http://localhost:3000
- Copy ./backend/config.json.tmpl, rename it into "config.json" and edit it

## Backlog (FR sorry bro): 

- Documentation de comment mettre en place le bot sur la page d'accueil du front
  - Comment entrer les url callback dans dev.twitch
  - Comment remplir le fichier config.json
  - 
- Mécanisme d'authentification initializé depuis le front : 
  - Vérification que le back n'est pas authentifié
  - init de l'authent localhost -> localhost:3000 -> IDP Twitch -> localhost:3000/auth -> localhost
  - 
- Interface d'administration : 
  - Upload de fichiers depuis l'interface d'admin vers /public pour permettre : 
    - Animation lors du follow/raid/sub dynamique
    - Son lors du follow/raid/sub dynamique
  - Possibilité d'activer/désactiver les modules du backend
  - 
- Jeu Duel carte pokémon
  - Si un utilisateur entre la commande !duel @nom
  - Deux cartes pokémon apparaissent à l'écran avec : 
    - Photo de profile des viewers concernés
    - Types aléatoires
    - Attaques aléatoires (fonction du type)
    - PV Aléatoires
  - Un combat entre les deux cartes se fait
  - Le gagnant est inscrit dans le chat
  - 
