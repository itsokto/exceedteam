import { Todo } from '../types/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosDataService {
  private todos: Todo[] = [];

  add(text: string) {
    if (text.trim() === '') {
      return;
    }
    this.todos.push(new Todo(text));
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index != -1) {
      this.todos.splice(index, 1);
    }
  }

  clearCompleted() {
    this.todos
      .filter((todo) => todo.isDone)
      .forEach((done) => this.todos.splice(this.todos.indexOf(done), 1));
  }

  get() {
    return this.todos;
  }
}
