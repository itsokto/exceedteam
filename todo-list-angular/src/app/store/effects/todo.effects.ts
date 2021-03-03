import {
  TodoActionTypes,
  TodoCheckAll, TodoCheckAllSuccess,
  TodoClearCompletedSuccess,
  TodoCreate, TodoCreateSuccess,
  TodoGetSuccess,
  TodoRemove, TodoRemoveSuccess,
  TodoUpdate, TodoUpdateSuccess,
} from '../actions/todo.actions';
import { TodosService } from '../../services/todos.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';
import { Todo } from '../../types/todo';
import { Update } from '@ngrx/entity';

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

  CheckAll = createEffect(() =>
    this.actions.pipe(
      ofType(TodoActionTypes.CHECK_ALL),
      switchMap((checkAll: TodoCheckAll) => {
        return this.todoService.toggleAll(checkAll.payload).pipe(
          map(() => {
            return new TodoCheckAllSuccess(checkAll.payload);
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
      })
    )
  );

  Update = createEffect(() =>
    this.actions.pipe(
      ofType(TodoActionTypes.UPDATE),
      switchMap((update: TodoUpdate) => {
        const updateTodo: Update<Todo> = {
          id: update.payload.id,
          changes: update.payload
        };
        return this.todoService.update(update.payload).pipe(
          map(() => {
            return new TodoUpdateSuccess(updateTodo);
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
      })
    )
  );

  Remove = createEffect(() =>
    this.actions.pipe(
      ofType(TodoActionTypes.REMOVE),
      switchMap((remove: TodoRemove) => {
        return this.todoService.remove(remove.payload).pipe(
          map((rmTodo) => {
            return new TodoRemoveSuccess(rmTodo);
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
      })
    )
  );
}
