import { Injectable } from '@nestjs/common';
import { CreateReporteAnmatDto } from './dto/create-reporte-anmat.dto';
import { UpdateReporteAnmatDto } from './dto/update-reporte-anmat.dto';

@Injectable()
export class ReporteAnmatService {
  create(createReporteAnmatDto: CreateReporteAnmatDto) {
    return 'This action adds a new reporteAnmat';
  }

  findAll() {
    return `This action returns all reporteAnmat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reporteAnmat`;
  }

  update(id: number, updateReporteAnmatDto: UpdateReporteAnmatDto) {
    return `This action updates a #${id} reporteAnmat`;
  }

  remove(id: number) {
    return `This action removes a #${id} reporteAnmat`;
  }
}
