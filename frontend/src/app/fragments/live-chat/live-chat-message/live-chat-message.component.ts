import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../../../../../../shared/src';

@Component({
  selector: 'app-live-chat-message',
  templateUrl: './live-chat-message.component.html',
  styleUrls: ['./live-chat-message.component.scss'],
})
export class LiveChatMessageComponent implements OnInit {
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

  ngOnInit(): void {}

  displayTimestamp(m: ChatMessage) {
    const date = new Date(parseInt(m.timestamp, 10));
    this._time = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  }
}
