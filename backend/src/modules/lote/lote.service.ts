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
    private readonly loteRepo: Repository<Lote>,

    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,

    @InjectRepository(Sucursal)
    private readonly sucursalRepo: Repository<Sucursal>,
  ) {}



async create(createLoteDto: CreateLoteDto): Promise<Lote> {

  const { fecha_vencimiento, cantidad, id_producto, id_proveedor, id_sucursal } = createLoteDto;

  if (new Date(fecha_vencimiento) < new Date()) {
  throw new BadRequestException('La fecha de vencimiento debe ser futura');
}

  const producto = await this.productoRepo.findOneBy({ id_producto });
  const proveedor = await this.proveedorRepo.findOneBy({ id_proveedor });
  const sucursal = await this.sucursalRepo.findOneBy({ id_sucursal });

  if (!producto || !proveedor || !sucursal) {
    throw new NotFoundException('Producto, Proveedor o Sucursal no encontrado');
  }

  const lote = this.loteRepo.create({
    fecha_vencimiento,
    cantidad,
    producto,
    proveedor,
    sucursal,
  });

  return await this.loteRepo.save(lote);
}

  findAll(): Promise<Lote[]> {
    return this.loteRepo.find();
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
