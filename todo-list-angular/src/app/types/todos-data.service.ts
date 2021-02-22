import { Todo, TodoStatus } from './todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosDataService {
  private todos: Todo[] = [];

  add(text: string) {
    this.todos.push(new Todo(text, TodoStatus.Active));
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index != -1) {
      this.todos.splice(index, 1);
    }
  }

  get() {
    return this.todos;
  }
}
