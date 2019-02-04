import {
  Input,
  ContentChild,
  Component,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  HostBinding
} from '@angular/core';

// *NOTE Changed UkFormFieldControl for UkBaseFormControl explination:
// 1) Controls should inherit from UkBaseFormControl to have basic functionallity
// 2) Helps DI to find controls that inherits from UkBaseFormControl
import { UkBaseFormControl } from '../../../uk-common/components';
// Directives
import { UkInputDirective, UkSuffix, UkPrefix, UkHint, UkError, UkLabel } from '../../directives';

import { UkFormFieldControl, UkFieldError } from '../../../uk-common/typings';

const NO_CONTROL_FOUND = `No control of type UkBaseFormControl was found inside the uk-form-field.`;

@Component({
  selector: 'uk-form-field',
  exportAs: 'ukFormfield',
  templateUrl: './uk-form-field.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UkFormFieldComponent implements AfterContentInit {

  @Input() hint: string;
  @Input() label: string;
  @Input() fieldName: string;
  @Input() hideLabel: boolean;
  @Input() optionalText = 'Optional';

  @ContentChild(UkBaseFormControl) control: UkBaseFormControl<any> | UkFormFieldControl<any>;
  @ContentChildren(UkError) errorChildren: QueryList<UkError>;
  @ContentChildren(UkHint) hintChildren: QueryList<UkHint>;
  @ContentChildren(UkLabel) labelChildren: QueryList<UkLabel>;
  @ContentChildren(UkPrefix) prefixChildren: QueryList<UkPrefix>;
  @ContentChildren(UkSuffix) suffixChildren: QueryList<UkSuffix>;

  @HostBinding('class.uk-form-field') formFieldClass = true;
  @HostBinding('class.uk-form-field-disabled') disabledClass = this.control.disabled;
  @HostBinding('class.uk-form-field-focus') focusedClass = this.control.disabled;
  @HostBinding('class.uk-form-field-invalid') invalidClass = this.control.invalid && this.control.touched;

  isPassword = false;
  isValueShown = false;
  controlErrors: UkFieldError[];

  constructor(private cdRef: ChangeDetectorRef) { }

  toggleShow() {
    this.isValueShown = !this.isValueShown;
    (this.control as UkInputDirective).type = this.isValueShown ? 'text' : 'password';
  }

  /** ===> Error Handling <=== */
  getDefaultErrors() {
    if (this.control.errors) {
      this.controlErrors = Object.keys(this.control.errors).map(key => this.control.errors[key]);
    }
  }
  get shouldDisplayError(): boolean {
    this.getDefaultErrors();
    return (
      (
        (this.errorChildren && this.errorChildren.length > 0) ||
        (this.controlErrors && this.controlErrors.length > 0)
      ) &&
      (this.control.invalid && this.control.touched)
    );
  }

  /** ===> Angular LifeCycle Hooks <=== */
  ngAfterContentInit() {
    this.validateControl();
    if (this.control.controlType === 'input' || this.control.controlType === 'input-ssn') {
      const inputControl = this.control as UkInputDirective;
      this.isPassword = inputControl.type === 'password';
    }
    // To Update UI
    this.control.statusChange.subscribe(() => { this.cdRef.markForCheck(); });
    this.control.focusedChange.subscribe(() => { this.cdRef.markForCheck(); });
    this.control.valueChange.subscribe(() => { this.cdRef.markForCheck(); });
  }

  /** Throws an error if no control (UkFormFieldControl) is found/contained */
  validateControl(): void {
    if (!this.control) { throw Error(NO_CONTROL_FOUND); }
  }
}
