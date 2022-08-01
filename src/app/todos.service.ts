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

  getTodoList() {
    return this.todoList;
  }

}
