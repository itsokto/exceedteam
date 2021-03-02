import { IAuthState } from './../store/states/auth.state';
import { LogIn } from './../store/actions/auth.actions';
import { AppState, selectAuthState } from './../store/states/app.states';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  state: Observable<any>;
  errorMessage: string;

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
    this.state.subscribe((state: IAuthState) => {
      console.log(state);
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit() {
    this.store.dispatch(new LogIn(this.loginForm.value));
  }
}
