import { CrearLocalidadDTO } from "./crear-localidad-dto";

export interface CrearEventoDTO {
    imagenPortada: string,
    imagenLocalidad: string,
    nombre: string,
    descripcion: string,
    direccion: string,
    tipoEvento: string,
    fecha: Date,
    ciudad: string,
    estado: string,
    tipo: string,
    precio: number,
    listaLocalidades: CrearLocalidadDTO[]
}
