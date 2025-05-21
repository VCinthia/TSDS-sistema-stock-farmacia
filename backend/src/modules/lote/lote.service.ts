import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { Lote } from 'src/entities/lote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Proveedor } from 'src/entities/proveedor.entity';
import { Sucursal } from 'src/entities/sucursal.entity';

@Injectable()
export class LoteService {
    constructor(
    @InjectRepository(Lote)
    private readonly loteRepository: Repository<Lote>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,

    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}



async create(createLoteDto: CreateLoteDto): Promise<Lote> {

  const { fecha_vencimiento, cantidad, id_producto, id_proveedor, id_sucursal } = createLoteDto;

  if (new Date(fecha_vencimiento) < new Date()) {
  throw new BadRequestException('La fecha de vencimiento debe ser futura');
}

  const producto = await this.productoRepository.findOneBy({ id_producto });
  const proveedor = await this.proveedorRepository.findOneBy({ id_proveedor });
  const sucursal = await this.sucursalRepository.findOneBy({ id_sucursal });

  if (!producto || !proveedor || !sucursal) {
    throw new NotFoundException('Producto, Proveedor o Sucursal no encontrado');
  }

  const lote = this.loteRepository.create({
    fecha_vencimiento,
    cantidad,
    producto,
    proveedor,
    sucursal,
  });

  return await this.loteRepository.save(lote);
}

  findAll() {
    return `This action returns all lote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lote`;
  }

  update(id: number, updateLoteDto: UpdateLoteDto) {
    return `This action updates a #${id} lote`;
  }

  remove(id: number) {
    return `This action removes a #${id} lote`;
  }
}
