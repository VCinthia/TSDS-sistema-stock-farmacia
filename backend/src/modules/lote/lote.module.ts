import { Module } from '@nestjs/common';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from 'src/entities/lote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lote])
  ],  
  controllers: [LoteController],
  providers: [LoteService],
})
export class LoteModule {}
