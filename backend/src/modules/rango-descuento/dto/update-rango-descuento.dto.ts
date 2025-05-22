import { PartialType } from '@nestjs/mapped-types';
import { CreateRangoDescuentoDto } from './create-rango-descuento.dto';

export class UpdateRangoDescuentoDto extends PartialType(CreateRangoDescuentoDto) {}
