import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FooterComponent } from '../../core/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // ✅ mejora el rendimiento
})
export class HomeComponent {
  games = [
    {
      title: 'Elden Ring',
      image: '/assets/images/games/Elden-Ring.webp'
    },
    {
      title: 'God of War Ragnarök',
      image: '/assets/images/games/God of War Ragnarök.jpg'
    },
    {
      title: 'Hades II',
      image: '/assets/images/games/Hades II.jpg'
    },
    {
      title: 'Cyberpunk 2077',
      image: '/assets/images/games/Cyberpunk 2077.jpg'
    }
  ];
}
