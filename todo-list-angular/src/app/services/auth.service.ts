import { AuthResponse } from './../types/auth.response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {}

  login(name: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;

    return this.httpClient
      .post<AuthResponse>(url, {
        name: name,
        password: password,
      })
      .pipe(
        tap((auth) => this.saveAuth(auth)),
        mapTo(true)
      );
  }

  register(name: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/register`;

    return this.httpClient
      .post<AuthResponse>(url, {
        name: name,
        password: password,
      })
      .pipe(
        tap((auth) => this.saveAuth(auth)),
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
      .pipe(tap((auth) => this.saveAuth(auth)));
  }

  getAuth(): AuthResponse {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));

      return auth;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  logout(): void {
    this.clearAuth();
  }

  isAuthorized(): boolean {
    const auth = this.getAuth();

    return auth?.accessToken && auth?.refreshToken ? true : false;
  }

  private saveAuth(auth: AuthResponse): void {
    const authStr = JSON.stringify(auth);

    localStorage.setItem('auth', authStr);
  }

  private clearAuth(): void {
    localStorage.removeItem('auth');
  }
}
