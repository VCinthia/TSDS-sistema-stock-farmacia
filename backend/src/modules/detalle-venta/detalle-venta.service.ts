import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleVenta } from 'src/entities/detalle-venta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleVentaService {
      constructor(
      @InjectRepository(DetalleVenta)
      private readonly detalleVentaRepo: Repository<DetalleVenta>,

    ) {}




  findAll() {
    return `This action returns all detalleVenta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleVenta`;
  }

}
