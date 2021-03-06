import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.states';
import { selectAuthIsAuthenticated } from '../store/selectors/auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.isAuthenticated$ = this.store.select(selectAuthIsAuthenticated);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.isAuthenticated$.pipe(tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      }
    ));
  }
}
