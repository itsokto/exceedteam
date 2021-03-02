import { All, TodoActionTypes } from './../actions/todo.actions';
import { ITodoState, initialTodoState } from './../states/todo.state';

export function reducer(state = initialTodoState, action: All): ITodoState {
  switch (action.type) {
    case TodoActionTypes.GET_SUCCESS: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
