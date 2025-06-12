import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from 'src/entities/venta.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Producto } from 'src/entities/producto.entity';
import { ClienteService } from '../cliente/cliente.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ProductoService } from '../producto/producto.service';
import { AnmatService } from '../anmat/anmat.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    HttpModule, 
    TypeOrmModule.forFeature([
      Venta,
      Cliente,
      Usuario,
      Producto,
      AnmatService,
    ])
  ],  
  controllers: [VentaController],
  providers: [
    VentaService,
    ClienteService,
    UsuarioService,
    ProductoService,
    AnmatService,
  ]
})
export class VentaModule {}
