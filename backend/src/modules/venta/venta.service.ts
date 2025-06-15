import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from 'src/entities/venta.entity';
import { DataSource, In, MoreThan, QueryRunner, Repository } from 'typeorm';
import { ClienteService } from '../cliente/cliente.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ProductoService } from '../producto/producto.service';
import { AnmatService } from '../anmat/anmat.service';
import { getMethodName } from 'common/utils/method-name';
import { RecetaValidadaDto } from './dto/receta-valida.dto';
import { plainToInstance } from 'class-transformer';
import { Producto } from 'src/entities/producto.entity';
import { TipoProducto } from 'src/enums/tipo-producto.enum';
import { TicketRecetaService } from '../ticket-receta/ticket-receta.service';
import { TicketReceta } from 'src/entities/ticket-receta.entity';
import { Lote } from 'src/entities/lote.entity';
import { LoteService } from '../lote/lote.service';
import { ProductoVentaDto } from './dto/producto-venta.dto';
import { UpdateLoteDto } from '../lote/dto/update-lote.dto';
import { DetalleVenta } from 'src/entities/detalle-venta.entity';
import { SucursalService } from '../sucursal/sucursal.service';
import { Cliente } from 'src/entities/cliente.entity';
import { RangoDescuento } from 'src/entities/rango-descuento.entity';
import { RangoDescuentoService } from '../rango-descuento/rango-descuento.service';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { API_MESSAGES } from 'common/constants/messages';
import { ResponseVentaDto } from './dto/response-venta.dto';
import { ErrorCodes } from 'common/constants/error-codes';


@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepo: Repository<Venta>,
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,

    private readonly clienteService : ClienteService,
    private readonly sucursalService : SucursalService,
    private readonly usuarioService : UsuarioService,
    private readonly productoService : ProductoService,
    private readonly ticketService : TicketRecetaService,
    private readonly loteService: LoteService,
    private readonly anmatService: AnmatService,
    private readonly rangoService : RangoDescuentoService,
    private dataSource: DataSource,
  ){}



async create(requesBody: CreateVentaDto) : Promise<ApiResponseDTO<Venta | null>> {
  Logger.log('Inicio',getMethodName());
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
  // 1. Validaciones previas
    const [clienteDB, usuarioDB, sucursalDB] = await Promise.all([
      this.clienteService.findByDni(requesBody.dni_cliente),
      this.usuarioService.findOne(requesBody.id_usuario),
      this.sucursalService.findOne(requesBody.id_sucursal)
    ]);

    if (!clienteDB) {throw new NotFoundException(`Cliente con DNI ${requesBody.dni_cliente} no encontrado`);}
    if (!usuarioDB) { throw new NotFoundException(`Usuario con ID ${requesBody.id_usuario} no encontrado`);}
    if (!sucursalDB) { throw new NotFoundException(`Sucursal con ID ${requesBody.id_sucursal} no encontrada`);}

    // 2. Validación de productos y receta
    const {productosDB, requiereReceta} = await this.validarProductos(requesBody);



    // 3. Crear venta y ticket de receta (si aplica, validacin de receta) 
    const venta = new Venta();
    venta.fecha = new Date();
    venta.cliente = clienteDB;
    venta.usuario = usuarioDB;
    venta.sucursal = sucursalDB;
    venta.puntos_cliente_inicial = clienteDB.puntos_fidelizacion;

    if (requesBody.numero_receta) {
      venta.ticketReceta = await this.crearTicketReceta(requesBody, productosDB );
    }


    // 4. Procesar detalles y actualizar stock (lotes)
    const { detalles, subtotal } = await this.procesarDetalles(
      queryRunner,
      requesBody.productos,
      productosDB,
      sucursalDB.id_sucursal
    );

    // 5. Calcular totales
    const reponseDesc = await this.aplicarDescuento(subtotal, clienteDB.puntos_fidelizacion);
    const totalNeto = reponseDesc.totalfinal;
    venta.subtotal = subtotal;
    venta.puntos_generados = Math.floor(totalNeto / 1000);
    venta.total_final = totalNeto;
    venta.descuento_porcentaje = reponseDesc.porcAplicado;

    // 6. Guardar todo en transacción
    venta.detalles = detalles;
    const ventaGuardada = await queryRunner.manager.save(venta);
    
    // 7. Actualizar puntos del cliente
    clienteDB.puntos_fidelizacion += venta.puntos_generados;
    await queryRunner.manager.save(Cliente, clienteDB);


    // 8. Send Novedad Receta utilizada ANMAT
    if (requiereReceta && requesBody.numero_receta) {
     const respPut = await this.anmatService.actualizarEstadoRecetaUtilizada(requesBody.numero_receta);
    }

    await queryRunner.commitTransaction();
    return ApiResponseDTO.success(API_MESSAGES.VENTAS.CREATED , ventaGuardada);
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw new InternalServerErrorException(error.message);
  } finally {
    await queryRunner.release();
  }
}






