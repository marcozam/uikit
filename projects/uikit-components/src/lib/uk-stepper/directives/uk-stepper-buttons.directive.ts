import { Directive } from '@angular/core';
import { UkStepperService } from '../services/uk-stepper.service';

@Directive({
  selector: 'button[ukStepperNext]',
  host: { '(click)': 'clickFired()' }
})
export class UkStepperNextDirective {
  constructor(private _ts: UkStepperService) { }
  clickFired() { this._ts.moveStep(1); }
}

@Directive({
    selector: 'button[ukStepperPrevious]',
    host: { '(click)': 'clickFired()' }
})
export class UkStepperPreviousDirective {
  constructor(private _ts: UkStepperService) { }
  clickFired() { this._ts.moveStep(-1); }
}
