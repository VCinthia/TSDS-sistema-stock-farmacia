import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { ResponseFidelizacionDto } from './dto/response-fidelizacion.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { API_MESSAGES } from 'common/constants/messages';


@Controller('cliente')
export class ClienteController {
  constructor( private readonly clienteService: ClienteService) {}



  @Get('/fidelizacion')
  @ApiOperation({ summary: 'Retorna todos los clientes con el rango asignado y puntos de fidelizacion' })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.CLIENTES.FIDELIZACION, type: ApiResponseDTO<ResponseFidelizacionDto[]>, })
  async obtenerReporteClientes(): Promise<ApiResponseDTO<ResponseFidelizacionDto[] | null>>{
    const fidelizacion = await this.clienteService.generarReportefidelizacionClientes();
    return fidelizacion;
  }


}
