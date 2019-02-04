import {
  Component,
  Input,
  forwardRef,
  Renderer,
  ElementRef,
  Optional,
  ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { UkBaseFormControl } from '../../uk-common/components';

const NO_FN = () => {
  // Placeholder function
};

@Component({
  selector: 'uk-radio',
  templateUrl: './uk-radio.component.html',
  exportAs: 'ukRadio',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkRadioComponent),
      multi: true,
    },
  ],
})
export class UkRadioComponent extends UkBaseFormControl<any> implements ControlValueAccessor {
  @Input() id: string;
  @Input() name: string;
  @Input() class: string;
  @Input() tabindex: string;
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledby: string;
  @Input('aria-describedby') ariaDescribedby: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() value: any;
  get inputId(): string {
    return `uk-radio-${this.id}`;
  }

  onTouched: () => void = NO_FN;
  onChange: (_: any) => void = NO_FN;

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    @Optional() ngControl: NgControl
  ) {
    super(ngControl, 'uk-radio');
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
