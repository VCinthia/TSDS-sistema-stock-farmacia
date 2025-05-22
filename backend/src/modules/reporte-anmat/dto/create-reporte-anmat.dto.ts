import { IsDateString, IsString } from "class-validator";

export class CreateReporteAnmatDto {
  @IsDateString()
  fecha_envio: string;

  @IsString()
  respuesta_api: string;
}
