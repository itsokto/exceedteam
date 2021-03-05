import { IAuthState } from '../store/states/auth.state';
import { LogIn } from '../store/actions/auth.actions';
import { AppState, selectAuthState } from '../store/states/app.states';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { interval, merge, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  state: Observable<IAuthState>;
  errorMessage: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.state = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    const errorInterval = interval(5000).pipe(map(() => ''));
    this.errorMessage = merge(this.state.pipe(switchMap(state => of(state.errorMessage))), errorInterval);
  }

  onSubmit(): void {
    this.store.dispatch(new LogIn(this.loginForm.value));
  }
}
