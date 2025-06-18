import { Injectable, Logger } from '@nestjs/common';
import { CreateReporteAnmatDto } from './dto/create-reporte-anmat.dto';
import { ReporteAnmat } from 'src/entities/reporte-anmat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getMethodName } from 'common/utils/method-name';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { API_MESSAGES } from 'common/constants/messages';
import { plainToInstance } from 'class-transformer';
import { ErrorCodes } from 'common/constants/error-codes';
import { AnmatService } from '../anmat/anmat.service';
import { ResponseReporteRecetaAnmatDto } from '../anmat/dto/response-reporte-receta.dto';
import { TicketReceta } from 'src/entities/ticket-receta.entity';

@Injectable()
export class ReporteAnmatService {

    constructor(
    @InjectRepository(ReporteAnmat)
    private readonly reporteAnmatRepo: Repository<ReporteAnmat>,
    @InjectRepository(TicketReceta)
    private readonly ticketRecetaRepo: Repository<TicketReceta>,
    
    private readonly anmatService : AnmatService,

  ) {}




async reportarRecetasANMAT(createReproteAnmatDTO: CreateReporteAnmatDto): Promise<ApiResponseDTO<string[] | null>>{
    const recetasNoEnviadas: string[] = [];
    const codigos: string[] = createReproteAnmatDTO.codigos_receta;

    if (codigos.length === 0) {
        throw new Error('No hay códigos de recetas para reportar');
    }

    for (const codigo of codigos) {
        try {
            const responseDTO = await this.anmatService.enviarRecetaANMAT(codigo);
            
            if (responseDTO.success) {
                await this.guardarReporteExitoso(codigo, responseDTO);
            } else {
                recetasNoEnviadas.push(codigo);
            }
        } catch (error) {
            Logger.error(`Error al reportar la receta ${codigo}: ${error.message}`, getMethodName(), error);
            recetasNoEnviadas.push(codigo);
        }
    }
    if(recetasNoEnviadas.length == 0){
      return ApiResponseDTO.success(API_MESSAGES.REPORTE_ANMAT.ALL_ENVIADO, recetasNoEnviadas);
    }else if (recetasNoEnviadas.length == codigos.length){
       return ApiResponseDTO.error(API_MESSAGES.REPORTE_ANMAT.NO_ENVIADOS, "" );
    }else { 
      return ApiResponseDTO.error(API_MESSAGES.REPORTE_ANMAT.PARCIALMENTE_ENVIADO+ `. Recetas no Reportadas: ${JSON.stringify(recetasNoEnviadas)}`, "" );

    }

}



private async guardarReporteExitoso(codigo: string, respuesta: ResponseReporteRecetaAnmatDto) {
    // Busco el ticket de receta
    const ticketReceta = await this.ticketRecetaRepo.findOne({
        where: { numero_receta: codigo }
    });

    if (!ticketReceta) {
        throw new Error(`No se encontró ticket para receta ${codigo}`);
    }

    // Crear ReporteANMAT
    const reporte = new ReporteAnmat();
    reporte.id_reporte = respuesta.numeroReporte;
    reporte.fecha_envio = new Date(); 
    reporte.respuesta_api = JSON.stringify(respuesta);
    ticketReceta.reporteAnmat = reporte; //relación OneToOne
    
    //Save
    await this.ticketRecetaRepo.save(ticketReceta);
    
    Logger.log(`Reporte ANMAT guardado para receta ${codigo}`, getMethodName());
}




  findAll() {
    return `This action returns all reporteAnmat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reporteAnmat`;
  }

}
