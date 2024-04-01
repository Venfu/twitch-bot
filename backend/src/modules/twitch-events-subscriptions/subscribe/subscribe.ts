import request from "request";
import { environment } from "../../../environment/environment";
import { vOAuth } from "../../../core/auth";
import { vEventServer } from "../../../core/events-server";
import { vChat } from "../../../core/chat";
import { URL_EVENTS_SUBSCRIPTION } from "../../../core/twitch-events";

export function subscribeToSubEvents(sessionId: string) {
  var postData = {
    type: "channel.subscribe",
    version: "1",
    condition: {
      to_broadcaster_user_id: vOAuth.userInfo.id,
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
    console.log("Subscribe to Sub Events");
    return;
  });
}

export function displaySubEvents(data: any) {
  if (data.metadata.subscription_type !== "channel.subscribe") return;
  // Send message to chat
  vChat.sendMessage(
    `Merci pour le sub ${data.payload.event.from_broadcaster_user_name} ❤️❤️❤️`
  );

  // Send notification
  vEventServer.pushEvent({
    type: "subscribe",
    from: data.payload.event.from_broadcaster_user_name,
    timeout: 10000,
  });
}
