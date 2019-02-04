import { Directive, Input, HostBinding } from '@angular/core';

let uniqueId = 0;

@Directive({
  selector: 'uk-error',
  host: {
    class: 'uk-error',
  },
})
export class UkError {
  @HostBinding('attr.id')
  @Input()
  id: string = `uk-error-${uniqueId++}`;
}
