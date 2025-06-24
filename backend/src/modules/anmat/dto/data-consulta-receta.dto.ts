import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsInt, IsString, ValidateNested } from "class-validator";

class DetalleProductoDto {
  @IsString()
  codigo: string;

  @IsString()
  nombre: string;

  @IsInt()
  cantidad: number;
}


export class DataConsultaRecetaAnmatDto  {
  @IsBoolean()
  valida: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleProductoDto)
  detalle: DetalleProductoDto[];

  @IsString()
  dniPaciente: string;

  @IsString()
  matriculaMedico: string;

  @IsDateString()
  emision: string;

  @IsDateString()
  expiracion: string;

  @IsBoolean()
  utilizada: boolean;

}