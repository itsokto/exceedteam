import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/states/app.states';
import { IAuthState } from '../store/states/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  state$: Observable<any>;
  state: IAuthState;

  constructor(private store: Store<AppState>, private router: Router) {
    this.state$ = this.store.select(selectAuthState);
    this.state$.subscribe((state: IAuthState) => (this.state = state));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.state.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
