import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReporteAnmatService } from './reporte-anmat.service';
import { CreateReporteAnmatDto } from './dto/create-reporte-anmat.dto';

@Controller('reporte-anmat')
export class ReporteAnmatController {
  constructor(private readonly reporteAnmatService: ReporteAnmatService) {}

  @Post()
  create(@Body() createReporteAnmatDto: CreateReporteAnmatDto) {
    return this.reporteAnmatService.create(createReporteAnmatDto);
  }

  @Get()
  findAll() {
    return this.reporteAnmatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reporteAnmatService.findOne(+id);
  }

}
