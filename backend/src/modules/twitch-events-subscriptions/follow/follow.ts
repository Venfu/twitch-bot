import request from "request";
import { environment } from "../../../environment/environment";
import { vOAuth } from "../../../core/auth";
import { vEventServer } from "../../../core/events-server";
import { vChat } from "../../../core/chat";
import { vDatabaseFollowers } from "./db-followers";
import { URL_EVENTS_SUBSCRIPTION } from "../../../core/twitch-events";

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
    console.log("Subscribe to Follow Events");
    return;
  });
}

export function displayFollowEvents(data: any) {
  if (data.metadata.subscription_type !== "channel.follow") return;
  vDatabaseFollowers.getFollowerById(data.payload.event.user_id).then((u) => {
    if (u) return; // if user exists in database
    // Send message to chat
    vChat.sendMessage(
      `Merci pour le follow ${data.payload.event.user_name} ❤️❤️❤️`
    );

    // Send notification

    vEventServer.pushEvent({
      type: "follow",
      from: data.payload.event.user_name,
      timeout: 10000,
    });

    // Add follower to database
    vDatabaseFollowers.addFollower({
      user_id: data.payload.event.user_id,
      user_login: data.payload.event.user_login,
      user_name: data.payload.event.user_name,
      followed_at: data.payload.event.followed_at,
    });
  });
}
