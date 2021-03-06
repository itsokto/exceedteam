import { createSelector } from '@ngrx/store';
import { selectAuthState } from '../states/app.states';

export const selectAuthIsAuthenticated = createSelector(selectAuthState, state => state.isAuthenticated);
