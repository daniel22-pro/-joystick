import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CarritoService } from '../../services/carrito.service'; // ← IMPORTAR SERVICIO

@Component({
  selector: 'app-juego-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detallejuego.component.html',
  styleUrls: ['./detallejuego.component.css']
})
export class JuegoDetalleComponent implements OnInit {

  juego: any = null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private carritoService: CarritoService  // ← INYECTAR SERVICIO
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.gameService.getGameById(id!).subscribe({
      next: (data) => this.juego = data,
      error: (err) => console.error('Error cargando juego:', err)
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  agregarAlCarrito() {
    this.carritoService.agregarJuego(this.juego);
    alert("Juego agregado al carrito 🎮🛒");
  }

}
