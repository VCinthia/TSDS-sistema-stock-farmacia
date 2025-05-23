import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { API_MESSAGES } from 'common/constants/messages';
import { ApiResponseDTO } from 'common/dto/api-response.dto';
import { ResponseLoginUsuarioDto } from './dto/response-login-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  @Post('login')
  @ApiOperation({ summary: 'Valida Credenciales de usuario' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: API_MESSAGES.INFO.OK, type: ApiResponseDTO<ResponseLoginUsuarioDto>, })
  async login(@Body() loginDto: LoginUsuarioDto): Promise<ApiResponseDTO<ResponseLoginUsuarioDto | null>> {
  return await this.usuarioService.login(loginDto);
}

}
