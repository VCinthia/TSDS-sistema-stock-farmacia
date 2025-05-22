import { IsEmail, IsEnum, IsInt, IsString } from "class-validator";
import { Rol } from "src/enums/rol.enum";

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Rol)
  rol: Rol;

  @IsInt()
  id_sucursal: number;
}
