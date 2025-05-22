export interface CrearCuponDTO {
    codigo: string,
    nombre: string,
    porcentajeDescuento: number,
    fechaVencimiento: Date,
    fechaApertura: Date,
    tipoCupon: string,
    estadoCupon: string
}
