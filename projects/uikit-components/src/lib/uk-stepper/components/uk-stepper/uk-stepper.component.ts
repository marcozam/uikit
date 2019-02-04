import {
  Component,
  ViewEncapsulation,
  AfterContentInit,
  ChangeDetectorRef
} from '@angular/core';

import { UkGroupComponent } from '../../../uk-common/components/abstracts/uk-group.component';
import { UkStepComponent } from '../uk-step/uk-step.component';
import { UkStepperService } from '../../services/uk-stepper.service';

@Component({
  selector: 'uk-stepper',
  templateUrl: './uk-stepper.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [ UkStepperService ],
  // host: { 'class': 'uk-stepper' }
})
export class UkStepperComponent
    extends UkGroupComponent<UkStepComponent> implements AfterContentInit {

  get activeStep(): UkStepComponent { return this._items.find((item) => item.active); }

  selectCurrect() {
    const prevItem = this._items.find(it => it.index === (this.selectedIndex - 1));
    let valid = true;
    if (prevItem) {
      valid = prevItem.completed;
    }
    if (valid) {
      this.selectIndex(this.selectedIndex, true);
    }
  }

  constructor(_ts: UkStepperService, cdr: ChangeDetectorRef) {
    super('stepper', cdr);
    _ts.trigger.subscribe((p) => this.move(p));
  }
}
