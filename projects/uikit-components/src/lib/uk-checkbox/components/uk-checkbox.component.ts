import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  Renderer,
  Optional
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { UkBaseFormControl } from '../../uk-common/components';


const NO_FN = () => {
  // Placeholder function
};

@Component({
  selector: 'uk-checkbox',
  templateUrl: './uk-checkbox.component.html',
  exportAs: 'ukCheckbox',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkCheckboxComponent),
      multi: true,
    },
  ],
})
export class UkCheckboxComponent extends UkBaseFormControl<any> implements ControlValueAccessor {
  @Input() id: string;
  @Input() name: string;
  @Input() class: string;
  @Input() value: any;
  @Input() tabindex: string;
  @Input() ariaLabel: string;
  @Input() ariaLabelledby: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() required: boolean;
  get inputId(): string {
    return `chk-${this.id}`;
  }

  onTouched: () => void = NO_FN;
  onChange: (_: any) => void = NO_FN;

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    @Optional() ngControl: NgControl
  ) {
    super(ngControl, 'uk-checkbox');
  }

  // ControlValueAccessor interface implementation
  writeValue(value: any) {
    this.renderer.setElementProperty(
      this.elementRef,
      'checked',
      value === this.elementRef.nativeElement.value
    );
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
