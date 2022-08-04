import { Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
import { ToastService } from './toast/toast.service';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'frontend-lbd';

  /* input element from HTML (tagget with #todoInput) */
  @ViewChild('todoInput') todoInput! : ElementRef;

  /* todoList from service available here :). It is not callable (its 'get' accessor so just call it as variable! noice) */
  get getTodoList() {
    return this.todosService.getTodoList();
  };
  
  /* dialog container */
  @ViewChild('dialog', {read:ViewContainerRef}) dialogEntry!: ViewContainerRef;


  /** Constructor
   * private pozwala wstrzyknac instancje klas oraz od razu stworzyc zmienna prywatna, tutaj przykladowo:
   *  this.todosService oraz this.dialogService */
  constructor(private todosService: TodosService, private dialogService: DialogService, private toastService: ToastService) { }

  /* On Enter Click inside Input */
  public onEnterInput() {
    this.onClickAdd();
  }

  /* On Add Button Click */
  public onClickAdd() {
    let val:string = this.todoInput.nativeElement.value.trim();
    // not empty
    if (!val) {
      this.createDialog("Nazwa nie może być pusta", "e");
      return;
    }
    if (val.length < 5) {
      this.createDialog("Nazwa jest zbyt krótka", "error");
      return;
    }


    // add to list
    this.todosService.addTodo({name: val, done: false});
    // clear
    this.todoInput.nativeElement.value = "";
    // focus
    this.todoInput.nativeElement.focus();

    // show dialog
    this.createDialog("Dodano nowy task '"+val+"'", 'success');
  }

  /**
   * Create Dialog
   * @param message message to show inside Dialog
   * @param type? success/warning/error/info
   */
  createDialog(message: string, type?: string) {
    // this.dialogService.create(this.dialogEntry, message, type);

    this.toastService.show(message, type);


  }

}
