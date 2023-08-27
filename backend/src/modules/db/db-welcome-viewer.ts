import { vDataBase } from ".";

export let vDatabaseWelcomeViewer = {
  storeFirstMessage(user: string) {
    vDataBase.persistantDb.push(`/welcomeViewer/${user}`, null, false);
  },
  isFirstMessage(user: string): Promise<boolean> {
    return vDataBase.persistantDb.exists(`/welcomeViewer/${user}`).then((r) => {
      return !r;
    });
  },
};
