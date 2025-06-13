import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ANMAT_API } from './constants/api.config';
import { ResponseConsultaRecetaAnmatDto } from './dto/response-consulta-receta.dto';
import { getMethodName } from 'common/utils/method-name';
import { plainToInstance } from 'class-transformer';


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
    const actualizacion = {
      valida: false,
      utilizada: true
    };
    try {
    // 1. Obtener la receta actual
    const recetaActual = await firstValueFrom(
      this.httpService.get(url)
    ).then(response => response.data);

    // 2. Actualizar solo los campos necesarios dentro de 'data'
    const recetaActualizada = recetaActual.data.valida 

      const response = await firstValueFrom(
        this.httpService.put(url, actualizacion, {
          headers: { 'Content-Type': 'application/json' }
        })
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error actualizando receta: ${error.response?.data?.message || error.message}`);
    }
  }










  private parsearRespuestaANMATConsultaReceta(responseAnmat: Object): ResponseConsultaRecetaAnmatDto {

    const dataAnmat = responseAnmat['data'];
    const allResponseDto = plainToInstance(ResponseConsultaRecetaAnmatDto , 
        {... responseAnmat, 
          data: dataAnmat ?? []
        }
      );
     return allResponseDto;

  }


    private handleError(error: AxiosError, codigo: string): never {
    Logger.error(`Error validando receta ${codigo}: ${error.message}`, error);
    
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
