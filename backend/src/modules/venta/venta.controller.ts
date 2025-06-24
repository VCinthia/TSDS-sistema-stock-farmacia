import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, ParseIntPipe, Header, StreamableFile } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiProduces, ApiResponse } from '@nestjs/swagger';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { Venta } from 'src/entities/venta.entity';
import { API_MESSAGES } from 'common/constants/messages';
import { ResponseVentaDto } from './dto/response-venta.dto';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiBody({ type: CreateVentaDto })
  async create(@Body() createVentaDto: CreateVentaDto) :  Promise<ApiResponseDTO<Venta| null>> {
    return this.ventaService.create(createVentaDto);
  }


  @Post('reporte/pdf') 
  @ApiOperation({summary: 'Generar reporte de ventas en PDF' })
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=reporte_ventas.pdf')
  @ApiConsumes('application/json')
  @ApiProduces('application/pdf')
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.VENTAS.ALL, content: {'application/pdf': { schema: { type: 'string', format: 'binary' }}}, })
  async generarReporteVentasPdfByIdList( @Body() idVentas: number[]) : Promise<StreamableFile> {
    const pdfBuffer = await this.ventaService.generarReporteVentasPdfByIdList(idVentas);
    //Retorna el PDF en Binario
    return new StreamableFile(pdfBuffer);
  }



   @Get()
   @ApiOperation({ summary: 'Retorna todas las Ventas' })
   @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.VENTAS.ALL, type: ApiResponseDTO<ResponseVentaDto[]>, })
   async findAll(): Promise<ApiResponseDTO<ResponseVentaDto[] | null>> {
     const ventas = await this.ventaService.findAll();
     return ventas;
   }
 

  @Get("/bySucursal")
  @ApiOperation({ summary: 'Retorna todas las ventas de una sucursal' })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.VENTAS.ALL, type: ApiResponseDTO<ResponseVentaDto[]>, })
  async findAllBySucursal(@Query('idSucursal', new ParseIntPipe()) idSucursal: number): Promise<ApiResponseDTO<ResponseVentaDto[] | null>> {
    const ventas = await this.ventaService.findAllBySucursal(idSucursal);
    return ventas;
  } 



 @Get(':id')
  @ApiOperation({ summary: 'Retorna una Venta por ID' })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.INFO.OK, type: ApiResponseDTO<ResponseVentaDto>, })
   async findOne(@Param('id') id: number) : Promise<ApiResponseDTO<ResponseVentaDto | null>> {
    return await this.ventaService.findOne(+id);
  }  





}
