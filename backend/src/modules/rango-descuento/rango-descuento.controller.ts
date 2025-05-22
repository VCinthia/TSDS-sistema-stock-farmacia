import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RangoDescuentoService } from './rango-descuento.service';
import { CreateRangoDescuentoDto } from './dto/create-rango-descuento.dto';
import { UpdateRangoDescuentoDto } from './dto/update-rango-descuento.dto';

@Controller('rango-descuento')
export class RangoDescuentoController {
  constructor(private readonly rangoDescuentoService: RangoDescuentoService) {}

  @Post()
  create(@Body() createRangoDescuentoDto: CreateRangoDescuentoDto) {
    return this.rangoDescuentoService.create(createRangoDescuentoDto);
  }

  @Get()
  findAll() {
    return this.rangoDescuentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rangoDescuentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRangoDescuentoDto: UpdateRangoDescuentoDto) {
    return this.rangoDescuentoService.update(+id, updateRangoDescuentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rangoDescuentoService.remove(+id);
  }
}
