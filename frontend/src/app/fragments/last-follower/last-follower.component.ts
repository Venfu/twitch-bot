import { Component, OnInit } from '@angular/core';
import { EventToDisplay } from '@venfu-bot/shared';
import { Colors } from '../../enum/colors';
import { BackendService } from '../../services/backend.service';
import { EventsService } from '../../services/events.service';
import { ColorizeDirective } from '../../directives/colorize.directive';

@Component({
  selector: 'app-last-follower',
  standalone: true,
  imports: [ColorizeDirective],
  templateUrl: './last-follower.component.html',
  styleUrl: './last-follower.component.scss'
})
export class LastFollowerComponent implements OnInit {
  lastFollower: string = '';
  color: string = '';
  constructor(
    private backendService: BackendService,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventsService.eventsToDisplay$.subscribe((f: EventToDisplay) => {
      if (f.type != 'follow') return;
      this.lastFollower = f.from || '';
      this.color =
        Colors[Math.floor((Math.random() * Object.keys(Colors).length) / 2)];
    });
    this.getLastFollowFromBackend();
  }

  getLastFollowFromBackend() {
    this.backendService.getLastFollower().subscribe({
      next: (lf) => {
        if (!lf.user_name) {
          setTimeout(() => {
            this.getLastFollowFromBackend();
          }, 500);
        }
        this.lastFollower = lf.user_name;
      },
      error: (err) => {
        setTimeout(() => {
          this.getLastFollowFromBackend();
        }, 500);
      },
    });
  }
}