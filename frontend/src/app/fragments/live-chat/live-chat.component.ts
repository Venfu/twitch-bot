import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ChatMessage } from 'src/shared';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
})
export class LiveChatComponent implements OnInit {
  ws = new WebSocket(environment.URL_WEBSOCKET_LIVE_CHAT);
  message: ChatMessage | undefined;

  chat: any; // TEST A RETIRER

  constructor() {}

  ngOnInit(): void {
    this.ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      this.chat = m;
    };
  }

  // TODO: affichage de plusieurs messages à l'écran avec effets...
}