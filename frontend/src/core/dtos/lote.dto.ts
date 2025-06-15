import { SucursalDTO } from "./sucursal.dto";
import { ProveedorDTO } from "./proveedor.dto";
import { ProductoDTO } from "./producto.dto";

export class LoteDTO{
  id_lote?: number;
  fecha_vencimiento?: string;
  cantidad?: number;
  producto?: ProductoDTO;
  proveedor?: ProveedorDTO;
  sucursal?: SucursalDTO;
}