import { vDatabaseWelcomeViewer } from "./db-welcome-viewer";

// WELCOME
export function welcomeViewer(userId: string, displayName: string): string {
  return `On accueille bien fort ${displayName} ! Bienvenue, installe toi et passe un bon moment :)`;
}

export function isViewerFirstMessage(userId: string): Promise<Boolean> {
  return vDatabaseWelcomeViewer.isFirstMessage(userId).then((b) => {
    if (b) {
      vDatabaseWelcomeViewer.storeFirstMessage(userId);
    }
    return b;
  });
}
