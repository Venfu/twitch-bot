import request from "request";
import { URL_EVENTS_SUBSCRIPTION } from ".";
import { environment } from "../../../environment/environment";
import { vOAuth } from "../../auth";
import { vTmi } from "../../commands";
import { vDataBase } from "../../db";
import { vEventServer } from "../../events-server";

export function subscribeToFollowEvents(sessionId: string) {
  var postData = {
    type: "channel.follow",
    version: "2",
    condition: {
      broadcaster_user_id: vOAuth.userInfo.id,
      moderator_user_id: vOAuth.userInfo.id,
    },
    transport: {
      method: "websocket",
      session_id: sessionId,
    },
  };
  var clientServerOptions = {
    uri: URL_EVENTS_SUBSCRIPTION,
    body: JSON.stringify(postData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${vOAuth.oAuthInfo.access_token}`,
      "Client-Id": environment.TWITCH_CLIENT_ID,
    },
  };
  request(clientServerOptions, function (error, response) {
    console.log("Subscribe to Follow Events", response.body);
    return;
  });
}

export function displayFollowEvents(data: any) {
  vDataBase.followers
    .getFollowerById(data.payload.event.user_id)
    .then((u) => {
      if (u) return; // if user exists in database
      // Send message to chat
      vTmi.sendMessage(
        `Merci pour le follow ${data.payload.event.user_name} ❤️❤️❤️`
      );

      // Send notification
      
      vEventServer.pushEvent({
        type: "follow",
        from: data.payload.event.user_name,
        timeout: 10000
      });

      // Add follower to database
      vDataBase.followers.addFollower({
        from_id: data.payload.event.user_id,
        from_login: data.payload.event.user_login,
        from_name: data.payload.event.user_name,
        to_id: data.payload.event.broadcaster_user_id,
        to_login: data.payload.event.broadcaster_user_login,
        to_name: data.payload.event.broadcaster_user_name,
        followed_at: data.payload.event.followed_at,
      });
    });
}
