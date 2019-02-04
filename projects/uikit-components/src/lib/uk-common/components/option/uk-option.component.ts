import {
  ViewEncapsulation,
  ElementRef,
  forwardRef,
  isDevMode,
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { UkChildItemComponent } from '../abstracts';

@Component({
  selector: 'uk-option',
  templateUrl: './uk-option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  /*
  host: {
    'role': 'option',
    '[id]': 'id',
    '(click)': 'optionClicked()',
    'class': 'uk-option',
  },
  */
  providers: [{
    provide: UkChildItemComponent,
    useExisting: forwardRef(() => UkOptionComponent)
  }],
})
export class UkOptionComponent extends UkChildItemComponent implements OnInit {
  get viewValue(): string { return (this.getHostElement().textContent || '').trim(); }

  constructor(private element: ElementRef) { super('option'); }

  @Input() value: any;

  /** Gets the host DOM element. */
  private getHostElement(): HTMLElement { return this.element.nativeElement; }
  optionClicked(): void { if (!this.disabled) { this.selected = true; } }

  // Angular LifeCycle Hooks
  ngOnInit() {
    if (!this.value && isDevMode()) {
      // Warn user but set the viewValue as value
      console.warn(`Value attribute is required otherwise select option "${this.viewValue}" never will be active`);
    }
  }
}
