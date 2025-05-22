import { DetalleCarritoDTO } from './detalle-carrito-dto';

export interface ActualizarCarritoDTO {
  items: DetalleCarritoDTO[];
  fecha: Date;
}