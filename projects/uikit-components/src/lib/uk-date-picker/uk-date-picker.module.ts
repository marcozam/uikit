import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular CDK
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
// UI Kit Common Module
import { UkFormControlsModule } from '../uk-form-controls';
import { UIKitIconsModule } from '../uk-icons/uk-icons.module';
// Components
import { UKDatePickerComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    // UI Kit
    UIKitIconsModule,
    UkFormControlsModule,
  ],
  declarations: [
    UKDatePickerComponent
  ],
  exports: [UKDatePickerComponent]
})
export class UIKitDatePickerModule { }