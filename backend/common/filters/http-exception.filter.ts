import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, NotFoundException } from "@nestjs/common";
import { ErrorCodes } from "common/constants/error-codes";
import { ApiResponseDTO } from "common/dto/api-response.dto";
import { Response } from 'express';


@Catch() // Captura TODAS las excepciones
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);


  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error('Inicia filtro de error');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Valores por defecto (Error 500)
    let message = 'Error interno del servidor';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = ErrorCodes.INTERNAL_ERROR;

    // Si es una excepción controlada por Nest (HttpException)
     if (exception instanceof NotFoundException) {
      message = exception.message; 
      statusCode = HttpStatus.NOT_FOUND;
      errorCode = ErrorCodes.NOT_FOUND;
    }else if(exception instanceof Error) {
      message = exception.message; 
    }

    // Construir respuesta estandarizada
    const errorResponse = ApiResponseDTO.error(
      message,
      errorCode,
    );

    // Respuesta estandarizada
    response.status(statusCode).json(errorResponse);

    

  }
}