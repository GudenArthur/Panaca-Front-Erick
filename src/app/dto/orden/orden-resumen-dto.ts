export interface OrdenResumenDTO {
  tipo: 'COMPRA' | 'DONACION';
  nombre: string;
  total: number;
  fechaCompra: string;
  fechaVisita?: string;
  estado: string;
}
