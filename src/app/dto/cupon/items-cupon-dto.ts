export interface ItemsCuponDTO {
    nombre: string,
    fechaVencimiento: Date,
    fechaApertura: Date,
    descuento: number,
    tipo: string,
    estado: string
    cuponId: string,
    cantidadUsos: number
}
