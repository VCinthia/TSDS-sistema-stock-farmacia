import { Injectable } from '@nestjs/common';
import { CreateTicketRecetaDto } from './dto/create-ticket-receta.dto';
import { UpdateTicketRecetaDto } from './dto/update-ticket-receta.dto';

@Injectable()
export class TicketRecetaService {
  create(createTicketRecetaDto: CreateTicketRecetaDto) {
    return 'This action adds a new ticketReceta';
  }

  findAll() {
    return `This action returns all ticketReceta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketReceta`;
  }

  update(id: number, updateTicketRecetaDto: UpdateTicketRecetaDto) {
    return `This action updates a #${id} ticketReceta`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketReceta`;
  }
}
