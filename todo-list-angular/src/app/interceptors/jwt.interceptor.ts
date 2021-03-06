import { IAuthState } from '../store/states/auth.state';
import { LogOut, Refresh } from '../store/actions/auth.actions';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { MonoTypeOperatorFunction, Observable, pipe, throwError } from 'rxjs';
import { catchError, skip, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/states/app.states';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  state$: Observable<IAuthState>;

  constructor(private store: Store<AppState>) {
    this.state$ = this.store.select(selectAuthState);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.state$.pipe(take(1), switchMap(state => {
      if (state.isAuthenticated && state.auth) {
        request = this.addToken(request, state.auth.accessToken);
      }

      return next.handle(request).pipe(this.handleError(request, next, state));
    }));
  }

  private addToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  private handleError(request: HttpRequest<any>, next: HttpHandler, oldState: IAuthState): MonoTypeOperatorFunction<HttpEvent<any>> {
    return pipe(catchError((error) => {
      if (error.status === 401) {
        return this.handle401Error(request, next, oldState);
      }
      if (error.status === 403) {
        return this.handle403Error(request, next);
      }

      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, oldState: IAuthState): Observable<HttpEvent<any>> {
    this.store.dispatch(
      new Refresh(oldState.auth.refreshToken)
    );

    return this.state$.pipe(skip(1), switchMap((state) => {
        return next.handle(this.addToken(request, state.auth.accessToken));
      })
    );
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new LogOut());

    return next.handle(request);
  }
}
