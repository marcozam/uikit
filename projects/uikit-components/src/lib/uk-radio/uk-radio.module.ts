
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIKitCommonModule } from '../uk-common/uk-common.module';
import { UkRadioComponent } from './components/uk-radio.component';
import { UkRadioGroupComponent } from './components/uk-radio-group/uk-radio-group.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UIKitCommonModule
    ],
    declarations: [
        UkRadioComponent,
        UkRadioGroupComponent
    ],
    exports: [
        UkRadioComponent,
        UkRadioGroupComponent
    ]
})
export class UkRadioModule {}