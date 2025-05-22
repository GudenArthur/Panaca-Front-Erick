import { Localidad } from "./localidad"

export interface EventoFiltradoDTO {
    urlImagenPortada: string,
    nombre: string,
    direccion: string,
    ciudad: string,
    fecha: Date,
    tipoEvento: string,
    listaLocalidades: Localidad[]
}
