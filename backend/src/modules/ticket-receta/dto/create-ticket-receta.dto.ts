import { IsDate, IsDateString, IsString } from "class-validator";

export class CreateTicketRecetaDto {


  @IsString()
  codigo_receta: string;

  @IsDate()
  fecha_emision: Date;
  
  fecha_expiracion: Date;
  
  numero_receta: string;
  
  maricula_medico: string; 
  
  dni_paciente: string; 
}
//todoposible eliminr