import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// UI Kit
import { UIKitCommonModule } from '../uk-common/uk-common.module';
// Components
import { UkTabsGroupsComponent } from './components/uk-tabs-groups/uk-tabs-groups.component';
import { UkTabComponent } from './components/uk-tab/uk-tab.component';
import { UkTabBodyComponent } from './components/uk-tab-body/uk-tab-body.component';

@NgModule({
  imports: [
    CommonModule,
    UIKitCommonModule
  ],
  declarations: [
    UkTabsGroupsComponent,
    UkTabComponent,
    UkTabBodyComponent,
  ],
  exports: [
    UkTabsGroupsComponent,
    UkTabComponent
  ]
})
export class UIKitTabsModule { }
