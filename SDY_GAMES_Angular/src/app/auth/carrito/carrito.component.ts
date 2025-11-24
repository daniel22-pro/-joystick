import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ← Añadido
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  constructor(
    private carritoService: CarritoService,
    private router: Router  // ← Inyectado
  ) {}

  get items() {
    return this.carritoService.getCarrito();
  }

  eliminarJuego(id: number) {
    this.carritoService.eliminarJuego(id);
  }

  get total() {
    return this.items.reduce((sum: number, item: any) => {
      return sum + Number(item.precio) * item.cantidad;
    }, 0);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}