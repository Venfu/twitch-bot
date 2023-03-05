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

### Start project for prod

TODO :

- environment.prod
- build project
- hosting Angular frontend in express server
- execute it with `node ./dist/app.js`

## Pre-require

- NodeJS installed in your computer
- Dev.Twitch account and application with these allowed redirect URL
  - http://localhost:3000/auth/twitch/callback
  - http://localhost:3000
- Copy /src/environment/environment.ts.tmpl, rename it into "environment.ts" and edit it

## Backlog (FR sorry bro): 

- 1er message de la journée d'une personne s'affiche sur le live avec une animation personnalisée
- Le 1er message du chat
- Lors d'un raid, jouer un clip aléatoire du gars qui raid. Afficher dans le chat ce qu'il fait (nom, dernier jeu, ... ?)
- Faire une base de donnée persistante :
  - Commandes personnalisée par utilisateurs
- Jeu (MAXIMOTS : https://www.funmeninges.com/maximots-mot.html) : 
  - Affiche des lettres
  - Les viewers doivent faire des mots avec
  - Dès qu'un mot est trouvé, il n'est plus trouvable par d'autres viewers
- 