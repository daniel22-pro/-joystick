import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { AddGameComponent } from './auth/add-game/add-game.component';
import { JuegoDetalleComponent } from './auth/detallejuego/detallejuego.component';
import { CarritoComponent } from './auth/carrito/carrito.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'home', component: HomeComponent, canActivate: [authGuard] },

    { path: 'add-game', component: AddGameComponent, canActivate: [authGuard] },

    // 🔥 NUEVA RUTA DEL DETALLE DEL JUEGO
    { path: 'detallejuego/:id', component: JuegoDetalleComponent, canActivate: [authGuard] },
    { path: 'carrito', component: CarritoComponent}
];
