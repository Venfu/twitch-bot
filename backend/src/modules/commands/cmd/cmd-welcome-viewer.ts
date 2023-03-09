import { vDataBase } from "../../db";

// WELCOME
export function welcomeViewer(
  userId: string,
  displayName: string
): Promise<string> {
  return new Promise((res, rej) => {
    vDataBase.welcomeViewer.getUserWelcomeMessage(userId).then((m) => {
      if (m) {
        res(m);
      } else {
        res(
          `Bienvenue ${displayName} ! Lors de ton premier message sur le live, le bot peut te répondre un message que tu auras choisi. !bienvenue <message>`
        );
      }
    });
  });
}

export function isViewerFirstMessage(userId: string): Promise<Boolean> {
  return vDataBase.welcomeViewer.isFirstMessage(userId).then((b) => {
    if (b) {
      vDataBase.welcomeViewer.storeFirstMessage(userId);
    }
    return b;
  });
}

export function addWelcomeMessage(userId: string, message: string) {
  vDataBase.welcomeViewer.storeWelcomeMessage(userId, message);
}
