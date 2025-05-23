import { Expose, Type } from 'class-transformer';

//Siempre declarar primero las clases auxiliares
export class ProductoDto {
  @Expose()
  id_producto: number;

  @Expose()
  nombre: string;
}

export class ProveedorDto {
  @Expose()
  id_proveedor: number;

  @Expose()
  nombre: string;
}

export class SucursalDto {
  @Expose()
  id_sucursal: number;

  @Expose()
  direccion: string;
}



export class ResponseLoteDto {
  @Expose()
  id_lote: number;

  @Expose()
  fecha_vencimiento: Date;

  @Expose()
  cantidad: number;

  @Expose()
  @Type(() => ProductoDto)
  producto: ProductoDto;

  @Expose()
  @Type(() => ProveedorDto)
  proveedor: ProveedorDto;

  @Expose()
  @Type(() => SucursalDto)
  sucursal: SucursalDto;
}
