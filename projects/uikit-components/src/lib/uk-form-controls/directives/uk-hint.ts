import { Directive, Input, HostBinding } from '@angular/core';

let uniqueId = 0;

@Directive({
  selector: 'uk-hint',
  host: {
    class: 'uk-hint',
  },
})
export class UkHint {
  @Input() align: 'left' | 'right';

  @HostBinding('attr.id')
  @Input()
  id = `uk-hint-${uniqueId++}`;

  @HostBinding('class.right') isAlignedRight = this.align === 'right';
}
