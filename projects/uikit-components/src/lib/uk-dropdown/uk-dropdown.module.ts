import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { UIKitCommonModule } from '../uk-common/public-api';
import {
  UkDropdownComponent,
  UkSelectTrigger
} from './components/uk-dropdown.component';
import { UkDropdownOverlayService } from './services/uk-dropdown.overlay.service';

@NgModule({
  imports: [
    CommonModule, 
    OverlayModule, 
    PortalModule,
    FormsModule,
    // UIKitCommonModule
  ],
  declarations: [UkDropdownComponent, UkSelectTrigger],
  providers: [UkDropdownOverlayService],
  exports: [UkDropdownComponent, UkSelectTrigger],
  entryComponents: [UkDropdownComponent]
})
export class UkDropdownModule {}
