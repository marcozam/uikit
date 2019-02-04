import { Injectable, ElementRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
// import { ComponentPortal } from '@angular/cdk/portal';
import { UkOverlayRef } from '../classes/UkOverlayRef';
// import { UkDropdownComponent } from './../components/uk-dropdown.component';

@Injectable()
export class UkDropdownOverlayService {
  /**
   *
   * @param _overlay Overlay Service
   */
  constructor(private _overlay: Overlay) {}

  public open(dropdownElement: ElementRef): UkOverlayRef {
    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this._overlay.create();
    // Create ComponentPortal that can be attached to a PortalHost
    // const dropdownPortal = new ComponentPortal(UkDropdownComponent);
    // Attach ComponentPortal to PortalHost
    const ukOverlay = new UkOverlayRef(overlayRef);

    return ukOverlay;
  }

  // public generateOverlayConfig(element: ElementRef): OverlayConfig {
  //   const positionStrategy = this._overlay
  //     .position()
  //     .connectedTo(
  //       element.nativeElement,
  //       { originX: 'center', originY: 'bottom' },
  //       { overlayX: 'start', overlayY: 'top' }
  //     )
      

  //   const scrollStrategy = this._overlay.scrollStrategies.block();

  //   return {
  //     panelClass: 'uk-dropdwon',
  //     maxWidth: '600px',
  //     width: '300px',
  //     hasBackdrop: true,
  //     scrollStrategy,
  //     positionStrategy
  //   };
  // }
}
