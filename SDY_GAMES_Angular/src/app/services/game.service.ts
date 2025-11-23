import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = 'http://localhost:3002/api/juegos';

  constructor(private http: HttpClient) {}

  // Crear juego
  addGame(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  // Obtener todos los juegos
  getGames(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // Obtener un juego por ID
  getGameById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }


  // --------------------------------------------------
  //  🛒  CARRITO
  // --------------------------------------------------

  // --------------------------------------------------
//  🛒  CARRITO POR USUARIO
// --------------------------------------------------

private getCartKey(): string {
  const email = localStorage.getItem('email');
  return email ? `carrito_${email}` : 'carrito_invitado';
}

getCart(): any[] {
  const cart = localStorage.getItem(this.getCartKey());
  return cart ? JSON.parse(cart) : [];
}

addToCart(product: any): void {
  const cart = this.getCart();
  cart.push(product);
  localStorage.setItem(this.getCartKey(), JSON.stringify(cart));
}

removeFromCart(id: string): void {
  const cart = this.getCart().filter(item => item.id !== id);
  localStorage.setItem(this.getCartKey(), JSON.stringify(cart));
}

clearCart(): void {
  localStorage.removeItem(this.getCartKey());
}
}