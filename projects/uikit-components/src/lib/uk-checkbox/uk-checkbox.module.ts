
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { UIKitCommonModule } from '../uk-common/uk-common.module';
import { UkCheckboxComponent } from './components/uk-checkbox.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // UIKitCommonModule
    ],
    declarations: [
        UkCheckboxComponent
    ],
    exports: [
        UkCheckboxComponent,
    ]
})
export class UkCheckboxModule {}