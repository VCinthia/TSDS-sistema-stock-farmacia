import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ReporteAnmatService } from './reporte-anmat.service';
import { CreateReporteAnmatDto } from './dto/create-reporte-anmat.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JsonContains } from 'typeorm';
import { API_MESSAGES } from 'common/constants/messages';
import { ApiResponseDTO } from 'common/dto/api-response.dto';

@Controller('reporte-anmat')
export class ReporteAnmatController {
  constructor(private readonly reporteAnmatService: ReporteAnmatService) {}


  @Post("reporteAnmat")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enviar reprote recetas ANMAT' })
  @ApiBody({ type:  CreateReporteAnmatDto})
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.LOTES.CREATED, type: ApiResponseDTO<CreateReporteAnmatDto>, })
  async create(@Body() createReproteAnmatDTO: CreateReporteAnmatDto): Promise<ApiResponseDTO<string[] | null>> {
      const codigosRecetas = await this.reporteAnmatService.reportarRecetasANMAT (createReproteAnmatDTO);
      return codigosRecetas;
  }
 

}
