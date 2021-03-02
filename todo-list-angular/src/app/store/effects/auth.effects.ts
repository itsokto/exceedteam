import { LogOut } from './../actions/auth.actions';
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
  Register,
  RegisterFailure,
  RegisterSuccess,
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
        ofType(AuthActionTypes.LOGIN_SUCCESS, AuthActionTypes.REGISTER_SUCCESS),
        tap((result: LogInSuccess | RegisterSuccess) => {
          this.authService.saveAuth(result.payload);
          this.router.navigate(['']);
        })
      ),
    {
      dispatch: false,
    }
  );

  LogInFailure = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS, AuthActionTypes.REGISTER_SUCCESS),
        tap((result) => {
          console.log(result);
        })
      ),
    {
      dispatch: false,
    }
  );

  Register = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.REGISTER),
      map((action: Register) => action.payload),
      switchMap((payload) => {
        return this.authService.register(payload.name, payload.password).pipe(
          map((auth) => {
            return new RegisterSuccess(auth);
          }),
          catchError((error) => {
            return of(
              new RegisterFailure({ errorMessage: error.error.message })
            );
          })
        );
      })
    )
  );

  RegisterSuccess = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.REGISTER_SUCCESS),
        tap((result: LogInSuccess | RegisterSuccess) => {
          this.authService.saveAuth(result.payload);
          this.router.navigate(['']);
        })
      ),
    {
      dispatch: false,
    }
  );

  RegisterFailure = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS, AuthActionTypes.REGISTER_SUCCESS),
        tap((result) => {
          console.log(result);
        })
      ),
    {
      dispatch: false,
    }
  );

  LogOut = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    {
      dispatch: false,
    }
  );
}
