import express, { Application, Request, Response } from "express";
import { vOAuth } from "./modules/auth";
import { vDataBase } from "./modules/db";
import { vQueue } from "./modules/queue";

const app: Application = express();
const port: number = 3000;

// ENDPOINTS
app.get("/", (req: Request, res: Response) => {
  if (!vOAuth.oAuthInfo.access_token) {
    vOAuth.initOAuth(res);
  } else {
    res.send("connected");
    // res.redirect(environment.URL_FRONTEND);
  }
});

app.get("/auth/twitch/callback", (req: Request, res: Response) => {
  vOAuth.authCallback(`${req.query.code}`).then(() => {
    res.redirect("/");
  });
});

app.get("/events", (req: Request, res: Response) => {
  res.send(vQueue.dequeue() || {});
});

// START APP
vDataBase.initDb().then(() => {
  app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
  });
});
