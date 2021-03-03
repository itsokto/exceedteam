import { Action } from '@ngrx/store';
import { Todo } from 'src/app/types/todo';

export enum TodoActionTypes {
  GET = '[Todo] Get',
  GET_SUCCESS = '[Todo] Get Success',
  CREATE = '[Todo] Create',
  CREATE_SUCCESS = '[Todo] Create Success',
  CLEAR_COMPLETED = '[Todo] Clear Completed',
  CLEAR_COMPLETED_SUCCESS = '[Todo]  Clear Completed',
}

export class TodoGet implements Action {
  readonly type = TodoActionTypes.GET;
}

export class TodoGetSuccess implements Action {
  readonly type = TodoActionTypes.GET_SUCCESS;

  constructor(public payload: Todo[]) {}
}

export class TodoCreate implements Action {
  readonly type = TodoActionTypes.CREATE;

  constructor(public payload: string) {}
}

export class TodoCreateSuccess implements Action {
  readonly type = TodoActionTypes.CREATE_SUCCESS;

  constructor(public payload: Todo) {}
}

export class TodoClearCompleted implements Action {
  readonly type = TodoActionTypes.CLEAR_COMPLETED;
}

export class TodoClearCompletedSuccess implements Action {
  readonly type = TodoActionTypes.CLEAR_COMPLETED_SUCCESS;
}

export type All =
  TodoGet
  | TodoGetSuccess
  | TodoCreate
  | TodoCreateSuccess
  | TodoClearCompleted
  | TodoClearCompletedSuccess;
