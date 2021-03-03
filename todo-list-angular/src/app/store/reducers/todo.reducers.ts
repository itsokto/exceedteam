import { All, TodoActionTypes } from './../actions/todo.actions';
import {
  ITodoState,
  initialTodoState,
  todoAdapter,
} from './../states/todo.state';

export function reducer(state = initialTodoState, action: All): ITodoState {
  switch (action.type) {
    case TodoActionTypes.GET_SUCCESS: {
      return todoAdapter.addMany(action.payload, state);
    }

    case TodoActionTypes.CREATE_SUCCESS: {
      return todoAdapter.addOne(action.payload, state);
    }

    default: {
      return state;
    }
  }
}
