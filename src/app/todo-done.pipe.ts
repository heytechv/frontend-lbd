import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo';

@Pipe({
  name: 'todoShouldBeDone',
  pure: false
})
export class TodoDonePipe implements PipeTransform {

  transform(todoList: Array<Todo>, shouldBeDone: boolean): Array<Todo> {
    // list we return
    let todoListFiltered: Array<Todo>  = [];

    for (let todo of todoList) {
      if (todo.done == shouldBeDone)
        todoListFiltered.push(todo);
    }

    return todoListFiltered;
  }

}
