import request from "request";
import { environment } from "../environment/environment";
import { vOAuth } from "./auth";
import { StreamInformations } from "../shared";

const URL_API_GET_STREAM = "https://api.twitch.tv/helix/streams";

let _vStreamInformations = {
  get(): Promise<StreamInformations> {
    return new Promise((res, rej) => {
      request.get(
        {
          url: `${URL_API_GET_STREAM}?user_id=${vOAuth.userInfo.id}`,
          method: "GET",
          headers: {
            "Client-ID": environment.TWITCH_CLIENT_ID,
            Accept: "application/vnd.twitchtv.v5+json",
            Authorization: "Bearer " + vOAuth.oAuthInfo.access_token,
          },
        },
        (error, response, data) => {
          if (response && response.statusCode == 200) {
            res(JSON.parse(data).data[0]);
          } else {
            rej(JSON.parse(data));
          }
        }
      );
    });
  },
};

export let vStreamInformations = _vStreamInformations;
