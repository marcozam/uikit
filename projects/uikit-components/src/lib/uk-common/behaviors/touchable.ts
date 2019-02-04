import { Constructor } from './constructor';
import { UkErrorState } from './error-state';

export interface UkTouchable {
    touched: boolean;
    untouched: boolean;
    onControlTouched: Function;
    touchControl(): void;
}

export function mixinTouchable<T extends Constructor<UkErrorState>>
    (base: T): Constructor<UkTouchable> & T {
    return class extends base {
        onControlTouched: Function;

        private _touched = false;
        get untouched(): boolean { return !this._touched; }
        get touched(): boolean {
            if (this.ngControl) {
                if (this.ngControl.touched !== this._touched) {
                    this.setTouch(this.ngControl.touched);
                }
            }
            return this.ngControl ? this.ngControl.touched : this._touched; 
        }

        private setTouch(value: boolean){
            this._touched = value;
            if(this.touched) { this.checkErrors(true); }
        }

        touchControl() {
            if(!this._touched) {
                this.setTouch(true);
                this.onControlTouched();
            }
        }
    }
}