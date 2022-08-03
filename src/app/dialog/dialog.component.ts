import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {

  // https://dev.to/hssanbzlm/creating-custom-modal-224l
  @Input('message') message: string = '';
  @Output() closeEvent = new EventEmitter();


  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.close();
    }, 1000);
  }

  close() {
    this.closeEvent.emit();
  }

  ngOnDestroy(): void {
    
  }



}
