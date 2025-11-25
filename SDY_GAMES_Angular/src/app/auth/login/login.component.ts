import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="background-animation"></div>

      <div class="login-card">
        <h1 class="logo">SDYJOYSTICK</h1>

        <form (ngSubmit)="onSubmit()" class="login-form" novalidate>

          <div class="input-wrapper">
            <input [(ngModel)]="email" name="email" type="email"
                   placeholder="Correo electrónico" required class="input-field"
                   (input)="checkFormValidity()" />
            <span class="focus-border"></span>
          </div>

          <div class="input-wrapper">
            <input [(ngModel)]="password" name="password" type="password"
                   placeholder="Contraseña" required class="input-field"
                   (input)="checkFormValidity()" />
            <span class="focus-border"></span>
          </div>

          <button type="submit" 
                  class="login-btn" 
                  [disabled]="!isFormValid"
                  [class.disabled]="!isFormValid"
                  (click)="createRipple($event)">
            <span>ENTRAR</span>
          </button>
        </form>

        <p *ngIf="error" class="error-message">{{ error }}</p>

        <div class="register-link">
          ¿No tienes cuenta?
          <a routerLink="/register" class="link">Regístrate aquí →</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #05050d;
      font-family: 'Orbitron', 'Rajdhani', 'Segoe UI', sans-serif;
      overflow: hidden;
    }

    .login-container {
      position: relative;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .background-animation {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.1) 0%, transparent 60%);
      animation: float 20s ease-in-out infinite;
      pointer-events: none;
      z-index: 1;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(30px, -30px) rotate(1deg); }
    }

    .login-card {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 600px;
      background: rgba(15, 15, 30, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 3.5rem 2.5rem;
      border-radius: 28px;
      border: 1px solid rgba(0, 212, 255, 0.3);
      box-shadow: 
        0 0 40px rgba(0, 212, 255, 0.25),
        0 0 80px rgba(0, 255, 255, 0.15),
        0 20px 40px rgba(0, 0, 0, 0.7);
      text-align: center;
      overflow: hidden;
    }

    .logo {
      font-size: 4.1rem;
      font-weight: 500;
      letter-spacing: 2px;
      margin: 0 0 2.5rem -6px;
      color: #00ffff;
      text-shadow: 
        0 0 10px #00ffff,
        0 0 20px #00d4ff,
        0 0 35px #00d4ff,
        0 0 60px #00d4ff;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      animation: logoPulse 5s ease-in-out infinite;
    }

    @keyframes logoPulse {
      0%, 100% { 
        text-shadow: 
          0 0 10px #00ffff,
          0 0 20px #00d4ff,
          0 0 35px #00d4ff,
          0 0 60px #00d4ff;
      }
      50% { 
        text-shadow: 
          0 0 15px #00ffff,
          0 0 30px #00d4ff,
          0 0 50px #00d4ff,
          0 0 80px #00d4ff;
      }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
    }

    .input-wrapper {
      position: relative;
    }

    .input-field {
      width: 90%;
      height: 56px;
      padding: 0 1.4rem;
      border-radius: 16px;
      border: none;
      background: rgba(22, 33, 62, 0.7);
      color: #fff;
      font-size: 1.02rem;
      outline: none;
      transition: all 0.4s ease;
      box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .input-field::placeholder {
      color: #6688aa;
    }

    .input-field:focus {
      background: rgba(26, 26, 46, 0.9);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.6), inset 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .focus-border {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #00d4ff, #00ffff);
      transition: 0.4s;
      transform: translateX(-50%);
      box-shadow: 0 0 15px #00ffff;
    }

    .input-field:focus ~ .focus-border {
      width: 100%;
    }

    .login-btn {
      position: relative;
      overflow: hidden;
      margin-top: 1rem;
      height: 58px;
      background: linear-gradient(135deg, #00d4ff, #0099ff);
      color: white;
      border: none;
      border-radius: 16px;
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.4s ease;
      box-shadow: 0 8px 25px rgba(0, 212, 255, 0.5);
    }

    .login-btn:hover:not(:disabled) {
      transform: translateY(-4px);
      box-shadow: 0 15px 35px rgba(0, 212, 255, 0.7);
    }

    .login-btn:disabled,
    .login-btn.disabled {
      background: #0a1a2e !important;
      color: #555 !important;
      cursor: not-allowed !important;
      transform: none !important;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4) !important;
      opacity: 0.5;
    }

    .login-btn span {
      position: relative;
      z-index: 2;
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.65s linear;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    .error-message {
      margin-top: 1.2rem;
      color: #ff6b9d;
      font-weight: 600;
      text-shadow: 0 0 10px rgba(255, 107, 157, 0.5);
    }

    .register-link {
      margin-top: 2.2rem;
      color: #88aacc;
      font-size: 0.95rem;
    }

    .link {
      color: #00ffff;
      text-decoration: none;
      font-weight: 700;
      margin-left: 0.4rem;
      transition: all 0.3s;
    }

    .link:hover {
      color: #00d4ff;
      text-shadow: 0 0 15px rgba(0, 212, 255, 0.8);
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isFormValid = false;

  constructor(private authService: AuthService, private router: Router) {
    this.checkFormValidity();
  }

  checkFormValidity() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(this.email.trim());
    const isPasswordValid = this.password.length >= 6;

    this.isFormValid = isEmailValid && isPasswordValid;
  }

  onSubmit() {
    if (!this.isFormValid) return;

    this.authService.login(this.email.trim(), this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => this.error = err.error?.message || 'Error al iniciar sesión'
    });
  }

  createRipple(event: MouseEvent) {
    if (!this.isFormValid) return;

    const button = event.currentTarget as HTMLElement;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 650);
  }
}