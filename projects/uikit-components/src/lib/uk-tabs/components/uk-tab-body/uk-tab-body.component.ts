import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ViewContainerRef,
  ElementRef
} from '@angular/core';
import { UkTabComponent } from '../uk-tab/uk-tab.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'uk-tab-body',
  templateUrl: './uk-tab-body.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'tabpanel',
    'class': 'uk-tab-body'
  },
})
export class UkTabBodyComponent implements OnInit, OnDestroy {

  @Input() tab: UkTabComponent;

  @ViewChild('templateContent', { read: ViewContainerRef })
  templateContent: ViewContainerRef;

  suscription: Subscription;

  constructor(private _element: ElementRef) { }

  ngOnInit() {
    if (this.tab.active) { this.templateContent.createEmbeddedView(this.tab.content); }

    this.suscription = this.tab.activeChange.subscribe((active: boolean) => {
      if (active) {
        this.templateContent.createEmbeddedView(this.tab.content);
      } else {
        this.templateContent.clear();
      }
    });
  }

  ngOnDestroy() { this.suscription.unsubscribe(); }
}
