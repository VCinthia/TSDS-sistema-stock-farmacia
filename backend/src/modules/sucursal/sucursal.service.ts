import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { Sucursal } from 'src/entities/sucursal.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SucursalService {
  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}


  create(createSucursalDto: CreateSucursalDto): Promise<Sucursal> {
    const nuevaSucursal = this.sucursalRepository.create(createSucursalDto);
    return this.sucursalRepository.save(nuevaSucursal);
  }

  findAll(): Promise<Sucursal[]> {
    return this.sucursalRepository.find();
  }

  async update(id: number, updateSucursalDto: UpdateSucursalDto) : Promise<Sucursal> {
    await this.sucursalRepository.update(id, updateSucursalDto);
    const updated = await this.sucursalRepository.findOneBy({ id_sucursal: id });
    if (!updated) {
      throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
    }

    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.sucursalRepository.delete(id);
  }
}
