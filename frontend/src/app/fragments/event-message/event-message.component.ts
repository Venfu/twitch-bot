import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { EventToDisplay } from 'src/shared';

@Component({
  selector: 'app-event-message',
  templateUrl: './event-message.component.html',
  styleUrls: ['./event-message.component.scss'],
})
export class EventMessageComponent implements OnInit {
  constructor(private eventsService: EventsService) {}

  event: EventToDisplay = { type: '' };
  message: { [key: string]: boolean } = {
    announce: false,
    follow: false,
    raid: false,
  };

  ngOnInit(): void {
    this.eventsService.eventsToDisplay$.subscribe((e: EventToDisplay) => {
      if (!e.timeout) return;
      this.event = e;
      this.message[e.type] = true;
      setTimeout(() => {
        this.message[e.type] = false;
      }, e.timeout);
    });
  }
}
