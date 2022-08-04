import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { TOAST_MESSAGE_TOKEN, TOAST_TYPE_TOKEN } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('toastElement') toastRef!: ElementRef;


  constructor(
    @Inject(TOAST_MESSAGE_TOKEN) private message: string,
    @Inject(TOAST_TYPE_TOKEN)    private type: string) { }

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

    this.toastRef.nativeElement.innerHTML = "<b>"+textAdd+"</b> " + this.message;
    this.toastRef.nativeElement.className += " "+classAdd;

  }

  ngOnDestroy(): void { }
}
