import { AuthService } from './../services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const { name, password } = this.loginForm.value;

    this.authService.login(name, password).subscribe();
  }
}
