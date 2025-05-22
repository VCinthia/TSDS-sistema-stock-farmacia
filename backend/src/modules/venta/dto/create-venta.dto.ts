import { IsDateString, IsInt, IsOptional } from "class-validator";

export class CreateVentaDto {
  @IsDateString()
  fecha: string;

  @IsInt()
  subtotal: number;

  @IsInt()
  puntos_cliente_inicial: number;

  @IsInt()
  descuento_porcentaje: number;

  @IsInt()
  total_final: number;

  @IsInt()
  puntos_generados: number;

  @IsInt()
  id_cliente: number;

  @IsInt()
  id_usuario: number;

  @IsOptional()
  @IsInt()
  id_ticket?: number;
}
