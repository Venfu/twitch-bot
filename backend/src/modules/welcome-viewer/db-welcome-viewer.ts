import { vDataBase } from "../../core/databases";

export let vDatabaseWelcomeViewer = {
  init: (): Promise<void> => {
    return new Promise((res, rej) => {
      vDataBase.persistantDb.exists("/welcomeViewer").then((r) => {
        if (!r) {
          vDataBase.persistantDb.push("/welcomeViewer", {}, false).then(() => {
            res();
          });
        } else {
          res();
        }
      });
    });
  },
  storeFirstMessage(user: string) {
    vDataBase.persistantDb.push(`/welcomeViewer/${user}`, null, false);
  },
  isFirstMessage(user: string): Promise<boolean> {
    return vDataBase.persistantDb.exists(`/welcomeViewer/${user}`).then((r) => {
      return !r;
    });
  },
};
