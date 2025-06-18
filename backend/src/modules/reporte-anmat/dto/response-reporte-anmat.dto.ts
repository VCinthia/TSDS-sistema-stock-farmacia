import { IsDateString, IsString } from "class-validator";

export class ResponseReporteAnmatDto {
  @IsDateString()
  fecha_envio: string;

  @IsString()
  respuesta_api: string;
}
