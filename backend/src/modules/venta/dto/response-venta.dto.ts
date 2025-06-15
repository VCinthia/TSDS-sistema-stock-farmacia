import { Expose, Type } from "class-transformer";
import { TipoProducto } from "src/enums/tipo-producto.enum";
export class ProductoDto{
  @Expose()
  nombre: string;

  @Expose()
  tipo: TipoProducto;
}

export class DetalleVentaDTO {
  @Expose()
  cantidad: number;

  @Expose()
  precio_unitario: number;
  
  @Expose()
  @Type(() => ProductoDto)
  producto: ProductoDto;
}


export class SucursalDto {
  @Expose()
  id_sucursal: number;

  @Expose()
  direccion: string;
}

export class ClienteDto {
  @Expose()
  dni: number;

  @Expose()
  nombre: string;
}

export class UsuarioDto {
  @Expose()
  nombre: string;

  @Expose()
  rol: string;
}

export class TicketRecetaDto {
  @Expose()
  numero_receta: string;
}





export class ResponseVentaDto {
  @Expose()
  id_venta: number;

  @Expose()
  fecha: Date;

  @Expose()
  subtotal: number;

  @Expose()
  puntos_cliente_inicial: number;

  @Expose()
  descuento_porcentaje: number;
  
  @Expose()
  total_final: number;

  @Expose()
  puntos_generados: number;

  @Expose()
  @Type(() => SucursalDto)
  sucursal: SucursalDto;    

  @Expose()
  @Type(() => ClienteDto)
  cliente: ClienteDto;    

  @Expose()
  @Type(() => UsuarioDto)
  usuario: UsuarioDto;    

  @Expose()
  @Type(() => TicketRecetaDto)
  ticketReceta: TicketRecetaDto;    

  @Expose()
  @Type(() => DetalleVentaDTO)
  detalles: DetalleVentaDTO[];




}