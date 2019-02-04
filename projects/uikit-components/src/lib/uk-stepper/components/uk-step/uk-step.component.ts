import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { UkChildItemComponent } from '../../../uk-common/components/abstracts/uk-child-item.component';

@Component({
  selector: 'uk-step',
  templateUrl: './uk-step.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: UkChildItemComponent,
    useExisting: forwardRef(() => UkStepComponent)
  }],
})
export class UkStepComponent extends UkChildItemComponent {

  @Input() completed = false;
  @Input() inProgress = false;

  constructor() { super('step'); }
}
