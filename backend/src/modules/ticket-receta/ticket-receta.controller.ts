import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketRecetaService } from './ticket-receta.service';
import { CreateTicketRecetaDto } from './dto/create-ticket-receta.dto';
import { UpdateTicketRecetaDto } from './dto/update-ticket-receta.dto';

@Controller('ticket-receta')
export class TicketRecetaController {
  constructor(private readonly ticketRecetaService: TicketRecetaService) {}

  @Post()
  create(@Body() createTicketRecetaDto: CreateTicketRecetaDto) {
    return this.ticketRecetaService.create(createTicketRecetaDto);
  }

  @Get()
  findAll() {
    return this.ticketRecetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketRecetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketRecetaDto: UpdateTicketRecetaDto) {
    return this.ticketRecetaService.update(+id, updateTicketRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketRecetaService.remove(+id);
  }
}
