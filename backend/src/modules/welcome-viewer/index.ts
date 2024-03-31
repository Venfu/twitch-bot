import { vChat } from "../../core/chat";
import { vCmd } from "../../core/commands";
import { isViewerFirstMessage, welcomeViewer } from "./cmd-welcome-viewer";
import { vDatabaseWelcomeViewer } from "./db-welcome-viewer";

let _vWelcomeViewer: any = {
  init: (): Promise<void> => {
    return new Promise((res, rej) => {
      vCmd.cmds.push({
        name: "welcomeViewer",
        do: (msg: string, context: any, self: any) => {
          if (self) return;
          isViewerFirstMessage(context["user-id"]).then((b) => {
            if (b) {
              vChat.sendMessage(
                welcomeViewer(context["user-id"], context["display-name"])
              );
            }
          });
        },
        permission: "vewer",
        regex: new RegExp(""),
      });
      vDatabaseWelcomeViewer.init().then(() => {
        res();
      });
    });
  },
};

export let vWelcomeViewer = _vWelcomeViewer;
