import { vTwitchEvent } from "../../../core/twitch-events";
import { displayRaidEvents, subscribeToRaidEvents } from "./raid";

let _vRaids = {
  init(): Promise<void> {
    return new Promise((res, rej) => {
      subscribeToRaidEvents(vTwitchEvent.sessionID);
      vTwitchEvent.notifications.push((json: any) => displayRaidEvents(json));
      res()
    });
  },
};

export let vRaids = _vRaids;
