import { map, sequenceEqual } from 'rxjs/operators';
import {
  selectTodos,
  selectTodosCount,
  selectTodosActiveCount,
  selectTodosDoneCount,
} from './../store/selectors/todo.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { Todo, TodoFilter } from '../types/todo';
import { Component, OnInit } from '@angular/core';
import { TodoClearCompleted, TodoCreate, TodoGet } from '../store/actions/todo.actions';
import { AppState } from '../store/states/app.states';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  filter: TodoFilter = TodoFilter.All;
  todoText: string;
  todos$: Observable<Todo[]>;
  count$: Observable<number>;
  countActive$: Observable<number>;
  countDone$: Observable<number>;
  countActiveText$: Observable<string>;

  constructor(
    private todosService: TodosService,
    private store: Store<AppState>
  ) {
    this.todos$ = this.store.select(selectTodos);
    this.count$ = this.store.select(selectTodosCount);
    this.countDone$ = this.store.select(selectTodosDoneCount);
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

  isTogglerChecked(): Observable<boolean> {
    return this.countDone$.pipe(sequenceEqual(this.count$));
  }

  isClearCompletedVisible(): Observable<boolean> {
    return this.countDone$.pipe(map((length) => length > 0));
  }

  isTodoVisible(todo: Todo): boolean {
    if (this.filter == TodoFilter.All) return true;
    return this.filter == TodoFilter.Active ? !todo.isDone : todo.isDone;
  }

  add(): void {
    this.store.dispatch(new TodoCreate(this.todoText));

    this.todoText = '';
  }

  clearCompleted(): void {
    this.store.dispatch(new TodoClearCompleted());
  }

  toggleAll(toggle: boolean): void {
    // this.todos.forEach((todo) => {
    //   todo.isDone = toggle;
    // });

    this.todosService.toggleAll(toggle).subscribe();
  }

  onRemove(todo: Todo): void {
    // const index = this.todos.indexOf(todo);
    // if (index >= 0) {
    //   this.todos.splice(index, 1);
    // }
  }
}
