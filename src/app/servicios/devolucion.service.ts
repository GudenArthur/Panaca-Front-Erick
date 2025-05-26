import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DevolucionRequestDTO } from '../dto/devolucion/devolucion-request-dto';
import { DevolucionResponseDTO } from '../dto/devolucion/devolucion-response-dto';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {
  private API_URL = 'https://panaca-backend-erick.onrender.com/api/cuenta';

  constructor(private http: HttpClient) {}

  listarHistorial(): Observable<DevolucionResponseDTO[]> {
  return this.http.get<DevolucionResponseDTO[]>('https://panaca-backend-erick.onrender.com/api/cuenta/devoluciones-historial');
}
  solicitar(dto: DevolucionRequestDTO): Observable<any> {
    return this.http.post(`${this.API_URL}/devoluciones-solicitar`, dto);
  }
}
