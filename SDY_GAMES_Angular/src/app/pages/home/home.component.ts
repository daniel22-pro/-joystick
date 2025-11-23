import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="logo">SDYJOYSTICK</div>
      <nav class="nav">
        <a href="#" class="nav-link">Categorias</a>
      </nav>
    </header>

    <main class="container">

      <!-- 🔥 Botón para agregar juego -->
      <div class="actions">
        <button class="add-btn" (click)="goToAdd()">+ Agregar Juego</button>
      </div>

      <div class="games-grid">

        <!-- Juegos cargados desde el backend -->
        <div 
          *ngFor="let game of games" 
          class="game-card"
          (click)="onGameClick(game)"
        >
          <img 
            [src]="game.imagen_url" 
            [alt]="game.nombre"
            class="game-image" 
          />
          <div class="game-title">{{ game.nombre }}</div>
        </div>

      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #0f0f1a;
      color: #fff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .header {
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #0a0a12;
      border-bottom: 1px solid #222;
    }

    .logo {
      font-size: 2rem;
      font-weight: 900;
      color: #00d4ff;
    }

    .nav {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
    }

    .nav-link:hover {
      color: #00d4ff;
    }

    .container {
      max-width: 1400px;
      margin: 2rem auto;
      padding: 0 2rem;
    }

    /* 🔥 Estilos del botón agregar */
    .actions {
      text-align: right;
      margin-bottom: 20px;
    }

    .add-btn {
      background: #00d4ff;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 1rem;
      cursor: pointer;
      color: #0f0f1a;
      font-weight: bold;
      transition: 0.3s;
    }

    .add-btn:hover {
      background: #00aacc;
    }

    .games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.5rem;
    }

    .game-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      transition: 0.3s;
      cursor: pointer;
      height: 300px;
    }

    .game-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0, 212, 255, 0.2);
    }

    .game-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .game-title {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      padding: 1rem;
      font-size: 1.1rem;
      font-weight: 700;
    }
  `]
})
export class HomeComponent implements OnInit {

  games: any[] = [];

  constructor(
    private auth: AuthService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {
    this.gameService.getGames().subscribe({
      next: (data) => {
        this.games = data;
        console.log("Juegos cargados:", data);
      },
      error: (err) => {
        console.error("Error al cargar juegos:", err);
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  onGameClick(game: any) {
    console.log('Juego clickeado:', game.nombre);
  }

  goToAdd() {
    this.router.navigate(['/add-game']);
  }
}
