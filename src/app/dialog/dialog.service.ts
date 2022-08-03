import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private componentRef!: ComponentRef<DialogComponent>;


  constructor() { }

  create(entry: ViewContainerRef, message: string, type?: string) {
    // if (this.componentRef != null) this.close();

    this.componentRef = entry.createComponent(DialogComponent);
    this.componentRef.instance.message = message;
    this.componentRef.instance.type = type;
    this.componentRef.instance.thisComponentRef = this.componentRef;
    this.componentRef.instance.closeEvent.subscribe((compCloseRef) => this.close(compCloseRef));
  }

  close(compCloseRef: ComponentRef<DialogComponent>) {
    compCloseRef.destroy();
  }

}
