import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from 'src/entities/venta.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Producto } from 'src/entities/producto.entity';
import { ClienteService } from '../cliente/cliente.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ProductoService } from '../producto/producto.service';
import { AnmatService } from '../anmat/anmat.service';
import { HttpModule } from '@nestjs/axios';
import { Lote } from 'src/entities/lote.entity';
import { LoteService } from '../lote/lote.service';
import { Proveedor } from 'src/entities/proveedor.entity';
import { ProveedorService } from '../proveedor/proveedor.service';
import { Sucursal } from 'src/entities/sucursal.entity';
import { SucursalService } from '../sucursal/sucursal.service';
import { RangoDescuento } from 'src/entities/rango-descuento.entity';
import { RangoDescuentoService } from '../rango-descuento/rango-descuento.service';
import { DetalleVenta } from 'src/entities/detalle-venta.entity';
import { PdfMakeService } from '../pdf-make/pdf-make.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venta,
      Cliente,
      Usuario,
      Producto,
      Proveedor,
      Sucursal,
      Lote,
      RangoDescuento,
      DetalleVenta,
    ]),
    HttpModule, 
  ],  
  controllers: [VentaController],
  providers: [
    VentaService,
    ClienteService,
    UsuarioService,
    ProductoService,
    ProveedorService,
    SucursalService,
    LoteService,
    AnmatService,
    RangoDescuentoService,
    PdfMakeService,
  ],
  exports: [VentaService] 
})
export class VentaModule {}
