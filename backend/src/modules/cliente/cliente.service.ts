import { Injectable, Logger, Res } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Repository } from 'typeorm';
import { RangoDescuento } from 'src/entities/rango-descuento.entity';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { ResponseFidelizacionDto } from './dto/response-fidelizacion.dto';
import { getMethodName } from 'common/utils/method-name';
import { ErrorCodes } from 'common/constants/error-codes';
import { API_MESSAGES } from 'common/constants/messages';

@Injectable()
export class ClienteService {
  constructor(
  @InjectRepository(Cliente)
  private readonly clienteRepo: Repository<Cliente>,
  @InjectRepository(RangoDescuento)
  private rangoRepo: Repository<RangoDescuento>,

  
  ) {}

 async generarReportefidelizacionClientes() : Promise<ApiResponseDTO<ResponseFidelizacionDto[] | null>>{
    Logger.log(`Inicio`, getMethodName());
  try{
    // get clientes y rangos
    const clientes = await this.clienteRepo.find();
    const rangos = await this.rangoRepo.find({
        order: { puntos_minimos: 'DESC' }
    });

    // Asignar categoría a cada cliente
    const resultados: ResponseFidelizacionDto[] = [];
    for (const cliente of clientes) {
        let categoria = 'Sin categoría';
        
        // Buscar la categoría más alta que califica
        for (const rango of rangos) {
            if (cliente.puntos_fidelizacion >= rango.puntos_minimos) {
                categoria = rango.segmento;
                break;
            }
        }
        const registro: ResponseFidelizacionDto = new ResponseFidelizacionDto();
        registro.id = cliente.id_cliente;
        registro.nombre = cliente.nombre;
        registro.categoria = categoria;
        registro.puntos_fidelizacion = cliente.puntos_fidelizacion;
        resultados.push(registro);
    }
    return ApiResponseDTO.success(API_MESSAGES.CLIENTES.FIDELIZACION, resultados);
  }catch(error){
    Logger.error(`Error al obtener reporte de Fidelizacion : ${error.message}`, error.stack, getMethodName(), error);
    return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
  }
  }





async findByDni(dni: string){
  return await this.clienteRepo.findOne({ where: { dni: dni} });
}




}
