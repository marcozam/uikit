import { Observable } from 'rxjs/Observable';

export interface IUkFormControl {
  isFocused: boolean;
  controlType: string;
  disabled: boolean;
  required: boolean;
  // *NOTE These properties come also from the mixinErrorState, don't think they're needed here
//   invalid: boolean;
//   valid: boolean;
  invalidClass: boolean;
  // *NOTE Remove this property, since don't think is necessary
  // onErrorState$: Observable<boolean>;
  onDisabledChange$: Observable<boolean>;
  // *NOTE: The mixinErrorState is in charge of running this kind of validations
//   isControlValid(): void;
}