import { ITodoState } from './todo.state';
import { IAuthState } from './auth.state';
import { createFeatureSelector } from '@ngrx/store';

import * as auth from '../reducers/auth.reducers';
import * as todo from '../reducers/todo.reducers';

export interface AppState {
  authState: IAuthState;
  todoState: ITodoState;
}

export const reducers = {
  authState: auth.reducer,
  todoState: todo.reducer,
};

export const selectAuthState = createFeatureSelector<AppState, IAuthState>(
  'authState'
);
export const selectTodoState = createFeatureSelector<AppState, ITodoState>(
  'todoState'
);
