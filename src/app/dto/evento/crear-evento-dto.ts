export interface CrearLocalidadDTO {
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface CrearEventoDTO {
  imagenPortada: string;
  imagenLocalidad: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  tipoEvento: string;
  fecha: Date;
  ciudad: string;
  estado: string;
  tipo: string;
  precio: number;
  listaLocalidades: CrearLocalidadDTO[];
}
