import { IsString } from "class-validator";

export class CreateProveedorDto {
  @IsString()
  nombre: string;

  @IsString()
  contacto: string;
}
