import { Directive, Input, HostBinding } from '@angular/core';

let uniqueId = 0;

@Directive({
  selector: 'uk-label',
})
export class UkLabel {
  @Input() align: 'left' | 'right';

  @HostBinding('attr.id')
  @Input()
  id = `uk-label-${uniqueId++}`;

  @HostBinding('class.right') isAlignedRight = this.align === 'right';
}
