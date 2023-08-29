import express, { Application, Request, Response } from "express";
import { vOAuth } from "./modules/auth";
import { vCmd } from "./modules/chat/commands";
import { vDataBase } from "./modules/db";
import { vEventServer } from "./modules/events-server";
import { vTwitchEvent } from "./modules/twitch-event";
import { StreamInformations } from "./shared";
import { vStreamInformations } from "./modules/stream-informations";
import { vLiveChat } from "./modules/chat/live-chat";
import { vChat } from "./modules/chat";

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

app.get("/auth/twitch/callback", (req: Request, res: Response) => {
  // oAuth connection
  vOAuth.authCallback(`${req.query.code}`).then(() => {
    // Tmi connection
    vChat.init().then((e) => {
      // Start WebSocket Server (LiveChat)
      vLiveChat.init();
      // Start Command listener
      vCmd.init();
    });
    // Subscribing to Twitch Events
    vTwitchEvent.init();
    // Start WebSocket Server (Events)
    vEventServer.init();
    //redirect user to frontend
    res.redirect("/");

    // Endpoints that require something
    app.get("/display/last-follower", (req: Request, res: Response) => {
      vDataBase.followers.getLastFollower().then((o) => {
        res.send(o);
      });
    });

    app.get("/stream-informations", (req: Request, res: Response) => {
      vStreamInformations.get().then((streamInfo: StreamInformations) => {
        res.send(streamInfo);
      });
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
