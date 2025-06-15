import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseProductoDto } from './dto/response-producto.dto';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { API_MESSAGES } from 'common/constants/messages';
import { ResponseProductoMasVendidosDto } from './dto/response-producto-mas-vendidos.dto';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @ApiOperation({ summary: 'crrea un nuevo producto' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos los productos' })
  findAll() {
    return this.productoService.findAll();
  }


  @Get("/stock-critico/:idSucursal'")
  @ApiOperation({ summary: 'Retorna productos con stock crítico o agotado de una sucursal' })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.PRODUCTOS.ALL, type: ApiResponseDTO<ResponseProductoDto[]>, })
  async findAllBySucursal(@Param('idSucursal', new ParseIntPipe()) idSucursal: number): Promise<ApiResponseDTO<ResponseProductoDto[] | null>> {
    const productos = await this.productoService.getProductosStockCritico(idSucursal);
    return productos;
  }


  @Get("/mas-vendidos/:idSucursal")
  @ApiOperation({ summary: 'Retorna los 10 productos más vendidos de una sucursal con 30 días de antelacion' })
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.LOTES.ALL, type: ApiResponseDTO<ResponseProductoMasVendidosDto[]>, })
  async getProductosMasVendidos(@Param('idSucursal', new ParseIntPipe()) idSucursal: number): Promise<ApiResponseDTO<ResponseProductoMasVendidosDto[] | null>> {
    const productos = await this.productoService.getProductosMasVendidos(idSucursal);
    return productos;
  }




  @Get(':id')
  @ApiOperation({ summary: 'Retorna un producto por ID' })
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

}
