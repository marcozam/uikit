import { HostBinding, Input, ElementRef, Optional, Self, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

import { UkBoolean } from '../../helpers/boolean';
import { UkBaseFormControl } from '../../uk-common/components';

const INVALID_INPUT = 'input type is not supported';
const VALID_INPUTS = [
  'text',
  'number',
  'password',
  'color',
  'date',
  'month',
  'week',
  'time',
  'email',
  'search',
  'tel',
  'url',
];

export abstract class UkBaseInput extends UkBaseFormControl<string> {

  @HostBinding('readonly') @Input() @UkBoolean() readonly;
  @HostBinding('attr.aria-describedby') ariaDescribedby: string;
  @HostBinding('attr.placeholder') @Input() placeholder: string;
  @HostBinding('attr.type') @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
    this.validateType();
  }

  @HostBinding('attr.disabled')
  get inputDisabled() { return this.disabled ? '' : null; }

  constructor(
    protected elementRef: ElementRef,
    @Optional() @Self() public ngControl: NgControl,
    componentName: string = 'input'
  ) {
    super(ngControl, componentName);
    this.inputValue = this.elementRef.nativeElement;
  }

  protected _type: string;
  inputValue: HTMLInputElement;

  @HostListener('input', ['$event'])
  onInputChange($event) {
    const input = <HTMLInputElement>$event.target;
    this.value = input.value;
  }
  /** ===> Manage Focus <=== */
  @HostListener('focus')
  onInputFocus() { this.focused = true; }
  @HostListener('blur')
  onInputBlur() { this.focused = false; }

  onClick() { this.elementRef.nativeElement.focus(); }

  setValue(value) {
    if (this.inputValue.value !== value) {
      this.inputValue.value = value;
    }
    super.setValue(value);
  }

  protected validateType() {
    const isInvalidInput = VALID_INPUTS.indexOf(this._type) < 0;
    if (isInvalidInput) { throw Error(`${this._type} ${INVALID_INPUT}`); }
  }
}
