import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
import { ToastService } from './toast/toast.service';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
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
   *  this.todosService oraz this.dialogService
   */
  constructor(private todosService: TodosService, private dialogService: DialogService, private toastService: ToastService) { }

  /**
   * After View is loaded
   */
  ngAfterViewInit(): void {
    // focus
    this.todoInput.nativeElement.focus();
  }

  /* On Enter Click inside Input */
  public onEnterInput() {
    this.onClickAdd();
  }

  /* On Add Button Click */
  public onClickAdd() {
    let val:string = this.todoInput.nativeElement.value.trim();
    // not empty
    if (!val) {
      this.toastService.show("Nazwa nie może być pusta", "e");  // doesn't require any additional html :)
      return;
    }
    if (val.length < 5) {
      this.toastService.show("Nazwa jest zbyt krótka", "error");  // doesn't require any additional html :)
      return;
    }

    // add to list
    this.todosService.addTodo({name: val, done: false});
    // clear
    this.todoInput.nativeElement.value = "";
    // focus
    this.todoInput.nativeElement.focus();

    // show dialog
    this.toastService.show("Dodano nowy task '"+val+"'", 'success');  // doesn't require any additional html :)
  }

}
