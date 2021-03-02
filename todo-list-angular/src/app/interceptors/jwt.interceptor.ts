import { IAuthState } from './../store/states/auth.state';
import { LogOut, Refresh } from './../store/actions/auth.actions';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, skip, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/states/app.states';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  state$: Observable<any>;
  state: IAuthState;

  constructor(private store: Store<AppState>) {
    this.state$ = this.store.select(selectAuthState);
    this.state$.subscribe((state: IAuthState) => (this.state = state));
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.state.isAuthenticated) {
      request = this.addToken(request, this.state.auth.accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        if (error.status === 403) {
          return this.handle403Error(request, next);
        }

        return throwError(error);
      })
    );
  }

  private addToken(
    request: HttpRequest<any>,
    accessToken: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.store.dispatch(
      new Refresh({ refreshToken: this.state.auth.refreshToken })
    );

    return this.state$.pipe(
      skip(1),
      switchMap((state: IAuthState) => {
        return next.handle(this.addToken(request, state.auth.accessToken));
      })
    );
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    this.store.dispatch(new LogOut());

    return next.handle(request);
  }
}
