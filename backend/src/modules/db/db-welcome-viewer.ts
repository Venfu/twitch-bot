import { vDataBase } from ".";

export let vDatabaseWelcomeViewer = {
  storeFirstMessage(user: string) {
    vDataBase.db.push(`/welcomeViewer/${user}`, null, false);
  },
  isFirstMessage(user: string): Promise<boolean> {
    return vDataBase.db.exists(`/welcomeViewer/${user}`).then((r) => {
      return !r;
    });
  },
  storeWelcomeMessage(user: string, message: string) {
    vDataBase.persistantDb.push(`/welcomeMessage/${user}`, message, false);
  },
  getUserWelcomeMessage(user: string): Promise<string> {
    return new Promise((res, rej) => {
      return vDataBase.persistantDb
        .exists(`/welcomeMessage/${user}`)
        .then((isWM) => {
          if (isWM) {
            vDataBase.persistantDb
              .getData(`/welcomeMessage/${user}`)
              .then((m) => {
                res(m);
              });
          } else {
            res("");
          }
        });
    });
  },
};
