import { Module } from '@nestjs/common';
import { AnmatService } from './anmat.service';

@Module({
  providers: [AnmatService]
})
export class AnmatModule {}
