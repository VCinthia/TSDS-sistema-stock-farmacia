import { Injectable, Logger } from '@nestjs/common';
import { TicketReceta } from 'src/entities/ticket-receta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { getMethodName } from 'common/utils/method-name';
import { plainToInstance } from 'class-transformer';
import { ResponseTicketRecetaDto } from './dto/response-ticket-receta.dto';
import { API_MESSAGES } from 'common/constants/messages';
import { ErrorCodes } from 'common/constants/error-codes';

@Injectable()
export class TicketRecetaService {
  constructor(
    @InjectRepository(TicketReceta)
    private readonly ticketRecetaRepo: Repository<TicketReceta>,

  ){}





  async findTicketsRecetaSinReporteAnmat(): Promise<ApiResponseDTO<ResponseTicketRecetaDto[] | null>> {
  Logger.log(`Inicio`, getMethodName());
  try {
    // Obtener tickets receta sin relación con reporte ANMAT
    const tickets = await this.ticketRecetaRepo.find({
      relations: {
        reporteAnmat: true, 
      },
      where: {
        reporteAnmat: IsNull(), 
      },
      order: {
        fecha_recepcion: 'ASC' 
      }
    });

    const ticketsDto = plainToInstance(ResponseTicketRecetaDto, tickets, {
      excludeExtraneousValues: true,
    });

    if (ticketsDto.length === 0) {
      return ApiResponseDTO.success(API_MESSAGES.INFO.EMPTY, ticketsDto);
    }
    
    return ApiResponseDTO.success(API_MESSAGES.TICKET_RECETA.SIN_REPORTE, ticketsDto);
  } catch (error) {
    Logger.error(`Error al obtener tickets receta sin reporte ANMAT: ${error.message}`, error.stack, getMethodName());
    return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
  }
}



}
