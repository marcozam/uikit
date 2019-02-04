import { OnInit, Optional, Input, Output, EventEmitter, HostBinding, ChangeDetectorRef } from '@angular/core';
import { NgControl } from '@angular/forms';
// Helpers
import { onUKFormControlOnInit } from '../../helpers';
import { coerceBooleanProperty } from '../../../helpers/boolean';
// Mixins
import { UkFocusable, UkErrorState, mixinErrorState, UkTouchable, mixinTouchable } from '../../behaviors';
// Typings
import { UkFormFieldControl, UkBaseFormFieldControl } from '../../typings';
// Components
import { UkGroupComponent, UkChildItemComponent } from '.';

const NO_FN = () => { };

export class UkGenericFormGroupComponent<T extends UkChildItemComponent> 
    extends UkGroupComponent<T> implements UkBaseFormFieldControl<any> {
    constructor(public ngControl: NgControl, public componentName: string, cdr: ChangeDetectorRef) { 
      super(componentName, cdr);
    }
}

export const _UkGenericFormGroupMixin = mixinTouchable(mixinErrorState(UkGenericFormGroupComponent));

export abstract class UkFormGroupComponent<T extends UkChildItemComponent>
  extends _UkGenericFormGroupMixin<T>
  implements UkFormFieldControl<any>, UkErrorState, UkTouchable, UkFocusable, OnInit {

  private _required = false;
  private _focused = false;
  private _value: any;
  protected _disabled = false;
  protected onModelChange: Function;
  onControlTouched: Function;

  constructor(@Optional() ngControl: NgControl, componentName: string, cdr: ChangeDetectorRef) {
    super(ngControl, componentName, cdr);
    // To Manage NgModel
    if (this.ngControl) { this.ngControl.valueAccessor = this;
    } else {
       this.onModelChange = NO_FN;
       this.onControlTouched = NO_FN;
    }
  }

  @Output() disabledChange: EventEmitter<boolean> = new EventEmitter();
  @Output() focusedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() valueChange: EventEmitter<T> = new EventEmitter();

  onClick(event: MouseEvent): void { /*throw new Error("Method not implemented.");*/ }

  /** ===> Manages UI <=== */
  @HostBinding('class.uk-invalid')
  get invalidClass(): boolean { return this.invalid && this.touched; }

  /** ===> Manage Required <=== */
  @Input() // @HostBinding('attr.required') => Find a way to set attribute
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    if (value !== this._required) { this._required = value; }
  }

  /** ===> Manage Disable State <=== */
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = coerceBooleanProperty(value);
      this.disabledChange.emit(this.disabled);
    }
  }

  /** ===> Manage Focus <=== */
  @Input()
  get focused() { return this._focused; }
  set focused(value: boolean) {
      if (value !== this._focused) {
        if (this._focused) { this.touchControl(); }
        this._focused = coerceBooleanProperty(value);
        this.focusedChange.emit(this.focused);
      }
  }

  /** ===> Angular LifeCycle Hooks <=== */
  ngOnInit() { onUKFormControlOnInit(this); }

  /** ===> Manage Value <=== */
  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (value !== this.value) {
      this.setValue(value);
      this.setNgValue(value);
    }
  }
  private setValue(value: T) {
    this._value = value;
    this.valueChange.emit(this.value);
  }
  setNgValue(value: any) { if(this.onModelChange) { this.onModelChange(value); } }

  /** ===> ControlValueAccessor <=== */
  writeValue(value: any): void { this.setValue(value); }
  registerOnChange(fn: Function): void { this.onModelChange = fn; }
  registerOnTouched(fn: Function): void { this.onControlTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}
