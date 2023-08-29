import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overwatch-default',
  templateUrl: './overwatch-default.component.html',
  styleUrls: ['./overwatch-default.component.scss']
})
export class OverwatchDefaultComponent {
  @Input() set display(d: boolean) {
    this._display = d ? 'flex' : 'none';
  }
  _display: string = 'none';

}
