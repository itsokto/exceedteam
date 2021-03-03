import { createSelector } from '@ngrx/store';
import { TodoFilter } from '../../types/todo';
import { selectTodoState } from '../states/app.states';
import { todoAdapter } from '../states/todo.state';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = todoAdapter.getSelectors();

export const selectTodosFilter = createSelector(
  selectTodoState,
  (state) => state.filter
);

export const selectTodos = createSelector(selectTodoState, selectAll);

export const selectTodosCount = createSelector(selectTodoState, selectTotal);

export const selectTodosActiveCount = createSelector(selectTodos, (todos) => {
  return todos.filter((todo) => !todo.isDone).length;
});

export const selectTodosDoneCount = createSelector(selectTodos, (todos) => {
  return todos.filter((todo) => todo.isDone).length;
});

export const selectTodosByFilter = createSelector(
  selectTodosFilter,
  selectTodos,
  (filter, todos) =>
    todos.filter(
      (todo) =>
        (todo.isDone && filter === TodoFilter.Completed) ||
        filter === TodoFilter.All
    )
);
