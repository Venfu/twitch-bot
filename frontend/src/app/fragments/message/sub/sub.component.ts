import { Component, input } from '@angular/core';
import { EventToDisplay } from '@venfu-bot/shared';
import { ColorizeDirective } from '../../../directives/colorize.directive';

@Component({
  selector: 'app-sub',
  standalone: true,
  imports: [ColorizeDirective],
  templateUrl: './sub.component.html',
  styleUrl: './sub.component.scss',
})
export class SubComponent {
  message = input.required<EventToDisplay>();
}
