import { map } from 'rxjs/operators';
import {
  AppState,
  selectTodos,
  selectTodosCount,
  selectTodosActiveCount,
} from './../store/states/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { Todo, TodoFilter } from '../types/todo';
import { Component, OnInit } from '@angular/core';
import { TodoGet } from '../store/actions/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  filter: TodoFilter = TodoFilter.All;
  todoText: string;
  todos: Todo[] = [];
  todos$: Observable<Todo[]>;
  count$: Observable<number>;
  countActive$: Observable<number>;
  countActiveText$: Observable<string>;

  constructor(
    private todosService: TodosService,
    private store: Store<AppState>
  ) {
    this.todos$ = this.store.select(selectTodos);
    this.count$ = this.store.select(selectTodosCount);
    this.countActive$ = this.store.select(selectTodosActiveCount);
    this.countActiveText$ = this.countActive$.pipe(
      map((length) =>
        length == 1 ? `${length} item left` : `${length} items left`
      )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new TodoGet());
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
    this.todosService
      .create(this.todoText)
      .subscribe((data) => this.todos.push(data));

    this.todoText = '';
  }

  clearCompleted(): void {
    this.todosService.clearCompleted().subscribe();

    this.todos = this.todos.filter((todo) => !todo.isDone);
  }

  toggleAll(toggle: boolean): void {
    this.todos.forEach((todo) => {
      todo.isDone = toggle;
    });

    this.todosService.toggleAll(toggle).subscribe();
  }

  onRemove(todo: Todo): void {
    const index = this.todos.indexOf(todo);

    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }
}
