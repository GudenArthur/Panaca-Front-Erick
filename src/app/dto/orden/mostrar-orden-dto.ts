import { MostrarDetalleOrdenDTO } from "./mostrar-detalle-orden-dto";

export interface MostrarOrdenDTO {
  nombreUsuario: string;
  fechaCompra: string;
  cupon: string;
  total: number;
  detalles: MostrarDetalleOrdenDTO[];
}
