import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UK_ICONS_PATH } from './icons-path.token';

import { UkIconDirective } from './directives/uk-icons.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [UkIconDirective],
  exports: [UkIconDirective]
})
export class UIKitIconsModule {
  static forRoot(iconsPath: string): ModuleWithProviders {
    return {
      ngModule: UIKitIconsModule,
      providers: [{ provide: UK_ICONS_PATH, useValue: iconsPath }]
    };
  }
}
