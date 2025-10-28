import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { RegisterGameComponent } from './features/games/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // layout con header/footer
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      // agrega más páginas aquí (todas tendrán header/footer)
    ],
  },
  {
    path: 'login',
    component: LoginComponent, // sin layout (sin header/footer)
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register-game',
    component: RegisterGameComponent,
  },
];
