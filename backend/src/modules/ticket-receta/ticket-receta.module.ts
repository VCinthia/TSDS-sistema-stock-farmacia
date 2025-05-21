import { Module } from '@nestjs/common';
import { TicketRecetaService } from './ticket-receta.service';
import { TicketRecetaController } from './ticket-receta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketReceta } from 'src/entities/ticket-receta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketReceta])
  ],  
  controllers: [TicketRecetaController],
  providers: [TicketRecetaService],
})
export class TicketRecetaModule {}
