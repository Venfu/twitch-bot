import { Component } from '@angular/core';
import { EventToDisplay } from '@venfu-bot/shared';
import { EventsService } from '../../services/events.service';
import { ColorizeDirective } from '../../directives/colorize.directive';

@Component({
  selector: 'app-last-announce',
  standalone: true,
  imports: [ColorizeDirective],
  templateUrl: './last-announce.component.html',
  styleUrl: './last-announce.component.scss',
})
export class LastAnnounceComponent {
  announce!: EventToDisplay;

  constructor(private evt: EventsService) {
    this.evt.eventsToDisplay$.subscribe((e: EventToDisplay) => {
      if (e.type !== 'announce') return;
      this.announce = e;
    });
  }
}
