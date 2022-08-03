import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private componentRef!: ComponentRef<DialogComponent>;


  constructor() { }

  open(entry: ViewContainerRef, message: string) {
    // if (this.componentRef != null) this.close();

    this.componentRef = entry.createComponent(DialogComponent);
    this.componentRef.instance.message = message;
    this.componentRef.instance.closeEvent.subscribe(() => this.close());
  }

  close() {
    this.componentRef.destroy();
  }

}
