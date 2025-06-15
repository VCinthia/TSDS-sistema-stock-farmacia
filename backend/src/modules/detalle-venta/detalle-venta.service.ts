import { Injectable } from '@nestjs/common';

@Injectable()
export class DetalleVentaService {

  findAll() {
    return `This action returns all detalleVenta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleVenta`;
  }

}
