import { IsNumber, IsString, Min } from "class-validator";

export class ProductoVentaDto {
  @IsString()
  codigo_nacional: string;

  @IsNumber()
  @Min(1)
  cantidad: number;
  id_producto: number;
}