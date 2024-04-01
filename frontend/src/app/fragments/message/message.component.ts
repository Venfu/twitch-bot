import { Component } from '@angular/core';
import { EventToDisplay } from '@venfu-bot/shared';
import { EventsService } from '../../services/events.service';
import { FollowComponent } from './follow/follow.component';
import { RaidComponent } from './raid/raid.component';
import { SubComponent } from './sub/sub.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FollowComponent, RaidComponent, SubComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  message!: EventToDisplay;

  constructor(private evt: EventsService) {
    this.evt.eventsToDisplay$.subscribe((e: EventToDisplay) => {
      this.message = e;
      setTimeout(() => {
        this.message = { type: 'none' };
      }, e.timeout || 1000);
    });
  }
}
