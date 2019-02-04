import * as momentImported from 'moment';
const moment = momentImported;
import {
    ValidatorFn,
    ValidationErrors,
    AbstractControl
} from '@angular/forms';
import { UK_DATE_VALIDATOR, UK_SSN_VALIDATOR } from '../uk-form-controls/masks';

// Function Signature
type UkDateValidatorFn = (date: Date) => ValidationErrors | null;

function validateParamDate(date: Date, paramName: string) {
    if (!(date instanceof Date)) {
        const _date = moment(date, 'MM/DD/YYYY');
        if (!_date.isValid()) {
            console.warn(`${paramName} is not valid date will not work properly.`);
        } else { date = _date.toDate(); }
    }
    return date;
}

function isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
}

export class UKValidators {
    private static userNameRegex = new RegExp('^[A-Za-z0-9_\-+.@]{6,30}$');

    // tslint:disable-next-line:max-line-length
    // private static poBoxRegex = new RegExp('(?:P(?:ost|OST(?:al|AL)?)?[\.\-\s]*(?:(?:O(?:ffice|FFICE)?[\.\-\s]*)?[B|b][O|o|0][X|x]|o(?:ffice|FFICE|\b)(?:[-\s]*\d)|code|CODE)|[B|b][O|o|0][X|x]|[-\s\b]*\d)');
    // tslint:disable-next-line:max-line-length
    private static poBoxRegex = new RegExp('(?:P(?:ost|OST(?:al|AL)?)?[\.\-\s]*(?:(?:O(?:ffice|FFICE)?[\.\-\s]*)?B(?:ox|OX|in|\b|\d)|o(?:ffice|FFICE|\b)(?:[-\s]*\d)|code|CODE)|box|BOX[-\s\b]*\d)');
    private static streetRegex = new RegExp('^((\b.*[a-zA-Z0-9]+.*\b)\s*){2,}$');


    // To execute validation only if date is valid
    private static baseDateValidator(control: AbstractControl, validate: UkDateValidatorFn): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) { return null; }
        const value = control.value;
        const date = moment(value);
        if (value.length === 10 && date.isValid()) {
            return validate(date.toDate());
        }
        return null;
    }

    static minDate(minDate: Date): ValidatorFn {
        minDate = validateParamDate(minDate, 'minDate');
        return (control: AbstractControl): ValidationErrors | null => {
            return this.baseDateValidator(control, (date: Date) => {
                const isValid = date >= minDate;
                return isValid ? null : { ukMinDateError: true };
            });
        }
    }

    static maxDate(maxDate: Date): ValidatorFn {
        maxDate = validateParamDate(maxDate, 'maxDate');
        return (control: AbstractControl): ValidationErrors | null => {
            return this.baseDateValidator(control, (date: Date) => {
                const isValid = date <= maxDate;
                return isValid ? null : { ukMaxDateError: true };
            });
        };
    }

    static betweenDate(minDate: Date, maxDate: Date): ValidatorFn {
        minDate = validateParamDate(minDate, 'minDate');
        maxDate = validateParamDate(maxDate, 'maxDate');
        return (control: AbstractControl): ValidationErrors | null => {
            return this.baseDateValidator(control, (date: Date) => {
                const isValid = minDate < date && date < maxDate;
                return isValid ? null : { ukBetweenDateError: true };
            });
        };
    }

    static validDate(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) { return null; }
        const isValid = UK_DATE_VALIDATOR.test(control.value);
        return isValid ? null : { ukMaskDateError: true };
    }

    static validSSN(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) { return null; }
        const isValid = UK_SSN_VALIDATOR.test(control.value);
        return isValid ? null : { ukMaskSSNError: true };
    }

    static duplicate(values: string[]): ValidatorFn {
        const fn = (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value)) { return null; }
            const idx = values.indexOf(control.value);
            return idx >= 0 ? { ukDuplicate: true } : null;
        };
        return fn;
    }

    static POBoxNotAllow(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) { return null; }
        const isInvalid =  UKValidators.poBoxRegex.test(control.value);
        return isInvalid ? { ukPOBox: true } : null;
    }

    static validUserName(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) { return null; }
        const length: number = control.value ? control.value.length : 0;
        let isInvalid = true;
        if (length >= 6 && length <= 30) {
            isInvalid = !UKValidators.userNameRegex.test(control.value);
        }
        return isInvalid ? { ukUserName: true } : null;
    }

    static validStreet(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) { return null; }
        const isInvalid = !UKValidators.streetRegex.test(control.value);
        return isInvalid ? { ukStreet: true } : null;
    }

    //#region Angular Forms Validators
    static maxLength(maxLength: number): ValidatorFn {
        const fn = (control: AbstractControl): ValidationErrors | null => {
        // TODO: Add maxLength Attribute
          const length: number = control.value ? control.value.length : 0;
          return length > maxLength ?
              {'ukMaxlength': {'requiredLength': maxLength, 'actualLength': length}} :
              null;
        };
        return fn;
    }

    static minLength(minLength: number): ValidatorFn {
        const fn = (control: AbstractControl): ValidationErrors | null => {
            // TODO: Add minLength Attribute
            if (isEmptyInputValue(control.value)) { return null; }
            const length: number = control.value ? control.value.length : 0;
            return length < minLength ?
                {'ukMinlength': {'requiredLength': minLength, 'actualLength': length}} :
                null;
        };
        return fn;
    }
    //#endregion
}
