import { Type } from "class-transformer";
import { IsArray, IsDateString, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProductoVentaDto } from "./producto-venta.dto";

export class CreateVentaDto {
  @IsString()
  dni_cliente: string;

  @IsInt()
  id_usuario: number;

  @IsInt()
  id_sucursal: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoVentaDto)
  productos: ProductoVentaDto[];

  @IsString()
  numero_receta: string | null;

}
