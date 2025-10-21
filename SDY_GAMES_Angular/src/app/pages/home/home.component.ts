import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>🎮 Bienvenido a la tienda</h1>
    <button (click)="logout()">Cerrar sesión</button>
  `
})
export class HomeComponent {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}
