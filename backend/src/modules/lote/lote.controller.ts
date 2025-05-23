import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { LoteService } from './lote.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { API_MESSAGES } from 'common/constants/messages';
import { ResponseLoteDto } from './dto/response-lote.dto';
import { ResponseLoteDetalleDto } from './dto/response-lote-detalle.dto';

@ApiTags('lote')
@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Crear un nuevo Lote' })
  @ApiBody({ type: CreateLoteDto })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.LOTES.CREATED, type: ApiResponseDTO<ResponseLoteDto>, })
  async create(@Body() createLoteDto: CreateLoteDto): Promise<ApiResponseDTO<ResponseLoteDto | null>> {
      const lote = await this.loteService.create(createLoteDto);
      return lote;
  }


  @Get()
  @ApiOperation({ summary: 'Retorna todos los Lotes' })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.LOTES.ALL, type: ApiResponseDTO<ResponseLoteDto[]>, })
  async findAll(): Promise<ApiResponseDTO<ResponseLoteDto[] | null>> {
    const lotes = await this.loteService.findAll();
    return lotes;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna un Lote por ID' })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.INFO.OK, type: ApiResponseDTO<ResponseLoteDto>, })
   async findOne(@Param('id') id: string) : Promise<ApiResponseDTO<ResponseLoteDto | null>> {
    return await this.loteService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Acualiza un Lote por ID' })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.LOTES.UPDATED, type: ApiResponseDTO<ResponseLoteDto>, })
   async update(@Param('id') id: string, @Body() updateLoteDto: UpdateLoteDto) : Promise<ApiResponseDTO<ResponseLoteDto | null>> {
    return await this.loteService.update(+id, updateLoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loteService.remove(+id);
  }
}
