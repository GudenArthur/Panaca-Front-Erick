import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdenResumenDTO } from '../dto/orden/orden-resumen-dto';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private API_URL = 'https://panaca-backend-erick.onrender.com/api/orden';

  constructor(private http: HttpClient) {}

  listarPorCuenta(idCuenta: string): Observable<OrdenResumenDTO[]> {
    return this.http.get<OrdenResumenDTO[]>(`${this.API_URL}/listar-por-cuenta/${idCuenta}`);
  }
}
