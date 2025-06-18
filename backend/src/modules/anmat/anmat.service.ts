import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ANMAT_API } from './constants/api.config';
import { ResponseConsultaRecetaAnmatDto } from './dto/response-consulta-receta.dto';
import { getMethodName } from 'common/utils/method-name';
import { plainToInstance } from 'class-transformer';
import { ResponseReporteRecetaAnmatDto } from './dto/response-reporte-receta.dto';
import { response } from 'express';
import { ne } from '@faker-js/faker/.';
import { ResponseReporteAnmatDto } from '../reporte-anmat/dto/response-reporte-anmat.dto';


@Injectable()
export class AnmatService {
private readonly baseUrl =  ANMAT_API.BASE_URL;
 
constructor(private readonly httpService: HttpService) {}


async consultarRecetaANMAT(codigo: string): Promise<ResponseConsultaRecetaAnmatDto> {
    const url = `${this.baseUrl}${ANMAT_API.ENDPOINTS.RECETA_CONSULTA}`+"/"+codigo;
    Logger.log(` GET a ${url}`, getMethodName());

    try {
      // Service Call
      const responseANMAT = await firstValueFrom(
        this.httpService.get(url, {
          timeout: 5000,
          headers: { 'Content-Type': 'application/json' }
        })
      );

      // Mapear la respuesta
      return this.parsearRespuestaANMATConsultaReceta(responseANMAT.data);
    } catch (error) {
      this.handleError(error as AxiosError, codigo);
    }
  }



  async actualizarEstadoRecetaUtilizada(codigoReceta: string) {
    const url = `${this.baseUrl}${ANMAT_API.ENDPOINTS.RECETA_CONSULTA}`+"/"+codigoReceta;
    Logger.log(` PATCH a ${url}`, getMethodName());
    
    try {
    // 1. Obtener la receta actual
      const recetaActual = await firstValueFrom( 
      this.httpService.get(url)).then(response => response.data);

    // 2. Actualizar solo los campos necesarios dentro de 'data'
      recetaActual.data.valida = false;
      recetaActual.data.utilizada =true;

      const newData = {
        data: recetaActual.data
      }
      const response = await firstValueFrom(
        this.httpService.patch(url, newData, { headers: { 'Content-Type': 'application/json' } })
      );


      return response.data;
    } catch (error) {
      const mensaje= `Error actualizando receta: ${error.response?.data?.message || error.message}`
      Logger.error(mensaje, error.stack, getMethodName());
      throw new Error(mensaje);
    }
  }




  async enviarRecetaANMAT(codigo: string): Promise<ResponseReporteRecetaAnmatDto> {
    const url = `${this.baseUrl}${ANMAT_API.ENDPOINTS.RECETA_REPORTE}`;
    Logger.log(`POST a ${url}`, getMethodName());

    const body = { codigo: codigo };
    // Service Call
    const response = await firstValueFrom(
        this.httpService.post(url, body, { headers: { 'Content-Type': 'application/json' } })
    );
    Logger.log(`RespuestaANMAT : ${JSON.stringify(response.data)}`,getMethodName());
    return this.parsearRespuestaANMATReporteReceta(response.data);
}



//METODOS PRIVADOS
//METODOS PRIVADOS

  private parsearRespuestaANMATConsultaReceta(responseAnmat: Object): ResponseConsultaRecetaAnmatDto {

    const dataAnmat = responseAnmat['data'];
    const allResponseDto = plainToInstance(ResponseConsultaRecetaAnmatDto , 
        {... responseAnmat, 
          data: dataAnmat ?? []
        }
      );
     return allResponseDto;

  }


    private parsearRespuestaANMATReporteReceta(responseAnmat: Object): ResponseReporteRecetaAnmatDto {
    const responseDTO = plainToInstance(ResponseReporteRecetaAnmatDto, responseAnmat);
     return responseDTO;

  }


    private handleError(error: AxiosError, codigo: string): never {
    Logger.error(`Error validando receta ${codigo}: ${error.message}`, error.stack, getMethodName());
    
    if (error.response) {
      Logger.error(`Respuesta de error: ${JSON.stringify(error.response.data)}`);
      throw new Error(`Error en servicio de recetas: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      throw new Error('El servicio de recetas no respondió');
    } else {
      throw new Error(`Error de configuración: ${error.message}`);
    }
  }


 
}
