import { coerceBooleanProperty } from '../../helpers/boolean';
import { Constructor } from './constructor';

export interface IsRequired {
    /* Whether the component is required. */
    required: boolean;
}

export function mixinRequired<T extends Constructor<{}>>(base: T): Constructor<IsRequired> & T {
    return class extends base {
        set required(value: any) { this._required = coerceBooleanProperty(value); }
        get required() { return this._required; }
        protected _required = false;
    }
}