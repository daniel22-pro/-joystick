import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <div class="logo">SDYJOYSTICK</div>

        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="input-group">
            <input
              [(ngModel)]="email"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              required
              class="input-field"
            />
          </div>

          <div class="input-group">
            <input
              [(ngModel)]="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              required
              class="input-field"
            />
          </div>

          <button type="submit" class="login-btn">
            Entrar
          </button>
        </form>

        <p *ngIf="error" class="error-message">
          {{ error }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #0a0a12;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .login-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    }

    .login-card {
      background-color: #0f0f1a;
      padding: 2.5rem 2rem;
      border-radius: 20px;
      width: 100%;
      max-width: 380px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6),
                  0 0 30px rgba(0, 212, 255, 0.15);
      border: 1px solid #1a1a2e;
      text-align: center;
      position: relative;
    }

    /* Logo con efecto neón */
    .logo {
      font-size: 2.4rem;
      font-weight: 900;
      letter-spacing: 2px;
      background: linear-gradient(135deg, #00d4ff, #00ffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 20px rgba(0, 212, 255, 0.8),
                   0 0 40px rgba(0, 212, 255, 0.4);
      margin-bottom: 1.8rem;
    }

    h2 {
      color: #fff;
      margin-bottom: 2rem;
      font-weight: 500;
      font-size: 1.4rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .input-group {
      width: 100%;
    }

    .input-field {
      width: 85%;
      padding: 1.2rem 1.2rem;
      border-radius: 10px;
      border: none;
      background-color: #16213e;
      color: #ccc;
      font-size: 1rem;
      text-align: center; /* ¡CENTRADO! */
      transition: all 0.3s ease;
      outline: none;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .input-field::placeholder {
      color: #666;
      font-weight: 500;
      text-align: center;
      opacity: 1;
    }

    .input-field:focus {
      background-color: #1a1a2e;
      color: #fff;
      box-shadow: 
        0 0 0 3px rgba(0, 212, 255, 0.3),
        0 0 15px rgba(0, 212, 255, 0.4),
        inset 0 2px 8px rgba(0, 0, 0, 0.3);
      text-align: left; /* Al escribir, se alinea a la izquierda */
      padding-left: 1.5rem;
    }

    /* Botón con glow y centrado */
    .login-btn {
      margin-top: 0.8rem;
      padding: 1rem;
      background: linear-gradient(135deg, #00d4ff, #00aaff);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4),
                  0 0 20px rgba(0, 212, 255, 0.3);
      position: relative;
      overflow: hidden;
    }

    .login-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 212, 255, 0.5),
                  0 0 30px rgba(0, 212, 255, 0.4);
    }

    .login-btn:active {
      transform: translateY(-1px);
    }

    .error-message {
      margin-top: 1.2rem;
      color: #ff6b6b;
      font-size: 0.9rem;
      font-weight: 500;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .login-card {
        padding: 2rem 1.5rem;
        border-radius: 16px;
      }
      .logo {
        font-size: 2rem;
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => {
        this.error = err.error?.message || 'Error al iniciar sesión';
      }
    });
  }
}