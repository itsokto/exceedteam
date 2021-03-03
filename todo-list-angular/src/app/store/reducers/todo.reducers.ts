import { All, TodoActionTypes } from '../actions/todo.actions';
import {
  ITodoState,
  initialTodoState,
  todoAdapter,
} from '../states/todo.state';

export function reducer(state = initialTodoState, action: All): ITodoState {
  switch (action.type) {
    case TodoActionTypes.GET_SUCCESS: {
      return todoAdapter.addMany(action.payload, state);
    }

    case TodoActionTypes.CREATE_SUCCESS: {
      return todoAdapter.addOne(action.payload, state);
    }

    case TodoActionTypes.CLEAR_COMPLETED_SUCCESS: {
      return todoAdapter.removeMany(todo => todo.isDone, state);
    }

    case TodoActionTypes.CHECK_ALL_SUCCESS: {
      return todoAdapter.map(todo => ({ ...todo, isDone: action.payload }), state);
    }

    case TodoActionTypes.UPDATE_SUCCESS: {
      return todoAdapter.updateOne(action.payload, state);
    }

    case TodoActionTypes.REMOVE_SUCCESS: {
      return todoAdapter.removeOne(action.payload.id, state);
    }

    case TodoActionTypes.FILTER: {
      return { ...state, filter: action.payload };
    }

    default: {
      return state;
    }
  }
}
