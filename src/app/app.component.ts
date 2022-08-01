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

  constructor(todoInput: ElementRef, todos: TodosService) {

    this.todoInput = todoInput;

    this.todos = todos;
    console.log("siema");
  }

  public onClickAdd() {

    let val = this.todoInput.nativeElement.value;

    this.todos.addTodo(val);
    console.log(this.todos.getTodoList());

    this.todoInput.nativeElement.value = "";
  }


}
