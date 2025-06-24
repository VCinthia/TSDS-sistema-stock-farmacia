import { Component } from '@angular/core';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { BotonSecundarioComponent } from '../boton-secundario/boton-secundario.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VentaService } from '../../../../services/ventas/venta.service';
import { VentaDTO } from '../../../../core/dtos/venta.dto';
import { AgregarVentaFormComponent } from '../agregar-venta-form/agregar-venta-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventas',
  imports: [BotonPrimarioComponent, BotonSecundarioComponent, MatInputModule, FormsModule, MatTableModule, MatButtonModule, MatCard, MatProgressSpinnerModule, CommonModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  ventas: VentaDTO[] = [];
  idSucursalEmpleado: string | undefined;
  filtroIdVenta: string = ''; 
  ventasFiltradas: VentaDTO[] = []; 
  cargando: boolean = false;

  constructor(public dialog: MatDialog, private toastr: ToastrService, private ventaService : VentaService) {}


  producto: string = "";
  dni: string = "";
  columnas: string[] = ['idVenta', 'fecha', 'sucursal', 'precioTotal', 'accion'];

  ngOnInit(): void {
  const empleado = JSON.parse(localStorage.getItem('usuario') || '{}');
  this.idSucursalEmpleado = empleado?.sucursal?.id_sucursal || '';

  this.cargarVentas();
}

  abrirFormAgregarVenta(): void {
    const dialogRef = this.dialog.open(AgregarVentaFormComponent, {
      width:'520px',
      height:'520px'
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.cargarVentas(); 
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
      }, 700); 
    }
  );

  }

  cargarVentas(): void {
  this.cargando = true;
  this.ventaService.obtenerTodasVentas().subscribe({
    next: (response) => {
      this.ventas = response.data;
      this.ventasFiltradas = response.data;
      console.log(this.ventas)
      setTimeout(() => {
        this.cargando = false;
      }, 700); 
    },
    error: (err) => {
      console.error('Error al obtener las ventas', err);
    }
  });

}

filtrarPorIdVenta() {
  const filtro = this.producto.trim();

  if (!filtro) {
    this.ventasFiltradas = [...this.ventas]; 
  } else {
    this.ventasFiltradas = this.ventas.filter(v =>
      v.id_venta?.toString().includes(filtro)
    );
  }
}

}



