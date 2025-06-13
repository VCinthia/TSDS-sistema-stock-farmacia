import { Injectable } from '@nestjs/common';
import { CreateRangoDescuentoDto } from './dto/create-rango-descuento.dto';
import { UpdateRangoDescuentoDto } from './dto/update-rango-descuento.dto';
import { Segmento } from 'src/enums/segmento.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { RangoDescuento } from 'src/entities/rango-descuento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RangoDescuentoService {
    constructor(
    @InjectRepository(RangoDescuento)
    private readonly rangoRepo: Repository<RangoDescuento>,
    
    ) {}
  


  create(createRangoDescuentoDto: CreateRangoDescuentoDto) {
    return 'This action adds a new rangoDescuento';
  }

  findAll() {
    return `This action returns all rangoDescuento`;
  }

  async findBySegmento(segmento : Segmento) {
   return await this.rangoRepo.findOne({ where: { segmento: segmento} });
  }


  update(id: number, updateRangoDescuentoDto: UpdateRangoDescuentoDto) {
    return `This action updates a #${id} rangoDescuento`;
  }

/**
   * Busca el rango de descuento que corresponde para la cantidad de puntos dada.
   * Retorna el rango con el mayor puntos_minimos donde puntos_minimos <= puntos
   * si no existe, retorna null.
   */
  public async obtenerRangoPorPuntos(puntos: number): Promise<RangoDescuento | null> {
    const rango = await this.rangoRepo.createQueryBuilder('r')
      .where('r.puntos_minimos <= :puntos', { puntos })
      .orderBy('r.puntos_minimos', 'DESC')
      .getOne();
    return rango || null;
  }



}
