import { Injectable } from '@nestjs/common';
import { CreateRangoDescuentoDto } from './dto/create-rango-descuento.dto';
import { UpdateRangoDescuentoDto } from './dto/update-rango-descuento.dto';

@Injectable()
export class RangoDescuentoService {
  create(createRangoDescuentoDto: CreateRangoDescuentoDto) {
    return 'This action adds a new rangoDescuento';
  }

  findAll() {
    return `This action returns all rangoDescuento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rangoDescuento`;
  }

  update(id: number, updateRangoDescuentoDto: UpdateRangoDescuentoDto) {
    return `This action updates a #${id} rangoDescuento`;
  }

  remove(id: number) {
    return `This action removes a #${id} rangoDescuento`;
  }
}