// --- Métodos auxiliares ---



  /**
   * Aplica el descuento porcentaje al total bruto.
   * @param totalBruto número total al que se le aplicará el descuento
   * @returns el total con el descuento descontado y el porcentaje aplciado
   */
  async aplicarDescuento(totalBruto: number, puntosCliente: number): Promise<{totalfinal: number, porcAplicado: number}> {
    const rango = await this.rangoService.obtenerRangoPorPuntos(puntosCliente);
    if(rango == null){
      throw new Error('No se ha encontrado un rango para los puntos del Cliente');
    }

    const porcentaje = rango.descuento_porcentaje;
    if (porcentaje < 0 || porcentaje > 100) {
      throw new Error('El porcentaje debe estar entre 0 y 100');
    }
    const totalNeto = totalBruto * (1 - porcentaje / 100);
    const totalfinal = Math.round(totalNeto * 100) / 100; // redondeo a 2 decimale
    return{totalfinal: totalfinal, porcAplicado: porcentaje}
  }



private async validarProductos( requesBody: CreateVentaDto):  Promise<{productosDB:Producto[], requiereReceta: boolean}> {
  // Obtener códigos nacionales únicos
  const codigosNacionales = requesBody.productos.map(p => p.codigo_nacional);
  
  // Buscar productos en base de datos
  const productosDB =  await this.productoRepo.findBy({ codigo_nacional: In(codigosNacionales),});

  // Verificar que todos los productos existan
  const codigosEncontrados = productosDB.map(p => p.codigo_nacional);
  const codigosFaltantes = codigosNacionales.filter(c => !codigosEncontrados.includes(c));
  
  if (codigosFaltantes.length > 0) {
    throw new NotFoundException(
      `Productos no encontrados: ${codigosFaltantes.join(', ')}`
    );
  }

  // 6. Verificar stock disponible
  for(const prod of requesBody.productos){      
    const stock = await this.loteService.obtenerStockPorCodigoProdYSucursal(prod.codigo_nacional, requesBody.id_sucursal);
    if (stock < prod.cantidad) {
      throw new Error( `Stock insuficiente para ${prod.codigo_nacional} (disponible: ${stock})`);
    }
  }

    // Verificar productos que requieren receta
  const requiereReceta = productosDB.some(p => 
    p.tipo === TipoProducto.BAJO_PRESCRIPCION || 
    p.tipo === TipoProducto.TRATAMIENTO_ESPECIAL
  );

  // Validar existencia de receta si es requerida
  if (requiereReceta) {
    if (!requesBody.numero_receta) {
      throw new BadRequestException(
        'Se requiere número de receta para productos bajo prescripción'
      );
    }
  }
  return  {productosDB: productosDB, requiereReceta: requiereReceta};
}



private async crearTicketReceta(requestBody: CreateVentaDto, productosDB: Producto[]): Promise<TicketReceta> {
  try {
    // Filtrar solo productos que requieren receta
    const productosReceta = productosDB.filter(p => 
      p.tipo === TipoProducto.BAJO_PRESCRIPCION || 
      p.tipo === TipoProducto.TRATAMIENTO_ESPECIAL
    );
    
    // Service Call
    const recetaValidada = await this.validarReceta( requestBody, productosReceta);

    // Crear entidad TicketReceta
    const ticketReceta = new TicketReceta();
    ticketReceta.numero_receta = recetaValidada.codigo;
    ticketReceta.fecha_emision = recetaValidada.fecha_emision;
    ticketReceta.fecha_expiracion = recetaValidada.fecha_expiracion;
    ticketReceta.fecha_recepcion = new Date();
    ticketReceta.maricula_medico = recetaValidada.matricula_medico;
    ticketReceta.dni_paciente = recetaValidada.dni_paciente;

    // Crear relación con productos
    ticketReceta.detalle_productos = recetaValidada.productos;

    return ticketReceta;
  } catch (error) {
    throw new BadRequestException(
      `Error al validar receta: ${error.message}`
    );
  }
}


