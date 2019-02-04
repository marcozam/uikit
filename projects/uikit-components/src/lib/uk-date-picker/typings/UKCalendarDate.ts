import * as momentImported from 'moment';
const moment = momentImported;

export class UKCalendarDate {
    mDate: momentImported.Moment;
    isCurrentMonth: boolean;
    label: string;
    disabled: Boolean;
    selected?: boolean;
    // Date Properties
    today?: boolean;
    isWeekend: boolean;

    constructor(_date: momentImported.Moment, _label: string,  ){
        this.mDate = _date;
        this.label = _label;
        this.disabled = false;
        this.today = this.isToday(_date);
        this.isWeekend = (_date.day() === 0 || _date.day() === 6);
    }

    private isToday(date: momentImported.Moment): boolean {
        return moment().isSame(moment(date), 'day');
    }
}