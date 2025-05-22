import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SucursalModule } from './modules/sucursal/sucursal.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProveedorModule } from './modules/proveedor/proveedor.module';
import { ProductoModule } from './modules/producto/producto.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { LoteModule } from './modules/lote/lote.module';
import { RangoDescuentoModule } from './modules/rango-descuento/rango-descuento.module';
import { VentaModule } from './modules/venta/venta.module';
import { DetalleVentaModule } from './modules/detalle-venta/detalle-venta.module';
import { TicketRecetaModule } from './modules/ticket-receta/ticket-receta.module';
import { ReporteAnmatModule } from './modules/reporte-anmat/reporte-anmat.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,  // Carga automática
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Patrón actualizado
      synchronize: true,  // Solo para desarrollo, Deshabilitar en producción
    }),
    SucursalModule,
    UsuarioModule,
    ProveedorModule,
    ProductoModule,
    ClienteModule,
    LoteModule,
    RangoDescuentoModule,
    VentaModule,
    DetalleVentaModule,
    TicketRecetaModule,
    ReporteAnmatModule,
    SeedModule,
  ],

})
export class AppModule { }