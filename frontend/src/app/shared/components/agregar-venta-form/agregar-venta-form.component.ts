import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { BotonSecundarioComponent } from '../boton-secundario/boton-secundario.component';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BotonInactivoComponent } from '../boton-inactivo/boton-inactivo.component';
import { SucursalDTO } from '../../../../core/dtos/sucursal.dto';
import { SucursalService } from '../../../../services/sucursal/sucursal.service';
import { ProveedorDTO } from '../../../../core/dtos/proveedor.dto';
import { ProveedorService } from '../../../../services/proveedor/proveedor.service';
import { ProductoDTO } from '../../../../core/dtos/producto.dto';
import { ProductoService } from '../../../../services/producto/producto.service';
import { LoteService } from '../../../../services/lote/lote.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { VentaService } from '../../../../services/ventas/venta.service';


@Component({
  selector: 'app-agregar-venta-form',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, BotonPrimarioComponent, BotonSecundarioComponent, BotonInactivoComponent, CommonModule],
  templateUrl: './agregar-venta-form.component.html',
  styleUrl: './agregar-venta-form.component.css',
})
export class AgregarVentaFormComponent implements OnInit {

  sucursales: SucursalDTO[] = [];
  proveedores: ProveedorDTO[] = [];
  productos: ProductoDTO[] = [];
  ventaForm!: FormGroup;
  idSucursalEmpleado: string | undefined;
  idEmpleado: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<AgregarVentaFormComponent>,
    private router: Router,
    private toastr: ToastrService,
    private sucursalService: SucursalService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private ventaService : VentaService,
    private fb: FormBuilder,
    private changeDet: ChangeDetectorRef
  ) { }




  ngOnInit(): void {

    this.ventaForm = this.fb.group({
      dniCliente: ['', Validators.required],
      productosSeleccionados: this.fb.array([
        this.fb.group({
          idProducto: ['', Validators.required],
          cantidad: ['', Validators.required]
        })
      ]),
      numeroReceta: ['', Validators.required]
    });

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

    this.ventaForm.get('productosSeleccionados')?.valueChanges.subscribe(() => {
      const requiereReceta = this.esRecetaObligatoria();
      const control = this.ventaForm.get('numeroReceta');

      if (requiereReceta) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });

    const empleado = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idSucursalEmpleado = empleado?.sucursal?.id_sucursal || '';
    this.idEmpleado = empleado?.id_usuario || '';
  }

  get productosSeleccionados(): FormArray<FormGroup> {
    return this.ventaForm.get('productosSeleccionados') as FormArray<FormGroup>;
  }


  agregarSelector(): void {
    this.productosSeleccionados.push(this.fb.group({
      idProducto: ['', Validators.required],
      cantidad: ['', Validators.required]
    }));
    this.changeDet.detectChanges();
  }

  esRecetaObligatoria(): boolean {
    const productosSeleccionados = this.ventaForm.get('productosSeleccionados') as FormArray;

    return productosSeleccionados.controls.some(control => {
      const idProd = control.get('idProducto')?.value;
      const prod = this.productos.find(p => p.id_producto === idProd);
      return prod?.tipo === 'BAJO_PRESCRIPCION' || prod?.tipo === 'TRATAMIENTO_ESPECIAL';
    });
  }



  agregarVenta() {

    const productosArray = this.ventaForm.get('productosSeleccionados') as FormArray;

    const productosParaEnviar = productosArray.controls.map(control => {
      const idProd = control.get('idProducto')?.value;
      const cantidad = control.get('cantidad')?.value;

      const productoSeleccionado = this.productos.find(p => p.id_producto === idProd);

      return {
        codigo_nacional: productoSeleccionado?.codigo_nacional,
        cantidad: cantidad
      };
    });

    const payload = {
      dni_cliente: this.ventaForm.get('dniCliente')?.value,
      id_usuario: this.idEmpleado,       
      id_sucursal: this.idSucursalEmpleado,     
      productos: productosParaEnviar,
      numero_receta: this.ventaForm.get('numeroReceta')?.value || null
    };

    console.log('Payload a enviar:', payload);

    this.ventaService.crearVenta(payload).subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        this.toastr.success('Venta agregado exitosamente');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error al agregar venta', err);
        this.toastr.error('Hubo un error al agregar la venta');
      }
    });
  }
  cerrarModal() {
    this.dialogRef.close();
  }

}
