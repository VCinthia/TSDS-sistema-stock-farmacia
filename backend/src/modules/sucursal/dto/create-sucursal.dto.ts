import { IsInt, IsString } from "class-validator";

export class CreateSucursalDto {

  @IsString()
  direccion: string;

  @IsString()
  telefono: string;

  @IsInt()
  dias_previos_aviso: number;
}
