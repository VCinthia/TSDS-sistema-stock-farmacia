import { PartialType } from '@nestjs/mapped-types';
import { CreateReporteAnmatDto } from './create-reporte-anmat.dto';

export class UpdateReporteAnmatDto extends PartialType(CreateReporteAnmatDto) {}
