import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() {}

  // -----------------------------
  // 🔑 Obtener clave del carrito por usuario
  // -----------------------------
  private getCartKey(): string {
    const email = localStorage.getItem('email');
    return email ? `carrito_${email}` : 'carrito_invitado';
  }

  // -----------------------------
  // 🛒 Obtener carrito
  // -----------------------------
  getCarrito() {
    const data = localStorage.getItem(this.getCartKey());
    return data ? JSON.parse(data) : [];
  }

  // -----------------------------
  // ➕ Agregar juego
  // -----------------------------
  agregarJuego(juego: any) {
    const carrito = this.getCarrito();

    const existe = carrito.find((item: any) => item.id === juego.id);

    if (!existe) {
      carrito.push({ ...juego, cantidad: 1 });
    } else {
      existe.cantidad += 1;
    }

    localStorage.setItem(this.getCartKey(), JSON.stringify(carrito));
  }

  // -----------------------------
  // ❌ Eliminar juego
  // -----------------------------
  eliminarJuego(id: number) {
    let carrito = this.getCarrito();
    carrito = carrito.filter((item: any) => item.id !== id);
    localStorage.setItem(this.getCartKey(), JSON.stringify(carrito));
  }

  // -----------------------------
  // 🧹 Vaciar carrito
  // -----------------------------
  vaciarCarrito() {
    localStorage.removeItem(this.getCartKey());
  }
}
