import express, { Application, Request, Response } from "express";
import { vOAuth } from "./modules/auth";
import { vTmi } from "./modules/commands";
import { vDataBase } from "./modules/db";
import { vEventServer } from "./modules/events-server";
import { vTwitchEvent } from "./modules/twitch-event";
import { StreamInformations } from "./shared";
import { vStreamInformations } from "./modules/stream-informations";

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
  vOAuth.authCallback(`${req.query.code}`).then(() => {
    // Connecting to Twitch Chat
    vTmi.init(vOAuth.oAuthInfo.access_token);
    // Subscribing to Twitch Events
    vTwitchEvent.init();
    // Init events server (websocket)
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
        res.send(streamInfo)
      })
    })
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
