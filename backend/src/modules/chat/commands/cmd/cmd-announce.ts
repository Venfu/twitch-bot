import { vEventServer } from "../../../events-server";

// Announce
export function announce(msg: string, context: any): void {
  vEventServer.pushEvent({
    type: "announce",
    message: `${msg.substring(2)}`,
    from: context["display-name"],
    color: context.color || "",
    timeout: 10000,
  });
}
