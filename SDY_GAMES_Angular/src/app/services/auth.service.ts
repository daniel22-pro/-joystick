import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3002/auth';

  constructor(private http: HttpClient) {}

  // 👉 Login
  login(email: string, password: string) {
    return this.http.post<{ access_token: string; role: string }>(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      tap(res => {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('role', res.role);   // ← GUARDAR ROL
        }
      })
    );
  }

  // 👉 Obtener token
  getToken() {
    return localStorage.getItem('token');
  }

  // 👉 Comprobar si está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 👉 Obtener rol guardado
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // 👉 Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
