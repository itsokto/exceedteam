import { TodosDataService } from './../types/todos-data.service';
import { Todo, TodoStatus } from './../types/todo';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  private dataService: TodosDataService;
  todos: Todo[];

  constructor(dataService: TodosDataService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.todos = this.dataService.get();
  }

  add(text: string): void {
    this.dataService.add(text);
  }

  countTodos(): string {
    const active = this.todos.filter(
      (todo) => todo.status == TodoStatus.Active
    );

    return active.length == 1
      ? `${active.length} item left`
      : `${active.length} items left`;
  }

  clearCompleted(): void {
    this.todos
      .filter((todo) => todo.status == TodoStatus.Done)
      .forEach((todo) => this.todos.splice(this.todos.indexOf(todo), 1));
  }

  toggleAll(toggle: boolean): void {
    this.todos.forEach((todo) => {
      todo.status = toggle ? TodoStatus.Done : TodoStatus.Active;
    });
  }
}
