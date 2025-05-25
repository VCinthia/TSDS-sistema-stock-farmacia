import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { ToastrService } from 'ngx-toastr';

export interface Producto {
  codigo: string;
  nombre: string;
  stock: number;
  vencimiento: string;
  lote: number;
}

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule, CommonModule, BotonPrimarioComponent],

  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})


export class AlertasComponent {

  constructor(
    private toastr: ToastrService
  ) {

  }


  proximosVencer: Producto[] = [
    { codigo: '2f1c8bca', nombre: 'Ibuprofeno 400mg', stock: 150, vencimiento: '25/05/25', lote: 434 },
    { codigo: '3f8c8ced', nombre: 'Amoxicilina 500mg', stock: 80, vencimiento: '12/05/25', lote: 336 },
    { codigo: '7h8c9jhf', nombre: 'Omeprazol 20mg', stock: 60, vencimiento: '03/05/25', lote: 865 }
  ];

  criticos: Producto[] = [
    { codigo: '2f1c8bca', nombre: 'Ibuprofeno 400mg', stock: 150, vencimiento: '25/05/25', lote: 434 },
    { codigo: '3f8c8ced', nombre: 'Amoxicilina 500mg', stock: 80, vencimiento: '12/05/25', lote: 336 },
    { codigo: '7h8c9jhf', nombre: 'Omeprazol 20mg', stock: 60, vencimiento: '03/05/25', lote: 865 }
  ];

  altaRotacion: Producto[] = [
    { codigo: '2f1c8bca', nombre: 'Ibuprofeno 400mg', stock: 150, vencimiento: '25/05/25', lote: 434 },
    { codigo: '3f8c8ced', nombre: 'Amoxicilina 500mg', stock: 80, vencimiento: '12/05/25', lote: 336 },
    { codigo: '7h8c9jhf', nombre: 'Omeprazol 20mg', stock: 60, vencimiento: '03/05/25', lote: 865 }
  ];

  dataSourceVencer = new MatTableDataSource<Producto>(this.proximosVencer);
  dataSourceCritico = new MatTableDataSource<Producto>(this.criticos);
  dataSourceAltaRotacion = new MatTableDataSource<Producto>(this.altaRotacion);
  displayedColumns = ['codigo', 'nombre', 'stock', 'vencimiento', 'lote'];

  panelVencerOpen = true;
  panelCriticoOpen = false;
  panelAltaRotacionOpen = false;

  toggleVencer() { this.panelVencerOpen = !this.panelVencerOpen; }
  toggleCritico() { this.panelCriticoOpen = !this.panelCriticoOpen; }
  toggleAltaRotacion() { this.panelAltaRotacionOpen = !this.panelAltaRotacionOpen; }

  exportarPdf() {
    this.toastr.success('PDF exportado exitosamente');
  }
}
