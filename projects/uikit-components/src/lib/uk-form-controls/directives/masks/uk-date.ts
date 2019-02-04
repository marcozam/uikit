import * as momentImported from 'moment';
const moment = momentImported;
import { Directive, ElementRef, Optional, Self, ChangeDetectorRef, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

import { UkMask } from './uk-mask';
import { UkBaseFormControl } from '../../../uk-common/components';
import { UkFieldError } from '../../../uk-common/typings';

import { UK_DATE_MASK_SECTIONS, UK_DATE_SEPERATOR, UK_DATE_VALIDATOR } from '../../masks';

export const UkInvalidDateError: UkFieldError = {
  name: 'date',
  message(label: string) { return `${label} must be MM/DD/YYYY.`; }
}

@Directive({
  selector: `input[ukDate]`,
  providers: [{ provide: UkBaseFormControl, useExisting: UkDateDirective }],
})
export class UkDateDirective extends UkMask {

  @HostBinding() class = 'uk-input';

  constructor(
    @Optional() @Self() ngControl: NgControl,
    elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    super(elementRef, ngControl, 'input-date');
    this.separator = UK_DATE_SEPERATOR;
    this.maskSections = UK_DATE_MASK_SECTIONS;
    this.placeholder = 'MM / DD / YYYY';
    // VALIDATOR
    this.validationError = UkInvalidDateError;
    this.validator = UK_DATE_VALIDATOR;
  }

  format(value: string) {
    return super.format(value).replace(this.mask, `$1${this.separator}$2${this.separator}$3`);
  }

  formatDate(date: Date){
    let day = `0${date.getDate()}`;
    let month = `0${date.getMonth() + 1}`;
    day = day.substring(day.length - 2);
    month = month.substring(month.length - 2);
    return this.format(`${month}${day}${date.getFullYear()}`)
  }

  setValue(value) {
    // If value is not null or empty
    if(value && value.length >= this.maxLength) {
      const date = moment(value);
      if(date.isValid()) {
        value = this.formatDate(date.toDate());
        // Hack to Update ng Value
        setTimeout( () => {
          this.setNgValue(value);
          this.cdr.markForCheck();
        });
      }
    }
    super.setValue(value);
  }
}