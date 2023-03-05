import request from "request";
import { environment } from "../../environment/environment";
import { vOAuth } from "../auth";
import { vDataBase } from ".";

export let vDatabaseFollowers = {
    
  /**
   * Recursive function that get user's followers
   * @param cb callback from vOAuth.authCallback Promise
   * @param pagination not set at 1st call
   */
  initFollowers(
    cb: (response: boolean) => void,
    pagination?: { cursor: string }
  ) {
    var cursor = pagination ? `&after=${pagination.cursor}` : "";
    request(
      {
        uri: `https://api.twitch.tv/helix/users/follows?to_id=${vOAuth.userInfo.id}${cursor}`,
        method: "GET",
        headers: {
          "Client-ID": environment.TWITCH_CLIENT_ID,
          Accept: "application/json",
          Authorization: "Bearer " + vOAuth.oAuthInfo.access_token,
        },
      },
      (err, response, data) => {
        data = JSON.parse(data);
        data.data.forEach((e: any) => {
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
  addFollower(follower: any): Promise<any> {
    follower.followed_at = `${follower.followed_at}`;
    return vDataBase.db.push(
      `/followers/${follower.from_id}`,
      follower,
      false
    );
  },
  /**
   * Get follower by login
   * @param login
   * @returns
   */
  getFollowerById(id: string): Promise<any> {
    return new Promise((res, rej) => {
      vDataBase.db.exists(`/followers/${id}`).then((followerExists) => {
        if (followerExists) {
          vDataBase.db.getData(`/followers/${id}`).then((follower) => {
            res(follower);
          });
        } else {
          res(undefined);
        }
      });
    });
  },
}