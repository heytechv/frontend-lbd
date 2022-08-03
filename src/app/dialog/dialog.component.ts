import { Component, ComponentRef, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {

  // https://dev.to/hssanbzlm/creating-custom-modal-224l

  // input message
  @Input('message') message: string = '';
  // emit close event to parent (Service)
  @Output() closeEvent = new EventEmitter<ComponentRef<DialogComponent>>();
  // this component reference (we will use this for removing message inside Service class)
  public thisComponentRef!: ComponentRef<DialogComponent>;


  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.closeEvent.emit(this.thisComponentRef);
  }

  ngOnDestroy(): void { }

}
