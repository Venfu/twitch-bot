import fs from "fs";

if (!fs.existsSync("./config.json")) {
  throw new Error("config.json not found");
}

export let environment = JSON.parse(fs.readFileSync("./config.json", "utf8"));
