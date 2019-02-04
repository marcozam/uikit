import { AfterContentInit, Input, ContentChildren, QueryList, HostListener, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
// Components
import { UkGenericComponent } from './uk-generic.component';
import { UkChildItemComponent } from './uk-child-item.component';
import { KEY_CODE } from '../../../helpers/keys';

export class UkSelectionChange {
  constructor(public source: UkChildItemComponent, public isUserInput = false) { }
}

// tslint:disable-next-line:max-classes-per-file
export abstract class UkGroupComponent<T extends UkChildItemComponent>
  extends UkGenericComponent
  implements AfterContentInit {
  protected _selectedIndex = 0;
  protected fowardKeys: KEY_CODE[] = [KEY_CODE.RIGHT_ARROW];
  protected backKeys: KEY_CODE[] = [KEY_CODE.LEFT_ARROW];

  constructor(componentName: string, private cdr: ChangeDetectorRef) { super(componentName); }

  @Input()
  get selectedIndex(): number { return this._selectedIndex; }
  set selectedIndex(value) {
    if (value >= 0 && value < this._items.length) {
      if (this._selectedIndex >= 0) {
        const currentItem = this._items.find(item => item.index === this._selectedIndex);
        currentItem.selected = false;
      }
      this._selectedIndex = value;
      const newItem = this._items.find(item => item.index === this._selectedIndex);
      newItem.selected = true;
    }
  }

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectionChange = new EventEmitter<UkSelectionChange>();
  @ContentChildren(UkChildItemComponent) _items: QueryList<T>;

  @HostListener('keydown', ['$event'])
  keyNavigation(event: KeyboardEvent, index: number, item: UkChildItemComponent ) {
    event.keyCode === KEY_CODE.ENTER ? this.selectCurrect() : this.navigate(event);
    event.stopPropagation();
  }

  protected selectCurrect() { this.selectIndex(this.selectedIndex, true); }
  protected moveIndex(steps: number) { this.selectedIndex = this.selectedIndex + steps; }
  protected move(positions: number) {
    this.moveIndex(positions);
    this.selectCurrect();
  }

  next() { this.move(1); }
  previous() { this.move(-1); }

  select(item: T, isUserInput: boolean = false, toogle: boolean = false) {
    if (!item.disabled) {
      const currentItem = this._items.find(_item => _item.active);

      if (currentItem !== item) {
        if (currentItem) {
          currentItem.active = false;
          currentItem.selected = false;
        }
        item.active = true;
        this._selectedIndex = item.index;
        this.onSelectionChange.emit(new UkSelectionChange(item, isUserInput));
      } else if (toogle) {
        item.active = !item.active;
      }
    }
  }

  navigate(event: KeyboardEvent, select: boolean = false) {
    const keyCode = event.keyCode;
    const isFoward = this.fowardKeys.indexOf(keyCode) >= 0;
    const isBack = this.backKeys.indexOf(keyCode) >= 0;
    if (isFoward || isBack) {
      this.moveIndex(isBack ? -1 : 1);
      if (select) { this.selectCurrect(); }
      event.preventDefault();
    }
  }

  selectIndex(index: number, isUserInput: boolean) {
    const currentItem = this._items.find(item => item.index === index);
    if (currentItem) { this.select(currentItem, isUserInput); }
  }

  proccessItems(list: QueryList<T>) {
    list.forEach((item, idx) => {
      item.index = idx;
      item.selectedChange.subscribe(_selected => {
        if (_selected) { this.select(item, true); }
      });
    });
    // Selects current index
    // this.selectIndex(this.selectedIndex, false);
  }

  // Angular LifeCycle Hooks
  ngAfterContentInit() {
    this._items.changes.subscribe(list => {
      this.proccessItems(list);
      this.cdr.markForCheck();
    });
    this.proccessItems(this._items);
  }
}
