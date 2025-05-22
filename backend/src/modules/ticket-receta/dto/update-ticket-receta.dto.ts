import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketRecetaDto } from './create-ticket-receta.dto';

export class UpdateTicketRecetaDto extends PartialType(CreateTicketRecetaDto) {}
