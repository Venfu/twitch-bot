import { Component, Input } from '@angular/core';
import { ChatMessage } from '@venfu-bot/shared';
import { ColorizeDirective } from '../../../directives/colorize.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-chat-message',
  standalone: true,
  imports: [CommonModule, ColorizeDirective],
  templateUrl: './live-chat-message.component.html',
  styleUrl: './live-chat-message.component.scss'
})
export class LiveChatMessageComponent {
  @Input() set message(m: ChatMessage) {
    if (!m) return;
    this.displayTimestamp(m);
    this._userColor = m.userColor;
    this._userName = m.userName;
    this._msg = m.formatedMessage;
    this._userPicture = m.userPicture || `/assets/twitch/default-avatar.png`;
    this._badges = m.formatedBadges;
  }

  @Input() displayUser: boolean = true;

  _msg: string = '';
  _userName: string = '';
  _userPicture: string = '';
  _userColor: string = '';
  _badges: string[] = [];
  _time: string = '';

  displayTimestamp(m: ChatMessage) {
    const date = new Date(parseInt(m.timestamp, 10));
    this._time = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  }
}
