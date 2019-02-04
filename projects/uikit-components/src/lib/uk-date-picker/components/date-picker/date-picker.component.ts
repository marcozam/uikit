import * as momentImported from 'moment';
const moment = momentImported;
import { Component, OnInit, ViewEncapsulation, Input, Optional, Self, forwardRef, HostBinding } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';

import { UKCalendarDate, UKMonth, UKYear, UKCalendarType } from '../../typings';
import { UkBaseFormControl } from '../../../uk-common/components';

export class UkBaseDatePicker extends UkBaseFormControl<Date | Date []> { }

@Component({
  selector: 'uk-date-picker',
  host: { class: 'uk-date-picker' },
  providers: [{
    provide: UkBaseFormControl,
    useExisting: forwardRef(() => UKDatePickerComponent)
  }],
  templateUrl: './date-picker.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UKDatePickerComponent extends UkBaseDatePicker implements OnInit, ControlValueAccessor {
  private yearDate = moment();
  private nMonths = 1;
  private isRange = false;
  private isSelectingRange = false;

  currentDate = moment();
  months: UKMonth[];
  weeks: any[];
  years: UKYear[];
  monthSelection: boolean;
  monthClickable = false;
  initialDateText = '';
  endDateText = '';

  // TODO: made them configurable
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  charsLimit = 3;

  @Input() disableWeekEnds = false;
  @Input() calendarType: UKCalendarType = UKCalendarType.SINGLE;
  @Input() holidays: Date[];
  @Input() minDate: Date;
  @Input() maxDate: Date;

  @HostBinding('class.uk-date-picker') true;

  private _isCalendarOpen = false;
  get isCalendarOpen() {
    return this._isCalendarOpen;
  }
  set isCalendarOpen(value: boolean) {
    value ? this.openCalendar() : this.closeCalendar();
  }

  // Output or Input
  private _selectedDates: Date[];
  get selectedDates(): Date[] {
    return this._selectedDates;
  }
  set selectedDates(value: Date[]) {
    if (this.selectedDates !== value) {
      this._selectedDates = value;
      this.isCalendarOpen = false;
      if (this.selectedDates.length > 0) {
        this.initialDateText = moment(this.selectedDates[0]).format('MM/DD/YY');
        if (this.isRange) {
          this.endDateText = moment(this.selectedDates[1]).format('MM/DD/YY');
        }
      } else {
        this.initialDateText = '';
        this.endDateText = '';
      }
      this.setNgValue(this.calendarType === UKCalendarType.SINGLE ? this.selectedDates[0] : this.selectedDates);
    }
  }

  constructor(
    @Self() @Optional() public ngControl: NgControl
  ) {
    super(ngControl, 'date-picker');
  }

  onDateTextChange(text: string, isEnd?: boolean) {
    if (text.length >= 8) {
      const date = moment(text);
      if (date.isValid()) {
        if (this.createUKDay(date, 0).disabled) {
          // this.errorMessage = 'Selected date is not valid.';
        } else {
          this.selectedDates = [date.toDate()];
        }
      } else {
        // this.errorMessage = 'Text provided is not a valid date';
      }
    } else if (text.length === 0) {
      this.selectedDates = [];
    }
  }

  generateCalendar(): void {
    this.months = [];
    let _month: UKMonth;
    let _date: momentImported.Moment;
    for (let i = 0; i < this.nMonths; i++) {
      _date = moment(this.currentDate).add(i, 'months');
      _month = new UKMonth(_date.month(), this.monthNames[_date.month()], _date.year());
      _month.weeks = this.generateWeeks(_date);
      this.months.push(_month);
    }
  }

  generateWeeks(workingdate: momentImported.Moment) {
    const _dates = this.fillDays(workingdate);
    const _weeks: UKCalendarDate[][] = [];
    while (_dates.length > 0) {
      _weeks.push(_dates.splice(0, 7));
    }
    return _weeks;
  }

  generateYears() {
    const cYear = this.yearDate.year();
    let _year: number;
    const _years: UKYear[] = [];
    for (let i = 0; i < 3; i++) {
      _year = cYear + i;
      _years.push(new UKYear(_year, this.generateMonths(_year)));
    }
    this.years = _years;
  }

  generateMonths(_year: number) {
    const _months: UKMonth[] = [];
    let _month: UKMonth;
    for (let i = 0; i < this.monthNames.length; i++) {
      _month = new UKMonth(i, this.monthNames[i], _year);
      if (this.minDate) {
        _month.isDisabled = _month.mDate.isBefore(this.minDate, 'month');
      }
      if (this.maxDate && !_month.isDisabled) {
        _month.isDisabled = _month.mDate.isAfter(this.maxDate, 'month');
      }
      _months.push(_month);
    }
    return _months;
  }

  // Gets all days in current month
  fillDays(currentMoment: momentImported.Moment) {
    const firstOfMonth = moment(currentMoment).startOf('month');
    const startDayOfWeek = firstOfMonth.day();
    const daysInMonth = firstOfMonth.daysInMonth();

    const _days: UKCalendarDate[] = [];
    let idx: number = -startDayOfWeek;
    for (idx; idx < daysInMonth; idx++) {
      _days.push(this.createUKDay(moment(firstOfMonth).add('day', idx), idx));
    }
    return _days;
  }

  createUKDay(date: momentImported.Moment, idx: number) {
    const _cd = new UKCalendarDate(date, date.date().toString());
    _cd.isCurrentMonth = idx >= 0;
    _cd.disabled = this.shouldDisableDay(_cd) || idx < 0;
    return _cd;
  }

  // dynamic properties
  isDaySelected(date: UKCalendarDate) {
    let _rValue = false;
    if (!date.disabled && this.selectedDates.length > 0) {
      _rValue = (!this.isRange || this.selectedDates.length === 1) ?
        date.mDate.isSame(this.selectedDates[0], 'day') :
        date.mDate.isBetween(this.selectedDates[0], this.selectedDates[1], 'day', '[]');
    }
    return _rValue;
  }

  isMonthSelected(month: UKMonth) {
    return this.currentDate.isSame(month.mDate, 'month');
  }

  shouldDisableDay(date: UKCalendarDate) {
    let _rValue = false;
    // Validate if should disable all days before minDate
    if (this.minDate) {
      _rValue = moment(this.minDate).isAfter(date.mDate);
    }
    // Validate if should disable all days after maxDate
    if (this.maxDate && !_rValue) {
      _rValue = moment(this.maxDate).isBefore(date.mDate);
    }
    // Validate if should disable weekends
    if (this.disableWeekEnds && !_rValue) {
      _rValue = date.isWeekend;
    }
    // Validate if should disable holidays
    if (!_rValue && this.holidays) {
      let idx = 0;
      while (idx < this.holidays.length && !_rValue) {
        _rValue = date.mDate.isSame(this.holidays[idx++], 'day');
      }
    }
    return _rValue;
  }

  // Events
  openCalendar() {
    if (!this.disabled) {
      this._isCalendarOpen = true;
    }
  }

  closeCalendar() {
    this._isCalendarOpen = false;
  }

  openMonthSelection() {
    this.yearDate = this.currentDate;
    this.monthSelection = true;
    this.generateYears();
  }

  onDayHover(day: UKCalendarDate) {
    if (this.calendarType === 'short' && this.isSelectingRange && this.selectedDates) {
      if (this.selectedDates.length > 0) {
        if (day.mDate.isAfter(this.selectedDates[0])) {
          this.selectedDates = [this.selectedDates[0], day.mDate.toDate()];
        }
      }
    }
  }

  onMonthSelected(month: UKMonth) {
    this.currentDate = month.mDate;
    this.generateCalendar();
    this.monthSelection = false;
  }

  onDaySelected(day: UKCalendarDate) {
    if (!this.isRange) {
      this.selectedDates = [day.mDate.toDate()];
      this.currentDate = day.mDate;
    } else {
      if (this.selectedDates.length > 0 && this.isSelectingRange) {
        if (day.mDate.isAfter(this.selectedDates[0], 'day')) {
          this.selectedDates = [this.selectedDates[0], day.mDate.toDate()];
          this.isSelectingRange = false;
        }
      } else {
        this.selectedDates = [day.mDate.toDate()];
        this.isSelectingRange = true;
      }
    }
  }

  // Arrows Navigation
  allowPrevNav(granularity: any): boolean {
    let _rValue = true;
    if (this.minDate) {
      if (granularity === 'year') {
        _rValue = !this.yearDate.isSameOrBefore(this.minDate, granularity);
      } else if (granularity === 'month') {
        _rValue = !this.currentDate.isSameOrBefore(this.minDate, granularity);
      }
    }
    return _rValue;
  }

  allowNextNav(granularity: any): boolean {
    let _rValue = true;
    if (this.maxDate) {
      if (granularity === 'year') {
        _rValue = !moment(this.yearDate).add(3, 'years').isSameOrAfter(this.maxDate, granularity);
      } else if (granularity === 'month') {
        _rValue = !this.currentDate.isSameOrAfter(this.maxDate, granularity);
      }
    }
    return _rValue;
  }

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  prevYear(): void {
    this.yearDate = moment(this.yearDate).subtract(3, 'years');
    this.generateYears();
  }

  nextYear(): void {
    this.yearDate = moment(this.yearDate).add(3, 'years');
    this.generateYears();
  }

  // ===> Angular LifeCycle Hooks <===
  ngOnInit() {
    super.ngOnInit();
    if (this.maxDate && this.currentDate.toDate() > this.maxDate) {
      this.currentDate = moment(this.maxDate);
    }
    this.generateCalendar();
  }
}
