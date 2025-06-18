import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TicketRecetaService } from './ticket-receta.service';
import { CreateTicketRecetaDto } from './dto/create-ticket-receta.dto';
import { UpdateTicketRecetaDto } from './dto/update-ticket-receta.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { API_MESSAGES } from 'common/constants/messages';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { ResponseTicketRecetaDto } from './dto/response-ticket-receta.dto';

@Controller('ticket-receta')
export class TicketRecetaController {
  constructor(private readonly ticketRecetaService: TicketRecetaService) {}



  @Get()
  findAll() {
    return this.ticketRecetaService.findAll();
  }


  @Get("/noReportadosAnmat")
  @ApiOperation({ summary: 'Obtiene todos los tickets receta sin reporte ANMAT asociado ordenados por fecha de recepción'})
  @ApiResponse({ status: HttpStatus.OK,description: API_MESSAGES.TICKET_RECETA.SIN_REPORTE, type: ApiResponseDTO<ResponseTicketRecetaDto[]> })
  async findTicketsRecetaSinReporteAnmat(): Promise<ApiResponseDTO<ResponseTicketRecetaDto[] | null>> {
    return this.ticketRecetaService.findTicketsRecetaSinReporteAnmat();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketRecetaService.findOne(+id);
  }


}
