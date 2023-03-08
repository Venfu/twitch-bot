import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Colors } from '../enum/colors';

@Directive({
  selector: '[appColorize]',
})
export class ColorizeDirective implements OnInit {
  @Input() appColorize: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (!this.appColorize) {
      this.appColorize =
        Colors[Math.floor((Math.random() * Object.keys(Colors).length) / 2)];
    }
    const color = this.appColorize.match(/^\#/gim)
      ? this.appColorize.substring(1)
      : this.appColorize;
    this.appColorize = this.el.nativeElement.setAttribute(
      'style',
      `color: #${color};`
    );
  }
}
