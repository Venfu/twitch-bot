import { environment } from "../../environment/environment";
import { Response } from "express";
import { vDataBase } from "../db";
import request from "request";

const URL_TWITCH_AUTHORIZE = "https://id.twitch.tv/oauth2/authorize";
const URL_TWITCH_TOKEN = "https://id.twitch.tv/oauth2/token";
const URL_CALLBACK = `${environment.URL_CALLBACK_BASE}/auth/twitch/callback`;

export let vOAuth = {
  oAuthInfo: {
    access_token: "",
    expires_in: 0,
    refresh_token: "",
    scope: [],
    token_type: "",
  },

  userInfo: {
    id: "",
    login: "",
    display_name: "",
    type: "",
    broadcaster_type: "",
    description: "",
    profile_image_url: "",
    offline_image_url: "",
    view_count: 0,
    email: "",
    created_at: "",
  },

  /**
   * Redirect user to Twitch IDP
   * @param res
   */
  initOAuth(res: Response): void {
    const url = `${URL_TWITCH_AUTHORIZE}?response_type=code&client_id=${
      environment.TWITCH_CLIENT_ID
    }&redirect_uri=${URL_CALLBACK}&scope=${encodeURI(
      "user_read chat:read chat:edit moderator:read:followers clips:edit"
    )}`;
    res.redirect(url);
  },

  /**
   * Get AccessToken, RefreshToken -
   * store user's data into database -
   * store user's followers into database -
   * connect to user's Twitch chat
   * @param code code given by IDP
   * @returns
   */
  authCallback(code: string): Promise<boolean> {
    return new Promise((res, rej) => {
      request.post(
        {
          uri: URL_TWITCH_TOKEN,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encodeURI(
            `client_id=${environment.TWITCH_CLIENT_ID}&client_secret=${environment.TWITCH_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${environment.URL_CALLBACK_BASE}`
          ),
        },
        (err, req, data) => {
          if (err) {
            rej(err);
            return;
          }
          data = JSON.parse(data);
          vOAuth.oAuthInfo = data;

          // setup fresh token
          vOAuth.refreshTokenRecursive(data);

          vOAuth.getUserInfo().then((u) => {
            vOAuth.userInfo = u.data[0];
            vDataBase.db.push("/self", vOAuth.userInfo);
            vDataBase.followers.initFollowers(res);
          });
        }
      );
    });
  },

  /**
   * Get User Informations from Twitch API
   * @returns Promise
   */
  getUserInfo(): Promise<any> {
    return new Promise((res, rej) => {
      request.get(
        {
          url: "https://api.twitch.tv/helix/users",
          method: "GET",
          headers: {
            "Client-ID": environment.TWITCH_CLIENT_ID,
            Accept: "application/vnd.twitchtv.v5+json",
            Authorization: "Bearer " + vOAuth.oAuthInfo.access_token,
          },
        },
        (error, response, data) => {
          if (response && response.statusCode == 200) {
            res(JSON.parse(data));
          } else {
            rej(JSON.parse(data));
          }
        }
      );
    });
  },

  /**
   * Refresh accessToken
   * @param tokenInfo
   * @returns
   */
  refreshToken(tokenInfo: any): Promise<any> {
    return new Promise((res, rej) => {
      request.post(
        {
          uri: URL_TWITCH_TOKEN,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encodeURI(
            `client_id=${environment.TWITCH_CLIENT_ID}&client_secret=${environment.TWITCH_SECRET}&grant_type=refresh_token&refresh_token=${tokenInfo.refresh_token}`
          ),
        },
        (err, req, data) => {
          if (err) {
            rej(err);
            return;
          }
          data = JSON.parse(data);
          vOAuth.oAuthInfo = data;
          res(data);
        }
      );
    });
  },

  /**
   * Recursively call RefreshToken function
   * after 75% expires_in time elapsed
   * @param o
   */
  refreshTokenRecursive(o: any): void {
    setTimeout(() => {
      vOAuth.refreshToken(o).then((p) => {
        vOAuth.refreshTokenRecursive(p);
      });
    }, o.expires_in * 0.75 * 1000);
  },
};
