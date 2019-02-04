import { AbstractControl } from "@angular/forms";
import { UkFormFieldControl } from "../typings";

export function onUKFormControlOnInit<T>(component: UkFormFieldControl<T>) {
    if (component.ngControl) {
        const control = component.ngControl.control;
        if (control.validator) {
            const validator = control.validator({} as AbstractControl);
            if(validator) { component.required = validator.required; }
        }
        component.invalid = component.ngControl.invalid;
        component.ngControl.statusChanges.subscribe(() => {
            component.invalid = component.ngControl.invalid;
            component.checkErrors(true);
        });
    }
}