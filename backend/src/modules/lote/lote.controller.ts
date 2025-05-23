import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { LoteService } from './lote.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Lote } from 'src/entities/lote.entity';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { API_MESSAGES } from 'common/constants/messages';
import { plainToInstance } from 'class-transformer';
import { ResponseLoteDto } from './dto/response-lote.dto';

@ApiTags('lote')
@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Crear un nuevo Lote' })
  @ApiBody({ type: CreateLoteDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: API_MESSAGES.LOTES.CREATED, type: ApiResponseDTO<ResponseLoteDto>, })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de entrada inválidos o fecha de vencimiento pasada', type: ApiResponseDTO<null>} )
  async create(@Body() createLoteDto: CreateLoteDto): Promise<ApiResponseDTO<ResponseLoteDto | null>> {
      const lote = await this.loteService.create(createLoteDto);
      return lote;
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
