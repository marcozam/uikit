import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  UkOptionComponent
} from './components';
import {
  UkAutofocusDirective,
  UkButtonGroupDirective
} from './directives';
import {
  UkSSNPipe,
  UkPhonePipe
} from './pipes';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UkOptionComponent,
    UkAutofocusDirective,
    UkButtonGroupDirective,
    UkSSNPipe,
    UkPhonePipe
  ],
  exports: [
    UkOptionComponent,
    UkAutofocusDirective,
    UkButtonGroupDirective,
    UkSSNPipe,
    UkPhonePipe
  ]
})
export class UIKitCommonModule {}
