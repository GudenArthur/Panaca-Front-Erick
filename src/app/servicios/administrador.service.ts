import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/autenticacion/mensaje-dto';
import { CrearEventoDTO } from '../dto/evento/crear-evento-dto';
import { EditarEventoDTO } from '../dto/evento/editar-evento-dto';
import { ResponderPQRDTO } from '../dto/PQR/responder-pqrdto';
import { CrearCuponDTO } from '../dto/cupon/crear-cupon-dto';
import { EditarCuponDTO } from '../dto/cupon/editar-cupon-dto';
import { ItemsCuponDTO } from '../dto/cupon/items-cupon-dto';
import { Page } from '../models/Page';


@Injectable({
 providedIn: 'root'
})
export class AdministradorService {


 private adminURL = "http://localhost:8081/api/admin";


 constructor(private http: HttpClient) { }


//  _______________________________ METODOS EVENTOS _________________________________________________
 
  public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-evento`, crearEventoDTO);
  }


 public actualizarEvento(id:string, editarEventoDTO: EditarEventoDTO): Observable<MensajeDTO> {
   return this.http.put<MensajeDTO>(`${this.adminURL}/editar-evento/${id}`, editarEventoDTO);
 }


 public eliminarEvento(id: string): Observable<MensajeDTO> {
   return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-evento/${id}`);
 }


//  public listarEventosAdmin(): Observable<MensajeDTO> {
//    return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener-todos`);
//  }
// Este metodo está en el controlador publico, no sé si se toma esa url o qué

public obtenerLocalidad(nombre: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-localidad/${nombre}`);
}

obtenerEventosDisponibles(page: number,size: number): Observable<Page<any>> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', '4');  // Asegúrate de que el tamaño de la página sea el que deseas

  return this.http.get<Page<any>>(`${this.adminURL}/evento-activos`, { params });
}


obtenerEventosInactivos(page: number,size: number): Observable<Page<any>> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', '4');  // Asegúrate de que el tamaño de la página sea el que deseas

  return this.http.get<Page<any>>(`${this.adminURL}/evento-inactivos`, { params });
}


//  _______________________________ METODOS PQR _________________________________________________

public responderPQR(responderPQRDTO: ResponderPQRDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.adminURL}/responder-pqr`, responderPQRDTO);
}

public obtenerInformacionPQR(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/obterner-informacion-pqr/${id}`);
}

public eliminarPQR(id: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-pqr/${id}`);
}

//  _______________________________ METODOS CUPON _________________________________________________

public crearCupon(crearCuponDTO: CrearCuponDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.adminURL}/crear-cupon`, crearCuponDTO);
}


public editarCupon(editarCuponDTO: EditarCuponDTO, cuponId: string): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.adminURL}/editar-cupon/${cuponId}`, editarCuponDTO);
}


public obtenerInformacionCupon(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/${id}`);
}

  
  obtenerCuponesDisponibles(page: number,size: number): Observable<Page<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', '4');  // Asegúrate de que el tamaño de la página sea el que deseas

    return this.http.get<Page<any>>(`${this.adminURL}/cupones-disponibles`, { params });
  }

  
  obtenerCuponesNoDisponibles(page: number,size: number): Observable<Page<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', '4');  // Asegúrate de que el tamaño de la página sea el que deseas

    return this.http.get<Page<any>>(`${this.adminURL}/cupones-no-disponibles`, { params });
  }


public eliminarCupon(id: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-cupon/${id}`);
}

public obtenerCuponesFiltrados(itemCuponDTO: ItemsCuponDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.adminURL}/filtrar-cupones`, itemCuponDTO);
}

//  _______________________________ METODOS IMAGENES _________________________________________________

 public subir(imagen: FormData): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/subir`, imagen);
 }

 public eliminar(idImagen: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar/${idImagen}`);
}

}
