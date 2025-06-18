import { Expose } from "class-transformer";


export class ResponseTicketRecetaDto{
  @Expose()
  id_ticket: number;

  @Expose()
  dni_paciente: string;

  @Expose()
  numero_receta: string;

  @Expose()
  matricula_medico: string;

  @Expose()
  detalle_productos: JSON;

  @Expose()
  fecha_recepcion: Date;


}
