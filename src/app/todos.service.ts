import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todoList: string[] = [];

  constructor() { }


  addTodo(todo: string) {
    this.todoList.push(todo);
  }

  getTodoList() {
    return this.todoList;
  }


}
