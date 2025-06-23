import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Lote } from 'src/entities/lote.entity';
import { DetalleVenta } from 'src/entities/detalle-venta.entity';
import { Sucursal } from 'src/entities/sucursal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      Lote,
      DetalleVenta,
      Sucursal
    ])
  ],  
  controllers: [ProductoController],
  providers: [
    ProductoService],
})
export class ProductoModule {}
