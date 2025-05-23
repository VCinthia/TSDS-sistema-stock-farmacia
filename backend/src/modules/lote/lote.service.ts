import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { Lote } from 'src/entities/lote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { ErrorCodes } from 'common/constants/error-codes';
import { getMethodName } from 'common/utils/method-name';
import { ProductoService } from '../producto/producto.service';
import { ProveedorService } from '../proveedor/proveedor.service';
import { SucursalService } from '../sucursal/sucursal.service';
import { API_MESSAGES } from 'common/constants/messages';
import { plainToInstance } from 'class-transformer';
import { ResponseLoteDto } from './dto/response-lote.dto';
import { ResponseLoteDetalleDto } from './dto/response-lote-detalle.dto';


@Injectable()
export class LoteService {

    constructor(
    @InjectRepository(Lote)
    private readonly loteRepo: Repository<Lote>,

    private readonly productoService : ProductoService,
    private readonly proveedorService : ProveedorService,
    private readonly sucursalService : SucursalService,
  ) {}



  async create(createLoteDto: CreateLoteDto): Promise<ApiResponseDTO<ResponseLoteDto | null>> {
    const { fecha_vencimiento, cantidad, id_producto, id_proveedor, id_sucursal } = createLoteDto;
     Logger.log('Inicio',getMethodName());
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
        this.productoService.findOne(id_producto),
        this.proveedorService.findOne(id_proveedor),
        this.sucursalService.findOne(id_sucursal),
      ]);

      const lote = this.loteRepo.create({
        fecha_vencimiento,
        cantidad,
        producto,
        proveedor,
        sucursal,
      });

      const savedLote = await this.loteRepo.save(lote);
       const loteResp = plainToInstance(ResponseLoteDto, savedLote, {
       excludeExtraneousValues: true, // Solo incluye los @Expose
      });

      return ApiResponseDTO.success(API_MESSAGES.LOTES.CREATED, loteResp);

    } catch (error) {
      Logger.error(`Error al crear lote: ${error.message}`, error.stack, getMethodName());
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


async findAll(): Promise<ApiResponseDTO<ResponseLoteDto[] | null>> {
  try {
    const lotes = await this.loteRepo.find({
      relations: ['producto', 'proveedor', 'sucursal'], // para incluir relaciones necesarias
    });

    const lotesDto = plainToInstance(ResponseLoteDto, lotes, {
      excludeExtraneousValues: true,
    });

    if(lotesDto.length === 0){
      return ApiResponseDTO.success(API_MESSAGES.INFO.EMPTY, lotesDto);
    }
    return ApiResponseDTO.success(API_MESSAGES.LOTES.ALL, lotesDto);
  } catch (error) {
    Logger.error(`Error al obtener lotes: ${error.message}`, error.stack, getMethodName());
    return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
  }
}



async findOne(id: number): Promise<ApiResponseDTO<ResponseLoteDto | null>> {
  try {
    const lote = await this.loteRepo.findOne({
      where: { id_lote: id },
      relations: ['producto', 'proveedor', 'sucursal'],
    });

    if (!lote) {
      return ApiResponseDTO.error(API_MESSAGES.LOTES.NOT_FOUND, ErrorCodes.NOT_FOUND);
    }

    const loteDto = plainToInstance(ResponseLoteDto, lote, {
      excludeExtraneousValues: true,
    });

    return ApiResponseDTO.success(API_MESSAGES.INFO.OK, loteDto);
  } catch (error) {
    Logger.error(`Error al obtener el lote: ${error.message}`, error.stack, getMethodName());
    return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
  }
}



async update(id: number, updateLoteDto: UpdateLoteDto): Promise<ApiResponseDTO<ResponseLoteDto | null>> {
  try {
    const lote = await this.loteRepo.findOne({
      where: { id_lote: id }});

    if (!lote) {
      return ApiResponseDTO.error(API_MESSAGES.LOTES.NOT_FOUND, ErrorCodes.NOT_FOUND);
    }

    // Actualizar campos (solo si vienen en el DTO)
    Object.assign(lote, updateLoteDto);

    const updatedLote = await this.loteRepo.save(lote);

    const loteDto = plainToInstance(ResponseLoteDto, updatedLote, {
      excludeExtraneousValues: true,
    });

    return ApiResponseDTO.success(API_MESSAGES.LOTES.UPDATED, loteDto);
  } catch (error) {
    Logger.error(`Error al actualizar lote: ${error.message}`, error.stack, getMethodName());
    return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
  }
}



  remove(id: number) {
    return `This action removes a #${id} lote`;
  }
}
