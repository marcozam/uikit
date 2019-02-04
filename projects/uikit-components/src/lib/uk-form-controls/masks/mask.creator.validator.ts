import { FormControl } from '@angular/forms';

export function MASK_SECTION_VALIDATOR(maskSections: number[], separator: string, optionalSeparator: boolean = false) {
    let _validator = [];
    maskSections.forEach((part, idx) => {
        const _partExp = `(\\d{${part}})`;
        _validator.push(_partExp);
        if(idx < maskSections.length - 1) {
            _validator.push(`(\\${separator})${optionalSeparator ? '?' : ''}`) 
        }
    });
    return new RegExp(`^${_validator.join('')}$`);
}

export const ukMaskValidator = (pattern: RegExp) => {
    return (control: FormControl) => {
      const isValid = pattern.test(control.value);
      return isValid ? null : { ukMaskError: true }
    };
}