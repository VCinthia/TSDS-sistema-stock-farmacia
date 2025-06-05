import { Component } from '@angular/core';
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

@Component({
  selector: 'app-gestion-inventario',
  imports: [BotonPrimarioComponent, BotonSecundarioComponent, MatInputModule, FormsModule, MatTableModule, MatButtonModule, MatCard, MatIcon],
  templateUrl: './gestion-inventario.component.html',
  styleUrl: './gestion-inventario.component.css'
})
export class GestionInventarioComponent {

  productoId: string | undefined;
  producto: ProductoDTO | null = null;
  error: string | null = null;
  dataSource: ProductoDTO[] = [];

  constructor(public dialog: MatDialog, private productoService: ProductoService, private toastr: ToastrService) {}

  abrirFormAgregarLote(): void {
    const dialogRef = this.dialog.open(AgregarLoteFormComponent, {
      width:'520px',
      height:'520px'
    });

  }

  columnas: string[] = ['codigo', 'nombre', 'categoria', 'stock', 'sucursal', 'precio'];

  buscarProducto() {
    if (!this.productoId) return;

    this.productoService.getProducto(this.productoId).subscribe({
      next: (data) => {
        this.producto = data;
        this.error = null;
        this.dataSource = [this.producto];
      },
      error: (err) => {
        this.producto = null;
        this.error = 'Producto no encontrado';
        this.toastr.error(this.error);
        console.error(err);
      }
    });
  }
}
