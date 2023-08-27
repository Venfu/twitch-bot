import { vDataBase } from "../../db";

// WELCOME
export function welcomeViewer(userId: string, displayName: string): string {
  return `On accueille bien fort ${displayName} ! Bienvenu, installe toi et passe un bon moment :)`;
}

export function isViewerFirstMessage(userId: string): Promise<Boolean> {
  return vDataBase.welcomeViewer.isFirstMessage(userId).then((b) => {
    if (b) {
      vDataBase.welcomeViewer.storeFirstMessage(userId);
    }
    return b;
  });
}
