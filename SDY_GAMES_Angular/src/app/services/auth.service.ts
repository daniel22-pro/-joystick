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
  return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
    .pipe(
      tap(res => {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('role', res.usuario.role); 
          localStorage.setItem('email', res.usuario.email);
        }
      })
    );
}



  register(data: any) {
  return this.http.post('http://localhost:3002/api/usuarios', data);
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
  const email = localStorage.getItem('email');
  if (email) {
    localStorage.removeItem(`carrito_${email}`);
  }

  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
}


}
