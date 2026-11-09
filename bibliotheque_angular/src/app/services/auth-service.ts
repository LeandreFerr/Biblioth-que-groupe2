import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { LoginRequest, LoginResponse } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private url = 'http://localhost:8090/api/auth';

  login(credentials: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.url}/login`,
      credentials
    ).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
}