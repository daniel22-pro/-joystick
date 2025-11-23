import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="card">
        <div class="header">
          <h1>Agregar Nuevo Juego</h1>
          <button class="btn-back" routerLink="/home" title="Volver al inicio">
            <i class="fas fa-home"></i> Inicio
          </button>
        </div>

        <form (ngSubmit)="saveGame()" #form="ngForm" class="form">

          <div class="input-group">
            <input type="text" placeholder=" " [(ngModel)]="nombre" name="nombre" required>
            <label>Nombre del juego</label>
          </div>

          <div class="input-group">
            <input type="text" placeholder=" " [(ngModel)]="genero" name="genero" required>
            <label>Género</label>
          </div>

          <div class="input-group">
            <input type="text" placeholder=" " [(ngModel)]="plataforma" name="plataforma" required>
            <label>Plataforma</label>
          </div>

          <div class="input-group">
            <input type="date" [(ngModel)]="fecha_lanzamiento" name="fecha_lanzamiento" required>
            <label>Fecha de lanzamiento</label>
          </div>

          <div class="input-group">
            <input type="number" placeholder=" " [(ngModel)]="precio" name="precio" required min="0" step="0.01">
            <label>Precio ($)</label>
          </div>

          <div class="input-group">
            <input type="url" placeholder=" " [(ngModel)]="imagen_url" name="imagen_url" required>
            <label>URL de la imagen</label>
          </div>

          <button type="submit" class="btn-submit" [disabled]="!form.valid">
            <i class="fas fa-save"></i>
            Guardar Juego
          </button>
        </form>

        <div class="message" [ngClass]="{ 'success': isSuccess, 'error': !isSuccess && mensaje }" *ngIf="mensaje">
          <i class="fas" [ngClass]="isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'"></i>
          {{ mensaje }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { 
      display: block; 
      min-height: 100vh; 
      background: #0a0a12; 
      font-family: 'Segoe UI', sans-serif; 
      padding: 3rem 1rem;
    }

    .container {
      max-width: 560px;
      margin: 0 auto;
    }

    .card {
      background: #0f0f1a;
      padding: 3rem 2.5rem;
      border-radius: 20px;
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.6), 
        0 0 30px rgba(0, 212, 255, 0.15);
      border: 1px solid #1a1a2e;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;
    }

    h1 {
      font-size: 2.2rem;
      font-weight: 900;
      letter-spacing: 2px;
      background: linear-gradient(135deg, #00d4ff, #00ffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
      margin: 0;
    }

    .btn-back {
      background: rgba(0, 212, 255, 0.1);
      color: #00d4ff;
      border: 1px solid #00d4ff;
      padding: 0.7rem 1.4rem;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
    }

    .btn-back:hover {
      background: rgba(0, 212, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .input-group {
      position: relative;
    }

    .input-group input {
      width: 100%;
      padding: 1rem 1.2rem;
      border-radius: 12px;
      border: none;
      background: #16213e;
      color: #ccc;
      font-size: 1rem;
      transition: all 0.3s;
      outline: none;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .input-group input::placeholder {
      color: #666;
      font-weight: 500;
    }

    .input-group input:focus {
      background: #1a1a2e;
      color: #fff;
      box-shadow: 
        0 0 0 3px rgba(0, 212, 255, 0.3), 
        0 0 15px rgba(0, 212, 255, 0.4);
    }

    .input-group label {
      position: absolute;
      left: 1.2rem;
      top: 1rem;
      color: #666;
      font-size: 1rem;
      font-weight: 500;
      pointer-events: none;
      transition: all 0.3s ease;
    }

    .input-group input:focus ~ label,
    .input-group input:not(:placeholder-shown) ~ label {
      top: -0.7rem;
      left: 1rem;
      font-size: 0.85rem;
      color: #00d4ff;
      background: #0f0f1a;
      padding: 0 0.5rem;
    }

    .btn-submit {
      margin-top: 1rem;
      padding: 1rem;
      background: linear-gradient(135deg, #00d4ff, #00aaff);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 212, 255, 0.5);
    }

    .message {
      margin-top: 1.5rem;
      padding: 1rem;
      border-radius: 12px;
      text-align: center;
      font-weight: 500;
      font-size: 1rem;
    }

    .success {
      background: rgba(81, 255, 138, 0.1);
      color: #51ff8a;
      border: 1px solid rgba(81, 255, 138, 0.3);
    }

    .error {
      background: rgba(255, 107, 107, 0.1);
      color: #ff6b6b;
      border: 1px solid rgba(255, 107, 107, 0.3);
    }
  `]
})
export class AddGameComponent {
  nombre = '';
  genero = '';
  plataforma = '';
  fecha_lanzamiento = '';
  precio!: number;
  imagen_url = '';
  mensaje = '';
  isSuccess = false;

  constructor(
    private gameService: GameService,
    private router: Router
  ) {}

  saveGame() {
    const data = {
      nombre: this.nombre,
      genero: this.genero,
      plataforma: this.plataforma,
      fecha_lanzamiento: this.fecha_lanzamiento,
      precio: this.precio,
      imagen_url: this.imagen_url
    };

    this.gameService.addGame(data).subscribe({
      next: () => {
        this.isSuccess = true;
        this.mensaje = '¡Juego agregado con éxito! ✔';
        this.clearForm();
        this.autoClearMessage();
      },
      error: () => {
        this.isSuccess = false;
        this.mensaje = 'Error al guardar el juego ❌';
        this.autoClearMessage();
      }
    });
  }

  private clearForm() {
    this.nombre = '';
    this.genero = '';
    this.plataforma = '';
    this.fecha_lanzamiento = '';
    this.precio = 0;
    this.imagen_url = '';
  }

  private autoClearMessage() {
    setTimeout(() => {
      this.mensaje = '';
    }, 4000);
  }
}