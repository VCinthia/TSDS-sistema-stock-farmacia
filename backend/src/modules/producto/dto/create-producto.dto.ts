import { IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { CategoriaProducto } from "src/enums/categoria-producto.enum";
import { TipoProducto } from "src/enums/tipo-producto.enum";

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsEnum(CategoriaProducto)
  categoria: CategoriaProducto;

  @IsEnum(TipoProducto)
  tipo: TipoProducto;

  @IsInt()
  umbral_stock: number;

  @IsNumber()
  precio_unitario: number;
}
