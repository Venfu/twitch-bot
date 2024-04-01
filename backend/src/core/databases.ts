import { JsonDB, Config } from "node-json-db";
import path from "path";

export let vDataBase = {
  db: new JsonDB(
    new Config(path.join("..", "database", "db"), true, false, "/")
  ),
  persistantDb: new JsonDB(
    new Config(path.join("..", "database", "persistant-db"), true, false, "/")
  ),

  /**
   * Delete existing database
   * @returns Promise<void>
   */
  initDb(): Promise<void> {
    return vDataBase.db.delete("/");
  },
};
