import * as momentImported from 'moment';
const moment = momentImported;
import { UKWeek } from './UKWeek';

export class UKMonth {
    name: string;
    value: number;
    isDisabled = false;
    year: number;
    mDate: momentImported.Moment;
    weeks: UKWeek[];

    constructor(_value: number, _name: string, _year: number){
        this.value = _value;
        this.name = _name;
        this.year = _year;
        this.mDate = moment(new Date(_year, _value, 1));
    }
}