import request from "request";
import { URL_EVENTS_SUBSCRIPTION } from ".";
import { environment } from "../../../environment/environment";
import { vOAuth } from "../../auth";
import { vTmi } from "../../commands";
import { vQueue } from "../../queue";

export function subscribeToRaidEvents(sessionId: string) {
  var postData = {
    type: "channel.raid",
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
    console.log("Subscribe to Raid Events", response.body);
    return;
  });
}

export function displayRaidEvents(data: any) {
  // Send message to chat
  vTmi.sendMessage(
    `Merci pour le raid ${data.payload.event.from_broadcaster_user_name} ❤️❤️❤️`
  );

  // Send notification
  vQueue.enqueue({
    type: "raid",
    from: data.payload.event.from_broadcaster_user_name,
    other: { nbViewers: data.payload.event.viewers },
  });
}
