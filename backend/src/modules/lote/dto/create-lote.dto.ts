import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsPositive } from "class-validator";

export class CreateLoteDto {
  @IsDateString()
  @ApiProperty()
  fecha_vencimiento: string;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  cantidad: number;

  @IsInt()
  @ApiProperty()
  id_producto: number;

  @IsInt()
  @ApiProperty()
  id_proveedor: number;

  @IsInt()
  @ApiProperty()
  id_sucursal: number;
}
