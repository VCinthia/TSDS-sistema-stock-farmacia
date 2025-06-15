import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Lote } from 'src/entities/lote.entity';
import { ResponseProductoDto } from './dto/response-producto.dto';
import { tr } from '@faker-js/faker/.';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { getMethodName } from 'common/utils/method-name';
import { ErrorCodes } from 'common/constants/error-codes';
import { plainToInstance } from 'class-transformer';
import { API_MESSAGES } from 'common/constants/messages';
import { DetalleVenta } from 'src/entities/detalle-venta.entity';
import { ResponseProductoMasVendidosDto } from './dto/response-producto-mas-vendidos.dto';
import { Deserializer } from 'v8';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,

    @InjectRepository(Lote)
    private readonly loteRepo: Repository<Lote>,

    @InjectRepository(DetalleVenta)
    private readonly detalleVentaRepo: Repository<DetalleVenta>,
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
  

  async getProductosStockCritico(idSucursal: number): Promise<ApiResponseDTO<ResponseProductoDto[] | null>> {
    Logger.log(`Inicio - idSucursal: ${idSucursal}`,getMethodName());
    try{
       const hoy = new Date();
    
    // Obtener todos los productos con su umbral de stock
    const productosDB = await this.productoRepo.find();

    // Obtener lotes válidos para la sucursal
    const lotes = await this.loteRepo.find({
      relations: {
        producto: true,
      },
      where: {
        sucursal: { id_sucursal: idSucursal },
        fecha_vencimiento: MoreThan(hoy)
      }
    });

    // Calcular stock por producto
    const stockPorProducto = new Map<number, number>();
    
    // Calcular el stock total para cada producto
    for (const lote of lotes) {
      const productoId = lote.producto.id_producto;
      const cantidadActual = stockPorProducto.get(productoId) || 0;
      const nuevoStock = cantidadActual + lote.cantidad;
      stockPorProducto.set(productoId, nuevoStock);
    }  

    // Filtrar productos con stock crítico y crear objetos con stock actual
    const productosCriticosConStockActual = productosDB
      .map(producto => {
        const stockActual = stockPorProducto.get(producto.id_producto) || 0;
        return {
          ...producto,
          stock_actual: stockActual
        };
      })
      .filter(producto => producto.stock_actual <= producto.umbral_stock);


    // Formatear respuesta
    const productosResp = plainToInstance(ResponseProductoDto, productosCriticosConStockActual, {
         excludeExtraneousValues: true, // Solo incluye los @Expose
         });
     return ApiResponseDTO.success(API_MESSAGES.PRODUCTOS.ALL, productosResp);


   } catch (error) {
     Logger.error(`Error al obtener productos con stock critico de la sucursalID: ${idSucursal} - ${error.message}`, error.stack, getMethodName());
     return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
   }
  }



  async getProductosMasVendidos(idSucursal: number): Promise<ApiResponseDTO<ResponseProductoMasVendidosDto[] | null>> {
    const diasAntelacion = 30;
    Logger.log(`Inicio - idSucursal: ${idSucursal}`,getMethodName());
    try{
    const fechaInicio = new Date();
    fechaInicio.setDate(fechaInicio.getDate() - diasAntelacion);
    
    const topProductos = await this.detalleVentaRepo
      .createQueryBuilder('detalle')
      .select([
    'producto.codigo_nacional AS "codigo_nacional"',
    'producto.nombre AS "nombre"',
    'producto.categoria AS "categoria"',
    'producto.tipo AS "tipo"',
    'SUM(detalle.cantidad) AS "cantidad_vendida"'
      ])
      .innerJoin('detalle.producto', 'producto')
      .innerJoin('detalle.venta', 'venta') // Aquí 'venta' es correcto
      .innerJoin('venta.sucursal', 'sucursal')
      .where('sucursal.id_sucursal = :idSucursal', { idSucursal })
      .andWhere('venta.fecha >= :fechaInicio', { fechaInicio })
      .groupBy(
        'producto.id_producto, producto.nombre, producto.codigo_nacional, producto.categoria, producto.tipo',
      )
      .orderBy('cantidad_vendida', 'DESC')
      .limit(10)
      .getRawMany();

  
  const productosResp = plainToInstance(ResponseProductoMasVendidosDto, topProductos, {
    excludeExtraneousValues: true
  });
     return ApiResponseDTO.success(API_MESSAGES.PRODUCTOS.ALL, productosResp);


   } catch (error) {
     Logger.error(`Error al obtener productos con más vendidos de la sucursalID: ${idSucursal} - ${error.message}`, error.stack, getMethodName());
     return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
   }
  }


}
