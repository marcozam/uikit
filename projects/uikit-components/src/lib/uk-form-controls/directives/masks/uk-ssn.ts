import { Directive, ElementRef, Optional, Self, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

import { UkMask } from './uk-mask';
import { UkBaseFormControl } from '../../../uk-common/components';
// Errors and Validators
import { UkFieldError } from '../../../uk-common/typings';
import { UK_SSN_SEPERATOR, UK_SSN_MASK_SECTIONS, UK_SSN_VALIDATOR } from '../../masks';

export const UkInvalidSSNError: UkFieldError = {
  name: 'ssn',
  message() { return `The Social Security Number must be ###-##-####.`; }
};

@Directive({
  selector: `input[ukSSN]`,
  providers: [
    { provide: UkBaseFormControl, useExisting: UkSSNDirective }
  ],
})
export class UkSSNDirective extends UkMask {

  @HostBinding() class = 'uk-input';

  constructor(
    @Optional() @Self() ngControl: NgControl,
    elementRef: ElementRef
  ) {
    super(elementRef, ngControl, 'input-ssn');
    this.type = 'password';
    this.separator = UK_SSN_SEPERATOR;
    this.maskSections = UK_SSN_MASK_SECTIONS;
    this.setPlaceHolder();
    // VALIDATOR
    this.validationError = UkInvalidSSNError;
    this.validator = UK_SSN_VALIDATOR;
  }

  format(value: string) {
    return super.format(value).replace(this.mask, `$1${this.separator}$2${this.separator}$3`);
  }
}
