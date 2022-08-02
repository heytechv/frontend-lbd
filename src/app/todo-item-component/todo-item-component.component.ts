import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-item-component',
  templateUrl: './todo-item-component.component.html',
  styleUrls: ['./todo-item-component.component.css']
})
export class TodoItemComponentComponent implements OnInit {

  // Input (var passed from parrent app.component.html to this)
  @Input("todoIn") public todo : Todo = {name: "", done: false};

  todosService: TodosService;

  /**
   * Inject todosService
   * @param todosService 
   */
  constructor(todosService: TodosService) {
    this.todosService = todosService;
  }

  /**
   * onInit
   */
  ngOnInit(): void {
  }

  /**
   * Remove element
   * */
  onClickRemoveThis() {
    console.log("Removing "+this.todo.name);
    this.todosService.removeTodo(this.todo);
  }

  /**
   * Update Todo Item status
   * @param event event from html
   */
  checkValue(event: any){
    let state = event.srcElement.checked;
    //update done state
    this.todo.done = state;
    //update date (time)
    this.todo.doneCreated = Date.now();
 }


}
