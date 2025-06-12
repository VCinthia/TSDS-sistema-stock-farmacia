import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Producto } from 'src/entities/producto.entity';
import { Proveedor } from 'src/entities/proveedor.entity';
import { RangoDescuento } from 'src/entities/rango-descuento.entity';
import { Sucursal } from 'src/entities/sucursal.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CategoriaProducto } from 'src/enums/categoria-producto.enum';
import { Rol } from 'src/enums/rol.enum';
import { Segmento } from 'src/enums/segmento.enum';
import { TipoProducto } from 'src/enums/tipo-producto.enum';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
    constructor(
    @InjectRepository(Sucursal) private sucursalRepo: Repository<Sucursal>,
    @InjectRepository(Proveedor) private proveedorRepo: Repository<Proveedor>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(RangoDescuento) private rangoDescuentoRepo: Repository<RangoDescuento>,
  ) {}

  async seed() {
    await this.seedSucursales();
    await this.seedProveedores();
    await this.seedProductos();
    await this.seedClientes();
    await this.seedUsuarios();
    await this.seedRangoDescuento(); 
  }

  private async seedSucursales() {
    const count = await this.sucursalRepo.count();
    if (count === 0) {
      await this.sucursalRepo.save([
        { direccion: 'Av. Siempre Viva 742', telefono: '123456789', dias_previos_aviso: 5 },
        { direccion: 'Calle Falsa 123', telefono: '987654321', dias_previos_aviso: 3 },
      ]);
      console.log('Sucursales insertadas');
    }
  }

  private async seedProveedores() {
    const count = await this.proveedorRepo.count();
    if (count === 0) {
      await this.proveedorRepo.save([
        { nombre: 'Laboratorios ACME', contacto: 'acme@proveedor.com' },
        { nombre: 'Distribuidora SaludAR', contacto: 'saludar@proveedor.com' },
        { nombre: 'Farmacéutica Delta', contacto: 'contacto@deltafarma.com' },
      ]);
      console.log('Proveedores insertados');
    }
  }

  private async seedProductos() {
    const count = await this.productoRepo.count();
    if (count === 0) {
      await this.productoRepo.save([
        { codigo_nacional: 'MED-0001', nombre: 'Paracetamol 500mg tableta', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.VENTA_LIBRE, umbral_stock: 20, precio_unitario: 600 },
        { codigo_nacional: 'COS-0002', nombre: 'Crema hidratante', categoria: CategoriaProducto.COSMETICO, tipo: TipoProducto.VENTA_LIBRE, umbral_stock: 10, precio_unitario: 1200 },
        { codigo_nacional: 'INS-0003', nombre: 'Jeringa descartable 5ml', categoria: CategoriaProducto.INSUMO, tipo: TipoProducto.VENTA_LIBRE, umbral_stock: 50, precio_unitario: 150 },
        { codigo_nacional: 'INS-0004', nombre: 'Guantes de látex (par)', categoria: CategoriaProducto.INSUMO, tipo: TipoProducto.VENTA_LIBRE, umbral_stock: 100, precio_unitario: 100 },
        { codigo_nacional: 'MED-0005', nombre: 'Enalapril 10mg tableta', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.BAJO_PRESCRIPCION, umbral_stock: 30, precio_unitario: 750 },
        { codigo_nacional: 'MED-0006', nombre: 'Antialérgico Loratadina 10mg tableta', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.TRATAMIENTO_ESPECIAL, umbral_stock: 5, precio_unitario: 3200 },
        { codigo_nacional: 'MED-0007', nombre: 'Interferón Alfa 2B ampolla', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.TRATAMIENTO_ESPECIAL, umbral_stock: 3, precio_unitario: 8200 },
        { codigo_nacional: 'MED-0008', nombre: 'Rituximab 100mg vial', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.TRATAMIENTO_ESPECIAL, umbral_stock: 2, precio_unitario: 15200 },
        { codigo_nacional: 'MED-0009', nombre: 'Amoxicilina 500mg tableta', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.BAJO_PRESCRIPCION, umbral_stock: 25, precio_unitario: 850 },
        { codigo_nacional: 'MED-0010', nombre: 'Metformina 850mg tableta', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.BAJO_PRESCRIPCION, umbral_stock: 20, precio_unitario: 700 },
        { codigo_nacional: 'MED-0011', nombre: 'Lisinopril 10mg tableta"', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.BAJO_PRESCRIPCION, umbral_stock: 15, precio_unitario: 900 },
        { codigo_nacional: 'MED-0012', nombre: 'Adalimumab 40mg jeringa precargada', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.TRATAMIENTO_ESPECIAL, umbral_stock: 5, precio_unitario: 25000 },
        { codigo_nacional: 'MED-0013', nombre: 'Eculizumab 300mg vial', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.TRATAMIENTO_ESPECIAL, umbral_stock: 2, precio_unitario: 30000 },
        { codigo_nacional: 'MED-0014', nombre: 'Ibuprofeno 400mg tableta', categoria: CategoriaProducto.MEDICAMENTO, tipo: TipoProducto.VENTA_LIBRE, umbral_stock: 30, precio_unitario: 650 }, 
      ]);
      console.log('Productos insertados');
    }
  }
 


  private async seedClientes() {
    const count = await this.clienteRepo.count();
    if (count === 0) {
      await this.clienteRepo.save([
        {nombre: 'Juan Pérez',dni: '30123456', puntos_fidelizacion: 1500,},
        {nombre: 'María Gómez',dni: '30234567', puntos_fidelizacion: 1200,},
        {nombre: 'Carlos López', dni: '30345678', puntos_fidelizacion: 980,},
        {nombre: 'Laura Fernández', dni: '30456789', puntos_fidelizacion: 2100,},
    ]);
    console.log('Clientes insertados');
    }
  }

  private async seedUsuarios() {
    const count = await this.usuarioRepo.count();
    if (count === 0) {
      await this.usuarioRepo.save([
        {nombre: 'Admin General',email: 'admin@farmacia.com',password: 'admin123', rol: Rol.ADMINISTRADOR, sucursal: { id_sucursal: 1 },},
        { nombre: 'Juan Farm',email: 'juan@farmacia.com', password: 'famr123', rol: Rol.FARMACEUTICO, sucursal: { id_sucursal: 1 },},
      ]);
      //En producción verificar para hashear pass, aplicá bcrypt antes
      console.log('Usuarios insertados');
    }
  }


  private async seedRangoDescuento() {
    const count = await this.rangoDescuentoRepo.count();
    if (count === 0) {
      await this.rangoDescuentoRepo.save([
        {segmento: Segmento.HIERRO, puntos_minimos: 0,descuento_porcentaje: 5,},
        {segmento: Segmento.BRONCE, puntos_minimos: 10000, descuento_porcentaje: 10,},
        {segmento: Segmento.PLATA, puntos_minimos: 50000,descuento_porcentaje: 15,},
        {segmento: Segmento.ORO, puntos_minimos: 100000, descuento_porcentaje: 20,},
        {segmento: Segmento.PLATINO, puntos_minimos: 250000, descuento_porcentaje: 25,},
      ]);
      console.log('RangoDescueno insertados');
    }
  }


}

