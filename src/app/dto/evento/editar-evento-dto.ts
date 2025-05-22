import { CrearLocalidadDTO } from "./crear-localidad-dto";

export interface EditarEventoDTO {
    id: string,
    nombre: string,
    descripcion: string,
    direccion: string,
    ciudad: string,
    fecha: Date,
    imagenPortada: string,
    imagenLocalidad: string,
    listaLocalidades: CrearLocalidadDTO[],
    tipoEvento: string,
    estadoEvento: string,
    precio: number,
}
