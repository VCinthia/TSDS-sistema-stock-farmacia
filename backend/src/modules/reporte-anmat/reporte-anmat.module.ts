import { Module } from '@nestjs/common';
import { ReporteAnmatService } from './reporte-anmat.service';
import { ReporteAnmatController } from './reporte-anmat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteAnmat } from 'src/entities/reporte-anmat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReporteAnmat])
  ],  
  controllers: [ReporteAnmatController],
  providers: [ReporteAnmatService],
})
export class ReporteAnmatModule {}
