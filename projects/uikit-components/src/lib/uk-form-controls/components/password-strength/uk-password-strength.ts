import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    Input,
    ChangeDetectorRef
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface UkPasswordValidation {
    valid: boolean;
    description: string;
    validation(value: string): boolean;
}

export interface UkPasswordStrengthLevel {
    name: string;
    color: string;
    valid(value: number) : boolean
}

@Component({
  selector: 'uk-password-strength',
  templateUrl: './uk-password-strength.html',
  host: { class: 'password-strength' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UkPasswordStrength {

    private _field: AbstractControl;
    @Input()
    set field(value: AbstractControl) {
        this._field = value;
        this._field.valueChanges.subscribe(value => {
            if(!this.evaluate(value)) {
                this._field.setErrors({ ukPasswordStrength: this.strengthValue });
            }
        });
    };

    visible = false;
    strengthValue = 0;
    validationValue = 20;

    validations: UkPasswordValidation[] = [
        { valid: false, description: 'One uppercase letter', validation(value) { return /[A-Z]/g.test(value); } },
        { valid: false, description: 'One number', validation(value) { return /\d/g.test(value); } },
        { valid: false, description: 'One lowercase letter', validation(value) { return /[a-z]/g.test(value); } },
        { valid: false, description: '8 characters', validation(value) { return value.length >= 8; } },
        { valid: false, description: 'One Symbol (#?!@$%^&*+-)', validation(value) { return /[.*\/\\\+=_\-\(\*&\^%$#@@!]/g.test(value); } },
    ];

    strengthLevels: UkPasswordStrengthLevel[] = [
        { name: 'Weak', color: 'error', valid(value) { return value < 60; } },
        { name: 'Fair', color: 'warning', valid(value) { return value >= 60 && value < 80; } },
        { name: 'Good', color: 'info', valid(value) { return value >= 60 && value < 80; } },
        { name: 'Strong', color: 'success', valid(value) { return value === 100 } }
    ];

    currentStrengthLevel: UkPasswordStrengthLevel;

    constructor(private cdr: ChangeDetectorRef) { 
        this.currentStrengthLevel = this.strengthLevels[0];
    }

    evaluate(password: string) {
        let controlValid = true;
        let newStrengthValue = 0;
        this.validations.forEach((validation, idx) => {
            validation.valid = validation.validation(password);
            newStrengthValue += validation.valid ? this.validationValue : 0;
            controlValid = controlValid && validation.valid;
        });
        this.strengthValue = newStrengthValue;
        for(let level of this.strengthLevels) {
            if(level.valid(this.strengthValue)) {
                this.currentStrengthLevel = level;
                break;
            }
        }
        this.cdr.markForCheck();
        return controlValid;
    }

    show() { 
        this.visible = true;
        this.cdr.markForCheck();
    }
    hide() { 
        this.visible = false;
        this.cdr.markForCheck();
    }
}
