import { Expose, Type } from 'class-transformer';
import { Rol } from 'src/enums/rol.enum';

export class SucursalDto {
  @Expose()
  id_sucursal: number;

  @Expose()
  direccion: string;
}




export class ResponseLoginUsuarioDto {
  @Expose()
  id_usuario: number;

  @Expose()
  nombre: string;

  @Expose()
  email: string;

  @Expose()
  rol: Rol;

  @Expose()
  @Type(() => SucursalDto)
  sucursal: SucursalDto;
}

