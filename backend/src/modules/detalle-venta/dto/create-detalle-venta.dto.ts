import { IsInt } from "class-validator";

export class CreateDetalleVentaDto {
  @IsInt()
  cantidad: number;

  @IsInt()
  precio_unitario: number;

  @IsInt()
  id_venta: number;

  @IsInt()
  id_producto: number;
}