private async procesarDetalles( queryRunner: QueryRunner,  
                                productosVenta: ProductoVentaDto[],  
                                productosDB: Producto[],  
                                sucursalId: number
                              ) {
  const detalles: DetalleVenta[] = [];
  let subtotal = 0;
  // Crear mapa de productos para búsqueda más eficiente
  const productosMapFromDB = new Map<string, Producto>();
  productosDB.forEach(p => productosMapFromDB.set(p.codigo_nacional, p));

  for (const prodRequest of productosVenta) {
    // 1. Buscar producto por código nacional
    const productoDB = productosMapFromDB.get(prodRequest.codigo_nacional);

    if (!productoDB) {
      throw new NotFoundException(
        `Producto con código ${prodRequest.codigo_nacional} no encontrado`
      );
    }

    //Obtener todos los lotes válidos ordenados por fecha de vencimiento
    const lotes = await this.seleccionarLotesValidos(
        queryRunner, 
        productoDB.id_producto, 
        sucursalId, 
        prodRequest.cantidad
    );

    // Crear detalle
    const detalle = new DetalleVenta();
    detalle.cantidad = prodRequest.cantidad;
    detalle.precio_unitario = productoDB.precio_unitario;
    detalle.producto = productoDB;
    detalles.push(detalle);


    // Actualizar stock LOTES (FIFO)
    let cantidadRestante = prodRequest.cantidad;
    const lotesUtilizados : string[] = [];

    for (const lote of lotes) {
      if (cantidadRestante <= 0) break;
      const cantidadAUsar = Math.min(cantidadRestante, lote.cantidad);
      
      // Actualizar lote
      lote.cantidad -= cantidadAUsar;
      await queryRunner.manager.save(Lote, lote);

      //Lotes Usados
      const detalleLote = `Lote: ${lote.id_lote} Cantidad: ${cantidadAUsar}`;
      lotesUtilizados.push(detalleLote)
      
      cantidadRestante -= cantidadAUsar;
    }
    Logger.log(`STOCK UTILIZADO -  ${lotesUtilizados} `, getMethodName());
  
    //Calculo PrecioTotal-sin descuento
    subtotal += productoDB.precio_unitario * prodRequest.cantidad;
  }

  return { detalles, subtotal };
}


private async seleccionarLotesValidos( queryRunner: QueryRunner,
                              productoId: number,  
                              sucursalId: number,  
                            cantidad: number): Promise<Lote[]> {
  
  const lotes = await queryRunner.manager.find(Lote, {
    where: {
      producto: { id_producto: productoId },
      sucursal: { id_sucursal: sucursalId },
      cantidad: MoreThan(0),
      fecha_vencimiento: MoreThan(new Date())
    },
    order: { fecha_vencimiento: 'ASC' }
  });

   //Verificar stock total disponible
  const stockTotal = lotes.reduce((sum, lote) => sum + lote.cantidad, 0);
    if (stockTotal < cantidad) {
      throw new NotFoundException(
        `Stock insuficiente para ProductoId: ${productoId}. ` +
        `Necesario: ${cantidad}, Disponible: ${stockTotal}`
      );
    }
  return lotes;
}



