import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UIKitIconsModule } from '../uk-icons/uk-icons.module';

@NgModule({
  imports: [CommonModule, UIKitIconsModule],
  exports: [SidenavComponent],
  declarations: [SidenavComponent]
})
export class UIKitSidenavModule {}
