import { Client } from "tmi.js";
import { environment } from "../../environment/environment";
import { vOAuth } from "../auth";
import { vCmd } from "./commands";
import { vLiveChat } from "./live-chat";

let _vChat = {
  client: new Client({}),
  init(): Promise<boolean> {
    return new Promise((res, rej) => {
      _vChat.client = new Client({
        identity: {
          username: environment.BOT_USERNAME,
          password: `oauth:${vOAuth.oAuthInfo.access_token}`,
        },
        channels: [environment.CHANNEL],
      });
      _vChat.client.on("connected", (addr, port) => {
        console.log(`* Connected to ${addr}:${port}`);
        res(true);
      });
      vChat.client.on("message", onMessageHandler);
      _vChat.client.connect();
    });
  },
  sendMessage(message: string): void {
    vChat.client.say(`#${environment.CHANNEL}`, message);
  },
};

function onMessageHandler(target: any, context: any, msg: string, self: any) {
  vCmd.onMessageHandler(target, context, msg, self);
  vLiveChat.onMessageHandler(target, context, msg, self);
}

export let vChat = _vChat;
