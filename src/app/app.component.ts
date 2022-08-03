import { Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
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
  @ViewChild('todoInput') todoInput;
  /* service (for storing data) */
  todosService: TodosService;
  /* todoList from service available here :). It is not callable (its 'get' accessor so just call it as variable! noice) */
  get getTodoList() {
    return this.todosService.getTodoList();
  };
  /* notifyContainer */
  @ViewChild('dialog', {read:ViewContainerRef}) dialogEntry!: ViewContainerRef;


  constructor(todoInput: ElementRef, todosService: TodosService, private dialogService: DialogService) {
    this.todoInput = todoInput;
    this.todosService = todosService;
    console.log("siema");
  }

  public onEnterInput() {
    this.onClickAdd();
  }

  public onClickAdd() {
    let val = this.todoInput.nativeElement.value.trim();
    // not empty
    if (!val) return;

    // add to list
    this.todosService.addTodo({name: val, done: false});
    console.log(this.todosService.getTodoList());
    // clear
    this.todoInput.nativeElement.value = "";
    // focus
    this.todoInput.nativeElement.focus();

    this.createDialog("XDDD");
  }

  createDialog(message: string) {
    this.dialogService.open(this.dialogEntry, message);
  }

}
