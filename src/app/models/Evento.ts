import { Localidad } from "./Localidad";

export interface Evento {
  id: string;
  imagenPortada: string;
  imagenLocalidad: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  ciudad: string;
  fecha: Date;
  tipoEvento: string;
  estado: string;
  listaLocalidades: Localidad[];
}

