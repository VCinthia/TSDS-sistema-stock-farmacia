import { Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { SucursalController } from './sucursal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursal } from 'src/entities/sucursal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sucursal])
  ],  
  controllers: [SucursalController],
  providers: [SucursalService],
})
export class SucursalModule {}
