import { AuthResponse } from '../types/auth.response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {}

  login(name: string, password: string): Observable<AuthResponse> {
    const url = `${this.baseUrl}/login`;

    return this.httpClient.post<AuthResponse>(url, {
      name: name,
      password: password,
    });
  }

  register(name: string, password: string): Observable<AuthResponse> {
    const url = `${this.baseUrl}/register`;

    return this.httpClient.post<AuthResponse>(url, {
      name: name,
      password: password,
    });
  }

  refresh(refreshToken: string): Observable<AuthResponse> {
    const url = `${this.baseUrl}/refresh`;

    return this.httpClient.post<AuthResponse>(url, {
      refreshToken: refreshToken,
    });
  }

  logout(): void {
    this.clearAuth();
  }

  private clearAuth(): void {
    localStorage.removeItem('authState');
  }
}
