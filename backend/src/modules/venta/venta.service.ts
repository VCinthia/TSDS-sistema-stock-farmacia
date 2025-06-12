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
import { getDateToday } from 'common/utils/date-utils';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepo: Repository<Venta>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    

    private readonly clieneService : ClienteService,
    private readonly usuarioService : UsuarioService,
    private readonly productoService : ProductoService,
    private readonly anmatService: AnmatService,
  ){}






  async create(requesBody: CreateVentaDto)  {
    Logger.log('Inicio',getMethodName());
      
    // 1. Validar cliente
    const cliente = await this.clieneService.findByDni(requesBody.dni_cliente);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

     //2. Verificar si hay productos que requieren receta
    const codesNacProductos = requesBody.productos.map(p => p.codigo_nacional);
    const productosList = await this.productoRepository.findBy({ 
      codigo_nacional: In(codesNacProductos),});
    
    // Validar productos con receta
    const requiereReceta = productosList.some(p => 
      p.tipo == TipoProducto.BAJO_PRESCRIPCION || p.tipo == TipoProducto.TRATAMIENTO_ESPECIAL
    );
    if (requiereReceta && !requesBody.numero_receta) {
      throw new Error(
        'Se requiere código de receta para productos bajo prescripción'
      );
    }


      // 2. Validar receta si es necesario
      let recetaValidada;
      if (requiereReceta) {
        recetaValidada = await this.validarReceta( requesBody.numero_receta!, requesBody.dni_cliente);



        for (const productoDB of productosList) {
          const prescripcion = recetaValidada.productos.find(
            p => p.codigo_nacional === productoDB.codigo_nacional
          );

          if (!prescripcion) {
            throw new Error(
              `Producto ${productoDB.nombre} no está en la receta`
            );
          }

          const ventaCantidad = requesBody.productos.find(
            p => p.codigo_nacional === productoDB.codigo_nacional
          )!.cantidad;

          if (ventaCantidad !== prescripcion.cantidad_prescrita) {
            throw new Error(
              `Cantidad para ${productoDB.nombre} no coincide con receta`
            );
          }
        }
      }

      // agegar que exista stock disponible



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



  async validarReceta(codigoReceta: string, dniPaciente: string) : Promise<RecetaValidadaDto> {
    const response = await this.anmatService.consultarRecetaANMAT(codigoReceta);

    if(!response.success){
       throw new Error('Error al consular la receta en ANMAT');
    }

    if(response.data?.dniPaciente != dniPaciente){
      throw new Error('La receta no es del paciente: '+dniPaciente);
    }

    if(!response.data?.valida){
       throw new Error('Receta inválida o expirada');
    }


  const productos = response.data.detalle.map((item) => ({
    codigo_nacional: item.codigo,
    cantidad_prescrita: item.cantidad
  }));


  return plainToInstance(RecetaValidadaDto, {
    codigo: response.codigo,
    productos,
    matricula_medico : response.data.matriculaMedico,
    fecha_emision: response.data.emision,
    fecha_expiracion: response.data.expiracion,
    fecha_recepcion: getDateToday()
  });

  }









}