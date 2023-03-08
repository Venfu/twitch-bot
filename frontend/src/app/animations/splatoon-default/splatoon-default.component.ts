import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-splatoon-default',
  templateUrl: './splatoon-default.component.html',
  styleUrls: ['./splatoon-default.component.scss'],
})
export class SplatoonDefaultComponent implements AfterViewInit {
  @Input() set display(d: boolean) {
    this._display = d ? 'flex' : 'none';
  }

  _display: string = 'none';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let numberOfSquids = 5;
    let leftPosition = 16;

    for (let i = 1; i <= numberOfSquids; i++) {
      let squid = document.querySelectorAll('.squid')[0].cloneNode(true);
      this.renderer.setStyle(squid, 'left', leftPosition * i + '%');
      this.renderer.setStyle(squid, 'animationDelay', i * 0.15 + 's');
      document.querySelectorAll('.background')[0].appendChild(squid);
    }
  }
}
