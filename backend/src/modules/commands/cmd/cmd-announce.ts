import { vQueue } from "../../queue";

// Announce
export function announce(msg: string, context: any): void {
  vQueue.enqueue({
    type: "announce",
    message: `🔔🔔 Annonce de ${context["display-name"]} : ${msg.substring(
      2
    )} 🔔🔔`,
    from: context["display-name"],
    colors: context.color || "",
  });
}
