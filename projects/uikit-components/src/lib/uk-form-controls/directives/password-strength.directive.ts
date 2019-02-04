import { Directive, HostListener, Input } from '@angular/core';
import { UkPasswordStrength } from '../components';

@Directive({
  selector: 'input[ukPasswordStrength]'
})
export class UkPasswordStrengthDirective {
  @Input() ukPasswordStrength: UkPasswordStrength;

  @HostListener('focus')
  onFocus() { this.ukPasswordStrength.show(); }

  @HostListener('blur')
  onBlur() { this.ukPasswordStrength.hide(); }
}
