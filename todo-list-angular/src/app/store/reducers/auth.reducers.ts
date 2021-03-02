import { IAuthState, initialAuthState } from './../states/auth.state';
import { All, AuthActionTypes } from '../actions/auth.actions';

export function reducer(state = initialAuthState, action: All): IAuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        auth: action.payload,
        errorMessage: null,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.REGISTER_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        auth: null,
        errorMessage: null,
      };
    }
    default: {
      return state;
    }
  }
}
