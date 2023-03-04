import ws, { WebSocket } from "ws";
import {
  displayFollowEvents,
  displayRaidEvents,
  displaySubscribeEvents,
  subscribeToFollowEvents,
  subscribeToRaidEvents,
  subscribeToSubscribeEvents,
} from "./twitch-event-types";

const URL_WEBSOCKET = "wss://eventsub-beta.wss.twitch.tv/ws";

let _vTwitchEvent: any = {
  sessionId: "",
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
          // Init subscriptions to Events
          subscribeToFollowEvents(sId);
          subscribeToRaidEvents(sId);
          subscribeToSubscribeEvents(sId);
          res();
        }
        
        if (json.metadata.message_type === "notification") {
          if (json.metadata.subscription_type === "channel.raid") {
            displayRaidEvents(json);
          }
          if (json.metadata.subscription_type === "channel.follow") {
            displayFollowEvents(json);
          }
          if (json.metadata.subscription_type === "channel.subscribe") {
            displaySubscribeEvents(json);
          }
        }
      });
    });
  },
};

export let vTwitchEvent = _vTwitchEvent;
