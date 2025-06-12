import { Expose, Type } from "class-transformer";

export class ProductoDto {
  @Expose()
  id_producto: number;

  @Expose()
  nombre: string;
  
  @Expose()
  precio_unitario: string;
}

export class SucursalDto {
  @Expose()
  id_sucursal: number;

  @Expose()
  direccion: string;
}




export class ResponseVentaDto {
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
  @Type(() => SucursalDto)
  sucursal: SucursalDto;    

}