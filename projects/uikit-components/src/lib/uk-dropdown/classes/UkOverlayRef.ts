import { OverlayRef } from '@angular/cdk/overlay';

export class UkOverlayRef {
  constructor(public overlayRef: OverlayRef) {}

  public close() {
    this.overlayRef.dispose();
  }
}
