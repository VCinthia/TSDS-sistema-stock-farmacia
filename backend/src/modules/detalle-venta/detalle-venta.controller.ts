import { Controller, Get, Param } from '@nestjs/common';
import { DetalleVentaService } from './detalle-venta.service';


@Controller('detalle-venta')
export class DetalleVentaController {
  constructor(private readonly detalleVentaService: DetalleVentaService) {}


}
