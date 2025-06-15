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
import { TicketReceta } from 'src/entities/ticket-receta.entity';
import { TicketRecetaService } from '../ticket-receta/ticket-receta.service';
import { Lote } from 'src/entities/lote.entity';
import { LoteService } from '../lote/lote.service';
import { Proveedor } from 'src/entities/proveedor.entity';
import { ProveedorService } from '../proveedor/proveedor.service';
import { Sucursal } from 'src/entities/sucursal.entity';
import { SucursalService } from '../sucursal/sucursal.service';
import { RangoDescuento } from 'src/entities/rango-descuento.entity';
import { RangoDescuentoService } from '../rango-descuento/rango-descuento.service';
import { DetalleVenta } from 'src/entities/detalle-venta.entity';


@Module({
  imports: [
    HttpModule, 
    TypeOrmModule.forFeature([
      Venta,
      Cliente,
      Usuario,
      Producto,
      Proveedor,
      Sucursal,
      TicketReceta,
      Lote,
      AnmatService,
      RangoDescuento,
      DetalleVenta,
    ])
  ],  
  controllers: [VentaController],
  providers: [
    VentaService,
    ClienteService,
    UsuarioService,
    ProductoService,
    ProveedorService,
    SucursalService,
    TicketRecetaService,
    LoteService,
    AnmatService,
    RangoDescuentoService,
  ]
})
export class VentaModule {}
