import { Input, HostBinding, Optional, OnInit, EventEmitter, Output } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';
// Components
import { UkGenericComponent } from './uk-generic.component';
// Typings
import { UkFormFieldControl, UkBaseFormFieldControl  } from '../../typings';
// Helpers
import { onUKFormControlOnInit } from '../../helpers';
import { coerceBooleanProperty } from '../../../helpers/boolean';
// Behaviors Contracts and Mixins
import { 
  UkFocusable, 
  UkCanDisabled, 
  UkErrorState, 
  UkTouchable,
  mixinErrorState, 
  mixinTouchable
} from '../../behaviors';

const NO_FN = () => { };

// ===> Manage Status <===
export class _UkBaseFormControl<T>
  extends UkGenericComponent implements UkBaseFormFieldControl<T> {
  constructor(public ngControl: NgControl, public componentName: string) { 
    super(componentName);
  }
}

export const _UkBaseFormControlMixin = mixinTouchable(mixinErrorState(_UkBaseFormControl));

export abstract class UkBaseFormControl<T> extends _UkBaseFormControlMixin<T>
  implements OnInit, ControlValueAccessor,
  UkFormFieldControl<T>, UkErrorState, UkTouchable, UkFocusable, UkCanDisabled {

  constructor(@Optional() public ngControl: NgControl, componentName: string) {
    super(ngControl, componentName);
    // To Manage NgModel
    if (this.ngControl) { this.ngControl.valueAccessor = this;
    } else {
       this.onModelChange = NO_FN;
       this.onControlTouched = NO_FN;
    }
  }

  onClick(event: MouseEvent): void {
    // throw new Error("Method not implemented.");
  }

  // ===> Manages UI <===
  @HostBinding('class.uk-invalid')
  get invalidClass(): boolean { return this.invalid && this.touched; };

  // ===> Manage Required <===
  private _required = false;
  @Input() // @HostBinding('attr.required') => Find a way to set attribute
  get required(): boolean { return this._required };
  set required(value: boolean) { 
    if (value !== this._required) { this._required = value; }
  };

  // ===> Manage Disable State <===
  protected _disabled = false;
  @Output() disabledChange: EventEmitter<boolean> = new EventEmitter();
  @Input() // @HostBinding('attr.disabled') => Find a way to set attribute
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = coerceBooleanProperty(value);
      this.disabledChange.emit(this.disabled);
    }
  }

  // ===> Manage Focus <===
  private _focused = false;
  @Output() focusedChange: EventEmitter<boolean> = new EventEmitter();
  @Input()
  get focused() { return this._focused; }
  set focused(value: boolean) { 
      if (value !== this._focused) {
        if (this._focused) { this.touchControl(); }
        this._focused = coerceBooleanProperty(value);
        this.focusedChange.emit(this.focused);
      }
  }

  // ===> Angular LifeCycle Hooks <===
  ngOnInit() { onUKFormControlOnInit(this); }

  // ===> Manage Value <===
  private _value: T;
  @Output() valueChange: EventEmitter<T> = new EventEmitter();
  @Input()
  get value(): T { return this._value; }
  set value(value: T) {
    if (value !== this.value) { 
      this.setValue(value);
      this.setNgValue(value);
    }
  }
  
  setValue(value: T) {
    this._value = value;
    this.checkErrors();
    this.valueChange.emit(this.value);
  }
  setNgValue(value: T) { if(this.onModelChange) { this.onModelChange(value); } }

  // ===> ControlValueAccessor <===
  protected onModelChange: Function;
  onControlTouched: Function;
  writeValue(value: T): void { this.setValue(value); }
  registerOnChange(fn: Function): void { this.onModelChange = fn; }
  registerOnTouched(fn: Function): void { this.onControlTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}
