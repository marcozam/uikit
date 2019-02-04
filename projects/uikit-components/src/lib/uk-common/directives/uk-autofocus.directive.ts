import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[ukAutofocus]'
})
export class UkAutofocusDirective {

    @Input() set ukAutofocus(value: boolean) {
        if (value === true) { this.el.nativeElement.focus(); }
    }

    constructor(private el: ElementRef) { }
}
