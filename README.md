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
