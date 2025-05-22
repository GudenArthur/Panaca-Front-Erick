import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/autenticacion/mensaje-dto';
import { Observable } from 'rxjs';
import { FiltroEventoDTO } from '../dto/evento/filtro-evento-dto';
import { Evento } from '../models/Evento';

@Injectable({
 providedIn: 'root'
})
export class PublicoService {


 private publicoURL = "http://localhost:8081/api/publico";


 constructor(private http: HttpClient) { }

  //_______________________________ METODOS EVENTO _____________________________________________


 public filtrarEventos(filtroEventoDTO: FiltroEventoDTO): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.publicoURL}/filtrar-eventos`, filtroEventoDTO);
 }


 public listarEventos(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-eventos`);
 }
 
 public obtenerEvento(id: string): Observable<Evento> {
  return this.http.get<Evento>(`${this.publicoURL}/obtener-evento/${id}`);
}


 
}
