import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

import {
    UkBaseFormFieldControl,
    UkFieldError,
    UkFieldRequiredError,
    UkFieldInvalidUserNameError
} from '../typings';
import { Constructor } from './constructor';

export interface UkErrorState {
    statusChange: Subject<any>;
    valid: boolean;
    invalid: boolean;
    // Errors Handling
    readonly errors: { [key: string]: UkFieldError }
    // Form Control
    ngControl?: NgControl;
    // Methods
    checkErrors(forceUpdate?: boolean): void;
    setError(name: string, error: UkFieldError): void;
    removeError(name: string): void;
}

export function mixinErrorState<T extends Constructor<UkBaseFormFieldControl<any>>>
    (base: T): Constructor<UkErrorState> & T {
    return class extends base {
        // ===> Manage Status <===
        statusChange: Subject<any> = new Subject();
        private _invalid = false;
        get invalid(): boolean { return this._invalid; }
        set invalid(value: boolean) {
            if (this._invalid !== value) {
                this._invalid = value;
            }
        }
        get valid(): boolean { return !this._invalid; }

        // ===> Handle Error <===
        private _pendingChanges = false;
        private _errors: { [key: string]: UkFieldError }
        get errors() { return this._errors ? this._errors : {} };
        setError(name: string, error: UkFieldError) {
            if(!this._errors) { this._errors = {} }
            if(!this._errors[name]) { 
                this._errors[name] = error; 
                this._pendingChanges = true;
            }
        }
        removeError(name: string) {
            if(this._errors && this._errors[name]) { 
                delete this._errors[name];
                this._pendingChanges = true;
            }
        }
        checkErrors(forceUpdate: boolean = false) {
            if(this.ngControl){
                this.ngControl.hasError('required') ? 
                    this.setError(UkFieldRequiredError.name, UkFieldRequiredError) :
                    this.removeError(UkFieldRequiredError.name);

                this.ngControl.hasError('ukUserName') ? 
                    this.setError(UkFieldInvalidUserNameError.name, UkFieldInvalidUserNameError) :
                    this.removeError(UkFieldInvalidUserNameError.name);
            }
            // Identify if there pending changes to avoid extra work on UI rendering
            if(this._pendingChanges || forceUpdate) {
                this.statusChange.next();
                this._pendingChanges = false;
            }
        }
    }
}