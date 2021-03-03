import { Action } from '@ngrx/store';
import { Todo, TodoFilter } from 'src/app/types/todo';
import { Update } from '@ngrx/entity';

export enum TodoActionTypes {
  GET = '[Todo] Get',
  GET_SUCCESS = '[Todo] Get Success',
  CREATE = '[Todo] Create',
  CREATE_SUCCESS = '[Todo] Create Success',
  CLEAR_COMPLETED = '[Todo] Clear Completed',
  CLEAR_COMPLETED_SUCCESS = '[Todo]  Clear Completed',
  CHECK_ALL = '[Todo]  Check All',
  CHECK_ALL_SUCCESS = '[Todo]  Check All Success',
  UPDATE = '[Todo] Update',
  UPDATE_SUCCESS = '[Todo]  Update Success',
  REMOVE = '[Todo] Remove',
  REMOVE_SUCCESS = '[Todo]  Remove Success',
  FILTER = '[Todo] Filter',
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

export class TodoCheckAll implements Action {
  readonly type = TodoActionTypes.CHECK_ALL;

  constructor(public payload: boolean) {}
}

export class TodoCheckAllSuccess implements Action {
  readonly type = TodoActionTypes.CHECK_ALL_SUCCESS;

  constructor(public payload: boolean) {}
}

export class TodoUpdate implements Action {
  readonly type = TodoActionTypes.UPDATE;

  constructor(public payload: Todo) {}
}

export class TodoUpdateSuccess implements Action {
  readonly type = TodoActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Update<Todo>) {}
}

export class TodoRemove implements Action {
  readonly type = TodoActionTypes.REMOVE;

  constructor(public payload: Todo) {}
}

export class TodoRemoveSuccess implements Action {
  readonly type = TodoActionTypes.REMOVE_SUCCESS;

  constructor(public payload: Todo) {}
}

export class TodoApplyFilter implements Action {
  readonly type = TodoActionTypes.FILTER;

  constructor(public payload: TodoFilter) {}
}

export type All =
  TodoGet
  | TodoGetSuccess
  | TodoCreate
  | TodoCreateSuccess
  | TodoClearCompleted
  | TodoClearCompletedSuccess
  | TodoCheckAll
  | TodoCheckAllSuccess
  | TodoUpdate
  | TodoUpdateSuccess
  | TodoRemove
  | TodoRemoveSuccess
  | TodoApplyFilter;
