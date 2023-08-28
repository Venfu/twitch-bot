import { Client } from "tmi.js";
import { environment } from "../../environment/environment";
import { WebSocketServer, WebSocket } from "ws";
import { ChatMessage } from "../../shared";

let _vChat = {
  client: new Client({}),
  wss: new WebSocketServer({ port: 3002 }),
  ws: [] as WebSocket[],
  init(accessToken: string): Promise<boolean> {
    return new Promise((res, rej) => {
      _vChat.client = new Client({
        identity: {
          username: environment.BOT_USERNAME,
          password: `oauth:${accessToken}`,
        },
        channels: [environment.CHANNEL],
      });
      _vChat.client.on("message", onMessageHandler);
      _vChat.client.on("connected", (addr, port) => {
        console.log(`* Connected to ${addr}:${port} - LiveChat`);
        _vChat.wss.on("connection", (ws) => {
          ws.on("error", console.error);
          _vChat.ws.push(ws);
          res(true);
        });
      });
      _vChat.client.connect();
    });
  },
};

function onMessageHandler(target: any, context: any, msg: string, self: any) {
  formatChatMessage(context, msg).then((chatMessage: ChatMessage) => {
    _vChat.ws.forEach((w: any) => {
      w.send(JSON.stringify(chatMessage));
    });
  });
}

function formatChatMessage(context: any, msg: string): Promise<ChatMessage> {
  return new Promise((res, rej) => {
    res({
      message: msg,
      username: context["display-name"],
      userPicture: "null", // TODO
      userColor: context.color,
      emotes: context.emotes,
    });
  });
}

export let vChat = _vChat;
