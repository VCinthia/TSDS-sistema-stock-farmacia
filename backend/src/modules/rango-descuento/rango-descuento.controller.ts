import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RangoDescuentoService } from './rango-descuento.service';
import { CreateRangoDescuentoDto } from './dto/create-rango-descuento.dto';
import { UpdateRangoDescuentoDto } from './dto/update-rango-descuento.dto';

@Controller('rango-descuento')
export class RangoDescuentoController {
  constructor(private readonly rangoDescuentoService: RangoDescuentoService) {}



}
