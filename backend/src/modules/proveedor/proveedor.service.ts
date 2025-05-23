import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from 'src/entities/proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,
  ) {}

  create(createProveedorDto: CreateProveedorDto):Promise<Proveedor> {
    const nuevoProveedor = this.proveedorRepo.create(createProveedorDto);
    return this.proveedorRepo.save(nuevoProveedor);
  }

  findAll(): Promise<Proveedor[]> {
    return this.proveedorRepo.find();
  }


  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepo.findOneBy({ id_proveedor: id });
      if (!proveedor) {
        throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
      }
      return proveedor;
  }

  
  update(id: number, updateProveedorDto: UpdateProveedorDto) {
    return `This action updates a #${id} proveedor`;
  }

  async remove(id: number): Promise<void> {
    await this.proveedorRepo.delete(id);
  }
}
