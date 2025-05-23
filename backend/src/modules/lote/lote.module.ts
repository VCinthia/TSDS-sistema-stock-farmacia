import { Module } from '@nestjs/common';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from 'src/entities/lote.entity';
import { Producto } from 'src/entities/producto.entity';
import { Proveedor } from 'src/entities/proveedor.entity';
import { Sucursal } from 'src/entities/sucursal.entity';
import { ProductoService } from '../producto/producto.service';
import { ProveedorService } from '../proveedor/proveedor.service';
import { SucursalService } from '../sucursal/sucursal.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lote, 
      Producto, 
      Proveedor, 
      Sucursal
    ])
  ],  
  controllers: [LoteController],
  providers: [
    LoteService, 
    ProductoService,
    ProveedorService,
    SucursalService
  ],
})
export class LoteModule {}
