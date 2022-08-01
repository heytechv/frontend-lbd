import { Component, ElementRef, ViewChild } from '@angular/core';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-lbd';

  @ViewChild('todoInput') todoInput;

  public todos: TodosService;

  // It is not callable (its get accessor so just call it as variable! noice)
  get getTodoList() {
    return this.todos.getTodoList();
  };


  constructor(todoInput: ElementRef, todos: TodosService) {

    this.todoInput = todoInput;

    this.todos = todos;
    console.log("siema");
  }

  public onClickAdd() {
    let val = this.todoInput.nativeElement.value;
    // not empty
    if (!val) return

    // add to list
    this.todos.addTodo(val);
    console.log(this.todos.getTodoList());
    // clear
    this.todoInput.nativeElement.value = "";
    // focus
    this.todoInput.nativeElement.focus();
  }


}
