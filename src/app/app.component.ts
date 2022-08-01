import { Component, ElementRef, ViewChild } from '@angular/core';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-lbd';

  // input from HTML
  @ViewChild('todoInput') todoInput;
  // service (for storing data)
  todosService: TodosService;
  // todoList from service available here :). It is not callable (its get accessor so just call it as variable! noice)
  get getTodoList() {
    return this.todosService.getTodoList();
  };


  constructor(todoInput: ElementRef, todosService: TodosService) {
    this.todoInput = todoInput;
    this.todosService = todosService;
    console.log("siema");
  }

  public onClickAdd() {
    let val = this.todoInput.nativeElement.value.trim();
    // not empty
    if (!val) return

    // add to list
    this.todosService.addTodo(val);
    console.log(this.todosService.getTodoList());
    // clear
    this.todoInput.nativeElement.value = "";
    // focus
    this.todoInput.nativeElement.focus();
  }


}
