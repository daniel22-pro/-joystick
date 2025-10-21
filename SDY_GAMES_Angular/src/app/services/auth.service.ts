import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // 👉 tu endpoint real o simulado
  private _token = signal<string | null>(localStorage.getItem('token'));

  readonly token = computed(() => this._token());
  readonly isLoggedIn = computed(() => !!this._token());

  constructor(private http: HttpClient, private router: Router) {}

  // 🔹 Llamada al backend para autenticarse
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  // 🔹 Guardar token en almacenamiento local
  saveToken(token: string) {
    localStorage.setItem('token', token);
    this._token.set(token);
  }

  logout() {
    localStorage.removeItem('token');
    this._token.set(null);
    this.router.navigateByUrl('/login');
  }
}
