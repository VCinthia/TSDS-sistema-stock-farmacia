import { Module } from '@nestjs/common';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from 'src/entities/lote.entity';
import { Producto } from 'src/entities/producto.entity';
import { Proveedor } from 'src/entities/proveedor.entity';
import { Sucursal } from 'src/entities/sucursal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lote, Producto, Proveedor, Sucursal])
  ],  
  controllers: [LoteController],
  providers: [LoteService],
})
export class LoteModule {}
