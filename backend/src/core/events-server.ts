import { WebSocket, WebSocketServer } from "ws";
import { EventToDisplay } from "../shared";

let _eventsServer = {
  wss: new WebSocketServer({ port: 3001 }),
  ws: [] as WebSocket[],
  events: [] as EventToDisplay[],
  TIMEOUT: 5000,
  init(): Promise<void> {
    setInterval(() => {
      console.log("events", _eventsServer.events.length);
      if (!_eventsServer.events.length || !_eventsServer.ws.length) return;
      const event = _eventsServer.events.shift();
      _eventsServer.ws.forEach((w: any) => {
        w.send(JSON.stringify(event));
      });
    }, _eventsServer.TIMEOUT);

    return new Promise((res, rej) => {
      _eventsServer.wss.on("connection", (ws) => {
        ws.on("error", console.error);
        _eventsServer.ws.push(ws);
      });
      res();
    });
  },
  pushEvent(event: EventToDisplay): void {
    this.events.push(event);
  },
};

export let vEventServer = _eventsServer;
