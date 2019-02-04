import { Directive, AfterContentInit, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[ukButtonGroup]'
})
export class UkButtonGroupDirective implements AfterContentInit {

  @HostBinding('class.uk-btn-container') elementClass = true;

  constructor(private container: ElementRef) {}

  ngAfterContentInit() {
    const buttons = this.container.nativeElement.querySelectorAll('.uk-btn');
    const sizes = [];
    for (const button of buttons) { sizes.push(button.offsetWidth); }
    for (const button of buttons) {
      button.style.width = `${Math.max.apply(Math, sizes)}px`;
    }
  }
}
