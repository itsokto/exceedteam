import { LogOut } from './../store/actions/auth.actions';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../types/auth.response';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/states/app.states';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  state: Observable<any>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.state = this.store.select(selectAuthState);
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<AuthResponse> = new BehaviorSubject<AuthResponse>(
    null
  );

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthorized()) {
      const auth = this.authService.auth;
      request = this.addToken(request, auth.accessToken);
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
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap((auth: AuthResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(auth);
          return next.handle(this.addToken(request, auth.accessToken));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((auth) => auth != null),
        take(1),
        switchMap((auth) =>
          next.handle(this.addToken(request, auth.accessToken))
        )
      );
    }
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    this.isRefreshing = false;

    this.store.dispatch(new LogOut());

    return next.handle(request);
  }
}
