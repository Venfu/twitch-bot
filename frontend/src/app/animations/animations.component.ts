import { Component, OnInit } from '@angular/core';
import { EventToDisplay } from 'src/shared';
import { EventsService } from '../services/events.service';
import { StreamInformationsService } from '../services/stream-informations.service';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
})
export class AnimationsComponent implements OnInit {
  eventToDisplay: { [key: string]: { [key: string]: boolean } } = {
    'splatoon-3': {
      default: false,
    },
    default: {
      default: false,
    },
  };

  constructor(
    private EventsService: EventsService,
    private streamInformations: StreamInformationsService
  ) {}

  ngOnInit(): void {
    this.EventsService.eventsToDisplay$.subscribe((e: EventToDisplay) => {
      console.log(this.streamInformations.game);
      if (e.animation?.animation === 'none' || !e.timeout) return;

      // Which event to display ?
      const displayType = this.eventToDisplay[this.streamInformations.game][
        e.animation?.animation || e.type
      ]
        ? e.animation?.animation || e.type
        : 'default';

      this.eventToDisplay[this.streamInformations.game][displayType] = true;

      // Play Audio
      if (!e.animation || !e.animation.sound || e.animation.sound != '0') {
        var audio = new Audio(
          `/assets/${this.streamInformations.game}/sounds/${
            e.animation?.sound || 'default.mp3'
          }`
        );
        audio.play();
      }

      // Stop event display
      setTimeout(() => {
        this.eventToDisplay[this.streamInformations.game][displayType] = false;
      }, e.timeout);
    });
  }
}
