import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  HostListener,
  ChangeDetectorRef,
  HostBinding,
  QueryList
} from '@angular/core';
import { UkTabComponent } from '../uk-tab/uk-tab.component';
import { UkGroupComponent } from '../../../uk-common/components/abstracts/uk-group.component';

export type UKTabAlign = 'left' | 'right' | 'center';
export type UKTabType = 'full' | 'normal';
export type UKTabBehaviour = 'tabs' | 'accordion';

@Component({
  selector: 'uk-tabs-group',
  templateUrl: './uk-tabs-groups.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UkTabsGroupsComponent extends UkGroupComponent<UkTabComponent> implements OnInit {

  @Input() desktopBehaviour: UKTabBehaviour = 'tabs';
  @Input() mobileBehaviour: UKTabBehaviour = 'accordion';
  @Input() align: UKTabAlign = 'center';
  // TODO: Change default to normal
  @Input() type: UKTabType = 'full';

  @HostBinding('class') get hostClasses(): string {
    return [ 'uk-tab-group', this.type, this.behaviour ].join(' ');
  }

  // this should be on a global varible
  private mobileWidth: number = 768;
  behaviour: UKTabBehaviour;
  private _isDesktop: boolean = false;
  get isDesktop(): boolean { return this._isDesktop; }
  set isDesktop(value: boolean) { 
    this._isDesktop = value;
    this.behaviour = this.isDesktop ? this.desktopBehaviour : this.mobileBehaviour;
  }

  // Listen for window resize to change Tab behaviour
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = this.mobileWidth <= event.target.innerWidth;
  }

  constructor(cdr: ChangeDetectorRef) { super('tabs-group', cdr); }

  ngOnInit() { this.isDesktop = this.mobileWidth <= window.innerWidth; }

  proccessItems(list: QueryList<UkTabComponent>) {
    super.proccessItems(list);
    if(this.behaviour === 'tabs') {
      // Selects current index
      this.selectIndex(this.selectedIndex, false);
    }

  }
}
