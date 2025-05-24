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

@Component({
  selector: 'app-gestion-inventario',
  imports: [BotonPrimarioComponent, BotonSecundarioComponent, MatInputModule, FormsModule, MatTableModule, MatButtonModule, MatCard],
  templateUrl: './gestion-inventario.component.html',
  styleUrl: './gestion-inventario.component.css'
})
export class GestionInventarioComponent {

  constructor(public dialog: MatDialog) {}

  abrirFormAgregarLote(): void {
    const dialogRef = this.dialog.open(AgregarLoteFormComponent, {
      width:'520px',
      height:'520px'
    });

  }

  producto: string = "";
  columnas: string[] = ['codigo', 'nombre', 'categoria', 'stock', 'sucursal', 'precio', 'accion'];

  dataSource = [
    {
      codigo: '2f1c8bca',
      nombre: 'Ibuprofeno 400mg',
      categoria: 'Analgésico',
      stock: 6,
      sucursal: 'Central',
      precio: 2000.5
    },
    {
      codigo: '3f8c8ced',
      nombre: 'Amoxicilina 500mg',
      categoria: 'Antibiótico',
      stock: 4,
      sucursal: 'Sucursal Norte',
      precio: 4000.5
    },
    {
      codigo: '7h8c9jhf',
      nombre: 'Omeprazol 20mg',
      categoria: 'Digestivo',
      stock: 9,
      sucursal: 'Central',
      precio: 2000.5
    }
  ];
}
