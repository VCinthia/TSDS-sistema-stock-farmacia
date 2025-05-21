import { IsEnum, IsInt } from "class-validator";
import { Segmento } from "src/enums/segmento.enum";

export class CreateRangoDescuentoDto {
  @IsEnum(Segmento)
  segmento: Segmento;

  @IsInt()
  puntos_minimos: number;

  @IsInt()
  descuento_porcentaje: number;
}
