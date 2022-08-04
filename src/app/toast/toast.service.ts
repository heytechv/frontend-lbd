import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { ToastComponent } from './toast.component';


export const TOAST_MESSAGE_TOKEN = new InjectionToken<string>('TOAST_MESSAGE');
export const TOAST_TYPE_TOKEN = new InjectionToken<string>('TOAST_TYPE');

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  gap_px: number = 0;
  top_px: number = 10;

  private overlayRefList: Array<OverlayRef> = [];


  constructor(private overlay: Overlay) { }

  show(message: string, type?: string) {

    let posY: number = this.top_px;
    if (this.overlayRefList.length > 0) {
      posY = this.overlayRefList[this.overlayRefList.length-1].overlayElement.getBoundingClientRect().bottom + this.gap_px;
    }

    let pos = this.overlay.position().global().top(posY + 'px').right('1em');
    let overlayRef = this.overlay.create({positionStrategy: pos});


    let portalInjector = Injector.create({
      providers: [
        { provide: TOAST_MESSAGE_TOKEN, useValue: message },
        { provide: TOAST_TYPE_TOKEN, useValue: type }
      ]
    })
    let compPortal: ComponentPortal<ToastComponent> = new ComponentPortal(
      ToastComponent,
      null,
      portalInjector);
    overlayRef.attach(compPortal);

    // Update list
    this.overlayRefList.push(overlayRef);

    /* Close after x seconds */
    setTimeout(() => {
      overlayRef.detach();
      overlayRef.dispose();

      // remve from list
      this.overlayRefList.splice(this.overlayRefList.indexOf(overlayRef), 1);
      // move any other notification to top
      this.updatePosOneUp();
    }, 3000); 

  }

  updatePosOneUp() {
    for (let i=0; i<this.overlayRefList.length; i++) {
      let overlayRef: OverlayRef = this.overlayRefList[i];

      let newPos = this.top_px;
      if (i > 0) {
        newPos = this.overlayRefList[i-1].overlayElement.getBoundingClientRect().bottom + this.gap_px;
      }

      let pos = this.overlay.position().global().top(newPos + 'px').right('1em');
      overlayRef.updatePositionStrategy(pos);
    }
  }


}
