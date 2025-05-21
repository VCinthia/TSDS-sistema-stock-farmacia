import { Module } from '@nestjs/common';
import { RangoDescuentoService } from './rango-descuento.service';
import { RangoDescuentoController } from './rango-descuento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RangoDescuento } from 'src/entities/rango-descuento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RangoDescuento])
  ],
  controllers: [RangoDescuentoController],
  providers: [RangoDescuentoService],
})
export class RangoDescuentoModule {}
