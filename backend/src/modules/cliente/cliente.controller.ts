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
  @ApiOperation({ summary: 'Retorna todos los Lotes' })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.CLIENTES.FIDELIZACION, type: ApiResponseDTO<ResponseFidelizacionDto[]>, })
  async obtenerReporteClientes(): Promise<ApiResponseDTO<ResponseFidelizacionDto[] | null>>{
    const fidelizacion = await this.clienteService.generarReportefidelizacionClientes();
    return fidelizacion;
  }

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }


}
