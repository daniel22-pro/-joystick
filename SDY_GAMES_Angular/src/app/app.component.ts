import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatbotComponent, CommonModule],
  template: `
    <router-outlet></router-outlet>
    <app-chatbot *ngIf="isHomePage"></app-chatbot>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SDY_GAMES_Angular';
  isHomePage = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Ajusta '/' según tu ruta del home
        this.isHomePage = event.url === '/' || event.url === '/home';
      });
  }
}