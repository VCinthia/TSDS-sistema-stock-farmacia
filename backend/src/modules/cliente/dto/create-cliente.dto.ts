import { IsInt, IsString } from "class-validator";

export class CreateClienteDto {
  @IsString()
  nombre: string;

  @IsInt()
  dni: number;

  @IsInt()
  puntos_fidelizacion: number;
}
