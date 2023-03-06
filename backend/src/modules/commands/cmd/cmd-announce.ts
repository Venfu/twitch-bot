import { vQueue } from "../../queue";

// Announce
export function announce(msg: string, context: any): void {
  vQueue.enqueue({
    type: "announce",
    message: `${msg.substring(2)}`,
    from: context["display-name"],
    colors: context.color || "",
    timeout: 10000,
  });
}
