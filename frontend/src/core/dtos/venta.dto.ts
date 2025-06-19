import { ClienteDTO } from "./cliente.dto";
import { ProductoDTO } from "./producto.dto";
import { SucursalDTO } from "./sucursal.dto";
import { UsuarioDTO } from "./usuario.dto";

export class VentaDTO{
  id_venta?: number;
  fecha?: string; 
  subtotal?: string;
  puntos_cliente_inicial?: number;
  descuento_porcentaje?: string;
  total_final?: string;
  puntos_generados?: number;
  sucursal?: SucursalDTO;
  cliente?: ClienteDTO;
  usuario?: UsuarioDTO;
  ticketReceta?: TicketRecetaDTO;
  detalles?: DetalleVentaDTO[];
}

export interface TicketRecetaDTO {
  numero_receta: string;
}

export interface DetalleVentaDTO {
  cantidad: number;
  precio_unitario: string;
  producto: ProductoDTO;
}