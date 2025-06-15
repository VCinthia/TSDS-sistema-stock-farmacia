import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { Venta } from 'src/entities/venta.entity';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Crear una nueva venda' })
  @ApiBody({ type: CreateVentaDto })
  async create(@Body() createVentaDto: CreateVentaDto) :  Promise<ApiResponseDTO<Venta| null>> {
    return this.ventaService.create(createVentaDto);
  }

  @Get()
  findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventaService.findOne(+id);
  }

}
