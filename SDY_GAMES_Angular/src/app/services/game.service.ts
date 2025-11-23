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

  // Obtener juegos
  getGames(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}
