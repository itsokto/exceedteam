import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess,
} from '../actions/auth.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  LogIn = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap((payload) => {
        return this.authService.login(payload.name, payload.password).pipe(
          map((auth) => {
            return new LogInSuccess(auth);
          }),
          catchError((error) => {
            return of(new LogInFailure({ errorMessage: error.error.message }));
          })
        );
      })
    )
  );

  LogInSuccess = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((login: LogInSuccess) => {
          this.authService.saveAuth(login.payload);
          this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  LogInFailure = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE),
        tap((login) => {
          console.log(login);
        })
      ),
    { dispatch: false }
  );
}
