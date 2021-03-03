import { map } from 'rxjs/operators';
import {
  selectTodosByFilter,
  selectTodosCount,
  selectTodosActiveCount,
  selectTodosDoneCount,
} from '../store/selectors/todo.selectors';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { Todo } from '../types/todo';
import { Component, OnInit } from '@angular/core';
import { TodoCheckAll, TodoClearCompleted, TodoCreate, TodoGet } from '../store/actions/todo.actions';
import { AppState } from '../store/states/app.states';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
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
    this.todos$ = this.store.select(selectTodosByFilter);
    this.count$ = this.store.select(selectTodosCount);
    this.countDone$ = this.store.select(selectTodosDoneCount);
    this.countActive$ = this.store.select(selectTodosActiveCount);
    this.countActiveText$ = this.countActive$.pipe(
      map((length) =>
        length === 1 ? `${length} item left` : `${length} items left`
      )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new TodoGet());
  }

  isMarkAllChecked(): Observable<boolean> {
    return combineLatest([this.countDone$, this.count$]).pipe(map(([countDone, totalCount]) => countDone === totalCount));
  }

  isClearCompletedVisible(): Observable<boolean> {
    return this.countDone$.pipe(map((length) => length > 0));
  }

  create(): void {
    this.store.dispatch(new TodoCreate(this.todoText));

    this.todoText = '';
  }

  clearCompleted(): void {
    this.store.dispatch(new TodoClearCompleted());
  }

  checkAll(toggle: boolean): void {
    this.store.dispatch(new TodoCheckAll(toggle));
  }
}
