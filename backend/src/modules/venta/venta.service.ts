import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from 'src/entities/venta.entity';
import { In, Repository } from 'typeorm';
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


@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepo: Repository<Venta>,
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,

    private readonly clieneService : ClienteService,
    private readonly usuarioService : UsuarioService,
    private readonly productoService : ProductoService,
    private readonly ticketService : TicketRecetaService,
    private readonly loteService: LoteService,
    private readonly anmatService: AnmatService,
  ){}






  async create(requesBody: CreateVentaDto)  {
    Logger.log('Inicio',getMethodName());
      
    // 1. Validar cliente
    const clienteDB = await this.clieneService.findByDni(requesBody.dni_cliente);
    if (!clienteDB) throw new NotFoundException('Cliente no encontrado');

    // 2. Validar usuario
    const usuarioDB = await this.usuarioService.findOne(requesBody.id_usuario);
    if (!usuarioDB) throw new NotFoundException('Usuario no encontrado');

    // 3. Validar usuario
    const sucursalDB = await this.usuarioService.findOne(requesBody.id_sucursal);
    if (!sucursalDB) throw new NotFoundException('Sucursal no encontrada');

     //4. Verificar si hay productos que requieren receta
    const codesNacProductos = requesBody.productos.map(p => p.codigo_nacional);
    const productosDBFromRequest = await this.productoRepo.findBy({ 
      codigo_nacional: In(codesNacProductos),});
    
    //5. Validar productos con receta
    const requiereReceta = productosDBFromRequest.some(p => 
      p.tipo == TipoProducto.BAJO_PRESCRIPCION || p.tipo == TipoProducto.TRATAMIENTO_ESPECIAL
    );
    if (requiereReceta && !requesBody.numero_receta) {
      throw new Error('Se requiere código de receta para productos bajo prescripción');
    }

    //6. Verificar stock disponible
    for(const prod of requesBody.productos){
      const stock = await this.loteService.obtenerStockPorCodigoProdYSucursal(prod.codigo_nacional, requesBody.id_sucursal);
      if (stock < prod.cantidad) {
        throw new Error( `Stock insuficiente para ${prod.codigo_nacional} (disponible: ${stock})`);
      }
    }


    // 7. Crear VENTA 
    const venta = new Venta;
    venta.fecha = new Date();
    venta.cliente = clienteDB;
    venta.usuario = usuarioDB;
    venta.puntos_cliente_inicial = clienteDB.puntos_fidelizacion;


    //8. Validar receta si es necesario
    let recetaValidada: RecetaValidadaDto;
    let ticketReceta:TicketReceta;
    if (requiereReceta) {
      const prodsReqReceta = productosDBFromRequest.filter(prod =>
        prod.tipo === TipoProducto.BAJO_PRESCRIPCION ||
        prod.tipo === TipoProducto.TRATAMIENTO_ESPECIAL
      )
      recetaValidada = await this.validarReceta( requesBody, prodsReqReceta);

      ticketReceta = new TicketReceta;
      ticketReceta.fecha_emision = recetaValidada.fecha_emision;
      ticketReceta.fecha_expiracion = recetaValidada.fecha_expiracion;
      ticketReceta.fecha_recepcion = new Date();
      ticketReceta.detalle_productos = recetaValidada.productos;
      ticketReceta.numero_receta = recetaValidada.codigo;
      ticketReceta.maricula_medico = recetaValidada.matricula_medico;
      ticketReceta.dni_paciente = recetaValidada.dni_paciente;
      venta.ticketReceta = ticketReceta;
    }

 const hola = await this.crearDetalleVentaYActualizarSock(requesBody.productos);
 let ok;



//------------------------------------ 

}




  findAll() {
    return `This action returns all venta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  remove(id: number) {
    return `This action removes a #${id} venta`;
  }



  async validarReceta( request : CreateVentaDto, prodsRequerenReceta: Producto[]) : Promise<RecetaValidadaDto> {
    const response = await this.anmatService.consultarRecetaANMAT(request.numero_receta!);

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
      const prescripcion =  response.data.detalle.find(
        p => p.codigo === prod.codigo_nacional 
      );

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

  }




  async crearDetalleVentaYActualizarSock(productosVenta: ProductoVentaDto[]){
    let descuento_porcentaje: 0;
    let total_final: 0;
    let puntos_generados: 0;
    let subtotal = 0;
    let id_sucursal = 1;


    for (const prod of productosVenta) {
       // Buscar producto con sus lotes -> lotes mas proximos a vencer el primero
      const prodDB = await this.productoRepo
        .createQueryBuilder('producto')
        .leftJoinAndSelect('producto.lotes', 'lote')
        .where('producto.codigo_nacional = :codigoNacional', { codigoNacional: prod.codigo_nacional })
        .andWhere('lote.sucursal.id_sucursal = :idSucursal', { idSucursal: id_sucursal })
        .andWhere('lote.fecha_vencimiento > :hoy', { hoy: new Date() })
        .orderBy('lote.fecha_vencimiento', 'ASC')
        .getOne();
      
      

    
      if (prodDB?.lotes == null || prodDB?.lotes.length === 0) {
        throw new Error(`No existen lotes válidos para el producto ${prod.codigo_nacional}.`);
      }


      // Tomar el lote con fecha de vencimiento más próxima
      const loteSeleccionado = prodDB.lotes[0];
      if (loteSeleccionado.cantidad < prod.cantidad) {
        //TODO si no encuenta, que pase al otro lote valido
        throw new Error(`No hay suficiente stock en lote para producto ${prod.codigo_nacional}. Disponible: ${loteSeleccionado.cantidad}, requerido: ${prod.cantidad}`);
      }
      // Descontar la cantidad vendida
      loteSeleccionado.cantidad -= prod.cantidad;
      //todo: guardar descontar sock + puntos cliente


      // Calcular precio - venta
        const precioTotal = prodDB.precio_unitario * prod.cantidad;
        subtotal += precioTotal;

        //crear detalle 1 por producto 
         const detalle = new DetalleVenta();
         detalle.cantidad = prod.cantidad;
         detalle.precio_unitario = prodDB.precio_unitario;
         detalle.producto = prodDB;
         //fala id vena

  }

    const venta = new Venta();
    venta.subtotal = subtotal;
    venta.fecha = new Date();



      venta.puntos_generados = Math.floor(subtotal / 1000);


        // 6. Actualizar puntos del cliente
  //cliente.puntos_fidelizacion += venta.puntos_generados;


  }






}