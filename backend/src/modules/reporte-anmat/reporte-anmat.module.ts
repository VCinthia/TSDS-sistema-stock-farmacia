import { Module } from '@nestjs/common';
import { ReporteAnmatService } from './reporte-anmat.service';
import { ReporteAnmatController } from './reporte-anmat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteAnmat } from 'src/entities/reporte-anmat.entity';
import { AnmatService } from '../anmat/anmat.service';
import { HttpModule } from '@nestjs/axios';
import { TicketReceta } from 'src/entities/ticket-receta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReporteAnmat,
      TicketReceta,
    ]),
    HttpModule,
  ],  
  controllers: [ReporteAnmatController],
  providers: [
    ReporteAnmatService,
    AnmatService
    ,
  ]
})
export class ReporteAnmatModule {}
