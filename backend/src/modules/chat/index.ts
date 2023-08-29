import { Client } from "tmi.js";
import { vOAuth } from "../auth";

let _vChat = {
  client: new Client({}),
  subscriptionMessageHandler: new Array<any>(),
  init(): Promise<boolean> {
    return new Promise((res, rej) => {
      _vChat.client = new Client({
        identity: {
          username: vOAuth.userInfo.display_name,
          password: `oauth:${vOAuth.oAuthInfo.access_token}`,
        },
        channels: [vOAuth.userInfo.login],
      });
      _vChat.client.on("connected", (addr, port) => {
        console.log(`* Connected to ${addr}:${port}`);
        res(true);
      });
      _vChat.client.on("message", onMessageHandler);
      _vChat.client.connect();
    });
  },
  sendMessage(message: string): void {
    _vChat.client.say(`#${vOAuth.userInfo.login}`, message);
  },
  subscribeMessageHandler(v: any): void {
    _vChat.subscriptionMessageHandler.push(v);
  },
};

function onMessageHandler(target: any, context: any, msg: string, self: any) {
  _vChat.subscriptionMessageHandler.forEach((v) => {
    v(target, context, msg, self);
  });
}

export let vChat = _vChat;
