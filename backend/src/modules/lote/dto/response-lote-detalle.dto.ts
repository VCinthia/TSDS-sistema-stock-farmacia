// dto/response-lote-detalle.dto.ts
import { Expose, Type } from 'class-transformer';

class ProductoDetalleDto {
  @Expose()
  id_producto: number;

  @Expose()
  nombre: string;

  @Expose()
  categoria: string;

  @Expose()
  tipo: string;

  @Expose()
  umbral_stock: number;

  @Expose()
  precio_unitario: string;
}

class ProveedorDetalleDto {
  @Expose()
  id_proveedor: number;

  @Expose()
  nombre: string;

  @Expose()
  contacto: string;
}

class SucursalDetalleDto {
  @Expose()
  id_sucursal: number;

  @Expose()
  direccion: string;

  @Expose()
  telefono: string;

  @Expose()
  dias_previos_aviso: number;
}

export class ResponseLoteDetalleDto {
  @Expose()
  id_lote: number;

  @Expose()
  fecha_vencimiento: Date;

  @Expose()
  cantidad: number;

  @Expose()
  @Type(() => ProductoDetalleDto)
  producto: ProductoDetalleDto;

  @Expose()
  @Type(() => ProveedorDetalleDto)
  proveedor: ProveedorDetalleDto;

  @Expose()
  @Type(() => SucursalDetalleDto)
  sucursal: SucursalDetalleDto;
}
