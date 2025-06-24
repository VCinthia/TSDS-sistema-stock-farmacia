import { Module } from '@nestjs/common';
import { PdfMakeService } from './pdf-make.service';

@Module({
  providers: [
    PdfMakeService,
  ]
})
export class PdfMakeModule {}
