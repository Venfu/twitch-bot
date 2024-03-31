import request from "request";
import { vOAuth } from "../../../core/auth";
import { environment } from "../../../environment/environment";

// Clip
export function clip(sec: number): Promise<string> {
  return new Promise((res, rej) => {
    request(
      {
        uri: `https://api.twitch.tv/helix/clips?broadcaster_id=${vOAuth.userInfo.id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + vOAuth.oAuthInfo.access_token,
          "Client-ID": environment.TWITCH_CLIENT_ID,
        },
      },
      (err, resp, data) => {
        if (err) console.log("Erreur création Clip");
        else {
          data = JSON.parse(data);
          if (data.status && data.status === 404) return;
          res(data.data[0].edit_url);
        }
      }
    );
  });
}
