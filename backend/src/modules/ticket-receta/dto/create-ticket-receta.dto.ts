import { IsDate, IsDateString, IsString } from "class-validator";

export class CreateTicketRecetaDto {
  @IsDateString()
  fecha_emisión_receta: string;

  @IsString()
  codigo_autorizacion: string;
}
