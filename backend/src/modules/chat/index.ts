import { Client } from "tmi.js";
import { environment } from "../../environment/environment";
import { WebSocketServer, WebSocket } from "ws";
import { ChatMessage } from "../../shared";
import request from "request";
import { vOAuth } from "../auth";

const URL_API_EMOTE: string = "https://static-cdn.jtvnw.net/emoticons/v2/";
const URL_API_USER: string = "https://api.twitch.tv/helix/users";
const URL_API_BADGES_GLOBAL: string =
  "https://api.twitch.tv/helix/chat/badges/global";
const URL_API_BADGES_CHANNEL: string =
  "https://api.twitch.tv/helix/chat/badges?broadcaster_id=";

let _vChat = {
  client: new Client({}),
  wss: new WebSocketServer({ port: 3002 }),
  ws: [] as WebSocket[],
  badges: [],
  init(accessToken: string): Promise<boolean> {
    initBadgesCache();
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
  if (context["message-type"] !== "chat") return;
  formatChatMessage(context, msg).then((chatMessage: ChatMessage) => {
    _vChat.ws.forEach((w: any) => {
      w.send(JSON.stringify(chatMessage));
    });
  });
}

function formatChatMessage(context: any, msg: string): Promise<ChatMessage> {
  return new Promise((res, rej) => {
    let promises: Promise<any>[] = [];
    let newMsg: string = msg;
    let userPicture: string = "";
    newMsg = newMsg.replace(new RegExp("<", "g"), "&lt;");
    newMsg = newMsg.replace(new RegExp(">", "g"), "&gt;");

    // GET USER PICTURE
    promises.push(
      new Promise((res, rej) => {
        request.get(
          {
            url: `${URL_API_USER}?id=${context["user-id"]}`,
            method: "GET",
            headers: {
              "Client-ID": environment.TWITCH_CLIENT_ID,
              Authorization: "Bearer " + vOAuth.oAuthInfo.access_token,
            },
          },
          (error, response, data) => {
            if (response && response.statusCode == 200) {
              userPicture = JSON.parse(data).data[0]["profile_image_url"];
              res(JSON.parse(data).data[0]);
            } else {
              rej(JSON.parse(data));
            }
          }
        );
      })
    );

    // GET EMOTES
    if (context.emotes) {
      for (const emoteId in context.emotes) {
        promises.push(
          new Promise((res, rej) => {
            request.get(
              {
                url: `${URL_API_EMOTE}${emoteId}/animated/light/1.0`,
                method: "GET",
                headers: {
                  "Client-ID": environment.TWITCH_CLIENT_ID,
                  Authorization: "Bearer " + vOAuth.oAuthInfo.access_token,
                },
              },
              (error, response, data) => {
                let imgEmote = "";
                if (response && response.statusCode == 200) {
                  imgEmote = `<img src="https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/animated/light/1.0">`;
                } else {
                  imgEmote = `<img src="https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/static/light/1.0">`;
                }
                context.emotes[emoteId].forEach((o: string) => {
                  const [start, end] = o.split("-");
                  const textEmote = msg.substring(
                    parseInt(start, 10),
                    parseInt(end, 10) + 1
                  );
                  newMsg = newMsg.split(textEmote).join(imgEmote);
                });
                res(true);
              }
            );
          })
        );
      }
    }

    // GET USER BADGE

    Promise.all(promises).then((responses) => {
      res({
        formatedMessage: newMsg,
        message: msg,
        userName: context["display-name"],
        userPicture: userPicture,
        userColor: context.color,
        emotes: context.emotes,
        badges: context.badges,
        formatedBadges: getBadges(context.badges),
        timestamp: context["tmi-sent-ts"],
      });
    });
  });
}

function getBadges(badges: any): string {
  if (!badges) return "";
  let formatedBadges = "";
  for (const badge in badges) {
    let bTmp: any = _vChat.badges.find((b: any) => b["set_id"] === badge);
    bTmp = bTmp?.versions.find((b: any) => b.id === badges[badge]);
    formatedBadges += `<img src="${bTmp?.image_url_1x}">`;
  }
  return formatedBadges;
}

function initBadgesCache(): Promise<any> {
  return Promise.all([
    new Promise((res, rej) => {
      request.get(
        {
          url: `${URL_API_BADGES_GLOBAL}`,
          method: "GET",
          headers: {
            "Client-ID": environment.TWITCH_CLIENT_ID,
            Authorization: "Bearer " + vOAuth.oAuthInfo.access_token,
          },
        },
        (error, response, data) => {
          if (response && response.statusCode == 200) {
            _vChat.badges.push(...(JSON.parse(data).data as []));
            res(JSON.parse(data).data);
          } else {
            rej(JSON.parse(data));
          }
        }
      );
    }),
    new Promise((res, rej) => {
      request.get(
        {
          url: `${URL_API_BADGES_CHANNEL}${vOAuth.userInfo.id}`,
          method: "GET",
          headers: {
            "Client-ID": environment.TWITCH_CLIENT_ID,
            Authorization: "Bearer " + vOAuth.oAuthInfo.access_token,
          },
        },
        (error, response, data) => {
          if (response && response.statusCode == 200) {
            _vChat.badges.push(...(JSON.parse(data).data as []));
            res(JSON.parse(data).data);
          } else {
            rej(JSON.parse(data));
          }
        }
      );
    }),
  ]);
}

export let vChat = _vChat;
