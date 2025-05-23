import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SeedService } from './modules/seed/seed.service';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Sistema de Stock - Farmacia')
    .setDescription('API para gestión de stock farmacéutico')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.useGlobalFilters(new HttpExceptionFilter()); //Filtro de Exceptions
  await app.listen(Number(process.env.NEST_PORT));
  
  const seedService = app.get(SeedService);
  await seedService.seed();
  console.log('Seed ejecutado');

  
}
bootstrap();