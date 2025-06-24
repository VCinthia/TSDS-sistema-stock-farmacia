import { IsInt, IsString } from "class-validator";

export class ResponseFidelizacionDto {
  @IsInt()
  id: number;

  @IsString()
  nombre: string;

  @IsString()
  categoria: string;

  @IsInt()
  puntos_fidelizacion: number;
}