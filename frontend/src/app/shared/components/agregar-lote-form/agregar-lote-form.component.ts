import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { BotonSecundarioComponent } from '../boton-secundario/boton-secundario.component';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BotonInactivoComponent } from '../boton-inactivo/boton-inactivo.component';
import { SucursalDTO } from '../../../../core/dtos/sucursal.dto';
import { SucursalService } from '../../../../services/sucursal/sucursal.service';
import { ProveedorDTO } from '../../../../core/dtos/proveedor.dto';
import { ProveedorService } from '../../../../services/proveedor/proveedor.service';
import { ProductoDTO } from '../../../../core/dtos/producto.dto';
import { ProductoService } from '../../../../services/producto/producto.service';
import { LoteService } from '../../../../services/lote/lote.service';

@Component({
  selector: 'app-agregar-lote-form',
  imports: [MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatSelectModule, BotonPrimarioComponent, BotonSecundarioComponent, BotonInactivoComponent, CommonModule],
  templateUrl: './agregar-lote-form.component.html',
  styleUrl: './agregar-lote-form.component.css',
})
export class AgregarLoteFormComponent implements OnInit{

  sucursales: SucursalDTO[] = [];
  proveedores: ProveedorDTO[] = [];
  productos: ProductoDTO[] = [];

  constructor(
    public dialogRef: MatDialogRef<AgregarLoteFormComponent>,
    private router : Router,
    private toastr: ToastrService,
    private sucursalService: SucursalService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private loteService: LoteService
  ) {}

  cantidad = new FormControl('', [Validators.required]);
  fechaVenc = new FormControl('', [Validators.required]);
  producto = new FormControl('', Validators.required);
  proveedor = new FormControl('', Validators.required);
  sucursal = new FormControl('', Validators.required);

  ngOnInit(): void {
  this.sucursalService.getSucursales().subscribe({
    next: (data) => {
      this.sucursales = data;
      console.log('Data de sucursales', this.sucursales);
    },
    error: (err) => console.error('Error al obtener sucursales', err)
  });
  this.proveedorService.getProveedores().subscribe({
    next: (data) => {
      this.proveedores = data;
      console.log('Data de proveedores', this.proveedores);
    },
    error: (err) => console.error('Error al obtener proveedores', err)
  });
  this.productoService.getProductos().subscribe({
    next: (data) => {
      this.productos = data;
      console.log('Data de productos', this.productos);
    },
    error: (err) => console.error('Error al obtener productos', err)
  });
}

  agregarLote() {
    
  const nuevoLote = {
    fecha_vencimiento: this.fechaVenc.value,
    cantidad: Number(this.cantidad.value),
    id_producto: this.producto.value,
    id_proveedor: this.proveedor.value,
    id_sucursal: this.sucursal.value
  };

  console.log('Lote a enviar:', nuevoLote);

  this.loteService.crearLote(nuevoLote).subscribe({
    next: (res) => {
      console.log('Respuesta del backend:', res);
      this.toastr.success('Lote agregado exitosamente');
      this.dialogRef.close();
    },
    error: (err) => {
      console.error('Error al agregar lote', err);
      this.toastr.error('Hubo un error al agregar el lote');
    }
  });
}
  cerrarModal(){
    this.dialogRef.close();
  }

}
