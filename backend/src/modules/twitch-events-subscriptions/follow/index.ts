import { vTwitchEvent } from "../../../core/twitch-events";
import { FollowerInfo } from "@venfu-bot/shared";
import { vDatabaseFollowers } from "./db-followers";
import { displayFollowEvents, subscribeToFollowEvents } from "./event-follow";

let _vFollowers = {
  init(): Promise<boolean> {
    return new Promise((res, rej) => {
      subscribeToFollowEvents(vTwitchEvent.sessionID);
      vTwitchEvent.notifications.push((json: any) => displayFollowEvents(json));
      vDatabaseFollowers.initFollowers(res);
    });
  },
  getLastFollower(): Promise<FollowerInfo> {
    return vDatabaseFollowers.getLastFollower();
  },
};

export let vFollowers = _vFollowers;
