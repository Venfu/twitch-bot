import { WebSocket, WebSocketServer } from "ws";
import { EventToDisplay } from "@venfu-bot/shared";

const DEFAULT_TIMEOUT = 1000;

let _eventsServer = {
  wss: new WebSocketServer({ port: 3001 }),
  ws: [] as WebSocket[],
  events: [] as EventToDisplay[],
  TIMEOUT: 1000,
  init(): Promise<void> {
    _eventsServer.sendEventsToClient();
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
  sendEventsToClient(): void {
    setTimeout(() => {
      const event = _eventsServer.events.shift();
      _eventsServer.TIMEOUT = event?.timeout || DEFAULT_TIMEOUT;
      _eventsServer.sendEventsToClient();
      if (!event || !_eventsServer.ws.length) return;
      _eventsServer.ws.forEach((w: any) => {
        w.send(JSON.stringify(event));
      });
    }, _eventsServer.TIMEOUT);
  },
};

export let vEventServer = _eventsServer;
