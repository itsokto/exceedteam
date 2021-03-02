import { AuthResponse } from './../types/auth.response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { mapTo, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  private authSubject = new BehaviorSubject<AuthResponse>(null);

  get auth(): AuthResponse {
    return this.authSubject.getValue();
  }

  constructor(private httpClient: HttpClient) {
    const auth = this.getAuth();

    this.authSubject.next(auth);
  }

  login(name: string, password: string): Observable<AuthResponse> {
    const url = `${this.baseUrl}/login`;

    return this.httpClient
      .post<AuthResponse>(url, {
        name: name,
        password: password,
      })
      .pipe(tap((auth) => this.authSubject.next(auth)));
  }

  register(name: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/register`;

    return this.httpClient
      .post<AuthResponse>(url, {
        name: name,
        password: password,
      })
      .pipe(
        tap((auth) => this.authSubject.next(auth)),
        mapTo(true)
      );
  }

  refresh(): Observable<AuthResponse> {
    const url = `${this.baseUrl}/refresh`;
    const { refreshToken } = this.getAuth();

    return this.httpClient
      .post<AuthResponse>(url, {
        refreshToken: refreshToken,
      })
      .pipe(tap((auth) => this.authSubject.next(auth)));
  }

  logout(): void {
    this.clearAuth();
  }

  isAuthorized(): boolean {
    return this.auth?.accessToken && this.auth?.refreshToken ? true : false;
  }

  private getAuth(): AuthResponse {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));

      return auth;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  saveAuth(auth: AuthResponse): void {
    const authStr = JSON.stringify(auth);

    localStorage.setItem('auth', authStr);
  }

  private clearAuth(): void {
    this.authSubject.next(null);
    localStorage.removeItem('auth');
  }
}
