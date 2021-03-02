import { TodoFilter, Todo } from './../../types/todo';

export interface ITodoState {
  todos: Todo[];
  filter: TodoFilter;
}

export const initialTodoState: ITodoState = {
  todos: [],
  filter: TodoFilter.All,
};
