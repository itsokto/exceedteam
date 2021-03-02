import { IAuthState } from './../states/auth.state';
import { All, AuthActionTypes } from '../actions/auth.actions';
import { initialState } from '../states/auth.state';

export function reducer(state = initialState, action: All): IAuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        auth: action.payload,
        errorMessage: null,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    }
    default: {
      return state;
    }
  }
}
