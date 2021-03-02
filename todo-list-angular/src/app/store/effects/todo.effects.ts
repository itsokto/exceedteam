import { TodoActionTypes, TodoGetSuccess } from './../actions/todo.actions';
import { TodosService } from './../../services/todos.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { of, throwError } from 'rxjs';

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
}
