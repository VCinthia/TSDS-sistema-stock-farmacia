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
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ventas',
  imports: [BotonPrimarioComponent, BotonSecundarioComponent, MatInputModule, FormsModule, MatTableModule, MatButtonModule, MatCard],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  agregarRecetaElectronica(){
    this.toastr.success('Receta agregada exitosamente')
  }

  emitirFactura(){
    this.toastr.success('Factura emitida exitosamente')
  }

  producto: string = "";
  dni: string = "";
  columnas: string[] = ['codigo', 'nombre', 'categoria', 'stock', 'precio', 'cantidad', 'accion'];

  dataSource = [
    {
      codigo: '2f1c8bca',
      nombre: 'Ibuprofeno 400mg',
      categoria: 'Analgésico',
      stock: 6,
      precio: 2000.5,
      cantidad: 2,
      accion: 'Agregar'
    },
    {
      codigo: '3f8c8ced',
      nombre: 'Amoxicilina 500mg',
      categoria: 'Antibiótico',
      stock: 4,
      precio: 4000.5,
      cantidad: 5,
      accion: 'Agregar'
    },
    {
      codigo: '7h8c9jhf',
      nombre: 'Omeprazol 20mg',
      categoria: 'Digestivo',
      stock: 9,
      precio: 2000.5,
      cantidad: 2,
      accion: 'Agregar'
    }
  ];
}



