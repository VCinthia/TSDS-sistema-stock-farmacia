import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('sucursal')
export class SucursalController {
  constructor(private readonly sucursalService: SucursalService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una sucursal' })
  create(@Body() createSucursalDto: CreateSucursalDto) {
    return this.sucursalService.create(createSucursalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas las sucursales' })
  findAll() {
    return this.sucursalService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza una sucursal por Id' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSucursalDto: UpdateSucursalDto) {
    return this.sucursalService.update(+id, updateSucursalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una sucursal por Id' })
  remove(@Param('id') id: string) {
    return this.sucursalService.remove(+id);
  }
}
