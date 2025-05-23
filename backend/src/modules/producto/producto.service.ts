import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}



  create(createProductoDto: CreateProductoDto):Promise<Producto> {
    const nuevoProducto = this.productoRepo.create(createProductoDto);
    return this.productoRepo.save(nuevoProducto);
  }

  findAll(): Promise<Producto[]> {
    return this.productoRepo.find();
  }

  async findOne (id: number): Promise<Producto> {
    const producto = await this.productoRepo.findOneBy({ id_producto: id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
    return producto;
  }
  

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  async remove(id: number): Promise<void> {
    await this.productoRepo.delete(id);
  }
}
