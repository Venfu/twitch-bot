import { JsonDB, Config } from "node-json-db";
import path from "path";
import { vDatabaseFollowers } from "./db-followers";

export let vDataBase = {
  db: new JsonDB(
    new Config(path.join("..", "database", "db"), true, false, "/")
  ),

  /**
   * Delete existing database
   * @returns Promise<void>
   */
  initDb(): Promise<void> {
    return vDataBase.db.delete("/");
  },

  followers: vDatabaseFollowers,
};
