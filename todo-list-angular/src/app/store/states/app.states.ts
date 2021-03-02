import { ITodoState } from './todo.state';
import { IAuthState } from './auth.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as auth from '../reducers/auth.reducers';
import * as todo from '../reducers/todo.reducers';
import { TodoFilter } from 'src/app/types/todo';

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

export const selectTodos = createSelector(
  selectTodoState,
  (state: ITodoState) => state.todos
);

export const selectTodosCount = createSelector(
  selectTodoState,
  (state: ITodoState) => {
    return state.todos.length;
  }
);

export const selectTodosActiveCount = createSelector(
  selectTodoState,
  (state: ITodoState) => {
    return state.todos.filter((todo) => !todo.isDone).length;
  }
);

export const selectTodosByFilter = createSelector(
  selectTodoState,
  (state: ITodoState) =>
    state.todos.filter(
      (todo) =>
        (todo.isDone && state.filter === TodoFilter.Completed) ||
        state.filter === TodoFilter.All
    )
);
