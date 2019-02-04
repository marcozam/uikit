import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkTooltipDirective } from './directives/uk-tooltip.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        UkTooltipDirective
    ],
    exports: [
        UkTooltipDirective
    ]
})
export class UIKitTooltipModule {}
