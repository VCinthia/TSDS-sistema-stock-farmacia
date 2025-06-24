import { Expose } from "class-transformer";
import { CategoriaProducto } from "src/enums/categoria-producto.enum";
import { TipoProducto } from "src/enums/tipo-producto.enum";


export class ResponseProductoMasVendidosDto{
  @Expose()
  codigo_nacional: string;

  @Expose()
  nombre: string;

  @Expose()
  categoria: CategoriaProducto;

  @Expose()
  tipo: TipoProducto;

  @Expose()
  cantidad_vendida: number;



}

