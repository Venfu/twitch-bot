import ws, { WebSocket } from "ws";

const URL_WEBSOCKET = "wss://eventsub.wss.twitch.tv/ws";

let _vTwitchEvent: any = {
  sessionId: "",
  notifications: [] as ((notify: any) => void)[],
  init(): Promise<void> {
    return new Promise((res, rej) => {
      if (_vTwitchEvent.sessionID) {
        return rej(new Error("WebSockets already initialized"));
      }

      const ws: ws = new WebSocket(URL_WEBSOCKET);

      ws.on("message", (data: string) => {
        const json: any = JSON.parse(data);
        if (json.metadata.message_type === "session_welcome") {
          const sId: string = json.payload.session.id;
          _vTwitchEvent.sessionID = sId;
          res();
        }

        if (json.metadata.message_type === "notification") {
          _vTwitchEvent.notifications.forEach((notify: (notify: any) => void) =>
            notify(json)
          );
        }
      });
    });
  },
};

export let vTwitchEvent = _vTwitchEvent;

export const URL_EVENTS_SUBSCRIPTION =
  "https://api.twitch.tv/helix/eventsub/subscriptions";
