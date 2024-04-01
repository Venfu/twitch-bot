import express, { Application, Request, Response } from "express";
import { vOAuth } from "./core/auth";
import { vDataBase } from "./core/databases";
import { vEventServer } from "./core/events-server";
import { vTwitchEvent } from "./core/twitch-events";
import { StreamInformations } from "./shared";
import { vStreamInformations } from "./core/stream-informations";
import { vLiveChat } from "./modules/live-chat";
import { vChat } from "./core/chat";
import { vWords } from "./modules/game-words";
import { vWelcomeViewer } from "./modules/welcome-viewer";
import { vCmd } from "./core/commands";
import { vCustomCmd } from "./modules/commands";
import { vTwitchEventsSubscriptions } from "./modules/twitch-events-subscriptions";

const app: Application = express();
const port: number = 3000;

// ENDPOINTS
app.get("/", (req: Request, res: Response) => {
  if (!vOAuth.oAuthInfo.access_token) {
    vOAuth.initOAuth(res);
  } else {
    res.send("");
    // res.redirect(environment.URL_FRONTEND);
  }
});

app.get("/auth/twitch/callback", async (req: Request, res: Response) => {
  // CORE
  // oAuth connection
  await vOAuth.authCallback(`${req.query.code}`);
  console.log("oAuth connected");

  // Tmi connection
  await vChat.init();
  console.log("Tmi connected");

  // Subscribing to Twitch Events
  await vTwitchEvent.init(); // TODO : Split events standalone
  console.log("Twitch Events connected");

  // Start WebSocket Server (Events)
  await vEventServer.init();
  console.log("Events Server conntected");

  // Start Command listener
  await vCmd.init();
  console.log("Command listener ready");

  // MODULES TODO : Dynamic
  // Start WebSocket Server (LiveChat)
  await vLiveChat.init();
  console.log("LiveChat ready");

  // Init Twitch Events Subscriptions
  await vTwitchEventsSubscriptions.init();
  console.log("Twitch Events Subscriptions ready");

  // Init Custom Commands
  await vCustomCmd.init();
  console.log("Custom Commands initialized");

  // Start Game Words listener
  await vWords.init();
  console.log("Game Words listener ready");

  // Start Welcome Viewer
  await vWelcomeViewer.init();
  console.log("Welcome Viewer ready");

  // Redirect user to frontend (TODO)
  res.redirect("/");

  // Endpoints that require something
  app.get("/display/last-follower", (req: Request, res: Response) => {
    vTwitchEventsSubscriptions.vFollowers.getLastFollower().then((o) => {
      res.send(o);
    });
  });

  app.get("/stream-informations", (req: Request, res: Response) => {
    vStreamInformations.get().then((streamInfo: StreamInformations) => {
      res.send(streamInfo);
    });
  });
});

app.get("/connected", (req: Request, res: Response) => {
  res.send({ connected: !!vOAuth.oAuthInfo.access_token });
});

// START APP
vDataBase.initDb().then(() => {
  app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
  });
});
