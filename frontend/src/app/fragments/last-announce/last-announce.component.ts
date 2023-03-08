import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { EventToDisplay } from '../../../../../shared/src';

@Component({
  selector: 'app-last-announce',
  templateUrl: './last-announce.component.html',
  styleUrls: ['./last-announce.component.scss'],
})
export class LastAnnounceComponent implements OnInit {
  lastAnnounce: EventToDisplay = { type: '' };
  constructor(private eventsService: EventsService) {}
  ngOnInit(): void {
    this.eventsService.eventsToDisplay$.subscribe((e: EventToDisplay) => {
      if (e.type === 'announce') this.lastAnnounce = e;
    });
  }
}
