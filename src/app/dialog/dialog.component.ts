import { AfterViewInit, Component, ComponentRef, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy, AfterViewInit {

  // https://dev.to/hssanbzlm/creating-custom-modal-224l

  @ViewChild('dialogElement') dialogElement! : ElementRef;

  // input message
  @Input('message') message: string = '';
  @Input('type') type?: string = 'info';
  // emit close event to parent (Service)
  @Output() closeEvent = new EventEmitter<ComponentRef<DialogComponent>>();
  // this component reference (we will use this for removing message inside Service class)
  public thisComponentRef!: ComponentRef<DialogComponent>;


  constructor() { }
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    /* Dialog style */
    let textAdd  = "Info!";
    let classAdd = "dialog-info";

    switch (this.type) {
      case 'success': case 's'         : { classAdd="dialog-success"; textAdd="Success!"; break; }
      case 'warning': case 'w'         : { classAdd="dialog-warning"; textAdd="Warning!"; break; }
      case 'error'  : case 'e'         : { classAdd="dialog-error"  ; textAdd="Error!"  ; break; }

      case 'info'   : case 'i': default: { classAdd="dialog-info"   ; textAdd="Info!"   ; break; }
    }

    this.dialogElement.nativeElement.innerHTML = "<b>"+textAdd+"</b> " + this.message;
    this.dialogElement.nativeElement.className += " "+classAdd;

    /* Close after x seconds */
    setTimeout(() => {
      this.close();
    }, 3000);    
  }

  close() {
    this.closeEvent.emit(this.thisComponentRef);
  }

  ngOnDestroy(): void { }

}
