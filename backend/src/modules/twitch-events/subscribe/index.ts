import { vTwitchEvent } from "../../../core/twitch-events";
import { subscribeToSubEvents, displaySubEvents } from "./subscribe";

let _vSub = {
  init(): Promise<void> {
    return new Promise((res, rej) => {
      subscribeToSubEvents(vTwitchEvent.sessionID);
      vTwitchEvent.notifications.push((json: any) => displaySubEvents(json));
      res();
    });
  },
};

export let vSub = _vSub;
