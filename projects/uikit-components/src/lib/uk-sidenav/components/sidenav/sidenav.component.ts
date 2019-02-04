import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  EventEmitter,
  Output
} from '@angular/core';

import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';

import { MenuItem } from '../../classes/MenuItem';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnChanges {
  @Input() navigationList: MenuItem[];
  @Input() side = 'left';
  @Input() toggle: boolean;
  @Output() toggleChange = new EventEmitter<boolean>();
  constructor(private _router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['navigationList'];
    if (change && change.currentValue) {
      this.navigationList = cloneDeep(change.currentValue);
    }
  }

  onMenuLinkClick(menuItem: MenuItem) {
    menuItem.subMenu
      ? (menuItem.toggleSubMenu = !menuItem.toggleSubMenu)
      : this._router.navigate([menuItem.linkSref]);
  }
  onCloseClick() {
    this.toggleChange.emit(false);
  }
}
