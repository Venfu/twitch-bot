import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { EventToDisplay } from '../../../../shared/src';
import { EventsService } from '../services/events.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
})
export class AnimationsComponent implements OnInit {
  eventToDisplay: { [key: string]: { [key: string]: boolean } } = {
    splatoon: {
      default: false,
    },
  };

  constructor(
    private EventsService: EventsService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.EventsService.eventsToDisplay$.subscribe((e: EventToDisplay) => {
      if (e.animation?.animation === 'none' || !e.timeout) return;

      // Which event to display ?
      const displayType = this.eventToDisplay[this.gameService.game][
        e.animation?.animation || e.type
      ]
        ? e.animation?.animation || e.type
        : 'default';

      this.eventToDisplay[this.gameService.game][displayType] = true;

      // Play Audio
      if (!e.animation || !e.animation.sound || e.animation.sound != '0') {
        var audio = new Audio(
          `/assets/${this.gameService.game}/sounds/${
            e.animation?.sound || 'default.mp3'
          }`
        );
        audio.play();
      }

      // Stop event display
      setTimeout(() => {
        this.eventToDisplay[this.gameService.game][displayType] = false;
      }, e.timeout);
    });
  }
}
