
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// UI Kit
import { UIKitIconsModule } from '../uk-icons/uk-icons.module';
import { UIKitCommonModule } from '../uk-common/uk-common.module';
// Components
import {
    UkFormFieldComponent,
    UkPasswordStrength
} from './components';
// Directives
import {
    UkHint,
    UkLabel,
    UkError,
    UkPrefix,
    UkSuffix,
    UkInputDirective,
    UkPasswordStrengthDirective,
    UkCurrencyDirective,
    UkSSNDirective,
    UkDateDirective
 } from './directives';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UIKitIconsModule,
        UIKitCommonModule
    ],
    declarations: [
        UkFormFieldComponent,
        UkPasswordStrength,
        UkHint,
        UkLabel,
        UkError,
        UkPrefix,
        UkSuffix,
        UkInputDirective,
        UkPasswordStrengthDirective,
        UkCurrencyDirective,
        UkSSNDirective,
        UkDateDirective
    ],
    exports: [
        UkFormFieldComponent,
        UkPasswordStrength,
        UkHint,
        UkLabel,
        UkError,
        UkPrefix,
        UkSuffix,
        UkInputDirective,
        UkPasswordStrengthDirective,
        UkCurrencyDirective,
        UkSSNDirective,
        UkDateDirective,
    ],
    entryComponents: [
        UkPasswordStrength
    ]
})
export class UkFormControlsModule { }
