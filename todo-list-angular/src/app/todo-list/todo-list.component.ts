import { TodosDataService } from '../services/todos-data.service';
import { Todo, TodoFilter } from '../types/todo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  filter: TodoFilter;
  todoText: string;
  todos: Todo[];

  constructor(private dataService: TodosDataService) {
    this.filter = TodoFilter.All;
  }

  ngOnInit(): void {
    this.todos = this.dataService.get();
  }

  get activeTodosCount(): string {
    const length = this.todos.filter((todo) => !todo.isDone).length;

    return length == 1 ? `${length} item left` : `${length} items left`;
  }

  get isTogglerChecked(): boolean {
    return this.todos.every((todo) => todo.isDone);
  }

  get isClearCompletedVisible(): boolean {
    return this.todos.some((todo) => todo.isDone);
  }

  isTodoVisible(todo: Todo): boolean {
    if (this.filter == TodoFilter.All) return true;
    return this.filter == TodoFilter.Active ? !todo.isDone : todo.isDone;
  }

  add(): void {
    this.dataService.add(this.todoText);
    this.todoText = '';
  }

  clearCompleted(): void {
    this.dataService.clearCompleted();
  }

  toggleAll(toggle: boolean): void {
    this.todos.forEach((todo) => {
      todo.isDone = toggle;
    });
  }
}
