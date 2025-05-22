import { DetalleOrdenDTO } from "./detalle-orden-dto"

export interface CrearOrdenDTO {
    idCliente: string,
    idCupon: string,
    codigoPasarela: string,
    fecha: Date,
    detalleOrden: DetalleOrdenDTO[],
    total: number,
    cuponId: string,
    carritoId: string;
}
