import { WebSocket, WebSocketServer } from "ws";
import { EventToDisplay } from "../shared";

let _eventsServer = {
  wss: new WebSocketServer({ port: 3001 }),
  ws: [] as WebSocket[],
  init(): Promise<void> {
    return new Promise((res, rej) => {
      _eventsServer.wss.on("connection", (ws) => {
        ws.on("error", console.error);
        _eventsServer.ws.push(ws);
      });
      res();
    });
  },
  pushEvent(event: EventToDisplay): Promise<void> {
    return new Promise((res, rej) => {
      _eventsServer.ws.forEach((w: any) => {
        w.send(JSON.stringify(event));
        res();
      });
    });
  },
};

export let vEventServer = _eventsServer;
