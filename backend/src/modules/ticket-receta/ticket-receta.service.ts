import { Injectable } from '@nestjs/common';
import { CreateTicketRecetaDto } from './dto/create-ticket-receta.dto';
import { UpdateTicketRecetaDto } from './dto/update-ticket-receta.dto';
import { TicketReceta } from 'src/entities/ticket-receta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetaValidadaDto } from '../venta/dto/receta-valida.dto';

@Injectable()
export class TicketRecetaService {
  constructor(
    @InjectRepository(TicketReceta)
    private readonly ticketRepo: Repository<TicketReceta>,

  ){}




  findAll() {
    return `This action returns all ticketReceta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketReceta`;
  }


}
