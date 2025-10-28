import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from "../../core/components/header/header.component";
import { FooterComponent } from "../../core/components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // opcional, si tiene estilos específicos
})
export class HomeComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  games = [
    {
      title: 'Elden Ring',
      image: 'https://via.placeholder.com/300x200?text=Elden+Ring',
    },
    {
      title: 'God of War Ragnarök',
      image: 'D:\\Desarrollo web\\-joystick\\SDY_GAMES_Angular\\src\\assets\\images\\games\\god-of-war-iii.jpg',
    },
    {
      title: 'Hades II',
      image: 'D:\\Desarrollo web\\-joystick\\SDY_GAMES_Angular\\src\\assets\\images\\games\\hades-ii.jpg',
    },
    {
      title: 'Cyberpunk 2077',
      image: 'D:\\Desarrollo web\\-joystick\\SDY_GAMES_Angular\\src\\assets\\images\\games\\cyberpunk-2077.jpg',
    },
  ];
}