async validarReceta( request : CreateVentaDto, prodsRequerenReceta: Producto[]) : Promise<RecetaValidadaDto> {
  const response = await this.anmatService.consultarRecetaANMAT(request.numero_receta!);

  try{
      if(!response.success){
      throw new Error('Error al consular la receta en ANMAT');
  }

  if(response.data?.dniPaciente != request.dni_cliente){
    throw new Error('La receta no es del paciente: '+request.dni_cliente);
  }

  if(!response.data?.valida){
      throw new Error('Receta inválida o expirada');
  }

  if(response.data.detalle.length != prodsRequerenReceta.length){
    throw new Error('La lista de productos no coincide con la receta');
  }

  //Validacion de Cada producto de la Receta
  for (const prod of prodsRequerenReceta) {
    const prescripcion =  response.data.detalle.find( p => p.codigo === prod.codigo_nacional );

    if (!prescripcion) {
      throw new Error( `Producto ${prod.codigo_nacional} no está en la receta` );
    }

    const ventaCantidad = request.productos.find( p => p.codigo_nacional === prod.codigo_nacional )!.cantidad;

    if (ventaCantidad !== prescripcion.cantidad) {
      throw new Error(`Cantidad para ${prod.nombre} no coincide con receta` );
    }
  }    

  //Remapeo
  const productos = response.data.detalle.map((item) => ({
    codigo_nacional: item.codigo,
    cantidad_prescrita: item.cantidad
  }));
  return plainToInstance(RecetaValidadaDto, {
    codigo: response.codigo,
    dni_paciente: response.data.dniPaciente,
    productos,
    matricula_medico : response.data.matriculaMedico,
    fecha_emision: response.data.emision,
    fecha_expiracion: response.data.expiracion,
  });

  }catch(error){
    const mensaje= ` ${error.response?.data?.message || error.message}`
    Logger.error(mensaje, error.stack, getMethodName());
    throw new Error(mensaje);
  }

  }



async findAll(): Promise<ApiResponseDTO<ResponseVentaDto[] | null>> {
  try {
    const lotes = await this.ventaRepo.find({
    relations: {
      cliente: true,
      sucursal: true,
      ticketReceta: true,
      usuario: true,
      detalles: {
        producto: true,
      }
    }
    });

    const lotesDto = plainToInstance(ResponseVentaDto, lotes, {
      excludeExtraneousValues: true,
    });

    if(lotesDto.length === 0){
      return ApiResponseDTO.success(API_MESSAGES.INFO.EMPTY, lotesDto);
    }
    return ApiResponseDTO.success(API_MESSAGES.VENTAS.ALL, lotesDto);
  } catch (error) {
    Logger.error(`Error al obtener ventas: ${error.message}`, error.stack, getMethodName());
    return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
  }
}




async findOne(id: number): Promise<ApiResponseDTO<ResponseVentaDto | null>> {
  Logger.log('Inicio - ventaID: '+id ,getMethodName());
  try {
    const venta = await this.ventaRepo.findOne({
    relations: {
      cliente: true,
      sucursal: true,
      ticketReceta: true,
      usuario: true,
      detalles: {
        producto: true,
      }
    },
    where: { id_venta: id}
    });

    if (!venta) {
      return ApiResponseDTO.error(API_MESSAGES.VENTAS.NOT_FOUND, ErrorCodes.NOT_FOUND);
    }

    const ventaDTO = plainToInstance(ResponseVentaDto, venta, {
      excludeExtraneousValues: true,
    });

    return ApiResponseDTO.success(API_MESSAGES.INFO.OK, ventaDTO);
  } catch (error) {
    Logger.error(`Error al obtener la venta: ${error.message}`, error.stack, getMethodName());
    return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
  }
}



async findAllBySucursal(idSucursal : number): Promise<ApiResponseDTO<ResponseVentaDto[] | null>> {
  Logger.log('Inicio - sucursalID: '+ idSucursal ,getMethodName());
  try {
  const ventas = await this.ventaRepo.find({
    relations: {
      cliente: true,
      sucursal: true,
      ticketReceta: true,
      usuario: true,
      detalles: {
        producto: true,
      }
    },
    where: {
      sucursal: {
        id_sucursal: idSucursal
      }
    }
  });

    const ventasDto = plainToInstance(ResponseVentaDto, ventas, {
      excludeExtraneousValues: true,
    });

    if(ventasDto.length === 0){
      return ApiResponseDTO.success(API_MESSAGES.INFO.EMPTY, ventasDto);
    }
    return ApiResponseDTO.success(API_MESSAGES.VENTAS.ALL, ventasDto);
  } catch (error) {
    Logger.error(`Error al obtener ventas: ${error.message}`, error.stack, getMethodName());
    return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
  }
}




}