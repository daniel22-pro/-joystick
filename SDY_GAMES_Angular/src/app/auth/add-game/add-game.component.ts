import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="wrapper">
      <h2>Agregar Juego</h2>

      <form (ngSubmit)="saveGame()" #form="ngForm">

        <input type="text" placeholder="Nombre"
               [(ngModel)]="nombre" name="nombre" required>

        <input type="text" placeholder="Género"
               [(ngModel)]="genero" name="genero" required>

        <input type="text" placeholder="Plataforma"
               [(ngModel)]="plataforma" name="plataforma" required>

        <input type="date" placeholder="Fecha lanzamiento"
               [(ngModel)]="fecha_lanzamiento" name="fecha_lanzamiento" required>

        <input type="number" placeholder="Precio"
               [(ngModel)]="precio" name="precio" required>

        <input type="text" placeholder="URL Imagen"
               [(ngModel)]="imagen_url" name="imagen_url" required>

        <button type="submit">Guardar</button>
      </form>

      <p *ngIf="mensaje">{{ mensaje }}</p>
    </div>
  `,
  styles: [`
    .wrapper {
      max-width: 450px;
      margin: 2rem auto;
      background: #0f0f1a;
      padding: 2rem;
      border-radius: 10px;
      color: #fff;
    }

    input {
      width: 100%;
      padding: .8rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      border: none;
      background: #16213e;
      color: white;
    }

    button {
      width: 100%;
      padding: .8rem;
      border: none;
      background: #00aaff;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      color: white;
    }

    button:hover {
      background: #00d4ff;
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

  constructor(private gameService: GameService) {}

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
      next: () => this.mensaje = 'Juego guardado con éxito ✔',
      error: () => this.mensaje = 'Error al guardar el juego ❌'
    });
  }
}
