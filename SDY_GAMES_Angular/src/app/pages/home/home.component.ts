import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  template: `
    <header class="header">
      <div class="logo">SDYJOYSTICK</div>

      <nav class="nav">

        <!-- 🔥 Botón Carrito -->
        <button class="cart-btn" (click)="goToCart()">
          🛒 Carrito
        </button>

        <!-- 🔥 Mostrar solo si es admin -->
        <button 
          *ngIf="isAdmin" 
          class="add-btn" 
          (click)="goToAdd()"
        >
          + Agregar Juego
        </button>

        <!-- 🔥 Botón logout -->
        <button class="logout-btn" (click)="logout()">
          Cerrar Sesión
        </button>

      </nav>
    </header>

    <main class="container">

      <div class="games-grid">

        <!-- Juegos -->
        <div 
          *ngFor="let game of games" 
          class="game-card"
          (click)="verDetalle(game)"
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
      gap: 1rem;
      align-items: center;
    }

    .cart-btn {
      background: #ffc107;
      color: #000;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      transition: .3s;
    }

    .cart-btn:hover {
      background: #e0a800;
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

    .logout-btn {
      background: transparent;
      border: 1px solid #ff4d4d;
      padding: 10px 20px;
      border-radius: 10px;
      color: #ff4d4d;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }

    .logout-btn:hover {
      background: #ff4d4d;
      color: white;
    }

    .container {
      max-width: 1400px;
      margin: 2rem auto;
      padding: 0 2rem;
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
      font-size: 1.2rem;
      font-weight: 700;
    }
  `]
})
export class HomeComponent implements OnInit {

  games: any[] = [];
  isAdmin = false;

  constructor(
    private auth: AuthService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {
    const role = this.auth.getUserRole();
    this.isAdmin = role ? role.trim().toLowerCase() === 'admin' : false;

    this.gameService.getGames().subscribe({
      next: (data) => this.games = data,
      error: (err) => console.error("Error al cargar juegos:", err)
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  verDetalle(game: any) {
    this.router.navigate(['/detallejuego', game.id]);
  }

  goToAdd() {
    this.router.navigate(['/add-game']);
  }

  // 🔥 Ir al carrito
  goToCart() {
    this.router.navigate(['/carrito']);
  }
}
