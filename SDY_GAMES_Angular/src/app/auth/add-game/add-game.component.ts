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
            <label>Precio (€)</label>
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
      background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
      padding: 2rem 1rem;
    }

    .container {
      max-width: 500px;
      margin: 0 auto;
    }

    .card {
      background: rgba(20, 25, 40, 0.75);
      backdrop-filter: blur(12px);
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(0, 170, 255, 0.2);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2rem;
      color: #00aaff;
      margin: 0;
      font-weight: 700;
    }

    .btn-back {
      background: rgba(0, 170, 255, 0.15);
      color: #00aaff;
      border: none;
      padding: 0.6rem 1rem;
      border-radius: 10px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-back:hover {
      background: #00aaff;
      color: white;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
    }

    .input-group {
      position: relative;
    }

    .input-group input {
      width: 100%;
      padding: 1rem 1rem 1rem 1rem;
      background: rgba(22, 33, 62, 0.8);
      border: 2px solid transparent;
      border-radius: 12px;
      color: white;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .input-group input:focus {
      outline: none;
      border-color: #00aaff;
      box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.2);
    }

    .input-group label {
      position: absolute;
      left: 1rem;
      top: 1rem;
      color: #88aaff;
      font-size: 1rem;
      pointer-events: none;
      transition: all 0.3s ease;
      background: transparent;
    }

    /* Efecto flotante del label */
    .input-group input:focus ~ label,
    .input-group input:not(:placeholder-shown) ~ label {
      top: -0.6rem;
      left: 0.8rem;
      font-size: 0.85rem;
      color: #00aaff;
      background: rgba(20, 25, 40, 0.9);
      padding: 0 0.4rem;
    }

    .btn-submit {
      margin-top: 1rem;
      padding: 1rem;
      background: linear-gradient(90deg, #00aaff, #0088cc);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 170, 255, 0.3);
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 170, 255, 0.5);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .message {
      margin-top: 1.5rem;
      padding: 1rem;
      border-radius: 10px;
      text-align: center;
      font-weight: 500;
    }

    .success {
      background: rgba(0, 200, 100, 0.2);
      color: #00ff9d;
      border: 1px solid rgba(0, 255, 150, 0.3);
    }

    .error {
      background: rgba(255, 50, 50, 0.2);
      color: #ff6b6b;
      border: 1px solid rgba(255, 100, 100, 0.3);
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