import { IAuthState } from './auth.state';
import { createFeatureSelector } from '@ngrx/store';

import * as auth from '../reducers/auth.reducers';

export interface AppState {
  authState: IAuthState;
}

export const reducers = {
  auth: auth.reducer,
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
