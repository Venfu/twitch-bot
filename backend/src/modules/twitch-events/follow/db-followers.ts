import request from "request";
import { environment } from "../../../environment/environment";
import { vOAuth } from "../../../core/auth";
import { vDataBase } from "../../../core/databases";
import { Follower, FollowerInfo } from "../../../shared";

export let vDatabaseFollowers = {
  /**
   * Recursive function that get user's followers
   * @param cb callback function
   * @param pagination not set at 1st call
   */
  initFollowers(
    cb: (response: boolean) => void,
    pagination?: { cursor: string }
  ) {
    var cursor = pagination ? `&after=${pagination.cursor}` : "";
    request(
      {
        uri: `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${vOAuth.userInfo.id}${cursor}`,
        method: "GET",
        headers: {
          "Client-ID": environment.TWITCH_CLIENT_ID,
          Accept: "application/json",
          Authorization: "Bearer " + vOAuth.oAuthInfo.access_token,
        },
      },
      (err, response, data) => {
        data = JSON.parse(data);
        data.data.forEach((e: FollowerInfo) => {
          vDatabaseFollowers.addFollower(e);
        });
        if (data.pagination.cursor) {
          vDatabaseFollowers.initFollowers(cb, data.pagination);
        } else {
          // call callback function from vOAuth.authCallback Promise
          // to know when recursive function ends
          cb(true);
        }
      }
    );
  },
  /***
   * add follower to database
   * Follower is stored with key: from_name
   * @param follower follower object from twitch
   */
  addFollower(follower: FollowerInfo): Promise<void> {
    follower.followed_at = `${follower.followed_at}`;
    return vDataBase.db.push(`/followers/${follower.user_id}`, follower, false);
  },
  /**
   * Get follower by login
   * @param login
   * @returns
   */
  getFollowerById(id: string): Promise<FollowerInfo | undefined> {
    return new Promise((res, rej) => {
      vDataBase.db
        .exists(`/followers/${id}`)
        .then((followerExists: boolean) => {
          if (followerExists) {
            vDataBase.db
              .getData(`/followers/${id}`)
              .then((follower: FollowerInfo) => {
                res(follower);
              });
          } else {
            res(undefined);
          }
        });
    });
  },
  getLastFollower(): Promise<FollowerInfo> {
    return vDataBase.db.getData("/followers").then((followers: Follower) => {
      let lastFollower = Object.values(followers)[0];
      for (const [key, value] of Object.entries(followers)) {
        if (new Date(lastFollower.followed_at) < new Date(value.followed_at)) {
          lastFollower = value;
        }
      }
      return lastFollower;
    });
  },
};
