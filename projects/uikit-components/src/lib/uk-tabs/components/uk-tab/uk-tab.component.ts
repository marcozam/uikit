import { Component, ViewEncapsulation, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { UkChildItemComponent } from '../../../uk-common/components/abstracts/uk-child-item.component';
@Component({
  selector: 'uk-tab',
  templateUrl: './uk-tab.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: UkChildItemComponent, 
    useExisting: forwardRef(() => UkTabComponent)
  }],
})
export class UkTabComponent extends UkChildItemComponent{
  constructor() { super('tab'); }
}
