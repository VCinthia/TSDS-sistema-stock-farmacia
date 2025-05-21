import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoteService } from './lote.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('lote')
@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo Lote' })
  @ApiResponse({ status: 201, description: 'Lote creado exitosamente', type: CreateLoteDto })
  create(@Body() createLoteDto: CreateLoteDto) {
    return this.loteService.create(createLoteDto);
  }

  @Get()
    @ApiOperation({ summary: 'Retorna todos los Lotes' })
  findAll() {
    return this.loteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoteDto: UpdateLoteDto) {
    return this.loteService.update(+id, updateLoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loteService.remove(+id);
  }
}
