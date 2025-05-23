import { ApiProperty } from "@nestjs/swagger";

export class ApiResponseDTO<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operación exitosa' })
  message: string;

  @ApiProperty({ nullable: true })
  data?: T;

  @ApiProperty({ example: { code: 'VALIDATION_ERROR', details: [] }, nullable: true,required: false })
  error?: {
    code: string;
     field?: string;
  };

  constructor(
    success: boolean,
    message: string,
    data?: T,
    error?: { 
        code: string; 
        field?: string;
    },
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }



  static success<T>(message: string, data: T): ApiResponseDTO<T> {
    return new ApiResponseDTO(true, message, data);
  }

  static error(message: string, errorCode: string, errorField?: string): ApiResponseDTO<null> {
    return new ApiResponseDTO(false, message, null, { code: errorCode, field: errorField });
  }

  
}