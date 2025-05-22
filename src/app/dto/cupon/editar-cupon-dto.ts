export interface EditarCuponDTO {
    codigo: string,
    nombre: string,
    porcentajeDescuento: number,
    fechaVencimiento: Date,
    fechaApertura: Date,
    tipoCupon: string,
    estadoCupon: string
}
