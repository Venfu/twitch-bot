import { vChat } from "../../core/chat";
import { vCmd } from "../../core/commands";
import { announce, ca, clip, cmd, hug, rollDice } from "./cmd";

let _vCustomCmd = {
  init() {
    // vChat.subscribeMessageHandler(onMessageHandler);
    vCmd.cmds.push({
      name: "List Cmd",
      regex: new RegExp(/^!cmd$/, "gim"),
      do: () => {
        vChat.sendMessage(cmd());
      },
      permission: "vewer",
    });

    vCmd.cmds.push({
      name: "Roll Dice",
      regex: new RegExp(/^!dé( [0-9]*)?$/, "gim"),
      do: (msg: string) => {
        vChat.sendMessage(rollDice(+msg.substring(4)));
      },
      permission: "vewer",
    });

    vCmd.cmds.push({
      name: "Hug",
      regex: new RegExp(/^\!hug( \@?[A-z1-9_]*)?$/, "gim"),
      do: (msg: string, context: any) => {
        vChat.sendMessage(hug(context["display-name"], msg.substring(5)));
      },
      permission: "vewer",
    });

    vCmd.cmds.push({
      name: "CA",
      regex: new RegExp(/^\!ca$/, "gim"),
      do: () => {
        vChat.sendMessage(ca());
      },
      permission: "vewer",
    });

    vCmd.cmds.push({
      name: "Clip",
      regex: new RegExp(/^\!clip( [0-9]{1,2})?$/, "gim"),
      do: (msg: string) => {
        clip(+msg.substring(6)).then((url) => {
          vChat.sendMessage(url);
        });
      },
      permission: "vewer",
    });

    vCmd.cmds.push({
      name: "Announce",
      regex: new RegExp(/^\!\!/, "gim"),
      do: (msg: string, context: any) => {
        announce(msg, context);
      },
      permission: "moderator",
    });
  },
};

// Exports
export let vCustomCmd = _vCustomCmd;
