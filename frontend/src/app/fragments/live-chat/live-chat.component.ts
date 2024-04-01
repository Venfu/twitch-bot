import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChatMessage } from '@venfu-bot/shared';
import { LiveChatMessageComponent } from './live-chat-message/live-chat-message.component';

@Component({
  selector: 'app-live-chat',
  standalone: true,
  imports: [LiveChatMessageComponent],
  templateUrl: './live-chat.component.html',
  styleUrl: './live-chat.component.scss',
})
export class LiveChatComponent implements OnInit {
  ws = new WebSocket(environment.URL_WEBSOCKET_LIVE_CHAT);
  messages: ChatMessage[] = [];

  chat: any; // TEST A RETIRER

  constructor() {}

  ngOnInit(): void {
    this.ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      this.messages.push(m);
      this.chat = m;
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 200);
    };
  }

  // TODO: affichage de plusieurs messages à l'écran avec effets...
}
