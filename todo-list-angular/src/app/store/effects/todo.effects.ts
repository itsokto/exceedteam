import {
  TodoActionTypes,
  TodoClearCompletedSuccess,
  TodoCreate,
  TodoCreateSuccess,
  TodoGetSuccess,
} from './../actions/todo.actions';
import { TodosService } from './../../services/todos.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

@Injectable()
export class TodoEffects {
  constructor(private actions: Actions, private todoService: TodosService) {}

  Get = createEffect(() =>
    this.actions.pipe(
      ofType(TodoActionTypes.GET),
      switchMap(() => {
        return this.todoService.get().pipe(
          map((todos) => {
            return new TodoGetSuccess(todos);
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
      })
    )
  );

  Create = createEffect(() =>
    this.actions.pipe(
      ofType(TodoActionTypes.CREATE),
      switchMap((create: TodoCreate) => {
        return this.todoService.create(create.payload).pipe(
          map((todo) => {
            return new TodoCreateSuccess(todo);
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
      })
    )
  );

  ClearCompleted = createEffect(() =>
    this.actions.pipe(
      ofType(TodoActionTypes.CLEAR_COMPLETED),
      switchMap(() => {
        return this.todoService.clearCompleted().pipe(
          map(() => {
            return new TodoClearCompletedSuccess();
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
      })
    )
  );
}
