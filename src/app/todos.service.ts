import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  // todoList: string[] = [];  // first version (list on string)

  todoList : Array<Todo> = [];


  constructor() { }

  addTodo(todo: Todo) {
    this.todoList.push(todo);
  }

  removeTodo(todo: Todo) {
    var index = this.getTodoList().indexOf(todo);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
  }

  getTodoList() {
    return this.todoList;
  }

}
