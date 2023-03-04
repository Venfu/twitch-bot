import { Client } from "tmi.js";
import { environment } from "../../environment/environment";
import { announce, ca, clip, cmd, hug, rollDice } from "./cmd";

let _vTmi = {
  client: new Client({}),
  init(accessToken: string): Promise<boolean> {
    return new Promise((res, rej) => {
      _vTmi.client = new Client({
        identity: {
          username: environment.BOT_USERNAME,
          password: `oauth:${accessToken}`,
        },
        channels: [environment.CHANNEL],
      });
      _vTmi.client.on("message", onMessageHandler);
      _vTmi.client.on("connected", (addr, port) => {
        console.log(`* Connected to ${addr}:${port}`);
        res(true);
      });
      _vTmi.client.connect();
    });
  },
  sendMessage(message: string): void {
    _vTmi.client.say(`#${environment.CHANNEL}`, message);
  },
};

// Functions
function onMessageHandler(target: any, context: any, msg: string, self: any) {
  if (self) return; // Ignore bot's messages
  msg = msg.trim();

  // !cmd = list commands
  if (msg === "!cmd") {
    _vTmi.client.say(target, cmd());
  }

  // !dé <number> = roll dice
  if (msg.match(/^\!dé( [0-9]*)?$/gim)) {
    _vTmi.client.say(target, rollDice(+msg.substring(4)));
  }

  // !hug @someone = send hug to someone
  if (msg.match(/^\!hug( \@?[A-z1-9_]*)?$/gim)) {
    _vTmi.client.say(target, hug(context["display-name"], msg.substring(5)));
  }

  // !ca = send Switch Friends Code
  if (msg === "!ca") {
    _vTmi.client.say(target, ca());
  }

  // !clip = capture clip and send url_edit
  if (msg.match(/^!clip( [0-9]{1,2})?/gim)) {
    clip(+msg.substring(6)).then((url) => {
      _vTmi.client.say(target, url);
    });
  }

  // Moderator commands
  if (context.mod || (context.badges && context.badges.broadcaster === "1")) {
    // !!! : send announce to queue
    if (msg.match(/^\!\!/gim)) {
      announce(msg, context);
    }
  }
}

// Exports
export let vTmi = _vTmi;
