export interface DevolucionResponseDTO {
  id: string;
  nombre: string;
  tipo: 'COMPRA' | 'DONACION';
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
  fechaSolicitud: string;
}
