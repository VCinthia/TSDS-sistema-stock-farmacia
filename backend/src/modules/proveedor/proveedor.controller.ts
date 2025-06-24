import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo proveedor' })
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedorService.create(createProveedorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos los proveedores' })
  findAll() {
    return this.proveedorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna un proveedor por ID' })
  findOne(@Param('id') id: string) {
    return this.proveedorService.findOne(+id);
  }
  
}
