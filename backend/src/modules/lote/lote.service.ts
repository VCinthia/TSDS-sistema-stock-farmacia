import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { Lote } from 'src/entities/lote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Proveedor } from 'src/entities/proveedor.entity';
import { Sucursal } from 'src/entities/sucursal.entity';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { ArgumentOutOfRangeError } from 'rxjs';
import { ErrorCodes } from 'common/constants/error-codes';

@Injectable()
export class LoteService {
    private readonly logger = new Logger(LoteService.name);

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



  async create(createLoteDto: CreateLoteDto): Promise<ApiResponseDTO<Lote | null>> {
    const { fecha_vencimiento, cantidad, id_producto, id_proveedor, id_sucursal } = createLoteDto;

    try {
      // 1. Validación de fecha 
      const isDateValid = this.validateExpirationDate(fecha_vencimiento);
      if (!isDateValid) {
        return ApiResponseDTO.error(
          'Fecha de vencimiento inválida',
          ErrorCodes.INVALID_DATE,'fecha_vencimiento',
        );
      }

      const [producto, proveedor, sucursal] = await Promise.all([
        this.findProducto(id_producto),
        this.findProveedor(id_proveedor),
        this.findSucursal(id_sucursal),
      ]);

      const lote = this.loteRepo.create({
        fecha_vencimiento,
        cantidad,
        producto,
        proveedor,
        sucursal,
      });

      const savedLote = await this.loteRepo.save(lote);
      return ApiResponseDTO.success('Lote creado exitosamente', savedLote);

    } catch (error) {
      this.logger.error(`Error al crear lote: ${error.message}`, error.stack);
      if(error instanceof NotFoundException){
        return ApiResponseDTO.error(
          error.message,
          ErrorCodes.NOT_FOUND,
        );
      }
      // Errores inesperados 
      return ApiResponseDTO.error(
        error.message,
        ErrorCodes.INTERNAL_ERROR,
      );
    }
  }




  private validateExpirationDate(fecha: Date | string): boolean {
    const expirationDate = new Date(fecha);
    return expirationDate > new Date();
  }

  private async findProducto(id: number): Promise<Producto> {
    const producto = await this.productoRepo.findOneBy({ id_producto: id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  private async findProveedor(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepo.findOneBy({ id_proveedor: id });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
    return proveedor;
  }

  private async findSucursal(id: number): Promise<Sucursal> {
    const sucursal = await this.sucursalRepo.findOneBy({ id_sucursal: id });
    if (!sucursal) {
      throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
    }
    return sucursal;
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
