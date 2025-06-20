import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { RangoDescuento } from 'src/entities/rango-descuento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      RangoDescuento,
    ])
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
