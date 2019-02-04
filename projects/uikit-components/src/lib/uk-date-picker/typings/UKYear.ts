import { UKMonth } from './UKMonth';
export class UKYear {
    value: number;
    months: UKMonth[];

    constructor(_value: number, _months: UKMonth[]){
        this.value= _value;
        this.months = _months;
    }
}