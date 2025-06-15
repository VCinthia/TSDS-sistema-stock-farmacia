import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiOperation } from '@nestjs/swagger';

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

  @Get(':id')
  @ApiOperation({ summary: 'Retorna un producto por ID' })
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

}
