import {
  announce,
  ca,
  clip,
  cmd,
  hug,
  isViewerFirstMessage,
  rollDice,
  welcomeViewer,
} from "./cmd";
import { vChat } from "..";
import { vWords } from "../game-words";

let _vCmd = {
  init() {
    vChat.subscribeMessageHandler(onMessageHandler);
  },
};

// Functions
function onMessageHandler(
  target: string,
  context: any,
  msg: string,
  self: any
): void {
  if (self) return; // Ignore bot's messages
  msg = msg.trim();

  isViewerFirstMessage(context["user-id"]).then((b) => {
    if (b) {
      vChat.client.say(
        target,
        welcomeViewer(context["user-id"], context["display-name"])
      );
    }
  });

  // !cmd = list commands
  if (msg === "!cmd") {
    vChat.client.say(target, cmd());
  }

  // !dé <number> = roll dice
  if (msg.match(/^\!dé( [0-9]*)?$/gim)) {
    vChat.client.say(target, rollDice(+msg.substring(4)));
  }

  // !hug @someone = send hug to someone
  if (msg.match(/^\!hug( \@?[A-z1-9_]*)?$/gim)) {
    vChat.client.say(target, hug(context["display-name"], msg.substring(5)));
  }

  // !ca = send Switch Friends Code
  if (msg === "!ca") {
    vChat.client.say(target, ca());
  }

  // !clip = capture clip and send url_edit
  if (msg.match(/^!clip( [0-9]{1,2})?/gim)) {
    clip(+msg.substring(6)).then((url) => {
      vChat.client.say(target, url);
    });
  }

  if (context.mod || (context.badges && context.badges.broadcaster === "1")) {
    // Moderator commands
    // !!! : send announce to queue
    if (msg.match(/^\!\!/gim)) {
      announce(msg, context);
    }
    if (msg.match(/^\!words start( [0-9]{1,2})?$/gim)) {
      if (!vWords.active) vWords.start(parseInt(msg.substring(13)));
    }
  }
}

// Exports
export let vCmd = _vCmd;
