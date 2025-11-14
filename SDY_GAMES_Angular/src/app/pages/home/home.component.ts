import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface Game {
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="logo">SDYJOYSTICK</div>
      <nav class="nav">
        <a href="#" class="nav-link">Juegos</a>
        <a href="#" class="nav-link">Trending</a>
        <a href="#" class="nav-link">Top</a>
        <a href="#" class="nav-link">Actualizaciones recientes</a>
        <a href="#" class="nav-link">Solicitud</a>
        <a href="#" class="nav-link">Colecciones</a>
        <a href="#" class="nav-link">Editores</a>
      </nav>
    </header>

    <main class="container">
      <div class="games-grid">
        <div 
          *ngFor="let game of games" 
          class="game-card"
          (click)="onGameClick(game)"
        >
          <img [src]="game.imageUrl" [alt]="game.title" class="game-image" />
          <div class="game-title">{{ game.title }}</div>
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

    /* Header */
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
      letter-spacing: 1px;
      color: #00d4ff;
      text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }

    .nav {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      color: #ccc;
      text-decoration: none;
      font-weight: 500;
      font-size: 1rem;
      transition: color 0.3s;
    }

    .nav-link:hover {
      color: #00d4ff;
    }

    /* Main */
    .container {
      max-width: 1400px;
      margin: 2rem auto;
      padding: 0 2rem;
    }

    .games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.5rem;
      padding: 1rem 0;
    }

    .game-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      transition: transform 0.3s, box-shadow 0.3s;
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
      display: block;
    }

    .game-title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      padding: 1.2rem 1rem 0.8rem;
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .nav {
        display: none;
      }
      .logo {
        font-size: 1.6rem;
      }
      .games-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .games-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  games: Game[] = [
    { title: 'The Outer Worlds 2', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1449110/0130c9add6d097099cc7796a04def57bee93e58d/capsule_616x353.jpg?t=1761760147' },
    { title: 'PowerWash Simulator 2', imageUrl: 'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch2/70010000098324/ecd34507c574e8be94774800a50d47c11f38a03f728dddc45c3daf2583779738' },
    { title: 'Dispatch', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2592160/fcfd39596c29e58f0d0c44ca56b8490d91fb3b76/capsule_616x353.jpg?t=1762980554' },
    { title: 'RV There Yet?', imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202510/2306/f9d5b231e6c8641b8b025f06f5e6b5511330929ea007a6f6.jpg' },
    { title: 'Escape from Duckov', imageUrl: 'https://cdn1.epicgames.com/spt-assets/b48333b95b8744949229259f9f4917ea/escape-from-duckov-q4c9m.png' },
    { title: 'Little Nightmares III', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1392860/fdc6c7f7f4edef951043c52db24592334b10c76a/capsule_616x353.jpg?t=1760984736' },
    { title: 'Warrior Sword', imageUrl: 'https://play-lh.googleusercontent.com/DMc2TDr_PEptDrwp601xN_o5VYwETcmANZ07kiJareUOdcF6PEMltl5NTSToNZbS9x4=w526-h296-rw' },
    { title: 'Peak', imageUrl: 'https://peak.wiki.gg/images/PEAK_KeyArt_1080p.jpg?8284f8' },
    { title: 'REPO', imageUrl: 'https://ankergames.net/uploads/poster/02-2025/nckvIRSHDS.webp' },
    { title: 'El último cuidador', imageUrl: 'https://ankergames.net/uploads/poster/11-2025/JPQdzcTMZY.webp' },
  ];

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  onGameClick(game: Game) {
    console.log('Juego clickeado:', game.title);
    // Aquí puedes navegar a la página del juego
    // this.router.navigate(['/game', game.title.toLowerCase().replace(/\s+/g, '-')]);
  }
}