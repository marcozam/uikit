import {
  Component,
  forwardRef,
  Directive,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  Optional,
  Self,
  Input,
  HostListener,
  QueryList,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs/operators';
// Components
import { UkFormGroupComponent, UkBaseFormControl, UkOptionComponent } from '../../uk-common/components';

import {
  DOWN_ARROW,
  ENTER,
  SPACE,
  UP_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  ESCAPE
} from '@angular/cdk/keycodes';

import { IS_SYSTEM_KEY } from '../../helpers/keys';

@Directive({selector: 'uk-dropdown-trigger'})
export class UkSelectTrigger { }
@Component({
  selector: 'uk-dropdown',
  templateUrl: './uk-dropdown.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
      provide: UkBaseFormControl,
      useExisting: forwardRef(() => UkDropdownComponent)
  }],
  host: {
    class: 'uk-dropdown uk-input',
    role: 'listbox',
    '[attr.tabindex]': 'tabindex',
    '[attr.aria-label]': '_ariaLabel',
    '[attr.aria-labelledby]': 'ariaLabelledby',
    '[attr.aria-describedby]': 'ariaDescribedby || null',
    '[class.disabled]': 'disabled',
  }
})
export class UkDropdownComponent extends UkFormGroupComponent<UkOptionComponent> {

  private _hasPendingChange = false;
  // Scroll helpers
  itemHeight: number;
  visibleItems: number;

  isMenuOpen = false;
  viewValue: string;

  /* ===> Overlay <=== */
  _triggerRect: ClientRect;
  _triggerFontSize = 0;

  constructor(@Self() @Optional() ngControl: NgControl, cdRef: ChangeDetectorRef) {
    super(ngControl, 'dropdown', cdRef);
    // Key Navigation
    this.fowardKeys = [DOWN_ARROW, RIGHT_ARROW];
    this.backKeys = [UP_ARROW, LEFT_ARROW];

    this._selectedIndex = -1;
    this.itemHeight = 68;
    this.visibleItems = 4;

    // Listen for Selection Changes
    this.onSelectionChange.pipe(map(event => event.source)).subscribe(_item => { 
        const item = <UkOptionComponent>_item;
        this.value = item.value;
        this.viewValue = item.viewValue;
        this.close();
        cdRef.markForCheck();
      });

    // Update UI on Value Change
    this.valueChange.subscribe(() => this.selectOption());
  }

  /** ===> On Items Change <=== */
  proccessItems(list: QueryList<UkOptionComponent>) {
    super.proccessItems(list);
    if(this._hasPendingChange) { this.selectOption();  }
  }
  selectOption(){
    if(this.value && this._items  && this._items.length > 0) {
      this._hasPendingChange = false;
      const _nSitem = this._items.find(i => i.value === this.value);
      if(_nSitem) { this.select(_nSitem); }
    }
    if(!this._items) { this._hasPendingChange = true; }
  }

  /** ===> Manage Focus <=== */
  @HostListener('focus')
  onInputFocus() { this.focused = true; }
  @HostListener('blur')
  onInputBlur() { this.focused = false; }

  /** ===> Manage UI <=== */
  get _ariaLabel(): string {
    return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
  }

  @Input() placeholder: string;
  @Input('aria-labelledby') ariaLabelledby: string;
  @Input('aria-label') ariaLabel: string;
  @Input('ariaDescribedby') ariaDescribedby: string;
  @Input('tabindex') tabindex: string = '0';
  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild('panel') panel: ElementRef;

  /** ===> HTML Events Bindings <=== */
  @HostListener('keydown', ['$event'])
  _keyDown(event: KeyboardEvent) {
    if (this.disabled) return;
    this._handleKeydown(event);
  }

  /** ===> Manage Menu Visibility <=== */
 toggle() {
    if (this.disabled) return;
    this.isMenuOpen ? this.close() : this.open();
  }
  open() {
    this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
    this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
    this.isMenuOpen = true;
  }
  close() { if (this.isMenuOpen) { this.isMenuOpen = false; } }

  /** ===> Overriding navigate functionality <=== */
  navigate(event: KeyboardEvent, select: boolean = false) {
    if (this.isMenuOpen) {
      const minHeight = this.itemHeight * Math.floor(this.visibleItems / 2);
      const currentHeight = this.itemHeight * (this.selectedIndex + 1);
      if (minHeight < currentHeight) {
        this.panel.nativeElement.scrollTop = currentHeight - minHeight;
      } else {
        this.panel.nativeElement.scrollTop = 0;
      }
    }
    super.navigate(event, select);
  }

  // ===> Manage HTML Events <===
  private _handleKeydown(event: KeyboardEvent): void {
    if (!IS_SYSTEM_KEY(event.keyCode, event)) event.preventDefault();
    this.isMenuOpen ? this._handleOpenKeyDown(event) : this._handleClosedKeyDown(event);
  }

  private _handleClosedKeyDown(event: KeyboardEvent) {
    const keycode = event.keyCode;
    const isOpenKey = keycode === ENTER || keycode === SPACE;
    if (isOpenKey) {
      event.preventDefault();
      this.open();
    } else {
      this.navigate(event, true);
    }
  }

  private _handleOpenKeyDown(event: KeyboardEvent) {
    const keycode = event.keyCode;
    event.preventDefault();

    switch (keycode) {
      case DOWN_ARROW:
      case LEFT_ARROW:
      case RIGHT_ARROW:
      case UP_ARROW: {
        this.navigate(event);
        break;
      }
      case ENTER: {
        this.selectCurrect();
        break;
      }
      case ESCAPE: {
        this.close();
        break;
      }
    }
  }
}

