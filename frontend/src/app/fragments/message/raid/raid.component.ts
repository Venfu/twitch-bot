import { Component, input } from '@angular/core';
import { EventToDisplay } from '@venfu-bot/shared';
import { ColorizeDirective } from '../../../directives/colorize.directive';

@Component({
  selector: 'app-raid',
  standalone: true,
  imports: [ColorizeDirective],
  templateUrl: './raid.component.html',
  styleUrl: './raid.component.scss'
})
export class RaidComponent {
  message = input.required<EventToDisplay>();

}
