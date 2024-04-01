import { vFollowers } from "./follow";
import { vRaids } from "./raid";
import { vSub } from "./subscribe";

let _vTwitchEventsSubscriptions = {
  vFollowers: vFollowers,
  vSub: vSub,
  vRaids: vRaids,
  async init(): Promise<void> {
    return new Promise(async (res, rej) => {
      // Init followers
      await vFollowers.init();
      console.log("Followers initialized");

      // Init raids
      await vRaids.init();
      console.log("Raids initialized");

      // Init Sub
      await vSub.init();
      console.log("Sub initialized");

      res();
    });
  },
};

export let vTwitchEventsSubscriptions = _vTwitchEventsSubscriptions;
