import { Directive, ElementRef, Optional, Self, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UkBaseFormControl } from '../../uk-common/components';
import { UkBaseInput } from './uk-base-input';

@Directive({
  selector: `input[ukInput], textarea[ukInput]`,
  providers: [{ provide: UkBaseFormControl, useExisting: UkInputDirective }]
})
export class UkInputDirective extends UkBaseInput {

  @HostBinding() class = 'uk-input';

  constructor(
    @Optional() @Self() ngControl: NgControl,
    elementRef: ElementRef
  ) {
    super(elementRef, ngControl, 'input');
  }
}
