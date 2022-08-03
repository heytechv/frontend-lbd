import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
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

  /* dialog container */
  @Output("createDialog") createDialogEvent = new EventEmitter;

  /**
   * Inject todosService
   * @param todosService 
   */
  constructor(todosService: TodosService, private dialogService: DialogService) {
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

    this.createDialogEvent.emit({message: "Usunięto '"+this.todo.name+"'"})
  }

  /**
   * Update Todo Item status
   * @param event event from html
   */
  checkValue(event: any) {
    let state = event.srcElement.checked;
    //update done state
    this.todo.done = state;
    //update date (time)
    this.todo.doneCreated = undefined;
    if (state) {
      this.todo.doneCreated = Date.now();

      this.createDialogEvent.emit({message: "Zaznaczono '"+this.todo.name+"' jako zrobione"});
    } else {
      this.createDialogEvent.emit({message: "Zaznaczono '"+this.todo.name+"' jak do zrobienia"});
    }

    
 }

}
