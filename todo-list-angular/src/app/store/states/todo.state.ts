import { TodoFilter, Todo } from './../../types/todo';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ITodoState extends EntityState<Todo> {
  filter: TodoFilter;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialTodoState: ITodoState = todoAdapter.getInitialState({
  filter: TodoFilter.All,
});
