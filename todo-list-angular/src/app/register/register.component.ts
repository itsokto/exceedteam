import { interval, merge, Observable, of } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/states/app.states';
import { IAuthState } from '../store/states/auth.state';
import { Register } from '../store/actions/auth.actions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  state: Observable<IAuthState>;
  errorMessage: Observable<string>;

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
    const errorInterval = interval(5000).pipe(map(() => ''));
    this.errorMessage = merge(this.state.pipe(switchMap(state => of(state.errorMessage))), errorInterval);
  }

  onSubmit(): void {
    this.store.dispatch(new Register(this.registerForm.value));
  }
}
