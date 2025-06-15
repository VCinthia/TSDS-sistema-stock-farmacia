import { PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Producto } from "src/entities/producto.entity";
import { CategoriaProducto } from "src/enums/categoria-producto.enum";
import { TipoProducto } from "src/enums/tipo-producto.enum";


export class ResponseProductoDto{
  @Expose()
  codigo_nacional: string;

  @Expose()
  nombre: string;

  @Expose()
  categoria: CategoriaProducto;

  @Expose()
  tipo: TipoProducto;

  @Expose()
  precio_unitario: number;

  @Expose()
  umbral_stock: number;

  @Expose()
  stock_actual: number;

}

