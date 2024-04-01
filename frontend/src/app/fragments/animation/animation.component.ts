import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.scss',
})
export class AnimationComponent {
  display: boolean = false;
  constructor(private evt: EventsService) {
    this.evt.eventsToDisplay$.subscribe((event) => {
      this.display = true;
      setTimeout(() => {
        this.display = false;
      }, event.timeout || 1000);
    });
  }
}
