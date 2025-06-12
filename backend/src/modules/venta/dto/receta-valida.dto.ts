import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNumber, IsString, ValidateNested } from "class-validator";

export class ProductoPrescritoDto {
  @IsString()
  codigo_nacional: string;

  @IsNumber()
  cantidad_prescrita: number;
}

export class RecetaValidadaDto {
  @IsBoolean()
  valida: boolean;

  @IsString()
  codigo: string;

  @IsString()
  dni_paciente: string;

  @IsString()
  matricula_medico: string;

  @IsDate()
  fecha_emision: Date;
  
  @IsDate()
  fecha_expiracion: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoPrescritoDto)
  productos: ProductoPrescritoDto[];
}