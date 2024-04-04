import { vChat } from "./chat";

let _vCmd = {
  init() {
    vChat.subscribeMessageHandler(onMessageHandler);
  },
  cmds: [] as Command[],
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

  // Custom commands
  _vCmd.cmds.forEach((c) => {
    if (msg.match(c.regex)) {
      if (
        c.permission === "moderator" &&
        !(context.mod || (context.badges && context.badges.broadcaster === "1"))
      )
        return;

      if (
        c.permission === "broadcaster" &&
        !(context.badges && context.badges.broadcaster === "1")
      )
        return;

      c.do(msg, context, self, target);
    }
  });
}

// Exports
export let vCmd = _vCmd;

interface Command {
  name: string;
  regex: RegExp;
  do: (msg: string, context: any, self: any, target: string) => void;
  permission: "viewer" | "moderator" | "broadcaster";
}
