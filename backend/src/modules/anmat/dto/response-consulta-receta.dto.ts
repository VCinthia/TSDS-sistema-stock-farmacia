import { IsOptional } from "class-validator";
import { DataConsultaRecetaAnmatDto } from "./data-consulta-receta.dto";

export class ResponseConsultaRecetaAnmatDto  {
  codigo: string;
  success: boolean;

  @IsOptional()
  codeError: string | null;

  @IsOptional()
  data: DataConsultaRecetaAnmatDto | null;

}