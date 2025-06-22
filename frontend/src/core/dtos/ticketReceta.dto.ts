export interface DetalleProductoDTO {
  codigo_nacional: string;
  cantidad_prescrita: number;
}

export interface TicketRecetaDTO {
  id_ticket: number;
  dni_paciente: string;
  numero_receta: string;
  matricula_medico: string;
  detalle_productos: DetalleProductoDTO[];
  fecha_recepcion: string; 
}
