import { Injectable, Logger } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { ResponseLoginUsuarioDto } from './dto/response-login-usuario.dto';
import { getMethodName } from 'common/utils/method-name';
import { plainToInstance } from 'class-transformer';
import { ErrorCodes } from 'common/constants/error-codes';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

  ) {}



  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }



async login(loginDto: LoginUsuarioDto): Promise<ApiResponseDTO<ResponseLoginUsuarioDto | null>> {
  const { email, password } = loginDto;
  Logger.log(`Intento de login para: ${email}`, getMethodName());

  try {
    const usuario = await this.usuarioRepo.findOne({
      where: { email },
      relations: ['sucursal'],
    });

    if (!usuario) {
      return ApiResponseDTO.error(
        'Correo electrónico inválido',
        ErrorCodes.UNAUTHORIZED
      );
    }

    if (usuario.password !== password) {
      return ApiResponseDTO.error(
        'Contraseña inválida',
        ErrorCodes.UNAUTHORIZED
      );
    }

    const usuarioDto = plainToInstance(ResponseLoginUsuarioDto, usuario, {
      excludeExtraneousValues: true,
    });

    return ApiResponseDTO.success('Login exitoso', usuarioDto);
  } catch (error) {
    Logger.error(`Error en login: ${error.message}`, error.stack, getMethodName());
    return ApiResponseDTO.error(error.message, ErrorCodes.INTERNAL_ERROR);
  }
}








}
