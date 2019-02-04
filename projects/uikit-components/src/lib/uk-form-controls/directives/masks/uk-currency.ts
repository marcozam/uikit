import {
  Directive,
  Input,
  ElementRef,
  Optional,
  Self,
  HostListener,
  HostBinding,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  IS_DIGIT_KEY,
  IS_SYSTEM_KEY,
  KEY_CODE,
  IS_DELETE_KEY,
  GET_NUMBER_CHAR,
} from '../../../helpers/keys';
import { UkInputDirective } from '../uk-input';
import { UkBaseFormControl } from '../../../uk-common/components';

@Directive({
  selector: `input[ukCurrency]`,
  providers: [{ provide: UkBaseFormControl, useExisting: UkCurrencyDirective }],
})
export class UkCurrencyDirective extends UkInputDirective {

  @HostBinding() class = 'uk-input text-right';

  @Input() thousandSeparator = ',';
  @Input() decimalSeparator = '.';
  @Input() decimalNumber = 2;
  thousReg = new RegExp(this.thousandSeparator, 'g');
  decReg = new RegExp(this.decimalSeparator, 'g');

  // value property
  @Input()
  get value(): any {
    return this.inputValue.value;
  }
  set value(value: any) {
    if (value !== this.value) {
      this.inputValue.value = value;
    }
    this.ngControl.viewToModelUpdate(value);
  }

  @HostListener('keyup', ['$event'])
  onKeyUp($event) {
    const input = (HTMLInputElement = $event.target);
    let value = input.value;
    if (IS_DELETE_KEY($event.keyCode)) {
      let cPos = input.selectionStart;
      cPos = this.spaceCaretPosition(value, cPos);
      value = value.replace(this.thousReg, '');

      const newValues = this.spaceFormat(value, cPos);
      input.value = newValues[0];
      input.selectionStart = newValues[1];
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown($event) {
    const input = (HTMLInputElement = $event.target);
    let value = input.value;
    const key = $event.keyCode;

    if (!this.isSystemKey($event)) {
      $event.preventDefault();
    }

    if (this.isValidKey($event)) {
      let cPos = input.selectionStart;
      const cEnd = input.selectionEnd;

      // remove selected text
      if (cPos !== cEnd) {
        value = value.substring(0, cPos) + value.substring(cEnd);
      }
      cPos = this.spaceCaretPosition(value, cPos);
      value = value.replace(this.thousReg, '');

      let before = value.substring(0, cPos);
      let after = value.substring(cPos);
      let newPos = cPos + 1;
      // Check if it has decimal separator
      if (this.isDecimalKey(key) && value.indexOf(this.decimalSeparator) >= 0) {
        if (before.indexOf(this.decimalSeparator) >= 0) {
          newPos--;
        }
        before = before.replace(this.decReg, '');
        after = after.replace(this.decReg, '');
      }

      let newValue = before + GET_NUMBER_CHAR(key) + after;
      if (newValue.substring(0, 1) === this.decimalSeparator) {
        newValue = '0' + newValue;
        newPos++;
      }

      while (
        newValue.length > 1 &&
        newValue.substring(0, 1) === '0' &&
        newValue.substring(1, 2) !== this.decimalSeparator
      ) {
        newValue = newValue.substring(1);
        newPos--;
      }

      if (newValue.indexOf(this.decimalSeparator) >= 0) {
        const newLength =
          newValue.indexOf(this.decimalSeparator) + this.decimalNumber + 1;
        if (newValue.length > newLength) {
          newValue = newValue.substring(0, newLength);
        }
      }

      const newValues = this.spaceFormat(newValue, newPos);
      this.value = newValues[0];
      input.selectionStart = newValues[1];
      input.selectionEnd = newValues[1];
    }
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    let value = this.value;
    const valueParts = this.splitNumber(value);
    if (this.decimalNumber > 0) {
      let noDec = '';
      for (let i = 0; i < this.decimalNumber; i++) {
        noDec += '0';
      }

      if (value.length > 0) {
        if (valueParts.hasDecimal) {
          const newLength =
            value.indexOf(this.decimalSeparator) + this.decimalNumber + 1;
          if (value.length < newLength) {
            while (value.length < newLength) {
              value = value + '0';
            }
            this.value = value.substring(0, newLength);
          }
        } else {
          this.value = value + this.decimalSeparator + noDec;
        }
      }
    }
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    elementRef: ElementRef
  ) {
    super(ngControl, elementRef);
    this.inputValue = this.elementRef.nativeElement;
    this.id = this.id;
    this.placeholder = '0.00';
  }

  splitNumber(value: string) {
    let int: string = value;
    let dec = '';
    const decimalPosition = value.indexOf(this.decimalSeparator);
    if (decimalPosition >= 0) {
      int = value.substring(0, decimalPosition);
      dec = value.substring(decimalPosition);
    }
    return { decimal: dec, integer: int, hasDecimal: decimalPosition >= 0 };
  }

  // Add spaces for thousands
  spaceFormat(value: string, position: number) {
    const valueParts = this.splitNumber(value);
    let respond = [value, position];
    let spaceIndex = valueParts.integer.length;

    if (spaceIndex > 3) {
      let newInt = '';
      while (spaceIndex > 3) {
        spaceIndex -= 3;
        newInt =
          this.thousandSeparator +
          value.substring(spaceIndex, spaceIndex + 3) +
          newInt;
        if (position > spaceIndex) {
          position++;
        }
      }
      respond = [
        valueParts.integer.substring(0, spaceIndex) +
          newInt +
          valueParts.decimal,
        position,
      ];
    }
    return respond;
  }

  // Get the right caret position without the spaces
  spaceCaretPosition(val, cPos) {
    if (cPos > 0 && val.substring(cPos - 1, cPos) === this.thousandSeparator) {
      cPos -= 1;
    }
    if (val.substring(0, cPos).indexOf(this.thousandSeparator) >= 0) {
      cPos = cPos - val.substring(0, cPos).match(this.thousReg).length;
    }
    return cPos;
  }

  isValidKey($event: KeyboardEvent) {
    return (
      IS_DIGIT_KEY($event.keyCode) ||
      this.isDecimalKey($event.keyCode) ||
      $event.keyCode === KEY_CODE.COMMA
    );
  }

  isDecimalKey(keyCode: number) {
    return keyCode === KEY_CODE.PERIOD || keyCode === KEY_CODE.DECIMAL_POINT;
  }

  isSystemKey($event: KeyboardEvent) {
    return (
      IS_SYSTEM_KEY($event.keyCode, $event) || this.isDecimalKey($event.keyCode)
    );
  }
}