import { AuthResponse } from './../../types/auth.response';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',
  REFRESH = '[Auth] Refresh',
  REFRESH_SUCCESS = '[Auth] Refresh Success',
  REFRESH_FAILURE = '[Auth] Refresh Failure',
  LOGOUT = '[Auth] LogOut',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: AuthResponse) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;
  constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;
  constructor(public payload: AuthResponse) {}
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILURE;
  constructor(public payload: any) {}
}

export class Refresh implements Action {
  readonly type = AuthActionTypes.REFRESH;
  constructor(public payload: any) {}
}

export class RefreshSuccess implements Action {
  readonly type = AuthActionTypes.REFRESH_SUCCESS;
  constructor(public payload: AuthResponse) {}
}

export class RefreshFailure implements Action {
  readonly type = AuthActionTypes.REFRESH_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() {}
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | Refresh
  | RefreshSuccess
  | RefreshFailure
  | LogOut;
