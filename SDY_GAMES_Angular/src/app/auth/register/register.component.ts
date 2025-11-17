import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <div class="logo">SDYJOYSTICK</div>

        <form (ngSubmit)="onSubmit()" class="login-form" novalidate #registerForm="ngForm">
          <!-- Nombre -->
          <div class="input-group">
            <input [(ngModel)]="nombre" name="nombre" #nombreInput="ngModel"
                   type="text" placeholder="Nombre completo" required minlength="3"
                   class="input-field" [class.invalid]="nombreInput.invalid && nombreInput.touched" />
            <div class="error-text" *ngIf="nombreInput.touched && nombreInput.errors">
              <span *ngIf="nombreInput.errors['required']">El nombre es obligatorio</span>
              <span *ngIf="nombreInput.errors['minlength']">Mínimo 3 caracteres</span>
            </div>
          </div>

          <!-- Email -->
          <div class="input-group">
            <input [(ngModel)]="email" name="email" #emailInput="ngModel"
                   type="email" placeholder="Correo electrónico" required email
                   class="input-field" [class.invalid]="emailInput.invalid && emailInput.touched" />
            <div class="error-text" *ngIf="emailInput.touched && emailInput.errors">
              <span *ngIf="emailInput.errors['required']">El email es obligatorio</span>
              <span *ngIf="emailInput.errors['email']">Email no válido</span>
            </div>
          </div>

          <!-- Contraseña -->
          <div class="input-group">
            <input [(ngModel)]="password" name="password" #passInput="ngModel"
                   type="password" placeholder="Contraseña (mín. 6 caracteres)" required minlength="6"
                   class="input-field" [class.invalid]="passInput.invalid && passInput.touched" />
            <div class="error-text" *ngIf="passInput.touched && passInput.errors">
              <span *ngIf="passInput.errors['required']">La contraseña es obligatoria</span>
              <span *ngIf="passInput.errors['minlength']">Mínimo 6 caracteres</span>
            </div>
          </div>

          <!-- Confirmar contraseña -->
          <div class="input-group">
            <input [(ngModel)]="confirmPassword" name="confirmPassword" #confirmInput="ngModel"
                   type="password" placeholder="Confirmar contraseña" required
                   class="input-field"
                   [class.invalid]="confirmInput.invalid && confirmInput.touched || passwordMismatch" />
            <div class="error-text" *ngIf="confirmInput.touched && (confirmInput.errors || passwordMismatch)">
              <span *ngIf="confirmInput.errors?.['required']">Debes confirmar la contraseña</span>
              <span *ngIf="passwordMismatch">Las contraseñas no coinciden</span>
            </div>
          </div>

          <button type="submit" class="login-btn" [disabled]="registerForm.invalid || passwordMismatch">
            Registrar
          </button>
        </form>

        <p *ngIf="mensaje" [class.success]="isSuccess" class="message">
          {{ mensaje }}
        </p>

        <div class="register-link">
          ¿Ya tienes cuenta?
          <a routerLink="/login" class="link">Inicia sesión</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: #0a0a12; font-family: 'Segoe UI', sans-serif; }
    .login-wrapper { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 1rem; }
    .login-card {
      background: #0f0f1a; padding: 2.8rem 2.2rem; border-radius: 20 cementedpx; max-width: 420px; width: 100%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 30px rgba(0,212,255,0.15);
      border: 1px solid #1a1a2e; text-align: center;
    }
    .logo {
      font-size: 2.6rem; font-weight: 900; letter-spacing: 3px;
      background: linear-gradient(135deg, #00d4ff, #00ffff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      text-shadow: 0 0 20px rgba(0,212,255,0.8);
      margin-bottom: 1.8rem;
    }
    h2 { color: #fff; margin-bottom: 2rem; font-weight: 500; font-size: 1.4rem; }
    .login-form { display: flex; flex-direction: column; gap: 1.3rem; }
    .input-field {
      width: 88%; padding: 1rem 1.2rem; border-radius: 12px; border: none;
      background: #16213e; color: #ccc; font-size: 1rem; text-align: center;
      transition: all .3s; outline: none; box-shadow: inset 0 2px 8px rgba(0,0,0,.3);
    }
    .input-field::placeholder { color: #666; font-weight: 500; }
    .input-field:focus {
      background: #1a1a2e; color: #fff; text-align: left; padding-left: 1.5rem;
      box-shadow: 0 0 0 3px rgba(0,212,255,.3), 0 0 15px rgba(0,212,255,.4);
    }
    .input-field.invalid { border: 2px solid #ff6b6b; }
    .error-text { color: #ff6b6b; font-size: 0.85rem; margin-top: 0.4rem; text-align: left; padxdding-left: 0.5rem; }
    .login-btn {
      margin-top: .8rem; padding: 1rem; background: linear-gradient(135deg, #00d4ff, #00aaff);
      color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 600;
      cursor: pointer; transition: all .3s; box-shadow: 0 6px 20px rgba(0,212,255,.4);
    }
    .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
    .login-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,212,255,.5); }
    .message { margin-top: 1rem; font-weight: 500; }
    .success { color: #51ff8a; }
    .register-link { margin-top: 1.8rem; color: #aaa; font-size: .95rem; }
    .link { color: #00d4ff; text-decoration: none; font-weight: 600; margin-left: .4rem; }
    .link:hover { color: #00ffff; text-shadow: 0 0 10px rgba(0,212,255,.6); }
  `]
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  mensaje = '';
  isSuccess = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Validación personalizada: contraseñas coinciden
  get passwordMismatch(): boolean {
    return this.password !== this.confirmPassword && this.confirmPassword.length > 0;
  }

  onSubmit() {
    if (this.passwordMismatch) return;

    const data = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.mensaje = '¡Cuenta creada con éxito! Redirigiendo al login...';
        this.isSuccess = true;
        setTimeout(() => this.router.navigate(['/login']), 2200);
      },
      error: err => {
        this.mensaje = err.error?.message || 'Error al crear la cuenta';
        this.isSuccess = false;
      }
    });
  }
}