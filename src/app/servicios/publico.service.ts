import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/autenticacion/mensaje-dto';
import { Observable } from 'rxjs';
import { EventoFiltradoDTO } from '../dto/evento/evento-filtrado-dto';
import { Evento } from '../models/Evento';

@Injectable({
 providedIn: 'root'
})
export class PublicoService {


 private publicoURL = "https://panaca-backend-erick.onrender.com/api/publico";


 constructor(private http: HttpClient) { }

  //_______________________________ METODOS EVENTO _____________________________________________


 public filtrarEventos(filtroEventoDTO: EventoFiltradoDTO): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.publicoURL}/filtrar-eventos`, filtroEventoDTO);
 }


 public listarEventos(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-eventos`);
 }
 
 public obtenerEvento(id: string): Observable<Evento> {
  return this.http.get<Evento>(`${this.publicoURL}/obtener-evento/${id}`);
}


 
}
