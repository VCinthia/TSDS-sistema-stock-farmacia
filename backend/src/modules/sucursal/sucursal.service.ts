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
    private readonly sucursalRepo: Repository<Sucursal>,
  ) {}


  create(createSucursalDto: CreateSucursalDto): Promise<Sucursal> {
    const nuevaSucursal = this.sucursalRepo.create(createSucursalDto);
    return this.sucursalRepo.save(nuevaSucursal);
  }

  findAll(): Promise<Sucursal[]> {
    return this.sucursalRepo.find();
  }

  async update(id: number, updateSucursalDto: UpdateSucursalDto) : Promise<Sucursal> {
    await this.sucursalRepo.update(id, updateSucursalDto);
    const updated = await this.sucursalRepo.findOneBy({ id_sucursal: id });
    if (!updated) {
      throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
    }

    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.sucursalRepo.delete(id);
  }
}
