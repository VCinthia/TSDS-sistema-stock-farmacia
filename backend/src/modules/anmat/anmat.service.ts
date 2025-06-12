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
    Logger.error(`Error validando receta ${codigo}: ${error.message}`);
    
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
