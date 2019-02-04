import { 
    Component, 
    ChangeDetectionStrategy, 
    ViewEncapsulation, 
    ChangeDetectorRef, 
    HostBinding,
    forwardRef, 
    Optional, 
    Self,
    Input,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { UkFormGroupComponent, UkOptionComponent, UkBaseFormControl } from '../../../uk-common/components';
import { UK_ALIGMENT } from '../../../uk-common/enums';

@Component({
    selector: 'uk-radio-group',
    templateUrl: './uk-radio-group.component.html',
    host: { 
        'class': 'uk-radio-group',
        'role': 'group',
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: UkBaseFormControl,
        useExisting: forwardRef(() => UkRadioGroupComponent)
    }],
})
export class UkRadioGroupComponent extends UkFormGroupComponent<UkOptionComponent> {

    @Input() @HostBinding('attr.aria-labelledby') ariaLabelledby;
    @Input() aligment: UK_ALIGMENT = UK_ALIGMENT.Vertical;
    @HostBinding('class.horizontal') 
    get horizontal() { return this.aligment === UK_ALIGMENT.Horizontal; }

    constructor(@Self() @Optional() ngControl: NgControl, cdRef: ChangeDetectorRef) {
        super(ngControl, 'radio-group', cdRef);
    }

    onRadioChanged(value: any) { this.value = value; }
}
