import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// UI Kit Modules
import { UIKitIconsModule } from '../uk-icons/uk-icons.module';
import { UIKitCommonModule } from '../uk-common/uk-common.module';
// Components
import {
  UkStepperComponent,
  UkStepComponent,
  UkStepBodyComponent
} from './components';
// Directives
import {
  UkStepperNextDirective,
  UkStepperPreviousDirective
} from './directives';

@NgModule({
  imports: [
    CommonModule,
    UIKitIconsModule,
    UIKitCommonModule,
  ],
  declarations: [
    UkStepperComponent,
    UkStepBodyComponent,
    UkStepComponent,
    UkStepperNextDirective,
    UkStepperPreviousDirective,
  ],
  exports: [
    UkStepperComponent,
    UkStepComponent,
    UkStepperNextDirective,
    UkStepperPreviousDirective
  ]
})
export class UIKitStepperModule { }
