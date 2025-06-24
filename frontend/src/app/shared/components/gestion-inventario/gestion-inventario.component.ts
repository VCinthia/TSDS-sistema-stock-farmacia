import { Component, OnInit } from '@angular/core';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { BotonSecundarioComponent } from '../boton-secundario/boton-secundario.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { AgregarLoteFormComponent } from '../agregar-lote-form/agregar-lote-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ProductoDTO } from '../../../../core/dtos/producto.dto';
import { ProductoService } from '../../../../services/producto/producto.service';
import { ToastrService } from 'ngx-toastr';
import { LoteService } from '../../../../services/lote/lote.service';
import { LoteDTO } from '../../../../core/dtos/lote.dto';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-gestion-inventario',
  imports: [BotonPrimarioComponent, BotonSecundarioComponent, MatInputModule, FormsModule, MatTableModule, MatButtonModule, MatCard, MatIcon, CommonModule, MatProgressSpinnerModule],
  templateUrl: './gestion-inventario.component.html',
  styleUrl: './gestion-inventario.component.css'
})
export class GestionInventarioComponent implements OnInit {

  productoId: string | undefined;
  producto: ProductoDTO | null = null;
  error: string | null = null;
  dataSource: ProductoDTO[] = [];
  lotes: LoteDTO[] = [];
  idSucursalEmpleado: string | undefined;
  filtroNombre: string = ''; 
  cargando: boolean = false;


  constructor(public dialog: MatDialog, private productoService: ProductoService, private toastr: ToastrService, private loteService: LoteService) {}

  abrirFormAgregarLote(): void {
    const dialogRef = this.dialog.open(AgregarLoteFormComponent, {
      width:'520px',
      height:'520px'
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.cargarLotes(); 
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
      }, 700); 
    }
  );

  }

  columnas: string[] = ['id_producto', 'nombre', 'stock', 'sucursal', 'accion'];

 ngOnInit(): void {
  const empleado = JSON.parse(localStorage.getItem('usuario') || '{}');
  this.idSucursalEmpleado = empleado?.sucursal?.id_sucursal || '';

  this.cargarLotes();
}

get lotesFiltrados(): LoteDTO[] {
  return this.lotes.filter(lote =>
    lote.producto?.nombre?.toLowerCase().includes(this.filtroNombre.trim().toLowerCase())
  );
}

cargarLotes(): void {
  this.cargando = true;
  this.loteService.obtenerTodosLotes().subscribe({
    next: (response) => {
      this.lotes = response.data;

      setTimeout(() => {
        this.cargando = false;
      }, 700); 
    },
    error: (err) => {
      console.error('Error al obtener los lotes', err);
    }
  });
}

cargarLotesPorSucursal(idSucursalEmpleado: string | undefined): void {
  this.cargando = true;

  if (!idSucursalEmpleado) {
    console.log("Error en obtener idSucursalEmpleado")
  } else {
    this.loteService.obtenerLotesPorSucursal(+idSucursalEmpleado).subscribe({
    next: (response) => {
      this.lotes = response.data;

      setTimeout(() => {
        this.cargando = false;
      }, 700); 
    },
    error: (err) => {
      console.error('Error al obtener los lotes', err);
    }
  });
  }
}

solicitarProducto(){
  this.toastr.success("Producto solicitado éxitosamente!")
}

}
