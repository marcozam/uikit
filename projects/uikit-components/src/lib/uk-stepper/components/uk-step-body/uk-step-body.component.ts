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
import { UkStepComponent } from '../uk-step/uk-step.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'uk-step-body',
  templateUrl: './uk-step-body.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'tabpanel',
    'class': 'uk-step-body',
  },
})
export class UkStepBodyComponent implements OnInit, OnDestroy {

  @Input() step: UkStepComponent;

  @ViewChild('templateContent', { read: ViewContainerRef })
  templateContent: ViewContainerRef;

  suscription: Subscription;

  constructor(private _element: ElementRef) { }

  ngOnInit() {
    if (this.step.active) {
      this.templateContent.createEmbeddedView(this.step.content);
    }

    this.suscription = this.step.activeChange.subscribe((active: boolean) => {
      if (active) {
        this.templateContent.createEmbeddedView(this.step.content);
      } else {
        this.templateContent.clear();
      }
    });
  }

  ngOnDestroy() { this.suscription.unsubscribe(); }
}
