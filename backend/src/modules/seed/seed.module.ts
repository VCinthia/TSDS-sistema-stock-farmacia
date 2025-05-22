import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursal } from 'src/entities/sucursal.entity';
import { Proveedor } from 'src/entities/proveedor.entity';
import { Producto } from 'src/entities/producto.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { RangoDescuento } from 'src/entities/rango-descuento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sucursal, Proveedor, Producto, Cliente, Usuario, RangoDescuento]),
  ],  
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
