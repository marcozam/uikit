import { EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { UkFieldError } from './uk-field-error';

export interface UkBaseFormFieldControl<T> {
  id: string;
  ngControl: NgControl;
}

export interface UkFormFieldControl<T> {
  id: string;
  value: T;
  ngControl: NgControl;

  // Base Form Control Atributes
  required: boolean;
  disabled: boolean;
  invalid: boolean;
  valid: boolean;
  touched: boolean;
  untouched?: boolean;
  focused: boolean;
  // Errors
  errors: { [key: string]: UkFieldError }
  checkErrors(forceUpdate?: boolean): void;
  
  // Events TODO: Refactor
  focusedChange?: EventEmitter<boolean>;
  valueChange?: EventEmitter<T>;
  statusChange: Subject<any>;

  controlType?: string;
  onClick(event: MouseEvent): void;
}
