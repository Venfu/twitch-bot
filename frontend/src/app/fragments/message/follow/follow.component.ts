import { Component, input } from '@angular/core';
import { EventToDisplay } from '@venfu-bot/shared';
import { ColorizeDirective } from '../../../directives/colorize.directive';

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [ColorizeDirective],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.scss',
})
export class FollowComponent {
  message = input.required<EventToDisplay>();
}
