import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/states/app.states';
import { IAuthState } from '../store/states/auth.state';
import { Register } from '../store/actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  state: Observable<any>;
  errorMessage: string;

  constructor(private store: Store<AppState>) {
    this.registerForm = new FormGroup({
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
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit() {
    this.store.dispatch(new Register(this.registerForm.value));
  }
}
