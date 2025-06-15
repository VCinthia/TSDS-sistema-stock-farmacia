import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Lote } from 'src/entities/lote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      Lote
    ])
  ],  
  controllers: [ProductoController],
  providers: [
    ProductoService],
})
export class ProductoModule {}
