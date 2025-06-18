import { IsDateString, IsString } from "class-validator";

export class CreateReporteAnmatDto {

  @IsString()
  codigos_receta: string[];
}
