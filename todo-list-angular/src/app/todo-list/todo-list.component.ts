import { TodosDataService } from '../services/todos-data.service';
import { Todo, TodoFilter } from '../types/todo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  filter: TodoFilter = TodoFilter.All;
  todoText: string;
  todos: Todo[] = [];

  constructor(private dataService: TodosDataService) {}

  ngOnInit(): void {
    this.dataService.get().subscribe((data) => (this.todos = data));
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
    this.dataService
      .create(this.todoText)
      .subscribe((data) => this.todos.push(data));

    this.todoText = '';
  }

  clearCompleted(): void {
    this.dataService.clearCompleted().subscribe();

    this.todos = this.todos.filter((todo) => !todo.isDone);
  }

  toggleAll(toggle: boolean): void {
    this.todos.forEach((todo) => {
      todo.isDone = toggle;
    });

    this.dataService.toggleAll(toggle).subscribe();
  }

  onRemove(todo: Todo): void {
    const index = this.todos.indexOf(todo);

    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }
}
