import express, { Application, Request, Response } from "express";
import { environment } from "./environment/environment";
import { vOAuth } from "./modules/auth";
import { vTmi } from "./modules/commands";
import { vDataBase } from "./modules/db";
import { vQueue } from "./modules/queue";
import { vTwitchEvent } from "./modules/twitch-event";

const app: Application = express();
const port: number = 3000;

// ENDPOINTS
app.get("/", (req: Request, res: Response) => {
  if (!vOAuth.oAuthInfo.access_token) {
    vOAuth.initOAuth(res);
  } else {
    res.redirect(environment.URL_FRONTEND);
  }
});

app.get("/auth/twitch/callback", (req: Request, res: Response) => {
  vOAuth.authCallback(`${req.query.code}`).then(() => {
    // Connecting to Twitch Chat
    vTmi.init(vOAuth.oAuthInfo.access_token);
    // subscribing to Twitch Events
    vTwitchEvent.init();
    //redirect user to frontend
    res.redirect("/");
  });
});

app.get("/events", (req: Request, res: Response) => {
  res.send(vQueue.dequeue() || {});
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
