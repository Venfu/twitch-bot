import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  @Input() set display(d: boolean) {
    this._display = d ? 'flex' : 'none';
  }
  _display: string = 'none';

}
